@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AssistChip
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CenterAlignedTopAppBar
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledIconButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.gofest.shake.R
import com.gofest.shake.data.model.Person
import com.gofest.shake.data.model.PersonStatus
import com.gofest.shake.data.model.SeismicEvent
import com.gofest.shake.ui.components.PulsingCrisisIcon
import com.gofest.shake.ui.components.SeismicLevelBars
import com.gofest.shake.ui.components.filledCardColors
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.components.statusContainerColor
import com.gofest.shake.ui.components.statusContentColor
import com.gofest.shake.ui.theme.ShakeCautionColors
import com.gofest.shake.ui.theme.ShakeStatusColors
import com.gofest.shake.ui.theme.Spacing

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    event: SeismicEvent,
    people: List<Person>,
    profileCompleteness: Int,
    safe: Boolean,
    onToggleEvent: () -> Unit,
    onSafe: () -> Unit,
    onBeacon: () -> Unit,
    onProfile: () -> Unit,
    onTest: () -> Unit,
    onMap: () -> Unit,
) {
    Column(Modifier.fillMaxWidth()) {
        CenterAlignedTopAppBar(
            title = {
                Image(
                    painter = painterResource(R.drawable.logo_shield),
                    contentDescription = "Shake",
                    modifier = Modifier.height(30.dp),
                )
            },
            actions = {
                if (event.active) {
                    FilledIconButton(onClick = onToggleEvent) {
                        Icon(iconFor("bolt"), contentDescription = "Simular evento")
                    }
                } else {
                    IconButton(onClick = onToggleEvent) {
                        Icon(iconFor("bolt"), contentDescription = "Simular evento")
                    }
                }
                IconButton(onClick = { }) {
                    Icon(iconFor("more_vert"), contentDescription = "Más opciones")
                }
            },
            colors = TopAppBarDefaults.centerAlignedTopAppBarColors(
                containerColor = MaterialTheme.colorScheme.surface,
            ),
        )
        if (event.active) {
            EventHome(
                event = event,
                people = people,
                safe = safe,
                onSafe = onSafe,
                onBeacon = onBeacon,
                onMap = onMap,
            )
        } else {
            CalmHome(
                profileCompleteness = profileCompleteness,
                onProfile = onProfile,
                onTest = onTest,
                onBeacon = onBeacon,
            )
        }
    }
}

@Composable
private fun EventHome(
    event: SeismicEvent,
    people: List<Person>,
    safe: Boolean,
    onSafe: () -> Unit,
    onBeacon: () -> Unit,
    onMap: () -> Unit,
) {
    val unaccounted = people.count { it.status == PersonStatus.MISSING || it.status == PersonStatus.INJURED }
    Column(
        Modifier
            .fillMaxWidth()
            .verticalScroll(rememberScrollState())
    ) {
        Column(
            Modifier
                .fillMaxWidth()
                .background(MaterialTheme.colorScheme.errorContainer)
                .padding(start = 16.dp, end = 16.dp, top = 20.dp, bottom = 24.dp)
        ) {
            val onBanner = MaterialTheme.colorScheme.onErrorContainer
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(Spacing.space2),
            ) {
                PulsingCrisisIcon(size = 20.dp, tint = onBanner)
                Text(
                    text = "SISMO DETECTADO · ${event.time.uppercase()}",
                    style = MaterialTheme.typography.labelLarge,
                    letterSpacing = 0.8.sp,
                    color = onBanner,
                )
            }
            Row(
                modifier = Modifier.padding(top = Spacing.space2),
                verticalAlignment = Alignment.Bottom,
                horizontalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                Text(
                    text = "M${event.magnitude}",
                    style = MaterialTheme.typography.displayLarge,
                    color = onBanner,
                )
                Text(
                    text = "Intensidad ${romanIntensity(event.level)}",
                    style = MaterialTheme.typography.titleMedium,
                    color = onBanner,
                    modifier = Modifier.padding(bottom = 6.dp),
                )
            }
            Text(
                text = "${event.place} · ${event.time}",
                style = MaterialTheme.typography.bodyMedium,
                color = onBanner.copy(alpha = 0.85f),
                modifier = Modifier.padding(top = 4.dp),
            )
            SeismicLevelBars(
                level = event.level,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 14.dp),
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 6.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
            ) {
                Text("DÉBIL", style = MaterialTheme.typography.labelSmall, color = onBanner.copy(alpha = 0.75f))
                Text("SEVERO", style = MaterialTheme.typography.labelSmall, color = onBanner.copy(alpha = 0.75f))
            }
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 18.dp),
                horizontalArrangement = Arrangement.spacedBy(Spacing.space2),
            ) {
                Button(
                    onClick = onSafe,
                    enabled = !safe,
                    modifier = Modifier
                        .weight(1f)
                        .height(52.dp),
                ) {
                    Icon(iconFor("check_circle"), contentDescription = null, modifier = Modifier.size(20.dp))
                    Text(
                        text = if (safe) "Estás a salvo" else "Estoy a salvo",
                        modifier = Modifier.padding(start = Spacing.space2),
                    )
                }
                Button(
                    onClick = onBeacon,
                    modifier = Modifier.height(52.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = MaterialTheme.colorScheme.error,
                        contentColor = MaterialTheme.colorScheme.onError,
                    ),
                ) {
                    Icon(iconFor("sos"), contentDescription = null, modifier = Modifier.size(20.dp))
                    Text("SOS", modifier = Modifier.padding(start = Spacing.space2))
                }
            }
        }

        SectionTitle("Haz esto ahora", Modifier.padding(start = 16.dp, end = 16.dp, top = 20.dp, bottom = 8.dp))
        OutlinedCard(Modifier.padding(horizontal = 16.dp)) {
            SAFETY_STEPS.forEachIndexed { index, step ->
                SafetyStepRow(number = index + 1, step = step)
                if (index < SAFETY_STEPS.lastIndex) {
                    HorizontalDivider(
                        Modifier.padding(start = 60.dp),
                        color = MaterialTheme.colorScheme.outlineVariant,
                    )
                }
            }
        }

        Card(
            onClick = onMap,
            colors = filledCardColors(),
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(14.dp),
            ) {
                Box(
                    modifier = Modifier
                        .size(44.dp)
                        .background(statusContainerColor(PersonStatus.MISSING), CircleShape),
                    contentAlignment = Alignment.Center,
                ) {
                    Icon(
                        imageVector = iconFor("person_search"),
                        contentDescription = null,
                        tint = statusContentColor(PersonStatus.MISSING),
                        modifier = Modifier.size(24.dp),
                    )
                }
                Column(Modifier.weight(1f)) {
                    Text(
                        text = "$unaccounted personas sin localizar cerca de ti",
                        style = MaterialTheme.typography.titleSmall,
                    )
                    Text(
                        text = "En 5 km a la redonda · actualizado hace 2 min",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
                Icon(
                    imageVector = iconFor("chevron_right"),
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 16.dp, end = 16.dp, bottom = 24.dp),
            horizontalArrangement = Arrangement.spacedBy(Spacing.space2),
        ) {
            AssistChip(
                onClick = onMap,
                label = { Text("Albergue más cercano · 900 m") },
                leadingIcon = { Icon(iconFor("home_work"), null, Modifier.size(18.dp)) },
            )
            AssistChip(
                onClick = { },
                label = { Text("Modo malla") },
                leadingIcon = { Icon(iconFor("signal_disconnected"), null, Modifier.size(18.dp)) },
            )
        }
    }
}

@Composable
private fun CalmHome(
    profileCompleteness: Int,
    onProfile: () -> Unit,
    onTest: () -> Unit,
    onBeacon: () -> Unit,
) {
    val status = ShakeStatusColors()
    val caution = ShakeCautionColors()
    Column(
        Modifier
            .fillMaxWidth()
            .verticalScroll(rememberScrollState())
    ) {
        Column(
            Modifier
                .fillMaxWidth()
                .background(status.safeContainer)
                .padding(horizontal = 16.dp, vertical = 20.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(Spacing.space2),
            ) {
                Icon(
                    imageVector = iconFor("check_circle"),
                    contentDescription = null,
                    tint = status.onSafeContainer,
                    modifier = Modifier.size(22.dp),
                )
                Text(
                    text = "Sin eventos sísmicos activos",
                    style = MaterialTheme.typography.titleMedium,
                    color = status.onSafeContainer,
                )
            }
            Text(
                text = "San José del Palmar, Chocó. Última revisión hace 30 segundos.",
                style = MaterialTheme.typography.bodySmall,
                color = status.onSafeContainer.copy(alpha = 0.8f),
                modifier = Modifier.padding(top = 4.dp),
            )
        }

        SectionTitle("Avisos", Modifier.padding(start = 16.dp, end = 16.dp, top = 16.dp, bottom = 8.dp))
        OutlinedCard(Modifier.padding(horizontal = 16.dp)) {
            AdvisoryRow(
                icon = "warning",
                container = caution.cautionContainer,
                content = caution.onCautionContainer,
                headline = "Vigilancia de réplicas por 72 horas",
                supporting = "Probabilidad elevada de sismos M4+ en la cuenca del San Juan.",
            )
            HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
            AdvisoryRow(
                icon = "rainy",
                container = MaterialTheme.colorScheme.secondaryContainer,
                content = MaterialTheme.colorScheme.onSecondaryContainer,
                headline = "Lluvias fuertes desde las 18:00",
                supporting = "Riesgo de deslizamiento en laderas debilitadas el mes pasado.",
            )
            HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
            AdvisoryRow(
                icon = "campaign",
                container = MaterialTheme.colorScheme.secondaryContainer,
                content = MaterialTheme.colorScheme.onSecondaryContainer,
                headline = "Simulacro municipal, jueves 10:00",
                supporting = "Llegará una alerta de prueba a este teléfono. No requiere acción.",
            )
        }

        SectionTitle("Prepárate", Modifier.padding(start = 16.dp, end = 16.dp, top = 20.dp, bottom = 8.dp))
        Column(
            modifier = Modifier.padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(Spacing.space3),
        ) {
            Card(onClick = onProfile, colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp)) {
                    ReadyRow(
                        icon = "badge",
                        headline = "Perfil de emergencia $profileCompleteness% completo",
                        supporting = "Los rescatistas leen esto primero.",
                    )
                    LinearProgressIndicator(
                        progress = { profileCompleteness / 100f },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = Spacing.space3),
                    )
                }
            }
            Card(onClick = onTest, colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Box(Modifier.padding(16.dp)) {
                    ReadyRow(
                        icon = "wifi_tethering",
                        headline = "Prueba tu beacon",
                        supporting = "Una transmisión silenciosa de 30 segundos. No se alerta a nadie.",
                    )
                }
            }
            Card(onClick = { }, colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Box(Modifier.padding(16.dp)) {
                    ReadyRow(
                        icon = "backpack",
                        headline = "Lista del morral de emergencia",
                        supporting = "7 de 14 elementos confirmados. El agua vence en 3 meses.",
                    )
                }
            }
        }

        OutlinedButton(
            onClick = onBeacon,
            modifier = Modifier
                .fillMaxWidth()
                .padding(start = 16.dp, end = 16.dp, top = 20.dp, bottom = 24.dp),
        ) {
            Icon(iconFor("sos"), contentDescription = null, modifier = Modifier.size(20.dp))
            Text("Abrir beacon", Modifier.padding(start = Spacing.space2))
        }
    }
}

@Composable
private fun SectionTitle(text: String, modifier: Modifier = Modifier) {
    Text(text = text, style = MaterialTheme.typography.titleMedium, modifier = modifier)
}

@Composable
private fun AdvisoryRow(
    icon: String,
    container: Color,
    content: Color,
    headline: String,
    supporting: String,
) {
    Row(
        modifier = Modifier.padding(horizontal = 16.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(Spacing.space4),
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .background(container, CircleShape),
            contentAlignment = Alignment.Center,
        ) {
            Icon(iconFor(icon), contentDescription = null, tint = content, modifier = Modifier.size(22.dp))
        }
        Column(Modifier.weight(1f)) {
            Text(headline, style = MaterialTheme.typography.bodyLarge)
            Text(
                text = supporting,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }
    }
}

@Composable
private fun ReadyRow(icon: String, headline: String, supporting: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(Spacing.space3),
    ) {
        Icon(
            imageVector = iconFor(icon),
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        Column(Modifier.weight(1f)) {
            Text(headline, style = MaterialTheme.typography.titleSmall)
            Text(
                text = supporting,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 2.dp),
            )
        }
        Icon(
            imageVector = iconFor("chevron_right"),
            contentDescription = null,
            tint = MaterialTheme.colorScheme.onSurfaceVariant,
        )
    }
}

private data class SafetyStep(val icon: String, val title: String, val body: String)

private val SAFETY_STEPS = listOf(
    SafetyStep("shield", "Agáchate, cúbrete y agárrate", "Quédate abajo hasta que el temblor pare por completo. No salgas corriendo."),
    SafetyStep("health_and_safety", "Revisa si tienes heridas", "Luego revisa a quien tengas al alcance."),
    SafetyStep("check_circle", "Avisa que estás a salvo", "Un toque notifica a tus 12 contactos."),
    SafetyStep("door_open", "Despeja tu ruta de salida", "Abre la puerta. Aléjate de vidrios y estanterías."),
    SafetyStep("water_drop", "Cierra el gas y el agua", "Solo si puedes llegar a la válvula sin riesgo."),
)

@Composable
private fun SafetyStepRow(number: Int, step: SafetyStep) {
    var done by remember { mutableStateOf(false) }
    val status = ShakeStatusColors()
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(if (done) status.safeContainer else Color.Transparent)
            .clickable { done = !done }
            .padding(horizontal = 16.dp, vertical = 12.dp),
        horizontalArrangement = Arrangement.spacedBy(Spacing.space3),
    ) {
        Box(
            modifier = Modifier
                .size(32.dp)
                .background(
                    if (done) status.safe else MaterialTheme.colorScheme.secondaryContainer,
                    CircleShape,
                ),
            contentAlignment = Alignment.Center,
        ) {
            Icon(
                imageVector = iconFor(if (done) "check" else step.icon),
                contentDescription = null,
                tint = if (done) Color.White else MaterialTheme.colorScheme.onSecondaryContainer,
                modifier = Modifier.size(18.dp),
            )
        }
        Column(Modifier.weight(1f)) {
            Text(
                text = "$number. ${step.title}",
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.Medium,
                color = if (done) status.onSafeContainer else MaterialTheme.colorScheme.onSurface,
            )
            Text(
                text = step.body,
                style = MaterialTheme.typography.bodySmall,
                color = if (done) status.onSafeContainer else MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(top = 2.dp),
            )
        }
    }
}

private fun romanIntensity(level: Int): String = when (level) {
    1 -> "I"
    2 -> "II"
    3 -> "III"
    4 -> "IV"
    5 -> "V"
    6 -> "VI"
    else -> "VII+"
}
