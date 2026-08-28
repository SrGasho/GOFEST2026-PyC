package com.gofest.shake.ui

import android.app.Application
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import androidx.core.content.ContextCompat
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.gofest.shake.data.SampleData
import com.gofest.shake.data.model.AlertItem
import com.gofest.shake.data.model.AlertTone
import com.gofest.shake.data.model.EmergencyProfile
import com.gofest.shake.data.model.Person
import com.gofest.shake.data.model.PersonStatus
import com.gofest.shake.data.model.SeismicEvent
import com.gofest.shake.data.model.Shelter
import com.gofest.shake.data.repository.AlertsRepository
import com.gofest.shake.data.repository.FindingsRepository
import com.gofest.shake.data.repository.PeopleRepository
import com.gofest.shake.data.repository.ProfileStore
import com.gofest.shake.data.repository.SheltersRepository
import com.gofest.shake.mechanism.alarm.AlarmPlayer
import com.gofest.shake.mechanism.wifidirect.BeaconService
import com.gofest.shake.mechanism.wifidirect.ScannerService
import com.gofest.shake.mechanism.wifidirect.WifiDirectConstants
import com.gofest.shake.ui.components.BeaconMode
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class NearbyBeacon(
    val emergencyId: String,
    val personName: String,
    val status: PersonStatus,
)

/**
 * Single source of truth for the whole app: cloud reads fall back to [SampleData] so a
 * demo is never empty, and every WiFi Direct service and the alarm are driven from here.
 */
class ShakeViewModel(application: Application) : AndroidViewModel(application) {

    private val context: Context = application.applicationContext
    private val profileStore = ProfileStore(context)
    private val findingsRepository = FindingsRepository(context)
    private val alarm = AlarmPlayer(context)

    private val _people = MutableStateFlow(SampleData.people)
    val people: StateFlow<List<Person>> = _people.asStateFlow()

    private val _alerts = MutableStateFlow(SampleData.alerts)
    val alerts: StateFlow<List<AlertItem>> = _alerts.asStateFlow()

    private val _shelters = MutableStateFlow(SampleData.shelters)
    val shelters: StateFlow<List<Shelter>> = _shelters.asStateFlow()

    private val _profile = MutableStateFlow(SampleData.defaultProfile)
    val profile: StateFlow<EmergencyProfile> = _profile.asStateFlow()

    private val _emergencyId = MutableStateFlow("")
    val emergencyId: StateFlow<String> = _emergencyId.asStateFlow()

    private val _event = MutableStateFlow(SampleData.event)
    val event: StateFlow<SeismicEvent> = _event.asStateFlow()

    private val _selfSafe = MutableStateFlow(false)
    val selfSafe: StateFlow<Boolean> = _selfSafe.asStateFlow()

    private val _beaconGranted = MutableStateFlow(false)
    val beaconGranted: StateFlow<Boolean> = _beaconGranted.asStateFlow()

    private val _beaconActive = MutableStateFlow(false)
    val beaconActive: StateFlow<Boolean> = _beaconActive.asStateFlow()

    private val _beaconStartedAt = MutableStateFlow(0L)
    val beaconStartedAt: StateFlow<Long> = _beaconStartedAt.asStateFlow()

    private val _beaconMode = MutableStateFlow(BeaconMode.SOS)
    val beaconMode: StateFlow<BeaconMode> = _beaconMode.asStateFlow()

    private val _scanning = MutableStateFlow(false)
    val scanning: StateFlow<Boolean> = _scanning.asStateFlow()

    private val _nearbyBeacons = MutableStateFlow<List<NearbyBeacon>>(emptyList())
    val nearbyBeacons: StateFlow<List<NearbyBeacon>> = _nearbyBeacons.asStateFlow()

    private val _alarmRinging = MutableStateFlow(false)
    val alarmRinging: StateFlow<Boolean> = _alarmRinging.asStateFlow()

    private val _messages = MutableSharedFlow<String>(extraBufferCapacity = 8)
    val messages: SharedFlow<String> = _messages.asSharedFlow()

    private val beaconStateReceiver = object : BroadcastReceiver() {
        override fun onReceive(receiverContext: Context?, intent: Intent?) {
            val active = intent?.getBooleanExtra(WifiDirectConstants.EXTRA_BEACON_ACTIVE, false) ?: false
            _beaconActive.value = active
            if (!active) _beaconStartedAt.value = 0L
        }
    }

    private val scannerReceiver = object : BroadcastReceiver() {
        override fun onReceive(receiverContext: Context?, intent: Intent?) {
            val emergencyId = intent?.getStringExtra(WifiDirectConstants.EXTRA_EMERGENCY_ID) ?: return
            when (intent.action) {
                WifiDirectConstants.BROADCAST_BEACON_FOUND -> onBeaconFound(
                    NearbyBeacon(
                        emergencyId = emergencyId,
                        personName = intent.getStringExtra(WifiDirectConstants.EXTRA_PERSON_NAME).orEmpty()
                            .ifBlank { "Persona sin identificar" },
                        status = statusOf(intent.getStringExtra(WifiDirectConstants.EXTRA_STATUS)),
                    )
                )

                WifiDirectConstants.BROADCAST_BEACON_LOST -> onBeaconLost(emergencyId)
            }
        }
    }

    init {
        ContextCompat.registerReceiver(
            context,
            beaconStateReceiver,
            IntentFilter(WifiDirectConstants.BROADCAST_BEACON_STATE),
            ContextCompat.RECEIVER_NOT_EXPORTED,
        )
        ContextCompat.registerReceiver(
            context,
            scannerReceiver,
            IntentFilter().apply {
                addAction(WifiDirectConstants.BROADCAST_BEACON_FOUND)
                addAction(WifiDirectConstants.BROADCAST_BEACON_LOST)
            },
            ContextCompat.RECEIVER_NOT_EXPORTED,
        )

        viewModelScope.launch { profileStore.observeProfile().collect { _profile.value = it } }
        viewModelScope.launch { profileStore.observeEmergencyId().collect { _emergencyId.value = it } }
        viewModelScope.launch {
            PeopleRepository(context).observePeople().collect { if (it.isNotEmpty()) _people.value = it }
        }
        viewModelScope.launch {
            AlertsRepository(context).observeAlerts().collect { if (it.isNotEmpty()) _alerts.value = it }
        }
        viewModelScope.launch {
            SheltersRepository(context).observeShelters().collect { if (it.isNotEmpty()) _shelters.value = it }
        }
    }

    override fun onCleared() {
        runCatching { context.unregisterReceiver(beaconStateReceiver) }
        runCatching { context.unregisterReceiver(scannerReceiver) }
        alarm.stop()
        super.onCleared()
    }

    fun notify(message: String) {
        _messages.tryEmit(message)
    }

    fun toggleEvent() {
        _event.update { it.copy(active = !it.active) }
    }

    fun markSelfSafe() {
        _selfSafe.value = true
        notify("Estás marcada a salvo, se notificó a 12 contactos")
    }

    fun toggleSelfSafe() {
        val next = !_selfSafe.value
        _selfSafe.value = next
        notify(if (next) "Estás marcada a salvo, se notificó a 12 contactos" else "Estado borrado")
    }

    fun setBeaconMode(mode: BeaconMode) {
        _beaconMode.value = mode
    }

    fun grantBeacon() {
        _beaconGranted.value = true
        notify("Modo beacon habilitado")
    }

    fun saveProfile(profile: EmergencyProfile) {
        _profile.value = profile
        viewModelScope.launch { profileStore.saveProfile(profile) }
        notify("Perfil de emergencia guardado")
    }

    fun startBeacon(trigger: String) {
        val status = if (_beaconMode.value == BeaconMode.SOS) PersonStatus.MISSING else PersonStatus.SEARCHING
        val intent = Intent(context, BeaconService::class.java).apply {
            action = WifiDirectConstants.ACTION_START_BEACON
            putExtra(WifiDirectConstants.EXTRA_EMERGENCY_ID, _emergencyId.value)
            putExtra(WifiDirectConstants.EXTRA_PERSON_NAME, _profile.value.name)
            putExtra(WifiDirectConstants.EXTRA_STATUS, status.name)
            putExtra(WifiDirectConstants.EXTRA_TRIGGER, trigger)
        }
        ContextCompat.startForegroundService(context, intent)
        _beaconActive.value = true
        _beaconStartedAt.value = System.currentTimeMillis()
        notify(
            if (_beaconMode.value == BeaconMode.SOS) "Beacon SOS transmitiendo"
            else "Beacon de búsqueda transmitiendo"
        )
    }

    fun stopBeacon() {
        val intent = Intent(context, BeaconService::class.java).apply {
            action = WifiDirectConstants.ACTION_STOP_BEACON
        }
        ContextCompat.startForegroundService(context, intent)
        _beaconActive.value = false
        _beaconStartedAt.value = 0L
        notify("Beacon detenido")
    }

    /** The "test your beacon" card on the calm home: a real broadcast, stopped automatically. */
    fun testBeacon() {
        val previousMode = _beaconMode.value
        _beaconMode.value = BeaconMode.SEARCH
        startBeacon(TRIGGER_TEST)
        notify("Beacon de prueba enviado, no se alertó a nadie")
        viewModelScope.launch {
            delay(TEST_BEACON_MILLIS)
            if (_beaconActive.value) stopBeacon()
            _beaconMode.value = previousMode
        }
    }

    fun startScanning() {
        val intent = Intent(context, ScannerService::class.java).apply {
            action = WifiDirectConstants.ACTION_START_SCAN
        }
        ContextCompat.startForegroundService(context, intent)
        _scanning.value = true
    }

    fun stopScanning() {
        val intent = Intent(context, ScannerService::class.java).apply {
            action = WifiDirectConstants.ACTION_STOP_SCAN
        }
        ContextCompat.startForegroundService(context, intent)
        _scanning.value = false
        _nearbyBeacons.value = emptyList()
        silenceAlarm()
    }

    fun silenceAlarm() {
        alarm.stop()
        _alarmRinging.value = false
    }

    fun markPersonSafe(person: Person) {
        _people.update { list ->
            list.map { if (it.id == person.id) it.copy(status = PersonStatus.SAFE, updated = "recién") else it }
        }
        notify("Registro actualizado, 8 seguidores notificados")
        viewModelScope.launch {
            findingsRepository.submitFinding(
                emergencyId = person.id,
                personName = person.name,
                status = PersonStatus.SAFE,
                lat = person.lat,
                lng = person.lng,
                notes = "Confirmado a salvo desde la app",
            )
        }
    }

    fun submitReport(name: String, lastSeen: String, relation: String) {
        val reported = Person(
            id = "local-${System.currentTimeMillis()}",
            name = name,
            status = PersonStatus.UNCONFIRMED,
            lastSeen = lastSeen.ifBlank { "Ubicación no indicada" },
            updated = "recién",
            distance = "",
            age = 0,
            relation = relation,
            phone = "",
            reports = 1,
        )
        _people.update { listOf(reported) + it }
        notify("Reporte de $name enviado")
        viewModelScope.launch {
            findingsRepository.submitFinding(
                emergencyId = _emergencyId.value,
                personName = name,
                status = PersonStatus.UNCONFIRMED,
                lat = 0.0,
                lng = 0.0,
                notes = "Reporte ciudadano. Visto en: $lastSeen. Relación: $relation",
            )
        }
    }

    private fun onBeaconFound(beacon: NearbyBeacon) {
        if (_nearbyBeacons.value.any { it.emergencyId == beacon.emergencyId }) return
        _nearbyBeacons.update { it + beacon }
        alarm.start()
        _alarmRinging.value = true
        notify("Beacon detectado: ${beacon.personName}")
        _alerts.update { current ->
            listOf(
                AlertItem(
                    id = "beacon-${beacon.emergencyId}",
                    icon = "crisis_alert",
                    title = "Beacon detectado: ${beacon.personName}",
                    body = "Señal WiFi Direct cerca de ti. ID ${beacon.emergencyId}.",
                    time = "recién",
                    tone = AlertTone.ERROR,
                )
            ) + current
        }
        viewModelScope.launch {
            findingsRepository.submitFinding(
                emergencyId = beacon.emergencyId,
                personName = beacon.personName,
                status = beacon.status,
                lat = 0.0,
                lng = 0.0,
                notes = "Detección automática por WiFi Direct",
            )
        }
    }

    private fun onBeaconLost(emergencyId: String) {
        _nearbyBeacons.update { list -> list.filterNot { it.emergencyId == emergencyId } }
        if (_nearbyBeacons.value.isEmpty()) silenceAlarm()
    }

    private fun statusOf(raw: String?): PersonStatus =
        PersonStatus.entries.firstOrNull { it.name == raw } ?: PersonStatus.UNCONFIRMED

    companion object {
        const val TRIGGER_MANUAL = "MANUAL"
        const val TRIGGER_SHAKE = "SHAKE"
        const val TRIGGER_TEST = "TEST"
        private const val TEST_BEACON_MILLIS = 30_000L
    }
}
