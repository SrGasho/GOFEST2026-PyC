package com.gofest.shake.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.gofest.shake.data.model.PersonStatus

@Composable
fun Avatar(
    modifier: Modifier = Modifier,
    name: String = "",
    size: Dp = 40.dp,
    status: PersonStatus? = null,
    icon: String? = null,
) {
    val initials = name.split(" ")
        .filter { it.isNotBlank() }
        .take(2)
        .map { it.first().uppercaseChar() }
        .joinToString("")

    val ringGap = 8.dp
    Box(
        modifier = modifier.size(if (status != null) size + ringGap else size),
        contentAlignment = Alignment.Center,
    ) {
        if (status != null) {
            Box(
                Modifier
                    .size(size + ringGap)
                    .border(2.dp, statusAccentColor(status), CircleShape)
            )
        }
        Box(
            modifier = Modifier
                .size(size)
                .background(MaterialTheme.colorScheme.secondaryContainer, CircleShape),
            contentAlignment = Alignment.Center,
        ) {
            when {
                icon != null -> Icon(
                    imageVector = iconFor(icon),
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSecondaryContainer,
                    modifier = Modifier.size(size * 0.55f),
                )

                initials.isNotEmpty() -> Text(
                    text = initials,
                    color = MaterialTheme.colorScheme.onSecondaryContainer,
                    fontSize = (size.value * 0.36f).sp,
                    fontWeight = FontWeight.Medium,
                )

                else -> Icon(
                    imageVector = iconFor("person"),
                    contentDescription = null,
                    tint = MaterialTheme.colorScheme.onSecondaryContainer,
                    modifier = Modifier.size(size * 0.55f),
                )
            }
        }
    }
}
