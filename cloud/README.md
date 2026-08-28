# Shake: backend cloud

Cloud Functions (2nd gen) + Firestore que implementan el contrato de
[`SCHEMA.md`](./SCHEMA.md).

```
App Android --HTTPS POST--> ingestFinding --Pub/Sub "shake-findings"--> consolidateFinding --> Firestore
Panel web <--onSnapshot (solo lectura)-- Firestore
```

La app Android nunca embebe credenciales de Pub/Sub: solo hace el `POST` a
`ingestFinding`, que publica server-side con las credenciales del propio
proyecto de Cloud Functions.

## Contenido

| Archivo | Qué es |
|---|---|
| `functions/index.js` | `ingestFinding` (HTTPS) y `consolidateFinding` (Pub/Sub) |
| `functions/package.json` | Dependencias y runtime Node 22 |
| `firestore.rules` | Lectura pública de `people`/`shelters`/`alerts`, cero escritura de clientes |
| `firestore.indexes.json` | Vacío: las queries del panel y de la app son `collection()` sin filtros compuestos |
| `firebase.json` | Apunta functions, rules e indexes |

## Estado actual

**El proyecto Firebase real todavía no está provisionado.** La app Android usa
un `google-services.json` placeholder, así que los pasos de abajo son para
ejecutar cuando exista el proyecto de verdad (y hay que regenerar el
`google-services.json` de la app desde ese proyecto).

## Despliegue

Requiere Firebase CLI (`npm i -g firebase-tools`) y `gcloud` autenticado.

```bash
cd cloud

firebase login
firebase use --add                 # elegir o crear el proyecto, alias "default"

# El topic debe existir antes del primer deploy: consolidateFinding se suscribe a él
gcloud pubsub topics create shake-findings --project=<PROJECT_ID>

cd functions && npm install && cd ..
firebase deploy --only functions,firestore:rules,firestore:indexes
```

El plan Blaze es obligatorio: las funciones 2nd gen corren sobre Cloud Run.
Habilitar también `cloudfunctions`, `run`, `pubsub`, `eventarc` y
`artifactregistry` en el proyecto (el CLI lo ofrece al desplegar).

## Prueba manual

`ingestFinding` tiene CORS abierto, así que se puede probar con curl:

```bash
curl -X POST https://<region>-<project-id>.cloudfunctions.net/ingestFinding \
  -H 'Content-Type: application/json' \
  -d '{
    "reporterId": "test-uid",
    "emergencyId": "SH-4F9A2C",
    "personName": "Ana Torres",
    "status": "SAFE",
    "lat": -34.6037,
    "lng": -58.3816,
    "notes": "Barrio Centro",
    "timestamp": "2026-08-28T14:00:00Z"
  }'
# -> {"findingId":"..."}
```

Después de unos segundos deberían existir `findings/<findingId>`,
`people/SH-4F9A2C` y, si la persona no estaba ya en `SAFE`, un doc nuevo en
`alerts`.

Payload inválido devuelve `400` con `{"error":"invalid payload","details":[...]}`;
un fallo al publicar en Pub/Sub devuelve `500`.

## Semilla de `shelters`

`shelters` no la escribe ninguna función: es semilla manual. Cargar los
documentos desde la consola de Firestore o con un script del Admin SDK, con los
campos `name`, `lat`, `lng`, `capacityText`, `open`.
