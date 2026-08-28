package com.gofest.shake.ui.components

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.CardColors
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color
import com.gofest.shake.ui.theme.N10
import com.gofest.shake.ui.theme.N12
import com.gofest.shake.ui.theme.N17
import com.gofest.shake.ui.theme.N92
import com.gofest.shake.ui.theme.N94
import com.gofest.shake.ui.theme.N96

// M3 surface-container roles from tokens/colors.css; material3 1.2 does not expose them yet.
@Composable
fun surfaceContainerLow(): Color = if (isSystemInDarkTheme()) N10 else N96

@Composable
fun surfaceContainer(): Color = if (isSystemInDarkTheme()) N12 else N94

@Composable
fun surfaceContainerHigh(): Color = if (isSystemInDarkTheme()) N17 else N92

@Composable
fun filledCardColors(
    container: Color = surfaceContainerLow(),
    content: Color = MaterialTheme.colorScheme.onSurface,
): CardColors = CardDefaults.cardColors(containerColor = container, contentColor = content)
