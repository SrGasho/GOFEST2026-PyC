@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Checkbox
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.unit.dp
import com.gofest.shake.ui.components.filledCardColors
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.theme.Spacing

private val RELATIONS = listOf(
    Triple("family", "Familiar", ""),
    Triple("friend", "Amistad o compañera de trabajo", ""),
    Triple("responder", "Rescatista", "Los reportes de rescatistas quedan marcados como verificados"),
)

@Composable
fun ReportScreen(
    onBack: () -> Unit,
    onSubmit: (name: String, lastSeen: String, relation: String) -> Unit,
) {
    var name by remember { mutableStateOf("") }
    var place by remember { mutableStateOf("") }
    var clothing by remember { mutableStateOf("") }
    var relation by remember { mutableStateOf("family") }
    var confirmed by remember { mutableStateOf(false) }
    var showErrors by remember { mutableStateOf(false) }

    val nameMissing = showErrors && name.isBlank()
    val confirmMissing = showErrors && !confirmed

    Column(Modifier.fillMaxWidth()) {
        TopAppBar(
            title = { Text("Reportar a alguien") },
            navigationIcon = {
                IconButton(onClick = onBack) {
                    Icon(iconFor("close"), contentDescription = "Cerrar")
                }
            },
        )
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp)
                .padding(top = 4.dp, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(Spacing.space4),
        ) {
            Text(
                text = "Cuéntanos a quién estás buscando. Todo lo que sepas ayuda: con un nombre parcial " +
                    "y una zona ya podemos empezar.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )

            OutlinedTextField(
                value = name,
                onValueChange = {
                    name = it
                    showErrors = false
                },
                label = { Text("Nombre completo") },
                isError = nameMissing,
                supportingText = {
                    Text(
                        if (nameMissing) "Se necesita un nombre o un apodo"
                        else "Con un apodo basta si es lo único que tienes"
                    )
                },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )

            OutlinedTextField(
                value = place,
                onValueChange = { place = it },
                label = { Text("Dónde se le vio por última vez") },
                leadingIcon = { Icon(iconFor("location_on"), contentDescription = null) },
                trailingIcon = {
                    IconButton(onClick = { }) {
                        Icon(iconFor("my_location"), contentDescription = "Usar mi ubicación")
                    }
                },
                supportingText = { Text("Esquina, barrio o edificio más cercano") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )

            OutlinedTextField(
                value = clothing,
                onValueChange = { clothing = it },
                label = { Text("Cómo estaba vestida") },
                supportingText = { Text("Color y tipo de ropa") },
                minLines = 2,
                modifier = Modifier.fillMaxWidth(),
            )

            Text(
                text = "TU RELACIÓN",
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(start = 4.dp),
            )
            Column {
                RELATIONS.forEach { (value, label, supporting) ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .selectable(
                                selected = relation == value,
                                role = Role.RadioButton,
                                onClick = { relation = value },
                            )
                            .padding(vertical = 4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        RadioButton(selected = relation == value, onClick = null)
                        Column(Modifier.padding(start = Spacing.space2)) {
                            Text(label, style = MaterialTheme.typography.bodyLarge)
                            if (supporting.isNotBlank()) {
                                Text(
                                    text = supporting,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                        }
                    }
                }
            }

            Card(colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(Spacing.space3),
                ) {
                    Icon(
                        imageVector = iconFor("info"),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(20.dp),
                    )
                    Text(
                        text = "Los reportes los ve cualquiera que busque en esta emergencia y los organismos " +
                            "de socorro acreditados. Tus datos de contacto quedan ocultos hasta que tú los liberes.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }

            Row(verticalAlignment = Alignment.CenterVertically) {
                Checkbox(
                    checked = confirmed,
                    onCheckedChange = {
                        confirmed = it
                        showErrors = false
                    },
                )
                Column(Modifier.padding(start = Spacing.space2)) {
                    Text("Confirmo que este reporte es verídico", style = MaterialTheme.typography.bodyLarge)
                    Text(
                        text = if (confirmMissing) "Debes confirmar para poder enviar"
                        else "Los reportes falsos retrasan a los rescatistas",
                        style = MaterialTheme.typography.bodySmall,
                        color = if (confirmMissing) MaterialTheme.colorScheme.error
                        else MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }

            Button(
                onClick = {
                    if (name.isBlank() || !confirmed) {
                        showErrors = true
                    } else {
                        onSubmit(name.trim(), place.trim(), relation)
                    }
                },
                modifier = Modifier.fillMaxWidth(),
            ) {
                Icon(iconFor("send"), contentDescription = null, modifier = Modifier.size(18.dp))
                Text("Enviar reporte", Modifier.padding(start = 8.dp))
            }
        }
    }
}
