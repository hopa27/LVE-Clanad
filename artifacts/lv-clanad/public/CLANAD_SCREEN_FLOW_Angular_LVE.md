# LV= CLANAD — Screen Flow (ASCII)

This document captures every screen, tab, modal, dialog, and popup reachable
in the current version of the LV= CLANAD (Client Annuity Administration
System) application, together with the navigation paths and the **15 policy
versions ("plan codes")** the app can switch between, and the rules that
govern dynamic rendering across those versions.

**Technology:** Angular
**Entry point:** `/` — the CLANAD client screen (single route, no
lazy-loaded child routes — all 15 tabs are panels inside one component tree).
**Data:** 100% hard-coded sample data selected by the active plan code — there
is no backend and no HTTP calls; all "services" below are in-memory Angular
injectables, not REST clients.

---

## Legend

```
[ Button ]        clickable button
[ field ]         text input field
[v]               dropdown / combobox / select
[x] / [ ]         checkbox (ticked / unticked)
( )  (*)          radio button (unselected / selected)
[ 📅 ]            date-picker calendar trigger
(i) / (?)         icon-only button (tooltip / info)
>>>               navigation / transition arrow
---               section divider
```

---

## 0. The 15 "Plan Codes" — the core dynamic-rendering mechanism

Every screen in the app reads a single piece of shared state — **`planCode`**
— from an injectable **`PlanCodeService`** (`providedIn: 'root'`, exposing a
`planCode$: BehaviorSubject<PlanCodeVersion>` plus `surname$` /
`policyRef$`). Every component that needs plan-aware behaviour injects the
service in its constructor and subscribes (via the `async` pipe in the
template) rather than passing plan code down as `@Input()` props — it behaves
as a shared, app-wide singleton, the Angular equivalent of the React context
this build is based on. Almost every tab, panel, and menu derives a set of
booleans from it (`isPlan87`, `isPlan84`, `isPlan90`, `isPlan51`, `isPlan83`,
`isPlan82`, `isPlan80`, `isPlan621`, `isPlan76`, `isPlan76z`, `isPlan62a`,
`isPlan611`, `isPlan52`, `isPlan61a`, and `isPlan0`) and uses them, via
`*ngIf` / `[ngClass]` / `[hidden]` structural directives, to:

- swap which **fields are shown/hidden** on a tab,
- swap the **hard-coded sample values** shown in those fields,
- **enable/disable** individual inputs and whole action buttons (`[disabled]`
  bindings),
- change which **tabs** are visible in the tab strip at all,
- change which **menu items** appear under the Header's Options/Process/
  Print/Supervisor menus, and which action (if any) they trigger,
- change the **status-bar** wording (e.g. "LIVE" vs "MIGRATED" vs "SHELVED").

```
                    inject(PlanCodeService).planCode$ (async pipe)
                                   |
        +--------------------------+--------------------------+
        |                          |                           |
   app-header                app-toolbar                  app-tab-panel-*
  (Options/Process/       (New Quote, Sim App,          (isPlanXX booleans control
   Print/Supervisor)       Edit, Cancel, ...)             visible fields + values)
        |                          |                           |
        +--------------------------+--------------------------+
                                   |
                       app-policy-header / app-status-bar
                       (plan-code chip colour, status text)
```

### 0A. The 15 versions

| Plan Code | Plan Type | Description | Status shown |
|---|---|---|---|
| **`0`** | master | **Master — Default version** (see §0B) | n/a |
| `87` | FTA | Version 87 — Standard controls | PENDING |
| `84` | PRP | Version 84 — Full controls (incl. GAD & IR); policy holder deceased | DEAD |
| `90` | MCP | Version 90 — MCP | LIVE |
| `51` | CPA | Version 51 — CPA (Status Q) | MIGRATED |
| `83` | PRP | Version 83 — PRP (Status W) | Maturity Pending |
| `80` | PRP | Version 80 — PRP (Status M) | Matured |
| `82` | PRP | Version 82 — PRP (Status S) | Surrendered |
| `621` | PPA | Version 621 — PPA (Status I) | Death Pending |
| `76` | ICFP | Version 76 — ICFP (Status D) | DEAD |
| `76z` | ICFP | Version 76z — ICFP (Status Z) | Death Pending |
| `62a` | PPA | Version 62a — PPA (Status C) | CANCELLED |
| `611` | CPA | Version 611 — CPA (Status N) | SHELVED - Ntu |
| `52` | PPA | Version 52 — PPA (Status X) | SHELVED - Duplicate |
| `61a` | CPA | Version 61a — CPA (Status E) | EXPIRED |

`PlanCodeService`'s `BehaviorSubject` **boots on plan code `90`** (surname
`TESTCTCCHIBD`, ref `227813`) — this is the default policy shown on first
load, not `0`.

### 0B. Plan `0` — the "no dynamic rendering" baseline

Plan `0` ("Master") is intentionally **not** one of the real policy versions —
it is a **static placeholder / fallback state**, included to prove what the
screen looks like with no plan-specific data wired up:

- In the **Find Policy** grid it appears as a row where only 4 of the 12
  columns are populated (`POLICY_REF`, `PLANTYPE`, `PLAN_CODE`, `SURNAME`);
  every other column (NI No, Original Quote, Status, Postcode, IFA Ref, DOB,
  Policy No, Cocode) is **blank**.
- Across the tabs, none of the `isPlanXX` conditions match, so the
  `*ngSwitchCase` / ternary interpolations fall through to their **default
  branch** — which is either an empty string, a raw placeholder token that
  mirrors the legacy field name (e.g. `"dbday"`, `"edtStartdate"`,
  `"DBEditAPPLI"`, `"DBEdit41"`), or (in a few tabs such as Payments/Increase
  History/Quote/Maturities/LOA) a slightly more detailed **generic layout**
  used specifically so the "undecorated" shape of the screen can still be
  reviewed.
- No plan-specific business rules apply (fields are not force-disabled, no
  Simultaneous Policies chip, no coloured status pill) — it represents the
  **generic / undynamic version of the screen**, i.e. what you'd see before
  any plan-code-specific behaviour is layered on.

```
   Find Policy row for "0":
   POLICY_REF | PLANTYPE | PLAN_CODE | SURNAME | NAT_INS_NO | ... | COCODE
     dbePolNo |  master  |     0     | Master  |    (blank) | ... | (blank)
```

---

## 1. Application Shell (always visible)

Every screen renders inside the same root component tree: a fixed
`app-header` at the top, the main content area
(`app-toolbar` → `app-policy-header` → `app-tab-bar` → active tab panel →
`app-status-bar`), and an `app-footer` pinned to the bottom.

```
+---------------------------------------------------------------------------------------------------+
| [LV=]|Client Annuity Administration System                    [Options][Process][Print][Supervisor]|
|                                                                [Help]              [Logout]         |
+---------------------------------------------------------------------------------------------------+
|  [+New App][+New Quote][⧉Sim App][✎Edit][⊘Cancel][🔍Search][🕐Log][🗄CRS][📊Reports][🏢Company]      |
|                                                                                                     |
|  [v Policy No] [↗]  [ Liverpool Victoria Friendly Society Limited ]  [ 227813 ]  [ 90 ] [ SURNAME ] |
|  [ Simultaneous Policies ] [ ⋯ ]                                       [ MONTHLY CASH POLICY ]      |
|                                                                                                     |
|  ┌──────────┬─────────────┬──────────┬────────┬─────────┬────────┬────────┬────────┬──────┬─────┐ |
|  │Application│Annuitant(s)│ Contacts │ Policy │  Bank   │Payments│Increase│ Quote  │Diary │ ... │◄tabs│
|  └──────────┴─────────────┴──────────┴────────┴─────────┴────────┴────────┴────────┴──────┴─────┘ |
|  +-----------------------------------------------------------------------------------------------+ |
|  |                                                                                                 | |
|  |                          <<< <router-outlet>/ACTIVE TAB CONTENT >>>                             | |
|  |                                                                                                 | |
|  +-----------------------------------------------------------------------------------------------+ |
|  [ Status: LIVE ]  [ SIPP Pol: 608513 ]  [ Variant: — ]  [ RAQ ID: — ]  [ User: UAT3 ]              |
|                                                                                                     |
+---------------------------------------------------------------------------------------------------+
| [LV=]                                  Liverpool Victoria Friendly Society Limited, County Gates,  |
|                                         Bournemouth BH1 2NF. Authorised by the PRA, regulated       |
|                                         by the FCA and PRA.                                         |
+---------------------------------------------------------------------------------------------------+
```

### 1A. Header (`app-header`)

| Element | Detail |
|---|---|
| **LV= logo** | Navy header variant, `app-logo` component (`variant="light"`). |
| **Page title** | Livvic 30px white — "Client Annuity Administration System" (static `@Input()`). |
| **Options / Process / Print / Supervisor / Help** | 5x `app-menu-trigger` buttons — click toggles a `cdk-overlay` dropdown panel (§2). Menu **contents change per plan code** (§2A), each fed by a `MENU_ITEMS` config array injected per variant. |
| **Logout** | Ghost `app-button` (variant="ghost"), white text. |

Header background: navy `#00263e`, `py-5 px-[142px]`.

### 1B. Footer (`app-footer`)

| Element | Detail |
|---|---|
| **LV= logo** | Dark/default `app-logo` variant. |
| **Address block** | "Liverpool Victoria Friendly Society Limited, County Gates, Bournemouth BH1 2NF." / "Authorised by the Prudential Regulation Authority and regulated by the FCA and PRA." (10px, right-aligned, `#94a3b8`). |

Footer background: white, top border `border-slate-200`, `mt-auto` so it
stays pinned to the bottom of the flex column regardless of content height.

---

## 2. Header Menus (dropdowns)

Each top-level label opens a `cdk-overlay`-positioned dropdown panel below
it. Items with a `▶` open a nested flyout submenu on hover. Disabled items
are greyed and non-interactive (`[disabled]="true"`).

```
[ Options ▾ ]                    [ Process ▾ ]                      [ Print ▾ ]
+---------------------------+    +--------------------------------+  +---------------------------+
| Screen Print         F1   |    | Payment Forecast                |  | Print MAR              ▶  |
| Check Completion           |    | N.I Sweep                       |  | Auto Set Live Report      |
| Amend IFA                  |    | P45 details                 ▶  |  | Diary Report              |
| Search                F5   |    | Monthly                      ▶  |  +---------------------------+
+---------------------------+    | Ceding Scheme Details            |
                                  | ---------------------------------|
                                  | Cancel LTC          (disabled)   |
                                  +--------------------------------+

[ Supervisor ▾ ]                                        [ Help ▾ ]
+----------------------------------------------+        +----------------------+
| Final Quote Issued                            |        | About                |
| Status Change                             ▶   |        | Keyboard Shortcuts   |
| Amend Cheques                                 |        +----------------------+
| Amend IFA                                     |
| Approve Bank Changes                          |
| Approve Maturity Bank Detail Changes          |
| Set Live                                      |
| Force Set Live                                |
| Set Status To Hold                            |
| Set Status To Pending                         |
| Reprint Annual Statements                     |
| Annual Statement Recalculation                |
| Reprint Maturity Letters                      |
| Tracesmart error - make policy editable       |
+------------------------------------------------+
```

Submenu flyouts (hover `▶` → opens to the right):

```
Status Change ▶            P45 details ▶       Monthly ▶            Print MAR ▶
+----------------+         +---------------+   +---------------------+  +----------------+
| NTU            |         | P45 Details   |   | Monthly Processing  |  | 1st Life MAR   |
| Backdate       |         +---------------+   +---------------------+  | 2nd Life MAR   |
| Cancel         |                                                       +----------------+
| XDuplicate     |
| Surrender      |
| Maturity       |
+----------------+
```

### 2A. Menu content varies by plan code

| Plan code(s) | Menus shown | Notes |
|---|---|---|
| `51`, `62a`, `611`, `61a`, `52` | **Options, Print, Help only** (Process/Supervisor `*ngIf`'d out) | `Options` reduced to Screen Print (F1) + Search (F5); `Print` reduced to Print MAR ▶ + Diary Report. |
| `87` | All 5 menus | `Supervisor` swaps to `SUPERVISOR_87` config (adds Final Quote Issued / Set Live / Force Set Live emphasis); `Process` overrides both "P45 details" and "Ceding Scheme Details" to wire real click handlers (`onP45Details()`, `onCedingScheme()`). |
| `80`, `82`, `83` | All 5 menus | `Options`→`OPTIONS_84`; `Process`→plan-specific set (adds "Set Dead" ▶ Life One/Life Two, "Payments" ▶ Suspend, "PLA Cancellation"); `Print`→`PRINT_82`/`PRINT_83`; `Supervisor`→plan-specific set. |
| `84`, `90` | All 5 menus | `Supervisor` → `SUPERVISOR_84` (`84`) or `SUPERVISOR_90` (`90`, adds "Expired" and "C(ancel) Application"). |
| `621` | All 5 menus | Options→`OPTIONS_84`, Process→`PROCESS_83` set, Print→`PRINT_84`, Supervisor→`SUPERVISOR_83`. |
| `76` | All 5 menus | Process→`PROCESS_76`, Supervisor→`SUPERVISOR_84`. |
| `76z` | All 5 menus | Process→`PROCESS_76z`, Print→`PRINT_82`, Supervisor→`SUPERVISOR_83`. |
| `0` | All 5 menus (base `MENU_ITEMS`) | Default/unmodified menu — several items (e.g. base "Ceding Scheme Details", "Payment Forecast", "N.I Sweep") have **no click handler wired**, so they render but do nothing when clicked — another facet of plan `0` being the non-dynamic baseline. |

### 2B. Modals opened directly from Header menu items

Each is opened via `DialogService.open(XxxModalComponent)` (the Angular
CDK-Dialog / Material Dialog equivalent of this build's modal components).
Full ASCII layout for every one is in **§8 — Global Modal Reference**.

| Modal component | Opened via |
|---|---|
| `TaxCertificateModal` | Print menu family |
| `AboutModal` | Help → About |
| `KeyboardShortcutsModal` | Help → Keyboard Shortcuts |
| `AmendChequesModal` | Supervisor → Amend Cheques |
| `CompletionCheckerModal` | Options → Check Completion |
| `ScreenPrintModal` | Options → Screen Print (F1) |
| `AmendIfaModal` | Options/Supervisor → Amend IFA |
| `P45DetailsModal` | Process → P45 details ▶ P45 Details |
| `SetDeadModal` | Process → Set Dead ▶ Life One/Life Two |
| `CedingSchemeModal` | Process → Ceding Scheme Details |
| `CopyP60Modal` | Print family |
| `SupervisoryEditModal` | Supervisor menu |
| `BankChangesReportModal` | Process → Bank Detail Changes ▶ Bank Changes Awaiting Approval |
| `ReprintMaturityModal` | Print/Supervisor → Reprint Maturity Letters |
| `RecalcAnnStatModal` | Supervisor → Annual Statement Recalculation |
| `ReprintAnnualStatementsModal` | Supervisor/Print → Reprint Annual Statements |
| `PullQuoteModal` | Process → Pull Quote |
| `LocateFieldValueModal` | Data-grid "Locate" action (grids inside several tabs) |

### 2C. Inline confirm/info dialogs (rendered directly by `app-header`)

```
+------------------------------------------+   +------------------------------------------+
| Information                        [ ✕ ] |   | Confirm                             [ ✕ ] |
|------------------------------------------|   |------------------------------------------|
|  (i)  You must reverse cheques first ?    |   |  (?) Are you sure you want to set the     |
|                                           |   |      policy to Expired?                    |
|            [ ✓ OK ]                       |   |     [ Yes ] [ No ] [ Cancel ]              |
+------------------------------------------+   +------------------------------------------+
   cancelAppOpen$ — Supervisor "C(ancel) Application"   expiredConfirmOpen$ — Supervisor "Expired" (plan 90)

+------------------------------------------+   +------------------------------------------+
| Client Annuity Administration System [✕] |   | Client Annuity Administration System [✕] |
|------------------------------------------|   |------------------------------------------|
|  This records payments are already        |   |  This policy is not a PLA!                |
|  suspended!                               |   |                                            |
|            [ ✓ OK ]                       |   |            [ ✓ OK ]                       |
+------------------------------------------+   +------------------------------------------+
   suspendOpen$ — Process "Payments ▶ Suspend"          plaCancellationOpen$ — Process "PLA Cancellation"

+------------------------------------------+
| Client Annuity Administration System [✕] |
|------------------------------------------|
|  There is no second life for this record! |
|            [ ✓ OK ]                       |
+------------------------------------------+
   noSecondLifeOpen$ — Process "Set Dead ▶ Life Two" (when no 2nd life on the policy)
```

All 5 use the same shape: navy panel header with a close (✕) button,
centered blue info-circle or red-tinted icon, body message, single/triple
button row — the equivalent of a shared `app-alert-dialog` /
`app-confirm-dialog` reusable component parameterised by `@Input() message`.

---

## 3. Toolbar (`app-toolbar`, below the Header, above the Policy Header)

```
[ + New App ] [ 🗒 New Quote ] [ ⧉ Sim App ] [ ✎ Edit ] [ ⊘ Cancel ] [ 🔍 Search ] [ 🕐 Log ] [ 🗄 CRS ] [ 📊 Reports ] [ 🏢 Company ]
```

| Button | Enabled when | Click handler |
|---|---|---|
| **New App** | not editing | Opens `app-confirm-dialog` "Create a new Application?" → `QuoteLookupModal` |
| **New Quote** | `isPlan87` only | (always disabled in this build — placeholder) |
| **Sim App** | not editing, not plans `51`/`76`/`84` | Opens `app-confirm-dialog` "Are you sure you wish to generate simultaneous policy?" → `QuoteLookupModal` |
| **Edit / Save** | not plans `76` or `84` | Toggles the app-wide `EditModeService.editing$` signal; label + icon swap Edit↔Save |
| **Cancel** | editing, not plan `51` | `EditModeService.cancel()` reverts unsaved edits |
| **Search** | not editing | Opens `FindPolicyModal` (§4) |
| **Log** | not editing | Opens `ChequeLoggerModal` |
| **CRS** | not editing | Opens `CrsModal` |
| **Reports** | not editing | Opens `ReportsModal` |
| **Company** | not editing | Opens `CompanySelectionModal` |

Toolbar button set is further trimmed per plan:
- `51`/`62a`/`611`/`52` → **remove** Edit and Log from the toolbar entirely.
- `84` → **remove** Log; Edit remains rendered but is **disabled** (grayed out); Sim App also disabled.
- `90`/`621` → remove Log only.

### 3B. New Quote

**New Quote** (`isPlan87` only) is a toolbar button that is enabled only when plan `87` is
loaded. In the current build its click handler is intentionally a no-op (`/* always disabled */`);
the button is visually available to convey that the action exists for FTA policies but
the full quote-creation workflow is not wired in this static recreation. In a real Angular
implementation it would open a `PullQuoteModal` / quote-entry flow directly (without a
prior Confirm dialog, unlike New App → QuoteLookupModal which shows a confirm first).

### 3A. Toolbar-launched modal ASCII

```
+-------------------------------------------+   +-------------------------------------------+
| Confirm                               [✕] |   | Confirm                               [✕] |
|---------------------------------------------|  |---------------------------------------------|
| Create a new Application?                   |  | Are you sure you wish to generate           |
|                                              |  | simultaneous policy?                        |
|          [ Yes ]     [ No ]                 |  |          [ Yes ]     [ No ]                 |
+-------------------------------------------+   +-------------------------------------------+
      "New App" ConfirmDialog                        "Sim App" ConfirmDialog
```

Full ASCII for `QuoteLookupModal`, `PullQuoteModal`, `CompanySelectionModal`,
`ReportsModal`, `CrsModal`, and `ChequeLoggerModal` is in **§8**.

---

## 4. Find Policy Modal (the plan-code switcher)

This is how a user changes which of the 15 versions is loaded — it is the
practical "search screen" of the app.

```
+---------------------------------------------------------------------------------------------------+
| Find Policy                                                                                  [ ✕ ] |
|-------------------------------------------------------------------------------------------------- |
|  ( ) Pending   ( ) Completed   ( ) Shelved   (*) ALL                                                |
|-------------------------------------------------------------------------------------------------- |
| POLICY_REF | PLANTYPE | PLAN_CODE | SURNAME_1_UPPER | NAT_INS_NO_1 | ORIGINALQUOTE | STATUS | ... |
|-------------------------------------------------------------------------------------------------- |
|    dbePolNo|  master  |     0     |     Master      |              |               |        | ... |  <- Plan 0 row: only 4 cols populated
|      233451|   FTA    |    87     |      UGGIU      | JK-90-90-90-C|    20825226   |   P    | ... |
|      111834|   PRP    |    84     |  TESTPTBBBIDE   | PK-25-10-58-A|     2139419   |   D    | ... |
|      227813|   MCP    |    90     |  TESTCTCCHIBD   | CH-10-05-59-A|    25027464   |   L    | ... |
|         ... 15 rows total (one per plan code) ...                                                  |
|-------------------------------------------------------------------------------------------------- |
|                                          [ ✓ OK ]   [ ✕ Cancel ]                                    |
+---------------------------------------------------------------------------------------------------+
```

- 12 columns: `POLICY_REF, PLANTYPE, PLAN_CODE, SURNAME_1_UPPER, NAT_INS_NO_1,
  ORIGINALQUOTE, STATUS, PH_POST_CODE, IFA_REF, DOB_1, POLICY_NO, COCODE`.
- Status radios filter rows: **Pending** = status `P`; **Completed** = `L`;
  **Shelved** = `N`/`X`; **ALL** = no filter.
- Selecting a row and clicking **OK** (or double-clicking the row) invokes
  `PlanCodeService.select(planCode, surname, policyRef)` — this single
  service call is what drives every dynamic-rendering difference described in
  this document.
- The **plan `0`** row is visually distinct: most cells are blank because a
  `PLAN0_VISIBLE` allow-list only surfaces `policyRef`, `planType`,
  `planCode`, `surname` for that row.

A second, simpler search surface exists as `FindPolicyModal`'s field-based
variant (surfaced from certain grid "Locate" actions) — see **§8**.

---

## 5. Policy Header (`app-policy-header`, below Toolbar)

A single info bar showing the currently loaded policy, always visible above
the tab bar.

```
[ v Policy No ] [ ↗ ]  [ Liverpool Victoria Friendly Society Limited ]  [ 227813 ]  [ 90 ]  [ TESTCTCCHIBD ]  [ Simultaneous Policies ]  [ ⋯ ]  [ MONTHLY CASH POLICY ]
```

| Element | Detail |
|---|---|
| **Policy No selector** | Dropdown-styled button (chevron icon), title "Policy No". |
| **Find application (↗)** | Icon-only button, external-link style icon. |
| **Company name pill** | Blue pill "Liverpool Victoria Friendly Society Limited" — shown for **every named plan code (87…61a)**; for plan `0` it collapses to an **empty blue placeholder block** (no text) — again reflecting the non-dynamic baseline. |
| **CLANAD Number** | Light-blue pill showing `policyRef$` (e.g. `227813`). |
| **Plan Code pill** | Coloured pill (CSS custom properties `--lve-accent` / `--lve-accent-fg`, one accent colour per plan — see §5A) showing the plan code (`76z` displays as `76`). |
| **Surname pill** | Same accent colour, shows `surname$` (truncated). |
| **"Simultaneous Policies" pill** | Shown only for plans `84, 51, 80, 83, 62a, 611, 61a`; otherwise an empty placeholder block. |
| **More (⋯)** | Opens the **Simultaneous Policies** dialog (§5B). |
| **Policy-type badge** | `90` → pink "MONTHLY CASH POLICY"; `83` → cyan "RETIREMENT ACCOUNT"; all other plans → empty placeholder block. |

### 5A. Plan-code accent colours

| Plan(s) | Accent bg | Accent text |
|---|---|---|
| `0` | `#848285` (grey) | white |
| `87` | `#F28C28` (orange) | white |
| `84`, `80`, `82`, `83` | `#BEE4BE` (pale green) | `#023E02` |
| `90` | `#F4D9E8` (pale pink) | `#710340` |
| `51`, `621`, `76`, `76z`, `62a`, `611`, `52`, `61a` | `#000080` (navy) | white |

### 5B. Simultaneous Policies dialog

```
+----------------------------------------------+
| Simultaneous Policies                         |
|------------------------------------------------|
| | Policy No  | Status | Product Type |        |
| |------------|--------|--------------|        |
| |   233424   |   P    |     FTA      |  <-default row (or 116444/S/PRP for plan 82)
| |            |        |              |  ...9 blank filler rows...
|------------------------------------------------|
|            [ ✓ Open ]   [ ✕ Cancel ]           |
+------------------------------------------------+
```

- "Open" is disabled until a row is selected.
- Row data source: `SIM_ROWS_82` for plan `82`, `SIM_ROWS_DEFAULT` for every
  other plan (this dialog is reachable regardless of plan code via the ⋯
  button, even for plans that don't show the "Simultaneous Policies" pill).

---

## 6. Tab Bar (`app-tab-bar`)

```
┌──────────────┬───────────────┬──────────┬────────┬───────────────┬────────┬────────┬────────┬────────┬──────────────────┬───────┬─────────┬────────┬────────────────────┬─────────┐
│ Application  │ Annuitant(s)  │ Contacts │Contacts│ Policy Details│ Bank   │Payments│Increase│ Quote  │ Diary & Audit Trail│ Notes │ Letters │ Events │Maturities/Surrender│ LOA/POA │
│  Details     │  Details      │          │  (2nd) │               │  Acc   │        │History │Details │                    │       │         │        │                     │         │
└──────────────┴───────────────┴──────────┴────────┴───────────────┴────────┴────────┴────────┴────────┴──────────────────┴───────┴─────────┴────────┴────────────────────┴─────────┘
       ▲ active tab underlined/highlighted (`.active` class), scrollable horizontally, arrow-key navigable (`role="tablist"`, ARIA tab pattern)
```

The app defines **15 tabs** (there are two "Contacts" entries in code —
`contacts` and `contacts2` — both labelled "Contacts", the second is a
secondary/duplicate contacts screen). Visible count varies by plan:

| Plan code(s) | Tabs shown |
|---|---|
| `0` (default/master), `621` — and any code not listed below | All 15 tabs |
| `611`, `61a`, `87`, `84`, `90`, `51`, `80`, `82`, `62a`, `52` | 13 tabs — both `Contacts` tabs hidden |
| `83`, `76`, `76z` | 14 tabs — only the 2nd `Contacts` tab (`contacts2`) hidden |

Full tab list (in order): **Application Details · Annuitant(s) Details ·
Contacts · Contacts (2nd) · Policy Details · Bank Acc Details · Payments ·
Increase History · Quote Details · Diary & Audit Trail · Notes · Letters ·
Events · Maturities / Surrender · LOA/POA.**

In an Angular rebuild each tab panel would be an independent, on-demand
rendered child component (`app-tab-application`, `app-tab-annuitant`, …)
swapped via `[ngSwitch]` on the active tab key, matching the "one active
panel mounted at a time" behaviour of the current build.

---

## 7. Tab Panels — full wireframes & dynamic rendering per plan

Each tab is a white rounded panel below the tab bar, rendered by its own
Angular component (selector listed in the heading). All fields/labels below
are the **current, verified** implementation.

### 7.1 Application Details — `app-tab-application`

```
+-----------------------------------------------------------------------------------------------------------+
| Set Up Date       [ 📅 ]  | Special Status     [v]     | GAD Anniversary  [D][M][Y]  | Quote Expiry Date [📅]|
| Received/MCP Start[ 📅 ]  | Final Quote Issued [ 📅 ]  | Life One Dead    [x]        | Last amended by    [ ]|
| Start/Payment Date[ 📅 ]  | Status              [v]    | Life Two Dead    [x]        | App Created by     [ ]|
| WPPA amend notif. From/To | Suspended           [x]    | Completed        [x]        | Final Quote Iss'd by[]|
| Accept Date       [ 📅 ]  | Days Since App'n    [ ]    | Closed           [x]        | Rates Ok'd by      [ ]|
| IFA Payment Date  [ 📅 ]  | Commuted Value      [ ]    | Age at death     [ ]        | Paykey             [ ]|
| PostADay          [x]     | LTA Details         [x]    | Gross £          [ ]        | Policy No          [ ]|
| Transfer from Ben. DD? [x]| Hosp'd Date         [ 📅 ] | Paid net [x] [ ] Date Paid  | Dependant Eligible [x]|
|                            |                            | Payee [ ]  Trustee [x]      |                        |
|                            |                            | [ Create payment... ]       |                        |
|---------------------------------------------------------------------------------------------------------- |
| Correspondence Details                                                                                     |
| Correspond Name [                ]  Salutation Name [        ]  Telephone [        ]  E-mail [           ]|
|---------------------------------------------------------------------------------------------------------- |
| Correspondence Address                                                                                     |
| Address line 1..5 [                                     ]     Postcode [      ]  Country [      ]         |
| Address Unknown / Gone Away [ ]                                                                             |
+-----------------------------------------------------------------------------------------------------------+
```
- Received label becomes **"MCP Start Date"** on plan `90`.
- Days Since Application hidden on `76`/`76z`.
- Commuted Value / LTA fields shown only for plan `621`.
- `isCompact` mode (`87`, `84`, `90`) hides blank/placeholder fields and drops
  the 4th column entirely for `87`.
- **Plan `84` death-state values:** Status = `D`, Suspended = `Y`, Life One Dead = `Y`,
  Closed = `16/06/2026 1`, Age at death = `62`, Gross £ = `6222.8`; the death
  payment block (Paid net / Date Paid / Payee / Trustee / Create payment) is
  shown; Dependant Eligible = `N`.
- No sub-modals; date-pickers only.

### 7.2 Annuitant(s) Details — `app-tab-annuitant`

```
+-----------------------------------------------------------------------------------------------------------+
| Annuitant                                                                                                   |
|  Surname     [        ]   DOB     [ 📅 ]           ELE                [   ]                                |
|  Forename    [        ]   DOD     [ 📅 ]           MRSD               [   ]                                |
|  2nd Name    [        ]   Death Cert Received? [x] MAR required?      [x]                                  |
|  Short Name  [        ]   Enhanced?           [x]  MAR Copy to PH?    [x]                                  |
|  Cause of Death:          Doctor [        ] [🩺]   Date MAR Sent      [ 📅 ]                                |
|   ICD#1 [    ]            Doctor Name [        ]   Date MAR Received  [ 📅 ]                                |
|   ICD#2 [    ]            Nat ins no [       ][⊘]  U/W Ref            [   ]                                |
|   ICD#3 [    ]            Gender [v]               U/W Date           [ 📅 ]                                |
|                                                     Days Since U/W     [   ]                                |
|---------------------------------------------------------------------------------------------------------- |
| Dependant / Second Annuitant / Beneficiary            (same 3-column layout, minus Short Name & U/W fields) |
+-----------------------------------------------------------------------------------------------------------+
```
- Cause of Death block **hidden** for plans `87, 90, 80, 83, 82, 52`; **visible** for plan `84` (policy holder is deceased — ICD fields and Doctor lookup shown).
- Plan `84` DOD populated: `03/03/2021`; DOD field enabled.
- Plan `76z`: relabels fields "ELE"/"MRSD", disables several MAR/Doctor
  fields.
- Plan `51`: clicking the NI delete (⊘) icon surfaces a "migrated" error via
  `WinErrorDialog`.
- Sub-modals: `DoctorDatabaseModal` (🩺 button), `ConfirmDialog` (NI
  deletion confirm), `WinErrorDialog`.

### 7.3 Contacts — `app-tab-contacts`

```
+---------------------------------------------+---------------------------------------------+
| Annuitant                                     | Power of Attorney                            |
|  Corres Name  [           ]                   |  Corres Name  [           ]                  |
|  Salutation   [        ]                      |  Salutation   [        ]  Co. Name [        ]|
|  Address (5 lines) [               ] [⊘ Clear]|  Address (5 lines) [               ] [⊘ Clear]|
|  Postcode [      ]  Tel. [          ]         |  Postcode [      ]  Tel. [          ]         |
|                                                |  Relationship [      ]  POA Received? [x]    |
+---------------------------------------------+---------------------------------------------+
| Care Provider                                  | Applicant                                     |
|  Corres Name  [           ]                    |  Corres Name  [           ]                   |
|  Salutation   [        ]  Prov. Name [       ] |  Salutation   [        ]  Co. Name [        ] |
|  Address (5 lines) [               ] [⊘ Clear] |  Address (5 lines) [               ] [⊘ Clear]|
|  Postcode [      ]  Tel. [          ]          |  Postcode [      ]  Tel. [          ]         |
|  Provider ID [      ]  Contract Received? [x]  |  Relationship [      ]                        |
+---------------------------------------------+---------------------------------------------+
```
- 2-column grid, 4 panels total. No sub-modals.
- Tab hidden entirely for plans `611, 61a, 87, 84, 90, 51, 80, 82, 62a, 52`
  (§6).

### 7.4 Contacts (2nd) — `app-tab-contacts2`

```
+---------------------------------------------+---------------------------------------------+
| Scheme Details                                | Annuitant                                    |
|  Corres Name  [           ]                   |  Corres Name  [           ]                  |
|  Salutation Name [        ]  Wrapper Name [  ]|  Salutation   [        ]                      |
|  Address (5 lines) [               ] [⊘ Clear]|  Address (5 lines) [               ] [⊘ Clear]|
|  Postcode [      ]  Tel. [          ]         |  Postcode [      ]  Tel. [          ]         |
|  Wrapper Policy No [        ]                 |                                                |
+---------------------------------------------+---------------------------------------------+
| Sales Office/IFA Details                                                                      |
|  Corres Name  [           ]   Salutation [        ]   Name [        ]                          |
|  Address (5 lines) [               ] [⊘ Clear]        Postcode [      ]  Tel. [          ]     |
+------------------------------------------------------------------------------------------------+
```
- 2-column grid, 3 panels total. No sub-modals.
- Additionally hidden (beyond §7.3's list) for plans `83, 76, 76z`.

### 7.5 Policy Details — `app-tab-policy`

```
+------------------------------+---------------------------------+---------------------------------+
| Policy Details                | Non Standard Policy              | Statements & Letters             |
|  Online Application     [x]  |  Non Std Flag           [x]      |  Issue Statements          [x]   |
|  Tax Code    [    ] Tax Free [x]  Non Standard Policy [        ]|  Copy Ann. Stmt to IFA     [x]   |
|  Initial payment method [v]  |----------------------------------|  Copy Ann. Stmt to PH      [x]   |
|  Pay TFC by          [v]     | IFA Contact Details               |  Issue wake-up/maturity ltrs[x]  |
|  IR Max Pension      [   ]   |  Name     [           ]           |----------------------------------|
|  IR Balance          [   ]   |  Building [        ]              | Certificate of Existence Details |
|  ReAssurance Premium [   ]   |  Street   [        ]              |  CoE No           [       ]      |
|  ReAssurer           [   ]   |  City     [        ]              |  CoE Received Date[ 📅 ]         |
|  Evidence of Age     [v]     |  District [        ]              |  CoE Due Date     [ 📅 ]         |
|  Advice Type         [v]     |  County   [        ]              |  CoE Due Sent     [ 📅 ]         |
|  Distribution Channel[v]     |  Post Code[      ]                |  Follow Up 1 Date [ 📅 ]         |
|  Money Laundering Form[v]    |  FAO      [        ]              |  Follow Up 1 Sent [ 📅 ]         |
|  Advised Sale Info   [v]     |  Email    [        ]              |  Follow Up 2 Date [ 📅 ]         |
|  Internal Maturity Transf.[x]|  Tel      [        ]              |  Follow Up 2 Sent [ 📅 ]         |
|  Scheme Pension      [   ]   |------------------------------------|--------------------------------|
|  Purchaser           [   ]   |                                    | P45 Details                     |
|  Policy Owner        [   ]   |                                    |  P45 date rec'd   [ 📅 ]        |
|                               |                                    |  P45 Tax Paid     [   ]         |
|                               |                                    |  P45 Gross Pay    [   ]         |
|                               |                                    |----------------------------------|
|                               |                                    | Adviser Charge [x]  Serious ill health [📅]|
|                               |                                    | IFA Ref [   ]  Comm.%/AC%  [   ]         |
|                               |                                    | Commission/AC [   ]  Key Account [   ]   |
|                               |                                    | Region [   ]                              |
|                               |                                    |----------------------------------|
|                               |                                    | MPAA                              |
|                               |                                    |  MPAA Rules Triggered? [x]        |
|                               |                                    |  Date MPAA Letter Issued [ 📅 ]   |
+------------------------------+---------------------------------+---------------------------------+
```
- Plan `87` → "Online Application" ticked; plan `90` → "Tax Free" ticked;
  plan `611` hides the "Non Standard Policy" section; plans `84/90/51` force
  initial payment method to `B`.
- **Plan `84` disabled fields** (read-only because policy is deceased): Purchaser,
  Policy Owner, Initial payment method, Pay Tax Free Cash by, Advice Type, Issue
  Statements, Copy Annual Statement to IFA, Copy Annual Statement to PH, Issue
  wake-up/maturity letters. Deceased Date and Notification Date pickers are
  **enabled** (editable) to allow recording the date-of-death notification.
- No sub-modals (all inline fields).

### 7.6 Bank Acc Details — `app-tab-bank`

```
+-----------------------------------------------------------------------------------------------------------+
| Bank Details                                                                    [ ✎ Edit Bank Details ]    |
|  Bank sort code [      ] [⊘ Delete]     Payment Ref            [        ]                                  |
|  Bank account no[      ]                Payment Method         [v]                                         |
|  Bank account name[     ]               Change Effective Date  [ 📅 ]                                       |
|  Bank name       [      ]               TOTAL                  [        ]                                  |
|---------------------------------------------------------------------------------------------------------- |
| Transfer History                                                                                            |
| | Transfer Company                | Date        | Amount        |                                          |
| |----------------------------------|-------------|---------------|                                         |
| | ... rows vary per plan ...        |             |               |                                         |
+-----------------------------------------------------------------------------------------------------------+
```
- Delete-sort-code (⊘) button **hidden for plans `621` and `51`**.
- Fields force-disabled for plans `84`, `90`, `621`.
- "Edit Bank Details" header button hidden for plans `87`, `51`.
- Plan `621` adds a disabled "Change Effective Date" value `17/06/2026`.
- Sub-modals: `EditBankDetailsModal` (§8), `ConfirmDialog` (delete sort code
  confirmation, §8).

### 7.7 Payments — `app-tab-payments`

```
+-----------------------------------------------------------------------------------------------------------+
| Payment Summary                                                                       [ 📤 Import ]         |
|  Premium [   ] TFC [   ] Total [   ] 1st Ann. Gross [   ] 2nd Ann. Gross [   ] Cumulative Instal [   ]      |
|  BAL Gross Annuity [   ] BAL Capital Element [   ] Taxable pay [   ] Cumulative Free Pay [   ]              |
|  PAYE Tax Due To Date [   ] PAYE Tax Deduction [   ] Next Anniversary [ 📅 ] Next Payment Due [ 📅 ]         |
|  Inst Remaining [   ]  Nth Inst. [   ]                                                                       |
|---------------------------------------------------------------------------------------------------------- |
| Payment History                                                                                              |
| | Date | Gross £ | Cap £ | Tax £ | Post Adj £ | Net £ | Method | Reason | BACS date | Hash |                 |
|---------------------------------------------------------------------------------------------------------- |
| Tax History                                                                                                   |
| | Date | Code | N | Gross £ | Cum Gross £ | Free Pay | Taxable Pay | Tax | YTD Tax |                          |
+-----------------------------------------------------------------------------------------------------------+
```
- Grid row sets swapped entirely per plan (`PAYMENT_HISTORY_84` vs
  `PAYMENT_HISTORY_DEFAULT`, etc).
- Plan `0` shows a more detailed/generic grid layout (undecorated baseline
  per §0B). No sub-modals.

### 7.8 Increase History — `app-tab-increase`

```
+-----------------------------------------------------------------------------------------------------------+
| Increase History                                                                                            |
| | Type | Status | Statement Issue Date | Policy Anniv. Date | Prev Annuity Amt | New Annuity Amt |          |
| | Escalation Type | Esc Rate | New Basic Annual Income | Reg. Annual Bonus Rate | Topup Bonus Rate |         |
| | Reg Bonus Dec Date | Topup Bonus Amt | Topup Bonus Dec Date | Guar Charge | Fund Mngmnt Charge |            |
| | Next GAD review date | GAD Maximum | Withheld Income | Income Restricted | Mutual Bonus Added |             |
| | New Guarantee Min Income | New Yearly Income Before Guarantee | Declared Investment Return |               |
|---------------------------------------------------------------------------------------------------------- |
| (Plan 0 only) New GAD Max [   ]  Income Restricted [   ]        New Annuity Amount [   ]                    |
|               Withheld Income [   ]  Previous Annuity Amount [   ]                                          |
+-----------------------------------------------------------------------------------------------------------+
```
- Rows swapped per plan (`ROWS_84`, `ROWS_83`, …). Plan `0` adds the extra
  bottom fields shown above. No sub-modals.

### 7.9 Quote Details — `app-tab-quote`

```
+-----------------------------------------------------------------------------------------------------------+
| Basis Details                                                                                                |
|  Life Type [v] Plan Type [v] Overlap [   ] Payments [   ] Frequency [v] DMT [   ] ELE [   ]                 |
|  Capital Protection? [x] Original Amnt Vested [   ] Withheld Minimal Income [x] Series [   ] Policy Type [v]|
|  Last Survivor? [x] Escalation Rate [   ] Escalation Type [v] Max Tax Free Cash [x] Value Protection [x]    |
|  Policy Term (months) [   ] Last Payment Date [ 📅 ] Maturity Date [ 📅 ] Guaranteed Maturity [x]            |
|  Original GAD Limit Upper [   ] Original GAD Limit [   ] Original GAD Review Date [ 📅 ]                    |
|  GAD Review Maximum [   ] GAD Review Date [ 📅 ] Notional Value [   ] Value Date [ 📅 ]                      |
|  Total Withheld Minimal Income [   ] Total Mutual Bonus [   ]                    [ View Notional Value ]    |
|---------------------------------------------------------------------------------------------------------- |
| LTA Details                                                                                                   |
|  LTA% Crystallised [   ] Scheme Name [   ] NHMRC Scheme Pension No [   ] Standard Lifetime Allowance [   ]  |
|  First BCE [x] LTA Protection type [v] Enhancement [   ] HMRC Certificate Number [   ]                       |
|  % Crystallised Post 5 Apr 2024 [   ] Cumulative LTA% [   ] LTA Excess Tax [   ] Net LTA Excess Lumpsum [ ] |
|  Pensions In Payment LTA% [   ] LSA Amount [   ] PCLS Protection [   ] Enhancement [   ]                     |
|---------------------------------------------------------------------------------------------------------- |
| | Type | Premium | TFC Amount | Original Income | Esc Type | Esc Rate% | Current Income | Spouse % | ... | |
+-----------------------------------------------------------------------------------------------------------+
```
- Plan `0` shows the fullest/most detailed Basis+LTA forms (baseline view).
- `showGad` (plans `82`, `80`) reveals GAD limit/review fields.
- Sub-modal: `ViewNotionalValueModal` (§8).

### 7.10 Diary & Audit Trail — `app-tab-diary`

```
+-----------------------------------------------------------------------------------------------------------+
| Diary                                    [🗒Insert][✎Edit][✓Complete][🔍Check Ceding][👥View Cust. Needs]   |
| | Ref | Type | Notes | Created | By | Due | Completed | By |                                                |
|---------------------------------------------------------------------------------------------------------- |
| Data Changes                                                                                                  |
| | Change Date | Description | User ID |                                                                       |
|---------------------------------------------------------------------------------------------------------- |
| Audit                                                                                                          |
|  (plain text list of audit notes, one line per entry)                                                         |
+-----------------------------------------------------------------------------------------------------------+
```
- Grid data filtered per plan (`PLAN_84_DIARY`, `AUDIT_621`, etc). Plan `621`
  has its own 8-entry audit trail matching the reference screenshots.
- Sub-modals: `MiscDiaryModal`, `CustomerNeedsModal`, `CedingSchemeModal`
  (§8).

### 7.11 Notes — `app-tab-notes`

```
+-----------------------------------------------------------------------------------------------------------+
| Notes                       [+Insert] [-Delete] [✎Edit] [✓Post Edit] [✕Cancel Edit]                        |
|---------------------------------------------------------------------------------------------------------- |
|  ┌─────────────────────────────────────────────────────────────────────────────────┐                      |
|  │ AB  Alan Baker            12/06/2026   Note #14                                   │                      |
|  │  (prefix text, non-editable) Lorem ipsum note body ... [editable textarea if active]│                    |
|  └─────────────────────────────────────────────────────────────────────────────────┘                      |
|  ┌─────────────────────────────────────────────────────────────────────────────────┐                      |
|  │ ...additional note cards, newest first...                                          │                      |
|  └─────────────────────────────────────────────────────────────────────────────────┘                      |
+-----------------------------------------------------------------------------------------------------------+
```
- Plan `51`: all modification disabled. Plan `52`: Edit/Delete disabled.
- Sub-modal: `ConfirmDeleteDialog` (internal, §8).

```
+-------------------------------------------+
| Client Annuity Administration System  [✕] |
|---------------------------------------------|
| Delete record?                              |
|          [ OK ]      [ Cancel ]             |
+-------------------------------------------+
   ConfirmDeleteDialog (Notes tab "-Delete" action)
```

### 7.12 Letters — `app-tab-letters`

```
+-----------------------------------------------------------------------------------------------------------+
| Select Letter                                                                                                |
|  Letter/Pack [v ................................................ ]                                          |
|---------------------------------------------------------------------------------------------------------- |
| Letter Specific Info                       (contextual fields per selected letter)                          |
|  e.g. Policy Type [v]  /  Next Income Amount [   ]  /  Ceding Scheme [x][x][x] ...                          |
|---------------------------------------------------------------------------------------------------------- |
| Additional Text                                                                                              |
|  [                         multi-line textarea                                  ]                           |
|---------------------------------------------------------------------------------------------------------- |
| Distribution Info                                          Send To                                          |
|  Print [x]     Fax [x]  [        ]     Email [x] [           ]     Client [x]  IFA [x]                      |
|  Archive [x]                                                        Ceding Scheme [x]  Other [x]             |
|---------------------------------------------------------------------------------------------------------- |
|                                                                          [ 📨 Generate ]                     |
+-----------------------------------------------------------------------------------------------------------+
```
- **Full letter list (20, alphabetical):** Certificate of Existence · Chaser
  Letter OS Application Client · Chaser Letter OS Application IFA · Claim
  Form · Completion Pack · Death - Claim Completion Letter · Death -
  Dependant Acknowledgement Letter · Death - Initial Response Letter ·
  Disclosure Check · Disclosure Check Payment Letter · Divorce - Initial
  Response Letter · Failed Disclosure Check · IFA Acceptance Pack · IRF
  Acceptance Pack inc Client Ltr · IRF Letter · MPAA Letter · Plan Schedule ·
  Return Original Certificates · Rewrite Completion Pack · Transfer Forms.
- Plan `76` restricts the selectable list to **"MPAA Letter" only**.
- Distribution checkboxes derive from a per-letter config map; letters
  without an explicit entry fall back to all-disabled ("NO_DIST").
- Internal validation-failure alert reuses the shared `app-alert-dialog`.

### 7.13 Events — `app-tab-events`

```
+-----------------------------------------------------------------------------------------------------------+
| Event Details                                        [+New Event] [✎Edit Event] [🗑Delete Event]            |
| | Date of Event | Event No | Gross Amount | Tax Amount | Event Type |                                       |
+-----------------------------------------------------------------------------------------------------------+
```
- "New Event" disabled for plans `51`, `611`.
- Sub-modals below (opened by New/Edit/Delete):

```
+-------------------------------------------+   +-------------------------------------------+
| New Event / Edit Event                 [✕]|   | Confirm                                [✕]|
|---------------------------------------------|  |---------------------------------------------|
| Event Type [v Reportable / Taxable]         |  | Edit this event?                            |
| Event Date [ 📅 ]                            |  |          [ Yes ]     [ No ]                 |
| Event No   [        ]                       |  +-------------------------------------------+
| Gross Amount [        ]                     |        EditConfirm
| Taxable Amount [        ]                   |
|          [ ✓ OK ]     [ ✕ Cancel ]          |  +-------------------------------------------+
+-------------------------------------------+   | Confirm                                [✕]|
                                                 |---------------------------------------------|
                                                 | Are you sure you want to delete the Event   |
                                                 | '[SelectedNo]' ?                             |
                                                 |          [ Yes ]     [ Cancel ]              |
                                                 +-------------------------------------------+
                                                         DeleteConfirm
```

### 7.14 Maturities / Surrender — `app-tab-maturities`

```
+-----------------------------------------------------------------------------------------------------------+
| Bank Details                                                                     [ ✎ Edit Bank Details ]    |
|  Type [v Maturity/Surrender]         Bank account name [        ]                                           |
|  Bank sort code [      ][⊘]          Bank name         [        ]                                           |
|  Bank account no [      ]            Payment Ref       [        ]                                           |
|                                       Change Effective Date [ 📅 ]                                            |
|---------------------------------------------------------------------------------------------------------- |
| Payment                                                                                                       |
|  Claim Form Received [ 📅 ]   Nature of Payment [v]   Payment Method [v]   Payment Date [ 📅 ]                |
|  Gross [   ]  Tax [   ]  Net [   ]                                              [ Create payment… ]           |
|---------------------------------------------------------------------------------------------------------- |
| IFA Contact Details                                    Maturity Destination [v]                              |
|  Name [        ] Building [        ] City [        ]   Correspondence Name [        ]                        |
|  County [        ] Postcode [      ] FAO [        ]    Salutation [        ]  Telephone [        ]           |
|---------------------------------------------------------------------------------------------------------- |
| Maturity / Surrender Address                            Correspondence Address                               |
|  Address (5 lines) [                    ]                Address (5 lines) [                    ]            |
|  Postcode [      ]  Country [      ]                     Postcode [      ]  Country [      ]                 |
+-----------------------------------------------------------------------------------------------------------+
```
- Plan `82`/`83`: "Type" pre-filled to Surrender/Maturity respectively and
  locked. Plan `0`: editing forced off but shows plan-specific placeholder
  data (baseline demonstration).
- Sub-modals: `ConfirmDialog`, and the internal **New Maturity / Surrender
  Bank Details** modal:

```
+-------------------------------------------------------------+
| New Maturity / Surrender Bank Details                   [✕] |
|-----------------------------------------------------------------|
| Change Effective Date [ 📅 ]                                      |
| +---------------------------+  +------------------------------+ |
| | Bank sort code [      ]    |  | Bank Name (read-only) [     ] | |
| | Account name   [      ]    |  | Bank account no       [     ] | |
| | Payment Ref    [      ]    |  | Account Type (read-only)[   ] | |
| |                             |  | Payment method [v B/C/T]     | |
| +---------------------------+  +------------------------------+ |
|                     [ ✓ OK ]        [ ✕ Cancel ]                  |
+-------------------------------------------------------------+
```

### 7.15 LOA/POA — `app-tab-loa`

```
+-----------------------------------------------------------------------------------------------------------+
| LOA / POA Details                                              [✎Edit] [✓Save] [✕Cancel]                   |
|  LOA/POA [v]        Name    [        ]        Company [        ]                                            |
|  Address line 1 [        ]                                                                                   |
|  Address line 2 [        ]                                                                                   |
|  Address line 3 [        ]                                                                                   |
|  Postal Code [      ]     Date Appointed [ 📅 ]     Telephone [        ]                                     |
+-----------------------------------------------------------------------------------------------------------+
```
- Plan `0` shows literal placeholder tokens (e.g. `"LoaPoaName"`) instead of
  a real name — again the non-dynamic baseline. No further sub-modals.

---

## 8. Global Modal Reference (full ASCII, alphabetical)

Every modal below would be implemented as an Angular CDK `Dialog` /
Material `MatDialog` component, opened via a shared `DialogService.open()`
call and closed via the dialog's own `close()` / backdrop click. Titles
shown are the literal header text rendered by each component.

```
+-------------------------------------------+   +-------------------------------------------+
| About                                  [✕]|   | Amend Cheques                          [✕]|
|---------------------------------------------|  |---------------------------------------------|
| [LV= logo]                                  |  | Enter new value for the Cheque Status field.|
| Client Annuity Administration System (CLANAD)| | Status [v Cleared/Cancelled/Stale/Stopped/  |
| Version 1.0.0                               |  |          Re-issued]                          |
| © 2024 Liverpool Victoria Financial          |  |          [ ✓ OK ]     [ ✕ Cancel ]           |
| Services Limited                            |  +-------------------------------------------+
|                  [ OK ]                     |
+-------------------------------------------+

+-------------------------------------------+   +-------------------------------------------+
| Amend IFA                              [✕]|   | Bank Changes Report                    [✕]|
|---------------------------------------------|  |---------------------------------------------|
| Current IFA (read-only) [              ]    |  | Please enter the start and end dates for the|
| New IFA [              ] [ 🔍 ]             |  | Bank Changes Report                          |
|          [ ✓ OK ]     [ ✕ Cancel ]          |  | From Date [ 📅 ]     To Date [ 📅 ]           |
+-------------------------------------------+   |          [ ✓ OK ]     [ ✕ Cancel ]           |
                                                 +-------------------------------------------+

+-------------------------------------------+   +----------------------------------------------------+
| Ceding Scheme                          [✕]|   | Cheque Logger                                   [✕]|
|---------------------------------------------|  |------------------------------------------------------|
| Please select a Ceding Scheme from the list |  | [+New Record][✎Edit Record][🗑Delete Record][🖨Print] |
| below.                                       |  | | Date Received | Payee Name | Amount | Cheque No |  |
| | Scheme Name | Address | Postcode |         |  | | Bank Sort Code | Account No |                     |
|          [ ✓ OK ]     [ ✕ Cancel ]          |  |          [ ✓ OK ]     [ ✕ Cancel ]                   |
+-------------------------------------------+   +----------------------------------------------------+

+-------------------------------------------+   +-------------------------------------------+
| Company Selection                      [✕]|   | Completion Checker                     [✕]|
|---------------------------------------------|  |---------------------------------------------|
| Please select a company to manage policies  |  | The following items must be completed       |
| for:                                         |  | before the policy can be made 'In Force':    |
| | CoCode | Company Name |                    |  | | Check Description | Status | Action Req. | |
|          [ ✓ Select ]  [ ✕ Cancel ]         |  |                    [ ✓ OK ]                 |
+-------------------------------------------+   +-------------------------------------------+

+-------------------------------------------+   +-------------------------------------------+
| Confirm                                [✕]|   | Copy P60                               [✕]|
|---------------------------------------------|  |---------------------------------------------|
| [Dynamic message, e.g. "Are you sure?"]     |  | Please enter the tax year for which you     |
|          [ Yes ]      [ No ]                |  | wish to print a duplicate P60                |
+-------------------------------------------+   | Tax Year [v 2023/24 / 2022/23 / 2021/22]     |
   ConfirmDialog (shared, reused across app)      |          [ 🖨 Print ]  [ ⊘ Cancel ]           |
                                                 +-------------------------------------------+

+----------------------------------------------+  +-------------------------------------------+
| CRS / Fatca                               [✕]|  | Customer Needs                         [✕]|
|------------------------------------------------|  |---------------------------------------------|
| CRS Status                                     |  | Vulnerable Customer                          |
|  Self-Certification Status [v]                 |  |  Vulnerable? [x]  Category [v]               |
|  Date Received [ 📅 ]                           |  |  Notes [ textarea ]                          |
| Tax Residency                    [+Add][-Remove]|  | Power of Attorney                            |
|  | Country of Tax Residence | TIN | Reason TIN |  |  PoA in place? [x]  PoA Type [v]              |
|  |   not available |                            |  |          [ ✓ Save ]   [ ✕ Cancel ]           |
|          [ ✓ OK ]     [ ✕ Cancel ]              |  +-------------------------------------------+
+----------------------------------------------+

+-------------------------------------------------+  +-------------------------------------------+
| Doctor Database                              [✕]|  | Edit Bank Details                      [✕]|
|-----------------------------------------------------|  |---------------------------------------------|
| [🔍 Search]  [+ Add Doctor]                       |  | Bank sort code       [        ]              |
| | Doctor Name | Surgery | Address | Postcode | Tel |  | Bank account no      [        ]              |
|          [ ✓ Select ]   [ ✕ Cancel ]               |  | Bank account name    [        ]              |
+-------------------------------------------------+  | Bank name (read-only)[        ]              |
                                                       | Change Effective Date[ 📅 ]                  |
                                                       |          [ ✓ OK ]     [ ✕ Cancel ]           |
                                                       +-------------------------------------------+

+-------------------------------------------------+  +-------------------------------------------+
| Find Policy (field-search variant)           [✕]|  | Keyboard Shortcuts                     [✕]|
|-----------------------------------------------------|  |---------------------------------------------|
| Policy Number [        ]                          |  | | Action | Shortcut |                       |
| Surname       [        ]                          |  |                    [ Close ]                 |
| Postcode      [        ]                          |  +-------------------------------------------+
| Enter search criteria and click Search.            |
|          [ 🔍 Search ]  [ ✕ Cancel ]               |
+-------------------------------------------------+

+-------------------------------------------------+  +-------------------------------------------+
| Locate                                       [✕]|  | Miscellaneous Diary                    [✕]|
|-----------------------------------------------------|  |---------------------------------------------|
| Value to find [              ]                    |  | Action Date   [ 📅 ]                          |
| Search In   ( ) All Columns  (*) Current Column   |  | Reminder Date [ 📅 ]                          |
| Match       ( ) Exact Match  (*) Partial Match    |  | Diary Text    [ textarea ]                   |
|          [ ✓ OK ]     [ ✕ Cancel ]                |  | Completed?    [x]                             |
+-------------------------------------------------+  |          [ ✓ Save ]   [ ✕ Cancel ]           |
                                                       +-------------------------------------------+

+-------------------------------------------+   +-------------------------------------------+
| P45 Details                            [✕]|   | Pull Quote                             [✕]|
|---------------------------------------------|  |---------------------------------------------|
| Previous Employer Name  [              ]    |  | Enter the Quote Reference you wish to pull  |
| Date Left Prev. Employment [ 📅 ]           |  | data from.                                   |
| Total Pay to Date       [              ]    |  | Quote Reference [              ]             |
| Total Tax to Date       [              ]    |  |          [ ✓ OK ]     [ ✕ Cancel ]           |
| Tax Code at Leaving     [              ]    |  +-------------------------------------------+
|          [ ✓ OK ]     [ ✕ Cancel ]          |
+-------------------------------------------+

+-------------------------------------------------------------------------------------------------------+
| Quote Lookup                                                                                       [✕]|
|-------------------------------------------------------------------------------------------------------|
| Get Records (*)>= ( )=  [ input ]     [First][Prev] Page 1 of 3 [Next][Last]   [⏮ Last 60]  [🔍 Locate (F3)] |
| Monthly Cash Policy [x]                                                                                 |
| Illustrations (variant 0 only)                                                                          |
| | Quote | Variant | IFA | Created | Name | Type | LifeType | Age 1 | User | Master | Status | COCODE |  |
| Variants                                                                                                 |
| | Variant | Series | Created | Username | Type | Life Type | Gross Annuity | Amount | TFC % | TFC | ... |
| | Dep % | O/lap | Gtee | Esc % | Frequency | Pay Type | Name 1 | Sex 1 | DOB 1 | Age 1 | Smk 1 | ...    |
| | Special 1 | Name 2 | Sex 2 | DOB 2 | Age 2 | Smk 2 | Special 2 | Commence | B/D Fee | IFA | Network | |
| | Master | Expense % | Comm % | Brok Split % | Memb Split % | PLATAXRATE | CAPITALELEMENT | TAXRATE |  |
| | SINGLEGRATE | JOINTGRATE | GRATE | C.Age 1 | C.Age 2 | APRIME1 | APRIME2 |                           |
|                                                    [ ✓ OK ]     [ ✕ Cancel ]                            |
+-------------------------------------------------------------------------------------------------------+

+-------------------------------------------------+  +-------------------------------------------+
| Recalculate Ann. Stat.                       [✕]|  | Reprint Annual Statements               [✕]|
|-----------------------------------------------------|  |---------------------------------------------|
| Please enter the product and date range for       |  | Please enter the date for which you wish to |
| which you wish to recalculate the Annual           |  | reprint the Annual Statements                |
| Statements                                          |  | Reprint Date [ 📅 ]                           |
| Product [v With Profits/Non Profits/ICFP/PRP/PIPA]|  |          [ 🖨 Print ]  [ ⊘ Cancel ]           |
| From Date [ 📅 ]    To Date [ 📅 ]                 |  +-------------------------------------------+
|          [ ✓ OK ]     [ ⊘ Cancel ]                |
+-------------------------------------------------+

+-------------------------------------------------+  +-------------------------------------------+
| [SystemName] Reporting System        [🖨 Print][✕]|  | Reprint Maturity Letters               [✕]|
|-----------------------------------------------------|  |---------------------------------------------|
| System Name [v CCRP / CHEQUE REQUISITION /         |  | Please enter the date and letter type of the|
|              DANAD96 / ...]                        |  | maturity process for which you wish to      |
| Start Date [ 📅 ]     End Date [ 📅 ]              |  | reprint                                       |
| Print to my default printer [x]                    |  | Reprint Date [ 📅 ]                           |
| | ReportName | DateRequired |                       |  | Maturity letter types [v 4 Month/6 Week/     |
| Report Path (read-only) [                ] [🔍Find]|  |   3 Week/10 Day/0 Day]                        |
|  (Find button disabled)                             |  |          [ 🖨 Print ]  [ ⊘ Cancel ]           |
+-------------------------------------------------+  +-------------------------------------------+

+-------------------------------------------+   +-------------------------------------------+
| Client Annuity Administration System   [✕]|   | Set Dead                               [✕]|
|---------------------------------------------|  |---------------------------------------------|
| The Screen Print has been printed!          |  | Date of death [ 📅 ]                          |
|                  [ OK ]                     |  |          [ ✓ OK ]     [ ⊘ Cancel ]           |
+-------------------------------------------+   +-------------------------------------------+
   ScreenPrintModal

+---------------------------------------------------------------------------------------------------------+
| Supervisory Edit                                                                                       [✕]|
|-------------------------------------------------------------------------------------------------------------|
| Policy Services Status [v]     Start Date (r/o) [        ]        IFA Commission [        ]                  |
| ReAssurer (r/o) [        ]     ReAss Premium (r/o) [        ]                                                 |
|---------------------------------------------------------------------------------------------------------------|
| (r/o) Premium         | (r/o) Overlap             | (r/o) Cumulative free pay                                 |
| (r/o) Tax Free Cash   | (r/o) Escalation options  | (r/o) Cumulative instalments                              |
| (r/o) Life 1 Annuity  | (r/o) Guarantee Options   | (r/o) BAL Gross Annuity                                    |
| (r/o) Depend's Ann. % | (r/o) Guarantee Expiry    | (r/o) BAL Capital Element                                  |
| (r/o) Life 2 Annuity  | (r/o) IR Max Pension      | (r/o) Gross Annuity Due                                    |
| (r/o) Capital Element | (r/o) IR Balance          | (r/o) Nth inst for tax year                                |
| (r/o) Taxable pay     | (r/o) Free Pay            | (r/o) Next Payment Due                                     |
| (r/o) PAYE Tax paid   |                            | (r/o) Instalment Rmg                                       |
| (r/o) PAYE Tax deduct.|                            |                                                             |
|                                          [ ✓ OK (Save changes) ]   [ ⊘ Cancel ]                              |
+---------------------------------------------------------------------------------------------------------------+

+-------------------------------------------+   +-------------------------------------------+
| Tax Certificate                        [✕]|   | ViewNotionalValue                      [✕]|
|---------------------------------------------|  |---------------------------------------------|
| Please enter the dates of the first and     |  | | VALUE_DATE | AMOUNT | WITHHELD_MINIMAL_   |
| last payments you want to see on the        |  | |            |        | INCOME | Mutual_Bonus||
| certificate.                                |  |                  [ OK ]                     |
| Start Date [ 📅 ]     End Date [ 📅 ]        |  +-------------------------------------------+
|          [ ⊘ Cancel ]  [ 🖨 Print ]          |
+-------------------------------------------+

+-------------------------------------------+
| Error                                  [✕]|
|---------------------------------------------|
| [Dynamic message]                           |
|                  [ OK ]                     |
+-------------------------------------------+
   WinErrorDialog (shared, reused wherever the legacy app surfaced a
   Windows-style error box — e.g. Annuitant tab NI-delete-on-plan-51)
```

---

## 9. Navigation Map

```
                     [Search 🔍] toolbar button, or Options→Search (F5)
   any tab   ──────────────────────────────────────────────────────►  Find Policy Modal
                                                                            │
                                                          select row + OK   │
                                                                            ▼
                                                    PlanCodeService.select(code, surname, ref)
                                                                            │
                                                                            ▼
              app-header / app-policy-header / app-toolbar / app-status-bar / app-tab-bar / active tab component
                    all re-render using the newly selected plan's booleans
                                                                            │
                click a Tab in the Tab Bar (or a Header-menu "switch tab" event)
                                                                            ▼
                                                                    <selected tab panel>
```

- The 15 tabs are peers — any tab can be reached directly from the Tab Bar
  once a policy is loaded; there is no forced linear order and no
  Angular Router navigation between them (all panels live under the same
  route, swapped via `[ngSwitch]`).
- Every popup/modal listed in §2, §3, §7, and §8 is opened from either a
  Header menu item, a Toolbar button, or an in-tab action button via
  `DialogService.open(...)`, and closes back to the exact screen/tab it was
  opened from — no full route navigation occurs.

---

## 10. Cross-cutting Components (proposed Angular selectors)

| Component | Suggested selector | Used by |
|---|---|---|
| App shell header | `app-header` | root shell |
| App shell footer | `app-footer` | root shell |
| Brand logo | `app-logo` (variant: `light` \| `dark`) | header, footer, About modal |
| Toolbar | `app-toolbar` | root shell |
| Policy header bar | `app-policy-header` | root shell |
| Tab strip | `app-tab-bar` | root shell |
| Status bar | `app-status-bar` | root shell |
| Menu trigger + overlay panel | `app-menu-trigger` / `app-menu-panel` | header |
| Generic confirm/alert dialog | `app-confirm-dialog` (`@Input() message`) | shared across app |
| Generic Windows-style error dialog | `app-error-dialog` | Annuitant, Payments |
| Data grid | `app-data-grid` | most tabs, most modals |
| Editable data grid | `app-editable-data-grid` | Payments, Increase History, Quote Details |
| Date picker | `app-date-picker` | all date fields, all tabs |
| Address block (5-line + clear) | `app-address-block` | Application, Contacts, Contacts2, Maturities |
| Note card | `app-note-card` | Notes tab |
| Tab panel — Application Details | `app-tab-application` | tab bar |
| Tab panel — Annuitant(s) Details | `app-tab-annuitant` | tab bar |
| Tab panel — Contacts | `app-tab-contacts` | tab bar |
| Tab panel — Contacts (2nd) | `app-tab-contacts2` | tab bar |
| Tab panel — Policy Details | `app-tab-policy` | tab bar |
| Tab panel — Bank Acc Details | `app-tab-bank` | tab bar |
| Tab panel — Payments | `app-tab-payments` | tab bar |
| Tab panel — Increase History | `app-tab-increase` | tab bar |
| Tab panel — Quote Details | `app-tab-quote` | tab bar |
| Tab panel — Diary & Audit Trail | `app-tab-diary` | tab bar |
| Tab panel — Notes | `app-tab-notes` | tab bar |
| Tab panel — Letters | `app-tab-letters` | tab bar |
| Tab panel — Events | `app-tab-events` | tab bar |
| Tab panel — Maturities/Surrender | `app-tab-maturities` | tab bar |
| Tab panel — LOA/POA | `app-tab-loa` | tab bar |

All ~35 modal components in §2B/§8 would follow the naming convention
`app-<name>-modal` (e.g. `app-about-modal`, `app-set-dead-modal`,
`app-quote-lookup-modal`) and be opened through a single shared
`DialogService`.

---

## 11. State Model (Angular services)

| Service | Shape | Notes |
|---|---|---|
| `PlanCodeService` | `planCode$: BehaviorSubject<PlanCodeVersion>`, `surname$: BehaviorSubject<string>`, `policyRef$: BehaviorSubject<string>` | Boots on `"90"` / `TESTCTCCHIBD` / `227813`. Single source of truth for all dynamic rendering (§0). |
| `EditModeService` | `editing$: BehaviorSubject<boolean>`, `cancel(): void` | Drives the shared Toolbar Edit/Save/Cancel affordance across every tab. |
| `ChequesService` | in-memory cheque ledger used by `ChequeLoggerModal` / `AmendChequesModal` | Frontend-only sample data, no persistence. |
| `ShortcutRegistryService` | registry of `{ id, keys[] }` entries | Backs the global keydown listener and `KeyboardShortcutsModal`'s reference table. |
| `DialogService` | thin wrapper over Angular CDK `Dialog` / Material `MatDialog` | Single entry point used by every "open modal" action described in this document. |

- **Frontend-only / sample data.** No screen calls a backend; every
  grid/list/lookup resolves to a hard-coded constant selected by the current
  plan code. In a real Angular rebuild, each of these would map to a service
  method returning an `Observable` (e.g. `PolicyService.getByPlanCode$()`)
  resolved from an HTTP API instead of an in-memory array.

---

## 12. Layout & Placement Validation Notes

Cross-checked against the current source (`App.tsx`, `Header.tsx`,
`Toolbar.tsx`, `PolicyHeader.tsx`, `TabBar.tsx`, `StatusBar.tsx`,
`Footer.tsx`, all `tabs/*.tsx`, `FindPolicyModal.tsx`, `PlanCodeContext.tsx`,
and every `components/*Modal.tsx`), then re-expressed in Angular terms above:

- Page shell = flex column filling the viewport; main content area uses
  wide horizontal padding; footer stays pinned to the bottom regardless of
  content height (the Angular equivalent is a root `app-shell` component
  with a `<router-outlet>`-less `[ngSwitch]` content area and `margin-top:
  auto` on `app-footer`).
- Toolbar buttons render in a single wrapping row above the Policy Header;
  each is a small button, with the active Edit/Save toggle styled as
  **primary** while every other tool uses **secondary** styling.
- Policy Header is one horizontally-scrollable row; every "conditional" pill
  has a matching same-sized empty placeholder block when hidden, so the
  row's overall width/alignment never shifts between plan codes.
- Tab Bar renders as a single non-wrapping row inside a horizontally
  scrollable container (mouse-wheel horizontal scroll wired up), each tab
  uses the ARIA `role="tab"` pattern, arrow-key navigable — in Angular this
  maps to the CDK a11y `FocusKeyManager` pattern.
- Status Bar sits directly above the Footer inside the main content area, a
  wrapping row of label/value pairs.
- All plan-code-specific values are chained conditional expressions per
  field (`isPlanXX ? "…" : isPlanYY ? "…" : … : "<placeholder>"`, which in
  Angular templates would be `*ngIf`/`[ngSwitch]` chains or a computed
  signal per field), so every field's fallback (final branch) is the "plan 0
  style" undynamic placeholder described in §0B — this pattern was
  spot-checked across the Application Details, Policy Details, and Bank Acc
  Details tabs.
- Recent verified fixes reflected in this document: the Letters tab lists
  the full 20-item alphabetical set (§7.12); the Bank Acc "delete sort code"
  button correctly hides for both `621` and `51` (§7.6); the Header's
  "Ceding Scheme Details" Process-menu item now fires a real click handler
  for plan `87` (previously a no-op, matching the plan-`0` "unwired menu
  item" pattern described in §2A).
- **Plan `84` (deceased policy) verified changes:** Status Bar now shows
  `DEAD` (red), `Illustration = 2139419`, `Variant = 4`, `RAQ ID = blank`,
  `User = UAT2`; plan `84` is removed from the SIPP Pol group. Application
  Details tab shows death-state data (Status D, Suspended Y, Life One Dead Y,
  death payment block, Dependant Eligible N). Annuitant tab DOD populated
  (`03/03/2021`) and Cause of Death block is now **visible** for plan `84`
  (removed from the hidden list). Policy Details tab: Purchaser, Policy Owner,
  Initial payment method, Pay TFC by, Advice Type, Issue Statements, Copy Ann.
  Stmt to IFA/PH, and Issue wake-up letters are all disabled; Deceased Date and
  Notification Date pickers remain enabled. Toolbar Edit button rendered but
  disabled; Log button removed; Sim App also disabled. Find Policy grid: plan
  `84` STATUS column corrected from `L` to `D`.

---

## 13. Coverage Checklist (validated against current build)

- [x] Application shell — Header, Footer, Toolbar, Policy Header, Tab Bar,
      Status Bar.
- [x] All 5 Header menus (Options/Process/Print/Supervisor/Help) + every
      submenu flyout, including per-plan variations.
- [x] All ~18 Header-menu-launched modals + 5 inline confirm/info dialogs.
- [x] Toolbar — all 10 buttons, enable rules, and the modals they launch.
- [x] Find Policy modal — full 12-column/15-row wireframe, plan-`0`
      blank-cell behaviour, and the field-search "Locate" variant.
- [x] Policy Header — full pill layout, accent-colour table, and the
      Simultaneous Policies dialog.
- [x] Tab Bar — all 15 tabs and the exact plan-code visibility rules.
- [x] All 15 tab panels — full ASCII wireframe, fields, buttons, and
      plan-specific behaviour for each.
- [x] Every tab-scoped modal (Doctor Database, Edit Bank Details, New/Edit/
      Delete Event, New Maturity/Surrender Bank Details, Confirm Delete,
      View Notional Value, Misc Diary, Customer Needs, Ceding Scheme).
- [x] Every global/standalone modal in the component library (§8), in full
      ASCII, alphabetically indexed.
- [x] Navigation map tying Find Policy → PlanCodeService → full-app
      re-render → Tab Bar → active panel.
- [x] Cross-cutting Angular selector list (§10) and state-model service
      table (§11) for a hypothetical Angular rebuild.
- [x] Plan `0` documented throughout as the deliberate non-dynamic /
      baseline rendering path, not a bug.

---

## 14. Summary — what "dynamic rendering" means in this app

1. **One shared service** (`PlanCodeService`, 15 possible plan-code states)
   flows into nearly every component via dependency injection.
2. **Every screen re-derives its own booleans** from that value locally
   (`isPlan87`, etc.) rather than the value being interpreted centrally —
   so each tab/menu/panel independently decides what to show.
3. **Plan `0` is the deliberate control case**: it is what the screen looks
   like when *none* of those booleans are true — blank/placeholder data,
   unwired menu actions, and the most "generic" layout variant where one
   exists. It exists specifically so the base, non-dynamic version of each
   screen can be inspected on its own.
4. Switching plan codes (via **Find Policy**) is the only way to navigate
   between the 15 versions — there are no separate routes per version, and
   in an Angular rebuild this would remain a single-route application with
   `[ngSwitch]`-driven panels rather than router-driven navigation.

---

## 15. Document Downloads

These documents are served as static files from the application's `/public/`
directory and are accessible directly in the browser or via `curl`:

| Document | URL path |
|---|---|
| **This file** — CLANAD Screen Flow (ASCII) | [`/CLANAD_SCREEN_FLOW_Angular_LVE.md`](/CLANAD_SCREEN_FLOW_Angular_LVE.md) |
| **Application Digest** — compact component + data reference | [`/CLANAD_DIGEST_Angular_LVE.md`](/CLANAD_DIGEST_Angular_LVE.md) |

To download: navigate to the URL above in any browser and use
**File → Save As** (or right-click → Save link as) to save the `.md` file locally.
