# Panel web de rescate — Shake

Panel de solo lectura para equipos de rescate: mapa en tiempo real con las
personas reportadas (coloreadas por estado), los albergues activos y el feed de
alertas recientes.

HTML/CSS/JS plano, sin framework ni paso de build. Firebase se carga desde CDN
como modulo ES, asi que basta con servir la carpeta con cualquier servidor
estatico.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura de la pagina y carga de los scripts (aqui va la API key de Maps) |
| `firebase-config.js` | Credenciales del proyecto Firebase (unico archivo a editar para conectar) |
| `main.js` | Inicializacion del mapa, suscripciones `onSnapshot` y renderizado |
| `styles.css` | Layout y colores de estado copiados de los tokens del design system |

## 1. API key de Google Maps

1. En [Google Cloud Console](https://console.cloud.google.com/), selecciona el
   proyecto y habilita **Maps JavaScript API**.
2. En *APIs y servicios > Credenciales*, crea una **clave de API**.
3. Restringela por referente HTTP (los dominios desde los que se sirve el panel)
   y por API (solo Maps JavaScript API).
4. Pega la clave en `index.html`, reemplazando `REPLACE_WITH_REAL_MAPS_API_KEY`
   en la URL del script de Maps.

## 2. Configuracion de Firebase

En la consola de Firebase, dentro del proyecto, registra una **app web** y copia
el objeto `firebaseConfig` que te entrega. Pega esos valores en
`firebase-config.js` reemplazando los placeholders `REPLACE_WITH_*`.

Mientras la `apiKey` siga siendo el placeholder, el panel carga igual y muestra
"Firebase sin configurar" en el header con las listas vacias, en vez de fallar.

El panel solo lee las colecciones `people`, `shelters` y `alerts`, que son de
lectura publica segun `cloud/firestore.rules`. No requiere autenticacion ni
escribe nada.

## 3. Servir localmente

El panel usa modulos ES, asi que no funciona abriendo el archivo con `file://`.
Sirvelo por HTTP desde la raiz del repo:

```bash
npx serve panel
# o
python3 -m http.server --directory panel 8000
```

## 4. Desplegar en Firebase Hosting

Requiere un `firebase.json` en la raiz del repo con `"public": "panel"` (ese
archivo es parte del workstream de `cloud/`, no se crea aqui):

```bash
firebase deploy --only hosting
```

## Notas

- Los colores de estado (`SAFE`, `MISSING`, `UNCONFIRMED`, `INJURED`,
  `SEARCHING`) estan copiados literalmente de
  `docs/design/shake-design-system/tokens/` para que coincidan con la app movil.
  Si cambian alli, hay que actualizar `STATUS_STYLE` en `main.js` y las
  variables en `styles.css`.
- Se usa `google.maps.Marker` (clasico) en lugar de `AdvancedMarkerElement`
  porque no necesita un Map ID configurado en la consola de Cloud.
