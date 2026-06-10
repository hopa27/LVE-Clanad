import { useRef, useState } from "react";
import { MdClose, MdCheck, MdCancel } from "react-icons/md";
import { DatePicker } from "./DatePicker";
import { format } from "date-fns";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

export function SetDeadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [dateOfDeath, setDateOfDeath] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} className="lve-panel bg-white w-[340px] max-w-full">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Set Dead</span>
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
          <div className="flex items-center gap-3">
            <label className="lve-label w-[110px] text-right shrink-0">
              Date of death
            </label>
            <DatePicker
              value={dateOfDeath}
              placeholder="dd/mm/yyyy"
              disabled={false}
              onChange={(d) => setDateOfDeath(d ? format(d, "dd/MM/yyyy") : "")}
            />
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-sm min-w-[90px] justify-center"
            >
              <MdCheck size={16} />
              OK
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
