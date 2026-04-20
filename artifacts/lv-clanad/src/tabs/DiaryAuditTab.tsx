import { useState } from "react";
import { Section } from "../components/Field";
import { FileText, Pencil, CheckCircle2, FileSearch, Users } from "lucide-react";

const DIARY = [
  { ref: 14, type: "BCE5A", notes: "BCE 5A check at age 75", created: "28/05/2025", by: "LV67180", due: "26/02/2034", completed: "", byCompleted: "" },
  { ref: 11, type: "Misc", notes: "Is Var 7 ok?", created: "01/05/2025", by: "PENSAK", due: "02/05/2025", completed: "", byCompleted: "" },
  { ref: 13, type: "Misc", notes: "LS form needed", created: "12/05/2025", by: "LV67180", due: "19/05/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 12, type: "Misc", notes: "Bank Statement needed", created: "12/05/2025", by: "LV67180", due: "19/05/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 10, type: "Misc", notes: "Client taking TFC and Lump Sum leaving £15,000.00", created: "22/04/2025", by: "LV62209", due: "29/04/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 8, type: "Misc", notes: "WPFTA dec sent to IFA", created: "22/04/2025", by: "LV62209", due: "29/04/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 2, type: "Fund Correspondence", notes: "Options Case- Prudential- 51641322", created: "13/03/2025", by: "SYSANN", due: "20/03/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 1, type: "Funds", notes: "Options Case- Prudential- 51641322", created: "13/03/2025", by: "SYSANN", due: "20/03/2025", completed: "28/05/2025", byCompleted: "LV62209" },
];

const AUDIT = [
  "Annuitant Details (Nat ins no) updated from ' - - - ' to 'WE-26-35-52-' by LV67647 on 13/03/2025 at 12:21:04",
  "Annuitant Details (Gender) updated from 'Female' to 'Male' by LV67647 on 13/03/2025 at 12:21:04",
  "System Advises: N.I sweep by LV67647 on 13/03/2025 at 12:21:23",
  "System Advises: N.I duplicates exist (1st life) by LV67647 on 13/03/2025 at 12:21:23",
  "IFA Acceptance Pack is generated and emailed to alice oldacre@lv.com by LV67647 on 13/03/2025 at 12:21:53",
  "IRF Letter is printed by LV67561 on 14/03/2025 at 14:11:59",
  "Annuitant Details (Nat ins no) updated from 'WE-26-35-52-' to 'WE-26-35-52-B' by LV67647 on 24/03/2025 at 11:49:36",
  "System Advises: Partial cheque refund by LV62209 on 02/05/2025 at 11:15:13",
  "System Advises: Cheque details amended by LV62209 on 02/05/2025 at 11:15:25",
  "System Advises: Partial cheque refund by LV62209 on 02/05/2025 at 11:17:29",
  "System Advises: Cheque details amended by LV62209 on 02/05/2025 at 11:17:50",
  "BANK_SORT_CODE changed from to 30-15-52 by LV67180 on 28/05/2025 at 08:49:07",
  "BANK_ACCOUNT_NO changed from to 01841281 by LV67180 on 28/05/2025 at 08:49:07",
];

export function DiaryAuditTab() {
  const [trail, setTrail] = useState<"notes" | "data">("notes");

  return (
    <div className="space-y-4">
      <Section title="Diary Details">
        <div className="overflow-auto max-h-[300px]">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ref</th>
                <th>Type</th>
                <th>Notes</th>
                <th>Created</th>
                <th>By</th>
                <th>Due</th>
                <th>Completed</th>
                <th>By</th>
              </tr>
            </thead>
            <tbody>
              {DIARY.map((d) => (
                <tr key={d.ref}>
                  <td className="font-mono">{d.ref}</td>
                  <td>{d.type}</td>
                  <td>{d.notes}</td>
                  <td className="font-mono">{d.created}</td>
                  <td className="font-mono">{d.by}</td>
                  <td className="font-mono">{d.due}</td>
                  <td className="font-mono">{d.completed}</td>
                  <td className="font-mono">{d.byCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button type="button" className="btn"><FileText size={14} /> New Diary Note</button>
          <button type="button" className="btn"><Pencil size={14} /> Edit Diary Note</button>
          <button type="button" className="btn"><CheckCircle2 size={14} /> Complete diary note</button>
          <button type="button" className="btn"><FileSearch size={14} /> Ceding Scheme Details</button>
          <button type="button" className="btn"><Users size={14} /> Customer Needs</button>
        </div>
      </Section>

      <Section title="Audit Trail">
        <div className="flex items-center gap-1 mb-3">
          <button
            type="button"
            className={`tab-btn ${trail === "notes" ? "active" : ""}`}
            onClick={() => setTrail("notes")}
          >Notes</button>
          <button
            type="button"
            className={`tab-btn ${trail === "data" ? "active" : ""}`}
            onClick={() => setTrail("data")}
          >Data Changes</button>
        </div>

        {trail === "notes" ? (
          <div>
            <p className="text-[11px] italic text-[color:var(--color-text-muted)] mb-2">
              Audit trail — you cannot amend or delete these notes!
            </p>
            <ul className="divide-y divide-[color:var(--color-panel-border)] max-h-[300px] overflow-auto">
              {AUDIT.map((line, i) => (
                <li key={i} className="py-1.5 text-[12px] font-mono text-[color:var(--color-link)] hover:bg-[color:var(--color-row-hover)] px-2">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[12px] text-[color:var(--color-text-muted)] italic">No data changes to display.</p>
        )}
      </Section>
    </div>
  );
}
