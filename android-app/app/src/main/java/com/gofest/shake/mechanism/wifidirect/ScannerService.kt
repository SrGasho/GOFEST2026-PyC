package com.gofest.shake.mechanism.wifidirect

import android.Manifest
import android.annotation.SuppressLint
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ServiceInfo
import android.net.wifi.p2p.WifiP2pManager
import android.net.wifi.p2p.nsd.WifiP2pDnsSdServiceRequest
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.SystemClock
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat

/**
 * Rescuer/receiver side of the core mechanism: keeps DNS-SD discovery alive and
 * reports every nearby [BeaconService] as a local broadcast. Whoever listens to
 * [WifiDirectConstants.BROADCAST_BEACON_FOUND] is the one that raises the alarm.
 */
class ScannerService : Service() {

    private data class Beacon(
        val emergencyId: String,
        val personName: String,
        val status: String,
        val lastSeenElapsed: Long,
    )

    private val handler = Handler(Looper.getMainLooper())
    private var manager: WifiP2pManager? = null
    private var channel: WifiP2pManager.Channel? = null
    private val seen = mutableMapOf<String, Beacon>()

    private val discoveryCycle = object : Runnable {
        override fun run() {
            evictStaleBeacons()
            restartDiscovery()
            handler.postDelayed(this, DISCOVERY_INTERVAL_MS)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            WifiDirectConstants.ACTION_START_SCAN -> startScan()
            WifiDirectConstants.ACTION_STOP_SCAN -> stopScan()
            else -> stopScan()
        }
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        handler.removeCallbacks(discoveryCycle)
        clearRequests()
        super.onDestroy()
    }

    private fun startScan() {
        startForegroundNotification()

        if (!hasNearbyPermission()) {
            Log.w(TAG, "Faltan permisos de ubicacion/nearby, no se puede escanear")
            stopScan()
            return
        }

        val p2p = getSystemService(Context.WIFI_P2P_SERVICE) as? WifiP2pManager
        if (p2p == null) {
            Log.w(TAG, "Este dispositivo no soporta WiFi Direct")
            stopScan()
            return
        }
        val p2pChannel = p2p.initialize(this, mainLooper) { Log.w(TAG, "Canal WiFi Direct perdido") }
        if (p2pChannel == null) {
            Log.w(TAG, "No se pudo inicializar el canal WiFi Direct")
            stopScan()
            return
        }
        manager = p2p
        channel = p2pChannel

        p2p.setDnsSdResponseListeners(
            p2pChannel,
            WifiP2pManager.DnsSdServiceResponseListener { _, _, _ ->
                // The TXT record listener below carries everything we need.
            },
            WifiP2pManager.DnsSdTxtRecordListener { _, record, _ -> onTxtRecord(record) },
        )

        handler.removeCallbacks(discoveryCycle)
        handler.post(discoveryCycle)
    }

    private fun onTxtRecord(record: Map<String, String>?) {
        val emergencyId = record?.get(WifiDirectConstants.TXT_KEY_EMERGENCY_ID).orEmpty()
        if (emergencyId.isBlank()) return

        val beacon = Beacon(
            emergencyId = emergencyId,
            personName = record?.get(WifiDirectConstants.TXT_KEY_NAME).orEmpty(),
            status = record?.get(WifiDirectConstants.TXT_KEY_STATUS).orEmpty(),
            lastSeenElapsed = SystemClock.elapsedRealtime(),
        )
        val known = seen.put(emergencyId, beacon)
        if (known == null) {
            Log.i(TAG, "Beacon encontrado: $emergencyId")
            sendBroadcast(
                Intent(WifiDirectConstants.BROADCAST_BEACON_FOUND)
                    .setPackage(packageName)
                    .putExtra(WifiDirectConstants.EXTRA_EMERGENCY_ID, beacon.emergencyId)
                    .putExtra(WifiDirectConstants.EXTRA_PERSON_NAME, beacon.personName)
                    .putExtra(WifiDirectConstants.EXTRA_STATUS, beacon.status)
            )
        }
    }

    private fun evictStaleBeacons() {
        val now = SystemClock.elapsedRealtime()
        val lost = seen.values.filter { now - it.lastSeenElapsed > BEACON_TIMEOUT_MS }
        lost.forEach { beacon ->
            seen.remove(beacon.emergencyId)
            Log.i(TAG, "Beacon perdido: ${beacon.emergencyId}")
            sendBroadcast(
                Intent(WifiDirectConstants.BROADCAST_BEACON_LOST)
                    .setPackage(packageName)
                    .putExtra(WifiDirectConstants.EXTRA_EMERGENCY_ID, beacon.emergencyId)
            )
        }
    }

    /** WiFi Direct service discovery expires on its own, so every cycle re-arms it from scratch. */
    @SuppressLint("MissingPermission")
    private fun restartDiscovery() {
        val p2p = manager ?: return
        val p2pChannel = channel ?: return

        val request = WifiP2pDnsSdServiceRequest.newInstance(WifiDirectConstants.SERVICE_TYPE)
        val discover = {
            p2p.addServiceRequest(p2pChannel, request, object : WifiP2pManager.ActionListener {
                override fun onSuccess() {
                    p2p.discoverServices(p2pChannel, object : WifiP2pManager.ActionListener {
                        override fun onSuccess() = Unit
                        override fun onFailure(reason: Int) {
                            Log.d(TAG, "discoverServices fallo (reason=$reason)")
                        }
                    })
                }

                override fun onFailure(reason: Int) {
                    Log.d(TAG, "addServiceRequest fallo (reason=$reason)")
                }
            })
        }
        p2p.clearServiceRequests(p2pChannel, object : WifiP2pManager.ActionListener {
            override fun onSuccess() { discover() }
            override fun onFailure(reason: Int) { discover() }
        })
    }

    private fun clearRequests() {
        val p2p = manager
        val p2pChannel = channel
        if (p2p != null && p2pChannel != null) {
            runCatching {
                p2p.clearServiceRequests(p2pChannel, object : WifiP2pManager.ActionListener {
                    override fun onSuccess() = Unit
                    override fun onFailure(reason: Int) = Unit
                })
            }
        }
        manager = null
        channel = null
        seen.clear()
    }

    private fun stopScan() {
        handler.removeCallbacks(discoveryCycle)
        clearRequests()
        ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    private fun startForegroundNotification() {
        getSystemService(NotificationManager::class.java).createNotificationChannel(
            NotificationChannel(
                WifiDirectConstants.NOTIFICATION_CHANNEL_ID,
                "Shake: mecanismo de emergencia",
                NotificationManager.IMPORTANCE_LOW,
            )
        )
        val notification: Notification =
            NotificationCompat.Builder(this, WifiDirectConstants.NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(android.R.drawable.stat_notify_sync)
                .setContentTitle("Buscando señales de emergencia")
                .setContentText("Escaneando dispositivos cercanos por WiFi Direct")
                .setOngoing(true)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build()
        ServiceCompat.startForeground(
            this,
            WifiDirectConstants.NOTIFICATION_ID_SCANNER,
            notification,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION
            } else {
                0
            },
        )
    }

    private fun hasNearbyPermission(): Boolean {
        val permission = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            Manifest.permission.NEARBY_WIFI_DEVICES
        } else {
            Manifest.permission.ACCESS_FINE_LOCATION
        }
        return ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED
    }

    private companion object {
        const val TAG = "ScannerService"
        const val DISCOVERY_INTERVAL_MS = 20_000L
        const val BEACON_TIMEOUT_MS = 60_000L
    }
}
