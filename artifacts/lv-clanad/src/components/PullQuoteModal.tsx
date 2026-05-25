import { useState } from "react";
import { MdClose, MdCheck, MdCancel, MdFirstPage, MdLastPage, MdChevronLeft, MdChevronRight } from "react-icons/md";

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

const W32_BTN = "px-2 h-6 flex items-center justify-center gap-1 border border-[#808080] bg-[#d4d0c8] font-['Mulish'] text-[12px] text-[#3d3d3d] hover:bg-[#e0e0e0] disabled:text-[#b8b8b8] disabled:cursor-not-allowed whitespace-nowrap";
const NAV_BTN = "px-1 h-6 w-6 flex items-center justify-center border border-[#808080] bg-[#d4d0c8] text-[#3d3d3d] hover:bg-[#e0e0e0] disabled:text-[#b8b8b8] disabled:cursor-not-allowed";

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
      <div
        className="bg-[#d4d0c8] border-2 border-[#808080] shadow-[2px_2px_8px_rgba(0,0,0,0.5)] flex flex-col"
        style={{ width: 900, maxWidth: "96vw", maxHeight: "90vh" }}
      >
        {/* Win32 title bar */}
        <div className="bg-[#000080] flex items-center justify-between px-2 py-[3px] flex-shrink-0">
          <span className="text-white font-['Mulish'] text-[12px] font-bold">Quote Lookup</span>
          <button
            type="button"
            onClick={onClose}
            className="w-5 h-5 bg-[#d4d0c8] border border-[#808080] flex items-center justify-center text-[#3d3d3d] hover:bg-[#e0e0e0] text-[11px]"
          >
            <MdClose size={12} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-3 overflow-hidden flex-1">

          {/* ── Toolbar row ── */}
          <div className="flex items-start gap-3 flex-wrap">

            {/* Get Records fieldset */}
            <fieldset className="border border-[#808080] px-2 pt-0 pb-1">
              <legend className="font-['Mulish'] text-[11px] text-[#3d3d3d] px-1">Get Records</legend>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1 font-['Mulish'] text-[12px] text-[#3d3d3d] cursor-pointer">
                  <input type="radio" name="pqFilter" checked={filterMode === ">="} onChange={() => setFilterMode(">=")} className="w-3 h-3" />
                  <span>&gt;=</span>
                </label>
                <label className="flex items-center gap-1 font-['Mulish'] text-[12px] text-[#3d3d3d] cursor-pointer">
                  <input type="radio" name="pqFilter" checked={filterMode === "="} onChange={() => setFilterMode("=")} className="w-3 h-3" />
                  <span>=</span>
                  <input
                    type="text"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    className="border border-[#808080] bg-white font-['Mulish'] text-[12px] px-1 h-5 w-[80px]"
                  />
                </label>
              </div>
            </fieldset>

            {/* Nav buttons + counter */}
            <div className="flex flex-col gap-1 justify-center">
              <div className="flex items-center gap-[2px]">
                <button type="button" className={NAV_BTN} title="First">   <MdFirstPage   size={14} /></button>
                <button type="button" className={NAV_BTN} title="Previous"><MdChevronLeft  size={14} /></button>
                <button type="button" className={NAV_BTN} title="Next">    <MdChevronRight size={14} /></button>
                <button type="button" className={NAV_BTN} title="Last">    <MdLastPage    size={14} /></button>
              </div>
              <span className="font-['Mulish'] text-[11px] text-[#3d3d3d] text-center">20275369</span>
            </div>

            {/* Action buttons + checkbox */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1 flex-wrap">
                <button type="button" className={W32_BTN}>Last 60</button>
                <button type="button" className={W32_BTN}>Locate (F3 Next)</button>
                <button type="button" className={W32_BTN} disabled>
                  <MdCheck size={12} /> OK
                </button>
                <button type="button" className={W32_BTN} onClick={onClose}>
                  <MdCancel size={12} /> Cancel
                </button>
              </div>
              <label className="flex items-center gap-1 font-['Mulish'] text-[12px] text-[#3d3d3d] cursor-pointer">
                <input
                  type="checkbox"
                  checked={monthlyCash}
                  onChange={(e) => setMonthlyCash(e.target.checked)}
                  className="w-3 h-3"
                />
                Monthly Cash Policy
              </label>
            </div>
          </div>

          {/* ── Illustrations table ── */}
          <fieldset className="border border-[#808080] flex flex-col overflow-hidden">
            <legend className="font-['Mulish'] text-[11px] text-[#3d3d3d] px-1">Illustrations (Variant 0 only)</legend>
            <div className="overflow-auto" style={{ maxHeight: 220 }}>
              <table className="w-full text-[11px] font-['Mulish'] border-collapse">
                <thead className="sticky top-0">
                  <tr className="bg-[#d4d0c8] text-[#3d3d3d] text-left">
                    {["Quote","Variant(T)","IFA","Created","Name","Type","LifeType","Age 1","User","Master","Status","COCODE"].map((h) => (
                      <th key={h} className="px-2 py-[3px] font-bold border border-[#808080] whitespace-nowrap">{h}</th>
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
                        className={`cursor-pointer ${sel ? "bg-[#000080] text-white" : "bg-white hover:bg-[#d4d0c8] text-[#3d3d3d]"}`}
                      >
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.quote}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0] text-center">{row.variant}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.ifa}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0] whitespace-nowrap">{row.created}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.name}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.type}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.lifeType}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0] text-right">{row.age1}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.user}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.master}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.status}</td>
                        <td className="px-2 py-[2px] border border-[#c0c0c0]">{row.cocode}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </fieldset>

          {/* ── Variants table ── */}
          <fieldset className="border border-[#808080] flex flex-col">
            <legend className="font-['Mulish'] text-[11px] text-[#3d3d3d] px-1">Variants</legend>
            <div className="overflow-auto" style={{ maxHeight: 100 }}>
              <table className="w-full text-[11px] font-['Mulish'] border-collapse">
                <thead>
                  <tr className="bg-[#d4d0c8] text-[#3d3d3d] text-left">
                    {["Variant","Series","Created","Username","Type","Life Type","Gross Annuity","Amount","TFC %","TFC","Dep %","O/lap","Gtee"].map((h) => (
                      <th key={h} className="px-2 py-[3px] font-bold border border-[#808080] whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={13} className="px-2 py-3 text-center text-[#808080] bg-white border border-[#c0c0c0]">
                      No variants
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>

        </div>
      </div>
    </div>
  );
}
