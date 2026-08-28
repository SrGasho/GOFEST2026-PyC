@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.ListItemDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.Person
import com.gofest.shake.ui.components.Avatar
import com.gofest.shake.ui.components.StatusChip
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.theme.Spacing

@Composable
fun PersonScreen(person: Person, onBack: () -> Unit, onMarkSafe: () -> Unit) {
    var confirming by remember { mutableStateOf(false) }

    Column(Modifier.fillMaxWidth()) {
        TopAppBar(
            title = { Text(person.name, maxLines = 1, overflow = TextOverflow.Ellipsis) },
            navigationIcon = {
                IconButton(onClick = onBack) {
                    Icon(iconFor("arrow_back"), contentDescription = "Volver")
                }
            },
            actions = {
                IconButton(onClick = { }) { Icon(iconFor("share"), contentDescription = "Compartir") }
                IconButton(onClick = { }) { Icon(iconFor("bookmark"), contentDescription = "Seguir") }
                IconButton(onClick = { }) { Icon(iconFor("more_vert"), contentDescription = "Más opciones") }
            },
        )
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp)
                .padding(bottom = 24.dp),
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = Spacing.space2, bottom = Spacing.space5),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(Spacing.space3),
            ) {
                Avatar(name = person.name, size = 96.dp, status = person.status)
                Text(person.name, style = MaterialTheme.typography.headlineSmall)
                StatusChip(status = person.status)
                Text(
                    text = personMeta(person),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(Spacing.space2),
            ) {
                FilledTonalButton(onClick = { }, modifier = Modifier.weight(1f)) {
                    Icon(iconFor("call"), contentDescription = null, modifier = Modifier.size(18.dp))
                    Text("Llamar", Modifier.padding(start = 6.dp))
                }
                FilledTonalButton(onClick = { }, modifier = Modifier.weight(1f)) {
                    Icon(iconFor("directions"), contentDescription = null, modifier = Modifier.size(18.dp))
                    Text("Ruta", Modifier.padding(start = 6.dp))
                }
                Button(onClick = { confirming = true }, modifier = Modifier.weight(1.4f)) {
                    Icon(iconFor("check_circle"), contentDescription = null, modifier = Modifier.size(18.dp))
                    Text("A salvo", Modifier.padding(start = 6.dp))
                }
            }

            OutlinedCard(
                Modifier
                    .fillMaxWidth()
                    .padding(vertical = Spacing.space4)
            ) {
                DetailRow("location_on", person.lastSeen.ifBlank { "Sin ubicación" }, "Última ubicación confirmada")
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                DetailRow("call", person.phone.ifBlank { "Sin teléfono" }, "Número de contacto")
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                DetailRow("fact_check", "${person.reports} reportes independientes", "2 provienen de rescatistas verificados")
            }

            Text(
                text = "LÍNEA DE TIEMPO",
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(start = 4.dp, bottom = Spacing.space2),
            )
            OutlinedCard(Modifier.fillMaxWidth()) {
                DetailRow(
                    icon = "schedule",
                    headline = "06:20 · Salió de su casa en el Centro",
                    supporting = "Reportado por un colega",
                    tint = MaterialTheme.colorScheme.primary,
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                DetailRow(
                    icon = "radar",
                    headline = "07:02 · Último registro del teléfono en red",
                    supporting = "Antena a 3 cuadras al oriente",
                    tint = MaterialTheme.colorScheme.primary,
                )
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                DetailRow(
                    icon = "person_search",
                    headline = "08:14 · Equipo de búsqueda asignado",
                    supporting = "Equipo 7, sector Centro",
                    tint = MaterialTheme.colorScheme.primary,
                )
            }
        }
    }

    if (confirming) {
        AlertDialog(
            onDismissRequest = { confirming = false },
            icon = { Icon(iconFor("check_circle"), contentDescription = null) },
            title = { Text("¿Marcar a ${person.name.substringBefore(' ')} como encontrada a salvo?") },
            text = {
                Text(
                    "Se notifica de inmediato a todos los que siguen este registro. " +
                        "Puedes deshacerlo durante cinco minutos."
                )
            },
            confirmButton = {
                Button(onClick = {
                    confirming = false
                    onMarkSafe()
                }) { Text("Confirmar") }
            },
            dismissButton = {
                TextButton(onClick = { confirming = false }) { Text("Cancelar") }
            },
        )
    }
}

@Composable
private fun DetailRow(
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

private fun personMeta(person: Person): String = buildList {
    if (person.age > 0) add("${person.age} años")
    if (person.relation.isNotBlank()) add(person.relation)
    if (person.updated.isNotBlank()) add("actualizado ${person.updated}")
}.joinToString(" · ")
