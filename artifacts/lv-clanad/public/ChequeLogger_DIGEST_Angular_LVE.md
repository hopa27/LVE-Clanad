# Cheque Logger — Application Digest (Angular / LVE Component Library)

---

## 1. Overview

| Field | Value |
|-------|-------|
| Name | Cheque Logger |
| Host modal | `ChequeLoggerModal` |
| Trigger | Toolbar › **Log** button (MdHistory icon), enabled only when `!editing` |
| Purpose | Log, post, find, and soft-delete transfer cheques against the current policy. Shared cheque state flows to Bank Acc Details tab and Amend Cheques modal via ChequesService. |
| Width | 1200px |
| Max height | 90vh |
| z-index | 60 (sub-popups at 70) |
| Background | `bg-white`, LVE panel styling |
| Backdrop | `bg-black/40` |

---

## 2. Component Structure

```
ChequeLoggerModal
  ├─ Header bar (lve-panel-header, navy)
  ├─ Top action row
  │    ├─ Policy No field (disabled)
  │    ├─ ToolBtn × 6 (Add / Post / Cancel / Delete / Change Company / Open)
  │    └─ Company name field (disabled, flex-1)
  ├─ Header fields row
  │    ├─ Cheque No input (editable when creating)
  │    ├─ Date input (disabled, filled by Post lookup)
  │    ├─ Amount input (disabled, right-aligned, filled by Post lookup)
  │    └─ Transfer Company input (disabled, flex-1, filled by Post lookup)
  ├─ Data grid (11 columns, lve-grid)
  ├─ Find row
  │    ├─ Search text input
  │    └─ Find Cheque button
  ├─ CompanySelectionModal (nested, z-60)
  ├─ Confirm Delete popup (inline, z-70)
  └─ Info popup (inline, z-70)
```

---

## 3. Angular Component Spec

```yaml
selector:     app-cheque-logger-modal
file:         src/app/components/cheque-logger/cheque-logger.component.ts
inputs:
  - open: boolean
outputs:
  - closed: EventEmitter<void>   (maps to onClose)
services:
  - ChequesService               (cheques, addCheque, markChequeDeleted)
change_detection: OnPush
signals:
  - selected      = signal<number>(0)         // selected row index
  - findValue     = signal<string>('')
  - creating      = signal<boolean>(false)
  - draft         = signal<Cheque>({...})     // new cheque being built
  - info          = signal<string | null>(null)
  - companyOpen   = signal<boolean>(false)
  - confirmDelete = signal<Cheque | null>(null)
  - companyName   = signal<string>('Liverpool Victoria Friendly Society Limited')
  - posted        = signal<{date,amount,transferCompany}>({...empty})
```

---

## 4. Header Bar

```yaml
text:       "Cheque Logger"
background: "#00263e" (navy)
font:       Livvic semibold, white
close_btn:
  size:     28×28px, rounded-full
  style:    bg-white/10, hover bg-[#d72714]
  icon:     MdClose (18px)
  action:   emit closed / call onClose()
```

---

## 5. Top Action Row

### 5.1 Policy No Field

```yaml
type:     text input
value:    "225810" (hardcoded)
disabled: true
width:    120px
height:   36px
font:     Mulish 14px
class:    lve-input
title:    "Policy No"
```

### 5.2 Toolbar Buttons (ToolBtn)

All buttons share class: `lve-btn lve-btn-secondary lve-btn-sm !px-2`
Disabled state: `opacity-40 cursor-not-allowed`

| Label | Icon | Enabled condition | Action |
|-------|------|-------------------|--------|
| Add Cheque | MdAddCircle (16px) | `!creating` | `startNew()` |
| Post Cheque | MdPublish (16px) | `creating` | `postCheque()` |
| Cancel | MdCancel (16px) | `creating` | `cancelNew()` |
| Delete | MdDelete (16px) | `!creating` | open Confirm Delete popup for selected row |
| Change Company | MdLightbulb (16px) | always | open CompanySelectionModal |
| Open | MdFolderOpen (16px) | always | no-op |

### 5.3 Company Name Field

```yaml
type:    text input
value:   companyName signal (default "Liverpool Victoria Friendly Society Limited")
         updated by CompanySelectionModal onSelect callback
disabled: true
width:   flex-1
height:  36px
class:   lve-input
```

---

## 6. Header Fields Row

Populated automatically when `postCheque()` finds a match in CHEQUE_DB.
All fields use `height: 36px`, `font-size: 14px`, `class: lve-input`.

| Field | Width | Editable | Source |
|-------|-------|----------|--------|
| Cheque No | 120px | `creating` only | user types; auto-set by `startNew()` |
| Date | 120px | never | `posted.date` from CHEQUE_DB |
| Amount | 140px, right-aligned | never | `posted.amount` from CHEQUE_DB |
| Transfer Company | flex-1 | never | `posted.transferCompany` from CHEQUE_DB |

---

## 7. Data Grid

```yaml
class:   lve-grid w-full text-[12px]
overflow: auto
cell_padding: !px-2 (overrides default)
whitespace:   nowrap (both th and td)
min_rows:     6 blank rows always appended below data rows
row_selection:
  selected_style: background #003578, color #ffffff
  default_style:  inherited (alternating via lve-grid zebra)
  interaction:    click row → setSelected(index)
```

#### Grid Columns (11 total)

| # | Column | Width | Align | Source |
|---|--------|-------|-------|--------|
| 1 | CHEQNO | 80px | left | `cheque.chequeNo` |
| 2 | TRANSFERCOMPANY | flex | left | `cheque.transferCompany` |
| 3 | AMOUNT | 90px | right | `cheque.amount` |
| 4 | LOGGEDBY | 85px | left | `cheque.loggedBy` |
| 5 | DATELOGGED | 105px | left | `cheque.date` |
| 6 | DELETED | 75px | left | `cheque.deleted` ("Y" / "N" / "") |
| 7 | DELETEDDATE | 110px | left | `cheque.deletedDate` |
| 8 | DELETEDBY | 90px | left | `cheque.deletedBy` |
| 9 | ASSIGNED | 80px | left | `cheque.assigned` ("Y" / "N" / "") |
| 10 | ASSIGNEDDATE | 110px | left | `cheque.assignedDate` |
| 11 | ASSIGNEDBY | 95px | left | `cheque.assignedBy` |

---

## 8. Find Row

```yaml
search_input:
  width:   180px
  height:  36px
  class:   lve-input
  binding: [(ngModel)]="findValue"

find_button:
  class:  lve-btn lve-btn-secondary lve-btn-sm
  icon:   MdSearch (16px)
  label:  "Find Cheque"
  action: find first cheque where chequeNo.toLowerCase().includes(findValue.trim().toLowerCase())
          → setSelected(matchIndex)
          No match: no feedback (silent)
```

---

## 9. Business Logic

### 9.1 startNew()

```typescript
startNew(): void {
  const today = new Date().toLocaleDateString('en-GB');
  const lastNo = parseInt(cheques()[cheques().length - 1]?.chequeNo ?? '232695', 10);
  draft.set({
    chequeNo: String(lastNo + 1),
    transferCompany: '',
    amount: '',
    loggedBy: 'JSMITH',
    date: today,
  });
  creating.set(true);
  posted.set({ date: '', amount: '', transferCompany: '' });
}
```

### 9.2 postCheque() — Validation chain

```
1. If draft.chequeNo.trim() === ''
     → info = "Please enter a Cheque No before posting."
     → return (stay in creating state)

2. If CHEQUE_DB[chequeNo] === undefined
     → info = "No cheque found in database for Cheque No {N}."
     → posted cleared
     → return (stay in creating state)

3. If cheques().some(c => c.chequeNo === chequeNo)
     → info = "Cheque No {N} has already been logged."
     → return (stay in creating state)

4. All valid:
     → posted.set(CHEQUE_DB[chequeNo])   // fills Date/Amount/TransferCompany display fields
     → draft updated with CHEQUE_DB data
     → addCheque(newCheque)              // ChequesService
     → selected = cheques().length       // select new row
     → creating.set(false)
```

### 9.3 cancelNew()

```typescript
cancelNew(): void {
  creating.set(false);
  posted.set({ date: '', amount: '', transferCompany: '' });
}
```

### 9.4 saveNew() (manual add, bypasses CHEQUE_DB)

```
1. If draft.chequeNo.trim() === ''
     → info = "Please enter a Cheque No."

2. Else:
     → addCheque(draft)
     → selected = cheques().length
     → creating.set(false)
     → posted cleared
     → info = "Cheque added successfully"
```

### 9.5 Delete (markChequeDeleted)

```typescript
// In ChequesService:
markChequeDeleted(chequeNo: string, deletedBy: string): void {
  const today = new Date().toLocaleDateString('en-GB');
  cheques.update(prev => prev.map(c =>
    c.chequeNo === chequeNo
      ? { ...c, deleted: 'Y', deletedDate: today, deletedBy }
      : c
  ));
}
// deletedBy is hardcoded to "UAT1" from the modal
```

---

## 10. CHEQUE_DB (In-Memory Lookup)

Keyed by cheque number. Used exclusively by `postCheque()` to validate and populate fields.

| Cheque No | Date | Amount | Transfer Company |
|-----------|------|--------|-----------------|
| `232693` | 12/05/2026 | 12,450.00 | Liverpool Victoria Friendly Society Limited |
| `232694` | 13/05/2026 | 3,200.50 | Aviva Life & Pensions UK Limited |
| `232695` | 14/05/2026 | 8,775.00 | Legal & General Assurance Society |
| `232696` | 15/05/2026 | 5,120.75 | Prudential Assurance Company Limited |
| `232697` | 15/05/2026 | 9,980.00 | Standard Life Assurance Limited |

---

## 11. ChequesService (shared state)

```yaml
file:    src/app/services/cheques.service.ts
scope:   providedIn: 'root'  (singleton, shared across all consumers)
consumers:
  - ChequeLoggerModal    (primary: add, delete)
  - BankAccDetailsTab    (display cheque list)
  - AmendChequesModal    (display + status update)

type Cheque = {
  chequeNo:      string
  transferCompany: string
  amount:        string
  loggedBy:      string
  date:          string
  deleted?:      string     // "Y" | "N" | ""
  deletedDate?:  string     // dd/mm/yyyy
  deletedBy?:    string
  assigned?:     string     // "Y" | "N" | ""
  assignedDate?: string     // dd/mm/yyyy
  assignedBy?:   string
}

initial_seed:
  - { chequeNo: "232693", transferCompany: "Liverpool Victoria Friendly Society Limited",
      amount: "12,450.00", loggedBy: "JSMITH", date: "12/05/2026",
      deleted: "N", assigned: "Y", assignedDate: "12/05/2026", assignedBy: "UAT1" }
  - { chequeNo: "232694", transferCompany: "Aviva Life & Pensions UK Limited",
      amount: "3,200.50", loggedBy: "AKHAN", date: "13/05/2026",
      deleted: "N", assigned: "Y", assignedDate: "13/05/2026", assignedBy: "UAT2" }
  - { chequeNo: "232695", transferCompany: "Legal & General Assurance Society",
      amount: "8,775.00", loggedBy: "RBROWN", date: "14/05/2026",
      deleted: "N", assigned: "Y", assignedDate: "14/05/2026", assignedBy: "UAT3" }

methods:
  addCheque(c: Cheque): void              // appends to list
  removeCheque(chequeNo: string): void    // hard remove (unused by ChequeLogger)
  markChequeDeleted(chequeNo, deletedBy): // soft delete: sets deleted/date/by
  setCheques(c: Cheque[]): void           // bulk replace
```

---

## 12. Sub-Modals and Inline Popups

### 12.1 CompanySelectionModal

```yaml
selector:  app-company-selection-modal
trigger:   [💡] Change Company button
z-index:   60
inputs:
  - open:     boolean
outputs:
  - closed:   EventEmitter<void>
  - selected: EventEmitter<string>   // emits company name string
grid:
  columns: [Code, Name, Type, Status]
  sample: { code: "STALW-00", name: "Stalwart Life", type: "Annuity", status: "Active" }
actions:
  Select: emits selected(name) → parent updates companyName display field
  Cancel: emits closed
```

### 12.2 Confirm Delete Popup (inline, not a separate component)

```yaml
z-index:  70
width:    420px
trigger:  [🗑] Delete button, when a row is selected and !creating
header:   "Information" (navy lve-panel-header)
close_btn: top-right × (dismisses = No action)
body:
  text: "Remove this Cheque {chequeNo} from the Log?"
  font: Mulish 14px text-[#3d3d3d]
actions:
  Yes:
    class: lve-btn lve-btn-sm min-w-[100px]
    calls: markChequeDeleted(chequeNo, "UAT1")
           confirmDelete = null
  No:
    class: lve-btn lve-btn-secondary lve-btn-sm min-w-[100px]
    calls: confirmDelete = null (dismiss only)
```

### 12.3 Info Popup (inline, not a separate component)

```yaml
z-index:  70
width:    440px
trigger:  postCheque() / saveNew() validation failures or successes
header:   "Information" (navy lve-panel-header)
close_btn: top-right × (same as OK)
body:
  text: {info signal value}
  font: Mulish 14px text-[#3d3d3d]
actions:
  OK:
    class: lve-btn lve-btn-sm min-w-[100px]
    calls: info = null (dismiss)
```

#### Info Messages

| Trigger | Message |
|---------|---------|
| Post with blank Cheque No | "Please enter a Cheque No before posting." |
| Post with unknown Cheque No | "No cheque found in database for Cheque No {N}." |
| Post with duplicate Cheque No | "Cheque No {N} has already been logged." |
| Manual save (saveNew) with blank Cheque No | "Please enter a Cheque No." |
| Manual save (saveNew) success | "Cheque added successfully" |

---

## 13. HeaderField Sub-Component (internal)

```yaml
description: reusable label + dark navy display box for read-only info fields
background:  #002f5c (dark navy)
text:        white, Mulish 13px
height:      28px
radius:      4px
padding:     px-3
empty_value: "\u00A0" (non-breaking space to preserve height)
```

Used internally by the current React implementation; in Angular, implement as an inline template or a simple `@Component` with `[label]` and `[value]` inputs.

---

## 14. Styling Reference

| Element | Classes / Styles |
|---------|-----------------|
| Modal backdrop | `fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6` |
| Panel | `lve-panel bg-white w-[1200px] max-w-full max-h-[90vh] flex flex-col` |
| Header | `lve-panel-header flex items-center justify-between` |
| Body | `lve-panel-body overflow-auto flex flex-col gap-4` |
| Toolbar buttons | `lve-btn lve-btn-secondary lve-btn-sm !px-2` |
| Grid | `lve-grid w-full text-[12px] [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap` |
| Selected row | `background: #003578; color: #ffffff` |
| Header field box | `h-[28px] rounded-[4px] bg-[#002f5c] text-white px-3 Mulish 13px` |
| Sub-popup backdrop | `fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6` |

---

## 15. Angular Module / Standalone Imports

```typescript
@Component({
  selector: 'app-cheque-logger-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,           // [(ngModel)] for findValue, chequeNo input
    NgIconsModule,         // matAddCircle, matPublish, matCancel,
                           // matDelete, matLightbulb, matFolderOpen,
                           // matSearch, matClose
    CompanySelectionModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChequeLoggerModalComponent {
  // inject ChequesService
}
```

---

*Document generated: May 2026. Covers ChequeLoggerModal — LVE Component Library.*
