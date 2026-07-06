# LV= CLANAD — Screen Flow (ASCII)

This document captures every screen, tab, popup, modal, and dialog reachable in
the current version of the LV= CLANAD (Client Annuity Administration System)
static recreation, together with the navigation paths, the **15 policy
versions ("plan codes")** the app can switch between, and the rules that
govern dynamic rendering across those versions.

**Technology:** React + Vite + TailwindCSS v4, LVE Component Library
**Entry point:** `/` — the CLANAD client screen (single page, no routing)
**Data:** 100% hard-coded sample data selected by the active plan code — there
is no backend and no network calls.

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
— from `PlanCodeContext`. Almost every tab, panel, and menu in the app derives
a set of booleans from it (`isPlan87`, `isPlan84`, `isPlan90`, `isPlan51`,
`isPlan83`, `isPlan82`, `isPlan80`, `isPlan621`, `isPlan76`, `isPlan76z`,
`isPlan62a`, `isPlan611`, `isPlan52`, `isPlan61a`, and `isPlan0`) and uses them
to:

- swap which **fields are shown/hidden** on a tab,
- swap the **hard-coded sample values** shown in those fields,
- **enable/disable** individual inputs and whole action buttons,
- change which **tabs** are visible in the tab bar at all,
- change which **menu items** appear under Header's Options/Process/Print/
  Supervisor menus, and which action (if any) they trigger,
- change the **status-bar** wording (e.g. "LIVE" vs "MIGRATED" vs "SHELVED").

```
                         usePlanCode() → { planCode }
                                   |
        +--------------------------+--------------------------+
        |                          |                           |
   Header menus              Toolbar buttons              Every Tab component
  (Options/Process/       (New Quote, Sim App,          (isPlanXX booleans control
   Print/Supervisor)       Edit, Cancel, ...)             visible fields + values)
        |                          |                           |
        +--------------------------+--------------------------+
                                   |
                          PolicyHeader / StatusBar
                       (plan-code chip colour, status text)
```

### 0A. The 15 versions

| Plan Code | Plan Type | Description | Status shown |
|---|---|---|---|
| **`0`** | master | **Master — Default version** (see §0B) | n/a |
| `87` | FTA | Version 87 — Standard controls | PENDING |
| `84` | FTA | Version 84 — Full controls (incl. GAD & IR) | LIVE |
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

The app **boots on plan code `90`** (surname `TESTCTCCHIBD`, ref `227813`) —
this is the default policy shown on first load, not `0`.

### 0B. Plan `0` — the "no dynamic rendering" baseline

Plan `0` ("Master") is intentionally **not** one of the real policy versions —
it is a **static placeholder / fallback state**, included to prove what the
screen looks like with no plan-specific data wired up:

- In the **Find Policy** grid it appears as a row where only 4 of the 12
  columns are populated (`POLICY_REF`, `PLANTYPE`, `PLAN_CODE`, `SURNAME`);
  every other column (NI No, Original Quote, Status, Postcode, IFA Ref, DOB,
  Policy No, Cocode) is **blank**.
- Across the tabs, none of the `isPlanXX` conditions match, so components fall
  through to their **`else` branch** — which is either an empty string, a
  raw placeholder token that mirrors the legacy field name (e.g. `"dbday"`,
  `"edtStartdate"`, `"DBEditAPPLI"`, `"DBEdit41"`), or (in a few tabs such as
  Payments/Increase History/Quote/Maturities/LOA) a slightly more detailed
  **generic layout** used specifically so the "undecorated" shape of the
  screen can still be reviewed.
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

Every screen renders inside the same shell: a fixed navy **Header**, the main
content area (Toolbar + PolicyHeader + TabBar + active tab panel +
StatusBar), and a white **Footer** pinned to the bottom.

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
|  |                             <<< ACTIVE TAB CONTENT >>>                                          | |
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

### 1A. Header

| Element | Detail |
|---|---|
| **LV= logo** | Navy header variant. |
| **Page title** | Livvic 30px white — "Client Annuity Administration System" (static). |
| **Options / Process / Print / Supervisor / Help** | Top nav menu buttons — click opens a dropdown (see §2). Menu **contents change per plan code** (§2A). |
| **Logout** | Ghost button, white text. |

Header background: navy `#00263e`, `py-5 px-[142px]`.

### 1B. Footer

| Element | Detail |
|---|---|
| **LV= logo** | Dark/default variant, imported from `src/assets/lv-logo.png`. |
| **Address block** | "Liverpool Victoria Friendly Society Limited, County Gates, Bournemouth BH1 2NF." / "Authorised by the Prudential Regulation Authority and regulated by the FCA and PRA." (10px, right-aligned, `#94a3b8`). |

Footer background: white, top border `border-slate-200`, `mt-auto` so it
sticks to the bottom of the flex column regardless of content height.

---

## 2. Header Menus (dropdowns)

Each top-level label opens a dropdown positioned below it. Items with a `▶`
open a nested flyout submenu on hover. Disabled items are greyed and
non-interactive.

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
| `51`, `62a`, `611`, `61a`, `52` | **Options, Print, Help only** (Process/Supervisor hidden) | `Options` reduced to Screen Print (F1) + Search (F5); `Print` reduced to Print MAR ▶ + Diary Report. |
| `87` | All 5 menus | `Supervisor` swaps to `SUPERVISOR_87` (adds Final Quote Issued / Set Live / Force Set Live emphasis); `Process` overrides both "P45 details" and "Ceding Scheme Details" to wire real actions (`p45-details`, `ceding-scheme`). |
| `80`, `82`, `83` | All 5 menus | `Options`→`OPTIONS_84`; `Process`→plan-specific set (adds "Set Dead" ▶ Life One/Life Two, "Payments" ▶ Suspend, "PLA Cancellation"); `Print`→`PRINT_82`/`PRINT_83`; `Supervisor`→plan-specific set. |
| `84`, `90` | All 5 menus | `Supervisor` → `SUPERVISOR_84` (`84`) or `SUPERVISOR_90` (`90`, adds "Expired" and "C(ancel) Application"). |
| `621` | All 5 menus | Options→`OPTIONS_84`, Process→`PROCESS_83` set, Print→`PRINT_84`, Supervisor→`SUPERVISOR_83`. |
| `76` | All 5 menus | Process→`PROCESS_76`, Supervisor→`SUPERVISOR_84`. |
| `76z` | All 5 menus | Process→`PROCESS_76z`, Print→`PRINT_82`, Supervisor→`SUPERVISOR_83`. |
| `0` | All 5 menus (base `MENU_ITEMS`) | Default/unmodified menu — several items (e.g. base "Ceding Scheme Details", "Payment Forecast", "N.I Sweep") have **no `action` wired**, so they render but do nothing when clicked — another facet of plan `0` being the non-dynamic baseline. |

### 2B. Modals opened from Header menu actions

| Modal / Dialog | Opened via | Purpose |
|---|---|---|
| `TaxCertificateModal` | (Print menu family) | Generate/print a tax certificate. |
| `AboutModal` | Help → About | App version / legal info. |
| `KeyboardShortcutsModal` | Help → Keyboard Shortcuts | Lists all keyboard shortcuts. |
| `AmendChequesModal` | Supervisor → Amend Cheques | Modify/reverse cheque entries. |
| `CompletionCheckerModal` | Options → Check Completion | Validates required fields are filled. |
| `ScreenPrintModal` | Options → Screen Print (F1) | Screen-print options dialog. |
| `AmendIfaModal` | Options/Supervisor → Amend IFA | Edit IFA details. |
| `P45DetailsModal` | Process → P45 details ▶ P45 Details | View/edit P45 tax info. |
| `SetDeadModal` | Process → Set Dead ▶ Life One/Life Two | Mark a life as deceased; opens `noSecondLifeOpen` error if no 2nd life exists. |
| `CedingSchemeModal` | Process → Ceding Scheme Details | Ceding (transferring) pension scheme details. |
| `CopyP60Modal` | (Print family) | Duplicate P60 tax form. |
| `SupervisoryEditModal` | Supervisor menu | Enables restricted supervisor-only edit fields. |
| `BankChangesReportModal` | Process → Bank Detail Changes ▶ Bank Changes Awaiting Approval | Report of pending bank changes. |
| `ReprintMaturityModal` | Print/Supervisor → Reprint Maturity Letters | Reprint maturity correspondence. |
| `RecalcAnnStatModal` | Supervisor → Annual Statement Recalculation | Recalculate annual statement. |
| `ReprintAnnualStatementsModal` | Supervisor/Print → Reprint Annual Statements | Bulk/individual reprint. |
| `PullQuoteModal` | Process → Pull Quote | Pull/retrieve quote data. |

### 2C. Inline confirm/info dialogs (rendered directly in `Header.tsx`)

```
+------------------------------------------+   +------------------------------------------+
| Information                        [ ✕ ] |   | Confirm                             [ ✕ ] |
|------------------------------------------|   |------------------------------------------|
|  (i)  You must reverse cheques first ?    |   |  (?) Are you sure you want to set the     |
|                                           |   |      policy to Expired?                    |
|            [ ✓ OK ]                       |   |     [ Yes ] [ No ] [ Cancel ]              |
+------------------------------------------+   +------------------------------------------+
   cancelAppOpen — Supervisor "C(ancel) Application"     expiredConfirmOpen — Supervisor "Expired" (plan 90)

+------------------------------------------+   +------------------------------------------+
| Client Annuity Administration System [✕] |   | Client Annuity Administration System [✕] |
|------------------------------------------|   |------------------------------------------|
|  This records payments are already        |   |  This policy is not a PLA!                |
|  suspended!                               |   |                                            |
|            [ ✓ OK ]                       |   |            [ ✓ OK ]                       |
+------------------------------------------+   +------------------------------------------+
   suspendOpen — Process "Payments ▶ Suspend"          plaCancellationOpen — Process "PLA Cancellation"

+------------------------------------------+
| Client Annuity Administration System [✕] |
|------------------------------------------|
|  There is no second life for this record! |
|            [ ✓ OK ]                       |
+------------------------------------------+
   noSecondLifeOpen — Process "Set Dead ▶ Life Two" (when no 2nd life on the policy)
```

All 5 use the same shape: navy panel header with a close (✕) button,
centered blue info-circle or red-tinted icon, body message, single/triple
button row.

---

## 3. Toolbar (below the Header, above PolicyHeader)

```
[ + New App ] [ 🗒 New Quote ] [ ⧉ Sim App ] [ ✎ Edit ] [ ⊘ Cancel ] [ 🔍 Search ] [ 🕐 Log ] [ 🗄 CRS ] [ 📊 Reports ] [ 🏢 Company ]
```

| Button | Enabled when | Action |
|---|---|---|
| **New App** | not editing | Confirm dialog "Create a new Application?" → `QuoteLookupModal` |
| **New Quote** | `isPlan87` only | (always disabled in this build — placeholder) |
| **Sim App** | not editing, not plan `51`/`76` | Confirm dialog "Are you sure you wish to generate simultaneous policy?" → `QuoteLookupModal` |
| **Edit / Save** | not plan `76` | Toggles the app's shared **edit mode**; label + icon swap Edit↔Save |
| **Cancel** | editing, not plan `51` | Reverts unsaved edits (`EditModeContext.cancel()`) |
| **Search** | not editing | Opens `FindPolicyModal` (§4) |
| **Log** | not editing | Opens `ChequeLoggerModal` |
| **CRS** | not editing | Opens `CrsModal` |
| **Reports** | not editing | Opens `ReportsModal` |
| **Company** | not editing | Opens `CompanySelectionModal` |

Toolbar button set is further trimmed per plan:
- `51`/`62a`/`611`/`52` → drop **Edit** and **Log**.
- `84`/`90`/`621` → drop **Log** only.

### 3A. Toolbar-launched modals

| Modal | Purpose |
|---|---|
| `QuoteLookupModal` | Look up/select a quote when creating a new application or sim policy. |
| `PullQuoteModal` | Pull an existing quote into the current record. |
| `CompanySelectionModal` | Select the underwriting company. |
| `ReportsModal` | Report generation options. |
| `CrsModal` | Common Reporting Standard (tax residency) details. |
| `ChequeLoggerModal` | Log of cheque transactions. |
| `FindPolicyModal` | Search/select a policy (see §4). |

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
|      111834|   PRP    |    84     |  TESTPTBBBIDE   | PK-25-10-58-A|     2139419   |   L    | ... |
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
- Selecting a row and clicking **OK** (or double-clicking the row) calls
  `setPlanCode` / `setSurname` / `setPolicyRef` — this is the single
  mechanism that drives every dynamic-rendering difference described in this
  document.
- The **plan `0`** row is visually distinct: most cells are blank because
  `PLAN0_VISIBLE` only whitelists `policyRef`, `planType`, `planCode`,
  `surname` for that row.

---

## 5. Policy Header (below Toolbar)

A single info bar showing the currently loaded policy, always visible above
the tab bar.

```
[ v Policy No ] [ ↗ ]  [ Liverpool Victoria Friendly Society Limited ]  [ 227813 ]  [ 90 ]  [ TESTCTCCHIBD ]  [ Simultaneous Policies ]  [ ⋯ ]  [ MONTHLY CASH POLICY ]
```

| Element | Detail |
|---|---|
| **Policy No selector** | Dropdown-styled button (chevron icon), title "Policy No". |
| **Find application (↗)** | Icon-only button, opens external-link style icon. |
| **Company name pill** | Blue pill "Liverpool Victoria Friendly Society Limited" — shown for **every named plan code (87…61a)**; for plan `0` it collapses to an **empty blue placeholder block** (no text) — again reflecting the non-dynamic baseline. |
| **CLANAD Number** | Light-blue pill showing `policyRef` (e.g. `227813`). |
| **Plan Code pill** | Coloured pill (`--lve-accent` / `--lve-accent-fg`, one accent colour per plan — see §5A) showing the plan code (`76z` displays as `76`). |
| **Surname pill** | Same accent colour, shows `surname` (truncated). |
| **"Simultaneous Policies" pill** | Shown only for plans `84, 51, 80, 83, 62a, 611, 61a`; otherwise an empty placeholder block. |
| **More (⋯)** | Opens the **Simultaneous Policies** dialog (§5B). |
| **Policy-type badge** | `90` → pink "MONTHLY CASH POLICY"; `83` → cyan "RETIREMENT ACCOUNT"; all other plans → empty placeholder block. |

### 5A. Plan-code accent colours (`PLAN_CODE_ACCENT` in `App.tsx`)

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

## 6. Tab Bar

```
┌──────────────┬───────────────┬──────────┬────────┬───────────────┬────────┬────────┬────────┬────────┬──────────────────┬───────┬─────────┬────────┬────────────────────┬─────────┐
│ Application  │ Annuitant(s)  │ Contacts │Contacts│ Policy Details│ Bank   │Payments│Increase│ Quote  │ Diary & Audit Trail│ Notes │ Letters │ Events │Maturities/Surrender│ LOA/POA │
│  Details     │  Details      │          │  (2nd) │               │  Acc   │        │History │Details │                    │       │         │        │                     │         │
└──────────────┴───────────────┴──────────┴────────┴───────────────┴────────┴────────┴────────┴────────┴──────────────────┴───────┴─────────┴────────┴────────────────────┴─────────┘
       ▲ active tab underlined/highlighted (`lve-tab active`), scrollable horizontally, arrow-key navigable (role="tablist")
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

---

## 7. Tab Panels — content & dynamic rendering per plan

Each tab is a white rounded panel below the tab bar. All fields/labels below
are the **current, verified** implementation.

### 7.1 Application Details
- Key dates: Set Up, Received (label becomes **"MCP Start Date"** on plan
  `90`), Start, Accept, IFA Payment.
- Status field, Suspended flag, Days Since Application (hidden on `76`/`76z`).
- Commuted Value / LTA fields shown only for plan `621`.
- Correspondence Name / Salutation / Address block (`ConnectedAddress`).
- `isCompact` mode (plans `87`, `84`, `90`) hides placeholder/blank fields and
  drops the app's 3rd column entirely for `87`.
- No sub-modals; date pickers only.

### 7.2 Annuitant(s) Details
- Personal info: Surname, Forename, DOB, Gender.
- Cause of Death block (ICD #1/#2/#3 fields, each with a "Cause of Death
  reference" tooltip) — **hidden** for plans `87, 84, 90, 80, 83, 82, 52`.
- Underwriting Ref/Date, MAR requirement fields.
- Second block for Dependant/Beneficiary.
- Plan `76z`: relabels fields "ELE"/"MRSD", disables several MAR/Doctor
  fields.
- Plan `51`: clicking NI delete surfaces a "migrated" error via
  `WinErrorDialog`.
- Sub-modals: `DoctorDatabaseModal`, `ConfirmDialog` (NI deletion), `WinErrorDialog`.

### 7.3 / 7.4 Contacts / Contacts (2nd)
- Two near-duplicate contact-detail screens (visibility rules in §6).

### 7.5 Policy Details
- Tax Code, Payment Method, ReAssurance Premium/ReAssurer, Advice Type.
- IFA Contact Details (Building/Street/City), Statements & Letters options.
- CoE (Certificate of Existence) Details, P45 Details.
- Non Std Flag (disabled) / Non Standard Policy (empty, disabled).
- Plan `87` → "Online Application" checkbox ticked; plan `90` → "Tax Free"
  checkbox ticked; plan `611` hides the "Non Standard Policy" section; plans
  `84/90/51` force initial payment method to "B" (`isBOrTaxLike84`).

### 7.6 Bank Acc Details
- Bank Sort Code / Account No / Account Name / Bank Name, Payment Ref,
  Payment Method, Change Effective Date, TOTAL, plus a Transfer History grid.
- Delete-sort-code round icon button next to Sort Code is **hidden for plans
  `621` and `51`**.
- Fields force-disabled for plans `84`, `90`, `621`.
- "Edit Bank Details" header button hidden for plans `87`, `51`.
- Plan `621`: adds a disabled "Change Effective Date" value `17/06/2026`.
- Sub-modals: `EditBankDetailsModal`, `ConfirmDialog` (delete sort code
  confirmation).

### 7.7 Payments
- Payment Summary (Premium, TFC, Gross, Taxable pay, Next Payment Due).
- Payment History grid + Tax History grid — entirely different row sets per
  plan (`PAYMENT_HISTORY_84` vs `PAYMENT_HISTORY_DEFAULT`, etc).
- Plan `0` shows a more detailed/generic grid layout (the undecorated
  baseline, per §0B).

### 7.8 Increase History
- Large interactive grid: Escalation Type, Annuity Amounts, GAD reviews,
  Bonus rates — rows swapped per plan (`ROWS_84`, `ROWS_83`, …).
- Plan `0` adds a bottom section for "New GAD Max" / "Income Restricted".

### 7.9 Quote Details
- Basis Details (Life Type, Plan Type, Frequency), LTA Details (Crystallised
  %, LSA Amount), Policy Term/Maturity, Quote History grid.
- Plan `0` shows the fullest/most detailed Basis+LTA forms (baseline view).
- `showGad` (plans `82`, `80`) reveals GAD limit/review fields.
- Sub-modal: `ViewNotionalValueModal`.

### 7.10 Diary & Audit Trail
- Diary grid (Notes, Due Date, Completed By — duplicate "By" columns fixed to
  be distinct), Audit Trail / Data Changes list.
- Data filtered per plan (`PLAN_84_DIARY`, `AUDIT_621`, etc). Plan `621` has
  its own 8-entry audit trail matching the reference screenshots.
- Sub-modals: `MiscDiaryModal`, `CustomerNeedsModal`, `CedingSchemeModal`.

### 7.11 Notes
- List of notes (Author, Date, Note #); Insert / Edit / Delete actions.
- Plan `51`: all modification disabled (`disableAll`).
- Plan `52`: Edit/Delete disabled (`disableEditDelete`).
- Sub-modal: internal `ConfirmDeleteDialog`.

### 7.12 Letters
- Letter-type dropdown (20 letter types, alphabetical — full list below),
  Letter Specific Info panel (varies per letter), Additional Text area,
  Distribution Info (Print/Fax/Email + Send To: Client/IFA/Ceding/Other).
- **Full letter list:** Certificate of Existence · Chaser Letter OS
  Application Client · Chaser Letter OS Application IFA · Claim Form ·
  Completion Pack · Death - Claim Completion Letter · Death - Dependant
  Acknowledgement Letter · Death - Initial Response Letter · Disclosure
  Check · Disclosure Check Payment Letter · Divorce - Initial Response
  Letter · Failed Disclosure Check · IFA Acceptance Pack · IRF Acceptance
  Pack inc Client Ltr · IRF Letter · MPAA Letter · Plan Schedule · Return
  Original Certificates · Rewrite Completion Pack · Transfer Forms.
- Plan `76` restricts the selectable list to **"MPAA Letter" only**.
- Distribution checkboxes derive from a per-letter config map; letters
  without an explicit entry fall back to all-disabled ("NO_DIST").
- Internal "Information" alert on validation failure.

### 7.13 Events
- Event Details grid (Date, Gross, Tax, Type); New/Edit Event form.
- "New Event" disabled for plans `51`, `611`.
- Internal modals: New Event, Edit Confirm, Delete Confirm.

### 7.14 Maturities / Surrender
- Bank Details, Payment (Claim Form Rec'd, Nature, Method), IFA Contact
  Details, Maturity/Correspondence Addresses.
- Plan `82`/`83`: "Type" pre-filled to Surrender/Maturity respectively and
  locked.
- Plan `0`: editing forced off, but shows plan-specific placeholder data
  (baseline demonstration).
- Sub-modals: `ConfirmDialog`, internal "New Maturity / Surrender Bank
  Details" modal.

### 7.15 LOA/POA
- Type (LOA or POA), Name, Company, Address, Date Appointed, Telephone.
- Plan `0` shows literal placeholder tokens (e.g. `"LoaPoaName"`) instead of
  a real name — again the non-dynamic baseline.

---

## 8. Navigation Map

```
                     [Search 🔍] toolbar button, or Options→Search (F5)
   any tab   ──────────────────────────────────────────────────────►  Find Policy Modal
                                                                            │
                                                          select row + OK   │
                                                                            ▼
                                                         setPlanCode/surname/policyRef
                                                                            │
                                                                            ▼
              Header menus / PolicyHeader / Toolbar / StatusBar / TabBar / active Tab
                    all re-render using the newly selected plan's booleans
                                                                            │
                click a Tab in the Tab Bar (or Header menu "switch tab" events)
                                                                            ▼
                                                                    <selected tab panel>
```

- The 15 tabs are peers — any tab can be reached directly from the Tab Bar
  once a policy is loaded; there is no forced linear order.
- Every popup/modal listed in §2–§7 is opened from either a Header menu item,
  a Toolbar button, or an in-tab action button, and closes back to the exact
  screen/tab it was opened from (no full-page navigation occurs — the shell
  never unmounts).

---

## 9. Layout & Placement Validation Notes

Cross-checked against the current source (`App.tsx`, `Header.tsx`,
`Toolbar.tsx`, `PolicyHeader.tsx`, `TabBar.tsx`, `StatusBar.tsx`,
`Footer.tsx`, all `tabs/*.tsx`, `FindPolicyModal.tsx`, `PlanCodeContext.tsx`):

- Page shell = `min-h-screen flex flex-col bg-[#f0f0f0]`; `<main>` uses
  `flex-1 px-[142px] py-8`; Footer uses `mt-auto` to stay pinned to the
  bottom — confirmed in `App.tsx` lines 123–143.
- Toolbar buttons render in a single `flex flex-wrap` row above
  PolicyHeader, `mb-6` gap; each is `lve-btn-sm`, with the active Edit/Save
  toggle styled as **primary** (`lve-btn`) while every other tool uses
  **secondary** (`lve-btn lve-btn-secondary`).
- PolicyHeader is one horizontally-scrollable `flex flex-nowrap` row,
  `lve-panel mb-6 p-4`; every "conditional" pill has a matching
  same-sized empty placeholder block when hidden, so the row's overall
  width/alignment never shifts between plan codes — verified in
  `PolicyHeader.tsx` (e.g. lines 47–53, 77–83, 98–108).
- TabBar renders as a single non-wrapping `flex` row inside a horizontally
  scrollable container (mouse-wheel horizontal scroll wired up), each tab
  `role="tab"`, arrow-key navigable.
- StatusBar is `sticky bottom-0` directly above the Footer inside `<main>`,
  a `flex flex-wrap gap-6` row of label/value pairs.
- All plan-code-specific values are string ternaries chained per field
  (`isPlanXX ? "…" : isPlanYY ? "…" : … : "<placeholder>"`), so every field's
  fallback (right-most branch) is the "plan 0 style" undynamic placeholder
  described in §0B — this pattern was spot-checked across
  `ApplicationDetailsTab.tsx`, `PolicyDetailsTab.tsx`, `BankAccDetailsTab.tsx`.
- Recent verified fixes reflected in this document: Letters tab now lists the
  full 20-item alphabetical set (§7.12); the Bank Acc "delete sort code"
  button correctly hides for both `621` and `51`; the `Header.tsx` "Ceding
  Scheme Details" Process-menu item now fires the `ceding-scheme` action for
  plan `87` (previously a no-op, matching the plan-`0` "unwired menu item"
  pattern described in §2A).

---

## 10. Summary — what "dynamic rendering" means in this app

1. **One shared value** (`planCode`, 15 possible states) flows into nearly
   every component via `PlanCodeContext`.
2. **Every screen re-derives its own booleans** from that value locally
   (`isPlan87`, etc.) rather than the value being interpreted centrally —
   so each tab/menu/panel independently decides what to show.
3. **Plan `0` is the deliberate control case**: it is what the screen looks
   like when *none* of those booleans are true — blank/placeholder data,
   unwired menu actions, and the most "generic" layout variant where one
   exists. It exists specifically so the base, non-dynamic version of each
   screen can be inspected on its own.
4. Switching plan codes (via **Find Policy**) is the only way to navigate
   between the 15 versions — there are no separate URLs/routes per version.
