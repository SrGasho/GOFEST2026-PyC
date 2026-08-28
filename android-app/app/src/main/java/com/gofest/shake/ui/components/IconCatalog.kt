package com.gofest.shake.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountCircle
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Backpack
import androidx.compose.material.icons.filled.Badge
import androidx.compose.material.icons.filled.BatteryFull
import androidx.compose.material.icons.filled.Bloodtype
import androidx.compose.material.icons.filled.Bluetooth
import androidx.compose.material.icons.filled.Bolt
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.Call
import androidx.compose.material.icons.filled.Campaign
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.CrisisAlert
import androidx.compose.material.icons.filled.Directions
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.FactCheck
import androidx.compose.material.icons.filled.Group
import androidx.compose.material.icons.filled.HealthAndSafety
import androidx.compose.material.icons.filled.Help
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.HomeWork
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Medication
import androidx.compose.material.icons.filled.MeetingRoom
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.MyLocation
import androidx.compose.material.icons.filled.Notifications
import androidx.compose.material.icons.filled.NotificationsActive
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.PersonAdd
import androidx.compose.material.icons.filled.PersonSearch
import androidx.compose.material.icons.filled.PersonalInjury
import androidx.compose.material.icons.filled.PhotoCamera
import androidx.compose.material.icons.filled.Radar
import androidx.compose.material.icons.filled.Save
import androidx.compose.material.icons.filled.Schedule
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Send
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.Share
import androidx.compose.material.icons.filled.Shield
import androidx.compose.material.icons.filled.SignalWifiOff
import androidx.compose.material.icons.filled.Sos
import androidx.compose.material.icons.filled.Umbrella
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material.icons.filled.WifiTethering
import androidx.compose.ui.graphics.vector.ImageVector

/**
 * Single mapping from the Material Symbols names the design handoff and Firestore
 * documents use, to the closest icon shipped in material-icons-extended.
 */
fun iconFor(name: String): ImageVector = when (name) {
    "account_circle" -> Icons.Filled.AccountCircle
    "allergies" -> Icons.Filled.Medication
    "arrow_back" -> Icons.Filled.ArrowBack
    "backpack" -> Icons.Filled.Backpack
    "badge" -> Icons.Filled.Badge
    "battery_5_bar" -> Icons.Filled.BatteryFull
    "bloodtype" -> Icons.Filled.Bloodtype
    "bluetooth" -> Icons.Filled.Bluetooth
    "bolt" -> Icons.Filled.Bolt
    "bookmark" -> Icons.Filled.Bookmark
    "call" -> Icons.Filled.Call
    "campaign" -> Icons.Filled.Campaign
    "check" -> Icons.Filled.Check
    "check_circle" -> Icons.Filled.CheckCircle
    "chevron_right" -> Icons.Filled.ChevronRight
    "close" -> Icons.Filled.Close
    "crisis_alert" -> Icons.Filled.CrisisAlert
    "directions" -> Icons.Filled.Directions
    "door_open" -> Icons.Filled.MeetingRoom
    "edit" -> Icons.Filled.Edit
    "fact_check" -> Icons.Filled.FactCheck
    "group" -> Icons.Filled.Group
    "health_and_safety" -> Icons.Filled.HealthAndSafety
    "help" -> Icons.Filled.Help
    "history" -> Icons.Filled.History
    "home" -> Icons.Filled.Home
    "home_work" -> Icons.Filled.HomeWork
    "info" -> Icons.Filled.Info
    "location_on" -> Icons.Filled.LocationOn
    "mic" -> Icons.Filled.Mic
    "more_vert" -> Icons.Filled.MoreVert
    "my_location" -> Icons.Filled.MyLocation
    "notifications" -> Icons.Filled.Notifications
    "notifications_active" -> Icons.Filled.NotificationsActive
    "person" -> Icons.Filled.Person
    "person_add" -> Icons.Filled.PersonAdd
    "person_search" -> Icons.Filled.PersonSearch
    "personal_injury" -> Icons.Filled.PersonalInjury
    "photo_camera" -> Icons.Filled.PhotoCamera
    "radar" -> Icons.Filled.Radar
    "rainy" -> Icons.Filled.Umbrella
    "save" -> Icons.Filled.Save
    "schedule" -> Icons.Filled.Schedule
    "search" -> Icons.Filled.Search
    "send" -> Icons.Filled.Send
    "settings" -> Icons.Filled.Settings
    "share" -> Icons.Filled.Share
    "shield" -> Icons.Filled.Shield
    "signal_disconnected" -> Icons.Filled.SignalWifiOff
    "sos" -> Icons.Filled.Sos
    "visibility" -> Icons.Filled.Visibility
    "warning" -> Icons.Filled.Warning
    "water_drop" -> Icons.Filled.WaterDrop
    "wifi_tethering" -> Icons.Filled.WifiTethering
    else -> Icons.Filled.Info
}
