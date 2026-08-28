import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const MAP_CENTER = { lat: 4.97, lng: -76.25 }; // San Jose del Palmar, Choco
const MAP_ZOOM = 12;
const ALERTS_LIMIT = 20;

// Mismos hex que docs/design/shake-design-system/tokens (esquema claro).
const STATUS_STYLE = {
  SAFE: { label: "A salvo", color: "#1F6D3C", container: "#96F9AE", onContainer: "#002110" },
  MISSING: { label: "Desaparecido", color: "#BA1A1A", container: "#FFDAD6", onContainer: "#410002" },
  UNCONFIRMED: { label: "Sin confirmar", color: "#7D5800", container: "#FFDFA6", onContainer: "#271900" },
  INJURED: { label: "Herido", color: "#5E4200", container: "#FFDBC8", onContainer: "#341100" },
  SEARCHING: { label: "Buscando", color: "#1B4DFF", container: "#DEE0FF", onContainer: "#00115B" },
};
const UNKNOWN_STATUS = { label: "Desconocido", color: "#767680", container: "#EFEDF7", onContainer: "#45464F" };

const TONE_COLOR = { ERROR: "#BA1A1A", SAFE: "#1F6D3C", NEUTRAL: "#767680" };

const SHELTER_COLOR = "#1B4DFF";
const PIN_PATH = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z";
const HOUSE_PATH = "M12 3 3 10.5V21h6v-6h6v6h6V10.5z";

const dom = {
  connState: document.getElementById("conn-state"),
  peopleList: document.getElementById("people-list"),
  alertsList: document.getElementById("alerts-list"),
  sheltersList: document.getElementById("shelters-list"),
  peopleCount: document.getElementById("people-count"),
  alertsCount: document.getElementById("alerts-count"),
  sheltersCount: document.getElementById("shelters-count"),
};

let map = null;
let infoWindow = null;
const personMarkers = new Map();
const shelterMarkers = new Map();
let people = [];
let shelters = [];

function statusStyle(status) {
  return STATUS_STYLE[status] || UNKNOWN_STATUS;
}

function hasCoords(doc) {
  return Number.isFinite(doc.lat) && Number.isFinite(doc.lng);
}

function setConnState(text, isError) {
  dom.connState.textContent = text;
  dom.connState.classList.toggle("error", Boolean(isError));
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function chip(text, style) {
  const node = el("span", "status-chip", text);
  node.style.background = style.container;
  node.style.color = style.onContainer;
  return node;
}

function showEmpty(listEl, message) {
  listEl.replaceChildren();
  const item = el("li");
  item.appendChild(el("div", "empty-state", message));
  listEl.appendChild(item);
}

function formatTimestamp(value) {
  // Firestore Timestamp | Date | string ISO-8601 | ausente
  const date =
    value && typeof value.toDate === "function"
      ? value.toDate()
      : value instanceof Date
        ? value
        : typeof value === "string"
          ? new Date(value)
          : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("es-CO", { dateStyle: "short", timeStyle: "short" });
}

function focusOn(markerMap, id) {
  const marker = markerMap.get(id);
  if (!map || !marker) return;
  map.panTo(marker.getPosition());
  google.maps.event.trigger(marker, "click");
}

// --- Mapa -------------------------------------------------------------------

function markerIcon(path, color, anchorY) {
  return {
    path,
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#FFFFFF",
    strokeWeight: 1.5,
    scale: 1.5,
    anchor: new google.maps.Point(12, anchorY),
  };
}

function personInfoContent(person) {
  const box = el("div", "info-window");
  box.appendChild(el("h3", null, person.name || person.id));
  box.appendChild(el("p", null, `Estado: ${statusStyle(person.status).label}`));
  if (person.lastSeenText) box.appendChild(el("p", null, `Visto en: ${person.lastSeenText}`));
  box.appendChild(el("p", null, `Reportes: ${person.reportCount ?? 0}`));
  return box;
}

function shelterInfoContent(shelter) {
  const box = el("div", "info-window");
  box.appendChild(el("h3", null, shelter.name || shelter.id));
  box.appendChild(el("p", null, shelter.open ? "Abierto" : "Cerrado"));
  if (shelter.capacityText) box.appendChild(el("p", null, `Capacidad: ${shelter.capacityText}`));
  return box;
}

function syncMarkers(docs, markerMap, buildIcon, buildContent, titleOf) {
  if (!map) return;
  const seen = new Set();

  for (const doc of docs) {
    if (!hasCoords(doc)) continue;
    seen.add(doc.id);
    const position = { lat: doc.lat, lng: doc.lng };
    let marker = markerMap.get(doc.id);

    if (!marker) {
      marker = new google.maps.Marker({ map, position });
      marker.addListener("click", () => {
        infoWindow.setContent(buildContent(marker.get("docData")));
        infoWindow.open({ map, anchor: marker });
      });
      markerMap.set(doc.id, marker);
    } else {
      marker.setPosition(position);
    }

    marker.set("docData", doc);
    marker.setIcon(buildIcon(doc));
    marker.setTitle(titleOf(doc));
  }

  for (const [id, marker] of markerMap) {
    if (seen.has(id)) continue;
    marker.setMap(null);
    markerMap.delete(id);
  }
}

function syncPeopleMarkers() {
  syncMarkers(
    people,
    personMarkers,
    (person) => markerIcon(PIN_PATH, statusStyle(person.status).color, 22),
    personInfoContent,
    (person) => person.name || person.id,
  );
}

function syncShelterMarkers() {
  syncMarkers(
    shelters,
    shelterMarkers,
    () => markerIcon(HOUSE_PATH, SHELTER_COLOR, 21),
    shelterInfoContent,
    (shelter) => shelter.name || shelter.id,
  );
}

// --- Listas -----------------------------------------------------------------

function renderPeople() {
  dom.peopleCount.textContent = String(people.length);
  if (people.length === 0) {
    showEmpty(dom.peopleList, "Sin personas reportadas todavia.");
    return;
  }

  dom.peopleList.replaceChildren();
  for (const person of people) {
    const style = statusStyle(person.status);
    const item = el("li", "card");
    item.style.borderLeftColor = style.color;

    const title = el("div", "card-title");
    title.appendChild(el("span", null, person.name || person.id));
    title.appendChild(chip(style.label, style));
    item.appendChild(title);

    const details = [person.lastSeenText, `${person.reportCount ?? 0} reporte(s)`].filter(Boolean);
    item.appendChild(el("div", "card-meta", details.join(" · ")));

    if (hasCoords(person)) {
      item.classList.add("clickable");
      item.addEventListener("click", () => focusOn(personMarkers, person.id));
    }
    dom.peopleList.appendChild(item);
  }
}

function renderShelters() {
  dom.sheltersCount.textContent = String(shelters.length);
  if (shelters.length === 0) {
    showEmpty(dom.sheltersList, "Sin albergues registrados todavia.");
    return;
  }

  dom.sheltersList.replaceChildren();
  for (const shelter of shelters) {
    const style = shelter.open
      ? { container: "#96F9AE", onContainer: "#002110" }
      : { container: "#FFDAD6", onContainer: "#410002" };
    const item = el("li", "card");
    item.style.borderLeftColor = SHELTER_COLOR;

    const title = el("div", "card-title");
    title.appendChild(el("span", null, shelter.name || shelter.id));
    title.appendChild(chip(shelter.open ? "Abierto" : "Cerrado", style));
    item.appendChild(title);
    item.appendChild(el("div", "card-meta", shelter.capacityText || "Capacidad sin dato"));

    if (hasCoords(shelter)) {
      item.classList.add("clickable");
      item.addEventListener("click", () => focusOn(shelterMarkers, shelter.id));
    }
    dom.sheltersList.appendChild(item);
  }
}

function renderAlerts(alerts) {
  dom.alertsCount.textContent = String(alerts.length);
  if (alerts.length === 0) {
    showEmpty(dom.alertsList, "Sin alertas todavia.");
    return;
  }

  dom.alertsList.replaceChildren();
  for (const alert of alerts) {
    const item = el("li", "card");
    item.style.borderLeftColor = TONE_COLOR[alert.tone] || TONE_COLOR.NEUTRAL;
    item.appendChild(el("div", "card-title", alert.title || "(sin titulo)"));

    const meta = [alert.body, formatTimestamp(alert.createdAt)].filter(Boolean);
    item.appendChild(el("div", "card-meta", meta.join(" · ")));
    dom.alertsList.appendChild(item);
  }
}

// --- Firestore --------------------------------------------------------------

function snapshotToDocs(snapshot) {
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

function subscribe(ref, onDocs, onFailure) {
  try {
    onSnapshot(ref, (snapshot) => onDocs(snapshotToDocs(snapshot)), onFailure);
  } catch (error) {
    onFailure(error);
  }
}

function startFirestore() {
  if (firebaseConfig.apiKey.startsWith("REPLACE_WITH")) {
    setConnState("Firebase sin configurar", true);
    showEmpty(dom.peopleList, "Completa firebase-config.js para ver datos en vivo.");
    showEmpty(dom.alertsList, "Completa firebase-config.js para ver datos en vivo.");
    showEmpty(dom.sheltersList, "Completa firebase-config.js para ver datos en vivo.");
    return;
  }

  let db;
  try {
    db = getFirestore(initializeApp(firebaseConfig));
  } catch (error) {
    console.error("No se pudo inicializar Firebase", error);
    setConnState("Firebase no disponible", true);
    showEmpty(dom.peopleList, "Sin datos aun.");
    showEmpty(dom.alertsList, "Sin datos aun.");
    showEmpty(dom.sheltersList, "Sin datos aun.");
    return;
  }

  setConnState("En vivo");

  const fail = (listEl, label) => (error) => {
    console.error(`Fallo la suscripcion a ${label}`, error);
    setConnState("Sin conexion a Firestore", true);
    showEmpty(listEl, `Sin datos aun (${label} no disponible).`);
  };

  subscribe(
    collection(db, "people"),
    (docs) => {
      people = docs;
      renderPeople();
      syncPeopleMarkers();
    },
    fail(dom.peopleList, "people"),
  );

  subscribe(
    collection(db, "shelters"),
    (docs) => {
      shelters = docs;
      renderShelters();
      syncShelterMarkers();
    },
    fail(dom.sheltersList, "shelters"),
  );

  subscribe(
    query(collection(db, "alerts"), orderBy("createdAt", "desc"), limit(ALERTS_LIMIT)),
    renderAlerts,
    fail(dom.alertsList, "alerts"),
  );
}

// --- Arranque ---------------------------------------------------------------

showEmpty(dom.peopleList, "Cargando…");
showEmpty(dom.alertsList, "Cargando…");
showEmpty(dom.sheltersList, "Cargando…");

startFirestore();

window.mapsApiReady
  .then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: MAP_CENTER,
      zoom: MAP_ZOOM,
      mapTypeControl: false,
      streetViewControl: false,
    });
    infoWindow = new google.maps.InfoWindow();
    syncPeopleMarkers();
    syncShelterMarkers();
  })
  .catch((error) => {
    console.error("No se pudo cargar Google Maps", error);
    document.getElementById("map").textContent =
      "No se pudo cargar el mapa. Revisa la API key de Google Maps en index.html.";
  });
