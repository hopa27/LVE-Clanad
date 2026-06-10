import { useRef, useState } from "react";
import { MdClose, MdCheck, MdCancel } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

function ROField({
  label,
  value,
  labelWidth = 170,
}: {
  label: string;
  value?: string;
  labelWidth?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="lve-label text-right shrink-0"
        style={{ width: labelWidth }}
      >
        {label}
      </span>
      <div className="flex-1 h-[38px] flex items-center px-3 rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] font-['Mulish'] text-[14px] text-[#3d3d3d] cursor-not-allowed">
        {value ?? ""}
      </div>
    </div>
  );
}

export function SupervisoryEditModal({
  open,
  onClose,
  planCode = "0",
}: {
  open: boolean;
  onClose: () => void;
  planCode?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const is90 = planCode === "90";
  const is87 = planCode === "87";
  const is84 = planCode === "84";

  const startDate     = is90 ? "28/05/2025" : is87 ? "15/05/2026" : is84 ? "31/03/2010" : "";
  const nextPayment   = is90 ? "28/06/2026" : is87 ? "15/06/2026" : is84 ? "30/04/2010" : "";
  const premium       = is90 ? "3021.57"    : is87 ? "1500.00"    : is84 ? "892.44"      : "";
  const taxablePay    = is90 ? "503.67"     : is87 ? "125.00"     : is84 ? "74.37"       : "";
  const cumInstalments= is90 ? "503.67"     : is87 ? "125.00"     : is84 ? "74.37"       : "";
  const instRmg       = is90 ? "12"         : is87 ? "12"         : is84 ? "12"          : "";
  const nthInst       = is90 ? "2"          : is87 ? "1"          : is84 ? "1"           : "";
  const reAssurer     = is84 ? "RGA 1"      : "";
  const overlap       = "N";
  const escalation    = "0";

  const [policyServicesStatus, setPolicyServicesStatus] = useState("");
  const [ifaCommission, setIfaCommission] = useState("");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div ref={containerRef} className="lve-panel bg-white w-[880px] max-w-[96vw]">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Supervisory Edit</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <span className="lve-label text-right shrink-0" style={{ width: 160 }}>
                Policy Services Status:
              </span>
              <input
                type="text"
                className="lve-input flex-1"
                value={policyServicesStatus}
                onChange={(e) => setPolicyServicesStatus(e.target.value)}
              />
            </div>
            <ROField label="Start Date:" value={startDate} labelWidth={90} />
            <div className="flex items-center gap-3">
              <span className="lve-label text-right shrink-0" style={{ width: 120 }}>
                IFA Commission:
              </span>
              <input
                type="text"
                className="lve-input flex-1"
                value={ifaCommission}
                onChange={(e) => setIfaCommission(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t border-[#e3e6ea]" />

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <ROField label="ReAssurer:" value={reAssurer} labelWidth={100} />
            <ROField label="ReAss Premium:" value="" labelWidth={130} />
          </div>

          <div className="border-t border-[#e3e6ea]" />

          {/* Main 3-column grid */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-2">
            {/* Column 1 */}
            <div className="space-y-2">
              <ROField label="Premium" value={premium} labelWidth={155} />
              <ROField label="Tax Free Cash" value="0" labelWidth={155} />
              <ROField label="Life 1 Annuity" value="0" labelWidth={155} />
              <ROField label="Depend's Annuity %" value="" labelWidth={155} />
              <ROField label="Life 2 Annuity" value="0" labelWidth={155} />
              <ROField label="Capital Element:" value="" labelWidth={155} />
              <ROField label="Taxable pay" value={taxablePay} labelWidth={155} />
              <ROField label="PAYE Tax paid to Date" value="0" labelWidth={155} />
              <ROField label="PAYE Tax deduction" value="0" labelWidth={155} />
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <ROField label="Overlap" value={overlap} labelWidth={140} />
              <ROField label="Escalation options" value={escalation} labelWidth={140} />
              <ROField label="Guarantee Options" value="" labelWidth={140} />
              <ROField label="Guarantee Expiry" value="" labelWidth={140} />
              <ROField label="IR Max Pension:" value="" labelWidth={140} />
              <ROField label="IR Balance:" value="" labelWidth={140} />
              <ROField label="Free Pay" value="" labelWidth={140} />
            </div>

            {/* Column 3 */}
            <div className="space-y-2">
              <ROField label="Cumulative free pay" value="0" labelWidth={165} />
              <ROField label="Cumulative instalments" value={cumInstalments} labelWidth={165} />
              <ROField label="BAL Gross Annuity" value="0" labelWidth={165} />
              <ROField label="BAL Capital Element" value="0" labelWidth={165} />
              <ROField label="Gross Annuity Due" value="0" labelWidth={165} />
              <ROField label="Nth inst for tax year" value={nthInst} labelWidth={165} />
              <ROField label="Next Payment Due:" value={nextPayment} labelWidth={165} />
              <ROField label="Instalment Rmg:" value={instRmg} labelWidth={165} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn min-w-[140px] justify-center"
            >
              <MdCheck size={16} />
              OK (Save changes)
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
