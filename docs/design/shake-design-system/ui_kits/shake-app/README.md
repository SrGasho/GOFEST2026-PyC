# UI kit — Shake mobile app

A click-through recreation of the Shake phone app at 412×892 (compact window). Open `index.html`. There is no map surface — no cartography source was supplied, so the product is list-and-search based.

## Screens
| File | Screen | What works |
| --- | --- | --- |
| `HomeScreen.jsx` | Home | Two states. Toggle with the bolt icon in the app bar: **event active** — magnitude hero, intensity ramp, tickable "Do this now" steps, I'm safe / SOS. **All clear** — advisories, emergency-profile completeness, beacon test, go-bag |
| `BeaconScreen.jsx` | Beacon mode | Permission bottom sheet on first open, SOS / Searching segmented control, large activation target with live broadcast state, a plain list of exactly what is being broadcast |
| `ProfileScreen.jsx` | Emergency profile | Personal data a responder reads: name, age, height, blood type chips, allergies, conditions, daily medication, emergency contacts, visibility switches |
| `SearchScreen.jsx` | Search | Live name filter, status segmented control, People / Shelters tabs |
| `PersonScreen.jsx` | Person record | Timeline, contact rows, "Found safe" confirmation dialog that writes back to the list |
| `ReportScreen.jsx` | Report someone | Validated form — required name and consent, inline errors |
| `AlertsScreen.jsx` | Alerts | Event feed with tone-coded leading icons, alert settings |
| `MeScreen.jsx` | Me | Self check-in, follower counts, privacy switches |
| `App.jsx` | — | Navigation shell, phone frame, snackbar and shared state |
| `data.js` | — | Fixture data (people, alerts, shelters, event) |

## Notes
- Every screen composes design-system components from `window.ShakeDesignSystem_bf929b`. Nothing is re-implemented locally except `MapField`.
- The status of a person is the app's central object; it always appears as colour + filled glyph + word.
- Content is fictional. Place names are Nagoya wards, chosen because the fixture event is a Nagoya earthquake.
