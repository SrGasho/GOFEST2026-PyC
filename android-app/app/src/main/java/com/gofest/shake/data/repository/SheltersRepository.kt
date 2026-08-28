package com.gofest.shake.data.repository

import android.content.Context
import android.util.Log
import com.gofest.shake.data.model.Shelter
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

/**
 * Live view of the `shelters` collection. Any Firestore failure ends the flow with
 * an empty list instead of throwing, so the UI can fall back to its sample data.
 */
class SheltersRepository(context: Context) {

    fun observeShelters(): Flow<List<Shelter>> = callbackFlow {
        val registration = runCatching {
            FirebaseFirestore.getInstance()
                .collection(CloudConfig.COLLECTION_SHELTERS)
                .addSnapshotListener { snapshot, error ->
                    if (error != null) {
                        Log.w(TAG, "Lectura de shelters fallo", error)
                        trySend(emptyList())
                        close()
                        return@addSnapshotListener
                    }
                    trySend(snapshot?.documents.orEmpty().map(::toShelter))
                }
        }.getOrElse {
            Log.w(TAG, "Firestore no disponible", it)
            trySend(emptyList())
            close()
            null
        }
        awaitClose { registration?.remove() }
    }

    private fun toShelter(doc: DocumentSnapshot): Shelter = Shelter(
        id = doc.id,
        name = doc.getString("name").orEmpty(),
        capacity = doc.getString("capacityText").orEmpty(),
        distance = "",
        open = doc.getBoolean("open") ?: false,
    )

    private companion object {
        const val TAG = "SheltersRepository"
    }
}
