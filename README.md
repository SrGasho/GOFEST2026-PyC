# Google Shake — GoFest 26 (Rebuild Colombia)

**Google Shake** es una app Android que ayuda a localizar personas tras un
sismo cuando no hay red móvil ni internet. La víctima emite un beacon por
**WiFi Direct** y un rescatista cercano lo detecta y dispara una alarma local,
sin infraestructura ni emparejamiento. En cuanto algún dispositivo recupera
datos móviles, el hallazgo se sincroniza a la nube
(**Pub/Sub → Cloud Functions → Firestore**) y a un panel web con **Google Maps**.

Prototipo de hackathon (GoFest 26 - Rebuild Colombia). Escenario de referencia:
sismo M7.4 en San José del Palmar, Chocó (10 de agosto de 2026). Ver
[`docs/google-shake-mvp.md`](./docs/google-shake-mvp.md) para el brief completo.

> Esto es un prototipo de hackathon, no software de producción: sin tests
> automatizados, con datos de muestra localizados y sin hardening de
> seguridad más allá de lo indispensable (reglas de Firestore, función
> intermedia para no exponer credenciales de Pub/Sub, API key de Maps
> restringida por servicio).

## Inicio rápido

Requisitos: **Android SDK + JDK 17** para la app, **Node.js 22 + Firebase CLI**
para la nube, **Python 3** (o cualquier servidor estático) para el panel. El
proyecto Firebase real (`gofest-shake-2026`) ya está cableado en los archivos
de configuración, así que no hace falta crear nada.

| Componente | Desde la raíz del repo | Resultado |
|------------|------------------------|-----------|
| App Android | `cd android-app && ./gradlew assembleDebug` | APK en `app/build/outputs/apk/debug/app-debug.apk` |
| Cloud | `cd cloud && firebase deploy --only firestore:rules,functions --project gofest-shake-2026` | Functions + reglas desplegadas |
| Panel web | `cd panel && python3 -m http.server 8080` | Panel en `http://localhost:8080` |

Para probar el mecanismo extremo a extremo hace falta instalar el APK en **dos
teléfonos** (uno emite el beacon, el otro escanea). Detalle por componente en
las secciones de abajo.

## Cómo funciona

1. **Modo víctima (emisor):** el usuario activa un beacon manualmente o el
   acelerómetro lo detecta por un sismo fuerte. El teléfono anuncia un
   servicio WiFi Direct (DNS-SD) con un `emergencyId` (`SH-XXXXXX`), estado y
   datos básicos, sin necesitar red ni internet.
2. **Modo rescatista (receptor):** otro teléfono con la app escanea
   servicios WiFi Direct cercanos. Al encontrar un beacon, suena una alarma
   local fuerte y muestra los datos recibidos.
3. **Sincronización oportunista:** en cuanto cualquiera de los dos
   dispositivos recupera datos móviles, la app envía el hallazgo a una Cloud
   Function (`ingestFinding`), que lo publica en Pub/Sub. Una segunda función
   (`consolidateFinding`) consume el mensaje y actualiza Firestore
   (`findings`, `people`, `alerts`).
4. **Panel web:** un panel estático con Google Maps JS API se suscribe en
   vivo a Firestore (`people`, `shelters`, `alerts`) para mostrar el estado
   general de la zona a los equipos de coordinación.

```
[Víctima]  --WiFi Direct (DNS-SD)-->  [Rescatista]
   |                                        |
   | (si hay datos móviles)                 | (si hay datos móviles)
   v                                        v
        POST /ingestFinding (Cloud Function, HTTPS)
                        |
                        v
                  Pub/Sub: shake-findings
                        |
                        v
          consolidateFinding (Cloud Function)
                        |
                        v
     Firestore: findings / people / alerts / shelters
                        |
                        v
        Panel web (Google Maps JS API, onSnapshot)
```

## Estructura del repo

```
android-app/   App Android nativa (Kotlin + Jetpack Compose)
cloud/         Cloud Functions, reglas de Firestore, esquema de datos
panel/         Panel web estático (Google Maps JS API + Firestore)
docs/design/   Design system original (Figma handoff) usado como referencia
docs/google-shake-mvp.md   Brief del hackathon
```

### `android-app/`

Kotlin + Jetpack Compose (Material 3), sin arquitectura sobre-diseñada: un
`MainActivity` + `ShakeNavHost` con 8 pantallas.

```
app/src/main/java/com/gofest/shake/
  data/model/         Modelos de datos (Person, AlertItem, Shelter, ...)
  data/               SampleData.kt (datos de muestra localizados en Chocó)
  data/repository/    Repos hacia Firestore/Cloud Function (degradan a
                       datos vacíos si no hay red o el backend no responde)
  mechanism/wifidirect/  Beacon y escáner WiFi Direct (servicios Android)
  mechanism/alarm/       Reproductor de alarma local
  mechanism/sensor/      Detección de sismo por acelerómetro
  ui/theme/           Theme de Compose portado del design system
  ui/components/      Componentes reutilizables (Avatar, StatusChip, ...)
  ui/screens/          Las 8 pantallas (Home, Beacon, Alerts, Person, Search,
                       Profile, Me, Report)
  ui/navigation/       ShakeNavHost.kt
```

**Compilar:**

```bash
cd android-app
./gradlew assembleDebug
```

El APK queda en `android-app/app/build/outputs/apk/debug/app-debug.apk`.
`google-services.json` ya apunta al proyecto Firebase real (`gofest-shake-2026`).

### `cloud/`

Cloud Functions (2ª gen, Node.js 22) + reglas de Firestore. Ver
[`cloud/SCHEMA.md`](./cloud/SCHEMA.md) para el contrato de datos completo y
[`cloud/README.md`](./cloud/README.md) para detalles de despliegue.

- `ingestFinding` (HTTPS): valida el payload y publica en el tópico Pub/Sub
  `shake-findings`. La app nunca tiene credenciales de Pub/Sub.
- `consolidateFinding` (trigger de Pub/Sub): escribe el hallazgo inmutable en
  `findings/` y actualiza el documento agregado en `people/{emergencyId}`.

**Desplegar:**

```bash
cd cloud
firebase deploy --only firestore:rules,functions --project gofest-shake-2026
```

### `panel/`

Panel web estático (sin build step): `index.html` + `main.js` (ES modules,
Firebase JS SDK vía CDN) + `styles.css`. Se suscribe en vivo a `people`,
`shelters` y `alerts`, y dibuja marcadores en Google Maps con colores por
estado. Basta con servirlo como archivos estáticos:

```bash
cd panel
python3 -m http.server 8080
```

La configuración de Firebase y la API key de Maps ya están en
`panel/firebase-config.js` e `panel/index.html`, apuntando al proyecto real.

## Proyecto Google Cloud / Firebase

Proyecto real provisionado para el hackathon: **`gofest-shake-2026`**
("Google Shake - GoFest 26"), con:

- Firestore (modo nativo, `nam5`)
- Pub/Sub (tópico `shake-findings`)
- Cloud Functions 2ª gen (`ingestFinding`, `consolidateFinding`)
- Firebase Auth (acceso anónimo habilitado)
- Apps registradas: Android (`com.gofest.shake`) y Web (panel)
- Maps JavaScript API (key restringida al servicio de Maps)
