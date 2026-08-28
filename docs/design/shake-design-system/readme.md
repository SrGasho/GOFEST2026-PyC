# Shake — Design System

Shake is a mobile app for finding people after an earthquake. Someone opens it in the minutes after a shock, in bad light, on a degraded network, while frightened. Everything in this system is shaped by that: large targets, unambiguous status, plain sentences, no decoration that costs a millisecond of comprehension.

The system is built on **Material Design 3**, as specified by the brief. Where M3 publishes a value — the type scale, the 4dp grid, elevation levels, state-layer opacities, shape scale — this system uses it verbatim rather than reinventing it. What is Shake-specific is the colour palette generated from the brand mark, the person-status semantic layer, and a small set of composed patterns (`StatusChip`, `PersonRow`, `SeismicBar`, `Avatar`).

## Sources given

| Source | What it was | Where it went |
| --- | --- | --- |
| `uploads/materials-1787938548476-mku0.png` — "Asset 2@4x.png" | The Shake shield mark: a shield outline in four colours with a seismograph trace inside | Copied verbatim to `assets/logo-shield.png`. Brand colours were sampled from its pixels. |
| Brief (chat) | "An app to help find people after an earthquake, it has to be on material design"; mobile app only; utilitarian tone; primary `#1B4DFF` | Drives the whole system |

No codebase, Figma file, deck, or copy library was provided. Everything below that is not derivable from the mark or the brief is a documented decision, not a recreation — see **Open questions** at the end.

---

## Content fundamentals

**Voice.** Calm, specific, and short. The app is a tool held by someone under stress, so it never performs concern and never celebrates. Write the way an experienced dispatcher speaks: facts first, one instruction at a time.

**Person.** "You" for the reader, "we" almost never. The app does not narrate itself. Say *Everyone following this record is notified immediately*, not *We'll notify everyone following this record*.

**Casing.** Sentence case everywhere — buttons, headings, app bars, dialog titles. The only uppercase is the M3 label-small overline used for list section headers and metadata (`8 MIN AGO`, `1,284 RECORDS · SORTED BY DISTANCE`), and status chips are sentence case, not caps, because they are read as words.

**Length.** Button labels 1–3 words. Supporting text under a field: one clause, no full stop needed if it is a fragment. Dialog supporting text: two sentences maximum, and the second sentence tells the user how to undo.

**Status words.** Fixed vocabulary, never synonymised: *Safe*, *Missing*, *Unconfirmed*, *Injured*, *Searching*. Not "OK", not "found", not "at risk". A record is *marked safe*, never "confirmed alive".

**Numbers and time.** Relative time under 24 hours (*8 min ago*, *just now*, *1 hr ago*), absolute with timezone beyond that (*Today 04:12 JST*). Distances metric with one decimal under 10 km (*1.2 km*), whole metres under a kilometre (*900 m*). Counts always exact, never "many".

**Emoji.** Never. Not in UI, not in notifications, not in marketing. Status is carried by Material Symbols glyphs, which are part of the design system and legible in greyscale.

**Examples in the right register**

- `I'm safe` — the primary self-report action. Contraction is deliberate; it is what a person would say.
- `Mark Mei as found safe?` — dialog headline, uses the first name because the reader knows this person.
- `False reports slow responders down.` — consent supporting text. States the consequence, does not moralise.
- `A nickname is fine if that is all you have.` — reduces the cost of an incomplete report.
- `Report submitted — responders notified` — snackbar. What happened, and what it caused.

**What to avoid:** "Oops", "Something went wrong", exclamation marks, "Don't worry", any phrasing that implies an outcome the app cannot know.

---

## Visual foundations

**Colour.** The palette is generated from the brand mark. Sampled exactly: blue `#3D6AB3`, red `#E22B26`, green `#1F9847`, yellow `#F5B119`. Those four seed the M3 tonal palettes — red becomes the error family, green the "found safe" family, yellow the "unconfirmed" family. The interface primary is `#1B4DFF` from the brief, expanded to a full 0–100 tonal ramp. Two background colours only: `--md-surface` (`#FBF8FF`) and the container tints above it. There are no gradients anywhere except the single soft radial that marks the epicentre on the map field.

**Status colour is load-bearing and reserved.** `--status-safe`, `--status-missing`, `--status-unconfirmed`, `--status-injured`, `--status-searching` describe people, and nothing else in the product may use them. A separate seven-step `--seismic-*` ramp describes ground intensity. Confusing the two families is the single worst mistake you can make in this system.

**Colour is never the only signal.** Every status carries a filled Material Symbols glyph and the status word alongside its colour, because records get printed in greyscale and pinned up at shelters.

**Type.** Roboto Flex for display and headline, Roboto for title, body and label, Roboto Mono for report IDs and coordinates. The M3 type scale verbatim — display 57/45/36, headline 32/28/24, title 22/16/14, body 16/14/12, label 14/12/11. Body large (16/24) is the floor for anything a user reads to make a decision; body-small is metadata only.

**Spacing.** 4dp grid. Screen margin 16dp, list gap 8dp, section gap 24dp. Touch targets never below 48dp even where the visual control is 40dp (icon buttons) or 18dp (checkboxes) — the target is padded out around it.

**Backgrounds.** Flat surface tints. No photography, no illustration, no texture, no pattern. The one exception is the map field, and the shipped version of that is a real tile layer, not decoration. Full-bleed imagery has no place in an app whose content is a list of names.

**Corner radii.** M3 shape scale: 4 / 8 / 12 / 16 / 28 / full. Buttons and FABs are fully rounded, chips are 8dp (this is the difference that stops a chip reading as a button), cards 12dp, dialogs 28dp, bottom sheets 28dp on the top corners only, text fields 4dp.

**Cards.** Three variants and no others. *Elevated* — surface-container-low, elevation-1, used when the card floats over the map. *Filled* — surface-container-highest, no shadow, used for grouped settings and informational blocks. *Outlined* — 1dp outline-variant on the page surface, used for dense record lists, the cheapest treatment and the most common. Cards never nest.

**Shadow.** The six M3 elevation levels, unmodified. Elevation is not used decoratively: level 1 for resting cards, 3 for dialogs, sheets and the FAB, 4–5 only for the phone frame itself. Scrolled content does not gain a shadow — the top app bar swaps `--md-surface` for `--md-surface-container` instead, which is the M3 way.

**Borders.** 1dp `--md-outline-variant` for dividers and outlined cards; 1dp `--md-outline` for outlined buttons and resting text fields, thickening to 2dp `--md-primary` on focus.

**Transparency and blur.** Almost never. Scrim at 32% behind dialogs and sheets, state layers at 8/10/16%, and nothing else. No frosted glass — it costs GPU on old phones, and old phones are the target device.

**Animation.** M3 easing and duration tokens. Emphasized-decelerate for anything entering (sheets, dialogs, snackbars); standard for state changes; emphasized for the switch thumb. Nothing bounces. The only looping animation in the product is the epicentre ripple on the map and the pulse on the `crisis_alert` glyph in the event banner, and both stop mattering the moment the ground stops moving. `prefers-reduced-motion` zeroes every duration token, and nothing in the product becomes unintelligible when it does.

**Hover, focus, press.** State layers, per M3: hover is the content colour at 8% over the container, focus and press at 10%, dragged at 16%. Nothing darkens or lightens by ad-hoc amounts, nothing scales on press, nothing changes its own colour. Focus-visible draws a 3dp `--md-primary` outline offset 2dp.

**Disabled.** Content at 38% opacity, container at 12% of on-surface. Disabled controls keep their position and size so layouts never reflow.

**Two home states.** The first screen is state-dependent and this is a system rule, not a screen decision. With an active event it is a full-bleed error-container hero — magnitude, intensity ramp, an ordered list of what to do right now, and two large actions ("I'm safe" and SOS). With no active event the same screen is quiet: a safe-container all-clear strip, advisories, and readiness tasks (emergency profile, beacon test, go-bag). Never show preparedness content during an event, and never show emergency actions at full weight when nothing is happening.

**Layout rules.** The top app bar and the bottom navigation bar are fixed; everything between them scrolls. The FAB sits 16dp from the right edge and 16dp above the navigation bar, and moves up when a peek card appears. Snackbars sit 96dp from the bottom so they clear the navigation bar. Only one FAB per screen, ever.

**Dark scheme.** `[data-theme="dark"]` is a full M3 dark scheme, not an inversion. It is the expected default at night and inside shelters — treat it as a first-class scheme and check every component in it.

---

## Iconography

**Material Symbols Rounded** is the icon system, loaded as a variable icon font from Google Fonts in `tokens/fonts.css`. It is the correct pairing for Material Design 3 and is available as a webfont, so no SVG sprite is copied into this project.

- **Access it through `Icon`.** Never write an inline SVG, never use an emoji as an icon, never use a Unicode dingbat. `<Icon name="person_search" size={24}/>`.
- **Fill is state, not decoration.** Outlined glyphs are the resting state; the filled axis (`FILL 1`) marks the active navigation destination, a confirmed status chip, and the event banner. Do not fill glyphs for emphasis.
- **Sizes: 20, 24, 40, 48 only.** 20 inside dense rows and chips, 24 everywhere else, 40/48 for empty states and hero moments. The optical-size axis is set to match, so glyph stroke weight stays even across sizes.
- **The Shake vocabulary.** `crisis_alert` (event), `person_search` (registry), `near_me` (map), `location_on` (last seen), `radar` (searching), `check_circle` (safe), `help` (missing), `schedule` (unconfirmed), `personal_injury` (injured), `home_work` (shelter), `groups` (household), `sos`, `call`, `share`, `my_location`, `notifications`. Reuse these; do not introduce a second glyph for a concept that already has one.
- **Colour.** Icons inherit `currentColor`. Tint by placing them inside a coloured element rather than passing an explicit colour.

**Logo.** The shield mark at `assets/logo-shield.png` is the only brand asset supplied and the only one in this project. Full colour on light surfaces; knocked out to white (`filter: brightness(0) invert(1)`) on `--md-primary` or on photography. Minimum height 24px. Never recolour individual segments, never place it on a busy background, never redraw it. **No wordmark, app icon, or monochrome variant was provided** — where a wordmark is needed, set "Shake" in Roboto Flex.

---

## Index

**Root**
- `styles.css` — the single entry point consumers link. Imports only.
- `readme.md` — this file.
- `SKILL.md` — Agent Skills manifest, for using this system inside Claude Code.
- `thumbnail.html` — homepage tile.
- `assets/logo-shield.png` — the brand mark.

**Tokens** (`tokens/`) — `fonts.css`, `palette.css` (tonal ramps + sampled brand colours), `colors.css` (M3 roles, status roles, seismic ramp, dark scheme), `typography.css`, `spacing.css`, `shape.css`, `elevation.css`, `motion.css`, `state.css`, `base.css`.

**Guidelines** (`guidelines/`) — 19 specimen cards covering the primary palette, role pairs, status colours, the seismic ramp, surfaces, error and caution, the dark scheme, the four type registers, the spacing scale, layout metrics, the shape scale, elevation, motion, state layers, the brand mark and iconography.

**Components** (`components/`)

| Group | Components |
| --- | --- |
| `actions/` | **Button**, **FAB**, **IconButton**, **SegmentedButton**, **Icon** |
| `textinputs/` | **TextField** |
| `selection/` | **Switch**, **Checkbox**, **RadioButton**, **Chip**, **Slider** |
| `containment/` | **Card**, **ListItem**, **Divider**, **Dialog**, **BottomSheet** |
| `navigation/` | **TopAppBar**, **NavigationBar**, **SearchBar**, **Tabs** |
| `communication/` | **Badge**, **ProgressIndicator**, **Snackbar** |
| `shake/` | **StatusChip**, **PersonRow**, **Avatar**, **SeismicBar**, **BeaconControl** |

Each has a `.jsx`, a `.d.ts` props contract, and a `.prompt.md` describing what it is and when to reach for it. Every directory carries a card HTML showing its states.

**Intentional additions.** No source defined a component inventory, so the set above is the Material 3 mobile inventory scoped to what this product actually needs. Four components are not in M3 and exist because the product cannot be built without them:
- **Icon** — a wrapper over the Material Symbols variable font so the fill, weight and optical-size axes stay consistent.
- **Avatar** — M3 has no avatar primitive; every screen in a person-finding app needs one.
- **StatusChip** — the person-status lifecycle, encoded once so colour, glyph and word can never drift apart.
- **PersonRow** — the composed registry row. It exists so the three-line layout is tuned once for a 412dp phone rather than reassembled per screen.
- **SeismicBar** — the active-event banner. Nothing in M3 covers a persistent, non-dismissible event header.
- **BeaconControl** — the beacon activation target. It is the largest control in the product by a wide margin, because it is pressed with one shaking hand in the dark.

Components M3 defines that this system deliberately omits: navigation rail and drawer (mobile-only product), date and time pickers, menus, tooltips, and carousels — none appear in any screen the brief describes. Add them when a screen needs them, not before.

**UI kits** (`ui_kits/`)
- `shake-app/` — the mobile app at 412×892: Home (event and all-clear states), Search, Person record, Report someone, Beacon mode, Emergency profile, Alerts, Me. Click-through. See its own README.

---

## Open questions and substitutions

1. **Fonts are loaded from Google Fonts, not shipped as binaries.** No font files were provided; Roboto / Roboto Flex / Roboto Mono are the correct Material Design faces and are linked from the Google Fonts CDN in `tokens/fonts.css`. If Shake licenses a different brand face, send the files and this is a one-file change.
2. **Icons are the Material Symbols webfont from the Google Fonts CDN.** No icon set was supplied. This is the canonical M3 set, so it is a match rather than a substitution, but nothing is vendored into `assets/`.
3. **No wordmark or app icon was supplied** — only the shield. "Shake" is set in type wherever a wordmark is needed.
4. **No map source.** The map surface in the UI kit is an abstract grid for pin layout only.
5. **All copy and data in the UI kit is written for this system**, not taken from a real Shake product. Place names are Nagoya wards.
