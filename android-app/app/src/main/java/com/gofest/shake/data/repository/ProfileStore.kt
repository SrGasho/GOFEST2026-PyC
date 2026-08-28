package com.gofest.shake.data.repository

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.gofest.shake.data.SampleData
import com.gofest.shake.data.model.EmergencyContact
import com.gofest.shake.data.model.EmergencyProfile
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.filterNotNull
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.onEach
import kotlin.random.Random

private val Context.profileDataStore: DataStore<Preferences> by preferencesDataStore(name = "shake_profile")

/**
 * Local-only storage for the emergency profile and the device's stable emergency id.
 * Nothing here is ever pushed to Firestore: the profile is what the beacon broadcasts
 * peer-to-peer, and the design brief treats it as private to the handset.
 */
class ProfileStore(context: Context) {

    private val store = context.applicationContext.profileDataStore

    private object Keys {
        val NAME = stringPreferencesKey("name")
        val AGE = stringPreferencesKey("age")
        val HEIGHT = stringPreferencesKey("height")
        val BLOOD = stringPreferencesKey("blood")
        val ALLERGIES = stringPreferencesKey("allergies")
        val CONDITIONS = stringPreferencesKey("conditions")
        val MEDS = stringPreferencesKey("meds")
        val CONTACTS = stringPreferencesKey("contacts")
        val EMERGENCY_ID = stringPreferencesKey("emergency_id")
    }

    fun observeProfile(): Flow<EmergencyProfile> = store.data.map { prefs ->
        if (prefs[Keys.NAME] == null) {
            DEFAULT_PROFILE
        } else {
            EmergencyProfile(
                name = prefs[Keys.NAME].orEmpty(),
                age = prefs[Keys.AGE].orEmpty(),
                height = prefs[Keys.HEIGHT].orEmpty(),
                blood = prefs[Keys.BLOOD].orEmpty(),
                allergies = prefs[Keys.ALLERGIES].orEmpty(),
                conditions = prefs[Keys.CONDITIONS].orEmpty(),
                meds = prefs[Keys.MEDS].orEmpty(),
                contacts = decodeContacts(prefs[Keys.CONTACTS].orEmpty()),
            )
        }
    }

    suspend fun saveProfile(profile: EmergencyProfile) {
        store.edit { prefs ->
            prefs[Keys.NAME] = profile.name
            prefs[Keys.AGE] = profile.age
            prefs[Keys.HEIGHT] = profile.height
            prefs[Keys.BLOOD] = profile.blood
            prefs[Keys.ALLERGIES] = profile.allergies
            prefs[Keys.CONDITIONS] = profile.conditions
            prefs[Keys.MEDS] = profile.meds
            prefs[Keys.CONTACTS] = encodeContacts(profile.contacts)
        }
    }

    fun observeEmergencyId(): Flow<String> = store.data
        .map { it[Keys.EMERGENCY_ID] }
        .onEach { if (it == null) generateEmergencyId() }
        .filterNotNull()

    private suspend fun generateEmergencyId() {
        store.edit { prefs ->
            prefs[Keys.EMERGENCY_ID] = prefs[Keys.EMERGENCY_ID] ?: newEmergencyId()
        }
    }

    private companion object {
        const val ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
        const val FIELD_SEPARATOR = "\u001F"
        const val RECORD_SEPARATOR = "\u001E"

        val DEFAULT_PROFILE = SampleData.defaultProfile.copy(
            contacts = listOf(
                EmergencyContact("Valentina Renteria", "Hermana", "+57 300 223 3110"),
                EmergencyContact("Santiago Moreno", "Vecino", "+57 300 998 7766"),
            ),
        )

        fun newEmergencyId(): String =
            "SH-" + (1..6).map { ID_ALPHABET[Random.nextInt(ID_ALPHABET.length)] }.joinToString("")

        fun encodeContacts(contacts: List<EmergencyContact>): String = contacts.joinToString(RECORD_SEPARATOR) {
            listOf(it.name, it.relation, it.phone).joinToString(FIELD_SEPARATOR)
        }

        fun decodeContacts(raw: String): List<EmergencyContact> = raw
            .split(RECORD_SEPARATOR)
            .filter { it.isNotBlank() }
            .mapNotNull { record ->
                val parts = record.split(FIELD_SEPARATOR)
                if (parts.size == 3) EmergencyContact(parts[0], parts[1], parts[2]) else null
            }
    }
}
