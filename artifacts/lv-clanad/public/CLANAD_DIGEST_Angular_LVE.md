# LV= CLANAD — Application Digest

## 1. Application

| Field | Value |
| --- | --- |
| Name | LV= CLANAD (Client Annuity Administration System) |
| Version | 1.0.0 |
| Type | Static web app (no backend) — recreation of a legacy Windows back-office annuity administration system, presented in the LVE Component Library design system |
| Description | Liverpool Victoria (LVE) internal back-office tool for administering annuity policies. Staff load one of 15 sample policy versions ("plan codes") via **Find Policy**, then review/edit its details across 15 tabs (Application Details, Annuitant(s), Contacts ×2, Policy Details, Bank Acc, Payments, Increase History, Quote Details, Diary & Audit Trail, Notes, Letters, Events, Maturities/Surrender, LOA/POA). Header menus and toolbar buttons expose ~35 further modal workflows (print/reporting, supervisory overrides, lookups). All data is hard-coded sample data; no persistence. |
| Framework | Angular (standalone components, `inject()`-based services, `async` pipe over RxJS `BehaviorSubject`s) + TypeScript |
| Styling | Tailwind CSS v4; design tokens in `src/index.css` `@theme` block; `--radius: 30px` pill buttons, `8px` panel/input radius; `body { zoom: 0.8 }` legacy-density scale |
| Icons | `react-icons/md` (Material Design Line Icons) — the app's **exclusive** icon set (`MdEdit`, `MdAdd`, `MdDelete`, `MdCheck`, `MdClose`, `MdSearch`, `MdPrint`, `MdCancel`, `MdClear`, `MdFileUpload`, `MdSend`, `MdNoteAdd`, `MdCheckCircleOutline`, `MdManageSearch`, `MdGroups`, `MdMedicalServices`, `MdSkipPrevious`, `MdErrorOutline`, and more) |
| UI Kit | Custom LVE component classes (`.lve-btn`, `.lve-input`, `.lve-tab`, `.lve-panel`, `.lve-grid`, `.lve-label`) layered over Radix UI primitives (`Dialog`, `Popover`, `Select`, `Checkbox`, `RadioGroup`, `Tabs`, `Tooltip`) |
| Date handling | `date-fns` for formatting/arithmetic; custom `DatePicker` (masked input + calendar popover), no `react-day-picker` dependency for the CLANAD-specific pickers |
| Routing | `wouter` — single route (`/`); the entire app is one screen with 15 `*ngSwitch`-style tab panels, not 15 separate routes |
| State | App-wide shared state via 4 top-level context providers (Angular: injectable services) — `PlanCodeService`, `EditModeService`, `ChequesService`, `ShortcutRegistryService`; each tab also owns local component state for its own field values |
| Data store | None — frontend-only. Every grid, dropdown, and field value is a hard-coded constant selected by the active plan code |
| Auth | No server auth — header shows a static **Logout** control |
| Build | Vite → static `dist/public/` output; reads `PORT` and `BASE_PATH` env vars at startup |

### Fonts

| Role | Family |
| --- | --- |
| Headers / buttons / tabs | Livvic (`--font-sans`) |
| Body / inputs / data grids | Mulish (`--font-body`) |

### Brand colours (`src/index.css` `@theme`)

| Token | Hex | Usage |
| --- | --- | --- |
| `--color-lve-primary` | `#006cf4` | Primary button fill, focus rings |
| `--color-lve-primary-hover` | `#003578` | Primary button hover |
| `--color-lve-navy` | `#00263e` | Header bar background |
| `--color-lve-dark-navy` | `#002f5c` | Panel headers, data-grid dark accents; **default modal accent** |
| `--color-lve-link` | `#005a9c` | Link text |
| `--color-lve-secondary` | `#04589b` | Secondary button text/border, grid header borders |
| `--color-lve-highlight` | `#05579B` | Grid row hover background |
| `--color-lve-green` | `#178830` | Focus-visible ring, input focus border |
| `--color-lve-error` | `#d72714` | Error/destructive state |
| `--color-lve-disabled` | `#979797` | Disabled button background |
| `--color-lve-body` | `#3d3d3d` | Body text |
| `--color-lve-border` | `#BBBBBB` | Input/card borders |
| `--color-lve-disabled-bg` | `#CCCCCC` | Disabled input background |
| `--color-lve-disabled-border` | `#ACACAC` | Disabled input border |
| `--color-lve-tab-inactive-bg` | `#eaf5f8` | Inactive tab background |
| `--color-lve-tab-active-text` | `#4a4a49` | Active tab text |
| `--color-lve-tab-inactive-text` | `#0d2c41` | Inactive tab text |
| `--color-lve-weekday-bg` | `#eef4f8` | Calendar weekday header |
| `--color-lve-page-bg` | `#f0f0f0` | App background |
| `--color-lve-row-alt` | `#e7ebec34` | Data-grid zebra striping |
| scrollbar thumb | `#62bda8` | Custom scrollbar |

**Plan-code accent pairs** (`--lve-accent` / `--lve-accent-fg`, applied to the Policy Header pill and per-tab panel headers — see §6):

| Plan(s) | Accent bg | Accent fg |
| --- | --- | --- |
| `0` | `#848285` | `#ffffff` |
| `87` | `#F28C28` | `#ffffff` |
| `84`, `80`, `82`, `83` | `#BEE4BE` | `#023E02` |
| `90` | `#F4D9E8` | `#710340` |
| `51`, `621`, `76`, `76z`, `62a`, `611`, `52`, `61a` | `#000080` | `#ffffff` |

Modals/popups never use the policy accent — the `div[class*="fixed"][class*="inset-0"]` rule forces every overlay back to `--color-lve-dark-navy` / white, so dialogs stay visually neutral regardless of which policy is loaded.

---

## 2. Global Components

### 2.1 Header (`app-header`)

```yaml
selector: app-header
background: "#00263e"
padding: "py-5 px-[142px]"
left:
  - logo:
      component: app-logo (variant=light)
  - divider: "h-8 w-px bg-slate-600/50"
  - title:
      text: "Client Annuity Administration System"  # static @Input()
      font: "Livvic 30px white"
right:
  - menu_triggers:
      - Options   (dropdown, see §7)
      - Process   (dropdown)
      - Print     (dropdown)
      - Supervisor (dropdown)
      - Help      (dropdown)
  - logout_button:
      label: "Logout"
      variant: ghost, white text
menu_visibility_by_plan:
  reduced_set: ["51", "62a", "611", "61a", "52"]   # Options + Print + Help only
  full_set: "all other plan codes"
inputs:
  - planCode$: injected via PlanCodeService (drives which MENU_ITEMS config renders per menu)
outputs:
  - switchTab: CustomEvent equivalent — emits a tab key so menu actions can jump to a specific tab
```

### 2.2 Footer (`app-footer`)

```yaml
selector: app-footer
background: white
border: "border-t border-slate-200"
layout: "flex justify-between items-center; pinned to bottom (mt-auto)"
left:
  - logo: app-logo (variant=dark)
right:
  - address: "Liverpool Victoria Friendly Society Limited, County Gates, Bournemouth BH1 2NF. Authorised by the PRA, regulated by the FCA and PRA."
    font: "10px right-aligned #94a3b8"
```

### 2.3 Toolbar (`app-toolbar`)

```yaml
selector: app-toolbar
position: "directly below app-header, inside the main content area"
buttons:
  - New App:    { icon: MdAdd,        opens: ConfirmDialog "Create a new Application?" -> QuoteLookupModal }
  - New Quote:  { icon: MdNoteAdd,    enabled_when: "isPlan87", else: always disabled (placeholder) }
  - Sim App:    { icon: MdContentCopy, opens: ConfirmDialog "generate simultaneous policy?" -> QuoteLookupModal, hidden_for: ["51", "76"] }
  - Edit/Save:  { icon: "MdEdit / MdCheck", toggles: EditModeService.editing$, hidden_for: ["76", "84"] }  # plan 84 is deceased — no edits permitted
  - Cancel:     { icon: MdCancel,     enabled_when: "editing && planCode != '51'" }
  - Search:     { icon: MdSearch,     opens: FindPolicyModal }
  - Log:        { icon: MdSchedule,   opens: ChequeLoggerModal, hidden_for: ["51","62a","611","52","84","90","621"] }  # 84 drops both Edit and Log
  - CRS:        { icon: MdArchive,    opens: CrsModal }
  - Reports:    { icon: MdAssessment, opens: ReportsModal }
  - Company:    { icon: MdBusiness,   opens: CompanySelectionModal }
inputs:
  - editing$: from EditModeService
  - planCode$: from PlanCodeService (button-set trimming)
```

### 2.4 Policy Header (`app-policy-header`)

```yaml
selector: app-policy-header
layout: "single horizontally-scrollable row"
elements:
  - policy_no_selector: dropdown-styled button, chevron icon
  - find_application_link: icon-only, external-link style
  - company_pill:
      text: "Liverpool Victoria Friendly Society Limited"
      rule: "shown for every named plan code; EMPTY placeholder block for plan '0'"
  - clanad_number_pill: "policyRef$ value, e.g. 227813"
  - plan_code_pill:
      background: "var(--lve-accent)"
      color: "var(--lve-accent-fg)"
      text: "planCode$ value ('76z' displays truncated as '76')"
  - surname_pill: "same accent colours, surname$ value"
  - simultaneous_policies_pill:
      rule: "shown only for plans 84, 51, 80, 83, 62a, 611, 61a; else empty placeholder block"
      action: "opens SimultaneousPoliciesDialog"
  - policy_type_badge:
      "90": "MONTHLY CASH POLICY (pink)"
      "83": "RETIREMENT ACCOUNT (cyan)"
      default: "empty placeholder block"
inputs:
  - planCode$, surname$, policyRef$: from PlanCodeService
```

### 2.5 Tab Bar (`app-tab-bar`)

```yaml
selector: app-tab-bar
role: "tablist (ARIA tab pattern, CDK FocusKeyManager equivalent)"
tabs:
  - application, annuitant, contacts, contacts2, policy, bank, payments,
    increase, quote, diary, notes, letters, events, maturities, loa
visibility_by_plan:
  all_15_tabs: ["0", "621", any unlisted code]
  hide_both_contacts_tabs: ["611","61a","87","84","90","51","80","82","62a","52"]  # 13 tabs
  hide_contacts2_only: ["83","76","76z"]  # 14 tabs
outputs:
  - tabChange: emits the selected TabKey to the shell, which swaps the active panel via [ngSwitch]
```

### 2.6 Status Bar (`app-status-bar`)

```yaml
selector: app-status-bar
position: "bottom of main content area, above app-footer"
layout: "wrapping row of label/value pairs"
fields:
  - Status: "text derived from planCode -> STATUS_LABEL map (LIVE / MIGRATED / PENDING / Maturity Pending / Matured / Surrendered / Death Pending / DEAD / CANCELLED / SHELVED - Ntu / SHELVED - Duplicate / EXPIRED)"
  - label_Illustration_or_SIPP_Pol: "label = 'SIPP Pol' only for plan 90; 'Illustration' for all others; plan 84 value = 2139419"
  - Variant: "plan 84 = 4; plan 90 has no Variant shown"
  - RAQ ID: "plan 84 = blank; plan 87 = RAQ233845; plan 90 = blank; others = blank or —"
  - User: "UAT1 (83, 51, 62a, 90, 87), UAT2 (84), UAT3 (all others)"
```

### 2.7 App shell composition

```yaml
root: app-shell (min-h-screen flex flex-col bg-[#f0f0f0])
providers: [ShortcutRegistryService, EditModeService, ChequesService, PlanCodeService]
tree:
  - app-header
  - main (flex-1 px-[142px] py-8):
      - app-toolbar
      - app-policy-header
      - app-tab-bar
      - "<active tab panel> (bg-white rounded-b-lg rounded-tr-lg shadow-sm p-6)"
      - app-status-bar
  - app-footer
```

---

## 3. The 15 Plan Codes — dynamic rendering model

This is the single most important mechanic in the app: **one shared value,
the active plan code, drives every visual and behavioural difference across
every screen.**

### 3.1 How it works

```yaml
service: PlanCodeService (providedIn: 'root')
state:
  planCode$: "BehaviorSubject<PlanCodeVersion>, boots on '90'"
  surname$:  "BehaviorSubject<string>, boots on 'TESTCTCCHIBD'"
  policyRef$: "BehaviorSubject<string>, boots on '227813'"
consumption_pattern: >
  Every component that needs plan-aware behaviour injects PlanCodeService
  and subscribes via the async pipe. Rather than a central switch statement,
  EACH component independently derives its own booleans
  (isPlan87, isPlan84, isPlan90, isPlan51, isPlan83, isPlan82, isPlan80,
  isPlan621, isPlan76, isPlan76z, isPlan62a, isPlan611, isPlan52, isPlan61a,
  isPlan0) from the current planCode$ value and uses them in *ngIf /
  [ngClass] / [hidden] bindings and chained ternary field-value expressions.
what_changes_per_plan:
  - which fields are shown/hidden on a tab
  - the hard-coded sample values displayed in those fields
  - enabled/disabled state of individual inputs and whole action buttons
  - which of the 15 tabs appear in the tab strip at all
  - which items appear under Options/Process/Print/Supervisor, and whether
    they're wired to a real handler or are inert placeholders
  - the Status Bar wording and the Policy Header accent colour/pills
mutation: "Only PlanCodeService.select(planCode, surname, policyRef), called from FindPolicyModal's OK action, changes this state — everything else only reads it."
```

### 3.2 The 15 versions

| Plan Code | Plan Type | Description | Status shown |
| --- | --- | --- | --- |
| `0` | master | **Master — non-dynamic baseline** (see §3.3) | n/a |
| `87` | FTA | Standard controls | PENDING |
| `84` | PRP | Full controls (incl. GAD & IR); policy holder deceased | DEAD |
| `90` | MCP | Monthly Cash Policy — default on load | LIVE |
| `51` | CPA | Status Q | MIGRATED |
| `83` | PRP | Status W | Maturity Pending |
| `80` | PRP | Status M | Matured |
| `82` | PRP | Status S | Surrendered |
| `621` | PPA | Status I | Death Pending |
| `76` | ICFP | Status D | DEAD |
| `76z` | ICFP | Status Z | Death Pending |
| `62a` | PPA | Status C | CANCELLED |
| `611` | CPA | Status N | SHELVED - Ntu |
| `52` | PPA | Status X | SHELVED - Duplicate |
| `61a` | CPA | Status E | EXPIRED |

### 3.3 Plan `0` — the deliberate "no dynamic rendering" case

Plan `0` is not a real policy version — it's a **control case** proving what
every screen looks like with zero plan-specific data wired up:

- In **Find Policy**, its row shows only 4 of 12 columns populated
  (`POLICY_REF`, `PLANTYPE`, `PLAN_CODE`, `SURNAME`); every other cell is blank.
- Across every tab, since none of the `isPlanXX` booleans are true, each
  field's ternary chain falls through to its final/default branch — an empty
  string, a raw legacy placeholder token (e.g. `"dbday"`, `"edtStartdate"`),
  or (Payments/Increase History/Quote/Maturities/LOA) a more detailed generic
  layout kept specifically to let the "undecorated" screen shape be reviewed.
- No plan-specific business rules apply: no forced-disabled fields, no
  Simultaneous Policies chip, no coloured status pill, several base
  Options/Process menu items render with **no click handler wired** at all.
- Practically: plan `0` = "what this screen looks like before any
  plan-code-specific behaviour is layered on top."

```
PlanCodeService.planCode$ (async pipe, shared across the whole tree)
        |
   +----+-----------------------------------------+
   |                    |                          |
app-header         app-toolbar              <tab panel>*15
(menu config)      (button set)             (isPlanXX -> fields/values/enabled)
   |                    |                          |
   +----+-----------------------------------------+
        |
app-policy-header / app-status-bar / app-tab-bar
(accent colour, status text, tab visibility)
```

---

## 4. Screens (Tab Panels)

All 15 tabs render inside the single `/` route, swapped via `[ngSwitch]` on
the active `TabKey` — there is no separate route per tab.

### 4.1 Application Details (`app-tab-application`)

```yaml
sections:
  - main_grid: "4 columns"
    col1: [Set Up Date, Received/MCP Start Date, Start/Payment Date, WPPA amend notif From/To, Accept Date, IFA Payment Date, PostADay, Transfer from Beneficiary Drawdown?]
    col2: [Special Status, Final Quote Issued Date, Status, Suspended, Days Since Application, Commuted Value, LTA Details, Hosp'd Date]
    col3: [GAD Anniversary (D/M/Y), Life One Dead, Life Two Dead, Completed, Closed, Age at death, Gross £, Paid net + Date Paid, Payee, Trustee, "Create payment... button"]
    col4: [Quote Expiry Date, Last amended by, App Created by, Final Quote Issued by, Rates Ok'd by, Paykey, Policy No, Dependant Eligible to Receive Benefits]
  - correspondence_details: [Correspond Name, Salutation Name, Telephone, E-mail]
  - correspondence_address: [Address x5, Postcode, Country, Address Unknown/Gone Away]
plan_variants:
  "90": "Received label -> 'MCP Start Date'"
  "76,76z": "Days Since Application hidden"
  "621": "Commuted Value / LTA fields shown"
  "87,84,90": "compact mode — blank/placeholder fields dropped; col4 dropped entirely for 87"
  "84": "death-state values: Status=D, Suspended=Y, Life One Dead=Y, Closed=16/06/2026 1, Age at death=62, Gross £=6222.8; death payment block visible; Dependant Eligible=N"
modals: none
```

### 4.2 Annuitant(s) Details (`app-tab-annuitant`)

```yaml
sections:
  - annuitant: "3-column AnnuitantBlock"
    col1: [Surname, Forename, 2nd Name, Short Name, Cause of Death (ICD#1-3)]
    col2: [DOB, DOD, Death Cert Received?, Enhanced?, Doctor (+DoctorDatabaseModal trigger), Doctor Name, Nat ins no (+delete), Gender]
    col3: [ELE, MRSD, MAR required?, MAR Copy to PH?, Date MAR Sent, Date MAR Received, U/W Ref, U/W Date, Days Since U/W]
  - dependant_second_beneficiary: "same AnnuitantBlock minus Short Name & U/W fields"
plan_variants:
  "87,90,80,83,82,52": "Cause of Death block hidden"
  "84": "Cause of Death block VISIBLE (deceased); DOD = 03/03/2021; DOD field enabled"
  "76z": "relabels ELE/MRSD, disables several MAR/Doctor fields"
  "51": "NI delete triggers WinErrorDialog ('migrated' error)"
modals: [DoctorDatabaseModal, ConfirmDialog (NI delete), WinErrorDialog]
```

### 4.3 Contacts (`app-tab-contacts`)

```yaml
layout: "2-column grid, 4 panels"
panels:
  - Annuitant: [Corres Name, Salutation, Address x5 +Clear, Postcode, Tel.]
  - Power of Attorney: [Corres Name, Salutation, Co. Name, Address x5 +Clear, Postcode, Tel., Relationship, POA Received?]
  - Care Provider: [Corres Name, Salutation, Prov. Name, Address x5 +Clear, Postcode, Tel., Provider ID, Contract Received?]
  - Applicant: [Corres Name, Salutation, Co. Name, Address x5 +Clear, Postcode, Tel., Relationship]
visible_for_plans: "not in [611,61a,87,84,90,51,80,82,62a,52]"
modals: none
```

### 4.4 Contacts — 2nd (`app-tab-contacts2`)

```yaml
layout: "2-column grid, 3 panels"
panels:
  - Scheme Details: [Corres Name, Salutation Name, Wrapper Name, Address x5 +Clear, Postcode, Tel., Wrapper Policy No]
  - Annuitant: [Corres Name, Salutation, Address x5 +Clear, Postcode, Tel.]
  - Sales Office/IFA Details: [Corres Name, Salutation, Name, Address x5 +Clear, Postcode, Tel.]
visible_for_plans: "not in the §4.3 exclusion list, and not in [83,76,76z]"
modals: none
```

### 4.5 Policy Details (`app-tab-policy`)

```yaml
columns:
  col1_policy_details: [Online Application, Tax Code+TaxFree, Initial payment method, Pay TFC by, IR Max Pension, IR Balance, ReAssurance Premium, ReAssurer, Evidence of Age, Advice Type, Distribution Channel, Money Laundering Form, Advised Sale Info, Internal Maturity Transfer, Scheme Pension, Purchaser, Policy Owner]
  col2: [Non Std Flag, Non Standard Policy, "IFA Contact Details (Name/Building/Street/City/District/County/PostCode/FAO/Email/Tel)"]
  col3: [Statements & Letters, Certificate of Existence Details (8 fields), P45 Details (3 fields), Adviser Charge + Serious ill health, IFA Details (Ref/Comm%/Commission/Key Account/Region), MPAA (2 fields)]
plan_variants:
  "87": "Online Application ticked"
  "90": "Tax Free ticked"
  "611": "Non Standard Policy section hidden"
  "84,90,51": "Initial payment method forced to B"
  "84_disabled_fields": "Purchaser, Policy Owner, Initial payment method, Pay TFC by, Advice Type, Issue Statements, Copy Ann. Stmt to IFA, Copy Ann. Stmt to PH, Issue wake-up/maturity letters — all read-only (policy is deceased)"
  "84_enabled_fields": "Deceased Date and Notification Date pickers enabled (to record date-of-death notification)"
modals: none
```

### 4.6 Bank Acc Details (`app-tab-bank`)

```yaml
sections:
  - bank_details: [Bank sort code+Delete, Payment Ref, Bank account no, Payment Method, Bank account name, Change Effective Date, Bank name, TOTAL], header_button: "Edit Bank Details"
  - transfer_history: {grid: [Transfer Company, Date, Amount]}
plan_variants:
  "621,51": "sort-code Delete button hidden"
  "84,90,621": "fields force-disabled"
  "87,51": "Edit Bank Details button hidden"
  "621": "adds disabled Change Effective Date = 17/06/2026"
modals: [EditBankDetailsModal, ConfirmDialog (delete sort code)]
```

### 4.7 Payments (`app-tab-payments`)

```yaml
sections:
  - payment_summary: {fields: [Premium, TFC, Total, 1st/2nd Annuitants Gross, Cumulative Instal, BAL Gross Annuity, BAL Capital Element, Taxable pay, Cumulative Free Pay, PAYE Tax Due To Date, PAYE Tax Deduction, Next Anniversary, Next Payment Due, Inst Remaining, Nth Inst.], header_button: Import}
  - payment_history: {grid: [Date, Gross £, Cap £, Tax £, Post Adj £, Net £, Method, Reason, BACS date, Hash]}
  - tax_history: {grid: [Date, Code, N, Gross £, Cum Gross £, Free Pay, Taxable Pay, Tax, YTD Tax]}
plan_variants: "row sets swapped per plan; plan 0 shows the fullest/generic grid layout"
modals: none
```

### 4.8 Increase History (`app-tab-increase`)

```yaml
grid_columns: [Type, Status, Statement Issue Date, Policy Anniversary Date, Previous Annuity Amount, New Annuity Amount, Escalation Type, Esc Rate, New Basic Annual Income, Regular Annual Bonus Rate, Topup Bonus Rate, Regular Bonus Dec Date, Topup Bonus Amount, Topup Bonus Dec Date, Guar Charge, Fund Mngmnt Charge, Next GAD review date, GAD Maximum, Withheld Income, Income Restricted, Mutual Bonus Added, New Guarantee Min Income, New Yearly Income Before Guarantee, Declared Investment Return]
plan_0_extra_fields: [New GAD Max, Income Restricted, New Annuity Amount, Withheld Income, Previous Annuity Amount]
modals: none
```

### 4.9 Quote Details (`app-tab-quote`)

```yaml
sections:
  - basis_details: "~25 fields — Life Type, Plan Type, Overlap, Payments, Frequency, DMT, ELE, Capital Protection?, Original Amnt Vested, Withheld Minimal Income, Series, Policy Type, Last Survivor?, Escalation Rate/Type, Max TFC, Value Protection, Policy Term, Last Payment/Maturity Date, Guaranteed Maturity, GAD limits/review, Notional Value, Value Date, Total Withheld Minimal Income, Total Mutual Bonus"
    button: "View Notional Value -> ViewNotionalValueModal"
  - lta_details: "~13 fields — LTA% Crystallised, Scheme Name, NHMRC Scheme Pension No, Standard Lifetime Allowance, First BCE, LTA Protection type, Enhancement, HMRC Certificate Number, % Crystallised Post 5 Apr 2024, Cumulative LTA%, LTA Excess Tax, Net LTA Excess Lumpsum, Pensions In Payment LTA%, LSA Amount, PCLS Protection"
  - grid: [Type, Premium, TFC Amount, Original Income, Esc Type, Esc Rate%, Current Income, Spouse %, Spouse Income, Guarantee, Last Pay Under Guarantee, Overlap, Value Protection %, Tax Free %, Max TFC, Value Protection Flag, LS_CONVERT, Plan Protection %, DEPENDANT]
plan_variants: "plan 0 shows the fullest Basis+LTA form; showGad (82,80) reveals GAD limit/review fields"
modals: [ViewNotionalValueModal]
```

### 4.10 Diary & Audit Trail (`app-tab-diary`)

```yaml
sections:
  - diary: {grid: [Ref, Type, Notes, Created, By, Due, Completed, By], buttons: [Insert Record, Edit Record, Complete, Check Ceding Scheme, View Customer Needs]}
  - data_changes: {grid: [Change Date, Description, User ID]}
  - audit: {list: "plain-text audit note lines"}
plan_variants: "grid data filtered per plan; plan 621 has its own 8-entry audit trail"
modals: [MiscDiaryModal, CustomerNeedsModal, CedingSchemeModal]
```

### 4.11 Notes (`app-tab-notes`)

```yaml
header_buttons: [Insert Record, Delete Record, Edit Record, Post Edit, Cancel Edit]
content: "vertical list of note cards — author initials+name, date, note #, non-editable prefix, editable body textarea when active"
plan_variants:
  "51": "all modification disabled"
  "52": "Edit/Delete disabled"
modals: [ConfirmDeleteDialog]
```

### 4.12 Letters (`app-tab-letters`)

```yaml
sections:
  - select_letter: {field: "Letter/Pack dropdown"}
  - letter_specific_info: "contextual fields per selected letter"
  - additional_text: {field: textarea}
  - distribution_info: {fields: [Print, Fax+input, Email+input, Archive], send_to: [Client, IFA, Ceding Scheme, Other]}
  button: "Generate"
letter_list_20_alphabetical: [Certificate of Existence, Chaser Letter OS Application Client, Chaser Letter OS Application IFA, Claim Form, Completion Pack, Death - Claim Completion Letter, Death - Dependant Acknowledgement Letter, Death - Initial Response Letter, Disclosure Check, Disclosure Check Payment Letter, Divorce - Initial Response Letter, Failed Disclosure Check, IFA Acceptance Pack, IRF Acceptance Pack inc Client Ltr, IRF Letter, MPAA Letter, Plan Schedule, Return Original Certificates, Rewrite Completion Pack, Transfer Forms]
plan_variants: "plan 76 restricts selectable list to 'MPAA Letter' only"
modals: "shared app-alert-dialog on validation failure"
```

### 4.13 Events (`app-tab-events`)

```yaml
grid_columns: [Date of Event, Event No, Gross Amount, Tax Amount, Event Type]
buttons: [New Event, Edit Event, Delete Event]
plan_variants: "New Event disabled for plans 51, 611"
modals: ["New/Edit Event dialog", "EditConfirm (Yes/No)", "DeleteConfirm (Yes/Cancel)"]
```

### 4.14 Maturities/Surrender (`app-tab-maturities`)

```yaml
sections:
  - bank_details: [Type, Bank sort code+delete, Bank account no, Bank account name, Bank name, Payment Ref, Change Effective Date], header_button: "Edit Bank Details"
  - payment: [Claim Form Received, Nature of Payment, Payment Method, Payment Date, Gross, Tax, Net], button: "Create payment..."
  - ifa_contact_details: [Name, Building, City, County, Postcode, FAO]
  - maturity_destination_block: [Maturity Destination, Correspondence Name, Salutation, Telephone]
  - maturity_surrender_address: [Address x5, Postcode, Country]
  - correspondence_address: [Address x5, Postcode, Country]
plan_variants:
  "82,83": "Type pre-filled + locked to Surrender/Maturity respectively"
  "0": "editing forced off, shows placeholder baseline data"
modals: [ConfirmDialog, "New Maturity/Surrender Bank Details dialog"]
```

### 4.15 LOA/POA (`app-tab-loa`)

```yaml
fields: [LOA/POA dropdown, Name, Company, Address x3, Postal Code, Date Appointed, Telephone]
header_buttons: [Edit, Save, Cancel]
plan_variants: "plan 0 shows literal placeholder tokens (e.g. 'LoaPoaName') instead of real data"
modals: none
```

---

## 5. Header Menus (Options / Process / Print / Supervisor / Help)

```yaml
Options: [Screen Print (F1), Check Completion, Amend IFA, Search (F5)]
Process: ["Payment Forecast", "N.I Sweep", "P45 details ▶", "Monthly ▶", "Ceding Scheme Details", "Cancel LTC (disabled)"]
Print: ["Print MAR ▶", "Auto Set Live Report", "Diary Report"]
Supervisor: [
  "Final Quote Issued", "Status Change ▶", "Amend Cheques", "Amend IFA",
  "Approve Bank Changes", "Approve Maturity Bank Detail Changes", "Set Live",
  "Force Set Live", "Set Status To Hold", "Set Status To Pending",
  "Reprint Annual Statements", "Annual Statement Recalculation",
  "Reprint Maturity Letters", "Tracesmart error - make policy editable"
]
Help: ["About", "Keyboard Shortcuts"]
submenus:
  "Status Change ▶": [NTU, Backdate, Cancel, XDuplicate, Surrender, Maturity]
  "P45 details ▶": [P45 Details]
  "Monthly ▶": [Monthly Processing]
  "Print MAR ▶": ["1st Life MAR", "2nd Life MAR"]
menu_variance_by_plan:
  "51,62a,611,61a,52": "Options+Print+Help only (reduced item sets)"
  "87": "Process overrides P45 details / Ceding Scheme Details with real handlers; Supervisor -> SUPERVISOR_87"
  "80,82,83": "Options -> OPTIONS_84; Process adds Set Dead ▶, Payments ▶ Suspend, PLA Cancellation; Print/Supervisor plan-specific"
  "84,90": "Supervisor -> SUPERVISOR_84 (plan 84, deceased policy) or SUPERVISOR_90 (plan 90, adds Expired + Cancel Application)"
  "621": "Options->OPTIONS_84, Process->PROCESS_83, Print->PRINT_84, Supervisor->SUPERVISOR_83"
  "76": "Process->PROCESS_76, Supervisor->SUPERVISOR_84"
  "76z": "Process->PROCESS_76z, Print->PRINT_82, Supervisor->SUPERVISOR_83"
  "0": "base MENU_ITEMS — several items (base Ceding Scheme Details, Payment Forecast, N.I Sweep) render with NO click handler wired"
```

---

## 6. Modals, Dialogs & Popups

Every modal is opened through a single shared `DialogService.open(...)` call
(Angular CDK Dialog / Material Dialog equivalent) and always renders with the
navy/white "default" accent regardless of the loaded policy's colour.

### 6.1 Find Policy (`app-find-policy-modal`) — the plan-code switcher

```yaml
title: "Find Policy"
filters: "(●) Pending / Completed / Shelved / ALL — radio group filtering by STATUS column"
grid_columns: [POLICY_REF, PLANTYPE, PLAN_CODE, SURNAME_1_UPPER, NAT_INS_NO_1, ORIGINALQUOTE, STATUS, PH_POST_CODE, IFA_REF, DOB_1, POLICY_NO, COCODE]
rows: "15 (one per plan code); plan 0's row only populates 4 of 12 columns"
buttons: [OK, Cancel]
on_ok: "PlanCodeService.select(planCode, surname, policyRef) — drives all dynamic rendering in §3"
```

A simpler field-search variant (Policy Number / Surname / Postcode + Search/
Cancel) is also reachable from certain grid "Locate" actions.

### 6.2 Global / standalone modals (alphabetical)

```yaml
AboutModal:
  title: About
  body: [LV= logo, "Client Annuity Administration System (CLANAD)", "Version 1.0.0", "© 2024 Liverpool Victoria Financial Services Limited"]
  buttons: [OK]

AmendChequesModal:
  title: Amend Cheques
  body: ["Enter new value for the Cheque Status field.", "Status dropdown: Cleared/Cancelled/Stale/Stopped/Re-issued"]
  buttons: [OK, Cancel]

AmendIfaModal:
  title: Amend IFA
  body: ["Current IFA (read-only)", "New IFA input + search button"]
  buttons: [OK, Cancel]

BankChangesReportModal:
  title: Bank Changes Report
  body: ["date range prompt", "From Date", "To Date"]
  buttons: [OK, Cancel]

CedingSchemeModal:
  title: Ceding Scheme
  body: ["select-a-scheme prompt", "grid: Scheme Name | Address | Postcode"]
  buttons: [OK, Cancel]

ChequeLoggerModal:
  title: Cheque Logger
  toolbar: [New Record, Edit Record, Delete Record, Print List]
  grid: [Date Received, Payee Name, Amount, Cheque No, Bank Sort Code, Account No]
  buttons: [OK, Cancel]

CompanySelectionModal:
  title: Company Selection
  body: ["select-a-company prompt", "grid: CoCode | Company Name"]
  buttons: [Select, Cancel]

CompletionCheckerModal:
  title: Completion Checker
  body: ["policy-completion prompt", "grid: Check Description | Status | Action Required"]
  buttons: [OK]

ConfirmDialog:
  title: Confirm
  body: "dynamic message (e.g. 'Are you sure?')"
  buttons: [Yes, No]
  reused_by: ["New App", "Sim App", NI-delete, sort-code delete, Maturities Bank confirm, and more"

ConfirmDeleteDialog:
  title: "Client Annuity Administration System"
  body: "Delete record?"
  buttons: [OK, Cancel]
  scope: Notes tab

CopyP60Modal:
  title: Copy P60
  body: ["tax-year prompt", "Tax Year dropdown: 2023/24, 2022/23, 2021/22"]
  buttons: [Print, Cancel]

CrsModal:
  title: "CRS / Fatca"
  body:
    - "CRS Status fieldset: Self-Certification Status, Date Received"
    - "Tax Residency fieldset: grid [Country of Tax Residence, TIN, Reason TIN not available] + Add/Remove"
  buttons: [OK, Cancel]

CustomerNeedsModal:
  title: Customer Needs
  body:
    - "Vulnerable Customer: Vulnerable?, Vulnerability Category, Notes textarea"
    - "Power of Attorney: PoA in place?, PoA Type"
  buttons: [Save, Cancel]

DoctorDatabaseModal:
  title: Doctor Database
  toolbar: [Search, Add Doctor]
  grid: [Doctor Name, Surgery, Address, Postcode, Telephone]
  buttons: [Select, Cancel]

EditBankDetailsModal:
  title: Edit Bank Details
  body: [Bank sort code, Bank account no, Bank account name, "Bank name (read-only)", Change Effective Date]
  buttons: [OK, Cancel]

EventsTab_NewEditEventDialog:
  title: "New Event / Edit Event"
  body: ["Event Type dropdown: Reportable/Taxable", Event Date, Event No, Gross Amount, Taxable Amount]
  buttons: [OK, Cancel]

EventsTab_EditConfirm:
  title: Confirm
  body: "Edit this event?"
  buttons: [Yes, No]

EventsTab_DeleteConfirm:
  title: Confirm
  body: "Are you sure you want to delete the Event '[SelectedNo]' ?"
  buttons: [Yes, Cancel]

KeyboardShortcutsModal:
  title: Keyboard Shortcuts
  grid: [Action, Shortcut]
  buttons: [Close]

LocateFieldValueModal:
  title: Locate
  body: ["Value to find input", "Search In: All Columns / Current Column", "Match: Exact Match / Partial Match"]
  buttons: [OK, Cancel]

MaturitiesSurrenderTab_NewBankDetailsDialog:
  title: "New Maturity / Surrender Bank Details"
  body:
    - "Change Effective Date"
    - "left box: Bank sort code, Account name, Payment Ref"
    - "right box: Bank Name (read-only), Bank account no, Account Type (read-only), Payment method dropdown (B/C/T)"
  buttons: [OK, Cancel]

MiscDiaryModal:
  title: Miscellaneous Diary
  body: [Action Date, Reminder Date, "Diary Text textarea", Completed?]
  buttons: [Save, Cancel]

P45DetailsModal:
  title: P45 Details
  body: ["Previous Employer Name", "Date Left Previous Employment", "Total Pay to Date", "Total Tax to Date", "Tax Code at Leaving"]
  buttons: [OK, Cancel]

PullQuoteModal:
  title: Pull Quote
  body: ["Quote Reference prompt + input"]
  buttons: [OK, Cancel]

QuoteLookupModal:
  title: Quote Lookup
  toolbar: ["Get Records radio (>= / =) + input", "First/Prev/Page X of Y/Next/Last", "Last 60", "Locate (F3 Next)", "Monthly Cash Policy checkbox"]
  grids:
    - "Illustrations (variant 0 only): Quote, Variant, IFA, Created, Name, Type, LifeType, Age 1, User, Master, Status, COCODE"
    - "Variants: 40+ columns incl. Series, Gross Annuity, TFC %, Dep %, O/lap, Gtee, Esc %, Frequency, Life/DOB/Age/Smk per life, Commence, IFA, Network, Expense %, Comm %, and rate constants"
  buttons: [OK, Cancel]

RecalcAnnStatModal:
  title: "Recalculate Ann. Stat."
  body: ["product+date-range prompt", "Product dropdown: With Profits/Non Profits/ICFP/PRP/PIPA", "From Date", "To Date"]
  buttons: [OK, Cancel]

ReportsModal:
  title: "[SystemName] Reporting System"
  body: ["System Name select: CCRP/CHEQUE REQUISITION/DANAD96/etc.", Start Date, End Date, "Print to my default printer checkbox", "grid: ReportName | DateRequired", "Report Path (read-only) + Find (disabled)"]
  buttons: [Print]

ReprintAnnualStatementsModal:
  title: Reprint Annual Statements
  body: ["reprint-date prompt", "Reprint Date"]
  buttons: [Print, Cancel]

ReprintMaturityModal:
  title: Reprint Maturity Letters
  body: ["date+letter-type prompt", "Reprint Date", "Maturity letter types dropdown: 4 Month/6 Week/3 Week/10 Day/0 Day"]
  buttons: [Print, Cancel]

ScreenPrintModal:
  title: "Client Annuity Administration System"
  body: "The Screen Print has been printed!"
  buttons: [OK]

SetDeadModal:
  title: Set Dead
  body: ["Date of death"]
  buttons: [OK, Cancel]

SupervisoryEditModal:
  title: Supervisory Edit
  body:
    - "row 1: Policy Services Status, Start Date (read-only), IFA Commission"
    - "row 2: ReAssurer (read-only), ReAss Premium (read-only)"
    - "3 read-only columns: Premium/Overlap/Cumulative free pay family (24 fields total)"
  buttons: ["OK (Save changes)", Cancel]

TaxCertificateModal:
  title: Tax Certificate
  body: ["date-range prompt", "Start Date", "End Date"]
  buttons: [Cancel, Print]

ViewNotionalValueModal:
  title: ViewNotionalValue
  grid: [VALUE_DATE, AMOUNT, WITHHELD_MINIMAL_INCOME, Mutual_Bonus]
  buttons: [OK]

WinErrorDialog:
  title: Error
  body: "dynamic message"
  buttons: [OK]
  reused_by: "Annuitant tab NI-delete on plan 51, and other legacy-style Windows error surfaces"

InlineHeaderAlerts:
  # rendered directly by app-header, not a separate component
  - { trigger: "Supervisor 'C(ancel) Application'", body: "You must reverse cheques first ?" }
  - { trigger: "Supervisor 'Expired' (plan 90)", body: "Are you sure you want to set the policy to Expired?", buttons: [Yes, No, Cancel] }
  - { trigger: "Process 'Payments ▶ Suspend'", body: "This records payments are already suspended!" }
  - { trigger: "Process 'PLA Cancellation'", body: "This policy is not a PLA!" }
  - { trigger: "Process 'Set Dead ▶ Life Two' (no 2nd life)", body: "There is no second life for this record!" }
```

### 6.3 Simultaneous Policies dialog

```yaml
title: "Simultaneous Policies"
grid: [Policy No, Status, Product Type]
default_rows: "SIM_ROWS_DEFAULT (all plans) except SIM_ROWS_82 for plan 82"
buttons: ["Open (disabled until a row selected)", Cancel]
opened_from: "app-policy-header ⋯ button"
```

---

## 7. State Model (Angular services)

| Service | Shape | Notes |
| --- | --- | --- |
| `PlanCodeService` | `planCode$: BehaviorSubject<PlanCodeVersion>`, `surname$`, `policyRef$` | Boots on `"90"` / `TESTCTCCHIBD` / `227813`. Single source of truth for all dynamic rendering (§3). |
| `EditModeService` | `editing$: BehaviorSubject<boolean>`, `cancelKey`, `cancel(): void` | Drives the shared Toolbar Edit/Save/Cancel affordance across every tab; `cancelKey` forces tab re-mount on cancel. |
| `ChequesService` | in-memory cheque ledger | Backs `ChequeLoggerModal` / `AmendChequesModal`; frontend-only sample data. |
| `ShortcutRegistryService` | registry of `{ id, keys[] }` entries | Backs the global keydown listener and `KeyboardShortcutsModal`'s reference table (e.g. F1 Screen Print, F5 Search). |
| `DialogService` | wrapper over Angular CDK `Dialog` / Material `MatDialog` | Single entry point for every modal open action listed in §6. |

**Angular mapping:** every `isPlanXX` boolean shown throughout this document
would be a computed signal or pipe derived from `PlanCodeService.planCode$`,
recomputed per component rather than centrally — matching the current
build's "each component derives its own booleans" pattern.

---

## 8. Routing

```yaml
router: wouter (single route)
routes:
  - path "/": AppShell (the entire CLANAD screen — 15 tab panels swapped via component state, not routing)
providers (App):
  - ShortcutRegistryProvider
  - EditModeProvider
  - ChequesProvider
  - PlanCodeProvider
```

---

## 9. Proposed Angular Component Map

| React component | Suggested Angular selector | Notes |
| --- | --- | --- |
| `App` / `AppShell` | `app-shell` | root; hosts all providers/services |
| `Header` | `app-header` | title, 5 menus, logout |
| `Footer` | `app-footer` | logo + address |
| `Toolbar` | `app-toolbar` | 10 action buttons |
| `PolicyHeader` | `app-policy-header` | pills, accent colour, sim-policies trigger |
| `TabBar` | `app-tab-bar` | 15-tab strip |
| `StatusBar` | `app-status-bar` | label/value status row |
| `ApplicationDetailsTab` | `app-tab-application` | |
| `AnnuitantDetailsTab` | `app-tab-annuitant` | |
| `ContactsTab` | `app-tab-contacts` | |
| `ContactsTab2` | `app-tab-contacts2` | |
| `PolicyDetailsTab` | `app-tab-policy` | |
| `BankAccDetailsTab` | `app-tab-bank` | |
| `PaymentsTab` | `app-tab-payments` | |
| `IncreaseHistoryTab` | `app-tab-increase` | |
| `QuoteDetailsTab` | `app-tab-quote` | |
| `DiaryAuditTab` | `app-tab-diary` | |
| `NotesTab` | `app-tab-notes` | |
| `LettersTab` | `app-tab-letters` | |
| `EventsTab` | `app-tab-events` | |
| `MaturitiesSurrenderTab` | `app-tab-maturities` | |
| `LoaPoaTab` | `app-tab-loa` | |
| `FindPolicyModal` | `app-find-policy-modal` | the plan-code switcher |
| all `components/*Modal.tsx` (~30) | `app-<name>-modal` | opened via shared `DialogService` |
| `ConfirmDialog` | `app-confirm-dialog` | generic Yes/No, reused app-wide |
| `WinErrorDialog` | `app-error-dialog` | generic OK-only error surface |
| `DataGrid` styling (`.lve-grid`) | `app-data-grid` | shared table component |
| `DatePicker` | `app-date-picker` | masked input + calendar popover, used on nearly every tab |

---

## 10. Coverage Checklist (validated against current build)

- [x] App shell — Header (5 menus, logout), Toolbar (10 buttons), Policy
      Header (pills/accent), Tab Bar (15 tabs), Status Bar, Footer.
- [x] All 15 plan codes documented with type/description/status, and the
      plan-code accent colour table.
- [x] Dynamic-rendering mechanism explained end-to-end: single
      `PlanCodeService`, per-component derived booleans, and everything that
      changes because of it (fields, values, enable state, tab visibility,
      menu wiring, status text, accent colour).
- [x] Plan `0` documented as the deliberate non-dynamic/baseline case, not a
      bug — including its Find Policy row and per-tab placeholder behaviour.
- [x] All 15 tab panels — sections, fields, buttons, and plan-specific
      variants for each.
- [x] Header menus (Options/Process/Print/Supervisor/Help) + every submenu
      + full per-plan menu-content variance table.
- [x] Find Policy modal (the plan-code switcher) — full grid spec and the
      field-search variant.
- [x] Simultaneous Policies dialog.
- [x] All ~30 global/standalone modals + 5 tab-scoped modal families (Events,
      Notes, Maturities, plus inline header alerts) — title, body, buttons.
- [x] State model — the 5 Angular services (`PlanCodeService`,
      `EditModeService`, `ChequesService`, `ShortcutRegistryService`,
      `DialogService`) and what each owns.
- [x] Routing — single-route app; tabs are swapped in-component, not routed.
- [x] Proposed Angular component map for every screen, tab, and modal.
- [x] Design tokens — fonts (Livvic/Mulish), `--radius: 30px`, `zoom: 0.8`,
      full brand colour table, plan-code accent pairs.

---

## 11. Document Downloads

These documents are served as static files from the application's `/public/`
directory and are accessible directly in the browser or via `curl`:

| Document | URL path |
|---|---|
| **Screen Flow (ASCII)** — every screen, tab, modal, and navigation path | [`/CLANAD_SCREEN_FLOW_Angular_LVE.md`](/CLANAD_SCREEN_FLOW_Angular_LVE.md) |
| **This file** — Application Digest (compact reference) | [`/CLANAD_DIGEST_Angular_LVE.md`](/CLANAD_DIGEST_Angular_LVE.md) |

To download: navigate to the URL above in any browser and use
**File → Save As** (or right-click → Save link as) to save the `.md` file locally.
