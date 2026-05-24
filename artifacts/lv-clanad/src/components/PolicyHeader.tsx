import { useState } from "react";
import {
  MdKeyboardArrowDown,
  MdOpenInNew,
  MdMoreHoriz,
  MdCheck,
  MdClose,
} from "react-icons/md";
import { usePlanCode } from "../context/PlanCodeContext";

type SimRow = { policyNo: string; status: string; productType: string };

const SIM_ROWS: SimRow[] = [
  { policyNo: "233424", status: "P", productType: "FTA" },
];

export function PolicyHeader() {
  const [simOpen, setSimOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { planCode, surname, policyRef } = usePlanCode();

  return (
    <div className="lve-panel mb-6 p-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        title="Policy No"
        className="inline-flex items-center gap-1 px-3 h-9 rounded-[8px] border border-[#BBBBBB] bg-white font-['Mulish'] text-[#3d3d3d] hover:border-[#178830]"
      >
        {policyRef} <MdKeyboardArrowDown />
      </button>
      <button
        type="button"
        className="h-9 w-9 inline-flex items-center justify-center rounded-[8px] border border-[#BBBBBB] bg-white text-[#006cf4] hover:border-[#178830]"
        title="find aplication"
      >
        <MdOpenInNew size={16} />
      </button>

      <div className="px-4 h-9 inline-flex items-center rounded-[8px] bg-[#00263e] text-white font-['Livvic'] font-semibold text-sm">
        Liverpool Victoria Friendly Society Limited
      </div>

      <div
        title="CLANAD Number"
        className="px-3 h-9 inline-flex items-center rounded-[8px] bg-[#eaf5f8] text-[#0d2c41] font-['Mulish'] text-sm cursor-help"
      >
        {policyRef}
      </div>

      <div
        title="Plan Code"
        className="px-3 h-9 inline-flex items-center rounded-[8px] font-['Livvic'] font-semibold text-sm"
        style={{ background: "var(--lve-accent)", color: "var(--lve-accent-fg, #ffffff)" }}
      >
        {planCode}
      </div>

      <div
        className="px-4 h-9 inline-flex items-center rounded-[8px] font-['Livvic'] font-semibold text-sm"
        style={{ background: "var(--lve-accent)", color: "var(--lve-accent-fg, #ffffff)" }}
      >
        {surname}
      </div>

      <div className="px-3 h-9 inline-flex items-center rounded-[8px] bg-[#eaf5f8] text-[#0d2c41] font-['Mulish'] text-sm">
        Simultaneous Policies
      </div>

      <button
        type="button"
        onClick={() => {
          setSelectedIdx(null);
          setSimOpen(true);
        }}
        className="h-9 w-9 inline-flex items-center justify-center rounded-[8px] border border-[#BBBBBB] bg-white text-[#3d3d3d] hover:border-[#178830]"
        title="More"
      >
        <MdMoreHoriz size={18} />
      </button>

      {planCode !== "84" && (
        <div className="px-4 h-9 inline-flex items-center rounded-[8px] bg-[#7fdfdf] text-[#00263e] font-['Livvic'] font-semibold text-sm">
          RETIREMENT ACCOUNT
        </div>
      )}

      {simOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="w-[460px] bg-white rounded-[8px] shadow-xl overflow-hidden border border-[#bcd]">
            <header className="bg-[#00263e] text-white font-['Livvic'] text-[13px] font-semibold px-3 py-2">
              Simultaneous Policies
            </header>
            <div className="p-5">
              <div className="border border-[#bcd] rounded-[8px] overflow-hidden">
                <table className="w-full border-collapse font-['Mulish'] text-[12px]">
                  <thead>
                    <tr className="bg-[#d4d4d4] text-[#3d3d3d]">
                      <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[120px]">
                        Policy No
                      </th>
                      <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[90px]">
                        Status
                      </th>
                      <th className="text-left px-3 py-1.5">Product Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SIM_ROWS.map((r, i) => {
                      const isSel = selectedIdx === i;
                      const tdStyle = isSel
                        ? { backgroundColor: "#05579B", color: "#ffffff" }
                        : undefined;
                      return (
                        <tr
                          key={i}
                          onClick={() => setSelectedIdx(i)}
                          className="cursor-pointer bg-white text-[#3d3d3d] border-b border-[#e5e5e5]"
                        >
                          <td className="px-3 py-1.5" style={tdStyle}>{r.policyNo}</td>
                          <td className="px-3 py-1.5" style={tdStyle}>{r.status}</td>
                          <td className="px-3 py-1.5" style={tdStyle}>{r.productType}</td>
                        </tr>
                      );
                    })}
                    {Array.from({ length: 9 }).map((_, i) => (
                      <tr
                        key={`blank-${i}`}
                        className="bg-[#f4f4f4] border-b border-[#e5e5e5] last:border-b-0"
                      >
                        <td className="px-3 py-1.5">&nbsp;</td>
                        <td className="px-3 py-1.5">&nbsp;</td>
                        <td className="px-3 py-1.5">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="lve-btn"
                  disabled={selectedIdx === null}
                  onClick={() => setSimOpen(false)}
                >
                  <MdCheck size={16} />
                  Open
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => setSimOpen(false)}
                >
                  <MdClose size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
