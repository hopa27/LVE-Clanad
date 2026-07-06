# IFA Bacs Commission — Application Digest

## 1. Application

| Field        | Value                                                                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name         | IFA Bacs Commission                                                                                                                                                   |
| Version      | 1.0.0                                                                                                                                                                 |
| Type         | Static web app (no backend) — recreation of the legacy Windows "IFA Bacs Commission" desktop tool, a financial back-office BACS commission calculator                 |
| Description  | Liverpool Victoria (LVE) internal back-office tool for running a BACS commission calculation. Staff pick a Start Date, End Date, and Pay Date, then run the commission calculation; the result is reported via a notification ("sent to the Finance team"). All logic is client-side with sample data. |
| Framework    | Angular (standalone components, signals) + TypeScript                                                                                                                 |
| Styling      | Tailwind CSS v4; global design tokens in `src/index.css`; `--radius: 30px`; global base reset via `@layer base`; `body { zoom: 0.8 }` global scale for legacy-tool fidelity |
| Icons        | `react-icons/md` (Material Design) — `MdUndo`, `MdPlayArrow`, `MdClose`, `MdOutlineCalendarToday`, `MdKeyboardArrowLeft`, `MdKeyboardArrowRight`, `MdErrorOutline`, `MdSearch`, `MdInfoOutline` |
| UI Kit       | shadcn/ui (Radix UI primitives): `Popover`, `Button`, `Input`, `Tabs`, `Tooltip`, `Toaster`; plus custom `Calendar`, `DatePicker`, `Combobox`, `CounterInput`, `DataGrid`, `EditableDataGrid` |
| Date handling | `date-fns` — formatting (`format`, `parse`, `isValid`) and calendar arithmetic (`addDays`, `addMonths`, `addYears`, `isBefore`, `isAfter`, `startOfDay`); custom 3-view calendar (no `react-day-picker`) |
| Routing      | `wouter` — single-page; `/` (Commission Run) and `/components` (Component Library) are reachable; any other path renders the 404 fallback |
| State        | Local React state on the Commission Run page (`useState`); TanStack Query + Tooltip providers mounted at `App` level; no server queries |
| Data store   | None — frontend-only. The calculation derives a fixed sample result (`RECORD_COUNT = 5`) and applies the selected Pay Date |
| Auth         | No server auth — demo header shows static **Close** and **Logout** controls                                                                                          |
| Build        | Vite → static `dist/public/` output; reads `PORT` and `BASE_PATH` environment variables at startup; `wouter` base = `BASE_URL` (trailing slash stripped) |

### Fonts

| Role    | Family             |
| ------- | ------------------ |
| Heading | Livvic (`--app-font-sans`) |
| Body    | Mulish (used via `font-['Mulish']` on inputs / body copy) |
| Serif   | Georgia (`--app-font-serif`) |
| Mono    | Menlo (`--app-font-mono`) |

### Brand colours

| Token        | Hex       | Usage                                                       |
| ------------ | --------- | ---------------------------------------------------------- |
| navy         | `#00263e` | Header bar background                                       |
| title_blue   | `#002f5c` | Card titles, headings                                      |
| accent_blue  | `#006cf4` | Primary button fill, focus rings, calendar selected day, calendar icon |
| secondary_blue | `#04589b` | Secondary button text / border                           |
| link_blue    | `#005a9c` | Link button text, calendar nav arrows                      |
| green        | `#178830` | DatePicker active/focus border, calendar caption           |
| toast_green  | `#006837` | Toast top-border accent                                     |
| toast_navy   | `#002f5c` | Toast close button outline                                 |
| gray_border  | `#BBBBBB` | Input / card borders, separators                           |
| text         | `#3d3d3d` | Body text                                                  |
| disabled_bg  | `#CCCCCC` | Disabled input background                                  |
| disabled_btn | `#979797` | Disabled button background                                 |
| muted_text   | `#979797` | Disabled icon colour                                       |
| surface_bg   | `#f0f0f0` | App background                                             |
| accent_soft  | `#eef4f8` | Calendar weekday header, Monday highlight background       |
| hatch_bg     | `#e7ebec` | Outside-month / year-cell hatching in calendar             |
| teal_scroll  | `#62bda8` | Custom scrollbar thumb                                     |
| red          | `#d72714` | Destructive button, error / invalid state, 404 icon        |

---

## 2. Global Components

### 2.1 Header (`Header`, `src/components/layout/Header.tsx`)

```yaml
selector: app-header
sticky: false
background: "#00263e"
padding: "py-5 px-[142px]"
left:
  - logo:
      component: Logo (variant=light)
      src: "src/assets/lve-logo.png"   # rendered as <img alt="LV=">
      height: h-6
      action: "navigate to / (wraps Logo in a wouter Link)"
  - divider: "h-8 w-px bg-slate-600/50"
  - title:
      text: route-derived label
      rules:
        - path "/components": "Component Library"
        - default:           "IFA Bacs Commission"
      font: "Livvic 30px font-normal text-white"
right:
  - close_button:
      label: "Close"
      icon: MdClose (20px)
      variant: ghost (text-white, hover bg-white/10), h-8, gap-2
      action: "(static control in this recreation)"
  - logout_button:
      label: "Logout"
      variant: ghost (text-white, hover bg-white/10), h-8
      action: "(static control in this recreation)"
inputs: []
outputs: []
```

### 2.2 Footer (`Footer`, `src/components/layout/Footer.tsx`)

```yaml
selector: app-footer
background: white
border: "border-t border-slate-200"
padding: "py-4 px-8"
layout: "flex justify-between items-center; pinned to bottom (mt-auto)"
left:
  - logo: Logo (variant=dark)  // h-6
right:
  - address: "LVE Financial Services Ltd / 123 Corporate Square, London, UK"
    font: "10px font-medium text-slate-400, right-aligned"
inputs: []
outputs: []
```

### 2.3 Logo (`Logo`, `src/components/layout/Logo.tsx`)

```yaml
selector: app-logo
implementation: "<img> of src/assets/lve-logo.png (alt='LV=')"
inputs:
  - className?: string
  - variant?:  "light" | "dark"   # accepted by the API; current image is variant-agnostic
```

### 2.4 Page shell

Every route composes the same shell directly (no separate Layout component):
`<div min-h-[125vh] flex flex-col bg-[#f0f0f0]>` → `<Header>` → `<main>` →
`<Footer>`. The global `<Toaster>` is mounted once at `App` level, outside the
routes. `App` also provides `QueryClientProvider` and `TooltipProvider`.

---

## 3. Screens

### 3.1 Commission Run (`Home`, `src/pages/Home.tsx`, route `/`)

The app's main screen. A single white card, **"Calculate Commission Run"**,
holds the three date fields and the action buttons. There are **no blocking
modals**; user feedback is delivered via bottom-right **toasts** (§5).

```
+-------------------------------------------------------------------------------------------+
|  Calculate Commission Run                                                                  |
|                                                                                           |
|  Start Date            End Date              Pay Date                                      |
|  [ DD/MM/YYYY 📅 ]     [ DD/MM/YYYY 📅 ]     [ Select pay date 📅 ]     [ ↩ Undo ] [ ▶ GO!! ] |
+-------------------------------------------------------------------------------------------+
```

```yaml
layout:
  card: "bg-white rounded-[12px] border #BBBBBB p-8 shadow-sm"
  title: "Livvic 24px font-semibold #002f5c"
  row: "flex flex-wrap items-end gap-6  (auto-layout: fields flex + wrap)"
  fields: "each wrapper flex-1 min-w-[200px] max-w-[280px]"
  buttons: "flex flex-wrap gap-4 ml-auto shrink-0"
fields:
  - Start Date: DatePicker (placeholder DD/MM/YYYY)
  - End Date:   DatePicker (disabled days < Start Date)
  - Pay Date:   DatePicker (placeholder "Select pay date"; disabled days <= End Date)
```

#### 3.1.1 Field auto-fill cascade

```yaml
on_start_select(date):
  startDate = date
  endDate   = date + 6 days     # auto-filled
  payDate   = endDate + 3 days  # auto-filled
on_start_clear:
  endDate = undefined; payDate = undefined
on_end_select(date):
  endDate = date
  payDate = date + 3 days       # re-derived
```

#### 3.1.2 Field constraints

| Field | `isDateDisabled` rule |
| ----- | --------------------- |
| Start Date | none |
| End Date | day **before** Start Date (`isBefore(day, startOfDay(start))`) |
| Pay Date | day **on or before** End Date (`!isAfter(day, startOfDay(end))`) |

Disabled days are struck through in the calendar and rejected if typed.

#### 3.1.3 Action buttons

| Button | Icon | Variant | Enabled when | Behaviour |
| ------ | ---- | ------- | ------------ | --------- |
| Undo | `MdUndo` | secondary | all 3 dates filled & not calculating | Clears all fields → **"Cleared"** toast |
| GO!! | `MdPlayArrow` | primary (default) | all 3 dates filled & not calculating | Runs ~600 ms simulation (label → "Calculating…"), clears fields, **"Report sent to Finance team"** toast |

```yaml
allFieldsFilled: "Boolean(startDate && endDate && payDate)"   # gates both buttons
isCalculating:   "true during the ~600ms GO!! timeout; disables both buttons"
```

---

### 3.2 Component Library (`Components`, `src/pages/Components.tsx`, route `/components`)

A styleguide page demonstrating the LVE design-system controls (Header title
switches to "Component Library"). Read-only reference; no modals/dialogs.

```yaml
sections:
  - Buttons: [Default Primary, Secondary, Destructive, Outline, Ghost on Dark, Link, Disabled]
  - Inputs & Controls: [Input (MdSearch), DatePicker, Combobox, CounterInput (±)]
  - Tabs: [Tab A | Tab B | Tab C] with TabsContent
  - DataGrid: columns Name | Amount | Status (sample rows)
  - EditableDataGrid: radio + checkbox + editable percent cells
layout: "max-w-[1200px] mx-auto; sections stacked with gap-12"
```

---

### 3.3 404 — fallback (`NotFound`, `src/pages/not-found.tsx`, any unmatched path)

Rendered inside the standard shell.

```yaml
icon:    MdErrorOutline (64px, red #d72714)
heading: "404 — Page Not Found"  (Livvic 24px #002f5c)
message: "The page you are looking for does not exist or has been moved."
card:    "bg-white rounded-[12px] border #BBBBBB shadow-sm p-12 max-w-md, centred"
```

---

## 4. Modals, Popovers & Controls

> The app has **no blocking modal dialogs**. Its only interactive overlay is the
> DatePicker calendar **popover**; all transient feedback uses toasts (§5).

### 4.1 DatePicker (`DatePicker`, `src/components/ui/date-picker.tsx`)

A **hybrid control**: a typeable masked text input plus a Radix `Popover`
containing the custom 3-view `Calendar`. Used on `/` (all three fields) and in
the Component Library.

```yaml
inputs:
  - date?:            Date
  - onSelect?:        (date: Date | undefined) => void
  - placeholder?:     string         # default "DD/MM/YYYY"
  - error?:           boolean
  - disabled?:        boolean
  - highlightMondays?: boolean
  - isDateDisabled?:  (date: Date) => boolean
trigger:
  text_input:
    placeholder: "DD/MM/YYYY"
    inputMode: numeric
    accepts: "digits only — letters/symbols stripped on input"
    auto_format: "slashes inserted automatically → DD/MM/YYYY"
    clamping:
      day:   "leading digit > 3 auto-pads (4 → 04); 00 → 01; > 31 → 31"
      month: "leading digit > 1 auto-pads (5 → 05); 00 → 01; > 12 → 12"
    commit: "on blur or Enter — parses dd/MM/yyyy; rejects impossible (31/02) or disabled dates"
    clear: "empty value commits onSelect(undefined)"
    sync: "useEffect re-syncs the text when `date` changes externally (calendar / parent)"
  calendar_button:
    icon: MdOutlineCalendarToday (20px, #006cf4)
    divider: "h-6 w-[1px] #BBBBBB"
    action: "opens the calendar popover"
states:
  default: "border #BBBBBB"
  hover:   "border #178830 (green)"
  active:  "(focused or popover open) border #178830 2px"
  error:   "(error prop or invalid typed value) border + text red #d72714"
  disabled: "bg #CCCCCC, border #ACACAC 2px, calendar icon #979797"
popover:
  container: "rounded-[12px] border-[2px] #178830 (red when error)"
  content: Calendar (see §4.2)
```

### 4.2 Calendar (`Calendar`, `src/components/ui/calendar.tsx`)

Custom three-view calendar (Days / Months / Years) built on `date-fns` — **not**
`react-day-picker`. Width 300px, Mulish.

```yaml
views: [days, months, years]
header:
  prev/next arrows: MdKeyboardArrowLeft / MdKeyboardArrowRight
  step:
    days:   "± 1 month"
    months: "± 1 year"
    years:  "± 25 years (page)"
  captions:
    days:   "[Month] [Year]  — Month click → months view; Year click → years view"
    months: "[Year]          — Year click → years view"
    years:  "[start - start+24]"
days_view:
  weekday_header: "Su Mo Tu We Th Fr Sa  (bg #eef4f8)"
  grid: "6 weeks × 7 (42 cells)"
  selected_day: "filled #006cf4 circle, white text"
  today: "bold #006cf4"
  monday_highlight: "(highlightMondays) bold #006cf4 ring + #eef4f8 bg"
  outside_month: "faded + diagonal hatch (#e7ebec)"
  disabled_day: "struck through, #CCCCCC, not clickable"
  on_pick: "onSelect(day) → DatePicker fills field and closes popover"
months_view: "3 columns; cell shows 2-digit number + 3-letter month; pick → days view"
years_view:  "5 columns × 25 years; hatched cells; pick → months view"
inputs:
  - selected?: Date
  - onSelect?: (date: Date | undefined) => void
  - error?: boolean
  - highlightMondays?: boolean
  - isDateDisabled?: (date: Date) => boolean
```

### 4.3 Other design-system controls (Component Library only)

```yaml
Button (src/components/ui/button.tsx):
  base: "rounded-[30px] font-sans text-base; disabled: bg #979797 white"
  variants:
    default:     "#006cf4 fill, white, hover #003578"
    destructive: "#d72714 fill, white"
    outline:     "border #BBBBBB, white bg, hover #eaf5f8"
    secondary:   "white bg, #04589b text+border, bold, hover #003578 white"
    ghost:       "transparent, hover bg-white/10 (used in header)"
    link:        "#005a9c underline on hover"
  sizes: [default h-44, sm h-8, lg h-10, icon 9×9]
Input:          "text field with MdSearch adornment example"
Combobox:       "select-style dropdown (options list)"
CounterInput:   "numeric field with ± spinner"
Tabs:           "TabsList / TabsTrigger / TabsContent"
DataGrid:       "static read-only table (Name | Amount | Status)"
EditableDataGrid: "editable rows with radio, checkbox, percent cells"
Tooltip:        "Radix tooltip (provider mounted at App)"
```

---

## 5. Toast Notifications

```yaml
component: Toaster (src/components/ui/toaster.tsx) + useToast hook
position: bottom-right
limit: 1                      # TOAST_LIMIT = 1 (one at a time)
dismiss: "auto + manual via ✕ close button"
styling (LVE spec, src/components/ui/toast.tsx):
  top_border: "8px green #006837 accent"
  title: "bold green 20px"
  body: "16px / leading-6, #3d3d3d"
  close: "navy #002f5c circular outlined MdClose, sr-only 'Close'"
  destructive_variant: "red #d72714 accent (available; unused in current flows)"
triggers:
  - on GO!! complete:
      title: "Report sent to Finance team"
      body:  "5 records for pay date DD/MM/YYYY were calculated and the BACS file was sent automatically."
  - on Undo:
      title: "Cleared"
      body:  "Date fields have been reset."
```

---

## 6. State Model (Commission Run)

| State | Type | Notes |
| ----- | ---- | ----- |
| `startDate` | `Date \| undefined` | Drives the auto-fill cascade |
| `endDate` | `Date \| undefined` | Auto = Start + 6 days; editable |
| `payDate` | `Date \| undefined` | Auto = End + 3 days; editable |
| `isCalculating` | `boolean` | True during the ~600 ms GO!! simulation |
| `allFieldsFilled` | derived `boolean` | `start && end && pay`; gates Undo + GO!! |

Constants: `RECORD_COUNT = 5` (records reported by the simulated run).

**Angular mapping:** model the three dates + `isCalculating` as a signal-based
component store; the GO!! run becomes a service method returning an observable
that resolves after a short delay and emits the toast payload.

---

## 7. Routing

```yaml
router: wouter (base = BASE_URL without trailing slash)
routes:
  - path "/":            Home (Commission Run)
  - path "/components":  Components (Component Library)
  - default:             NotFound (404)
providers (App):
  - QueryClientProvider (TanStack Query)
  - TooltipProvider
  - Toaster (mounted once, outside routes)
```

---

## 8. Proposed Angular Component Map

| React component | Suggested Angular selector | Notes |
| --------------- | -------------------------- | ----- |
| `Home` | `app-commission-run` (route `/`) | main calculator |
| `Components` | `app-component-library` (route `/components`) | styleguide |
| `NotFound` | `app-not-found` (wildcard route) | 404 |
| `Header` | `app-header` | route-derived title + Close/Logout |
| `Footer` | `app-footer` | logo + address |
| `Logo` | `app-logo` | img wordmark |
| `DatePicker` | `app-date-picker` | masked input + calendar popover |
| `Calendar` | `app-calendar` | 3-view (days/months/years) |
| `Button` | `app-button` | variant + size inputs |
| `Toaster` / `useToast` | `app-toaster` + `ToastService` | global |
| `Combobox` | `app-combobox` | library only |
| `CounterInput` | `app-counter-input` | library only |
| `Tabs` | `app-tabs` | library only |
| `DataGrid` | `app-data-grid` | library only |
| `EditableDataGrid` | `app-editable-data-grid` | library only |

---

## 9. Coverage Checklist (validated against current build)

- [x] App shell — Header (logo→/, route title, **Close**, **Logout**) + Footer.
- [x] Route `/` — Commission Run (Start/End/Pay + Undo + GO!!).
- [x] Auto-fill cascade + per-field date constraints.
- [x] GO!! simulated run (~600 ms, RECORD_COUNT=5) + reset.
- [x] Route `/components` — Component Library styleguide (all controls).
- [x] 404 fallback route.
- [x] DatePicker — typeable masked input (numbers-only, DD/MM/YYYY, month ≤ 12, day ≤ 31, commit on blur/Enter) **+** 3-view calendar popover.
- [x] DatePicker states: default / hover / active / error / disabled.
- [x] Toast notifications (Report sent / Cleared) — the only popup surface.
- [x] No blocking modals/dialogs exist (documented intentionally).
- [x] Design tokens: fonts (Livvic/Mulish), `--radius 30px`, `zoom: 0.8`, brand colours.
```
