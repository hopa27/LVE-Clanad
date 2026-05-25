import { useState } from "react";
import {
  MdClose,
  MdCheck,
  MdCancel,
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";

const ILLUSTRATIONS = [
  { quote: 929149, variant: 0, ifa: "SANDF-001", created: "18 Dec 2007", name: "Test44Mr Stanislas",          type: "PPA", lifeType: "JOINT",  age1: 64.75, user: "111003046", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929543, variant: 0, ifa: "QUOTE-001", created: "17 Dec 2007", name: "Test44Ms M Graham",           type: "CPA", lifeType: "Single", age1: 73.75, user: "111002872", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929549, variant: 0, ifa: "BARWE-001", created: "17 Dec 2007", name: "Test44Mr A Heseltine",        type: "PPA", lifeType: "JOINT",  age1: 64.75, user: "200000001", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929550, variant: 0, ifa: "RIDIN-001", created: "17 Dec 2007", name: "Test44Mrs J Hamilton-Winter", type: "CPA", lifeType: "JOINT",  age1: 59.75, user: "106003101", master: "PR", status: "Printed", cocode: "STALW-00" },
  { quote: 929590, variant: 0, ifa: "EASTS-001", created: "17 Dec 2007", name: "Test44Mr T Owens",            type: "CPA", lifeType: "JOINT",  age1: 59.75, user: "200000001", master: "PR", status: "Printed", cocode: "STALW-00" },
  { quote: 929591, variant: 0, ifa: "ELEME-004", created: "18 Dec 2007", name: "Test44Mr M Chisholm",         type: "PPA", lifeType: "Single", age1: 60,    user: "111003046", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 929782, variant: 0, ifa: "QUOTE-001", created: "17 Dec 2007", name: "Test44Mr M Delapeyre",        type: "CPA", lifeType: "JOINT",  age1: 59.75, user: "200000001", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 930038, variant: 0, ifa: "OPENW-001", created: "18 Dec 2007", name: "Test44Mrs P Cadwell",         type: "CPA", lifeType: "JOINT",  age1: 58.25, user: "106003101", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 930041, variant: 0, ifa: "QUOTE-001", created: "18 Dec 2007", name: "Test44Mrs G Burrows",         type: "CPA", lifeType: "Single", age1: 59.75, user: "111002872", master: "No", status: "Printed", cocode: "STALW-00" },
  { quote: 930059, variant: 0, ifa: "WENTW-002", created: "18 Dec 2007", name: "Test44Mr R Garnett",          type: "PPA", lifeType: "JOINT",  age1: 61.75, user: "111003046", master: "No", status: "Printed", cocode: "STALW-00" },
];

const NAV_BTN =
  "lve-btn lve-btn-secondary lve-btn-sm !px-2 !min-w-0 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed";

export function PullQuoteModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [filterMode, setFilterMode] = useState<">=" | "=">(">=");
  const [filterValue, setFilterValue] = useState("0");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [monthlyCash, setMonthlyCash] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel w-[940px] max-w-[96vw] max-h-[90vh] flex flex-col">

        {/* Modal header */}
        <header className="flex items-center justify-between px-5 py-3 border-b border-[#d0d5dd] shrink-0">
          <span className="font-['Livvic'] font-bold text-[15px] text-[#00263e]">Quote Lookup</span>
          <button
            type="button"
            onClick={onClose}
            className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        {/* Body */}
        <div className="lve-panel-body flex flex-col gap-4 overflow-hidden">

          {/* ── Filter / nav toolbar ── */}
          <div className="flex items-start gap-6 flex-wrap">

            {/* Get Records */}
            <div className="border border-[#d0d5dd] rounded-[8px] px-4 py-3">
              <p className="font-['Livvic'] font-semibold text-[11px] text-[#00263e] uppercase tracking-wide mb-2">
                Get Records
              </p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
                  <input
                    type="radio"
                    name="pqFilter"
                    checked={filterMode === ">="}
                    onChange={() => setFilterMode(">=")}
                    className="accent-[#006cf4] w-4 h-4"
                  />
                  <span className="font-semibold">&gt;=</span>
                </label>
                <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
                  <input
                    type="radio"
                    name="pqFilter"
                    checked={filterMode === "="}
                    onChange={() => setFilterMode("=")}
                    className="accent-[#006cf4] w-4 h-4"
                  />
                  <span className="font-semibold">=</span>
                  <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="lve-input h-[32px] w-[80px] text-[13px]"
                  />
                </label>
              </div>
            </div>

            {/* Nav buttons + counter */}
            <div className="flex flex-col gap-1 justify-center pt-1">
              <div className="flex items-center gap-1">
                <button type="button" className={NAV_BTN} title="First">   <MdFirstPage   size={16} /></button>
                <button type="button" className={NAV_BTN} title="Previous"><MdChevronLeft  size={16} /></button>
                <button type="button" className={NAV_BTN} title="Next">    <MdChevronRight size={16} /></button>
                <button type="button" className={NAV_BTN} title="Last">    <MdLastPage    size={16} /></button>
              </div>
              <span className="font-['Mulish'] text-[12px] text-[#7a7a7a] text-center">20275369</span>
            </div>

            {/* Action buttons + checkbox */}
            <div className="flex flex-col gap-3 justify-center flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm min-w-[80px] justify-center">
                  Last 60
                </button>
                <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm min-w-[130px] justify-center">
                  Locate (F3 Next)
                </button>
                <button type="button" className="lve-btn lve-btn-sm min-w-[70px] justify-center" disabled>
                  <MdCheck size={15} />
                  OK
                </button>
                <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm min-w-[90px] justify-center" onClick={onClose}>
                  <MdCancel size={15} />
                  Cancel
                </button>
              </div>
              <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={monthlyCash}
                  onChange={(e) => setMonthlyCash(e.target.checked)}
                  className="accent-[#006cf4] w-4 h-4"
                />
                Monthly Cash Policy
              </label>
            </div>
          </div>

          {/* ── Illustrations grid ── */}
          <div className="flex flex-col overflow-hidden rounded-[8px] border border-[#d0d5dd]">
            <div className="bg-[#eaf5f8] px-3 py-[6px] shrink-0 border-b border-[#d0d5dd]">
              <span className="font-['Livvic'] font-bold text-[13px] text-[#00263e]">
                Illustrations (Variant 0 only)
              </span>
            </div>
            <div className="overflow-auto" style={{ maxHeight: 220 }}>
              <table className="w-full text-[12px] font-['Mulish'] border-collapse">
                <thead className="sticky top-0">
                  <tr className="bg-[#002f5c] text-white text-left">
                    {["Quote","Variant(T)","IFA","Created","Name","Type","LifeType","Age 1","User","Master","Status","COCODE"].map((h) => (
                      <th key={h} className="px-2 py-[5px] font-semibold border-r border-[#1a4a7a] last:border-r-0 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ILLUSTRATIONS.map((row, i) => {
                    const sel = i === selectedIdx;
                    return (
                      <tr
                        key={row.quote}
                        onClick={() => setSelectedIdx(i)}
                        className={`cursor-pointer border-b border-[#e3e6ea] transition-colors ${
                          sel
                            ? "bg-[#006cf4] text-white"
                            : i % 2 === 0
                              ? "bg-white hover:bg-[#eaf5f8] text-[#3d3d3d]"
                              : "bg-[#f7f9fc] hover:bg-[#eaf5f8] text-[#3d3d3d]"
                        }`}
                      >
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.quote}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea] text-center">{row.variant}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.ifa}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea] whitespace-nowrap">{row.created}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.name}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.type}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.lifeType}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea] text-right">{row.age1}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.user}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.master}</td>
                        <td className="px-2 py-[3px] border-r border-[#e3e6ea]">{row.status}</td>
                        <td className="px-2 py-[3px]">{row.cocode}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Variants grid ── */}
          <div className="flex flex-col rounded-[8px] border border-[#d0d5dd]">
            <div className="bg-[#eaf5f8] px-3 py-[6px] shrink-0 border-b border-[#d0d5dd]">
              <span className="font-['Livvic'] font-bold text-[13px] text-[#00263e]">Variants</span>
            </div>
            <div className="overflow-auto" style={{ maxHeight: 110 }}>
              <table className="w-full text-[12px] font-['Mulish'] border-collapse">
                <thead>
                  <tr className="bg-[#002f5c] text-white text-left">
                    {["Variant","Series","Created","Username","Type","Life Type","Gross Annuity","Amount","TFC %","TFC","Dep %","O/lap","Gtee"].map((h) => (
                      <th key={h} className="px-2 py-[5px] font-semibold border-r border-[#1a4a7a] last:border-r-0 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={13} className="px-2 py-4 text-center text-[#b8b8b8] font-['Mulish'] text-[12px]">
                      No variants
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
