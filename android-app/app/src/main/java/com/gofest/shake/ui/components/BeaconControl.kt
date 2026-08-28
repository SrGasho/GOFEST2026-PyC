package com.gofest.shake.ui.components

import androidx.compose.animation.core.LinearEasing
import androidx.compose.animation.core.StartOffset
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.gofest.shake.ui.theme.Spacing

enum class BeaconMode { SOS, SEARCH }

private data class BeaconVisual(
    val on: Color,
    val onContent: Color,
    val soft: Color,
    val softContent: Color,
    val icon: String,
    val title: String,
    val subtitle: String,
)

@Composable
private fun visualFor(mode: BeaconMode): BeaconVisual = when (mode) {
    BeaconMode.SOS -> BeaconVisual(
        on = MaterialTheme.colorScheme.error,
        onContent = MaterialTheme.colorScheme.onError,
        soft = MaterialTheme.colorScheme.errorContainer,
        softContent = MaterialTheme.colorScheme.onErrorContainer,
        icon = "sos",
        title = "Beacon SOS",
        subtitle = "Necesito ayuda donde estoy",
    )

    BeaconMode.SEARCH -> BeaconVisual(
        on = MaterialTheme.colorScheme.primary,
        onContent = MaterialTheme.colorScheme.onPrimary,
        soft = MaterialTheme.colorScheme.primaryContainer,
        softContent = MaterialTheme.colorScheme.onPrimaryContainer,
        icon = "radar",
        title = "Beacon de búsqueda",
        subtitle = "Estoy buscando a alguien",
    )
}

@Composable
fun BeaconControl(
    mode: BeaconMode,
    active: Boolean,
    onActivate: () -> Unit,
    onStop: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    size: Dp = 200.dp,
) {
    val visual = visualFor(mode)
    val background = when {
        !enabled -> MaterialTheme.colorScheme.onSurface.copy(alpha = 0.12f)
        active -> visual.on
        else -> visual.soft
    }
    val content = when {
        !enabled -> MaterialTheme.colorScheme.onSurface.copy(alpha = 0.38f)
        active -> visual.onContent
        else -> visual.softContent
    }

    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(Spacing.space4),
    ) {
        Box(Modifier.size(size + 32.dp), contentAlignment = Alignment.Center) {
            if (active) {
                val transition = rememberInfiniteTransition(label = "beacon-ripple")
                repeat(3) { index ->
                    val progress by transition.animateFloat(
                        initialValue = 0f,
                        targetValue = 1f,
                        animationSpec = infiniteRepeatable(
                            animation = tween(2400, easing = LinearEasing),
                            initialStartOffset = StartOffset(index * 800),
                        ),
                        label = "beacon-ripple-$index",
                    )
                    Box(
                        Modifier
                            .size(size)
                            .scale(1f + progress * 0.16f)
                            .alpha(1f - progress)
                            .border(2.dp, visual.on, CircleShape)
                    )
                }
            }
            Box(
                modifier = Modifier
                    .size(size)
                    .shadow(if (active) 8.dp else 2.dp, CircleShape)
                    .clip(CircleShape)
                    .background(background)
                    .clickable(enabled = enabled) { if (active) onStop() else onActivate() },
                contentAlignment = Alignment.Center,
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(6.dp),
                ) {
                    Icon(
                        imageVector = iconFor(visual.icon),
                        contentDescription = null,
                        tint = content,
                        modifier = Modifier.size(size * 0.3f),
                    )
                    Text(
                        text = if (active) "Transmitiendo" else "Toca para iniciar",
                        style = MaterialTheme.typography.titleMedium,
                        color = content,
                    )
                }
            }
        }
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = visual.title,
                style = MaterialTheme.typography.titleLarge,
                color = MaterialTheme.colorScheme.onSurface,
                textAlign = TextAlign.Center,
            )
            Text(
                text = visual.subtitle,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
                textAlign = TextAlign.Center,
            )
        }
    }
}
