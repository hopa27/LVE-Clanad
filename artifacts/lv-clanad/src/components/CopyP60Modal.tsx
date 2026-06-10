import { useRef, useState } from "react";
import { MdClose, MdCheck, MdCancel, MdInfo } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

export function CopyP60Modal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [taxYearEnd, setTaxYearEnd] = useState("2026");
  const [done, setDone] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  if (done) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
        <div ref={containerRef} className="lve-panel bg-white w-[320px] max-w-full">
          <header className="lve-panel-header flex items-center justify-between">
            <span>Information</span>
            <button
              type="button"
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
              onClick={() => { setDone(false); onClose(); }}
              aria-label="Close"
            >
              <MdClose size={18} />
            </button>
          </header>
          <div className="lve-panel-body flex flex-col items-center gap-5">
            <div className="flex items-center gap-3">
              <MdInfo size={36} className="text-[#006cf4] shrink-0" />
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d]">
                Printing Complete!
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setDone(false); onClose(); }}
              className="lve-btn lve-btn-sm min-w-[80px] justify-center"
            >
              <MdCheck size={16} />
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[360px] max-w-full">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Copy P60</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body flex flex-col gap-5">
          <p className="text-center font-['Mulish'] text-[14px] text-[#3d3d3d]">
            Please Enter Tax Year End
          </p>

          <div className="flex items-center gap-3">
            <label className="lve-label w-[110px] text-right shrink-0">
              Tax Year End
            </label>
            <input
              type="number"
              value={taxYearEnd}
              min={1990}
              max={2099}
              onChange={(e) => setTaxYearEnd(e.target.value)}
              className="lve-input w-[90px] text-center"
            />
          </div>

          <div className="flex justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setDone(true)}
              className="lve-btn lve-btn-sm min-w-[80px] justify-center"
            >
              <MdCheck size={16} />
              Ok
            </button>
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-secondary lve-btn-sm min-w-[90px] justify-center"
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
