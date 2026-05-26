# Cheque Logger — Screen Flow (ASCII)

This document captures every screen, panel, popup, and dialog in the Cheque
Logger modal, plus the navigation paths between them.

---

## 1. Entry Point

The Cheque Logger is opened from the main CLANAD toolbar.

```
CLANAD Toolbar (not editing)
  └─ [ Log ]  (MdHistory icon)
        └──────────────────────────────────────────▶ ChequeLoggerModal
```

---

## 2. Cheque Logger Modal (default state)

Width: 1200px · Max height: 90vh · Background: white · z-index: 60

```
+──────────────────────────────────────────────────────────────────────────── ×
│ Cheque Logger                                                            [×] │
+────────────────────────────────────────────────────────────────────────────+
│                                                                              │
│  [ 225810 ]  [+] [↑] [✗] [🗑] [💡] [📂]  [ Liverpool Victoria Friendly…  ] │
│  Policy No   Add Post Can Del  Cmp  Open   Company name (read-only, flex-1) │
│                                                                              │
│  Cheque No    Date       Amount        Transfer Company                      │
│  [________]  [________]  [__________]  [________________________]           │
│  (editable   (disabled,  (disabled,    (disabled, flex-1,                   │
│   when       filled by   right-align,  filled by Post)                      │
│   creating)  Post)       filled by                                           │
│                          Post)                                               │
│                                                                              │
│  +──[ Data grid ]────────────────────────────────────────────────────────+  │
│  │ CHEQNO │ TRANSFERCOMPANY              │ AMOUNT │ LOGGEDBY │ DATELOGGED │  │
│  │        │ DELETED │ DELETEDDATE │ DELETEDBY │ ASSIGNED │ ASSIGNEDDATE │  │
│  │        │ ASSIGNEDBY                                                   │  │
│  ├────────┼──────────────────────────────┼────────┼──────────┼───────────┤  │
│  │ 232693 │ Liverpool Victoria…          │12,450  │ JSMITH   │ 12/05/26  │  │
│  │        │ N          │            │    │ Y        │ 12/05/26  │ UAT1  │  │
│  │ 232694 │ Aviva Life & Pensions UK…    │ 3,200  │ AKHAN    │ 13/05/26  │  │
│  │        │ N          │            │    │ Y        │ 13/05/26  │ UAT2  │  │
│  │ 232695 │ Legal & General Assurance…   │ 8,775  │ RBROWN   │ 14/05/26  │  │
│  │        │ N          │            │    │ Y        │ 14/05/26  │ UAT3  │  │
│  │ (6 empty blank rows to pad grid)                                      │  │
│  +────────────────────────────────────────────────────────────────────────+  │
│                                                                              │
│  [__________________]  [ 🔍 Find Cheque ]                                   │
│  (search text input)                                                         │
│                                                                              │
+──────────────────────────────────────────────────────────────────────────────+
```

Legend: `[+]` = Add Cheque · `[↑]` = Post Cheque · `[✗]` = Cancel · `[🗑]` = Delete
        `[💡]` = Change Company · `[📂]` = Open · `[×]` = Close modal

---

## 3. Toolbar Button States

```
State         │ [+] Add │ [↑] Post │ [✗] Cancel │ [🗑] Delete │ [💡] Cmp │ [📂] Open
──────────────┼─────────┼──────────┼────────────┼─────────────┼──────────┼──────────
Default       │   ✓     │    ✗     │     ✗      │      ✓      │    ✓     │    ✓
creating=true │   ✗     │    ✓     │     ✓      │      ✗      │    ✓     │    ✓
```

Disabled buttons render at `opacity-40`, `cursor-not-allowed`.

---

## 4. Workflow: Add and Post a Cheque

```
Default state
    │
    ├─ Click [+] Add Cheque
    │       creating = true
    │       Cheque No auto-incremented (last chequeNo + 1)
    │       Date set to today (en-GB format)
    │       Header fields: Cheque No editable, Date/Amount/TransferCompany disabled
    │
    │   ┌─ (user types Cheque No in header field) ──────────────────────┐
    │   │                                                                │
    │   ├─ Click [✗] Cancel ────────────────────────────────────────────┤
    │   │       creating = false                                         │
    │   │       Posted fields cleared                                    │
    │   │       Return to Default state                                  │
    │   │                                                                │
    │   └─ Click [↑] Post Cheque                                         │
    │           │                                                         │
    │           ├─ Cheque No is blank
    │           │       ──▶ Info Popup: "Please enter a Cheque No before posting."
    │           │           [ OK ] → dismiss, remain in creating state
    │           │
    │           ├─ Cheque No not found in CHEQUE_DB
    │           │       ──▶ Info Popup: "No cheque found in database for Cheque No {N}."
    │           │           [ OK ] → dismiss, Date/Amount/TransferCompany remain empty
    │           │
    │           ├─ Cheque No already logged (duplicate)
    │           │       ──▶ Info Popup: "Cheque No {N} has already been logged."
    │           │           [ OK ] → dismiss, remain in creating state
    │           │
    │           └─ Cheque No found in CHEQUE_DB (valid)
    │                   Populates posted.date / posted.amount / posted.transferCompany
    │                   Adds new Cheque to ChequesService state
    │                   creating = false
    │                   New row appears in data grid (selected)
    │                   Return to Default state
```

---

## 5. Workflow: Delete a Cheque

```
Default state (row selected in grid)
    │
    ├─ Click [🗑] Delete
    │       ──▶ Confirm Delete Popup (z-70)
    │
    │   +──[ Information ]─────────────────── ×
    │   │ Remove this Cheque {chequeNo} from   │
    │   │ the Log?                             │
    │   │                                      │
    │   │      [ Yes ]         [ No ]          │
    │   +──────────────────────────────────────+
    │
    │   ├─ [ No ]  → dismiss popup, no change
    │   │
    │   └─ [ Yes ] → markChequeDeleted(chequeNo, "UAT1")
    │                Sets: deleted = "Y"
    │                      deletedDate = today (en-GB)
    │                      deletedBy   = "UAT1"
    │                Grid row updates to show deletion fields
    │                confirmDelete state cleared
```

---

## 6. Workflow: Change Company

```
Default state
    │
    └─ Click [💡] Change Company
            ──▶ CompanySelectionModal (z-60)
```

### 6.1 CompanySelectionModal (nested)

```
+──[ Company Selection ]──────────────────── ×
│                                             │
│  +──[ Company grid ]────────────────────+  │
│  │ Code     │ Name              │ Type  │  │
│  ├──────────┼───────────────────┼───────┤  │
│  │ STALW-00 │ Stalwart Life     │ Ann.  │  │
│  │ AVIVA-01 │ Aviva Life & Pen. │ Ann.  │  │
│  │ ...rows...                          │  │
│  +────────────────────────────────────+  │
│                                          │
│      [ Select ]   [ Cancel ]             │
+──────────────────────────────────────────+

[ Select ] → onSelect(name) callback
             companyName display field updated in Cheque Logger
             CompanySelectionModal closes
[ Cancel ] → closes without change
```

---

## 7. Workflow: Find a Cheque

```
Default state
    │
    ├─ Type search text in Find field
    │
    └─ Click [ 🔍 Find Cheque ]
            │
            ├─ Match found (chequeNo.toLowerCase().includes(query))
            │       selected index updated → row highlighted in grid
            │
            └─ No match → no visible change (grid unchanged, no popup)
```

---

## 8. Info Popup (generic — inline z-70)

Used for all informational messages. Not a separate component — rendered inline within ChequeLoggerModal.

```
+──[ Information ]──────────────────────── ×
│                                           │
│  {message text}                           │
│                                           │
│              [ OK ]                       │
+───────────────────────────────────────────+

Width: 440px · z-index: 70 · bg-black/40 backdrop

Messages triggered:
  "Please enter a Cheque No before posting."
  "No cheque found in database for Cheque No {N}."
  "Cheque No {N} has already been logged."
  "Cheque added successfully"    (after manual saveNew)
```

---

## 9. CHEQUE_DB Lookup Reference

The Post action validates against this in-memory database:

```
+────────┬──────────────────────────────────────────────┬───────────┬─────────────+
│ CheqNo │ Transfer Company                             │  Amount   │    Date     │
+────────┼──────────────────────────────────────────────┼───────────┼─────────────+
│ 232693 │ Liverpool Victoria Friendly Society Limited  │ 12,450.00 │ 12/05/2026  │
│ 232694 │ Aviva Life & Pensions UK Limited             │  3,200.50 │ 13/05/2026  │
│ 232695 │ Legal & General Assurance Society            │  8,775.00 │ 14/05/2026  │
│ 232696 │ Prudential Assurance Company Limited         │  5,120.75 │ 15/05/2026  │
│ 232697 │ Standard Life Assurance Limited              │  9,980.00 │ 15/05/2026  │
+────────┴──────────────────────────────────────────────┴───────────┴─────────────+
```

---

## 10. Initial Data (ChequesService seed)

```
+────────┬──────────────────────────────────┬──────────┬──────────┬────────────+
│ CheqNo │ Transfer Company                 │  Amount  │ LoggedBy │  Date      │
│ Deleted│ DeletedDate │ DeletedBy │ Assigned │ AssignedDate │ AssignedBy     │
+────────┼──────────────────────────────────┼──────────┼──────────┼────────────+
│ 232693 │ Liverpool Victoria…              │12,450.00 │ JSMITH   │ 12/05/2026 │
│ N      │             │           │ Y        │ 12/05/2026   │ UAT1          │
│ 232694 │ Aviva Life & Pensions UK…        │ 3,200.50 │ AKHAN    │ 13/05/2026 │
│ N      │             │           │ Y        │ 13/05/2026   │ UAT2          │
│ 232695 │ Legal & General Assurance…       │ 8,775.00 │ RBROWN   │ 14/05/2026 │
│ N      │             │           │ Y        │ 14/05/2026   │ UAT3          │
+────────┴──────────────────────────────────┴──────────┴──────────┴────────────+
```

---

## 11. Full Navigation Map

```
CLANAD Toolbar
  └─ [ Log ] ──────────────────────────────────────────▶ ChequeLoggerModal
                                                               │
                              ┌────────────────────────────────┤
                              │                                │
                 [+] Add → creating=true                  [×] Close
                              │                                │
                 [↑] Post → validate                      ◀───┘
                          ├─ blank no → InfoPopup
                          ├─ not in DB → InfoPopup
                          ├─ duplicate → InfoPopup
                          └─ valid → add to grid, creating=false
                              │
                 [✗] Cancel → creating=false
                              │
                 [🗑] Delete → ConfirmDeletePopup
                          ├─ No  → dismiss
                          └─ Yes → markChequeDeleted → update grid
                              │
                 [💡] Change Company → CompanySelectionModal
                          ├─ Cancel → close
                          └─ Select → update companyName field
                              │
                 [🔍] Find Cheque → highlight matching grid row
```

---

*Document generated: May 2026. Covers ChequeLoggerModal — LVE Component Library.*
