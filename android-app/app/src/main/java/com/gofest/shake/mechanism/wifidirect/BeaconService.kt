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
import android.net.wifi.p2p.nsd.WifiP2pDnsSdServiceInfo
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.util.Log
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat

/**
 * Victim/emitter side of the core mechanism: publishes a DNS-SD local service over
 * WiFi Direct so nearby rescuers running [ScannerService] can find this device with
 * no infrastructure, no internet and no pairing.
 */
class BeaconService : Service() {

    private val handler = Handler(Looper.getMainLooper())
    private var manager: WifiP2pManager? = null
    private var channel: WifiP2pManager.Channel? = null
    private var serviceInfo: WifiP2pDnsSdServiceInfo? = null

    private val keepDiscoverable = object : Runnable {
        override fun run() {
            refreshPeerDiscovery()
            handler.postDelayed(this, PEER_DISCOVERY_INTERVAL_MS)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            WifiDirectConstants.ACTION_START_BEACON -> startBeacon(intent)
            WifiDirectConstants.ACTION_STOP_BEACON -> stopBeacon()
            else -> stopBeacon()
        }
        return START_NOT_STICKY
    }

    override fun onDestroy() {
        handler.removeCallbacks(keepDiscoverable)
        removeLocalService()
        super.onDestroy()
    }

    private fun startBeacon(intent: Intent) {
        val emergencyId = intent.getStringExtra(WifiDirectConstants.EXTRA_EMERGENCY_ID).orEmpty()
        if (emergencyId.isBlank()) {
            Log.w(TAG, "START_BEACON sin emergencyId, no hay nada que anunciar")
            stopBeacon()
            return
        }
        val personName = intent.getStringExtra(WifiDirectConstants.EXTRA_PERSON_NAME).orEmpty()
        val status = intent.getStringExtra(WifiDirectConstants.EXTRA_STATUS).orEmpty()

        startForegroundNotification(emergencyId)

        if (!hasNearbyPermission()) {
            Log.w(TAG, "Faltan permisos de ubicacion/nearby, no se puede anunciar el beacon")
            stopBeacon()
            return
        }

        val p2p = getSystemService(Context.WIFI_P2P_SERVICE) as? WifiP2pManager
        if (p2p == null) {
            Log.w(TAG, "Este dispositivo no soporta WiFi Direct")
            stopBeacon()
            return
        }
        val p2pChannel = p2p.initialize(this, mainLooper) { Log.w(TAG, "Canal WiFi Direct perdido") }
        if (p2pChannel == null) {
            Log.w(TAG, "No se pudo inicializar el canal WiFi Direct")
            stopBeacon()
            return
        }
        manager = p2p
        channel = p2pChannel

        val record = mapOf(
            WifiDirectConstants.TXT_KEY_EMERGENCY_ID to emergencyId,
            WifiDirectConstants.TXT_KEY_STATUS to status,
            WifiDirectConstants.TXT_KEY_NAME to personName,
        )
        val info = WifiP2pDnsSdServiceInfo.newInstance(
            "${WifiDirectConstants.SERVICE_INSTANCE_PREFIX}-$emergencyId",
            WifiDirectConstants.SERVICE_TYPE,
            record,
        )
        serviceInfo = info

        addLocalService(p2p, p2pChannel, info)
    }

    @SuppressLint("MissingPermission")
    private fun addLocalService(
        p2p: WifiP2pManager,
        p2pChannel: WifiP2pManager.Channel,
        info: WifiP2pDnsSdServiceInfo,
    ) {
        val register = {
            p2p.addLocalService(p2pChannel, info, object : WifiP2pManager.ActionListener {
                override fun onSuccess() {
                    broadcastState(true)
                    handler.post(keepDiscoverable)
                }

                override fun onFailure(reason: Int) {
                    Log.w(TAG, "addLocalService fallo (reason=$reason)")
                    stopBeacon()
                }
            })
        }
        p2p.clearLocalServices(p2pChannel, object : WifiP2pManager.ActionListener {
            override fun onSuccess() { register() }
            override fun onFailure(reason: Int) { register() }
        })
    }

    /**
     * Several vendors only answer DNS-SD requests while P2P peer discovery is running,
     * and discovery expires on its own, so re-arm it while the beacon is up.
     */
    @SuppressLint("MissingPermission")
    private fun refreshPeerDiscovery() {
        val p2p = manager ?: return
        val p2pChannel = channel ?: return
        p2p.discoverPeers(p2pChannel, object : WifiP2pManager.ActionListener {
            override fun onSuccess() = Unit
            override fun onFailure(reason: Int) {
                Log.d(TAG, "discoverPeers fallo (reason=$reason)")
            }
        })
    }

    private fun removeLocalService() {
        val p2p = manager
        val p2pChannel = channel
        val info = serviceInfo
        if (p2p != null && p2pChannel != null && info != null) {
            runCatching {
                p2p.removeLocalService(p2pChannel, info, object : WifiP2pManager.ActionListener {
                    override fun onSuccess() = Unit
                    override fun onFailure(reason: Int) {
                        Log.d(TAG, "removeLocalService fallo (reason=$reason)")
                    }
                })
            }
        }
        serviceInfo = null
        manager = null
        channel = null
    }

    private fun stopBeacon() {
        handler.removeCallbacks(keepDiscoverable)
        removeLocalService()
        broadcastState(false)
        ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    private fun broadcastState(active: Boolean) {
        val intent = Intent(WifiDirectConstants.BROADCAST_BEACON_STATE)
            .setPackage(packageName)
            .putExtra(WifiDirectConstants.EXTRA_BEACON_ACTIVE, active)
        sendBroadcast(intent)
    }

    private fun startForegroundNotification(emergencyId: String) {
        getSystemService(NotificationManager::class.java).createNotificationChannel(
            NotificationChannel(
                WifiDirectConstants.NOTIFICATION_CHANNEL_ID,
                "Shake: mecanismo de emergencia",
                NotificationManager.IMPORTANCE_LOW,
            )
        )
        val notification: Notification =
            NotificationCompat.Builder(this, WifiDirectConstants.NOTIFICATION_CHANNEL_ID)
                .setSmallIcon(android.R.drawable.stat_sys_warning)
                .setContentTitle("Emitiendo señal de emergencia")
                .setContentText("ID $emergencyId visible para rescatistas cercanos")
                .setOngoing(true)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .build()
        ServiceCompat.startForeground(
            this,
            WifiDirectConstants.NOTIFICATION_ID_BEACON,
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
        const val TAG = "BeaconService"
        const val PEER_DISCOVERY_INTERVAL_MS = 60_000L
    }
}
