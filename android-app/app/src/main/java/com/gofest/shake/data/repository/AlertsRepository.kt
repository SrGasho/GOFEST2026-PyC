package com.gofest.shake.data.repository

import android.content.Context
import android.util.Log
import com.gofest.shake.data.model.AlertItem
import com.gofest.shake.data.model.AlertTone
import com.google.firebase.Timestamp
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.callbackFlow

/**
 * Live view of the `alerts` feed, newest first. Any Firestore failure ends the flow
 * with an empty list instead of throwing, so the UI can fall back to its sample data.
 */
class AlertsRepository(context: Context) {

    fun observeAlerts(): Flow<List<AlertItem>> = callbackFlow {
        val registration = runCatching {
            FirebaseFirestore.getInstance()
                .collection(CloudConfig.COLLECTION_ALERTS)
                .addSnapshotListener { snapshot, error ->
                    if (error != null) {
                        Log.w(TAG, "Lectura de alerts fallo", error)
                        trySend(emptyList())
                        close()
                        return@addSnapshotListener
                    }
                    val alerts = snapshot?.documents.orEmpty()
                        .sortedByDescending { it.getTimestamp("createdAt") }
                        .map(::toAlert)
                    trySend(alerts)
                }
        }.getOrElse {
            Log.w(TAG, "Firestore no disponible", it)
            trySend(emptyList())
            close()
            null
        }
        awaitClose { registration?.remove() }
    }

    private fun toAlert(doc: DocumentSnapshot): AlertItem = AlertItem(
        id = doc.id,
        icon = doc.getString("icon").orEmpty().ifBlank { "notifications" },
        title = doc.getString("title").orEmpty(),
        body = doc.getString("body").orEmpty(),
        time = relativeLabel(doc.getTimestamp("createdAt")),
        tone = toneOf(doc.getString("tone")),
    )

    private fun toneOf(raw: String?): AlertTone =
        AlertTone.entries.firstOrNull { it.name == raw } ?: AlertTone.NEUTRAL

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
        const val TAG = "AlertsRepository"
    }
}
