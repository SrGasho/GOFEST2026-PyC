package com.gofest.shake.data.repository

import android.content.Context
import android.util.Log
import com.gofest.shake.data.model.PersonStatus
import com.google.firebase.auth.FirebaseAuth
import java.time.Instant
import java.util.concurrent.TimeUnit
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.tasks.await
import kotlinx.coroutines.withContext
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject

/**
 * Opportunistic upload of a local detection to the cloud. Every failure comes back
 * as [Result.failure] so the caller can retry later: the local beacon and alarm must
 * never depend on this succeeding.
 */
class FindingsRepository(context: Context) {

    private val client = OkHttpClient.Builder()
        .callTimeout(REQUEST_TIMEOUT_SECONDS, TimeUnit.SECONDS)
        .build()

    suspend fun submitFinding(
        emergencyId: String,
        personName: String,
        status: PersonStatus,
        lat: Double,
        lng: Double,
        notes: String = "",
    ): Result<String> = withContext(Dispatchers.IO) {
        runCatching {
            val payload = JSONObject()
                .put("reporterId", anonymousUid())
                .put("emergencyId", emergencyId)
                .put("personName", personName)
                .put("status", status.name)
                .put("lat", lat)
                .put("lng", lng)
                .put("notes", notes)
                .put("timestamp", Instant.now().toString())

            val request = Request.Builder()
                .url(CloudConfig.INGEST_FINDING_URL)
                .post(payload.toString().toRequestBody(JSON_MEDIA_TYPE))
                .build()

            client.newCall(request).execute().use { response ->
                val body = response.body?.string().orEmpty()
                check(response.isSuccessful) { "ingestFinding respondio ${response.code}: $body" }
                JSONObject(body).getString("findingId")
            }
        }.onFailure { Log.w(TAG, "No se pudo enviar el hallazgo $emergencyId", it) }
    }

    private suspend fun anonymousUid(): String {
        val auth = FirebaseAuth.getInstance()
        val user = auth.currentUser ?: auth.signInAnonymously().await().user
        return requireNotNull(user?.uid) { "Firebase Auth no devolvio una sesion anonima" }
    }

    private companion object {
        const val TAG = "FindingsRepository"
        const val REQUEST_TIMEOUT_SECONDS = 15L
        val JSON_MEDIA_TYPE = "application/json; charset=utf-8".toMediaType()
    }
}
