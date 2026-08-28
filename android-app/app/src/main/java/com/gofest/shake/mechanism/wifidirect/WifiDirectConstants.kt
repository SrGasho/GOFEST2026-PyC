package com.gofest.shake.mechanism.wifidirect

/**
 * Shared contract between the UI layer and the WiFi Direct services
 * (BeaconService / ScannerService). Keeping these in one file lets the
 * screens start/stop/observe the services without depending on their
 * internals.
 */
object WifiDirectConstants {

    /** DNS-SD service type announced by the victim/emitter device. */
    const val SERVICE_TYPE = "_shakebeacon._presence._tcp"

    /** DNS-SD instance name prefix; full name is "$SERVICE_INSTANCE_PREFIX-<emergencyId>". */
    const val SERVICE_INSTANCE_PREFIX = "shake"

    /** TXT record keys published alongside the DNS-SD service. */
    const val TXT_KEY_EMERGENCY_ID = "emergencyId"
    const val TXT_KEY_STATUS = "status"
    const val TXT_KEY_NAME = "name"

    // --- BeaconService (victim/emitter mode) control ---
    const val ACTION_START_BEACON = "com.gofest.shake.action.START_BEACON"
    const val ACTION_STOP_BEACON = "com.gofest.shake.action.STOP_BEACON"
    const val EXTRA_EMERGENCY_ID = "extra_emergency_id"
    const val EXTRA_PERSON_NAME = "extra_person_name"
    const val EXTRA_STATUS = "extra_status"
    const val EXTRA_TRIGGER = "extra_trigger" // "MANUAL" | "SHAKE"

    /** Broadcast sent by BeaconService whenever it starts/stops, for the UI to reflect state. */
    const val BROADCAST_BEACON_STATE = "com.gofest.shake.broadcast.BEACON_STATE"
    const val EXTRA_BEACON_ACTIVE = "extra_beacon_active"

    // --- ScannerService (rescuer/receiver mode) control ---
    const val ACTION_START_SCAN = "com.gofest.shake.action.START_SCAN"
    const val ACTION_STOP_SCAN = "com.gofest.shake.action.STOP_SCAN"

    /** Broadcast sent by ScannerService for every beacon found/lost, for the UI + alarm trigger. */
    const val BROADCAST_BEACON_FOUND = "com.gofest.shake.broadcast.BEACON_FOUND"
    const val BROADCAST_BEACON_LOST = "com.gofest.shake.broadcast.BEACON_LOST"

    const val NOTIFICATION_CHANNEL_ID = "shake_wifi_direct"
    const val NOTIFICATION_ID_BEACON = 1001
    const val NOTIFICATION_ID_SCANNER = 1002
}
