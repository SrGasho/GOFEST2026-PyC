package com.gofest.shake.mechanism.sensor

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.SystemClock
import kotlin.math.sqrt

/**
 * Detects a strong, sustained shake on the accelerometer and reports it through
 * [onShakeDetected]. It only detects: deciding what a shake means (asking for
 * confirmation, starting the beacon) belongs to the caller.
 */
class ShakeDetector(
    context: Context,
    private val onShakeDetected: () -> Unit,
) : SensorEventListener {

    private val sensorManager = context.getSystemService(SensorManager::class.java)
    private val accelerometer: Sensor? = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)

    private var strongSamples = 0
    private var windowStartedAt = 0L
    private var lastTriggeredAt = 0L

    fun start() {
        val sensor = accelerometer ?: return
        strongSamples = 0
        windowStartedAt = 0L
        sensorManager?.registerListener(this, sensor, SensorManager.SENSOR_DELAY_GAME)
    }

    fun stop() {
        sensorManager?.unregisterListener(this)
        strongSamples = 0
        windowStartedAt = 0L
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) = Unit

    override fun onSensorChanged(event: SensorEvent?) {
        if (event == null || event.sensor.type != Sensor.TYPE_ACCELEROMETER) return

        val x = event.values[0]
        val y = event.values[1]
        val z = event.values[2]
        val excess = sqrt(x * x + y * y + z * z) - SensorManager.GRAVITY_EARTH
        val now = SystemClock.elapsedRealtime()

        if (excess < SHAKE_THRESHOLD_MS2) {
            if (now - windowStartedAt > WINDOW_MS) strongSamples = 0
            return
        }

        if (strongSamples == 0 || now - windowStartedAt > WINDOW_MS) {
            windowStartedAt = now
            strongSamples = 0
        }
        strongSamples++

        if (strongSamples >= REQUIRED_SAMPLES && now - lastTriggeredAt > DEBOUNCE_MS) {
            lastTriggeredAt = now
            strongSamples = 0
            onShakeDetected()
        }
    }

    private companion object {
        /** Acceleration above gravity, in m/s^2, that counts as a violent movement. */
        const val SHAKE_THRESHOLD_MS2 = 12f

        /** A single jolt (dropping the phone) must not trigger: require several samples in a row. */
        const val REQUIRED_SAMPLES = 4
        const val WINDOW_MS = 1_000L
        const val DEBOUNCE_MS = 5_000L
    }
}
