# Google Shake
### Localización acústica de personas atrapadas tras un sismo
**Hackathon GoFest 26 — Rebuild Colombia**

---

## 1. Problema

El 10 de agosto de 2026, un sismo de magnitud 7.4 con epicentro en San José del Palmar (Chocó) afectó comunidades en distintas regiones de Colombia. En las primeras horas después de un sismo de esta magnitud —la llamada **"Hora Dorada"**— ocurren dos fallas críticas de forma simultánea:

- **Colapso de las redes de comunicación.** Las redes 4G/5G y eléctricas caen o se saturan, dejando a las personas atrapadas o aisladas sin forma de emitir una señal de auxilio.
- **Búsqueda a ciegas.** Los equipos de búsqueda y rescate (USAR) y los organismos de socorro no tienen forma de saber, al recorrer un área de escombros, si hay alguien con vida cerca. Rastrean zonas extensas de forma manual o acústica improvisada, perdiendo horas valiosas en las que la probabilidad de supervivencia cae rápidamente.

**Personas afectadas:** población en zonas de alto riesgo sísmico (ej. Chocó, Eje Cafetero, Nariño) y los equipos de socorro (bomberos, Cruz Roja, UNGRD) que hoy no cuentan con una forma rápida y de bajo costo de confirmar presencia de personas bajo escombros.

---

## 2. Solución

Google Shake es una aplicación móvil con **dos modos de operación** que convierte cualquier smartphone en una herramienta activa de localización durante una búsqueda:

### Modo víctima — emisor (automático)
Al detectar el sismo (acelerómetro + alerta de emergencia), el teléfono entra en **modo baliza emisor**: comienza a transmitir en segundo plano, por ciclos espaciados, una señal WiFi (2.4 GHz, vía WiFi Direct) con un identificador de emergencia reconocible. La emisión por ciclos —en lugar de continua— busca compensar el mayor consumo de batería de WiFi frente a otras tecnologías de corto alcance.

### Modo rescate — receptor (activado por el equipo de búsqueda)
El equipo de rescate activa en su propio dispositivo el **modo receptor**, que escanea continuamente en busca de esa señal WiFi mientras recorre la zona de escombros.

### Coincidencia y alarma
Cuando el dispositivo del rescatista detecta la señal emitida por el teléfono de una víctima, se produce una coincidencia de frecuencia y activa de inmediato una **alarma local**: sonido fuerte y llamativo al volumen máximo, junto con una indicación visual. Esto permite a los rescatistas **confirmar presencia y localizar con precisión** el punto donde buscar, sin depender de triangulación compleja ni de infraestructura instalada previamente.

Si el dispositivo receptor cuenta con algo de señal disponible en ese momento, el hallazgo (ubicación aproximada y hora) se sincroniza además hacia un panel central, permitiendo consolidar en un solo mapa lo que van encontrando distintos equipos de rescate operando en paralelo.

---

## 3. Arquitectura

```
[Víctima — modo emisor]               App emite por ciclos espaciados una
        │                             señal WiFi (2.4 GHz) con un identifi-
        │                             cador de emergencia, activada auto-
        │                             máticamente al detectar el sismo
        │  (WiFi 2.4 GHz — atraviesa escombros)
        ▼
[Equipo de rescate — modo receptor]   App/dispositivo escanea continua-
        │                             mente en busca de esa señal mientras
        │                             recorre la zona
        │
        │  al detectar coincidencia:
        ▼
[Alarma local]                        Sonido fuerte + indicación visual en
                                       el dispositivo del rescatista →
                                       confirmación y localización precisa
        │
        │  (sincronización oportunista, si hay señal disponible)
        ▼
[Cloud Pub/Sub]                       Ingesta asíncrona de hallazgos
        │
        ▼
[Cloud Functions]                     Filtrado de duplicados y consolidación
        │
        ▼
[Firestore]                           Almacenamiento de hallazgos en vivo
        │
        ▼
[Google Maps JavaScript API]          Panel de control: mapa consolidado
                                       de todos los equipos en terreno
```

La detección y la alarma ocurren **de forma local, sin depender de red**, lo que garantiza que el mecanismo funcione incluso con la conectividad completamente caída. La nube entra en juego únicamente para consolidar información entre distintos equipos de rescate cuando hay señal disponible.

---

## 4. Tecnologías de Google usadas y por qué

| Tecnología | Rol en el sistema | Por qué esta y no otra |
|---|---|---|
| **Firebase Cloud Messaging** | Alerta temprana antes del sismo y activación remota del modo emergencia | Permite despertar la app con prioridad alta segundos antes de la onda sísmica principal |
| **Cloud Pub/Sub** | Punto de entrada de hallazgos sincronizados desde el terreno | Absorbe ráfagas de eventos sin acoplar los dispositivos receptores al procesamiento, tolerando conectividad intermitente |
| **Cloud Functions** | Procesamiento serverless (deduplicación, consolidación de hallazgos) | Escala a cero en tiempos normales y crece instantáneamente durante una emergencia, sin costo de mantener servidores encendidos |
| **Firestore** | Almacenamiento de hallazgos en tiempo real | Sincronización en vivo nativa hacia el panel de control, sin necesidad de polling |
| **Google Maps JavaScript API** | Visualización del panel de control | Permite a los organismos de socorro leer de un vistazo dónde ya se encontraron coincidencias y qué zonas faltan por recorrer |

---

## 5. Datos

No existe un conjunto de datos público de hallazgos de este tipo —por su naturaleza, solo existen durante una emergencia real. El panel de control se demuestra con **datos sintéticos generados por el propio equipo**, documentados con las siguientes limitaciones:

- Las coordenadas y horas de los hallazgos son generadas dentro de un rango realista, no capturadas de dispositivos reales.
- No se usan datos personales ni ubicaciones reales de personas.
- El mecanismo de detección local (WiFi, coincidencia y alarma) se demuestra con los propios dispositivos del equipo durante la demo en vivo.

---

## 6. Escalabilidad

- **Sin infraestructura previa que instalar:** el mecanismo depende únicamente de la app en los teléfonos de la población y de los equipos de rescate, lo que permite escalar de un municipio a una región o a todo el país sin desplegar equipamiento físico nuevo en campo.
- **Costo marginal bajo:** la arquitectura serverless en Google Cloud escala con el uso real (pago por uso), sin costo de mantenimiento en tiempos de calma.
- **Reutilización en otros escenarios:** el mismo mecanismo de emisión/detección/alarma aplica a otras emergencias donde haya personas atrapadas o aisladas (deslizamientos, inundaciones, colapsos estructurales), cambiando únicamente el disparador de activación.
- **Adopción por fases:** comenzando en municipios con falla geológica activa (Chocó, Eje Cafetero, Nariño), con posibilidad de integrarse a UNGRD y, a futuro, a otros países del Cinturón de Fuego del Pacífico.

---

## 7. Impacto esperado

- **Confirmación inmediata y sin curva de aprendizaje:** cualquier rescatista con el dispositivo receptor activo puede confirmar presencia de una persona con vida en segundos.
- **Funciona sin red:** el mecanismo central (emisión, recepción, alarma) no depende de conectividad, por lo que sigue operando incluso con las redes celulares completamente caídas.
- **Consolidación de esfuerzos:** el panel central evita que distintos equipos de rescate dupliquen zonas de búsqueda ya cubiertas.

---

## 8. Entregables del hackathon

- [ ] Repositorio público en GitHub con el código de la app (modo emisor/receptor) y el panel de control
- [ ] Demo en vivo mostrando el flujo completo: emisión → coincidencia → alarma → registro en el panel
- [ ] Este documento como descripción de problema y solución
- [ ] Pitch narrando el problema, el mecanismo y la visión de escalamiento
