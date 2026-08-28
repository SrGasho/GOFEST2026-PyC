package com.gofest.shake.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

// Person-status roles, the app's core semantic layer (tokens/colors.css --status-*).
// Never reused for anything but a person's status — see design readme "Colour is load-bearing".
data class StatusColors(
    val safe: Color, val safeContainer: Color, val onSafeContainer: Color,
    val missing: Color, val missingContainer: Color, val onMissingContainer: Color,
    val unconfirmed: Color, val unconfirmedContainer: Color, val onUnconfirmedContainer: Color,
    val injured: Color, val injuredContainer: Color, val onInjuredContainer: Color,
    val searching: Color, val searchingContainer: Color, val onSearchingContainer: Color,
)

val LightStatusColors = StatusColors(
    safe = T40, safeContainer = T90, onSafeContainer = T10,
    missing = E40, missingContainer = E90, onMissingContainer = E10,
    unconfirmed = C30, unconfirmedContainer = C90, onUnconfirmedContainer = C10,
    injured = C30, injuredContainer = StatusInjuredContainerLight, onInjuredContainer = StatusOnInjuredContainerLight,
    searching = P40, searchingContainer = P90, onSearchingContainer = P10,
)

val DarkStatusColors = StatusColors(
    safe = T80, safeContainer = T30, onSafeContainer = T90,
    missing = E80, missingContainer = E30, onMissingContainer = E90,
    unconfirmed = C80, unconfirmedContainer = C30, onUnconfirmedContainer = C90,
    injured = C80, injuredContainer = C30, onInjuredContainer = C90,
    searching = P80, searchingContainer = P30, onSearchingContainer = P90,
)

private val LightColorScheme = lightColorScheme(
    primary = P40, onPrimary = P100, primaryContainer = P90, onPrimaryContainer = P10,
    secondary = S40, onSecondary = Color.White, secondaryContainer = S90, onSecondaryContainer = S10,
    tertiary = T40, onTertiary = Color.White, tertiaryContainer = T90, onTertiaryContainer = T10,
    error = E40, onError = Color.White, errorContainer = E90, onErrorContainer = E10,
    background = N98, onBackground = N10,
    surface = N98, onSurface = N10,
    surfaceVariant = NV80, onSurfaceVariant = NV30,
    outline = NV50, outlineVariant = NV80,
    inverseSurface = N20, inverseOnSurface = N96, inversePrimary = P80,
    scrim = N0,
)

private val DarkColorScheme = darkColorScheme(
    primary = P80, onPrimary = P20, primaryContainer = P30, onPrimaryContainer = P90,
    secondary = S80, onSecondary = S20, secondaryContainer = S30, onSecondaryContainer = S90,
    tertiary = T80, onTertiary = T20, tertiaryContainer = T30, onTertiaryContainer = T90,
    error = E80, onError = E20, errorContainer = E30, onErrorContainer = E90,
    background = N6, onBackground = N90,
    surface = N6, onSurface = N90,
    surfaceVariant = NV30, onSurfaceVariant = NV80,
    outline = NV60, outlineVariant = NV30,
    inverseSurface = N90, inverseOnSurface = N20, inversePrimary = P40,
    scrim = N0,
)

// M3 does not define a "caution" role; tokens/colors.css adds one for the unconfirmed/advisory family.
data class CautionColors(val caution: Color, val cautionContainer: Color, val onCautionContainer: Color)

val LightCautionColors = CautionColors(caution = C30, cautionContainer = C90, onCautionContainer = C10)
val DarkCautionColors = CautionColors(caution = C80, cautionContainer = C30, onCautionContainer = C90)

@Composable
fun ShakeStatusColors(): StatusColors = if (isSystemInDarkTheme()) DarkStatusColors else LightStatusColors

@Composable
fun ShakeCautionColors(): CautionColors = if (isSystemInDarkTheme()) DarkCautionColors else LightCautionColors

@Composable
fun ShakeTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.surface.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }
    MaterialTheme(
        colorScheme = colorScheme,
        typography = ShakeTypography,
        shapes = ShakeShapes,
        content = content,
    )
}
