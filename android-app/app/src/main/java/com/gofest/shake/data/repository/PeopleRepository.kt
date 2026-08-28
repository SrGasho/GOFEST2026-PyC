package com.gofest.shake.data.repository

import android.content.Context
import android.util.Log
import com.gofest.shake.data.model.Person
import com.gofest.shake.data.model.PersonStatus
import com.google.firebase.Timestamp
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

/**
 * Live view of the consolidated `people` collection. Any Firestore failure (no
 * project provisioned yet, no network, rules denying) ends the flow with an empty
 * list instead of throwing, so the UI can fall back to its sample data.
 */
class PeopleRepository(context: Context) {

    fun observePeople(): Flow<List<Person>> = callbackFlow {
        val registration = runCatching {
            FirebaseFirestore.getInstance()
                .collection(CloudConfig.COLLECTION_PEOPLE)
                .addSnapshotListener { snapshot, error ->
                    if (error != null) {
                        Log.w(TAG, "Lectura de people fallo", error)
                        trySend(emptyList())
                        close()
                        return@addSnapshotListener
                    }
                    trySend(snapshot?.documents.orEmpty().map(::toPerson))
                }
        }.getOrElse {
            Log.w(TAG, "Firestore no disponible", it)
            trySend(emptyList())
            close()
            null
        }
        awaitClose { registration?.remove() }
    }

    private fun toPerson(doc: DocumentSnapshot): Person = Person(
        id = doc.id,
        name = doc.getString("name").orEmpty(),
        status = statusOf(doc.getString("status")),
        lastSeen = doc.getString("lastSeenText").orEmpty(),
        updated = relativeLabel(doc.getTimestamp("updatedAt")),
        distance = "",
        age = 0,
        relation = "",
        phone = "",
        reports = doc.getLong("reportCount")?.toInt() ?: 0,
        lat = doc.getDouble("lat") ?: 0.0,
        lng = doc.getDouble("lng") ?: 0.0,
    )

    private fun statusOf(raw: String?): PersonStatus =
        PersonStatus.entries.firstOrNull { it.name == raw } ?: PersonStatus.UNCONFIRMED

    private fun relativeLabel(timestamp: Timestamp?): String {
        if (timestamp == null) return "-"
        val minutes = (System.currentTimeMillis() - timestamp.toDate().time) / 60_000
        return when {
            minutes < 1 -> "recien"
            minutes < 60 -> "$minutes min"
            minutes < 24 * 60 -> "${minutes / 60} h"
            else -> "${minutes / (24 * 60)} d"
        }
    }

    private companion object {
        const val TAG = "PeopleRepository"
    }
}
