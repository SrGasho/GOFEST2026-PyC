package com.gofest.shake.mechanism.alarm

import android.content.Context
import android.media.AudioAttributes
import android.media.MediaPlayer
import android.media.RingtoneManager
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.util.Log

/**
 * Loud local alarm raised when a rescuer's scanner finds an emergency beacon.
 * Uses the system alarm ringtone so the app ships without audio assets, and
 * vibrates in parallel so it still gets attention on a silenced device.
 */
class AlarmPlayer(private val context: Context) {

    private var player: MediaPlayer? = null
    private var vibrating = false

    private val vibrator: Vibrator? by lazy {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            context.getSystemService(VibratorManager::class.java)?.defaultVibrator
        } else {
            @Suppress("DEPRECATION")
            context.getSystemService(Vibrator::class.java)
        }
    }

    fun start() {
        if (player != null || vibrating) return
        startAudio()
        startVibration()
    }

    fun stop() {
        player?.let { active ->
            runCatching {
                if (active.isPlaying) active.stop()
            }
            active.release()
        }
        player = null

        if (vibrating) {
            runCatching { vibrator?.cancel() }
            vibrating = false
        }
    }

    private fun startAudio() {
        val uri = RingtoneManager.getActualDefaultRingtoneUri(context, RingtoneManager.TYPE_ALARM)
            ?: RingtoneManager.getActualDefaultRingtoneUri(context, RingtoneManager.TYPE_RINGTONE)
            ?: RingtoneManager.getActualDefaultRingtoneUri(context, RingtoneManager.TYPE_NOTIFICATION)
        if (uri == null) {
            Log.w(TAG, "El dispositivo no tiene tono de alarma, solo se vibrara")
            return
        }
        runCatching {
            MediaPlayer().apply {
                setAudioAttributes(
                    AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_ALARM)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                        .build()
                )
                setDataSource(context, uri)
                isLooping = true
                prepare()
                start()
            }
        }.onSuccess { player = it }
            .onFailure { Log.w(TAG, "No se pudo reproducir la alarma", it) }
    }

    private fun startVibration() {
        val device = vibrator ?: return
        if (!device.hasVibrator()) return
        runCatching {
            device.vibrate(VibrationEffect.createWaveform(VIBRATION_PATTERN, VIBRATION_REPEAT_INDEX))
            vibrating = true
        }.onFailure { Log.w(TAG, "No se pudo vibrar", it) }
    }

    private companion object {
        const val TAG = "AlarmPlayer"
        val VIBRATION_PATTERN = longArrayOf(0, 700, 400, 700, 900)
        const val VIBRATION_REPEAT_INDEX = 0
    }
}
