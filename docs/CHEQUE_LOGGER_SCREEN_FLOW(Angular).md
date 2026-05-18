# Cheque Logger — Screen Flow (ASCII)

This document captures the **Cheque Logger** modal window in the CLANAD
(Client Annuity Administration) Angular web app, including every field,
toolbar action, data grid, sub-dialog, and the navigation paths between
them.

Target stack: **Angular 17+ standalone components**, Angular Forms
(`FormControl` / `FormGroup`), Angular Signals for local state, and an
injectable `ChequesService` for the shared cheques store.

---

## 1. Entry Points

The modal is opened from the main shell toolbar:

```
+------------------------------------------------------------------------------------------------+
| [LV=]  Client Annuity Administration System                                          [ Logout ]|
+------------------------------------------------------------------------------------------------+
| Toolbar:  [ New App ] [ New Quote ] [ Sim App ] [ Edit ] [ Cancel ] [ Search ]                 |
|           [ Log ] ← opens Cheque Logger    [ CRS ] [ Reports ] [ Company ]                     |
+------------------------------------------------------------------------------------------------+
```

Trigger:

| Source                          | Action                                       |
|---------------------------------|----------------------------------------------|
| Toolbar **Log** button          | `chequeLogger.open()` → `<app-cheque-logger>`|

Implemented as an Angular CDK Dialog or Material Dialog launched from
`ToolbarComponent.onLog()`.

Legend: `[ Button ]`, `[ field ]`, `[v]` = dropdown, `( )` radio,
`[x]` checkbox, `📅` = date picker.

---

## 2. Cheque Logger Modal — Layout

```
+--------------------------------------------------------------------------------------+
| Cheque Logger                                                                  [ X ] |
+--------------------------------------------------------------------------------------+
|                                                                                      |
| [ 225810 ]  [▣ New] [💾 Post] [✎ Edit] [🗑 Del] [💡 Info] [📂 Open]                  |
|             [ Liverpool Victoria Friendly Society Limited                          ] |
|                                                                                      |
| Cheque No        Date           Amount              Transfer Company                 |
| [          ]    [          ]   [             ]    [                               ] |
|                                                                                      |
| +------------------------------------------------------------------------------+    |
| | CHEQNO    | TRANSFERCOMPANY                              | AMOUNT  | LOGGEDBY|    |
| |-----------+----------------------------------------------+---------+---------|    |
| | 232693    | Liverpool Victoria Friendly Society Limited  |12,450.00| JSMITH  |    |
| | 232694    | Aviva Life & Pensions UK Limited             | 3,200.50| AKHAN   |    |
| | 232695    | Legal & General Assurance Society            | 8,775.00| RBROWN  |    |
| |           |                                              |         |         |    |
| |           |                                              |         |         |    |
| +------------------------------------------------------------------------------+    |
|                                                                                      |
| [             ]   [ 🔍 Find Cheque ]                                                 |
|                                                                                      |
+--------------------------------------------------------------------------------------+
```

### 2.1 Field Inventory

| # | Field                | Type                  | Editable        | Source                                            |
|---|----------------------|-----------------------|-----------------|---------------------------------------------------|
| 1 | Policy No            | text                  | disabled (read) | hard-coded `225810` (selected policy context)     |
| 2 | Transfer Company hdr | text                  | disabled (read) | hard-coded `Liverpool Victoria Friendly Society…` |
| 3 | Cheque No            | text (numeric only)   | only in *New*   | `draft.chequeNo`                                  |
| 4 | Date                 | text (dd/mm/yyyy)     | disabled        | filled by **Post** from `ChequesService`          |
| 5 | Amount               | text (right-aligned)  | disabled        | filled by **Post** from `ChequesService`          |
| 6 | Transfer Company     | text                  | disabled        | filled by **Post** from `ChequesService`          |
| 7 | Find input           | text                  | yes             | local `findValue` signal                          |

### 2.2 Toolbar Actions

| Icon | Label          | Method (component)             | Behavior                                                                                                                            |
|------|----------------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| ▣    | New            | `startNew()`                    | Enters *Create* mode → clears `draft`, enables Cheque No input, clears Date/Amount/Transfer Company.                                |
| 💾   | Post Cheque    | `postCheque()`                  | Looks up `draft.chequeNo` in `ChequesService.lookup()`; on hit fills posted fields and calls `chequesService.add(cheque)`.          |
| ✎    | Edit           | `edit()`                        | Reserved — no-op in static recreation.                                                                                              |
| 🗑   | Delete         | `delete()`                      | Reserved — no-op.                                                                                                                   |
| 💡   | Info           | `info()`                        | Reserved — no-op.                                                                                                                   |
| 📂   | Open           | `open()`                        | Reserved — no-op.                                                                                                                   |

### 2.3 Data Grid (`<app-data-grid>`)

* Columns: `CHEQNO`, `TRANSFERCOMPANY`, `AMOUNT` (right-aligned),
  `LOGGEDBY`.
* Rows bound to `chequesService.cheques$` (RxJS) or
  `chequesService.cheques()` (signal).
* Clicking a row sets `selectedIndex` signal.
* 6 empty padding rows are rendered when `cheques.length < 6` to keep
  fixed grid height.

### 2.4 Find Row

* Input bound to `findValue` (`FormControl<string>`).
* `[ Find Cheque ]` triggers `findCheque()`:
  * Case-insensitive `includes` match against `cheque.chequeNo`.
  * First match sets `selectedIndex`. No match → no change.

---

## 3. State Machine

```
                ┌────────────────────┐
                │   IDLE / Browsing  │  ← initial state
                └─────────┬──────────┘
                          │ click [ New ]
                          ▼
                ┌────────────────────┐
                │      CREATING      │  Cheque No editable
                └─────────┬──────────┘
                          │ click [ Post Cheque ]
            ┌─────────────┼──────────────┐
            │             │              │
   chequeNo │      chequeNo unknown      │ chequeNo already logged
   matches  │              │             │
   CHEQUE_DB│              ▼             ▼
            │     ┌──────────────┐  ┌──────────────┐
            │     │ Info Dialog  │  │ Info Dialog  │
            │     │ "Cheque not  │  │ "Cheque      │
            │     │  found"      │  │  already     │
            │     └──────┬───────┘  │  logged"     │
            │            │ OK       └──────┬───────┘
            │            ▼                 ▼
            │      back to CREATING   back to CREATING
            ▼
   ┌────────────────────┐
   │   POSTED / IDLE    │  Date / Amount / Transfer Co populated;
   │  (row added)       │  new row appears in grid + propagated to
   └────────────────────┘  BankAccDetailsTab transfers table.
```

Implementation note: the component holds the state in a signal
`mode = signal<'idle' | 'creating'>('idle')` and `posted = signal<PostedCheque | null>(null)`.

---

## 4. Information Dialog (inner)

Rendered as a nested CDK Dialog (`z-index` above the parent modal) for
validation errors and duplicates.

```
+--------------------------------------------------+
| Information                                [ X ] |
+--------------------------------------------------+
|                                                  |
|   <message text>                                 |
|                                                  |
|              [   OK   ]                          |
+--------------------------------------------------+
```

Triggered messages (verbatim):

| Trigger                                            | Message                                                       |
|----------------------------------------------------|---------------------------------------------------------------|
| Post Cheque with unknown `chequeNo`                | `Cheque number not found.`                                    |
| Post Cheque with `chequeNo` already in the grid    | `Cheque already logged.`                                      |
| Post Cheque with blank `chequeNo`                  | `Please enter a cheque number.`                               |

Dismissed via `[ OK ]` or close (`X`) → returns focus to Cheque No
input; state remains `CREATING`.

---

## 5. Cheque Database (lookup seed)

`ChequesService` exposes a read-only catalogue of postable cheques and a
mutable in-memory list of logged cheques.

```
CHEQUE_DB (lookup)
┌──────────┬────────────────────────────────────────────────┬───────────┬────────────┐
│ chequeNo │ transferCompany                                │ amount    │ date       │
├──────────┼────────────────────────────────────────────────┼───────────┼────────────┤
│ 232693   │ Liverpool Victoria Friendly Society Limited    │ 12,450.00 │ 14/04/2026 │
│ 232694   │ Aviva Life & Pensions UK Limited               │  3,200.50 │ 15/04/2026 │
│ 232695   │ Legal & General Assurance Society              │  8,775.00 │ 16/04/2026 │
│ 232696   │ Standard Life Assurance Limited                │  5,410.75 │ 17/04/2026 │
│ 232697   │ Prudential Assurance Company Limited           │  9,940.20 │ 18/04/2026 │
└──────────┴────────────────────────────────────────────────┴───────────┴────────────┘

INITIAL_CHEQUES (seed shown in grid on first open): 232693, 232694, 232695
SEED_CHEQUE_NOS (excluded from BankAccDetailsTab propagation):
                                                  232693, 232694, 232695
```

Angular service shape:

```ts
@Injectable({ providedIn: 'root' })
export class ChequesService {
  private readonly _cheques = signal<Cheque[]>(INITIAL_CHEQUES);
  readonly cheques = this._cheques.asReadonly();

  lookup(chequeNo: string): Cheque | undefined { /* CHEQUE_DB lookup */ }
  add(cheque: Cheque): void { this._cheques.update(list => [...list, cheque]); }
  set(list: Cheque[]): void { this._cheques.set(list); }
}
```

---

## 6. Navigation Paths

```
ToolbarComponent
       │ click [ Log ]
       ▼
ChequeLoggerComponent  ────────────────┐
       │                               │
       │ click [ New ]                 │
       ▼                               │
   CREATING mode                       │
       │ click [ Post Cheque ]         │
       │                               │
       ├── valid ──► add to grid ──────┤  (also pushed to
       │                               │   BankAccDetailsTab via service)
       ├── unknown ──► InformationDialog ──► OK ──┐
       ├── duplicate ► InformationDialog ──► OK ──┤
       │                                          │
       └──────────────────────────────────────────┘
       │ click [ X ] (close)
       ▼
ChequeLoggerComponent.close()  ►  ToolbarComponent (modal dismissed)
```

The grid additions are reactive: `BankAccDetailsTabComponent` subscribes
to `chequesService.cheques` and appends any cheque whose `chequeNo` is
**not** in `SEED_CHEQUE_NOS` to its Transfers table.

---

## 7. Keyboard / Accessibility

| Key            | Action                                                |
|----------------|-------------------------------------------------------|
| `Esc`          | Close the modal (CDK Dialog default).                 |
| `Tab` / `Shift+Tab` | Cycle through toolbar buttons → header fields → grid → find input. |
| `Enter` in Cheque No (CREATING) | Equivalent to clicking **Post Cheque**.  |
| `Enter` in Find input | Equivalent to clicking **Find Cheque**.         |

ARIA:

* Root dialog: `role="dialog"`, `aria-modal="true"`,
  `aria-labelledby="cheque-logger-title"`.
* Information sub-dialog: `role="alertdialog"`,
  `aria-describedby="info-message"`.
* Grid: `role="grid"`; selected row `aria-selected="true"`.

---

## 8. Angular Component Tree

```
<app-cheque-logger>
├── <app-modal-header title="Cheque Logger" (close)="close()">
├── <section class="toolbar">
│   ├── <input formControlName="policyNo" disabled>
│   ├── <app-tool-btn icon="add"    (click)="startNew()">
│   ├── <app-tool-btn icon="save"   (click)="postCheque()">
│   ├── <app-tool-btn icon="edit">
│   ├── <app-tool-btn icon="delete">
│   ├── <app-tool-btn icon="info">
│   ├── <app-tool-btn icon="folder_open">
│   └── <input formControlName="transferCompanyHdr" disabled>
├── <section class="header-fields">
│   ├── <input formControlName="chequeNo" [readonly]="!isCreating()">
│   ├── <input formControlName="date" disabled>
│   ├── <input formControlName="amount" disabled>
│   └── <input formControlName="transferCompany" disabled>
├── <app-data-grid
│      [rows]="cheques()"
│      [columns]="GRID_COLS"
│      (rowClick)="onRowClick($event)">
├── <section class="find-row">
│   ├── <input [formControl]="findCtrl">
│   └── <button (click)="findCheque()">Find Cheque</button>
└── <app-information-dialog *ngIf="info()" [message]="info()!" (ok)="info.set(null)">
```

---

## 9. Module / Standalone Component Wiring

```ts
@Component({
  selector: 'app-cheque-logger',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    ModalHeaderComponent, ToolBtnComponent,
    DataGridComponent, InformationDialogComponent,
  ],
  templateUrl: './cheque-logger.component.html',
  styleUrl: './cheque-logger.component.scss',
})
export class ChequeLoggerComponent {
  private readonly cheques = inject(ChequesService);
  protected readonly mode = signal<'idle' | 'creating'>('idle');
  protected readonly info = signal<string | null>(null);
  protected readonly findCtrl = new FormControl('', { nonNullable: true });
  /* ... */
}
```

Dialog launcher (from `ToolbarComponent`):

```ts
this.dialog.open(ChequeLoggerComponent, {
  panelClass: 'lve-panel-dialog',
  hasBackdrop: true,
  disableClose: false,
  width: '920px',
  maxHeight: '90vh',
});
```
