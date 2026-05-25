import { useState } from "react";
import { MdClose, MdPrint, MdCancel } from "react-icons/md";

const LETTER_TYPES = ["", "4 Month", "6 Week", "3 Week", "10 Day"];

export function ReprintMaturityModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [reprintDate, setReprintDate] = useState("25/05/2026");
  const [letterType, setLetterType] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel bg-white w-[420px] max-w-[96vw]">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Reprint Maturity Letters</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body space-y-5">
          <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] text-center">
            Please enter the date and letter type of the maturity process for which you wish to reprint
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="lve-label text-right shrink-0 w-[140px]">Reprint Date</span>
              <input
                type="text"
                className="lve-input flex-1"
                value={reprintDate}
                onChange={(e) => setReprintDate(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="lve-label text-right shrink-0 w-[140px]">Maturity letter types</span>
              <select
                className="lve-input flex-1 cursor-pointer"
                value={letterType}
                onChange={(e) => setLetterType(e.target.value)}
              >
                {LETTER_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn min-w-[100px] justify-center"
            >
              <MdPrint size={16} />
              Print
            </button>
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-secondary min-w-[100px] justify-center"
            >
              <MdCancel size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
