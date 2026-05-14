import { useState } from "react";
import {
  MdClose,
  MdPrint,
  MdLogout,
  MdSearch,
  MdKeyboardArrowDown,
} from "react-icons/md";

type Report = { name: string; dateRequired: string; path?: string };

const REPORTS: Report[] = [
  { name: "Anniversary Date Check", dateRequired: "S", path: "\\\\delphiuat\\uat\\anad96\\reports\\32setlive.rpt" },
  { name: "Annuities Time From Application To Completion", dateRequired: "B" },
  { name: "Annuity Activity Report", dateRequired: "" },
  { name: "Annuity Applications", dateRequired: "B" },
  { name: "Annuity Completions", dateRequired: "B" },
  { name: "Annuity Completions by BACS", dateRequired: "B" },
  { name: "Annuity Completions by BACS - Summary", dateRequired: "B" },
  { name: "Annuity pipeline report", dateRequired: "" },
  { name: "Annuity pipeline summary report", dateRequired: "" },
  { name: "Annuity Receipts & Tax Free Cash Report", dateRequired: "B" },
  { name: "BACS cases with blank bank details", dateRequired: "" },
  { name: "Business from IFA", dateRequired: "" },
  { name: "Commissions in and out", dateRequired: "B" },
  { name: "Death Comparison CLANAD Report", dateRequired: "" },
  { name: "Detailed Turnaround Time Annuity Quotes", dateRequired: "B" },
  { name: "Diary Report", dateRequired: "" },
  { name: "ICFP - Cancelled Policies", dateRequired: "" },
];

export function ReportsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [systemName, setSystemName] = useState("DANAD96");
  const [startDate, setStartDate] = useState("06/06/2017");
  const [endDate, setEndDate] = useState("17/04/2017");
  const [printDefault, setPrintDefault] = useState(false);
  const [selected, setSelected] = useState(0);

  if (!open) return null;

  const selectedReport = REPORTS[selected];
  const reportPath = selectedReport?.path ?? "";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[1080px] max-w-full max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>DANAD96 Reporting System</span>
          <button
            type="button"
            className="text-white/80 hover:text-white"
            onClick={onClose}
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-hidden flex flex-col gap-4">
          {/* Top toolbar */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col">
              <label className="lve-label">System Name</label>
              <div className="relative w-[200px]">
                <select
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="lve-input pr-12 appearance-none"
                >
                  <option>DANAD96</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                  <span className="h-6 w-px bg-[#BBBBBB]" />
                  <span className="px-3 text-[#006cf4]">
                    <MdKeyboardArrowDown size={22} />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="lve-label">Start Date</label>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="lve-input w-[160px]"
              />
            </div>

            <div className="flex flex-col">
              <label className="lve-label">End Date</label>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="lve-input w-[160px]"
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button type="button" className="lve-btn lve-btn-sm">
                <MdPrint size={16} />
                Print
              </button>
              <button
                type="button"
                onClick={onClose}
                className="lve-btn lve-btn-secondary lve-btn-sm"
                title="Exit"
              >
                <MdLogout size={16} />
              </button>
            </div>
          </div>

          <label className="inline-flex items-center gap-2 select-none font-['Mulish'] text-[14px] text-[#3d3d3d] cursor-pointer">
            <input
              type="checkbox"
              checked={printDefault}
              onChange={(e) => setPrintDefault(e.target.checked)}
              className="w-4 h-4 accent-[#006cf4]"
            />
            Print to my default printer
          </label>

          {/* Table */}
          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden flex-1 min-h-0 flex flex-col">
            <div className="grid grid-cols-[1fr_160px] bg-[#eaf5f8] font-['Livvic'] text-[13px] font-semibold text-[#0d2c41] border-b border-[#BBBBBB]">
              <div className="px-4 py-2 border-r border-[#BBBBBB]">ReportName</div>
              <div className="px-4 py-2">DateRequired</div>
            </div>
            <div className="overflow-auto font-['Mulish'] text-[14px] text-[#3d3d3d]">
              {REPORTS.map((r, i) => {
                const isSel = i === selected;
                return (
                  <div
                    key={r.name}
                    onClick={() => setSelected(i)}
                    className={`grid grid-cols-[1fr_160px] cursor-pointer border-b border-[#e3e6ea] last:border-b-0 ${
                      isSel
                        ? "bg-[#006cf4] text-white"
                        : "hover:bg-[#eaf5f8]"
                    }`}
                  >
                    <div
                      className={`px-4 py-1.5 border-r ${
                        isSel ? "border-[#003578]" : "border-[#e3e6ea]"
                      }`}
                    >
                      {r.name}
                    </div>
                    <div className="px-4 py-1.5">{r.dateRequired}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer path + Find */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={reportPath}
              className="lve-input flex-1 bg-[#fafafa] cursor-default"
            />
            <button
              type="button"
              disabled
              className="lve-btn lve-btn-secondary lve-btn-sm"
            >
              <MdSearch size={16} />
              Find
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
