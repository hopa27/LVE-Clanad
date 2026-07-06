# IFA Bacs Commission — Screen Flow (ASCII)

This document captures every screen, modal, dialog, and popup reachable in the
current version of the IFA Bacs Commission web app, together with the navigation
paths and behaviour rules between them.

**Technology:** Angular
**Entry point:** `/` — the Commission Run calculator (the app's home page).

---

## Legend

```
[ Button ]        clickable button
[ field ]         text input field
[v]               dropdown / combobox / select
[x]               checkbox (ticked)
( )  (*)          radio button (unselected / selected)
[ 📅 ]            date-picker calendar trigger
>>>               navigation / transition arrow
---               section divider
```

---

## 1. Application Shell (always visible)

Every route renders inside the same shell: a fixed **Header** at the top and a
**Footer** at the bottom, with the active page content between them.

```
+-----------------------------------------------------------------------------------------------+
| [LV=] | IFA Bacs Commission                                    [ ✕ Close ]   [ Logout ]      |
+-----------------------------------------------------------------------------------------------+
|                                                                                               |
|                              <<< ACTIVE PAGE CONTENT >>>                                      |
|                                                                                               |
+-----------------------------------------------------------------------------------------------+
| [LV=]                                                          LVE Financial Services Ltd     |
|                                                               123 Corporate Square, London, UK|
+-----------------------------------------------------------------------------------------------+
```

### 1A. Header

| Element | Detail |
|---------|--------|
| **LV= logo** | Light variant; links to `/` (Commission Run). Cursor pointer. |
| **Divider** | Thin vertical rule between logo and title. |
| **Page title** | Livvic 30px white. Reads **"IFA Bacs Commission"** on `/` and the 404 route; **"Component Library"** on `/components`. |
| **[ ✕ Close ]** | Ghost button, `MdClose` icon + "Close" label, white text. |
| **[ Logout ]** | Ghost button, white text. |

- Header background: navy `#00263e`, padding `py-5 px-[142px]`.

### 1B. Footer

| Element | Detail |
|---------|--------|
| **LV= logo** | Dark variant. |
| **Address block** | "LVE Financial Services Ltd / 123 Corporate Square, London, UK" (10px slate, right-aligned). |

- Footer background: white, top border, pinned to bottom.

---

## 2. Commission Run — route `/`

The main page. A single card, **"Calculate Commission Run"**, holds the three
date fields and the action buttons. There are **no blocking modals** on this
page — feedback is delivered via bottom-right **toast notifications** (see §5).

```
+-------------------------------------------------------------------------------------------+
|  Calculate Commission Run                                                                  |
|                                                                                           |
|  Start Date            End Date              Pay Date                                      |
|  [ DD/MM/YYYY 📅 ]     [ DD/MM/YYYY 📅 ]     [ Select pay date 📅 ]     [ ↩ Undo ] [ ▶ GO!! ] |
+-------------------------------------------------------------------------------------------+
```

- All three fields are empty on first load (placeholder text shown).
- Fields and buttons use **auto-layout**: they flex within the card and wrap to
  the next line on narrow widths so nothing overflows the card.
- Each field is a **DatePicker** — typeable masked input **and** a calendar
  popover (see §4).

### 2A. Field auto-fill cascade

Selecting/typing a **Start Date** seeds the other two fields:

```
Start Date chosen
       |
       +--> End Date  = Start + 6 days   (auto-filled)
       +--> Pay Date  = End  + 3 days     (auto-filled)

End Date changed
       |
       +--> Pay Date  = End  + 3 days     (re-derived)

Start Date cleared
       |
       +--> End Date and Pay Date are cleared
```

### 2B. Field constraints (calendar)

| Field | Disabled days rule |
|-------|--------------------|
| Start Date | No restriction. |
| End Date | All days **before** Start Date are disabled (struck through). |
| Pay Date | All days **on or before** End Date are disabled. |

- Disabled days are also rejected when typed (field turns red — see §4C).

### 2C. Action buttons

```
[ ↩ Undo ]   [ ▶ GO!! ]
```

| Button | Icon | Enabled when | Behaviour |
|--------|------|--------------|-----------|
| **Undo** | `MdUndo` | All three dates filled | Clears all three fields → shows **"Cleared"** toast (§5). |
| **GO!!** | `MdPlayArrow` | All three dates filled | Simulates the run (~600 ms, label shows "Calculating…"), clears the fields, then shows the **"Report sent to Finance team"** toast (§5). |

- Both buttons are **disabled** until **all three** dates are filled, and while a
  calculation is in progress.

### 2D. GO!! flow

```
[ GO!! ] clicked  (all dates filled)
       |
       +-- button label → "Calculating…"  (both buttons disabled)
       |
       +-- after ~600 ms:
              • fields reset to empty
              • toast: "Report sent to Finance team"
                "5 records for pay date DD/MM/YYYY were calculated and the
                 BACS file was sent automatically."
```

---

## 3. Component Library — route `/components`

A styleguide page showcasing the LVE design-system controls. Same shell
(Header title switches to "Component Library"). Read-only reference; no
modals or dialogs.

```
+-------------------------------------------------------------------------+
|  Buttons                                                                |
|  [ Default Primary ] [ Secondary ] [ Destructive ] [ Outline ]         |
|  [ Ghost on Dark ]   [ Link Style ] [ Disabled ]                       |
|-------------------------------------------------------------------------|
|  Inputs & Controls                                                      |
|  [ text input ]   [ DD/MM/YYYY 📅 ]   [ Combobox [v] ]   [ £ 0.00 ↑↓ ]  |
|-------------------------------------------------------------------------|
|  Tabs        [ Tab A | Tab B | Tab C ]                                  |
|  Data Grid   | Name | Amount | Status |                                |
|  Editable Data Grid   ( ) [x] | percent |                              |
+-------------------------------------------------------------------------+
```

**Sections shown:** Buttons (all variants), Inputs & Controls (Input, DatePicker,
Combobox, CounterInput with ± spinner), Tabs, DataGrid, EditableDataGrid
(radio / checkbox / editable percent cells).

---

## 4. Date Picker Popover (DatePicker)

Used by all three date fields on `/` and in the Component Library. It is a
**hybrid control**: a typeable masked text input plus a calendar popover opened
from the calendar icon.

```
+---------------------------------+
| [ DD/MM/YYYY            | 📅 ]  |   <- text input (left)  |  calendar button (right)
+---------------------------------+
```

### 4A. Typing (masked input)

- **Numbers only** — any non-digit character (letters, symbols) is stripped on
  input and never appears.
- Auto-formats progressively to **DD/MM/YYYY**; `/` separators are inserted
  automatically as you type (e.g. `24062026` → `24/06/2026`).
- **Month clamped to 01–12**; a leading digit > 1 auto-pads (e.g. `5` → `05`).
- **Day clamped to 01–31**; a leading digit > 3 auto-pads (e.g. `4` → `04`).
- The typed value is **committed** on blur or when **Enter** is pressed.

### 4B. Calendar popover — three views

Triggered by the calendar icon. Header caption is clickable to switch views.

```
Days view                       Months view                   Years view
+--------------------+          +--------------------+         +---------------------+
| <  June 2026    >  |          | <     2026      >  |         | <  2025 - 2049   >  |
+--------------------+          +--------------------+         +---------------------+
| Su Mo Tu We Th Fr Sa          | 01  02  03  04     |        | 2025 2026 2027 ...  |
| ...6-week grid...  |          | Jan Feb Mar Apr    |        | 2030 2031 2032 ...  |
| (disabled days are |          | ...  3 cols ...    |        | ... 5 cols, 25 yrs  |
|  struck through)   |          |                    |        |                     |
+--------------------+          +--------------------+         +---------------------+
```

View navigation state machine:

```
        click month caption                 click year caption
DAYS  ───────────────────────►  MONTHS  ──(pick month)──►  DAYS
  ▲                                                          
  │           click year caption                            
  └──────────────────────────►  YEARS   ──(pick year)──►  MONTHS ──(pick month)──► DAYS
```

| View | Arrows step | Pick action |
|------|-------------|-------------|
| Days | ± 1 month | Select a day → fills field, closes popover |
| Months | ± 1 year | Select a month → go to Days view |
| Years | ± 25 years (page) | Select a year → go to Months view |

- **Today** is highlighted (blue, bold).
- **Disabled days** are struck through and non-clickable (per §2B rules).
- Outside-month days are shown faded with a hatched background.

### 4C. Error / invalid state

- A typed date that is **impossible** (e.g. `31/02/2026`) or **disabled** by the
  field's constraint is rejected on commit: the input border and text turn red
  `#d72714` and the popover border turns red.
- Clearing the field (empty) is valid and resets that date.

---

## 5. Toast Notifications (no blocking modals)

The app uses **non-blocking toasts** instead of modal dialogs. They appear at
the **bottom-right**, one at a time (toast limit = 1), and auto-dismiss; each can
be closed manually via its **✕** button.

```
                                              +-------------------------------------------+
                                              |  ▍ Report sent to Finance team        [×] |
                                              |    5 records for pay date 24/06/2026 were |
                                              |    calculated and the BACS file was sent  |
                                              |    automatically.                         |
                                              +-------------------------------------------+
```

| Trigger | Title | Body |
|---------|-------|------|
| **GO!!** completes | "Report sent to Finance team" | "5 records for pay date DD/MM/YYYY were calculated and the BACS file was sent automatically." |
| **Undo** clicked | "Cleared" | "Date fields have been reset." |

Toast styling (LVE spec):

| Element | Detail |
|---------|--------|
| Top border | 8px green `#006837` accent |
| Title | Bold green 20px |
| Close (✕) | Navy `#002f5c` circular outlined `MdClose`, sr-only "Close" |
| Body | 16px / leading-6, `#3d3d3d` |
| Destructive variant | Red `#d72714` accent (available; not used in current flows) |

---

## 6. 404 — fallback route (any unmatched path)

Rendered inside the standard shell (Header title remains "IFA Bacs Commission").

```
+----------------------------------------------+
|                   ⚠ (red)                    |
|             404 — Page Not Found             |
|   The page you are looking for does not       |
|   exist or has been moved.                    |
+----------------------------------------------+
```

| Element | Detail |
|---------|--------|
| Icon | `MdErrorOutline`, 64px, red `#d72714` |
| Heading | "404 — Page Not Found" (Livvic 24px navy) |
| Message | "The page you are looking for does not exist or has been moved." |

---

## 7. Navigation Map

```
                 [LV= logo] / [✕ Close]*            
   any route  ───────────────────────────►  /  (Commission Run)
                                              │
                 click [ /components ] link    │  (styleguide route)
   /            ──────────────────────────►  /components  (Component Library)
                                              │
   unknown path ─────────────────────────►  ** 404 fallback
```

\* The header **Close** and **Logout** buttons are present on every route as
static controls in this recreation.

```
On / (Commission Run):

  pick/type Start ──► auto-fills End (+6d) and Pay (+3d)
  change End      ──► re-derives Pay (+3d)
  [ Undo ]        ──► clears fields ──► "Cleared" toast
  [ GO!! ]        ──► ~600ms run ──► clears fields ──► "Report sent…" toast
```

---

## 8. Cross-cutting Components (proposed Angular selectors)

| Component | Suggested selector | Used by |
|-----------|--------------------|---------|
| App shell header | `app-header` | all routes |
| App shell footer | `app-footer` | all routes |
| Brand logo | `app-logo` (variant: light \| dark) | header, footer |
| Date picker (masked input + calendar) | `app-date-picker` | `/`, `/components` |
| Calendar (3-view) | `app-calendar` | `app-date-picker` |
| Button | `app-button` (variant: primary \| secondary \| destructive \| outline \| ghost \| link) | all |
| Toast / toaster | `app-toaster` + `toast` service | global |
| Combobox | `app-combobox` | `/components` |
| Counter input | `app-counter-input` | `/components` |
| Tabs | `app-tabs` | `/components` |
| Data grid | `app-data-grid` | `/components` |
| Editable data grid | `app-editable-data-grid` | `/components` |

---

## 9. State Model (Commission Run)

| State | Type | Notes |
|-------|------|-------|
| `startDate` | `Date \| undefined` | Drives the auto-fill cascade. |
| `endDate` | `Date \| undefined` | Auto = Start + 6 days; editable. |
| `payDate` | `Date \| undefined` | Auto = End + 3 days; editable. |
| `isCalculating` | `boolean` | True during the ~600 ms GO!! simulation; disables both buttons. |
| `allFieldsFilled` | derived `boolean` | `start && end && pay`; gates Undo and GO!!. |

- **Frontend-only / sample data.** The run does not call a backend; it simulates
  a send and reports a fixed record count (5). In an Angular rebuild this maps to
  a service method returning an observable that resolves after a short delay.

---

## 10. Coverage Checklist (validated against current build)

- [x] Application shell — Header (logo, title, **Close**, **Logout**) + Footer.
- [x] Route `/` — Commission Run card (Start / End / Pay + Undo + GO!!).
- [x] Auto-fill cascade and per-field date constraints.
- [x] Route `/components` — Component Library styleguide.
- [x] 404 fallback route.
- [x] DatePicker — **typeable masked input** (numbers-only, DD/MM/YYYY,
      month ≤ 12, day ≤ 31) **+** 3-view calendar popover.
- [x] Date error / invalid state (red).
- [x] Toast notifications (Report sent / Cleared) — the only popup surface.
- [x] No blocking modals/dialogs exist in this app (documented intentionally).
```
