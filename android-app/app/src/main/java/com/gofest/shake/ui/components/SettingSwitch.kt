package com.gofest.shake.ui.components

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.gofest.shake.ui.theme.Spacing

/** Preference rows in the design are decorative in the MVP: they keep their own local state. */
@Composable
fun SettingSwitch(label: String, initial: Boolean, modifier: Modifier = Modifier) {
    var checked by remember { mutableStateOf(initial) }
    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = Spacing.space2),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Text(
            text = label,
            style = MaterialTheme.typography.bodyMedium,
            modifier = Modifier.weight(1f),
        )
        Switch(checked = checked, onCheckedChange = { checked = it })
    }
}
