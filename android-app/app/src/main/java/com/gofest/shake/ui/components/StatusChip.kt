package com.gofest.shake.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.PersonStatus
import com.gofest.shake.ui.theme.ShakeShapes
import com.gofest.shake.ui.theme.ShakeStatusColors

fun statusLabel(status: PersonStatus): String = when (status) {
    PersonStatus.SAFE -> "A salvo"
    PersonStatus.MISSING -> "Desaparecido"
    PersonStatus.UNCONFIRMED -> "Sin confirmar"
    PersonStatus.INJURED -> "Herido"
    PersonStatus.SEARCHING -> "Buscando"
}

fun statusIconName(status: PersonStatus): String = when (status) {
    PersonStatus.SAFE -> "check_circle"
    PersonStatus.MISSING -> "help"
    PersonStatus.UNCONFIRMED -> "schedule"
    PersonStatus.INJURED -> "personal_injury"
    PersonStatus.SEARCHING -> "radar"
}

@Composable
fun statusAccentColor(status: PersonStatus): Color = with(ShakeStatusColors()) {
    when (status) {
        PersonStatus.SAFE -> safe
        PersonStatus.MISSING -> missing
        PersonStatus.UNCONFIRMED -> unconfirmed
        PersonStatus.INJURED -> injured
        PersonStatus.SEARCHING -> searching
    }
}

@Composable
fun statusContainerColor(status: PersonStatus): Color = with(ShakeStatusColors()) {
    when (status) {
        PersonStatus.SAFE -> safeContainer
        PersonStatus.MISSING -> missingContainer
        PersonStatus.UNCONFIRMED -> unconfirmedContainer
        PersonStatus.INJURED -> injuredContainer
        PersonStatus.SEARCHING -> searchingContainer
    }
}

@Composable
fun statusContentColor(status: PersonStatus): Color = with(ShakeStatusColors()) {
    when (status) {
        PersonStatus.SAFE -> onSafeContainer
        PersonStatus.MISSING -> onMissingContainer
        PersonStatus.UNCONFIRMED -> onUnconfirmedContainer
        PersonStatus.INJURED -> onInjuredContainer
        PersonStatus.SEARCHING -> onSearchingContainer
    }
}

@Composable
fun StatusChip(
    status: PersonStatus,
    modifier: Modifier = Modifier,
    label: String? = null,
    small: Boolean = false,
) {
    Row(
        modifier = modifier
            .height(if (small) 24.dp else 32.dp)
            .background(statusContainerColor(status), ShakeShapes.small)
            .padding(
                if (small) PaddingValues(start = 6.dp, end = 8.dp) else PaddingValues(start = 8.dp, end = 12.dp)
            ),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(if (small) 4.dp else 6.dp),
    ) {
        Icon(
            imageVector = iconFor(statusIconName(status)),
            contentDescription = null,
            tint = statusContentColor(status),
            modifier = Modifier.size(if (small) 14.dp else 18.dp),
        )
        Text(
            text = label ?: statusLabel(status),
            color = statusContentColor(status),
            style = if (small) MaterialTheme.typography.labelMedium else MaterialTheme.typography.labelLarge,
            maxLines = 1,
        )
    }
}
