package com.gofest.shake.ui.theme

import androidx.compose.ui.graphics.Color

// Tonal ramps sampled 1:1 from docs/design/shake-design-system/tokens/palette.css.
// Primary key colour #1B4DFF (brief), secondary/tertiary/error/caution generated from the brand mark.

// Primary
val P0 = Color(0xFF000000); val P10 = Color(0xFF00115B); val P20 = Color(0xFF001E8C)
val P30 = Color(0xFF0F32C4); val P40 = Color(0xFF1B4DFF); val P50 = Color(0xFF4A6BFF)
val P60 = Color(0xFF7089FF); val P70 = Color(0xFF96A6FF); val P80 = Color(0xFFBAC3FF)
val P90 = Color(0xFFDEE0FF); val P95 = Color(0xFFF0EEFF); val P99 = Color(0xFFFEFBFF)
val P100 = Color(0xFFFFFFFF)

// Secondary (desaturated blue)
val S10 = Color(0xFF151B2C); val S20 = Color(0xFF2A3042); val S30 = Color(0xFF414659)
val S40 = Color(0xFF595E72); val S80 = Color(0xFFC2C5DD); val S90 = Color(0xFFDEE1F9)

// Tertiary — brand green, the "found safe" family
val T10 = Color(0xFF002110); val T20 = Color(0xFF00391D); val T30 = Color(0xFF00522C)
val T40 = Color(0xFF1F6D3C); val T80 = Color(0xFF78EE97); val T90 = Color(0xFF96F9AE)

// Error — brand red
val E10 = Color(0xFF410002); val E20 = Color(0xFF690005); val E30 = Color(0xFF93000A)
val E40 = Color(0xFFBA1A1A); val E80 = Color(0xFFFFB4AB); val E90 = Color(0xFFFFDAD6)

// Caution — brand yellow, the "unconfirmed" family
val C10 = Color(0xFF271900); val C20 = Color(0xFF412D00); val C30 = Color(0xFF5E4200)
val C80 = Color(0xFFFFCF6A); val C90 = Color(0xFFFFDFA6)
val StatusInjuredContainerLight = Color(0xFFFFDBC8)
val StatusOnInjuredContainerLight = Color(0xFF341100)

// Neutral / neutral-variant
val N0 = Color(0xFF000000); val N4 = Color(0xFF0C0D12); val N6 = Color(0xFF121318)
val N10 = Color(0xFF1A1B21); val N12 = Color(0xFF1E1F25); val N17 = Color(0xFF282A30)
val N20 = Color(0xFF2F3036); val N22 = Color(0xFF34353B); val N24 = Color(0xFF393A40)
val N90 = Color(0xFFE3E1EB); val N92 = Color(0xFFE9E7F1); val N94 = Color(0xFFEFEDF7)
val N96 = Color(0xFFF5F3FD); val N98 = Color(0xFFFBF8FF); val N100 = Color(0xFFFFFFFF)
val NV30 = Color(0xFF45464F); val NV50 = Color(0xFF767680); val NV60 = Color(0xFF90909A)
val NV80 = Color(0xFFC6C5D0)

// Seismic intensity ramp (MMI-style), used on the event banner and shake meters.
val Seismic1 = Color(0xFFDEE0FF)
val Seismic2 = Color(0xFF96F9AE)
val Seismic3 = Color(0xFFFFDFA6)
val Seismic4 = Color(0xFFF5B119)
val Seismic5 = Color(0xFFFF8A3D)
val Seismic6 = Color(0xFFE22B26)
val Seismic7 = Color(0xFF93000A)
val SeismicRamp = listOf(Seismic1, Seismic2, Seismic3, Seismic4, Seismic5, Seismic6, Seismic7)

// Brand mark colours sampled from the shield logo.
val BrandBlue = Color(0xFF3D6AB3)
val BrandRed = Color(0xFFE22B26)
val BrandGreen = Color(0xFF1F9847)
val BrandYellow = Color(0xFFF5B119)
