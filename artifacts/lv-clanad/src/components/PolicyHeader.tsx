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

const SIM_ROWS_DEFAULT: SimRow[] = [
  { policyNo: "233424", status: "P", productType: "FTA" },
];

const SIM_ROWS_82: SimRow[] = [
  { policyNo: "116444", status: "S", productType: "PRP" },
];

const SIM_ROWS_84: SimRow[] = [
  { policyNo: "111834.1", status: "I", productType: "PRP" },
  { policyNo: "198364", status: "M", productType: "PRP" },
];

export function PolicyHeader() {
  const [simOpen, setSimOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const { planCode, surname, policyRef } = usePlanCode();

  const SIM_ROWS = planCode === "82" ? SIM_ROWS_82 : planCode === "84" ? SIM_ROWS_84 : SIM_ROWS_DEFAULT;

  return (
    <div className="lve-panel mb-6 p-4 flex flex-nowrap items-center gap-3 overflow-x-auto">
      <button
        type="button"
        title="Policy No"
        aria-label="Select policy number"
        className="inline-flex items-center justify-end gap-1 w-[140px] h-9 px-3 rounded-[8px] border border-[#BBBBBB] bg-white font-['Mulish'] text-[#3d3d3d] hover:border-[#178830]"
      >
        <MdKeyboardArrowDown />
      </button>
      <button
        type="button"
        className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-[8px] border border-[#BBBBBB] bg-white text-[#006cf4] hover:border-[#178830]"
        title="Find application"
        aria-label="Find application"
      >
        <MdOpenInNew size={16} />
      </button>

      {planCode === "87" || planCode === "84" || planCode === "90" || planCode === "51" || planCode === "80" || planCode === "83" || planCode === "82" || planCode === "621" || planCode === "76" || planCode === "76z" || planCode === "62a" || planCode === "611" || planCode === "52" || planCode === "61a" ? (
        <div className="px-4 h-9 shrink-0 inline-flex items-center rounded-[8px] bg-[#006cf4] text-white font-['Livvic'] font-semibold text-sm whitespace-nowrap">
          Liverpool Victoria Friendly Society Limited
        </div>
      ) : (
        <div className="w-[260px] h-9 shrink-0 rounded-[8px] bg-[#006cf4]" />
      )}

      <div
        title="CLANAD Number"
        className="px-3 h-9 shrink-0 inline-flex items-center rounded-[8px] bg-[#eaf5f8] text-[#0d2c41] font-['Mulish'] text-sm cursor-help whitespace-nowrap"
      >
        {policyRef}
      </div>

      <div
        title="Plan Code"
        className="px-3 h-9 shrink-0 inline-flex items-center rounded-[8px] font-['Livvic'] font-semibold text-sm whitespace-nowrap"
        style={{ background: "var(--lve-accent)", color: "var(--lve-accent-fg, #ffffff)" }}
      >
        {planCode === "76z" ? "76" : planCode}
      </div>

      <div
        className="px-4 h-9 w-[220px] shrink-0 inline-flex items-center rounded-[8px] font-['Livvic'] font-semibold text-sm overflow-hidden"
        style={{ background: "var(--lve-accent)", color: "var(--lve-accent-fg, #ffffff)" }}
      >
        <span className="truncate">{surname}</span>
      </div>

      {planCode === "84" || planCode === "51" || planCode === "80" || planCode === "83" || planCode === "62a" || planCode === "611" || planCode === "61a" ? (
        <div className="px-3 h-9 shrink-0 inline-flex items-center rounded-[8px] bg-[#eaf5f8] text-[#0d2c41] font-['Mulish'] text-sm whitespace-nowrap">
          Simultaneous Policies
        </div>
      ) : (
        <div className="w-[220px] h-9 shrink-0 rounded-[8px] bg-[#eaf5f8]" />
      )}

      <button
        type="button"
        disabled={planCode === "90" || planCode === "62a"}
        onClick={() => {
          setSelectedIdx(null);
          setSimOpen(true);
        }}
        className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-[8px] border border-[#BBBBBB] bg-white text-[#3d3d3d] hover:border-[#178830] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-[#BBBBBB]"
        title="More"
        aria-label="More options"
      >
        <MdMoreHoriz size={18} />
      </button>

      {planCode === "90" ? (
        <div role="status" aria-label="Policy type: Monthly Cash Policy" className="px-4 h-9 shrink-0 inline-flex items-center rounded-[8px] bg-[#F4D9E8] text-[#710340] font-['Livvic'] font-semibold text-sm whitespace-nowrap">
          MONTHLY CASH POLICY
        </div>
      ) : planCode === "83" ? (
        <div role="status" aria-label="Policy type: Retirement Account" className="px-4 h-9 shrink-0 inline-flex items-center rounded-[8px] bg-[#00B4C8] text-black font-['Livvic'] font-semibold text-sm whitespace-nowrap">
          RETIREMENT ACCOUNT
        </div>
      ) : (
        <div className="w-[180px] h-9 shrink-0 rounded-[8px] bg-[#eaf5f8]" />
      )}

      {simOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div role="dialog" aria-modal="true" aria-labelledby="sim-policies-title" className="w-[460px] bg-white rounded-[8px] shadow-xl overflow-hidden border border-[#bcd]">
            <header id="sim-policies-title" className="bg-[#00263e] text-white font-['Livvic'] text-[13px] font-semibold px-3 py-2">
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
