package com.gofest.shake.data.model

data class EmergencyContact(val name: String, val relation: String, val phone: String)

data class EmergencyProfile(
    val name: String = "",
    val age: String = "",
    val height: String = "",
    val blood: String = "",
    val allergies: String = "",
    val conditions: String = "",
    val meds: String = "",
    val contacts: List<EmergencyContact> = emptyList(),
) {
    /** Fraction of the fields a responder reads first that are filled in; drives the Home "% complete" card. */
    fun completeness(): Int {
        val fields = listOf(name, age, blood, allergies, conditions)
        val filled = fields.count { it.isNotBlank() }
        return (100 * filled / fields.size)
    }
}
