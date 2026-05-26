# CLANAD — Client Annuity Administration System
## Application Digest (Angular / LVE Component Library)

---

## 1. Application

| Field       | Value |
|-------------|-------|
| Name        | CLANAD — Client Annuity Administration System |
| Version     | 1.0.0 |
| Type        | Static web app (no backend) — recreation of legacy Windows desktop tool |
| Description | Liverpool Victoria Friendly Society Limited internal tool for managing client annuity policies across 13–15 tabs (Application Details, Annuitant, Contacts×2, Policy, Bank, Payments, Increase History, Quote Details, Diary & Audit Trail, Notes, Letters, Events, Maturities/Surrender, LOA/POA). Supports four policy variants (planCode 0 / 84 / 87 / 90) with distinct menus, fields, and data per variant. Built with Angular, deployable as a static site. |
| Framework   | Angular 17 (standalone components, signals) + TypeScript |
| Styling     | Tailwind CSS v4 (global tokens in `src/index.css`; component-scoped utilities inlined) |
| Icons       | `@ng-icons/material-icons` (Material Design) — registered per-component via `provideIcons(...)` and rendered with `<ng-icon name="mat...">` |
| Routing     | Single-page, tabbed — `TabBarComponent` drives a `selectedTab` signal; no `RouterModule` needed |
| Forms       | Angular `FormsModule` two-way binding (`[(ngModel)]`) for text/date inputs; distribution controls use controlled inputs independent of EditMode service |
| Build       | Angular CLI (`ng build`) → static `dist/clanad/browser/` output (esbuild via `@angular-devkit/build-angular:application`) |
| Change det. | `ChangeDetectionStrategy.OnPush` on every standalone component; reactive updates via `signal()` / `computed()` / `effect()` |
| DI          | Standalone APIs only — `bootstrapApplication(AppComponent, { providers: [provideAnimations(), ...] })` in `src/main.ts` |

### Fonts

| Role | Family |
|------|--------|
| Headers, buttons, tabs, labels | **Livvic** (Google Fonts) |
| Body text, inputs, table cells | **Mulish** (Google Fonts) |

### Brand / Design Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#006cf4` | Primary buttons, active icons |
| `primary_hover` | `#003578` | Primary button hover / row hover |
| `navy` | `#00263e` | Header bar background |
| `dark_navy` | `#002f5c` | Data grid header text |
| `secondary` | `#04589b` | Secondary button border/text, active menu items |
| `highlight` | `#05579B` | Selected row highlight |
| `link_blue` | `#005a9c` | Column header links |
| `green` | `#178830` | Focus ring border |
| `error` | `#d72714` | Validation errors, close-button hover |
| `tab_inactive` | `#eaf5f8` | Inactive tab background |
| `page_bg` | `#f0f0f0` | App background |
| `gray_border` | `#BBBBBB` | Panel/card/input borders |
| `text` | `#3d3d3d` | Body text |
| `row_zebra` | `#e7ebec34` | Alternate table rows |

### Plan Code Accent Colours

| planCode | Plan Type | Accent bg | Accent fg | Label |
|----------|-----------|-----------|-----------|-------|
| `"0"` | master | `#848285` | `#ffffff` | (grey) |
| `"87"` | FTA | `#F28C28` | `#ffffff` | (orange) |
| `"84"` | PRP | `#BEE4BE` | `#023E02` | (light green) |
| `"90"` | MCP | `#F4D9E8` | `#710340` | (pink) — **default on load** |

### Border Radii

| Context | Radius |
|---------|--------|
| Pill buttons, badges | `30px` |
| Cards, inputs, modals | `8px` |

---

## 2. Plan Type Overview

All behaviour, menus, tabs, and data are driven by the global **PlanCodeService**. The default planCode on application load is `"90"`.

### 2.1 planCode `"0"` — Master (Legacy Template)

```yaml
policyRef: "dbePolNo"
surname:   "Master"
planType:  "master"
accent:    grey (#848285)
tabs:      15 (all, including Contacts × 2)
status:    empty placeholder fields
payments:  empty history
diary:     empty
notes:     empty
toolbar:   New Quote enabled
menus:     full default set (Options / Process / Print / Supervisor / Help)
policy_header:
  company_badge: hidden (placeholder box shown)
  plan_badge:    grey accent
  special:       "Simultaneous Policies" badge hidden (placeholder box)
  mcp_badge:     hidden (placeholder box)
status_bar:
  illustration:  blank
  variant:       blank
```

This variant represents the legacy master template. All field-level labels and
placeholder text reflect the original database column names (e.g. `DBEditAPPLI`,
`edtStartdate`). Columns 3 on the Application Details grid are visible.
The "Create payment for policy" button appears at the bottom of Application Details.

---

### 2.2 planCode `"87"` — FTA (Fixed-Term Annuity · Policy 233451 · UGGIU)

```yaml
policyRef: "233451"
surname:   "UGGIU"
planType:  "FTA"
accent:    orange (#F28C28)
tabs:      13 (Contacts tabs hidden)
natInsNo:  "JK-90-90-90-C"
status:    "P" (Pending)
phPostCode:"OP9 0OP"
ifaRef:    "OAKWO-01"
dob1:      "09/09/1956"
accent:    orange
toolbar:   New Quote enabled
menus:
  Options:    default
  Process:    default
  Print:      default
  Supervisor: SUPERVISOR_87 override (see §6.2B)
policy_header:
  company_badge: "Liverpool Victoria Friendly Society Limited" (blue)
  mcp_badge:     hidden
application_details:
  set_up_date:       "15/05/2026"
  start_date:        "15/05/2026"
  status:            "P"
  quote_expiry:      "14/06/2026"
  postADay:          checked
  final_quote_date:  hidden
  suspended:         hidden
  cause_of_death:    hidden
  dod:               hidden
  column_3:          hidden (isCompact = true)
policy_details:
  online_application: checked
  tax_code:           "1257L*"
payments:  empty history
diary:
  rows: ["Bank Validation", "EOA Client", system-generated validation notes]
status_bar:
  illustration: "20911002"
  variant:      "7"
```

---

### 2.3 planCode `"84"` — PRP (Personal Retirement Plan · Policy 111834 · TESTPTBBBIDE)

```yaml
policyRef: "111834"
surname:   "TESTPTBBBIDE"
planType:  "PRP"
accent:    light green (#BEE4BE)
tabs:      13 (Contacts tabs hidden)
natInsNo:  "PK-25-10-58-A"
status:    "L" (Live)
phPostCode:"ZE99 9AB"
ifaRef:    "LIFET-015"
dob1:      "25/10/1958"
toolbar:   New Quote disabled
menus:
  Options:    OPTIONS_84 (P45 Details / Screen Print / Search)
  Process:    PROCESS_84 (Set Dead ▶ / Payments ▶ / PLA Cancellation / Ceding Scheme Details / LTC grey)
  Print:      PRINT_84  (Tax Certificate / Copy P60 / Reprint Mar's ▶ / Diary Report)
  Supervisor: SUPERVISOR_84 (Supervisory Edit / Status Change ▶ / Amend Cheques / Amend IFA /
                              Bank Detail Changes ▶ / Pull Quote / Reprint Ann Stmt /
                              Annual Stmt Recalc / Reprint Maturity Letters)
policy_header:
  company_badge:   "Liverpool Victoria Friendly Society Limited" (blue)
  simultaneous:    "Simultaneous Policies" label shown
  mcp_badge:       hidden
application_details:
  set_up_date:     "17/03/2010"
  received_date:   "17/03/2010"
  start_date:      "31/03/2010"
  status:          "L"
  suspended:       "N"
  postADay:        checked
  ifa_payment_date:"13/04/2010 10"
  accept_date:     hidden
  column_3:        hidden
policy_details:
  initial_payment_method: "B" (BACS)
  adviser_charge_pct:     "2"
  mpaa_rules_triggered:   checked
  tax_code:               "647L*" → later "647L"
payments:
  history: 9 rows from 30/04/2010 @ £107.83 gross/net, method B
           reasons: FIRST then PROC
  tax_history: 7 rows, code 647L*→647L
diary:
  rows: ["Chase for application cheques of AXA", bank validation notes]
status_bar:
  illustration: "20911002"
  variant:      "7"
```

---

### 2.4 planCode `"90"` — MCP (Monthly Cash Policy · Policy 227813 · TESTCTCCHIBD) — **Default**

```yaml
policyRef: "227813"
surname:   "TESTCTCCHIBD"
planType:  "MCP"
accent:    pink (#F4D9E8)
tabs:      13 (Contacts tabs hidden)
natInsNo:  "CH-10-05-59-A"
status:    "L" (Live)
phPostCode:"KI99 9AB"
ifaRef:    "ROTHM-00"
dob1:      "10/05/1959"
toolbar:   New Quote disabled
menus:
  Options:    OPTIONS_84  (same as plan 84)
  Process:    PROCESS_84  (same as plan 84)
  Print:      PRINT_84    (same as plan 84)
  Supervisor: SUPERVISOR_90 (Supervisory Edit / Status Change ▶ Expired /
                              Amend Cheques / Amend IFA / C(ancel) Application /
                              Bank Detail Changes ▶ Bank Changes Awaiting Approval /
                              Pull Quote / Reprint Ann Stmt / Annual Stmt Recalc /
                              Reprint Maturity Letters)
policy_header:
  company_badge: "Liverpool Victoria Friendly Society Limited" (blue)
  mcp_badge:     "MONTHLY CASH POLICY" (pink badge, always visible for plan 90)
  simultaneous:  placeholder box (no label)
application_details:
  received_date_label: "MCP Start Date"   (relabelled)
  start_date_label:    "Payment Date"     (relabelled)
  mcp_start_date:      "25/06/2025"
  payment_date:        "28/05/2025"
  status:              "L"
  suspended:           "N"
  ifa_payment_date:    "07/07/2025 07"
  accept_date:         hidden
  column_3:            hidden
policy_details:
  tax_code:                "NT"
  ir_max_pension:          visible (plan 90 specific)
  agency_deceased_notif:   editable DatePicker (plan 90 specific)
annuitant_details:
  mar_required_life2:      editable checkbox (disabled for all other plans)
payments:
  history: 9 rows from 07/07/2025 @ £251.79 gross/net, method B
           FIRST + PROC reasons; NT tax code; no tax deducted
  final_payment_date: "28/05/2027" (highlighted red)
  tax_history: 6 rows, code NT
diary:     empty
status_bar:
  illustration: "20911002"
  variant:      "7"
```

---

## 3. Global Shell Components

### 3.1 HeaderComponent (`app-header`, `src/app/components/header/header.component.ts`)

```yaml
selector: app-header
sticky: true (shrink-0 in flex column)
background: "#00263e"
height: auto (py-5)
padding_x: 142px
left:
  - logo: "LV=" (PNG import, h-6)
  - title: "Client Annuity Administration System" (Livvic, 3xl, white)
right:
  - logout_button: { shape: pill, radius: 30px, variant: ghost-on-dark, icon: MdLogout }
below_nav_bar:
  background: white
  height: 48px
  padding_x: 142px
  items: [Options, Process, Print, Supervisor, Help]
  item_style: pill (radius 30px), active = primary blue fill
  dropdowns: nested flyout menus (up to 3 levels deep) — planCode-dependent
inputs: [title: string]
outputs: []
services: [PlanCodeService, various modal open() calls via state signals]
modals_hosted:
  - TaxCertificateModal
  - AboutModal
  - AmendChequesModal
  - CompletionCheckerModal
  - ScreenPrintModal
  - AmendIfaModal
  - P45DetailsModal
  - SetDeadModal
  - CedingSchemeModal
  - CopyP60Modal
  - SupervisoryEditModal
  - BankChangesReportModal
  - ReprintMaturityModal
  - RecalcAnnStatModal
  - ReprintAnnualStatementsModal
  - PullQuoteModal
  - ConfirmDialog (Expired / Cancel Application / Suspend)
```

### 3.2 FooterComponent (`app-footer`, `src/app/components/footer/footer.component.ts`)

```yaml
selector: app-footer
background: white
padding_x: 142px
mt: auto (sticks to bottom in flex column)
left:  logo "LV=" (PNG, h-6)
right: "Liverpool Victoria Friendly Society Limited, County Gates, Bournemouth BH1 2NF"
       (Mulish, text-sm, text-[#3d3d3d])
```

### 3.3 ToolbarComponent (`app-toolbar`, `src/app/components/toolbar/toolbar.component.ts`)

```yaml
selector: app-toolbar
layout: flex wrap, gap-2, mb-6
services: [EditModeService, PlanCodeService]
modals_hosted:
  - ConfirmDialog (New App / Sim App)
  - QuoteLookupModal
  - PullQuoteModal
  - CompanySelectionModal
  - ReportsModal
  - CrsModal
  - ChequeLoggerModal
  - FindPolicyModal
events_emitted:
  - "clanad:open-find-policy" (CustomEvent — received by ToolbarComponent to open FindPolicyModal)
```

#### Toolbar Buttons

| Label | Icon | Enabled condition | Action |
|-------|------|-------------------|--------|
| New App | MdAdd | `!editing` | ConfirmDialog → "Create a new Application?" → Yes → QuoteLookupModal |
| New Quote | MdNoteAdd | `!editing && planCode !== '84' && planCode !== '90'` | PullQuoteModal |
| Sim App | MdContentCopy | `!editing` | ConfirmDialog → "Are you sure you wish to generate simultaneous policy?" → Yes → QuoteLookupModal |
| Edit / Save | MdEdit / MdSave | always | Toggle EditMode; label and icon swap |
| Cancel | MdBlock | `editing` | Revert all fields; exit EditMode; increment cancelKey |
| Search | MdSearch | `!editing` | FindPolicyModal (also responds to `clanad:open-find-policy` event from menu) |
| Log | MdHistory | `!editing` | ChequeLoggerModal |
| CRS | MdStorage | `!editing` | CrsModal |
| Reports | MdBarChart | `!editing` | ReportsModal |
| Company | MdBusiness | `!editing` | CompanySelectionModal |

Button variants: Save = `lve-btn` (primary blue); all others = `lve-btn lve-btn-secondary`.

### 3.4 PolicyHeaderComponent (`app-policy-header`, `src/app/components/policy-header/policy-header.component.ts`)

```yaml
selector: app-policy-header
layout: flex wrap, items-center, gap-3, p-4 (lve-panel)
services: [PlanCodeService]
elements:
  - policy_no_dropdown: button [v] 140px wide, hover green border
  - find_application:   icon button [↗] MdOpenInNew
  - company_badge:
      plans 84/87/90: "Liverpool Victoria Friendly Society Limited" (blue bg, white text)
      plan 0:         placeholder box (260px, blue bg, empty)
  - policy_ref_badge:   policyRef from PlanCodeService (#eaf5f8 bg, #0d2c41 text)
  - plan_code_badge:    planCode value (accent bg, accent fg, Livvic semibold)
  - surname_badge:      surname value (accent bg, accent fg, Livvic semibold)
  - simultaneous_badge:
      plan 84: "Simultaneous Policies" (#eaf5f8)
      others:  placeholder box (220px, #eaf5f8)
  - more_button:        [···] MdMoreHoriz → SimultaneousPoliciesPopup
  - mcp_badge:
      plan 90: "MONTHLY CASH POLICY" (pink bg #F4D9E8, text #710340, Livvic semibold)
      others:  placeholder box (180px, #eaf5f8)
inline_popup:
  SimultaneousPoliciesPopup:
    trigger: more_button click
    header: "Simultaneous Policies" (navy bar)
    grid:
      columns: [Policy No, Status, Product Type]
      rows: [{ policyNo: "233424", status: "P", productType: "FTA" }, + 9 blank rows]
      selection_color: "#05579B" (dark blue)
    actions: [Open (disabled until row selected), Cancel]
```

### 3.5 TabBarComponent (`app-tab-bar`, `src/app/components/tab-bar/tab-bar.component.ts`)

```yaml
selector: app-tab-bar
layout: overflow-x-auto, flex row, gap-4, min-w-max
services: [PlanCodeService]
inputs:  [activeTab: TabKey, onChange: (key: TabKey) => void]
outputs: [tabChange: EventEmitter<TabKey>]
tab_style:
  inactive: bg-[#eaf5f8], Livvic text-[#04589b]
  active:   bg-white, border-b-2 border-[#006cf4], text-[#006cf4]
```

#### Tab Visibility

| Tab Key | Label | Visible plans |
|---------|-------|---------------|
| `application` | Application Details | all |
| `annuitant` | Annuitant(s) Details | all |
| `contacts` | Contacts | plan `"0"` only |
| `contacts2` | Contacts | plan `"0"` only |
| `policy` | Policy Details | all |
| `bank` | Bank Acc Details | all |
| `payments` | Payments | all |
| `increase` | Increase History | all |
| `quote` | Quote Details | all |
| `diary` | Diary & Audit Trail | all |
| `notes` | Notes | all |
| `letters` | Letters | all |
| `events` | Events | all |
| `maturities` | Maturities / Surrender | all |
| `loa` | LOA/POA | all |

### 3.6 StatusBarComponent (`app-status-bar`, `src/app/components/status-bar/status-bar.component.ts`)

```yaml
selector: app-status-bar
layout: lve-panel, flex wrap, gap-6, p-4, mt-6
services: [PlanCodeService]
items:
  - Status:       "LIVE" (green #178830, always)
  - Illustration: "20911002" (blank for planCode "0")
  - Variant:      "7"        (blank for planCode "0")
  - RAQ ID:       "—"
  - User:         "UAT3"
label_style: Livvic uppercase xs tracking-wider text-[#0d2c41]/60
value_style: Mulish text-sm font-semibold
```

---

## 4. Services (Angular DI)

### 4.1 PlanCodeService (`src/app/services/plan-code.service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class PlanCodeService {
  planCode = signal<PlanCodeVersion>('90');   // default MCP
  surname  = signal<string>('TESTCTCCHIBD');
  policyRef = signal<string>('227813');

  setPlanCode(code: PlanCodeVersion): void;
  setSurname(name: string): void;
  setPolicyRef(ref: string): void;
}

type PlanCodeVersion = '0' | '84' | '87' | '90';

// Available policies
const PLAN_CODE_VERSIONS = [
  { code: '0',  label: 'master', policyRef: 'dbePolNo', surname: 'Master'         },
  { code: '87', label: 'FTA',    policyRef: '233451',   surname: 'UGGIU'          },
  { code: '84', label: 'PRP',    policyRef: '111834',   surname: 'TESTPTBBBIDE'   },
  { code: '90', label: 'MCP',    policyRef: '227813',   surname: 'TESTCTCCHIBD'   },
];
```

### 4.2 EditModeService (`src/app/services/edit-mode.service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class EditModeService {
  editing   = signal<boolean>(false);
  cancelKey = signal<number>(0);          // increments on cancel, forces tab re-render

  setEditing(value: boolean): void;
  cancel(): void;  // setEditing(false); cancelKey.update(k => k + 1)
}
```

Fields in all tabs read `editing()` to determine `[readOnly]` / `[disabled]` state.
LettersComponent overrides this by providing `ALWAYS_EDITING = { editing: true }` locally,
so all distribution controls are always editable regardless of global EditMode.

### 4.3 ChequesService (`src/app/services/cheques.service.ts`)

```typescript
@Injectable({ providedIn: 'root' })
export class ChequesService {
  cheques = signal<ChequeRow[]>([]);

  addCheque(row: ChequeRow): void;
  removeCheque(id: string): void;
  updateStatus(id: string, status: string): void;
}
```

Shared between: `BankAccDetailsComponent`, `AmendChequesModal`, `ChequeLoggerModal`.

---

## 5. Shared Field Components (`src/app/components/field/`)

### 5.1 TextInputComponent (`app-text-input`)

```yaml
inputs:
  - value:       string  (default "")
  - readOnly:    boolean (default false)
  - disabled:    boolean (default false)
  - type:        string  (default "text")
  - placeholder: string
  - error:       boolean (default false)
  - className:   string
  - onChange:    (value: string) => void | undefined
behavior:
  - isControlled: onChange !== undefined
  - lockedReadOnly: readOnly || (!editing && !isControlled)
  - when isControlled: renders as controlled input (value binding + onChange);
    bypasses global EditMode lock regardless of editing signal
  - when !isControlled: renders as uncontrolled (defaultValue); locked when !editing
styling:
  - class: "lve-input"
  - when lockedReadOnly && !disabled: bg-[#fafafa] cursor-default
  - when error: data-error attribute set (red border via CSS)
```

### 5.2 SelectInputComponent (`app-select-input`)

```yaml
inputs:
  - value:     string
  - options:   string[]
  - disabled:  boolean
  - error:     boolean
  - onChange:  (value: string) => void | undefined
behavior:
  - lockedReadOnly: !editing
  - isDisabled: disabled || lockedReadOnly
  - isControlled: onChange !== undefined (controlled/uncontrolled mode)
styling:
  - custom chevron overlay (MdKeyboardArrowDown icon, primary blue)
  - separator line before chevron (1px #BBBBBB)
```

### 5.3 CheckboxComponent (`app-checkbox`)

```yaml
inputs:
  - label:    string (optional)
  - checked:  boolean (default false)
  - disabled: boolean (default false)
  - onChange: (checked: boolean) => void (optional)
behavior:
  - isLocked: disabled || !editing  (reads EditModeService)
  - LettersComponent provides ALWAYS_EDITING so checkboxes in
    Distribution Info are never locked by edit mode
  - internal checked state tracks initial prop; sync via onChange output
styling:
  - custom box: 20×20px, radius 4px; checked = #006cf4 bg + white tick (MdCheck)
  - focus ring: 2px #178830 (green)
  - locked: cursor-not-allowed; disabled: opacity-60
```

### 5.4 SectionComponent (`app-section`)

```yaml
inputs:
  - title:        string (optional)
  - headerAction: TemplateRef (optional)
  - className:    string
renders:
  - <section class="lve-panel">
  - <header class="lve-panel-header"> when title or headerAction present
  - <div class="lve-panel-body"> always
```

### 5.5 FieldComponent (`app-field`)

```yaml
inputs:
  - label:      ReactNode / TemplateRef
  - inline:     boolean (default false) — renders label + input side by side
  - labelWidth: number (default 170px) — used in inline mode
```

### 5.6 DatePickerComponent (`app-date-picker`)

```yaml
inputs:
  - value:       string (dd/mm/yyyy)
  - disabled:    boolean
  - placeholder: string
outputs:
  - valueChange: EventEmitter<string>
popover:
  views: [Days, Months, Years]
  days: Mon–Sun grid; click month/year label to drill up
  months: 3×4 grid
  years: range grid
  footer: [Today, Clear]
disabled_behavior: renders as read-only text input, no calendar icon
```

---

## 6. Menu System (planCode-dependent)

Menu items are resolved by mapping `menuItems` array against the current `planCode` signal.

### 6.1 Menu Bar — planCode `"0"` and `"87"` (default menus, Supervisor differs for "87")

#### Options
| Item | Shortcut | Action |
|------|----------|--------|
| Screen Print | F1 | ScreenPrintModal |
| Check Completion | — | CompletionCheckerModal |
| Amend IFA | — | AmendIfaModal |
| Search | F5 | clanad:open-find-policy event → FindPolicyModal |

#### Process
| Item | Sub-items | Action |
|------|-----------|--------|
| Payment Forecast | — | — |
| N.I Sweep | — | — |
| P45 details | P45 Details | P45DetailsModal |
| Monthly | Monthly Processing | — |
| Coding Scheme Details | — | — |
| *(separator)* | | |
| Cancel LTC | — | disabled |

#### Print
| Item | Sub-items | Action |
|------|-----------|--------|
| Print MAR | 1st Life MAR / 2nd Life MAR | — |
| Auto Set Live Report | — | — |
| Diary Report | — | — |

#### Supervisor — planCode `"0"` (master)
| Item | Sub-items / Notes | Action |
|------|-------------------|--------|
| Final Quote Issued | — | — |
| Status Change | NTU / Backdate / Cancel / XDuplicate / Surrender / Maturity | — |
| Amend Cheques | — | AmendChequesModal |
| Amend IFA | — | AmendIfaModal |
| Approve Bank Changes | — | — |
| Approve Maturity Bank Detail Changes | — | — |
| *(separator)* | | |
| Set Live | — | — |
| Force Set Live | — | — |
| *(separator)* | | |
| Set Status To Hold | — | — |
| Set Status To Pending | — | — |
| *(separator)* | | |
| Reprint Annual Statements | — | ReprintAnnualStatementsModal |
| Annual Statement Recalculation | — | RecalcAnnStatModal |
| Reprint Maturity Letters | — | ReprintMaturityModal |
| *(separator)* | | |
| Tracesmart error - make policy editable | — | — |

#### Supervisor — planCode `"87"` (FTA override)
| Item | Notes | Action |
|------|-------|--------|
| Final Quote Issued | — | — |
| Status Change ▶ | NTU / Backdate / Cancel / XDuplicate / Surrender / Maturity | — |
| Amend Cheques | — | AmendChequesModal |
| Approve Bank Changes | disabled | — |
| Approve Maturity Bank Detail Changes | disabled | — |
| *(separator)* | | |
| Set Live | — | — |
| Force Set Live | — | — |
| *(separator)* | | |
| Set Status To Hold | — | — |
| Set Status To Pending | disabled | — |
| *(separator)* | | |
| Reprint Annual Statements | — | ReprintAnnualStatementsModal |
| Annual Statement Recalculation | — | RecalcAnnStatModal |
| Reprint Maturity Letters | — | ReprintMaturityModal |

#### Help (all plans)
| Item | Action |
|------|--------|
| About | AboutModal |

---

### 6.2 Menu Bar — planCode `"84"` (PRP) and `"90"` (MCP) — overridden menus

#### Options (84 / 90)
| Item | Shortcut | Action |
|------|----------|--------|
| P45 Details | — | P45DetailsModal |
| Screen Print | F1 | ScreenPrintModal |
| Search | F5 | FindPolicyModal |

#### Process (84 / 90)
| Item | Sub-items | Action |
|------|-----------|--------|
| Set Dead ▶ | Life One | SetDeadModal |
| | Life Two/Current Beneficiary | "No second life" info popup |
| Payments ▶ | Suspend | ConfirmDialog (double-click pattern: 1st click stages, 2nd click → confirm) |
| PLA Cancellation | — | ConfirmDialog |
| *(separator)* | | |
| Ceding Scheme Details | — | CedingSchemeModal |
| *(separator)* | | |
| LTC Benefit | — | disabled |
| Cancel LTC | — | disabled |

#### Print (84 / 90)
| Item | Sub-items | Action |
|------|-----------|--------|
| Tax Certificate | — | TaxCertificateModal |
| Copy P60 | — | CopyP60Modal |
| Reprint Mar's ▶ | 1st Life MAR / 2nd Life MAR | — |
| Diary Report | — | — |

#### Supervisor — planCode `"84"` (PRP)
| Item | Sub-items / Notes | Action |
|------|-------------------|--------|
| Supervisory Edit | — | switch to Payments tab + SupervisoryEditModal |
| Status Change ▶ | NTU / Backdate / Cancel / XDuplicate / Surrender / Maturity | — |
| Amend Cheques | — | AmendChequesModal |
| Amend IFA | — | AmendIfaModal |
| C(ancel) Application | — | — |
| Bank Detail Changes ▶ | Approve Bank Changes | — |
| | Approve Maturity Bank Detail Changes | — |
| Convert to Flexi-Access | disabled | — |
| *(separator)* | | |
| LTC ▶ | LTC Benefit | disabled |
| Pull Quote | — | PullQuoteModal |
| *(separator)* | | |
| Reprint Annual Statements | — | ReprintAnnualStatementsModal |
| Annual Statement Recalculation | — | RecalcAnnStatModal |
| Reprint Maturity Letters | — | ReprintMaturityModal |

#### Supervisor — planCode `"90"` (MCP)
| Item | Sub-items / Notes | Action |
|------|-------------------|--------|
| Supervisory Edit | — | switch to Payments tab + SupervisoryEditModal |
| Status Change ▶ | Surrender (disabled) | — |
| | Maturity (disabled) | — |
| | Expired | ConfirmDialog |
| Amend Cheques | — | AmendChequesModal |
| Amend IFA | — | AmendIfaModal |
| C(ancel) Application | — | ConfirmDialog |
| Bank Detail Changes ▶ | Bank Changes Awaiting Approval | BankChangesReportModal |
| | Approve Bank Changes (disabled) | — |
| | Approve Maturity Bank Changes (disabled) | — |
| Convert to Flexi-Access | disabled | — |
| *(separator)* | | |
| LTC ▶ | LTC Benefit | disabled |
| Pull Quote | — | PullQuoteModal |
| *(separator)* | | |
| Reprint Annual Statements | — | ReprintAnnualStatementsModal |
| Annual Statement Recalculation | — | RecalcAnnStatModal |
| Reprint Maturity Letters | — | ReprintMaturityModal |

---

## 7. Tab Components

### 7.1 ApplicationDetailsComponent (`app-application-details`)

```yaml
selector: app-application-details
services: [PlanCodeService, EditModeService]
layout: 4-column grid (column 3 hidden when isCompact = planCode 84/87/90)
```

#### Field Matrix

| Field | plan "0" | plan "87" | plan "84" | plan "90" |
|-------|----------|-----------|-----------|-----------|
| Set Up Date | blank | 15/05/2026 | 17/03/2010 | 25/06/2025 |
| Received Date label | Received Date | Received Date | Received Date | **MCP Start Date** |
| Received Date value | — | — | 17/03/2010 | 25/06/2025 |
| Start Date label | Start Date | Start Date | Start Date | **Payment Date** |
| Start Date value | — | 15/05/2026 | 31/03/2010 | 28/05/2025 |
| WPPA From/To | visible | hidden | hidden | hidden |
| Accept Date | DBEdit21 placeholder | blank | hidden | hidden |
| IFA Payment Date | DBEdit13 | — | 13/04/2010 10 | 07/07/2025 07 |
| PostADay checkbox | unchecked | **checked** | **checked** | unchecked |
| Transfer from Ben Drawdown | Unknown | Unknown | Unknown | Unknown |
| Special Status | DBSp | hidden | — | — |
| Final Quote Issued Date | DBEdit16 | hidden | hidden | hidden |
| Status | "status" | **"P"** | **"L"** | **"L"** |
| Suspended | DBSu | hidden | **"N"** | **"N"** |
| Days Since Application | — | — | — | — |
| Quote Ref | — | — | — | — |
| IFA Ref | — | — | — | — |
| Premium/Fund | — | — | — | — |
| GAD Anniversary | visible | hidden | hidden | hidden |
| Quote Expiry (col 4) | — | **14/06/2026** | — | — |
| Column 3 | visible | **hidden** | **hidden** | **hidden** |

Special for plan `"0"` only: **"Create payment for policy"** button below grid.

---

### 7.2 AnnuitantDetailsComponent (`app-annuitant-details`)

```yaml
selector: app-annuitant-details
sections:
  - Life 1: Title [v] / Forename / Surname / Sex [v] / DOB / NI No / Smoker [v]
            Cause of Death (hidden for plan 87) / DOD (hidden for plan 87)
            ConnectedAddress block / Doctor lookup button → DoctorDatabaseModal
  - Life 2: Title [v] / Forename / Surname / Sex [v] / DOB / NI No / Smoker [v]
            MAR Required [x] — editable ONLY for planCode "90", read-only for all others
            ConnectedAddress block
```

### 7.3 ContactsComponent (`app-contacts`) — planCode `"0"` only

```yaml
selector: app-contacts
visible: planCode === "0"
content: Contact records grid (Name / Role / Phone / Email / ...)
```

### 7.4 Contacts2Component (`app-contacts2`) — planCode `"0"` only

```yaml
selector: app-contacts2
visible: planCode === "0"
content: Extended / correspondence contact records
```

### 7.5 PolicyDetailsComponent (`app-policy-details`)

```yaml
selector: app-policy-details
layout: 2-column
```

| Field | plan "0" | plan "87" | plan "84" | plan "90" |
|-------|----------|-----------|-----------|-----------|
| Policy Type | — | — | — | — |
| Online Application [x] | — | **checked** | — | — |
| Payment Frequency [v] | — | — | — | — |
| Payment Method [v] | — | — | **Initial "B"** | — |
| Payment Amount | — | — | — | — |
| Indexation [v] | — | — | — | — |
| Guarantee Period | — | — | — | — |
| Guarantee End [DatePicker] | — | — | — | — |
| Escalation Type | — | — | — | — |
| Adviser Charge % | — | — | **"2"** | — |
| MPAA Rules Triggered [x] | — | — | **checked** | — |
| Tax Code | — | **"1257L\*"** | **"647L\*"→"647L"** | **"NT"** |
| IR Max Pension | hidden | hidden | hidden | **visible** |
| Agency Dec'd Notif Date | hidden | hidden | hidden | **editable** |

### 7.6 BankAccDetailsComponent (`app-bank-acc-details`)

```yaml
selector: app-bank-acc-details
sections:
  - Bank Details: Bank Name / Sort Code / Account No / Account Name / Bank Reference
                  [ Edit Bank Details ] → EditBankDetailsModal
  - Cheques (ChequesService): grid of cheque rows
                              [ Add Cheque ] / [ Remove Cheque ]
```

### 7.7 PaymentsComponent (`app-payments`)

```yaml
selector: app-payments
services: [PlanCodeService, EditModeService]
also_opened_by: Supervisor › Supervisory Edit (tab switch event)
```

#### Payment Summary Fields

| Field | plan "0"/"87" | plan "84" | plan "90" |
|-------|---------------|-----------|-----------|
| Current Gross | — | £107.83 | £251.79 |
| Current Net | — | £107.83 | £251.79 |
| Current Tax | — | £0 | £0 |
| Last Payment Date | — | 31/12/2010 | 28/02/2026 |
| Next Due Date | — | — | **28/06/2026** |
| Final Payment Date | hidden | hidden | **28/05/2027 (red)** |

#### Payment History Grid

| Column | Description |
|--------|-------------|
| Date | Payment date |
| Gross | Gross amount |
| Cap | Capital element |
| Tax | Tax deducted |
| Post Adj | Post adjustment |
| Net | Net paid |
| Method | B (BACS) |
| Reason | FIRST / PROC / ONEOFF |
| BACS | BACS processing date |
| Hash | System hash |

Data rows: empty for plan "0"/"87"; 9 rows for plan "84" (from 30/04/2010 @£107.83); 9 rows for plan "90" (from 07/07/2025 @£251.79).

#### Tax History Grid

| Column | Description |
|--------|-------------|
| Date | — |
| Code | Tax code (647L\*, 1257L\*, NT) |
| N | Week/month number |
| Gross | — |
| Cumulative | — |
| Free | Tax-free allowance applied |
| Taxable | — |
| Tax | — |
| YTD Tax | Year-to-date |

Data rows: 7 rows for plan "84"; 6 rows for plan "90"; empty otherwise.

Special: `[ ↑ Import ]` icon button (MdFileUpload) in payment history section.
SupervisoryEditModal auto-navigates here via `clanad:switch-tab` custom event.

### 7.8 IncreaseHistoryComponent (`app-increase-history`)

```yaml
columns: [Effective Date, Old Amount, New Amount, Reason, Applied By, ...]
content: static mock rows
```

### 7.9 QuoteDetailsComponent (`app-quote-details`)

```yaml
fields:
  - Original Quote Ref
  - Quote Date [DatePicker]
  - Quote Type
  - Expiry Date [DatePicker]
  - Annual Amount
  - Escalation
  - additional quote detail fields
```

### 7.10 DiaryAuditComponent (`app-diary-audit`)

```yaml
toolbar:
  - [ New Entry ] → MiscDiaryModal (create)
  - [ Edit Entry ] → MiscDiaryModal (edit selected row)
grid_columns: [Date, User, Type, Description]
data:
  plan "84": "Chase for application cheques of AXA", bank validation notes
  plan "87": Bank Validation, EOA Client system notes
  plan "0"/"90": empty
```

### 7.11 NotesComponent (`app-notes`)

```yaml
content: Textarea — free-form policy notes
edit_mode: locked (read-only) unless EditModeService.editing = true
```

### 7.12 LettersComponent (`app-letters`)

```yaml
selector: app-letters
edit_mode: ALWAYS_EDITING context — ALL controls independent of global EditMode
```

#### Letter Selection

```yaml
control: SelectInput (dropdown)
options: list of available letter templates
on_change: resets distribution config; re-mounts distribution section (key= selectedLetter)
validation:
  - Print/Preview with no letter selected → info popup "Please select a letter"
  - Print/Preview with no distribution method ticked → info popup "Please select a distribution method"
```

#### Distribution Info Section

```yaml
controls:
  - Print:   Checkbox — enabled per LETTER_DIST[selectedLetter].print
  - Fax:     Checkbox + TextInput (controlled, onChange=setFaxValue)
             enabled per LETTER_DIST[selectedLetter].fax
             enabled for ALL planCodes (no plan restriction)
  - Email:   Checkbox + TextInput (controlled, onChange=setEmailValue)
             enabled per LETTER_DIST[selectedLetter].email
             enabled for ALL planCodes (no plan restriction)
  - Send To: Checkboxes [Client] [IFA] [Ceding Scheme] [Other]
             Other visible only for planCode "0"
             enabled per LETTER_DIST[selectedLetter].sendTo
note: All controlled TextInputs bypass global edit-mode lock via isControlled flag
```

#### Actions
```yaml
buttons: [ Print ] [ Preview ]
```

### 7.13 EventsComponent (`app-events`)

```yaml
columns: [Event Date, Event Type, Details, User, Status]
content: static mock rows
```

### 7.14 MaturitiesSurrenderComponent (`app-maturities-surrender`)

```yaml
fields:
  - Maturity Date [DatePicker]
  - Surrender Date [DatePicker]
  - Surrender Value
  - Reason [v]
  - additional fields
```

### 7.15 LoaPoaComponent (`app-loa-poa`)

```yaml
columns: [Type, Name, Start Date, End Date, Status, Actions]
actions: [ Add LOA ] [ Add POA ]
content: static mock rows
```

---

## 8. Modals & Dialogs

All modals follow the same LVE panel pattern:
- Outer: `fixed inset-0 z-[60] flex items-center justify-center bg-black/40`
- Panel: `lve-panel bg-white` with specific width
- Header: `lve-panel-header` (navy `#00263e`, white text, Livvic semibold)
- Close button: `w-7 h-7 rounded-full bg-white/10 hover:bg-[#d72714]` (MdClose)
- Body: `lve-panel-body`

---

### 8.1 FindPolicyModal

```yaml
selector:  app-find-policy-modal
width:     1200px
height:    96vh
trigger:   Toolbar › Search / Options › Search (F5) / clanad:open-find-policy event
services:  [PlanCodeService]
```

#### Search Controls
```yaml
- Search For: text input (filters by active column)
- Policy Status radios: Pending / Completed / Shelved / ALL (default)
- Column headers: clickable — sets active search column (highlighted + underlined)
  Columns: POLICY_REF | PLANTYPE | PLAN_CODE | SURNAME_1_UPPER | NAT_INS_NO_1 |
           ORIGINALQUOTE | STATUS | PH_POST_CODE | IFA_REF | DOB_1 | POLICY_NO | COCODE
```

#### Policy Grid
```yaml
rows:
  - { planCode: "0",  planType: "master", policyRef: "dbePolNo", surname: "Master" }
    → other cols empty for planCode "0" (only POLICY_REF/PLANTYPE/PLAN_CODE/SURNAME_1_UPPER shown)
  - { planCode: "87", planType: "FTA",    policyRef: "233451",   surname: "UGGIU",        natInsNo: "JK-90-90-90-C" }
  - { planCode: "84", planType: "PRP",    policyRef: "111834",   surname: "TESTPTBBBIDE", natInsNo: "PK-25-10-58-A" }
  - { planCode: "90", planType: "MCP",    policyRef: "227813",   surname: "TESTCTCCHIBD", natInsNo: "CH-10-05-59-A" }
selection: row highlight #003578 (dark blue) + white text
interaction:
  single_click:   updates selection + detail panel
  double_click:   sets planCode context + closes modal
padded_to: minimum 4 rows (blank rows fill remainder)
```

#### Detail Panel
```yaml
fields: [Premium, Full Name 1, Full Name 2]
cheques_rec_grid: Transfer Company | Date | Amount (2 empty rows)
all_fields: read-only (bg #CCCCCC, border #ACACAC)
```

#### Actions
```yaml
- OK:     sets planCode + surname + policyRef in PlanCodeService; closes
- Cancel: closes without changes
```

---

### 8.2 ConfirmDialog

```yaml
selector:  app-confirm-dialog
width:     360px
header:    "Confirm" (default, customisable)
icon:      MdHelpOutline (blue, 32px)
inputs:    [open: boolean, title: string, message: string]
outputs:   [onYes: (), onNo: ()]
actions:   [ No ] [ Yes ]
```

#### Instances

| Trigger | Message | Yes Action |
|---------|---------|------------|
| Toolbar › New App | "Create a new Application?" | QuoteLookupModal |
| Toolbar › Sim App | "Are you sure you wish to generate simultaneous policy?" | QuoteLookupModal |
| Supervisor › Status Change › Expired (plan 90) | "Confirm status change to Expired?" | close |
| Supervisor › C(ancel) Application (plan 90) | "Cancel this application?" | close |
| Process › Payments › Suspend (plan 84) — 2nd click | "Confirm suspend payments?" | close |
| Process › PLA Cancellation (plan 84) | "Confirm PLA cancellation?" | close |

---

### 8.3 QuoteLookupModal

```yaml
selector: app-quote-lookup-modal
trigger:  ConfirmDialog (New App or Sim App) → Yes
width:    ~900px
content:
  nav: [ ◀ Prev ] [ ▶ Next ]  Page N/N  Rows per page [v]  [ Find ]
  grid_columns: [Quote Ref, Date, Type, Status, Gross, Net, Expiry, ...]
  actions: [ OK ] [ Cancel ]
```

---

### 8.4 PullQuoteModal

```yaml
selector: app-pull-quote-modal
triggers:
  - Toolbar › New Quote (disabled for planCode 84/90)
  - Supervisor › Pull Quote (planCode 84/90 only)
width:    ~900px
content:
  nav: [ ◀ Prev ] [ ▶ Next ]  Page N/N  Rows per page [v]  [ Find ]
  grid_columns: [Quote Ref, Date, Plan, Status, Premium, Escalation, ...]
  actions: [ OK ] [ Cancel ]
```

---

### 8.5 TaxCertificateModal

```yaml
selector: app-tax-certificate-modal
trigger:  Print › Tax Certificate (planCode "84" only)
width:    ~400px
fields:
  - Year:    SelectInput [v 2024/2025]
  - Copy No: SelectInput [v 1]
actions:  [ Print ] [ Cancel ]
```

---

### 8.6 CopyP60Modal

```yaml
selector: app-copy-p60-modal
trigger:  Print › Copy P60 (planCode "84" only)
width:    ~400px
fields:
  - Tax Year: SelectInput [v 2024/2025]
actions:  [ Print ] [ Cancel ]
```

---

### 8.7 AboutModal

```yaml
selector: app-about-modal
trigger:  Help › About (all plans)
width:    ~380px
content:
  - LV= logo
  - "Client Annuity Administration System (CLANAD)"
  - "Version: 1.0.0  Build: 2025"
  - "Liverpool Victoria Friendly Society Limited"
actions: [ OK ]
```

---

### 8.8 AmendChequesModal

```yaml
selector: app-amend-cheques-modal
trigger:  Supervisor › Amend Cheques (all plans)
services: [ChequesService]
width:    ~600px
content:
  - cheques grid (shared with BankAccDetailsComponent via ChequesService)
    columns: [Cheque No, Date, Amount, Status]
  - Status override: SelectInput [v Received / Returned / Banked]
actions: [ Save ] [ Cancel ]
```

---

### 8.9 CompletionCheckerModal

```yaml
selector: app-completion-checker-modal
trigger:  Options › Check Completion (planCode "0" / "87" — default menus only)
width:    ~600px
content:
  - validation results grid: [Item, Status ✓/✗, Message]
    items: Bank Details / Annuitant DOB / NI Number / IFA Reference / etc.
actions: [ Close ]
```

---

### 8.10 ScreenPrintModal

```yaml
selector: app-screen-print-modal
trigger:  Options › Screen Print (F1) — all plans
width:    ~400px
content:
  - Print destination radios: Default printer / PDF
actions: [ Print ] [ Cancel ]
```

---

### 8.11 AmendIfaModal

```yaml
selector: app-amend-ifa-modal
triggers:
  - Options › Amend IFA (plans "0"/"87")
  - Supervisor › Amend IFA (all plans)
width:    ~480px
fields:
  - IFA Reference: TextInput
  - IFA Name:      TextInput
  - Commission %:  TextInput
actions: [ Save ] [ Cancel ]
```

---

### 8.12 P45DetailsModal

```yaml
selector: app-p45-details-modal
triggers:
  - Options › P45 Details (planCode "84"/"90")
  - Process › P45 details (planCode "0"/"87")
width:    ~480px
fields:
  - Previous Employment Gross: TextInput
  - Previous Employment Tax:   TextInput
  - Week/Month Number:         TextInput
  - P45 Date:                  DatePicker
actions: [ Save ] [ Cancel ]
```

---

### 8.13 SetDeadModal

```yaml
selector: app-set-dead-modal
trigger:  Process › Set Dead › Life One (planCode "84" only)
width:    ~440px
fields:
  - Date of Death:  DatePicker
  - Cause of Death: TextInput
actions: [ Confirm ] [ Cancel ]
```

---

### 8.14 "No Second Life" Info Popup

```yaml
trigger:  Process › Set Dead › Life Two/Current Beneficiary (planCode "84" only)
style:    simple info dialog (not full modal)
message:  "There is no second life on this policy."
actions:  [ OK ]
```

---

### 8.15 CedingSchemeModal

```yaml
selector: app-ceding-scheme-modal
trigger:  Process › Ceding Scheme Details (planCode "84" only)
inputs:   [planCode: string]
width:    ~500px
fields:
  - Ceding Company:  TextInput
  - Scheme Name:     TextInput
  - Transfer Value:  TextInput
  - Transfer Date:   DatePicker
actions: [ Save ] [ Cancel ]
```

---

### 8.16 EditBankDetailsModal

```yaml
selector: app-edit-bank-details-modal
trigger:  Bank Acc Details tab › [ Edit Bank Details ] button
width:    ~480px
fields:
  - Sort Code:      TextInput
  - Account No:     TextInput
  - Account Name:   TextInput
  - Bank Reference: TextInput
actions: [ Save ] [ Cancel ]
```

---

### 8.17 SupervisoryEditModal

```yaml
selector: app-supervisory-edit-modal
triggers:
  - Supervisor › Supervisory Edit (planCode "84" and "90" only)
  SIDE EFFECT: emits "clanad:switch-tab" event with detail "payments"
               → AppComponent switches active tab to Payments before opening modal
inputs:   [planCode: string]
width:    ~500px
fields:
  - Override Gross: TextInput
  - Override Net:   TextInput
  - Override Tax:   TextInput
  - Reason:         SelectInput [v]
actions: [ Apply ] [ Cancel ]
```

---

### 8.18 BankChangesReportModal

```yaml
selector: app-bank-changes-report-modal
trigger:  Supervisor › Bank Detail Changes › Bank Changes Awaiting Approval (planCode "90" only)
width:    ~800px
nav:      pill buttons [ ◀ ] [ ▶ ]  + [ Print ] [ Find ]
grid_columns: [Policy, Old Sort Code, Old Account, New Sort Code, New Account, ...]
actions:  [ Approve ] [ Reject ] [ Close ]
```

---

### 8.19 ReprintAnnualStatementsModal

```yaml
selector: app-reprint-annual-statements-modal
trigger:  Supervisor › Reprint Annual Statements (all plans)
width:    ~440px
fields:
  - Tax Year:   SelectInput [v 2024/2025]
  - Policy Ref: TextInput
actions: [ Print ] [ Cancel ]
```

---

### 8.20 RecalcAnnStatModal

```yaml
selector: app-recalc-ann-stat-modal
trigger:  Supervisor › Annual Statement Recalculation (all plans)
width:    ~480px
fields:
  - Tax Year:   SelectInput [v 2024/2025]
  - Policy Ref: TextInput
  - Reason:     TextInput
actions: [ Recalculate ] [ Cancel ]
```

---

### 8.21 ReprintMaturityModal

```yaml
selector: app-reprint-maturity-modal
trigger:  Supervisor › Reprint Maturity Letters (all plans)
width:    ~480px
fields:
  - Policy Ref:    TextInput
  - Maturity Date: DatePicker
  - Letter Type:   SelectInput [v]
actions: [ Print ] [ Cancel ]
```

---

### 8.22 MiscDiaryModal

```yaml
selector: app-misc-diary-modal
triggers:
  - Diary & Audit Trail tab › [ New Entry ] (create mode)
  - Diary & Audit Trail tab › [ Edit Entry ] (edit mode, selected row)
width:    ~500px
fields:
  - Date:        DatePicker
  - Type:        SelectInput [v]
  - Description: Textarea
  - User:        TextInput "UAT3" (read-only)
actions: [ Save ] [ Cancel ]
```

---

### 8.23 DoctorDatabaseModal

```yaml
selector: app-doctor-database-modal
trigger:  Annuitant Details tab › Doctor lookup button (···)
width:    ~700px
search:   text input + [ Find ]
grid_columns: [Name, Practice, Address, Phone]
actions:  [ Select ] [ Cancel ]
```

---

### 8.24 CrsModal

```yaml
selector: app-crs-modal
trigger:  Toolbar › CRS
width:    ~480px
fields:
  - CRS Status:       TextInput
  - Country of Res.:  SelectInput [v]
  - TIN:              TextInput
  - Reason No TIN:    SelectInput [v]
actions: [ Save ] [ Cancel ]
```

---

### 8.25 ChequeLoggerModal

```yaml
selector: app-cheque-logger-modal
trigger:  Toolbar › Log
services: [ChequesService]
width:    ~700px
grid_columns: [Date, Cheque No, Amount, Received From, Status]
actions:  [ Close ]
```

---

### 8.26 ReportsModal

```yaml
selector: app-reports-modal
trigger:  Toolbar › Reports
width:    ~500px
fields:
  - Report Type:  SelectInput [v]
  - Date From:    DatePicker
  - Date To:      DatePicker
  - Policy Ref:   TextInput (optional filter)
actions: [ Generate ] [ Cancel ]
```

---

### 8.27 CompanySelectionModal

```yaml
selector: app-company-selection-modal
trigger:  Toolbar › Company
width:    ~600px
grid_columns: [Code, Name, Type, Status]
sample_row: { code: "STALW-00", name: "Stalwart Life", type: "Annuity", status: "Active" }
actions:  [ Select ] [ Cancel ]
```

---

### 8.28 SimultaneousPoliciesPopup (inline, not a routed modal)

```yaml
trigger:  PolicyHeader › [···] More button
host:     PolicyHeaderComponent (inline overlay, not a separate modal component)
width:    460px
header:   "Simultaneous Policies" (navy bar)
grid:
  columns: [Policy No, Status, Product Type]
  rows:    [{ policyNo: "233424", status: "P", productType: "FTA" }] + 9 blank rows
  selection: #05579B dark blue fill when row clicked
actions:
  - Open: lve-btn (primary), disabled until row selected
  - Cancel: lve-btn-secondary
```

---

### 8.29 ViewNotionalValueModal

```yaml
selector: app-view-notional-value-modal
trigger:  (internal — via custom event or button not exposed in main menus)
width:    ~440px
fields:
  - Policy Ref:       TextInput (read-only)
  - Notional Value:   TextInput (read-only)
  - Calculation Date: TextInput (read-only)
actions: [ Close ]
```

---

### 8.30 CustomerNeedsModal

```yaml
selector: app-customer-needs-modal
trigger:  (internal — not exposed in top menus in current build)
width:    ~560px
content:
  - checklist of annuity needs [x] with descriptions
  - Notes: Textarea
actions: [ Save ] [ Cancel ]
```

---

## 9. Custom Events (Cross-Component Communication)

Angular equivalent: use a shared `EventBusService` or `Subject<string>` in place of DOM custom events.

| Event name | Emitted by | Received by | Purpose |
|------------|-----------|-------------|---------|
| `clanad:open-find-policy` | HeaderComponent (Options › Search) | ToolbarComponent | Opens FindPolicyModal from menu shortcut |
| `clanad:switch-tab` | HeaderComponent (Supervisor › Supervisory Edit) | AppComponent | Switches active tab to "payments" before opening SupervisoryEditModal |

---

## 10. Angular Component Mapping

| Current React component | Angular component | Selector |
|------------------------|-------------------|----------|
| `App.tsx` | `AppComponent` | `app-root` |
| `Header.tsx` | `HeaderComponent` | `app-header` |
| `Footer.tsx` | `FooterComponent` | `app-footer` |
| `Toolbar.tsx` | `ToolbarComponent` | `app-toolbar` |
| `PolicyHeader.tsx` | `PolicyHeaderComponent` | `app-policy-header` |
| `TabBar.tsx` | `TabBarComponent` | `app-tab-bar` |
| `StatusBar.tsx` | `StatusBarComponent` | `app-status-bar` |
| `PlanCodeContext` | `PlanCodeService` | `@Injectable providedIn: 'root'` |
| `EditModeContext` | `EditModeService` | `@Injectable providedIn: 'root'` |
| `ChequesContext` | `ChequesService` | `@Injectable providedIn: 'root'` |
| `Field.tsx › TextInput` | `TextInputComponent` | `app-text-input` |
| `Field.tsx › SelectInput` | `SelectInputComponent` | `app-select-input` |
| `Field.tsx › Checkbox` | `CheckboxComponent` | `app-checkbox` |
| `Field.tsx › Section` | `SectionComponent` | `app-section` |
| `Field.tsx › Field` | `FieldComponent` | `app-field` |
| `DatePicker.tsx` | `DatePickerComponent` | `app-date-picker` |
| `ConnectedAddress.tsx` | `ConnectedAddressComponent` | `app-connected-address` |
| `ConfirmDialog.tsx` | `ConfirmDialogComponent` | `app-confirm-dialog` |
| `tabs/ApplicationDetailsTab` | `ApplicationDetailsComponent` | `app-application-details` |
| `tabs/AnnuitantDetailsTab` | `AnnuitantDetailsComponent` | `app-annuitant-details` |
| `tabs/ContactsTab` | `ContactsComponent` | `app-contacts` |
| `tabs/ContactsTab2` | `Contacts2Component` | `app-contacts2` |
| `tabs/PolicyDetailsTab` | `PolicyDetailsComponent` | `app-policy-details` |
| `tabs/BankAccDetailsTab` | `BankAccDetailsComponent` | `app-bank-acc-details` |
| `tabs/PaymentsTab` | `PaymentsComponent` | `app-payments` |
| `tabs/IncreaseHistoryTab` | `IncreaseHistoryComponent` | `app-increase-history` |
| `tabs/QuoteDetailsTab` | `QuoteDetailsComponent` | `app-quote-details` |
| `tabs/DiaryAuditTab` | `DiaryAuditComponent` | `app-diary-audit` |
| `tabs/NotesTab` | `NotesComponent` | `app-notes` |
| `tabs/LettersTab` | `LettersComponent` | `app-letters` |
| `tabs/EventsTab` | `EventsComponent` | `app-events` |
| `tabs/MaturitiesSurrenderTab` | `MaturitiesSurrenderComponent` | `app-maturities-surrender` |
| `tabs/LoaPoaTab` | `LoaPoaComponent` | `app-loa-poa` |
| `FindPolicyModal` | `FindPolicyModalComponent` | `app-find-policy-modal` |
| `QuoteLookupModal` | `QuoteLookupModalComponent` | `app-quote-lookup-modal` |
| `PullQuoteModal` | `PullQuoteModalComponent` | `app-pull-quote-modal` |
| `TaxCertificateModal` | `TaxCertificateModalComponent` | `app-tax-certificate-modal` |
| `CopyP60Modal` | `CopyP60ModalComponent` | `app-copy-p60-modal` |
| `AboutModal` | `AboutModalComponent` | `app-about-modal` |
| `AmendChequesModal` | `AmendChequesModalComponent` | `app-amend-cheques-modal` |
| `CompletionCheckerModal` | `CompletionCheckerModalComponent` | `app-completion-checker-modal` |
| `ScreenPrintModal` | `ScreenPrintModalComponent` | `app-screen-print-modal` |
| `AmendIfaModal` | `AmendIfaModalComponent` | `app-amend-ifa-modal` |
| `P45DetailsModal` | `P45DetailsModalComponent` | `app-p45-details-modal` |
| `SetDeadModal` | `SetDeadModalComponent` | `app-set-dead-modal` |
| `CedingSchemeModal` | `CedingSchemeModalComponent` | `app-ceding-scheme-modal` |
| `EditBankDetailsModal` | `EditBankDetailsModalComponent` | `app-edit-bank-details-modal` |
| `SupervisoryEditModal` | `SupervisoryEditModalComponent` | `app-supervisory-edit-modal` |
| `BankChangesReportModal` | `BankChangesReportModalComponent` | `app-bank-changes-report-modal` |
| `ReprintAnnualStatementsModal` | `ReprintAnnualStatementsModalComponent` | `app-reprint-annual-statements-modal` |
| `RecalcAnnStatModal` | `RecalcAnnStatModalComponent` | `app-recalc-ann-stat-modal` |
| `ReprintMaturityModal` | `ReprintMaturityModalComponent` | `app-reprint-maturity-modal` |
| `MiscDiaryModal` | `MiscDiaryModalComponent` | `app-misc-diary-modal` |
| `DoctorDatabaseModal` | `DoctorDatabaseModalComponent` | `app-doctor-database-modal` |
| `CrsModal` | `CrsModalComponent` | `app-crs-modal` |
| `ChequeLoggerModal` | `ChequeLoggerModalComponent` | `app-cheque-logger-modal` |
| `ReportsModal` | `ReportsModalComponent` | `app-reports-modal` |
| `CompanySelectionModal` | `CompanySelectionModalComponent` | `app-company-selection-modal` |
| `ViewNotionalValueModal` | `ViewNotionalValueModalComponent` | `app-view-notional-value-modal` |
| `CustomerNeedsModal` | `CustomerNeedsModalComponent` | `app-customer-needs-modal` |

---

*Document generated: May 2026. Covers CLANAD LVE Component Library recreation —
4 planCode variants · 15 tab components · 30 modal/dialog components · 3 services.*
