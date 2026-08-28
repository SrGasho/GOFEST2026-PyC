package com.gofest.shake.data.model

enum class PersonStatus { SAFE, MISSING, UNCONFIRMED, INJURED, SEARCHING }

data class Person(
    val id: String,
    val name: String,
    val status: PersonStatus,
    val lastSeen: String,
    val updated: String,
    val distance: String,
    val age: Int,
    val relation: String,
    val phone: String,
    val reports: Int,
    val lat: Double = 0.0,
    val lng: Double = 0.0,
)
