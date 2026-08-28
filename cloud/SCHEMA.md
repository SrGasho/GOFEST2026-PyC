# Contrato de datos: app Android <-> Cloud Functions <-> Firestore <-> Panel web

Este documento es la fuente de verdad compartida entre todos los componentes del
proyecto (app Android, Cloud Functions, panel web). Cualquier cambio a este
contrato debe reflejarse en los tres lados.

## Flujo general

```
App Android (emisor/receptor WiFi Direct)
   -> detecta beacon o encuentro local
   -> si hay conectividad (oportunista, no bloqueante): HTTPS POST -> Cloud Function `ingestFinding`
        -> valida payload, publica en Pub/Sub topic "shake-findings"
             -> Cloud Function `consolidateFinding` (trigger Pub/Sub)
                  -> escribe/actualiza Firestore (`findings`, `people`, `alerts`)
Panel web (Google Maps JS API)
   -> lee Firestore en tiempo real (onSnapshot) sobre `people`, `findings`, `shelters`
```

La app funciona 100% offline para la mecánica central (beacon + alarma local).
El sync a la nube es oportunista y nunca bloquea la detección/alarma local.

## Autenticación

- App Android: Firebase Anonymous Auth. El `uid` anónimo se usa como `reporterId`.
- Panel web: sin autenticación en el MVP (lectura pública de datos ya
  anonimizados/agregados). Las Firestore rules solo permiten lectura pública,
  nunca escritura directa desde el cliente (toda escritura pasa por Cloud
  Functions con Admin SDK).

## HTTPS endpoint: `ingestFinding`

`POST https://<region>-<project-id>.cloudfunctions.net/ingestFinding`

Request body (JSON):

```json
{
  "reporterId": "string (uid anónimo de Firebase Auth)",
  "emergencyId": "string (ID corto embebido en el beacon WiFi Direct, ej. 'SH-4F9A2C')",
  "personName": "string (nombre tal como lo reportó el perfil de emergencia)",
  "status": "SAFE | MISSING | UNCONFIRMED | INJURED | SEARCHING",
  "lat": "number",
  "lng": "number",
  "notes": "string (opcional)",
  "timestamp": "string ISO-8601 (momento de la detección local, no de envío)"
}
```

Response `200`:

```json
{ "findingId": "string (id generado)" }
```

Errores: `400` payload inválido (falta campo requerido o tipo incorrecto),
`500` fallo interno (publicar en Pub/Sub falló). La app debe reintentar con
backoff pero nunca bloquear la UI ni la alarma local por esto.

## Pub/Sub topic: `shake-findings`

Mensaje (mismo shape que el body de `ingestFinding` más metadata):

```json
{
  "reporterId": "string",
  "emergencyId": "string",
  "personName": "string",
  "status": "SAFE | MISSING | UNCONFIRMED | INJURED | SEARCHING",
  "lat": "number",
  "lng": "number",
  "notes": "string",
  "timestamp": "string ISO-8601",
  "receivedAt": "string ISO-8601 (asignado por ingestFinding)"
}
```

## Colecciones Firestore

### `findings` (historial inmutable, uno por reporte crudo)

```
findings/{findingId}
  reporterId: string
  emergencyId: string
  personName: string
  status: string (enum arriba)
  lat: number
  lng: number
  notes: string
  timestamp: Timestamp
  receivedAt: Timestamp
```

### `people` (estado consolidado, uno por emergencyId — lo que lee el panel)

```
people/{emergencyId}
  name: string
  status: string (enum arriba; se sobreescribe con el reporte más reciente)
  lat: number
  lng: number
  lastSeenText: string (descripción legible, ej. "Barrio Centro")
  reportCount: number (incrementado por cada finding nuevo)
  updatedAt: Timestamp
```

`consolidateFinding` hace upsert: si `people/{emergencyId}` no existe lo crea;
si existe, actualiza `status`/`lat`/`lng`/`updatedAt` y hace
`reportCount += 1`.

### `shelters` (semilla manual/admin, lectura pública)

```
shelters/{shelterId}
  name: string
  lat: number
  lng: number
  capacityText: string (ej. "214 / 400")
  open: boolean
```

### `alerts` (feed de eventos consolidados, lectura pública, escritura solo Admin SDK)

```
alerts/{alertId}
  icon: string (nombre de Material Symbol, ej. "crisis_alert")
  title: string
  body: string
  tone: string ("ERROR" | "SAFE" | "NEUTRAL")
  createdAt: Timestamp
```

## Firestore security rules (resumen, ver `cloud/firestore.rules`)

- `findings`: sin lectura ni escritura de clientes (solo Admin SDK vía Cloud Functions).
- `people`, `shelters`, `alerts`: lectura pública (`allow read: if true`), sin escritura de clientes.
- Cualquier escritura desde el cliente está prohibida; todo pasa por `ingestFinding`.

## Estados (`PersonStatus`, valores compartidos exactos)

`SAFE`, `MISSING`, `UNCONFIRMED`, `INJURED`, `SEARCHING`

Estos strings deben coincidir EXACTAMENTE (mayúsculas) entre:
- `android-app/app/src/main/java/com/gofest/shake/data/model/Person.kt` (enum `PersonStatus`)
- payload de `ingestFinding` / documentos Firestore
- `panel/` (mapeo a colores usando los mismos tokens que `docs/design/shake-design-system/tokens/colors.css`, variables `--status-*`)

## Beacon WiFi Direct (formato del `emergencyId` embebido)

El servicio WiFi Direct anuncia un `DnsSdServiceInfo` con record `emergencyId`
en formato `SH-XXXXXX` (6 caracteres alfanuméricos mayúsculas, generado
localmente al activar el modo víctima). Este mismo string es el que se usa
como ID de documento en `people/{emergencyId}` y como campo `emergencyId` en
`findings`. Ver `android-app/app/src/main/java/com/gofest/shake/mechanism/wifidirect/WifiDirectConstants.kt`
para el nombre exacto del servicio y las claves del TXT record.
