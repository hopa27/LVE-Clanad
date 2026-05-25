import { useState } from "react";
import { MdClose, MdCheck, MdCancel } from "react-icons/md";

export function P45DetailsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [grossPay, setGrossPay] = useState("");
  const [taxPaid, setTaxPaid] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[380px] max-w-full">
        <header className="lve-panel-header flex items-center justify-between">
          <span>P45 Details...</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <label className="lve-label w-[140px] text-right shrink-0">
                P45 Gross Pay: £
              </label>
              <input
                type="text"
                value={grossPay}
                onChange={(e) => setGrossPay(e.target.value)}
                className="lve-input flex-1"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="lve-label w-[140px] text-right shrink-0">
                P45 Tax Paid: £
              </label>
              <input
                type="text"
                value={taxPaid}
                onChange={(e) => setTaxPaid(e.target.value)}
                className="lve-input flex-1"
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-1">
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
