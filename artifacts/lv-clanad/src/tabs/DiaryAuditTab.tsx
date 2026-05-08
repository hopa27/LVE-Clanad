import { useState } from "react";
import { Section } from "../components/Field";
import {
  MdNoteAdd,
  MdEdit,
  MdCheckCircleOutline,
  MdManageSearch,
  MdGroups,
} from "react-icons/md";

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

const DIARY_COLS = ["Ref", "Type", "Notes", "Created", "By", "Due", "Completed", "By"];

export function DiaryAuditTab() {
  const [trail, setTrail] = useState<"notes" | "data">("notes");

  return (
    <div className="space-y-4">
      <Section title="Diary Details">
        <div className="overflow-auto max-h-[320px]">
          <table className="lve-grid">
            <thead>
              <tr>
                {DIARY_COLS.map((c) => (
                  <th key={c} className="whitespace-nowrap !px-4">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DIARY.map((d) => (
                <tr key={d.ref}>
                  <td className="!px-4 whitespace-nowrap">{d.ref}</td>
                  <td className="!px-4 whitespace-nowrap">{d.type}</td>
                  <td className="!px-4">{d.notes}</td>
                  <td className="!px-4 whitespace-nowrap">{d.created}</td>
                  <td className="!px-4 whitespace-nowrap">{d.by}</td>
                  <td className="!px-4 whitespace-nowrap">{d.due}</td>
                  <td className="!px-4 whitespace-nowrap">{d.completed}</td>
                  <td className="!px-4 whitespace-nowrap">{d.byCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdNoteAdd size={16} /> New Diary Note
          </button>
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdEdit size={16} /> Edit Diary Note
          </button>
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdCheckCircleOutline size={16} /> Complete diary note
          </button>
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdManageSearch size={16} /> Ceding Scheme Details
          </button>
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdGroups size={16} /> Customer Needs
          </button>
        </div>
      </Section>

      <Section title="Audit Trail">
        <div className="flex items-center gap-1 mb-3">
          <button
            type="button"
            className={`lve-tab ${trail === "notes" ? "active" : ""}`}
            onClick={() => setTrail("notes")}
          >
            Notes
          </button>
          <button
            type="button"
            className={`lve-tab ${trail === "data" ? "active" : ""}`}
            onClick={() => setTrail("data")}
          >
            Data Changes
          </button>
        </div>

        {trail === "notes" ? (
          <div>
            <p className="font-['Mulish'] text-[12px] italic text-[#777] mb-2">
              Audit trail — you cannot amend or delete these notes!
            </p>
            <ul className="divide-y divide-[#e0e0e0] border border-[#e0e0e0] rounded-[8px] max-h-[320px] overflow-auto bg-white">
              {AUDIT.map((line, i) => (
                <li
                  key={i}
                  className="py-2 px-3 font-['Mulish'] text-[12px] text-[#005a9c] hover:bg-[#eaf5f8]"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="font-['Mulish'] text-[12px] text-[#777] italic">
            No data changes to display.
          </p>
        )}
      </Section>
    </div>
  );
}
