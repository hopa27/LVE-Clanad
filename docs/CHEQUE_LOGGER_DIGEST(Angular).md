# Cheque Logger — Application Digest

## 1. Feature

| Field         | Value                                                                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name          | Cheque Logger                                                                                                                                                                                                                                               |
| Version       | 1.0.0                                                                                                                                                                                                                                                       |
| Type          | Modal window within the CLANAD (Client Annuity Administration) static web app — recreation of the legacy Windows desktop dialog                                                                                                                             |
| Description   | Liverpool Victoria Friendly Society Limited internal screen for logging, posting and searching cheques against a selected policy. Operates entirely client-side over an injectable in-memory store; new cheques are propagated to the Bank Acc Details tab. |
| Framework     | Angular 17 (standalone components, signals) + TypeScript                                                                                                                                                                                                    |
| Styling       | Tailwind CSS v4 (utility classes in templates) + global LVE design tokens in `src/styles.scss` (`.lve-panel`, `.lve-input`, `.lve-btn`, `.lve-btn-secondary`, `.lve-btn-sm`, `.lve-grid`, `.lve-panel-header`, `.lve-panel-body`)                            |
| Icons         | `@ng-icons/material-icons` (Material Design line set) — registered per-component via `provideIcons({ matAdd, matSave, matEdit, matDelete, matLightbulbOutline, matFolderOpen, matClose, matSearch })` and rendered with `<ng-icon name="matSave">`          |
| Dialog host   | Angular CDK Dialog (`@angular/cdk/dialog`) — opened via `Dialog.open(ChequeLoggerComponent, { panelClass: 'lve-panel-dialog' })`                                                                                                                            |
| Forms         | `ReactiveFormsModule` — `FormControl<string>` for Cheque No, Find input, and disabled/readonly fields                                                                                                                                                       |
| Routing       | None — the Cheque Logger lives entirely as a modal dialog                                                                                                                                                                                                   |
| State         | Local component `signal()` / `computed()` plus a singleton `ChequesService` providing `signal<Cheque[]>`                                                                                                                                                    |
| Change det.   | `ChangeDetectionStrategy.OnPush` on every standalone component; reactive updates driven by signals                                                                                                                                                           |
| Build         | Angular CLI (`ng build`) → static `dist/clanad/browser/` output                                                                                                                                                                                             |
| DI            | Standalone APIs only — `bootstrapApplication(AppComponent, { providers: [provideAnimations(), { provide: DIALOG_SCROLL_STRATEGY, useFactory: ... }] })` in `src/main.ts`                                                                                    |

### Fonts

- **Heading / buttons / labels:** Livvic
- **Body / inputs / grid:** Mulish

### Brand colors (used inside the modal)

| Token         | Hex        | Usage                                |
| ------------- | ---------- | ------------------------------------ |
| primary_blue  | `#04589b`  | Secondary button border / text       |
| deep_blue     | `#003578`  | Hover fill for both button variants  |
| navy          | `#00263e`  | Modal title bar, label text          |
| accent_blue   | `#006cf4`  | Primary buttons                      |
| title_blue    | `#002f5c`  | Grid header text, data grid row band |
| gray_border   | `#BBBBBB`  | Modal / card borders                 |
| text          | `#3d3d3d`  | Body text                            |
| muted         | `#979797`  | Disabled button border / text        |
| error_red     | `#d72714`  | Close button hover fill              |
| row_zebra     | `#e7ebec34`| Alternate grid rows                  |

---

## 2. Entry Point

The Cheque Logger is launched from the main shell toolbar.

### 2.1 ToolbarComponent → Log button

```yaml
selector: app-toolbar
trigger:
  label: "Log"
  icon: "matHistory"
  enabled: "!editing()"
  action: "(click)=openChequeLogger()"
launcher: |
  openChequeLogger() {
    this.dialog.open(ChequeLoggerComponent, {
      panelClass: 'lve-panel-dialog',
      width: '920px',
      maxHeight: '90vh',
      hasBackdrop: true,
      backdropClass: 'lve-modal-backdrop',
      disableClose: false,   // ESC closes
      autoFocus: 'first-tabbable',
    });
  }
```

No other entry points exist; the modal is not deep-linkable.

---

## 3. Screen — Cheque Logger Modal

### 3.1 ChequeLoggerComponent

```yaml
selector: app-cheque-logger
file: src/app/components/cheque-logger/cheque-logger.component.ts
standalone: true
change_detection: OnPush
imports:
  - CommonModule
  - ReactiveFormsModule
  - NgIconComponent
  - ModalHeaderComponent
  - ToolBtnComponent
  - DataGridComponent
  - InformationDialogComponent
host:
  class: "lve-panel bg-white w-[920px] max-w-full max-h-[90vh] flex flex-col"
inputs: []
outputs:
  - closed: "EventEmitter<void>  // emitted when the dialog ref closes"
injects:
  - "private readonly cheques = inject(ChequesService)"
  - "private readonly dialogRef = inject(DialogRef<ChequeLoggerComponent>)"
  - "private readonly dialog    = inject(Dialog)   // used to open InformationDialogComponent"
signals:
  - "mode      = signal<'idle' | 'creating'>('idle')"
  - "posted    = signal<PostedCheque>({ date: '', amount: '', transferCompany: '' })"
  - "selected  = signal<number>(0)"
  - "info      = signal<string | null>(null)"
form_controls:
  - "policyNo            = new FormControl({ value: '225810', disabled: true }, { nonNullable: true })"
  - "transferCompanyHdr  = new FormControl({ value: 'Liverpool Victoria Friendly Society Limited', disabled: true }, { nonNullable: true })"
  - "chequeNo            = new FormControl({ value: '', disabled: true }, { nonNullable: true })"
  - "date                = new FormControl({ value: '', disabled: true }, { nonNullable: true })"
  - "amount              = new FormControl({ value: '', disabled: true }, { nonNullable: true })"
  - "transferCompany     = new FormControl({ value: '', disabled: true }, { nonNullable: true })"
  - "findValue           = new FormControl('', { nonNullable: true })"
```

### 3.2 Layout sections

| Section            | Element                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Title bar          | `<app-modal-header title="Cheque Logger" (close)="dialogRef.close()">` — navy `#00263e`, white text, close `X` with red hover                                      |
| Top action row     | `policyNo` (disabled) + 6 `<app-tool-btn>` icons + `transferCompanyHdr` (disabled)                                                                                 |
| Header fields row  | `Cheque No` (editable in *creating*) · `Date` · `Amount` (right-aligned) · `Transfer Company` (all disabled except `Cheque No` when `mode() === 'creating'`)        |
| Data grid          | `<app-data-grid>` with columns `CHEQNO` · `TRANSFERCOMPANY` · `AMOUNT` (right-aligned) · `LOGGEDBY`; 6 padding rows always present                                  |
| Find row           | `findValue` input + `[ 🔍 Find Cheque ]` secondary button                                                                                                          |

### 3.3 Toolbar actions (`<app-tool-btn>` group)

| Icon name              | Label        | Method            | Behavior                                                                                                                  |
| ---------------------- | ------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `matAdd`               | New          | `startNew()`      | `mode.set('creating')`; enable `chequeNo`; clear `chequeNo`, `date`, `amount`, `transferCompany`; focus `chequeNo` input. |
| `matSave`              | Post Cheque  | `postCheque()`    | Validate + look up `chequeNo` in `ChequesService.lookup()`; on hit populate posted fields and call `cheques.add(...)`.    |
| `matEdit`              | Edit         | `noop()`          | Reserved — no-op in static recreation.                                                                                    |
| `matDelete`            | Delete       | `noop()`          | Reserved — no-op.                                                                                                         |
| `matLightbulbOutline`  | Info         | `noop()`          | Reserved — no-op.                                                                                                         |
| `matFolderOpen`        | Open         | `noop()`          | Reserved — no-op.                                                                                                         |

### 3.4 Find row

- `findValue` is a free-text `FormControl`.
- `[ Find Cheque ]` triggers `findCheque()`:
  - case-insensitive `includes` match against `cheque.chequeNo`;
  - first match → `selected.set(idx)`;
  - no match → no state change (no info dialog).
- `Enter` keypress inside `findValue` is equivalent to clicking the button.

### 3.5 Data grid binding

```ts
@Component({ selector: 'app-data-grid', standalone: true, ... })
export class DataGridComponent<T> {
  rows = input.required<readonly T[]>();
  columns = input.required<readonly GridColumn<T>[]>();
  selectedIndex = model<number>(0);
  rowClick = output<number>();
}
```

```html
<app-data-grid
  [rows]="cheques.cheques()"
  [columns]="GRID_COLS"
  [(selectedIndex)]="selected"
  (rowClick)="selected.set($event)" />
```

`GRID_COLS`:

```ts
const GRID_COLS: GridColumn<Cheque>[] = [
  { key: 'chequeNo',         header: 'CHEQNO',          width: 120 },
  { key: 'transferCompany',  header: 'TRANSFERCOMPANY' },
  { key: 'amount',           header: 'AMOUNT',          width: 120, align: 'right' },
  { key: 'loggedBy',         header: 'LOGGEDBY',        width: 120 },
];
```

---

## 4. Modal-specific Components

### 4.1 ModalHeaderComponent (`src/app/components/modal-header/modal-header.component.ts`)

```yaml
selector: app-modal-header
inputs:
  - "title: string"
outputs:
  - "close: EventEmitter<void>"
template_summary: |
  <header class="lve-panel-header flex items-center justify-between">
    <span>{{ title() }}</span>
    <button type="button" class="lve-icon-btn" (click)="close.emit()" aria-label="Close" title="Close">
      <ng-icon name="matClose" size="18"></ng-icon>
    </button>
  </header>
```

### 4.2 ToolBtnComponent (`src/app/components/tool-btn/tool-btn.component.ts`)

```yaml
selector: app-tool-btn
inputs:
  - "icon: string                 // ng-icons registered name (e.g. 'matSave')"
  - "title: string                // tooltip + aria-label"
  - "disabled?: boolean = false"
outputs:
  - "click: EventEmitter<void>"
host_class: "inline-flex items-center justify-center w-9 h-9 rounded-[8px] border border-[#04589b] text-[#04589b] hover:bg-[#04589b] hover:text-white disabled:opacity-50"
```

### 4.3 InformationDialogComponent (nested CDK dialog)

```yaml
selector: app-information-dialog
file: src/app/components/information-dialog/information-dialog.component.ts
launcher: |
  this.dialog.open(InformationDialogComponent, {
    data: { message: 'Cheque number not found.' },
    panelClass: 'lve-panel-dialog',
    width: '440px',
    hasBackdrop: true,
  });
inputs (via DIALOG_DATA):
  - "message: string"
outputs:
  - "(via DialogRef.close())"
layout:
  - title_bar: "Information"
  - body: "<p>{{ data.message }}</p>"
  - footer: "[ OK ] (primary, min-width 100px, centered)"
```

### 4.4 DataGridComponent

```yaml
selector: app-data-grid
file: src/app/components/data-grid/data-grid.component.ts
type_params: <T>
inputs:
  - "rows: readonly T[]"
  - "columns: readonly GridColumn<T>[]"
  - "minRows?: number = 6     // pads empty rows so the grid keeps a fixed height"
models:
  - "selectedIndex: number"
outputs:
  - "rowClick: EventEmitter<number>"
features:
  - "ARIA role=grid; selected row aria-selected=true"
  - "Even rows tinted with row_zebra (#e7ebec34)"
  - "Hover row → highlight #05579B / white text"
  - "Right-aligned columns via column.align === 'right'"
```

---

## 5. Domain Model & Service

### 5.1 Types

```ts
export type Cheque = {
  chequeNo:        string;   // 6-digit numeric
  transferCompany: string;
  amount:          string;   // formatted '12,450.00'
  date:            string;   // 'dd/mm/yyyy'
  loggedBy:        string;   // 6-char user code (e.g. 'JSMITH')
};

export type PostedCheque = Pick<Cheque, 'date' | 'amount' | 'transferCompany'>;
```

### 5.2 ChequesService (`src/app/services/cheques.service.ts`)

```yaml
@Injectable({ providedIn: 'root' })
state:
  - "_cheques: WritableSignal<Cheque[]>  // private"
  - "cheques: Signal<Cheque[]>          // public readonly"
methods:
  - "lookup(chequeNo: string): Cheque | undefined   // searches CHEQUE_DB (static catalogue)"
  - "add(cheque: Cheque): void                       // append to _cheques (deduped by chequeNo)"
  - "set(list: Cheque[]): void                       // replace entire list"
  - "isSeed(chequeNo: string): boolean               // true for SEED_CHEQUE_NOS"
seeds:
  INITIAL_CHEQUES: ["232693", "232694", "232695"]
  SEED_CHEQUE_NOS: ["232693", "232694", "232695"]   # excluded from BankAccDetailsTab propagation
```

### 5.3 CHEQUE_DB (lookup catalogue)

| chequeNo | transferCompany                              | amount    | date       |
| -------- | -------------------------------------------- | --------- | ---------- |
| 232693   | Liverpool Victoria Friendly Society Limited  | 12,450.00 | 14/04/2026 |
| 232694   | Aviva Life & Pensions UK Limited             |  3,200.50 | 15/04/2026 |
| 232695   | Legal & General Assurance Society            |  8,775.00 | 16/04/2026 |
| 232696   | Standard Life Assurance Limited              |  5,410.75 | 17/04/2026 |
| 232697   | Prudential Assurance Company Limited         |  9,940.20 | 18/04/2026 |

Cheque numbers outside `CHEQUE_DB` are rejected with an Information
dialog (see §6.2).

### 5.4 Cross-component propagation

`BankAccDetailsTabComponent` injects `ChequesService` and renders a
computed list of transfers:

```ts
readonly extraTransfers = computed<TransferRow[]>(() =>
  this.cheques.cheques()
    .filter(c => !this.cheques.isSeed(c.chequeNo))
    .map(c => ({
      company: c.transferCompany,
      ref:     c.chequeNo,
      date:    c.date,
      amount:  c.amount,
    })),
);
```

Appended rows are merged into the tab's `TRANSFERS` table directly below
the static seed data.

---

## 6. State Machine & Validation

### 6.1 Mode signal

```
mode = signal<'idle' | 'creating'>('idle')
```

| Current mode | Trigger              | Next mode    | Side effects                                                |
| ------------ | -------------------- | ------------ | ----------------------------------------------------------- |
| idle         | click `New`          | creating     | enable `chequeNo`; clear posted fields                      |
| creating     | click `Post Cheque`  | idle (post)  | populate posted fields + push row (on success path only)    |
| creating     | click `Post Cheque`  | creating     | open `InformationDialog` (failure paths)                    |
| creating     | click `X` / `Esc`    | —            | close dialog (state discarded)                              |

### 6.2 `postCheque()` validation table

| Condition                                                        | Outcome                                                                                                                                                       |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chequeNo.value.trim() === ''`                                   | `InformationDialog({ message: 'Please enter a cheque number.' })`; remain in *creating*                                                                       |
| `cheques.lookup(chequeNo)` returns `undefined`                   | `InformationDialog({ message: 'Cheque number not found.' })`; remain in *creating*                                                                            |
| `cheques.cheques().some(c => c.chequeNo === chequeNo.value)`     | `InformationDialog({ message: 'Cheque already logged.' })`; remain in *creating*                                                                              |
| otherwise                                                        | `posted.set({ date, amount, transferCompany })`; `cheques.add({ ...lookupHit, loggedBy: currentUser })`; `mode.set('idle')`; new row appears in the data grid |

---

## 7. Keyboard & Accessibility

| Key                       | Effect                                                            |
| ------------------------- | ----------------------------------------------------------------- |
| `Esc`                     | Close the Cheque Logger (CDK Dialog default)                      |
| `Tab` / `Shift+Tab`       | Toolbar buttons → header fields → grid rows → find input          |
| `Enter` in Cheque No      | Same as clicking **Post Cheque** when `mode() === 'creating'`     |
| `Enter` in Find input     | Same as clicking **Find Cheque**                                  |
| `↑ / ↓` inside grid       | Move `selectedIndex` (handled by `DataGridComponent`)              |

ARIA:

- Root dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="cheque-logger-title"`
- Information sub-dialog: `role="alertdialog"`, `aria-describedby="info-message"`
- Grid: `role="grid"`; selected row `aria-selected="true"`
- Disabled inputs use `aria-disabled="true"` and `tabindex="-1"`

---

## 8. Wireframe (for reference)

```
+--------------------------------------------------------------------------------------+
| Cheque Logger                                                                  [ X ] |
+--------------------------------------------------------------------------------------+
| [ 225810 ]  [▣][💾][✎][🗑][💡][📂]                                                  |
|             [ Liverpool Victoria Friendly Society Limited                          ] |
|                                                                                      |
| Cheque No     Date          Amount             Transfer Company                      |
| [        ]   [        ]    [          ]       [                                   ] |
|                                                                                      |
| +------------------------------------------------------------------------------+    |
| | CHEQNO  | TRANSFERCOMPANY                              | AMOUNT  | LOGGEDBY  |    |
| | 232693  | Liverpool Victoria Friendly Society Limited  |12,450.00| JSMITH    |    |
| | 232694  | Aviva Life & Pensions UK Limited             | 3,200.50| AKHAN     |    |
| | 232695  | Legal & General Assurance Society            | 8,775.00| RBROWN    |    |
| | (empty padding rows…)                                                        |    |
| +------------------------------------------------------------------------------+    |
|                                                                                      |
| [          ]   [ 🔍 Find Cheque ]                                                    |
+--------------------------------------------------------------------------------------+
```

---

## 9. File Layout (Angular)

```
src/app/
├── components/
│   ├── cheque-logger/
│   │   ├── cheque-logger.component.ts
│   │   ├── cheque-logger.component.html
│   │   └── cheque-logger.component.scss
│   ├── modal-header/
│   ├── tool-btn/
│   ├── data-grid/
│   └── information-dialog/
├── services/
│   └── cheques.service.ts
├── models/
│   └── cheque.model.ts                # Cheque, PostedCheque, GridColumn
└── data/
    └── cheque-db.ts                   # CHEQUE_DB, INITIAL_CHEQUES, SEED_CHEQUE_NOS
```
