@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.SegmentedButton
import androidx.compose.material3.SegmentedButtonDefaults
import androidx.compose.material3.SingleChoiceSegmentedButtonRow
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.Person
import com.gofest.shake.data.model.PersonStatus
import com.gofest.shake.data.model.Shelter
import com.gofest.shake.ui.NearbyBeacon
import com.gofest.shake.ui.components.Avatar
import com.gofest.shake.ui.components.PersonRow
import com.gofest.shake.ui.components.filledCardColors
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.theme.ShapeXl
import com.gofest.shake.ui.theme.Spacing

private enum class SearchTab { PEOPLE, SHELTERS }

@Composable
fun SearchScreen(
    people: List<Person>,
    shelters: List<Shelter>,
    scanning: Boolean,
    nearbyBeacons: List<NearbyBeacon>,
    onStartScan: () -> Unit,
    onStopScan: () -> Unit,
    onSilenceAlarm: () -> Unit,
    onOpenPerson: (String) -> Unit,
    onReport: () -> Unit,
) {
    var query by remember { mutableStateOf("") }
    var tab by remember { mutableStateOf(SearchTab.PEOPLE) }
    var filter by remember { mutableIntStateOf(0) }

    // Opening the rescuer screen is what puts the phone in receiver mode.
    DisposableEffect(Unit) {
        onStartScan()
        onDispose { onStopScan() }
    }

    val statusFilter = when (filter) {
        1 -> PersonStatus.MISSING
        2 -> PersonStatus.SAFE
        else -> null
    }
    val visible = people.filter { person ->
        (statusFilter == null || person.status == statusFilter) &&
            person.name.contains(query, ignoreCase = true)
    }

    Box(Modifier.fillMaxSize()) {
        Column(Modifier.fillMaxWidth()) {
            OutlinedTextField(
                value = query,
                onValueChange = { query = it },
                placeholder = { Text("Nombre, teléfono o zona donde fue visto") },
                leadingIcon = { Icon(iconFor("search"), contentDescription = null) },
                trailingIcon = {
                    IconButton(onClick = { }) {
                        Icon(iconFor("mic"), contentDescription = "Búsqueda por voz")
                    }
                },
                singleLine = true,
                shape = ShapeXl,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(start = 16.dp, end = 16.dp, top = Spacing.space3, bottom = Spacing.space2),
            )

            if (scanning || nearbyBeacons.isNotEmpty()) {
                ScannerBanner(
                    scanning = scanning,
                    nearbyBeacons = nearbyBeacons,
                    onSilenceAlarm = onSilenceAlarm,
                )
            }

            TabRow(selectedTabIndex = tab.ordinal) {
                Tab(
                    selected = tab == SearchTab.PEOPLE,
                    onClick = { tab = SearchTab.PEOPLE },
                    text = { Text("Personas") },
                )
                Tab(
                    selected = tab == SearchTab.SHELTERS,
                    onClick = { tab = SearchTab.SHELTERS },
                    text = { Text("Albergues") },
                )
            }

            when (tab) {
                SearchTab.PEOPLE -> LazyColumn(Modifier.fillMaxWidth()) {
                    item {
                        SingleChoiceSegmentedButtonRow(
                            Modifier
                                .fillMaxWidth()
                                .padding(horizontal = 16.dp, vertical = Spacing.space3)
                        ) {
                            listOf("Todos", "Desaparecidos", "A salvo").forEachIndexed { index, label ->
                                SegmentedButton(
                                    selected = filter == index,
                                    onClick = { filter = index },
                                    shape = SegmentedButtonDefaults.itemShape(index = index, count = 3),
                                ) { Text(label) }
                            }
                        }
                    }
                    item {
                        Text(
                            text = "${visible.size} REGISTROS · ORDENADOS POR DISTANCIA",
                            style = MaterialTheme.typography.labelMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                            modifier = Modifier.padding(start = 16.dp, end = 16.dp, bottom = 4.dp),
                        )
                    }
                    items(visible, key = { it.id }) { person ->
                        PersonRow(person = person, onClick = { onOpenPerson(person.id) })
                    }
                    if (visible.isEmpty()) {
                        item {
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(horizontal = 24.dp, vertical = 48.dp),
                                horizontalAlignment = Alignment.CenterHorizontally,
                            ) {
                                Icon(
                                    imageVector = iconFor("person_search"),
                                    contentDescription = null,
                                    tint = MaterialTheme.colorScheme.onSurfaceVariant,
                                    modifier = Modifier.size(40.dp),
                                )
                                Text(
                                    text = "Ningún registro coincide con \"$query\".",
                                    style = MaterialTheme.typography.bodyMedium,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                    textAlign = TextAlign.Center,
                                    modifier = Modifier.padding(top = Spacing.space2),
                                )
                            }
                        }
                    }
                    item { Box(Modifier.padding(bottom = 80.dp)) }
                }

                SearchTab.SHELTERS -> LazyColumn(Modifier.fillMaxWidth()) {
                    items(shelters, key = { it.id }) { shelter ->
                        ListItem(
                            leadingContent = { Avatar(icon = "home_work", size = 40.dp) },
                            headlineContent = { Text(shelter.name) },
                            supportingContent = {
                                Text(
                                    if (shelter.open) "Abierto · ${shelter.capacity}"
                                    else "Sin capacidad disponible"
                                )
                            },
                            trailingContent = {
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    Text(shelter.distance, style = MaterialTheme.typography.labelMedium)
                                    Icon(
                                        imageVector = iconFor("chevron_right"),
                                        contentDescription = null,
                                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                                    )
                                }
                            },
                        )
                        HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    }
                }
            }
        }

        ExtendedFloatingActionButton(
            onClick = onReport,
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp),
            icon = { Icon(iconFor("person_add"), contentDescription = null) },
            text = { Text("Reportar") },
        )
    }
}

@Composable
private fun ScannerBanner(
    scanning: Boolean,
    nearbyBeacons: List<NearbyBeacon>,
    onSilenceAlarm: () -> Unit,
) {
    val found = nearbyBeacons.isNotEmpty()
    Card(
        colors = filledCardColors(
            container = if (found) MaterialTheme.colorScheme.errorContainer else MaterialTheme.colorScheme.secondaryContainer,
            content = if (found) MaterialTheme.colorScheme.onErrorContainer else MaterialTheme.colorScheme.onSecondaryContainer,
        ),
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = Spacing.space2),
    ) {
        Column(Modifier.padding(16.dp)) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                Icon(
                    imageVector = iconFor(if (found) "crisis_alert" else "radar"),
                    contentDescription = null,
                    modifier = Modifier.size(20.dp),
                )
                Text(
                    text = if (found) "${nearbyBeacons.size} beacon(s) de emergencia cerca"
                    else if (scanning) "Escaneando dispositivos cercanos"
                    else "Escaneo detenido",
                    style = MaterialTheme.typography.titleSmall,
                    modifier = Modifier.weight(1f),
                )
                if (found) {
                    TextButton(onClick = onSilenceAlarm) { Text("Silenciar") }
                }
            }
            if (found) {
                nearbyBeacons.forEach { beacon ->
                    Text(
                        text = "${beacon.personName} · ${beacon.emergencyId}",
                        style = MaterialTheme.typography.bodySmall,
                        modifier = Modifier.padding(top = 4.dp),
                    )
                }
            } else {
                Text(
                    text = "El teléfono busca beacons por WiFi Direct sin usar internet. La alarma suena sola al encontrar uno.",
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(top = 4.dp),
                )
            }
        }
    }
}
