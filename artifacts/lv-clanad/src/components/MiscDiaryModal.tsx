import { useEffect, useRef, useState } from "react";
import { MdCheck, MdClose, MdArrowDropDown } from "react-icons/md";
import { DatePicker } from "./DatePicker";

const TYPE_OPTIONS = [
  "",
  "Advised Sale",
  "App Form (B)",
  "App Form (E/F)",
  "Bank Validation",
  "Beneficiary",
  "Beneficiary (Bank Dets)",
  "Beneficiary (DOB)",
  "Beneficiary (Name & Add)",
  "Beneficiary (NINO)",
  "Benefits Beneficiary Form",
  "Chaser Letter Maturity Incomplet",
  "Claim Form",
  "COE",
  "CVI",
  "Death Ben Nom Form",
  "Death Cert Client",
  "Death Cert Spouse",
  "Decency Limit",
  "Disclosure Check",
  "Disclosure Check Failure",
  "EOA Client",
  "Fund Correspondence",
  "Funds",
  "GAD details",
  "INVENO/Payment Ref",
  "LSQ Client",
  "LSQ Dec Client",
  "LSQ Dec Spouse",
  "LSQ Spouse",
  "LTA %",
  "LTA % (post 05/04/06)",
  "LTA Form",
  "Marriage Certificate",
  "Misc",
  "OCP/LOA",
  "Overpayment",
  "Post GPR Client",
  "Post GPR Spouse",
];

export function MiscDiaryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [typeOpen, setTypeOpen] = useState(false);
  const typeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!typeOpen) return;
    const handler = (e: MouseEvent) => {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) {
        setTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [typeOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel w-[460px] bg-white">
        <header className="lve-panel-header">Misc Diary</header>
        <div className="lve-panel-body space-y-4">
          <div className="flex items-center gap-3">
            <label className="lve-label w-[80px] shrink-0 text-right">
              Date Due:
            </label>
            <div className="flex-1">
              <DatePicker placeholder="Date Due" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="lve-label w-[80px] shrink-0 text-right">
              Type:
            </label>
            <div ref={typeRef} className="relative flex-1">
              <button
                type="button"
                className="lve-input w-full flex items-center justify-between text-left"
                onClick={() => setTypeOpen((v) => !v)}
              >
                <span className={type ? "" : "text-transparent"}>
                  {type || "."}
                </span>
                <MdArrowDropDown size={20} className="text-[#555]" />
              </button>
              {typeOpen && (
                <ul className="absolute z-10 left-0 right-0 mt-1 max-h-[180px] overflow-auto bg-white border border-[#bcd] rounded-[8px] shadow-md font-['Mulish'] text-[12px]">
                  {TYPE_OPTIONS.filter((o) => o !== "").map((o) => (
                    <li
                      key={o}
                      className={`px-3 py-1.5 cursor-pointer hover:bg-[#05579B] hover:text-white ${
                        o === type ? "bg-[#eaf5f8]" : ""
                      }`}
                      onClick={() => {
                        setType(o);
                        setTypeOpen(false);
                      }}
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <label className="lve-label w-[80px] shrink-0 text-right pt-2">
              Notes:
            </label>
            <textarea
              className="lve-input flex-1 min-h-[90px] resize-y"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              className="lve-btn lve-btn-secondary"
              onClick={onClose}
            >
              <MdClose size={16} />
              Cancel
            </button>
            <button type="button" className="lve-btn" onClick={onClose}>
              <MdCheck size={16} />
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
