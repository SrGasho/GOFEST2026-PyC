package com.gofest.shake

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import com.gofest.shake.mechanism.wifidirect.WifiDirectConstants

class ShakeApp : Application() {

    override fun onCreate() {
        super.onCreate()
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                WifiDirectConstants.NOTIFICATION_CHANNEL_ID,
                "Beacon y rastreo",
                NotificationManager.IMPORTANCE_LOW,
            ).apply { description = "Mantiene activo el beacon de emergencia y el escaneo de dispositivos cercanos." }
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }
}
