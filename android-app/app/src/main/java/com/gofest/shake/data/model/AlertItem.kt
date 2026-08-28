package com.gofest.shake.data.model

enum class AlertTone { ERROR, SAFE, NEUTRAL }

data class AlertItem(
    val id: String,
    val icon: String,
    val title: String,
    val body: String,
    val time: String,
    val tone: AlertTone,
)
