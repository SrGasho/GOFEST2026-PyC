@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.FilterChip
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ListItem
import androidx.compose.material3.ListItemDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedCard
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.EmergencyProfile
import com.gofest.shake.ui.components.Avatar
import com.gofest.shake.ui.components.filledCardColors
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.components.SettingSwitch
import com.gofest.shake.ui.theme.Spacing

private val BLOOD_TYPES = listOf("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")

@OptIn(ExperimentalLayoutApi::class)
@Composable
fun ProfileScreen(
    profile: EmergencyProfile,
    onBack: () -> Unit,
    onSave: (EmergencyProfile) -> Unit,
) {
    var draft by remember(profile) { mutableStateOf(profile) }

    Column(Modifier.fillMaxWidth()) {
        TopAppBar(
            title = { Text("Perfil de emergencia") },
            navigationIcon = {
                IconButton(onClick = onBack) {
                    Icon(iconFor("arrow_back"), contentDescription = "Volver")
                }
            },
        )
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp)
                .padding(top = 4.dp, bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(18.dp),
        ) {
            Card(colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    horizontalArrangement = Arrangement.spacedBy(Spacing.space3),
                ) {
                    Icon(
                        imageVector = iconFor("visibility"),
                        contentDescription = null,
                        tint = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.size(20.dp),
                    )
                    Text(
                        text = "Todo lo que hay en esta página lo transmite tu beacon y lo ve quien te encuentre. " +
                            "No escribas nada que no quieras que lea un desconocido.",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }

            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(14.dp),
            ) {
                Avatar(name = draft.name, size = 64.dp)
                OutlinedButton(onClick = { }) {
                    Icon(iconFor("photo_camera"), contentDescription = null, modifier = Modifier.size(18.dp))
                    Text("Agregar foto reciente", Modifier.padding(start = 8.dp))
                }
            }

            OutlinedTextField(
                value = draft.name,
                onValueChange = { draft = draft.copy(name = it) },
                label = { Text("Nombre completo") },
                supportingText = { Text("Como aparece en tu documento") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )

            Row(horizontalArrangement = Arrangement.spacedBy(Spacing.space3)) {
                OutlinedTextField(
                    value = draft.age,
                    onValueChange = { draft = draft.copy(age = it) },
                    label = { Text("Edad") },
                    singleLine = true,
                    modifier = Modifier.weight(1f),
                )
                OutlinedTextField(
                    value = draft.height,
                    onValueChange = { draft = draft.copy(height = it) },
                    label = { Text("Estatura") },
                    singleLine = true,
                    modifier = Modifier.weight(1f),
                )
            }

            Column {
                Text(
                    text = "Tipo de sangre",
                    style = MaterialTheme.typography.titleSmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(start = 4.dp, bottom = 10.dp),
                )
                FlowRow(horizontalArrangement = Arrangement.spacedBy(Spacing.space2)) {
                    BLOOD_TYPES.forEach { type ->
                        FilterChip(
                            selected = draft.blood == type,
                            onClick = { draft = draft.copy(blood = type) },
                            label = { Text(type) },
                        )
                    }
                }
            }

            OutlinedTextField(
                value = draft.allergies,
                onValueChange = { draft = draft.copy(allergies = it) },
                label = { Text("Alergias") },
                leadingIcon = { Icon(iconFor("allergies"), contentDescription = null) },
                supportingText = { Text("Medicamentos, comida, látex, todo lo que un paramédico deba saber") },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = draft.conditions,
                onValueChange = { draft = draft.copy(conditions = it) },
                label = { Text("Condiciones médicas") },
                supportingText = { Text("Asma, diabetes, marcapasos, embarazo") },
                minLines = 2,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = draft.meds,
                onValueChange = { draft = draft.copy(meds = it) },
                label = { Text("Medicamentos que tomas a diario") },
                supportingText = { Text("Nombre y dosis, si la sabes") },
                minLines = 2,
                modifier = Modifier.fillMaxWidth(),
            )

            Text(
                text = "CONTACTOS DE EMERGENCIA",
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                modifier = Modifier.padding(start = 4.dp),
            )
            OutlinedCard(Modifier.fillMaxWidth()) {
                draft.contacts.forEachIndexed { index, contact ->
                    ListItem(
                        colors = ListItemDefaults.colors(containerColor = Color.Transparent),
                        leadingContent = { Avatar(name = contact.name, size = 40.dp) },
                        headlineContent = { Text(contact.name) },
                        supportingContent = { Text("${contact.relation} · ${contact.phone}") },
                        trailingContent = {
                            Icon(
                                imageVector = iconFor("edit"),
                                contentDescription = "Editar contacto",
                                tint = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        },
                    )
                    if (index < draft.contacts.lastIndex) {
                        HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
                    }
                }
            }
            OutlinedButton(onClick = { }, modifier = Modifier.fillMaxWidth()) {
                Icon(iconFor("person_add"), contentDescription = null, modifier = Modifier.size(18.dp))
                Text("Agregar un contacto", Modifier.padding(start = 8.dp))
            }

            Card(colors = filledCardColors(), modifier = Modifier.fillMaxWidth()) {
                Column(Modifier.padding(16.dp)) {
                    Text("Quién puede ver esto", style = MaterialTheme.typography.titleMedium)
                    SettingSwitch("Organismos de socorro acreditados", true)
                    SettingSwitch("Cualquiera que encuentre mi beacon", true)
                    SettingSwitch("Mostrar en mi registro público", false)
                }
            }

            Button(
                onClick = { onSave(draft) },
                modifier = Modifier.fillMaxWidth(),
            ) {
                Icon(iconFor("save"), contentDescription = null, modifier = Modifier.size(18.dp))
                Text("Guardar perfil", Modifier.padding(start = 8.dp))
            }
        }
    }
}
