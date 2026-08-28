package com.gofest.shake.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

// M3 shape scale verbatim from tokens/shape.css.
val ShapeXs = RoundedCornerShape(4.dp)
val ShapeSm = RoundedCornerShape(8.dp)
val ShapeMd = RoundedCornerShape(12.dp)
val ShapeLg = RoundedCornerShape(16.dp)
val ShapeXl = RoundedCornerShape(28.dp)
val ShapeFull = RoundedCornerShape(percent = 50)
val ShapeSheetTop = RoundedCornerShape(topStart = 28.dp, topEnd = 28.dp)

val ShakeShapes = Shapes(
    extraSmall = ShapeXs,
    small = ShapeSm,
    medium = ShapeMd,
    large = ShapeLg,
    extraLarge = ShapeXl,
)

// 4dp grid, tokens/spacing.css.
object Spacing {
    val space1 = 4.dp
    val space2 = 8.dp
    val space3 = 12.dp
    val space4 = 16.dp
    val space5 = 20.dp
    val space6 = 24.dp
    val screenMargin = 16.dp
    val listGap = 8.dp
    val touchTarget = 48.dp
}
