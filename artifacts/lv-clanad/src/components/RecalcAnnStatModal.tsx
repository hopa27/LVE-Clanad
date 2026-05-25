import { useState } from "react";
import { MdClose, MdCheck, MdCancel } from "react-icons/md";
import { DatePicker } from "./DatePicker";
import { EditModeContext } from "../context/EditModeContext";

const PRODUCTS = ["With Profits", "Non Profits", "ICFP", "PRP", "PIPA"];

const ALWAYS_EDITING = {
  editing: true,
  setEditing: () => {},
  cancel: () => {},
  cancelKey: 0,
};

export function RecalcAnnStatModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [product, setProduct] = useState("With Profits");
  const [_fromDate, setFromDate] = useState<Date | undefined>();
  const [_toDate, setToDate] = useState<Date | undefined>();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel bg-white w-[420px] max-w-[96vw]">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Recalculate Ann. Stat.</span>
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
            Please enter the product and date range for which you wish to recalculate the Annual Statements
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="lve-label text-right shrink-0 w-[100px]">Product</span>
              <select
                className="lve-input flex-1 cursor-pointer"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                {PRODUCTS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="lve-label text-right shrink-0 w-[100px]">From Date:</span>
              <div className="flex-1">
                <EditModeContext.Provider value={ALWAYS_EDITING}>
                  <DatePicker placeholder="DD/MM/YYYY" onChange={setFromDate} />
                </EditModeContext.Provider>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="lve-label text-right shrink-0 w-[100px]">To Date:</span>
              <div className="flex-1">
                <EditModeContext.Provider value={ALWAYS_EDITING}>
                  <DatePicker placeholder="DD/MM/YYYY" onChange={setToDate} />
                </EditModeContext.Provider>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn min-w-[90px] justify-center"
            >
              <MdCheck size={16} />
              OK
            </button>
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-secondary min-w-[90px] justify-center"
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
