package com.gofest.shake.data.model

data class SeismicEvent(
    val magnitude: String,
    val place: String,
    val time: String,
    val level: Int, // 1..7, indexes docs/design tokens/colors.css --seismic-1..7
    val active: Boolean,
)
