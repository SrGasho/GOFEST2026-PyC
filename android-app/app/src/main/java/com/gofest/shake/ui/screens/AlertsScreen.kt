@file:OptIn(androidx.compose.material3.ExperimentalMaterial3Api::class)

package com.gofest.shake.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Card
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.LargeTopAppBar
import androidx.compose.material3.ListItem
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.AlertItem
import com.gofest.shake.data.model.AlertTone
import com.gofest.shake.data.model.SeismicEvent
import com.gofest.shake.ui.components.SeismicBar
import com.gofest.shake.ui.components.SettingSwitch
import com.gofest.shake.ui.components.filledCardColors
import com.gofest.shake.ui.components.iconFor
import com.gofest.shake.ui.theme.ShakeStatusColors

@Composable
fun AlertsScreen(alerts: List<AlertItem>, event: SeismicEvent) {
    Column(Modifier.fillMaxWidth()) {
        LargeTopAppBar(title = { Text("Alertas") })
        if (event.active) {
            SeismicBar(event)
        }
        LazyColumn(Modifier.fillMaxWidth()) {
            items(alerts, key = { it.id }) { alert ->
                AlertRow(alert)
                HorizontalDivider(color = MaterialTheme.colorScheme.outlineVariant)
            }
            item {
                Card(
                    colors = filledCardColors(),
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                ) {
                    Column(Modifier.padding(16.dp)) {
                        Text("Ajustes de alertas", style = MaterialTheme.typography.titleMedium)
                        SettingSwitch("Avisos de réplicas", true)
                        SettingSwitch("Novedades de personas que sigo", true)
                        SettingSwitch("Cambios de capacidad en albergues", false)
                    }
                }
            }
        }
    }
}

@Composable
private fun AlertRow(alert: AlertItem) {
    val status = ShakeStatusColors()
    val container: Color
    val content: Color
    when (alert.tone) {
        AlertTone.ERROR -> {
            container = MaterialTheme.colorScheme.errorContainer
            content = MaterialTheme.colorScheme.onErrorContainer
        }

        AlertTone.SAFE -> {
            container = status.safeContainer
            content = status.onSafeContainer
        }

        AlertTone.NEUTRAL -> {
            container = MaterialTheme.colorScheme.secondaryContainer
            content = MaterialTheme.colorScheme.onSecondaryContainer
        }
    }
    ListItem(
        leadingContent = {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(container, CircleShape),
                contentAlignment = Alignment.Center,
            ) {
                Icon(
                    imageVector = iconFor(alert.icon),
                    contentDescription = null,
                    tint = content,
                    modifier = Modifier.size(22.dp),
                )
            }
        },
        headlineContent = { Text(alert.title) },
        supportingContent = { Text(alert.body) },
        trailingContent = {
            Text(alert.time, style = MaterialTheme.typography.labelMedium)
        },
    )
}
