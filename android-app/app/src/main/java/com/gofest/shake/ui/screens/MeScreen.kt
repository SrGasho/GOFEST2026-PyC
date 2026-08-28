@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.ListItemDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.EmergencyProfile
import com.gofest.shake.data.model.PersonStatus
import com.gofest.shake.ui.components.Avatar
import com.gofest.shake.ui.components.StatusChip
import com.gofest.shake.ui.components.filledCardColors
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.components.SettingSwitch
import com.gofest.shake.ui.components.surfaceContainerLow
import com.gofest.shake.ui.theme.ShakeStatusColors
import com.gofest.shake.ui.theme.Spacing

@Composable
fun MeScreen(
    profile: EmergencyProfile,
    safe: Boolean,
    beaconActive: Boolean,
    onSafe: () -> Unit,
    onProfile: () -> Unit,
    onBeacon: () -> Unit,
) {
    val status = ShakeStatusColors()

    Column(Modifier.fillMaxWidth()) {
        TopAppBar(
            title = { Text("Yo") },
            actions = {
                IconButton(onClick = { }) {
                    Icon(iconFor("settings"), contentDescription = "Ajustes")
                }
            },
        )
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp)
                .padding(bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(Spacing.space4),
        ) {
            Card(
                colors = filledCardColors(
                    container = if (safe) status.safeContainer else surfaceContainerLow(),
                    content = if (safe) status.onSafeContainer else MaterialTheme.colorScheme.onSurface,
                ),
                modifier = Modifier.fillMaxWidth(),
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 20.dp, vertical = 24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(14.dp),
                ) {
                    Avatar(
                        name = profile.name,
                        size = 72.dp,
                        status = if (safe) PersonStatus.SAFE else PersonStatus.UNCONFIRMED,
                    )
                    Text(profile.name, style = MaterialTheme.typography.titleLarge)
                    StatusChip(
                        status = if (safe) PersonStatus.SAFE else PersonStatus.UNCONFIRMED,
                        label = if (safe) "Marcada a salvo" else "Sin marcar todavía",
                    )
                    Text(
                        text = if (safe) {
                            "Se avisó a tus 12 contactos a las 06:31. Actualiza esto si tu situación cambia."
                        } else {
                            "Seis personas están siguiendo tu estado. Con un toque les avisas a todas que estás bien."
                        },
                        style = MaterialTheme.typography.bodyMedium,
                        color = if (safe) status.onSafeContainer else MaterialTheme.colorScheme.onSurfaceVariant,
                        textAlign = TextAlign.Center,
                    )
                    if (safe) {
                        OutlinedButton(onClick = onSafe, modifier = Modifier.fillMaxWidth()) {
                            Icon(iconFor("edit"), contentDescription = null, modifier = Modifier.size(18.dp))
                            Text("Cambiar mi estado", Modifier.padding(start = 8.dp))
                        }
                    } else {
                        Button(onClick = onSafe, modifier = Modifier.fillMaxWidth()) {
                            Icon(iconFor("check_circle"), contentDescription = null, modifier = Modifier.size(18.dp))
                            Text("Estoy a salvo", Modifier.padding(start = 8.dp))
                        }
                    }
                }
            }

            OutlinedCard(Modifier.fillMaxWidth()) {
                MeRow(
                    headline = "Modo beacon",
                    supporting = if (beaconActive) "Transmitiendo ahora" else "Apagado · requiere permiso",
                    onClick = onBeacon,
                    leading = {
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(
                                    if (beaconActive) MaterialTheme.colorScheme.errorContainer
                                    else MaterialTheme.colorScheme.secondaryContainer
                                ),
                            contentAlignment = Alignment.Center,
                        ) {
                            Icon(
                                imageVector = iconFor("wifi_tethering"),
                                contentDescription = null,
                                tint = if (beaconActive) MaterialTheme.colorScheme.onErrorContainer
                                else MaterialTheme.colorScheme.onSecondaryContainer,
                                modifier = Modifier.size(22.dp),
                            )
                        }
                    },
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                MeRow(
                    headline = "Perfil de emergencia",
                    supporting = "${profile.blood.ifBlank { "Sin tipo de sangre" }} · " +
                        profile.allergies.ifBlank { "Sin alergias registradas" },
                    onClick = onProfile,
                    leading = { MeIcon("badge") },
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                MeRow("Personas que me siguen", "12 contactos", leading = { MeIcon("group") })
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                MeRow("Personas que sigo", "6 registros", leading = { MeIcon("bookmark") })
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                MeRow("Mis reportes", "2 enviados", leading = { MeIcon("history") })
            }

            Card(colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp)) {
                    Text("Privacidad", style = MaterialTheme.typography.titleMedium)
                    SettingSwitch("Compartir ubicación con los organismos de socorro", true)
                    SettingSwitch("Mostrar mi número en mi registro", false)
                    SettingSwitch("Funcionar sin internet por malla", true)
                }
            }
        }
    }
}

@Composable
private fun MeIcon(name: String) {
    Icon(
        imageVector = iconFor(name),
        contentDescription = null,
        tint = MaterialTheme.colorScheme.onSurfaceVariant,
    )
}

@Composable
private fun MeRow(
    headline: String,
    supporting: String,
    leading: @Composable () -> Unit,
    onClick: (() -> Unit)? = null,
) {
    ListItem(
        colors = ListItemDefaults.colors(containerColor = Color.Transparent),
        modifier = if (onClick == null) Modifier else Modifier.clickable { onClick() },
        leadingContent = leading,
        headlineContent = { Text(headline) },
        supportingContent = { Text(supporting) },
        trailingContent = {
            Icon(
                imageVector = iconFor("chevron_right"),
                contentDescription = null,
                tint = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        },
    )
}
