import { useRef, useState } from "react";
import { MdClose, MdPrint, MdCancel } from "react-icons/md";
import { DatePicker } from "./DatePicker";
import { AlwaysEditingProvider } from "../context/EditModeContext";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";


export function ReprintAnnualStatementsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const today = new Date();
  const [_reprintDate, setReprintDate] = useState<Date | undefined>(today);

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  return (
    <AlwaysEditingProvider>
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby="reprint-ann-stmt-title" className="lve-panel bg-white w-[420px] max-w-[96vw]">
        <header className="lve-panel-header flex items-center justify-between">
          <span id="reprint-ann-stmt-title">Reprint Annual Statements</span>
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
            Please enter the date for which you wish to reprint the Annual Statements
          </p>

          <div className="flex items-center gap-3">
            <span className="lve-label text-right shrink-0 w-[120px]">Reprint Date</span>
            <div className="flex-1">
              <DatePicker
                value={`${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`}
                placeholder="DD/MM/YYYY"
                onChange={setReprintDate}
              />
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
    </AlwaysEditingProvider>
  );
}
