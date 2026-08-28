package com.gofest.shake.ui.components

import androidx.compose.animation.core.RepeatMode
import androidx.compose.animation.core.animateFloat
import androidx.compose.animation.core.infiniteRepeatable
import androidx.compose.animation.core.rememberInfiniteTransition
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.gofest.shake.data.model.SeismicEvent
import com.gofest.shake.ui.theme.SeismicRamp
import com.gofest.shake.ui.theme.Spacing

@Composable
fun PulsingCrisisIcon(modifier: Modifier = Modifier, size: Dp = 24.dp, tint: Color = Color.Unspecified) {
    val transition = rememberInfiniteTransition(label = "crisis-pulse")
    val pulse by transition.animateFloat(
        initialValue = 1f,
        targetValue = 0.35f,
        animationSpec = infiniteRepeatable(tween(1000), RepeatMode.Reverse),
        label = "crisis-pulse-alpha",
    )
    Icon(
        imageVector = iconFor("crisis_alert"),
        contentDescription = null,
        tint = tint,
        modifier = modifier
            .size(size)
            .alpha(pulse),
    )
}

/** The seven-step intensity ramp. Bars stretch to fill the available width. */
@Composable
fun SeismicLevelBars(level: Int, modifier: Modifier = Modifier) {
    val dimmed = MaterialTheme.colorScheme.onErrorContainer.copy(alpha = 0.18f)
    Row(
        modifier = modifier.height(28.dp),
        verticalAlignment = Alignment.Bottom,
        horizontalArrangement = Arrangement.spacedBy(3.dp),
    ) {
        SeismicRamp.forEachIndexed { index, color ->
            Box(
                modifier = Modifier
                    .weight(1f)
                    .height(8.dp + ((index + 1) * 3).dp)
                    .background(if (index < level) color else dimmed, RoundedCornerShape(2.dp))
            )
        }
    }
}

@Composable
fun SeismicBar(event: SeismicEvent, modifier: Modifier = Modifier) {
    val dimmed = MaterialTheme.colorScheme.onErrorContainer.copy(alpha = 0.18f)
    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.errorContainer)
            .padding(horizontal = Spacing.space4, vertical = Spacing.space3),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(Spacing.space3),
    ) {
        PulsingCrisisIcon(tint = MaterialTheme.colorScheme.onErrorContainer)
        Column(Modifier.weight(1f)) {
            Text(
                text = "M${event.magnitude} · ${event.place}",
                style = MaterialTheme.typography.titleSmall,
                color = MaterialTheme.colorScheme.onErrorContainer,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
            )
            Text(
                text = event.time,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onErrorContainer.copy(alpha = 0.8f),
            )
        }
        Row(
            modifier = Modifier.height(24.dp),
            verticalAlignment = Alignment.Bottom,
            horizontalArrangement = Arrangement.spacedBy(2.dp),
        ) {
            SeismicRamp.forEachIndexed { index, color ->
                Box(
                    modifier = Modifier
                        .width(5.dp)
                        .height(8.dp + (index * 2.5f).dp)
                        .background(if (index < event.level) color else dimmed, RoundedCornerShape(1.dp))
                )
            }
        }
    }
}
