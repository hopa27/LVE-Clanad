# CLANAD — Client Annuity Administration System
## Screen Flow (ASCII) — Angular / LVE Component Library

This document captures every screen, tab, modal, popup, and dialog in the
CLANAD web application, plus all navigation paths between them. The app is
a static recreation of the legacy LV= CLANAD system using the LVE Component
Library design system (TailwindCSS v4, React + Vite, Livvic + Mulish fonts).

---

## 0. Plan Type Overview (Policy Variants)

The application drives every piece of UI from a global **planCode** context.
Four variants exist; the default on load is **planCode "90" (MCP)**.

```
+-------+-------------+-----------+------------------------------------------+
| Code  | Plan Type   | Policy No | Description                              |
+-------+-------------+-----------+------------------------------------------+
|  "0"  | master      | dbePolNo  | Legacy master template. Full field set,  |
|       |             |           | 15 tabs (incl. 2 × Contacts). No live    |
|       |             |           | payment data. Accent colour: grey.       |
+-------+-------------+-----------+------------------------------------------+
|  "87" | FTA         | 233451    | Fixed-Term Annuity (Uggiu). 13 tabs.    |
|       |             |           | Status "P". Quote Expiry 14/06/2026.    |
|       |             |           | Accent colour: orange.                   |
+-------+-------------+-----------+------------------------------------------+
|  "84" | PRP         | 111834    | Personal Retirement Plan (Testptbbbide). |
|       |             |           | 13 tabs. Status "L". Rich payment hist.  |
|       |             |           | Net £107.83/mo from 30/04/2010.          |
|       |             |           | Accent colour: light green.              |
+-------+-------------+-----------+------------------------------------------+
|  "90" | MCP         | 227813    | Monthly Cash Policy (Testctcchibd).      |
|       |             |           | 13 tabs. Status "L". Net £251.79/mo.    |
|       |             |           | Final payment 28/05/2027.                |
|       |             |           | Accent colour: pink.                     |
+-------+-------------+-----------+------------------------------------------+
```

Plan codes are switched via the **Search (Find Policy)** toolbar button or
by double-clicking a row in the Find Policy modal grid.

---

## 1. Application Shell (always visible)

```
+--------------------------------------------------------------------------------------------------+
| [LV=]   Client Annuity Administration System                                       [ Logout ]   |
+--------------------------------------------------------------------------------------------------+
| [ Options ]  [ Process ]  [ Print ]  [ Supervisor ]  [ Help ]                                   |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  [ New App ] [ New Quote* ] [ Sim App ] [ Edit/Save ] [ Cancel ] [ Search ] [ Log ] [ CRS ]     |
|  [ Reports ] [ Company ]                                                                         |
|  * disabled for planCode "84" and "90"                                                           |
|                                                                                                  |
|  +--[ Policy Header ]----------------------------------------------------------------------+    |
|  | [v] (Policy No dropdown)  [↗] (Find)  [Liverpool Victoria Friendly Society Limited]     |    |
|  | [policyRef badge]  [planCode badge (accent)]  [surname badge (accent)]                  |    |
|  | [Simultaneous Policies label – plan 84 only]  [···] (More)  [MONTHLY CASH POLICY badge] |    |
|  |                                                          (pink badge – plan 90 only)    |    |
|  +----------------------------------------------------------------------------------------+    |
|                                                                                                  |
|  [ Tab Bar — see §3 ]                                                                            |
|                                                                                                  |
|  +--[ Active Tab Content ]----------------------------------------------------------------+    |
|  |                         <<< TAB CONTENT >>>                                            |    |
|  +----------------------------------------------------------------------------------------+    |
|                                                                                                  |
|  +--[ Status Bar ]------------------------------------------------------------------------+    |
|  | Status: LIVE (green)  Illustration: 20911002*  Variant: 7*  RAQ ID: —  User: UAT3     |    |
|  | * blank for planCode "0"                                                               |    |
|  +----------------------------------------------------------------------------------------+    |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| [LV=]   Liverpool Victoria Friendly Society Limited, County Gates, Bournemouth BH1 2NF          |
+--------------------------------------------------------------------------------------------------+
```

Legend: `[ Button ]`, `[v]` dropdown, `[x]` checkbox, `( )` radio, `[↗]` icon button,
`[···]` more-options button, `*` = conditional.

---

## 2. Menu Bar (planCode-dependent)

### 2A. Menu Bar — planCode "0" (Master) and "87" (FTA) — Default menus

```
Options menu                Process menu              Print menu
+---------------------+    +----------------------+   +---------------------+
| Screen Print    F1  |    | Payment Forecast     |   | Print MAR         ▶ |
| Check Completion    |    | N.I Sweep            |   |   1st Life MAR      |
| Amend IFA           |    | P45 details        ▶ |   |   2nd Life MAR      |
| Search          F5  |    |   P45 Details        |   | Auto Set Live Rpt   |
+---------------------+    | Monthly            ▶ |   | Diary Report        |
                           |   Monthly Processing |   +---------------------+
                           | Coding Scheme Details|
                           | ─────────────────── |
                           | Cancel LTC  (grey)   |
                           +----------------------+
```

```
Supervisor menu — planCode "0" (Master)        Help menu
+-----------------------------------------------+   +---------------+
| Final Quote Issued                            |   | About         |
| Status Change                               ▶ |   +---------------+
|   NTU / Backdate / Cancel / XDuplicate        |
|   Surrender / Maturity                        |
| Amend Cheques                                 |
| Amend IFA                                     |
| Approve Bank Changes                          |
| Approve Maturity Bank Detail Changes          |
| ─────────────────────────────────────────── |
| Set Live                                      |
| Force Set Live                                |
| ─────────────────────────────────────────── |
| Set Status To Hold                            |
| Set Status To Pending                         |
| ─────────────────────────────────────────── |
| Reprint Annual Statements       → modal       |
| Annual Statement Recalculation  → modal       |
| Reprint Maturity Letters        → modal       |
| ─────────────────────────────────────────── |
| Tracesmart error - make policy editable       |
+-----------------------------------------------+
```

### 2B. Menu Bar — planCode "87" (FTA) — Supervisor override

```
Supervisor menu — planCode "87"
+-----------------------------------------------+
| Final Quote Issued                            |
| Status Change                               ▶ |
|   NTU / Backdate / Cancel / XDuplicate        |
|   Surrender / Maturity                        |
| Amend Cheques                → modal          |
| Approve Bank Changes         (grey)           |
| Approve Maturity Bank Detail Changes  (grey)  |
| ─────────────────────────────────────────── |
| Set Live                                      |
| Force Set Live                                |
| ─────────────────────────────────────────── |
| Set Status To Hold                            |
| Set Status To Pending        (grey)           |
| ─────────────────────────────────────────── |
| Reprint Annual Statements       → modal       |
| Annual Statement Recalculation  → modal       |
| Reprint Maturity Letters        → modal       |
+-----------------------------------------------+
```

### 2C. Menu Bar — planCode "84" (PRP) — All menus overridden

```
Options menu (84)            Process menu (84)
+-------------------+        +-----------------------------------+
| P45 Details →mdl  |        | Set Dead                        ▶ |
| Screen Print  F1  |        |   Life One             → modal    |
| Search        F5  |        |   Life Two/Current Ben → popup    |
+-------------------+        | Payments                        ▶ |
                             |   Suspend              → confirm  |
                             | PLA Cancellation       → confirm  |
                             | ─────────────────────────────── |
                             | Ceding Scheme Details  → modal    |
                             | ─────────────────────────────── |
                             | LTC Benefit  (grey)               |
                             | Cancel LTC   (grey)               |
                             +-----------------------------------+

Print menu (84)              Supervisor menu — planCode "84"
+-------------------+        +-----------------------------------------------+
| Tax Certificate   |        | Supervisory Edit        → modal (→ Payments)  |
| Copy P60          |        | Status Change                                ▶ |
| Reprint Mar's   ▶ |        |   NTU / Backdate / Cancel / XDuplicate         |
|   1st Life MAR    |        |   Surrender / Maturity                         |
|   2nd Life MAR    |        | Amend Cheques           → modal                |
| Diary Report      |        | Amend IFA               → modal                |
+-------------------+        | C(ancel) Application                           |
                             | Bank Detail Changes                          ▶  |
                             |   Approve Bank Changes                         |
                             |   Approve Maturity Bank Detail Changes         |
                             | Convert to Flexi-Access  (grey)                |
                             | ──────────────────────────────────────────── |
                             | LTC  (grey)                                  ▶ |
                             |   LTC Benefit                                  |
                             | Pull Quote              → modal                |
                             | ──────────────────────────────────────────── |
                             | Reprint Annual Statements    → modal           |
                             | Annual Statement Recalculation → modal         |
                             | Reprint Maturity Letters     → modal           |
                             +-----------------------------------------------+
```

### 2D. Menu Bar — planCode "90" (MCP) — Options/Process/Print same as "84"; Supervisor differs

```
Supervisor menu — planCode "90"
+-----------------------------------------------+
| Supervisory Edit         → modal (→ Payments) |
| Status Change                               ▶ |
|   Surrender   (grey)                          |
|   Maturity    (grey)                          |
|   Expired     → ConfirmDialog                 |
| Amend Cheques            → modal              |
| Amend IFA                → modal              |
| C(ancel) Application     → ConfirmDialog      |
| Bank Detail Changes                         ▶ |
|   Bank Changes Awaiting Approval → modal      |
|   Approve Bank Changes   (grey)               |
|   Approve Maturity Bank Changes (grey)        |
| Convert to Flexi-Access  (grey)               |
| ─────────────────────────────────────────── |
| LTC  (grey)                                 ▶ |
|   LTC Benefit                                 |
| Pull Quote               → modal              |
| ─────────────────────────────────────────── |
| Reprint Annual Statements    → modal          |
| Annual Statement Recalculation → modal        |
| Reprint Maturity Letters     → modal          |
+-----------------------------------------------+
```

---

## 3. Tab Bar

```
planCode "0" (15 tabs):
[ Application Details ] [ Annuitant(s) Details ] [ Contacts ] [ Contacts ]
[ Policy Details ] [ Bank Acc Details ] [ Payments ] [ Increase History ]
[ Quote Details ] [ Diary & Audit Trail ] [ Notes ] [ Letters ] [ Events ]
[ Maturities / Surrender ] [ LOA/POA ]

planCode "84", "87", "90" (13 tabs — both Contacts tabs hidden):
[ Application Details ] [ Annuitant(s) Details ]
[ Policy Details ] [ Bank Acc Details ] [ Payments ] [ Increase History ]
[ Quote Details ] [ Diary & Audit Trail ] [ Notes ] [ Letters ] [ Events ]
[ Maturities / Surrender ] [ LOA/POA ]
```

Active tab: white background, primary blue underline.
Inactive tab: `#eaf5f8` background.

---

## 4. Tab Layouts

### 4A. Application Details Tab

```
+--[ Column 1 ]----------+--[ Column 2 ]----------+--[ Column 3* ]--------+--[ Column 4 ]----------+
| Set Up Date:           | Special Status:**      | (hidden for 84/87/90) | Policy Class:          |
|   [DatePicker]         |   [TextInput]          |                       |   [TextInput]          |
| Received Date:         | Final Quote Issued:**  |                       | Quote Expiry:***       |
|  (or MCP Start Date†)  |   [DatePicker]         |                       |   [DatePicker]         |
|   [DatePicker]         | Status:                |                       | Agency:                |
| Start Date:            |   [TextInput]          |                       |   [TextInput]          |
|  (or Payment Date†)    | Suspended:**           |                       | Agency Ref:            |
|   [DatePicker]         |   [TextInput]          |                       |   [TextInput]          |
| WPPA amendment dates:  | Days Since Application:|                       | Introducer:            |
|  (plan "0" only)       |   [TextInput]          |                       |   [TextInput]          |
|   From: [DatePicker]   | Quote Ref:             |                       | Introducer Ref:        |
|   To:   [DatePicker]   |   [TextInput]          |                       |   [TextInput]          |
| Accept Date:**         | IFA Ref:               |                       |                        |
|   [DatePicker]         |   [TextInput]          |                       |                        |
| IFA Payment Date:      | Premium / Fund:        |                       |                        |
|   [DatePicker]         |   [TextInput]          |                       |                        |
| PostADay: [x]          | GAD Anniversary:****   |                       |                        |
| Transfer from Ben Drw: |   (plan "0" only)      |                       |                        |
|   [v Unknown/Yes/No]   |   [DatePicker]         |                       |                        |
+------------------------+------------------------+-----------------------+------------------------+

* Column 3 hidden for planCode "84", "87", "90" (isCompact = true)
** Hidden for planCode "87"
*** Shows "Quote Expiry 14/06/2026" for plan "87"
† planCode "90" relabels "Received Date" → "MCP Start Date", "Start Date" → "Payment Date"

Below grid — plan "0" only:
+---[ Create Payment button ]---+
| [ Create payment for policy ] |
+-------------------------------+

planCode data summary:
  "0"  : Set Up blank, Status "status", placeholder text visible
  "87" : Set Up 15/05/2026, Status "P", Quote Expiry 14/06/2026, PostADay [x]
  "84" : Set Up 17/03/2010, Start 31/03/2010, Status "L", Suspended "N", PostADay [x]
  "90" : MCP Start 25/06/2025, Payment Date 28/05/2025, Status "L", Suspended "N"
```

### 4B. Annuitant(s) Details Tab

```
+--[ Life 1 Section ]----------------------------------------------------------+
| Title: [v]  Forename: [____]  Surname: [____]  Sex: [v]                     |
| DOB: [DatePicker]  NI No: [____]  Smoker: [v]  Cause of Death: [____]*      |
| DOD: [DatePicker]*   Address: [ConnectedAddress block]                       |
| Doctor lookup: [···] → DoctorDatabaseModal                                   |
+------------------------------------------------------------------------------+
+--[ Life 2 / Dependant Section ]----------------------------------------------+
| Title: [v]  Forename: [____]  Surname: [____]  Sex: [v]                     |
| DOB: [DatePicker]  NI No: [____]  Smoker: [v]                               |
| MAR Required: [x]  (editable only for planCode "90")                        |
| Address: [ConnectedAddress block]                                            |
+------------------------------------------------------------------------------+

* Cause of Death and DOD hidden for planCode "87"
```

### 4C. Contacts Tab (planCode "0" only — first of two)

```
+--[ Contacts grid ]-----------------------------------------------------------+
| Name | Role | Phone | Email | ...rows...                                     |
+----------------------------------------------------------------------+-------+
```

### 4D. Contacts Tab 2 (planCode "0" only — second tab)

```
+--[ Extended Contacts / Correspondence ]--------------------------------------+
| ...secondary contact records...                                              |
+------------------------------------------------------------------------------+
```

### 4E. Policy Details Tab

```
+--[ Left column ]---------------------------+--[ Right column ]---------------+
| Policy Type:      [TextInput]             | Adviser Charge %: [TextInput]   |
| Online Application: [x]*                  | MPAA Rules Triggered: [x]**     |
| Payment Frequency: [v]                    | Tax Code: [TextInput]           |
| Payment Method:    [v]   (Initial: "B"**) | IR Max Pension: [TextInput]***  |
| Payment Amount:   [TextInput]             | Agency Dec'd Notif Date:        |
| Indexation:       [v]                     |   [DatePicker]***               |
| Guarantee Period: [TextInput]             |                                 |
| Guarantee End:    [DatePicker]            |                                 |
| Escalation Type:  [TextInput]             |                                 |
+--------------------------------------------+---------------------------------+

* "Online Application" checked for planCode "87"
** planCode "84" specific fields (Adviser Charge %, MPAA Rules Triggered, Initial method "B")
*** planCode "90" specific fields (IR Max Pension, Agency Deceased Notification Date)
Tax Code: plan "87" "1257L*", plan "84" "647L*"→"647L", plan "90" "NT"
```

### 4F. Bank Acc Details Tab

```
+--[ Bank Details Section ]----------------------------------------------------+
| Bank Name:      [TextInput]                                                  |
| Sort Code:      [TextInput]  [ Edit Bank Details → EditBankDetailsModal ]    |
| Account No:     [TextInput]                                                  |
| Account Name:   [TextInput]                                                  |
| Bank Reference: [TextInput]                                                  |
+------------------------------------------------------------------------------+
+--[ Cheques Section (ChequesContext) ]-----------------------------------------+
| Cheque No | Date | Amount | Status | ...rows...                               |
| [ Add Cheque ]  [ Remove Cheque ]                                             |
+------------------------------------------------------------------------------+
```

### 4G. Payments Tab

```
+--[ Payment Summary fields ]--------------------------------------------------+
| Current Gross:  [TextInput]   Last Payment Date:   [DatePicker]              |
| Current Net:    [TextInput]   Next Due Date:        [DatePicker]             |
| Current Tax:    [TextInput]   Final Payment Date:   [DatePicker]***          |
+------------------------------------------------------------------------------+
+--[ Payment History grid ]----------------------------------------------------+
| Date | Gross | Cap | Tax | Post Adj | Net | Method | Reason | BACS | Hash   |
|------+-------+-----+-----+----------+-----+--------+--------+------+--------|
| ...rows (plan-specific data — see data tables in §0)...                     |
+-----------------------------------+--[ import button ]----------------------+
                                    | [↑ Import]                              |
                                    +-----------------------------------------+
+--[ Tax History grid ]--------------------------------------------------------+
| Date | Code | N | Gross | Cumulative | Free | Taxable | Tax | YTD Tax       |
|------+------+---+-------+------------+------+---------+-----+---------------|
| ...rows (plan-specific data)...                                             |
+------------------------------------------------------------------------------+
+--[ Supervisory Edit overlay — opens on Supervisor › Supervisory Edit ]------+
| (switches app to Payments tab first via clanad:switch-tab event)            |
+------------------------------------------------------------------------------+

*** Final Payment Date shown for planCode "90" (28/05/2027, highlighted red)

planCode payment data:
  "0"  / "87" : Empty payment and tax history grids
  "84"        : 9 rows @ £107.83 gross/net, FIRST then PROC reasons, from 30/04/2010
  "90"        : 9 rows @ £251.79 gross/net, FIRST + PROC, from 07/07/2025; NT tax code
```

### 4H. Increase History Tab

```
+--[ Increase History grid ]---------------------------------------------------+
| Effective Date | Old Amount | New Amount | Reason | Applied By | ...        |
|----------------+------------+------------+--------+------------+------------|
| ...rows...                                                                  |
+------------------------------------------------------------------------------+
```

### 4I. Quote Details Tab

```
+--[ Quote summary fields ]----------------------------------------------------+
| Original Quote Ref:  [TextInput]    Quote Date:     [DatePicker]            |
| Quote Type:          [TextInput]    Expiry Date:    [DatePicker]            |
| Annual Amount:       [TextInput]    Escalation:     [TextInput]             |
| ...additional quote detail fields...                                        |
+------------------------------------------------------------------------------+
```

### 4J. Diary & Audit Trail Tab

```
+--[ Toolbar ]----------------------------------------------------------------+
| [ New Entry → MiscDiaryModal ]  [ Edit Entry → MiscDiaryModal ]            |
+------------------------------------------------------------------------------+
+--[ Diary grid ]--------------------------------------------------------------+
| Date | User | Type | Description                                            |
|------+------+------+--------------------------------------------------------|
| plan "84": "Chase for application cheques of AXA", bank validation notes  |
| plan "87": System-generated validation notes (Bank Validation, EOA Client) |
| plan "0" / "90": Empty by default                                          |
+------------------------------------------------------------------------------+
```

### 4K. Notes Tab

```
+--[ Free-text notes area ]---------------------------------------------------+
| [Textarea — free-form policy notes, read-only unless in Edit mode]         |
+------------------------------------------------------------------------------+
```

### 4L. Letters Tab

```
+--[ Letter Selection ]-------------------------------------------------------+
| Select Letter: [v ─────────────────────────────── ]  (dropdown)            |
+------------------------------------------------------------------------------+
+--[ Distribution Info ]------------------------------------------------------+
| Print:   [x]  (enabled per LETTER_DIST config for selected letter)         |
| Fax:     [x]  Fax number: [TextInput — controlled, edit-mode independent]  |
| Email:   [x]  Email addr: [TextInput — controlled, edit-mode independent]  |
| Send To: [x Client] [x IFA] [x Ceding Scheme] [x Other]                   |
|          (Send To / Other visible only for planCode "0")                   |
+------------------------------------------------------------------------------+
+--[ Action Buttons ]---------------------------------------------------------+
| [ Print ]  [ Preview ]                                                      |
+------------------------------------------------------------------------------+

Validation:
  • "Print" with no letter selected → popup "Please select a letter"
  • "Print" with no distribution method ticked → popup "Please select a distribution method"
  • LETTER_DIST map controls which checkboxes are enabled per letter type

All distribution controls are independent of global Edit mode (ALWAYS_EDITING context).
```

### 4M. Events Tab

```
+--[ Events grid ]------------------------------------------------------------+
| Event Date | Event Type | Details | User | Status                          |
|------------+------------+---------+------+----------------------------------|
| ...rows...                                                                  |
+------------------------------------------------------------------------------+
```

### 4N. Maturities / Surrender Tab

```
+--[ Maturity / Surrender fields ]--------------------------------------------+
| Maturity Date:      [DatePicker]   Surrender Value:  [TextInput]           |
| Surrender Date:     [DatePicker]   Reason:           [v]                   |
| ...additional fields...                                                     |
+------------------------------------------------------------------------------+
```

### 4O. LOA/POA Tab

```
+--[ LOA/POA records ]--------------------------------------------------------+
| Type | Name | Start Date | End Date | Status | Actions                     |
|------+------+------------+----------+--------+-----------------------------|
| ...rows...                                                                  |
+------------------------------------------------------------------------------+
| [ Add LOA ]  [ Add POA ]                                                    |
+------------------------------------------------------------------------------+
```

---

## 5. Modals and Popups

### 5A. Find Policy Modal (Toolbar › Search  or  Options › Search  F5)

```
+--[ Find Policy ]-------------------------------------------------------------- ×
|                                                                                |
| Search For: [_________________________]                                        |
|                                                                                |
| +--[ Policy Status ]--------+    [ OK ]                                       |
| | ( ) Pending  ( ) ALL      |    [ Cancel ]                                   |
| | ( ) Completed ( ) Shelved |                                                  |
| +---------------------------+                                                  |
|                                                                                |
| +--[ Results grid — clickable / double-click to open ]---------------------+  |
| | POLICY_REF | PLANTYPE | PLAN_CODE | SURNAME_1_UPPER | NAT_INS_NO_1 | ... |  |
| |------------+----------+-----------+----------------+---------------+-----|  |
| | dbePolNo   | master   |     0     | Master         |               |     |  |
| |            |          |           |   ← other cols empty for planCode 0 →  |  |
| | 233451     | FTA      |    87     | UGGIU          | JK-90-90-90-C | ... |  |
| | 111834     | PRP      |    84     | TESTPTBBBIDE   | PK-25-10-58-A | ... |  |
| | 227813     | MCP      |    90     | TESTCTCCHIBD   | CH-10-05-59-A | ... |  |
| +--------------------+-------------------------------+--------------------+  |
|                                                                                |
| +--[ Detail panel ]--------------------------------------------------------+  |
| | Premium [ £10,000.00 ]  Full Name 1 [ selected record name ]             |  |
| |                         Full Name 2 [                      ]             |  |
| | Cheques Rec:                                                              |  |
| |   Transfer Company | Date | Amount   (2 empty rows)                      |  |
| +--------------------------------------------------------------------------+  |
|                                                                                |
+--------------------------------------------------------------------------------+

Columns shown for planCode "0" row: POLICY_REF, PLANTYPE, PLAN_CODE, SURNAME_1_UPPER only.
All other columns blank for plan "0".
Click column header → changes active search column (highlighted + underlined).
Double-click row → sets planCode context + closes modal.
OK → sets planCode context + closes modal.
```

### 5B. Confirm Dialog (generic — used in multiple places)

```
+--[ Confirm ]----------- ×
|                         |
|  ?  <message text>      |
|                         |
|      [ No ]   [ Yes ]   |
+-------------------------+

Instances:
  Toolbar › New App   → "Create a new Application?"
                        Yes → QuoteLookupModal
  Toolbar › Sim App   → "Are you sure you wish to generate simultaneous policy?"
                        Yes → QuoteLookupModal
  Supervisor › Status Change › Expired (plan 90)
                        → "Confirm status change to Expired?"
  Supervisor › C(ancel) Application (plan 90)
                        → "Cancel this application?"
  Process › Payments › Suspend (plan 84 — requires two clicks)
                        → first click stages, second click → confirm popup
```

### 5C. Quote Lookup Modal (New App / Sim App confirm → Yes)

```
+--[ Quote Lookup ]--------------------------------------------------- ×
|  +--[ Nav ]----------+                                               |
|  | [ ◀ ] [ ▶ ]  Page N/N   Rows per page: [v]   [ Find ]           |
|  +-------------------+                                               |
|                                                                      |
|  +--[ Quote grid ]-----------------------------------------------+  |
|  | Quote Ref | Date | Type | Status | Gross | Net | Expiry | ...  |  |
|  |-----------+------+------+--------+-------+-----+--------+------|  |
|  | ...rows...                                                      |  |
|  +-----------------------------------------------------------------+  |
|                                                                      |
|  [ OK ]   [ Cancel ]                                                 |
+----------------------------------------------------------------------+
```

### 5D. Pull Quote Modal (Toolbar › New Quote  or  Supervisor › Pull Quote)

```
+--[ Pull Quote ]------------------------------------------------------ ×
|  +--[ Nav ]----------+                                                |
|  | [ ◀ ] [ ▶ ]  Page N/N   Rows per page: [v]   [ Find ]            |
|  +-------------------+                                                |
|                                                                       |
|  +--[ Quote grid ]------------------------------------------------+  |
|  | Quote Ref | Date | Plan | Status | Premium | Escalation | ...  |  |
|  |-----------+------+------+--------+---------+------------+------|  |
|  | ...rows...                                                      |  |
|  +----------------------------------------------------------------+  |
|                                                                       |
|  [ OK ]   [ Cancel ]                                                  |
+-----------------------------------------------------------------------+

Toolbar "New Quote" disabled for planCode "84" and "90".
Supervisor "Pull Quote" available for planCode "84" and "90".
```

### 5E. Simultaneous Policies Popup (Policy Header › [···] More)

```
+--[ Simultaneous Policies ]-----+
|                                |
|  Policy No | Status | Product  |
|  ----------+--------+--------- |
|  233424    |   P    | FTA      |
|  (9 blank rows)                |
|                                |
|    [ ✓ Open ]  [ ✗ Cancel ]    |
+--------------------------------+

Open button enabled only when a row is selected (highlighted dark blue).
```

### 5F. Tax Certificate Modal (Print › Tax Certificate — plan "84" only)

```
+--[ Tax Certificate ]--------------------------------------------- ×
|                                                                     |
|  Year:    [v 2024/2025]                                             |
|  Copy No: [v 1]                                                     |
|                                                                     |
|  [ Print ]   [ Cancel ]                                             |
+---------------------------------------------------------------------+
```

### 5G. Copy P60 Modal (Print › Copy P60 — plan "84" only)

```
+--[ Copy P60 ]---------------------------------------------------- ×
|                                                                    |
|  Tax Year:  [v 2024/2025]                                          |
|                                                                    |
|  [ Print ]   [ Cancel ]                                            |
+--------------------------------------------------------------------+
```

### 5H. About Modal (Help › About)

```
+--[ About ]-------------------------- ×
|                                      |
|  [LV=]                               |
|  Client Annuity Administration       |
|  System (CLANAD)                     |
|                                      |
|  Version: 1.0.0                      |
|  Build:   2025                       |
|                                      |
|  Liverpool Victoria Friendly         |
|  Society Limited                     |
|                                      |
|             [ OK ]                   |
+--------------------------------------+
```

### 5I. Amend Cheques Modal (Supervisor › Amend Cheques — all plans)

```
+--[ Amend Cheques ]----------------------------------------- ×
|                                                              |
|  +--[ Cheques grid (from ChequesContext) ]---------------+  |
|  | Cheque No | Date | Amount | Status                    |  |
|  |-----------+------+--------+---------------------------|  |
|  | ...rows (shared with Bank Acc Details tab)...         |  |
|  +-------------------------------------------------------+  |
|                                                              |
|  Status: [v Received / Returned / Banked]                    |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

### 5J. Completion Checker Modal (Options › Check Completion — plan "0"/"87")

```
+--[ Check Completion ]--------------------------------------- ×
|                                                              |
|  +--[ Validation results grid ]---------------------------+  |
|  | Item | Status | Message                                |  |
|  |------+--------+----------------------------------------|  |
|  | Bank Details         | [x] / [ ] | ...                |  |
|  | Annuitant DOB        | [x] / [ ] | ...                |  |
|  | ...checks...                                           |  |
|  +-------------------------------------------------------+  |
|                                                              |
|  [ Close ]                                                   |
+--------------------------------------------------------------+
```

### 5K. Screen Print Modal (Options › Screen Print  F1)

```
+--[ Screen Print ]------------------------------------------- ×
|                                                              |
|  Print destination:                                          |
|  ( ) Default printer                                         |
|  ( ) PDF                                                     |
|                                                              |
|  [ Print ]   [ Cancel ]                                      |
+--------------------------------------------------------------+
```

### 5L. Amend IFA Modal (Options › Amend IFA  or  Supervisor › Amend IFA)

```
+--[ Amend IFA ]---------------------------------------------- ×
|                                                              |
|  IFA Reference: [TextInput  HARGR-00 / OAKWO-01 / ...]     |
|  IFA Name:      [TextInput]                                  |
|  Commission %:  [TextInput]                                  |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

### 5M. P45 Details Modal (Options › P45 Details  or  Process › P45 Details)

```
+--[ P45 Details ]-------------------------------------------- ×
|                                                              |
|  Previous Employment Gross: [TextInput]                      |
|  Previous Employment Tax:   [TextInput]                      |
|  Week/Month Number:         [TextInput]                      |
|  P45 Date:                  [DatePicker]                     |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

### 5N. Set Dead Modal (Process › Set Dead › Life One — plan "84")

```
+--[ Set Dead — Life One ]------------------------------------- ×
|                                                              |
|  Date of Death:   [DatePicker]                               |
|  Cause of Death:  [TextInput]                                |
|                                                              |
|  [ Confirm ]   [ Cancel ]                                    |
+--------------------------------------------------------------+
```

### 5O. "No Second Life" Popup (Process › Set Dead › Life Two — plan "84")

```
+--[ Information ]-------------------- ×
|                                      |
|  There is no second life on this     |
|  policy.                             |
|                                      |
|              [ OK ]                  |
+--------------------------------------+
```

### 5P. Ceding Scheme Modal (Process › Ceding Scheme Details — plan "84")

```
+--[ Ceding Scheme Details ]----------------------------------- ×
|                                                              |
|  Ceding Company:   [TextInput]                               |
|  Scheme Name:      [TextInput]                               |
|  Transfer Value:   [TextInput]                               |
|  Transfer Date:    [DatePicker]                              |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

### 5Q. Edit Bank Details Modal (Bank Acc Details Tab › Edit)

```
+--[ Edit Bank Details ]--------------------------------------- ×
|                                                              |
|  Sort Code:      [TextInput]                                 |
|  Account No:     [TextInput]                                 |
|  Account Name:   [TextInput]                                 |
|  Bank Reference: [TextInput]                                 |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

### 5R. Supervisory Edit Modal (Supervisor › Supervisory Edit — plan "84"/"90")

Opens after the app auto-switches to the **Payments** tab (via `clanad:switch-tab` event).

```
+--[ Supervisory Edit ]--------------------------------------- ×
|                                                              |
|  +--[ Payment override fields ]--+                          |
|  | Override Gross:  [TextInput]  |                          |
|  | Override Net:    [TextInput]  |                          |
|  | Override Tax:    [TextInput]  |                          |
|  | Reason:          [v]          |                          |
|  +--------------------------------+                         |
|                                                              |
|  [ Apply ]   [ Cancel ]                                      |
+--------------------------------------------------------------+
```

### 5S. Bank Changes Report Modal (Supervisor › Bank Changes Awaiting Approval — plan "90")

```
+--[ Bank Changes Awaiting Approval ]------------------------- ×
|  +--[ Nav ]---+                                              |
|  | [ Print ]  [ Find ]                                       |
|  +------------+                                              |
|                                                              |
|  +--[ Changes grid ]--------------------------------------+  |
|  | Policy | Old Sort | Old Acc | New Sort | New Acc | ... |  |
|  |--------+----------+---------+----------+---------+-----|  |
|  | ...rows...                                             |  |
|  +-------------------------------------------------------+  |
|                                                              |
|  [ Approve ]   [ Reject ]   [ Close ]                        |
+--------------------------------------------------------------+
```

### 5T. Reprint Annual Statements Modal (Supervisor — all plans)

```
+--[ Reprint Annual Statements ]------------------------------ ×
|                                                              |
|  Tax Year:   [v 2024/2025]                                   |
|  Policy Ref: [TextInput]                                     |
|                                                              |
|  [ Print ]   [ Cancel ]                                      |
+--------------------------------------------------------------+
```

### 5U. Annual Statement Recalculation Modal (Supervisor — all plans)

```
+--[ Annual Statement Recalculation ]------------------------- ×
|                                                              |
|  Tax Year:    [v 2024/2025]                                  |
|  Policy Ref:  [TextInput]                                    |
|  Reason:      [TextInput]                                    |
|                                                              |
|  [ Recalculate ]   [ Cancel ]                                |
+--------------------------------------------------------------+
```

### 5V. Reprint Maturity Letters Modal (Supervisor — all plans)

```
+--[ Reprint Maturity Letters ]------------------------------- ×
|                                                              |
|  Policy Ref:      [TextInput]                                |
|  Maturity Date:   [DatePicker]                               |
|  Letter Type:     [v]                                        |
|                                                              |
|  [ Print ]   [ Cancel ]                                      |
+--------------------------------------------------------------+
```

### 5W. Misc Diary Entry Modal (Diary & Audit Trail Tab › New / Edit)

```
+--[ Diary Entry ]-------------------------------------------- ×
|                                                              |
|  Date:        [DatePicker]                                   |
|  Type:        [v]                                            |
|  Description: [Textarea]                                     |
|  User:        [TextInput  UAT3]  (read-only)                 |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

### 5X. Doctor Database Modal (Annuitant Details Tab › [···] Doctor icon)

```
+--[ Doctor Database ]---------------------------------------- ×
|                                                              |
|  Search: [_______________________]  [ Find ]                |
|                                                              |
|  +--[ Results grid ]-------------------------------------+  |
|  | Name | Practice | Address | Phone                    |  |
|  |------+----------+---------+--------------------------|  |
|  | ...rows...                                           |  |
|  +------------------------------------------------------+  |
|                                                              |
|  [ Select ]   [ Cancel ]                                     |
+--------------------------------------------------------------+
```

### 5Y. CRS Modal (Toolbar › CRS)

```
+--[ CRS ]---------------------------------------------------- ×
|                                                              |
|  CRS Status:       [TextInput]                               |
|  Country of Res.:  [v]                                       |
|  TIN:              [TextInput]                               |
|  Reason No TIN:    [v]                                       |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

### 5Z. Cheque Logger Modal (Toolbar › Log)

```
+--[ Cheque Log ]---------------------------------------------- ×
|                                                               |
|  +--[ Cheque log grid (ChequesContext) ]-----------------+   |
|  | Date | Cheque No | Amount | Received From | Status   |   |
|  |------+-----------+--------+---------------+----------|   |
|  | ...rows...                                           |   |
|  +------------------------------------------------------+   |
|                                                               |
|  [ Close ]                                                    |
+---------------------------------------------------------------+
```

### 5AA. Reports Modal (Toolbar › Reports)

```
+--[ Reports ]--------------------------------------------- ×
|                                                            |
|  Report Type:   [v]                                        |
|  Date From:     [DatePicker]                               |
|  Date To:       [DatePicker]                               |
|  Policy Ref:    [TextInput]  (optional filter)             |
|                                                            |
|  [ Generate ]   [ Cancel ]                                 |
+------------------------------------------------------------+
```

### 5BB. Company Selection Modal (Toolbar › Company)

```
+--[ Company Selection ]-------------------------------------- ×
|                                                              |
|  +--[ Company grid ]-------------------------------------+  |
|  | Code | Name | Type | Status                          |  |
|  |------+------+------+---------------------------------|  |
|  | STALW-00 | Stalwart Life | Annuity | Active         |  |
|  | ...rows...                                           |  |
|  +------------------------------------------------------+  |
|                                                              |
|  [ Select ]   [ Cancel ]                                     |
+--------------------------------------------------------------+
```

### 5CC. View Notional Value Modal

```
+--[ Notional Value ]----------------------------------------- ×
|                                                              |
|  Policy Ref:       [TextInput  read-only]                    |
|  Notional Value:   [TextInput  read-only]                    |
|  Calculation Date: [TextInput  read-only]                    |
|                                                              |
|  [ Close ]                                                   |
+--------------------------------------------------------------+
```

### 5DD. Customer Needs Modal

```
+--[ Customer Needs Assessment ]------------------------------- ×
|                                                              |
|  +--[ Needs checklist ]----------------------------------+  |
|  | [x] Annuity income required                          |  |
|  | [x] Joint life cover                                 |  |
|  | [ ] Inflation protection                             |  |
|  | ...items...                                          |  |
|  +------------------------------------------------------+  |
|                                                              |
|  Notes: [Textarea]                                           |
|                                                              |
|  [ Save ]   [ Cancel ]                                       |
+--------------------------------------------------------------+
```

---

## 6. Date Picker Component (DateInput)

Used in all tabs wherever `[DatePicker]` appears above.

```
+--[ Calendar popover ]-----+
| < May 2026 >              |
| Mo Tu We Th Fr Sa Su      |
|              1  2  3  4   |
|  5  6  7  8  9 10 11      |
| 12 13 14 15 16 17 18      |
| 19 20 21 22 23 24 25      |
| 26 27 28 29 30 31         |
| [ Today ]  [ Clear ]      |
+---------------------------+

Click month/year header → switches to months/years view.
Disabled DatePickers render as read-only text fields.
```

---

## 7. Global State & Context

```
+--[ PlanCodeContext ]--------------------------------------------------+
| planCode: "0" | "87" | "84" | "90"  (default: "90")                  |
| surname:  driven from FindPolicyModal selection                        |
| policyRef: driven from FindPolicyModal selection                       |
| setPlanCode / setSurname / setPolicyRef                                |
+-----------------------------------------------------------------------+

+--[ EditModeContext ]--------------------------------------------------+
| editing: boolean  (false by default)                                  |
| setEditing()   — toggled by Toolbar Edit/Save button                  |
| cancel()       — reverts all fields to their initial defaultValue     |
| cancelKey      — increments on cancel, forces tab re-mount            |
| ALWAYS_EDITING — context value injected by LettersTab so              |
|                  distribution controls bypass global edit lock         |
+-----------------------------------------------------------------------+

+--[ ChequesContext ]---------------------------------------------------+
| cheques: ChequeRow[]  — shared between Bank Acc Details tab,          |
|          AmendChequesModal, and ChequeLoggerModal                     |
| addCheque / removeCheque / updateChequeStatus                         |
+-----------------------------------------------------------------------+
```

---

## 8. Toolbar — Button Availability Matrix

```
Button      | Not Editing | Editing | Plan 84 | Plan 90
------------|-------------|---------|---------|--------
New App     |     ✓       |    ✗    |    ✓    |   ✓
New Quote   |     ✓       |    ✗    |    ✗    |   ✗
Sim App     |     ✓       |    ✗    |    ✓    |   ✓
Edit        |     ✓       |    —    |    ✓    |   ✓
Save        |     —       |    ✓    |    ✓    |   ✓
Cancel      |     ✗       |    ✓    |    ✓    |   ✓
Search      |     ✓       |    ✗    |    ✓    |   ✓
Log         |     ✓       |    ✗    |    ✓    |   ✓
CRS         |     ✓       |    ✗    |    ✓    |   ✓
Reports     |     ✓       |    ✗    |    ✓    |   ✓
Company     |     ✓       |    ✗    |    ✓    |   ✓
```

---

## 9. Navigation Flow Map

```
App Start (planCode="90")
        │
        ├─ Toolbar ───────────────────────────────────────────────────────────┐
        │   ├─ New App → ConfirmDialog → (Yes) → QuoteLookupModal             │
        │   ├─ New Quote → PullQuoteModal  (disabled for 84/90)               │
        │   ├─ Sim App → ConfirmDialog → (Yes) → QuoteLookupModal             │
        │   ├─ Edit/Save → toggle EditMode (fields unlock/lock)               │
        │   ├─ Cancel → revert all field values, exit EditMode                │
        │   ├─ Search → FindPolicyModal → select row → planCode changes       │
        │   ├─ Log → ChequeLoggerModal                                        │
        │   ├─ CRS → CrsModal                                                 │
        │   ├─ Reports → ReportsModal                                         │
        │   └─ Company → CompanySelectionModal                                │
        │                                                                     │
        ├─ Menu Bar ──────────────────────────────────────────────────────────┤
        │  Options                                                             │
        │   ├─ Screen Print → ScreenPrintModal                                │
        │   ├─ Check Completion → CompletionCheckerModal (plan 0/87)          │
        │   ├─ Amend IFA → AmendIfaModal                                      │
        │   ├─ P45 Details → P45DetailsModal (plan 84/90)                     │
        │   └─ Search → FindPolicyModal (same as toolbar Search)              │
        │  Process (plan 84/90)                                                │
        │   ├─ Set Dead › Life One → SetDeadModal                             │
        │   ├─ Set Dead › Life Two → "No second life" info popup              │
        │   ├─ Payments › Suspend → click 1: stage; click 2 → ConfirmDialog  │
        │   ├─ PLA Cancellation → ConfirmDialog                               │
        │   └─ Ceding Scheme Details → CedingSchemeModal                      │
        │  Print (plan 84/90)                                                  │
        │   ├─ Tax Certificate → TaxCertificateModal                          │
        │   └─ Copy P60 → CopyP60Modal                                        │
        │  Supervisor                                                          │
        │   ├─ Supervisory Edit → switch to Payments tab → SupervisoryEditModal│
        │   ├─ Status Change › Expired (plan 90) → ConfirmDialog              │
        │   ├─ C(ancel) Application (plan 90) → ConfirmDialog                 │
        │   ├─ Amend Cheques → AmendChequesModal                              │
        │   ├─ Amend IFA → AmendIfaModal                                      │
        │   ├─ Bank Changes Awaiting Approval (plan 90) → BankChangesReportModal│
        │   ├─ Pull Quote (plan 84/90) → PullQuoteModal                       │
        │   ├─ Reprint Annual Statements → ReprintAnnualStatementsModal       │
        │   ├─ Annual Statement Recalculation → RecalcAnnStatModal            │
        │   └─ Reprint Maturity Letters → ReprintMaturityModal                │
        │  Help                                                                │
        │   └─ About → AboutModal                                             │
        │                                                                     │
        ├─ Policy Header                                                       │
        │   └─ [···] More → Simultaneous Policies popup                       │
        │                                                                     │
        └─ Tab Bar ──────────────────────────────────────────────────────────▶│
            │                                                                  │
            ├─ Application Details                                             │
            ├─ Annuitant(s) Details                                            │
            │   └─ Doctor lookup icon → DoctorDatabaseModal                   │
            ├─ Contacts   (plan "0" only)                                      │
            ├─ Contacts 2 (plan "0" only)                                      │
            ├─ Policy Details                                                  │
            ├─ Bank Acc Details                                                │
            │   └─ Edit Bank Details → EditBankDetailsModal                   │
            ├─ Payments                                                        │
            │   └─ (SupervisoryEditModal auto-routes here)                    │
            ├─ Increase History                                                │
            ├─ Quote Details                                                   │
            ├─ Diary & Audit Trail                                             │
            │   ├─ New Entry → MiscDiaryModal                                 │
            │   └─ Edit Entry → MiscDiaryModal                                │
            ├─ Notes                                                           │
            ├─ Letters                                                         │
            │   ├─ Validation: no letter → info popup                         │
            │   └─ Validation: no method → info popup                         │
            ├─ Events                                                          │
            ├─ Maturities / Surrender                                         │
            └─ LOA/POA                                                        │
```

---

## 10. Angular Component Mapping (for migration reference)

The current React implementation maps to Angular components as follows:

```
React                          Angular Component
───────────────────────────    ──────────────────────────────────────────
App.tsx                      → AppComponent (app.component.ts)
Header.tsx                   → HeaderComponent
Footer.tsx                   → FooterComponent
Toolbar.tsx                  → ToolbarComponent
PolicyHeader.tsx             → PolicyHeaderComponent
TabBar.tsx                   → TabBarComponent
StatusBar.tsx                → StatusBarComponent

contexts/PlanCodeContext     → PlanCodeService (Injectable, singleton)
contexts/EditModeContext     → EditModeService (Injectable, singleton)
contexts/ChequesContext      → ChequesService (Injectable, singleton)

tabs/ApplicationDetailsTab   → ApplicationDetailsComponent
tabs/AnnuitantDetailsTab     → AnnuitantDetailsComponent
tabs/ContactsTab             → ContactsComponent
tabs/ContactsTab2            → Contacts2Component
tabs/PolicyDetailsTab        → PolicyDetailsComponent
tabs/BankAccDetailsTab       → BankAccDetailsComponent
tabs/PaymentsTab             → PaymentsComponent
tabs/IncreaseHistoryTab      → IncreaseHistoryComponent
tabs/QuoteDetailsTab         → QuoteDetailsComponent
tabs/DiaryAuditTab           → DiaryAuditComponent
tabs/NotesTab                → NotesComponent
tabs/LettersTab              → LettersComponent
tabs/EventsTab               → EventsComponent
tabs/MaturitiesSurrenderTab  → MaturitiesSurrenderComponent
tabs/LoaPoaTab               → LoaPoaComponent

components/Field.tsx         → field.component.ts (TextInput, SelectInput,
                               Checkbox, Section as child components)
components/DatePicker.tsx    → DatePickerComponent
components/ConfirmDialog.tsx → ConfirmDialogComponent (Angular CDK Dialog)
components/FindPolicyModal   → FindPolicyDialogComponent
components/QuoteLookupModal  → QuoteLookupDialogComponent
components/PullQuoteModal    → PullQuoteDialogComponent
components/SupervisoryEdit   → SupervisoryEditDialogComponent
... (all other modals)       → *DialogComponent (Angular CDK Dialog / MatDialog)
```

---

*Document generated: May 2026. Covers CLANAD LVE Component Library recreation,
all 15 tabs, 28+ modals/popups, 4 policy variants (planCode 0 / 84 / 87 / 90).*
