import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

type Row = {
  valueDate: string;
  amount: string;
  withheldMinimalIncome: string;
  mutualBonus: string;
};

const ROWS: Row[] = [
  { valueDate: "25/04/2026", amount: "14176", withheldMinimalIncome: "", mutualBonus: "" },
  { valueDate: "25/03/2026", amount: "14828", withheldMinimalIncome: "", mutualBonus: "" },
  { valueDate: "25/02/2026", amount: "14780", withheldMinimalIncome: "", mutualBonus: "" },
  { valueDate: "25/01/2026", amount: "14733", withheldMinimalIncome: "", mutualBonus: "" },
  { valueDate: "25/12/2025", amount: "14686", withheldMinimalIncome: "", mutualBonus: "" },
];

export function ViewNotionalValueModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} className="lve-panel bg-white w-[760px] max-w-full max-h-[92vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>ViewNotionalValue</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto flex flex-col gap-5">
          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
            <div className="overflow-auto max-h-[320px]">
              <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d] min-w-[680px]">
                <thead>
                  <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] uppercase text-[#002f5c]">
                    <th className="px-3 py-3 text-left">VALUE_DATE</th>
                    <th className="px-3 py-3 text-right">AMOUNT</th>
                    <th className="px-3 py-3 text-left">WITHHELD_MINIMAL_INCOME</th>
                    <th className="px-3 py-3 text-left">Mutual_Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r, i) => (
                    <tr
                      key={r.valueDate}
                      className={
                        i === 0
                          ? "bg-[#003578] text-white"
                          : i % 2 === 0
                            ? "bg-white"
                            : "bg-[#e7ebec34]"
                      }
                    >
                      <td className="px-3 py-2">{r.valueDate}</td>
                      <td className="px-3 py-2 text-right">{r.amount}</td>
                      <td className="px-3 py-2">{r.withheldMinimalIncome}</td>
                      <td className="px-3 py-2">{r.mutualBonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-sm min-w-[100px] justify-center"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
