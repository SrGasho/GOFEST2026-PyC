@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.ListItemDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableLongStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.EmergencyProfile
import com.gofest.shake.mechanism.sensor.ShakeDetector
import com.gofest.shake.ui.ShakeViewModel
import com.gofest.shake.ui.components.BeaconControl
import com.gofest.shake.ui.components.BeaconMode
import com.gofest.shake.ui.components.SettingSwitch
import com.gofest.shake.ui.components.filledCardColors
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.theme.MonoTextStyle
import com.gofest.shake.ui.theme.Spacing
import kotlinx.coroutines.delay

private const val CONFIRM_SECONDS = 5

@Composable
fun BeaconScreen(
    profile: EmergencyProfile,
    emergencyId: String,
    granted: Boolean,
    active: Boolean,
    startedAt: Long,
    mode: BeaconMode,
    onMode: (BeaconMode) -> Unit,
    onGrant: () -> Unit,
    onStart: (String) -> Unit,
    onStop: () -> Unit,
    onBack: () -> Unit,
) {
    val context = LocalContext.current
    var askPermission by remember { mutableStateOf(!granted) }
    var pendingTrigger by remember { mutableStateOf<String?>(null) }
    var secondsLeft by remember { mutableIntStateOf(CONFIRM_SECONDS) }
    var elapsedMillis by remember { mutableLongStateOf(0L) }

    // A shake is only a suggestion: the beacon starts after the countdown, or never if cancelled.
    DisposableEffect(granted, active) {
        if (!granted || active) return@DisposableEffect onDispose { }
        val detector = ShakeDetector(context) {
            if (pendingTrigger == null) pendingTrigger = ShakeViewModel.TRIGGER_SHAKE
        }
        detector.start()
        onDispose { detector.stop() }
    }

    LaunchedEffect(pendingTrigger) {
        val trigger = pendingTrigger ?: return@LaunchedEffect
        secondsLeft = CONFIRM_SECONDS
        while (secondsLeft > 0) {
            delay(1000)
            secondsLeft--
        }
        pendingTrigger = null
        onStart(trigger)
    }

    LaunchedEffect(active, startedAt) {
        while (active && startedAt > 0L) {
            elapsedMillis = System.currentTimeMillis() - startedAt
            delay(1000)
        }
        if (!active) elapsedMillis = 0L
    }

    Column(Modifier.fillMaxWidth()) {
        TopAppBar(
            title = { Text("Beacon") },
            navigationIcon = {
                IconButton(onClick = onBack) {
                    Icon(iconFor("arrow_back"), contentDescription = "Volver")
                }
            },
            actions = {
                IconButton(onClick = { askPermission = true }) {
                    Icon(iconFor("help"), contentDescription = "Cómo funciona el beacon")
                }
            },
        )
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(start = 16.dp, end = 16.dp, top = Spacing.space2, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(Spacing.space5),
        ) {
            SingleChoiceSegmentedButtonRow(Modifier.fillMaxWidth()) {
                SegmentedButton(
                    selected = mode == BeaconMode.SOS,
                    onClick = { onMode(BeaconMode.SOS) },
                    shape = SegmentedButtonDefaults.itemShape(index = 0, count = 2),
                ) { Text("SOS") }
                SegmentedButton(
                    selected = mode == BeaconMode.SEARCH,
                    onClick = { onMode(BeaconMode.SEARCH) },
                    shape = SegmentedButtonDefaults.itemShape(index = 1, count = 2),
                ) { Text("Buscando") }
            }

            Box(Modifier.fillMaxWidth(), contentAlignment = Alignment.Center) {
                BeaconControl(
                    mode = mode,
                    active = active,
                    enabled = granted,
                    onActivate = { pendingTrigger = ShakeViewModel.TRIGGER_MANUAL },
                    onStop = onStop,
                    modifier = Modifier.padding(vertical = Spacing.space3),
                )
            }

            if (!granted) {
                Card(
                    colors = filledCardColors(
                        container = MaterialTheme.colorScheme.secondaryContainer,
                        content = MaterialTheme.colorScheme.onSecondaryContainer,
                    ),
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    Row(
                        Modifier.padding(16.dp),
                        horizontalArrangement = Arrangement.spacedBy(Spacing.space3),
                    ) {
                        Icon(iconFor("info"), contentDescription = null, modifier = Modifier.size(20.dp))
                        Text(
                            text = "Habilita el modo beacon para transmitir. Tu teléfono también detecta el sismo por el acelerómetro y te propone enviar el SOS.",
                            style = MaterialTheme.typography.bodySmall,
                        )
                    }
                }
            }

            if (active) {
                Card(
                    colors = filledCardColors(
                        container = if (mode == BeaconMode.SOS) MaterialTheme.colorScheme.errorContainer
                        else MaterialTheme.colorScheme.primaryContainer,
                        content = if (mode == BeaconMode.SOS) MaterialTheme.colorScheme.onErrorContainer
                        else MaterialTheme.colorScheme.onPrimaryContainer,
                    ),
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    Column(Modifier.padding(16.dp)) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(10.dp),
                        ) {
                            Icon(
                                iconFor("wifi_tethering"),
                                contentDescription = null,
                                modifier = Modifier.size(20.dp),
                            )
                            Text(
                                text = "Transmitiendo desde hace ${formatElapsed(elapsedMillis)}",
                                style = MaterialTheme.typography.titleSmall,
                            )
                        }
                        Text(
                            text = "Servicio WiFi Direct publicado. Cualquier rescatista con Shake que escanee cerca de ti lo va a detectar sin internet.",
                            style = MaterialTheme.typography.bodySmall,
                            modifier = Modifier.padding(top = 6.dp),
                        )
                    }
                }
            }

            Column {
                Text(
                    text = "LO QUE ENVÍA TU BEACON",
                    style = MaterialTheme.typography.titleSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(start = 4.dp, bottom = Spacing.space2),
                )
                OutlinedCard(Modifier.fillMaxWidth()) {
                    BeaconDataRow(
                        icon = "person",
                        headline = profile.name.ifBlank { "Sin nombre" },
                        supporting = "Nombre y edad",
                    )
                    HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    BeaconDataRow(
                        icon = "bloodtype",
                        headline = profile.blood.ifBlank { "Sin registrar" },
                        supporting = "Tipo de sangre",
                        tint = MaterialTheme.colorScheme.error,
                    )
                    HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    BeaconDataRow(
                        icon = "allergies",
                        headline = profile.allergies.ifBlank { "Ninguna registrada" },
                        supporting = "Alergias y condiciones",
                    )
                    HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    ListItem(
                        colors = ListItemDefaults.colors(containerColor = Color.Transparent),
                        leadingContent = {
                            Icon(
                                iconFor("badge"),
                                contentDescription = null,
                                tint = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        },
                        headlineContent = {
                            Text(
                                text = emergencyId.ifBlank { "Generando…" },
                                style = MonoTextStyle,
                            )
                        },
                        supportingContent = { Text("Identificador de emergencia de este teléfono") },
                    )
                    HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    BeaconDataRow(
                        icon = "location_on",
                        headline = "Se comparte al activar el beacon",
                        supporting = "Última posición conocida",
                    )
                }
            }

            Card(colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp)) {
                    Text("Ajustes del beacon", style = MaterialTheme.typography.titleMedium)
                    SettingSwitch("Seguir transmitiendo con la pantalla apagada", true)
                    SettingSwitch("Retransmitir beacons de otras personas", true)
                    SettingSwitch("Pulso audible cada 30 s", false)
                }
            }
        }
    }

    if (pendingTrigger != null) {
        AlertDialog(
            onDismissRequest = { pendingTrigger = null },
            icon = { Icon(iconFor("sos"), contentDescription = null) },
            title = {
                Text(
                    if (pendingTrigger == ShakeViewModel.TRIGGER_SHAKE) "Detectamos un movimiento fuerte"
                    else "Confirma el envío"
                )
            },
            text = {
                Text(
                    "El beacon empieza a transmitir en $secondsLeft s. " +
                        "Cancela si estás bien, nadie será alertado."
                )
            },
            confirmButton = {
                Button(onClick = {
                    val trigger = pendingTrigger ?: ShakeViewModel.TRIGGER_MANUAL
                    pendingTrigger = null
                    onStart(trigger)
                }) { Text("Enviar ahora") }
            },
            dismissButton = {
                TextButton(onClick = { pendingTrigger = null }) { Text("Cancelar") }
            },
        )
    }

    if (askPermission) {
        ModalBottomSheet(onDismissRequest = { askPermission = false }) {
            Column(Modifier.padding(start = 24.dp, end = 24.dp, bottom = 32.dp)) {
                Text("¿Permitir el modo beacon?", style = MaterialTheme.typography.headlineSmall)
                Text(
                    text = "El modo beacon transmite tu posición y tu perfil de emergencia para que rescatistas y teléfonos cercanos puedan encontrarte. Funciona sin red, punto a punto por WiFi Direct.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(top = Spacing.space3, bottom = Spacing.space4),
                )
                OutlinedCard(Modifier.fillMaxWidth()) {
                    PermissionRow("my_location", "Ubicación precisa", "Solo mientras un beacon está activo")
                    HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    PermissionRow("bluetooth", "Dispositivos cercanos", "Para encontrarnos cuando no hay señal")
                    HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    PermissionRow("notifications_active", "Actividad en segundo plano", "Para que el beacon siga con la pantalla apagada")
                    HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    PermissionRow("badge", "Perfil de emergencia", "Nombre, edad, tipo de sangre y alergias")
                }
                Text(
                    text = "No se transmite nada hasta que inicies un beacon. Puedes revocarlo cuando quieras en Yo, Privacidad.",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(vertical = Spacing.space4),
                )
                Row(horizontalArrangement = Arrangement.spacedBy(Spacing.space2)) {
                    TextButton(onClick = { askPermission = false }, modifier = Modifier.weight(1f)) {
                        Text("Ahora no")
                    }
                    Button(
                        onClick = {
                            onGrant()
                            askPermission = false
                        },
                        modifier = Modifier.weight(1.6f),
                    ) {
                        Icon(iconFor("check"), contentDescription = null, modifier = Modifier.size(18.dp))
                        Text("Permitir el modo beacon", Modifier.padding(start = Spacing.space2))
                    }
                }
            }
        }
    }
}

@Composable
private fun BeaconDataRow(
    icon: String,
    headline: String,
    supporting: String,
    tint: Color = MaterialTheme.colorScheme.onSurfaceVariant,
) {
    ListItem(
        colors = ListItemDefaults.colors(containerColor = Color.Transparent),
        leadingContent = { Icon(iconFor(icon), contentDescription = null, tint = tint) },
        headlineContent = { Text(headline) },
        supportingContent = { Text(supporting) },
    )
}

@Composable
private fun PermissionRow(icon: String, headline: String, supporting: String) {
    ListItem(
        colors = ListItemDefaults.colors(containerColor = Color.Transparent),
        leadingContent = {
            Icon(iconFor(icon), contentDescription = null, tint = MaterialTheme.colorScheme.primary)
        },
        headlineContent = { Text(headline) },
        supportingContent = { Text(supporting) },
    )
}

private fun formatElapsed(millis: Long): String {
    val totalSeconds = millis / 1000
    val minutes = totalSeconds / 60
    val seconds = totalSeconds % 60
    return if (minutes > 0) "$minutes min $seconds s" else "$seconds s"
}
