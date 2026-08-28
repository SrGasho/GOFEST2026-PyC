package com.gofest.shake.data

import com.gofest.shake.data.model.AlertItem
import com.gofest.shake.data.model.AlertTone
import com.gofest.shake.data.model.EmergencyProfile
import com.gofest.shake.data.model.Person
import com.gofest.shake.data.model.PersonStatus
import com.gofest.shake.data.model.SeismicEvent
import com.gofest.shake.data.model.Shelter

/**
 * Fixture data for the offline/demo state, adapted from the design handoff's data.js.
 * Localised to the hackathon brief's scenario (sismo M7.4, San Jose del Palmar, Choco)
 * instead of the design's placeholder Nagoya wards.
 */
object SampleData {

    val event = SeismicEvent(
        magnitude = "7.4",
        place = "12 km al NE de San Jose del Palmar",
        time = "Hoy 06:14",
        level = 6,
        active = true,
    )

    val defaultProfile = EmergencyProfile(
        name = "Camila Perea",
        age = "29",
        height = "162 cm",
        blood = "O+",
        allergies = "Penicilina",
        conditions = "Ninguna registrada",
        meds = "",
    )

    val people = listOf(
        Person(
            id = "p1", name = "Andres Mosquera", status = PersonStatus.MISSING,
            lastSeen = "Barrio Centro, San Jose del Palmar", updated = "8 min",
            distance = "1.2 km", age = 34, relation = "Colega", phone = "+57 300 123 4567", reports = 3,
        ),
        Person(
            id = "p2", name = "Valentina Renteria", status = PersonStatus.SAFE,
            lastSeen = "Coliseo San Jose del Palmar", updated = "recien",
            distance = "3.8 km", age = 52, relation = "Vecino", phone = "+57 300 223 3110", reports = 1,
        ),
        Person(
            id = "p3", name = "Daniela Cordoba", status = PersonStatus.UNCONFIRMED,
            lastSeen = "Plaza principal", updated = "22 min",
            distance = "2.4 km", age = 19, relation = "Estudiante", phone = "-", reports = 2,
        ),
        Person(
            id = "p4", name = "Julian Palacios", status = PersonStatus.INJURED,
            lastSeen = "Puesto de primeros auxilios, Certeguí", updated = "41 min",
            distance = "900 m", age = 27, relation = "Familia", phone = "+57 300 445 5667", reports = 5,
        ),
        Person(
            id = "p5", name = "Santiago Moreno", status = PersonStatus.SAFE,
            lastSeen = "Terminal de transporte", updated = "1 h",
            distance = "4.1 km", age = 41, relation = "Familia", phone = "+57 300 998 7766", reports = 2,
        ),
        Person(
            id = "p6", name = "Isabella Quinto", status = PersonStatus.MISSING,
            lastSeen = "Vereda La Playa", updated = "1 h",
            distance = "1.9 km", age = 8, relation = "Familia", phone = "-", reports = 4,
        ),
    )

    val alerts = listOf(
        AlertItem(id = "a1", icon = "crisis_alert", title = "Replica M4.8", body = "Zona urbana. Sin nuevos daños estructurales reportados.", time = "12 min", tone = AlertTone.ERROR),
        AlertItem(id = "a2", icon = "check_circle", title = "Valentina Renteria marcada a salvo", body = "Confirmado por un rescatista en el Coliseo San Jose del Palmar.", time = "32 min", tone = AlertTone.SAFE),
        AlertItem(id = "a3", icon = "home_work", title = "Albergue abierto — Coliseo Municipal", body = "Capacidad 400. Agua y cobijas disponibles.", time = "1 h", tone = AlertTone.NEUTRAL),
        AlertItem(id = "a4", icon = "person_search", title = "Nuevo reporte cerca de ti", body = "Isabella Quinto, 8 años, vista por ultima vez en Vereda La Playa.", time = "1 h", tone = AlertTone.NEUTRAL),
    )

    val shelters = listOf(
        Shelter(id = "s1", name = "Coliseo Municipal", capacity = "214 / 400", distance = "900 m", open = true),
        Shelter(id = "s2", name = "Casa de la Cultura de Certeguí", capacity = "388 / 400", distance = "3.8 km", open = true),
        Shelter(id = "s3", name = "Escuela Tado Centro", capacity = "Llena", distance = "4.6 km", open = false),
    )
}
