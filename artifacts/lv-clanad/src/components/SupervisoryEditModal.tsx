import { MdClose, MdCheck, MdCancel } from "react-icons/md";

function Field({ label, value, width = "w-[110px]", blue = false }: {
  label: string;
  value?: string;
  width?: string;
  blue?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] text-right whitespace-nowrap shrink-0" style={{ minWidth: 150 }}>
        {label}
      </span>
      <div
        className={`h-[26px] ${width} rounded border border-[#999] bg-white px-2 flex items-center font-['Mulish'] text-[13px] ${blue ? "text-[#0000cc]" : "text-[#3d3d3d]"}`}
      >
        {value ?? ""}
      </div>
    </div>
  );
}

function SmallField({ label, value, width = "w-[90px]", blue = false }: {
  label: string;
  value?: string;
  width?: string;
  blue?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] text-right shrink-0">
        {label}
      </span>
      <div
        className={`h-[26px] ${width} rounded border border-[#999] bg-white px-2 flex items-center justify-end font-['Mulish'] text-[13px] ${blue ? "text-[#0000cc]" : "text-[#3d3d3d]"}`}
      >
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
  if (!open) return null;

  const is90 = planCode === "90";
  const is87 = planCode === "87";
  const is84 = planCode === "84";

  const startDate = is90 ? "28/05/2025" : is87 ? "15/05/2026" : is84 ? "31/03/2010" : "";
  const nextPayment = is90 ? "28/06/2026" : is87 ? "15/06/2026" : is84 ? "30/04/2010" : "";
  const premium = is90 ? "3021.57" : is87 ? "1500.00" : is84 ? "892.44" : "";
  const taxablePay = is90 ? "503.67" : is87 ? "125.00" : is84 ? "74.37" : "";
  const cumInstalments = is90 ? "503.67" : is87 ? "125.00" : is84 ? "74.37" : "";
  const instRmg = is90 ? "12" : is87 ? "12" : is84 ? "12" : "";
  const nthInst = is90 ? "2" : is87 ? "1" : is84 ? "1" : "";
  const reAssurer = is90 ? "" : is87 ? "" : is84 ? "RGA 1" : "";
  const overlap = is90 ? "N" : is87 ? "N" : is84 ? "N" : "";
  const escalation = is90 ? "0" : is87 ? "0" : is84 ? "0" : "";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="bg-[#d4d0c8] border-2 border-[#808080] shadow-[2px_2px_6px_rgba(0,0,0,0.4)] w-[720px] max-w-[95vw] font-['Mulish']">
        {/* Title bar */}
        <div className="bg-[#00327a] flex items-center justify-between px-2 py-1">
          <span className="text-white text-[13px] font-semibold font-['Mulish']">Supervisory Edit:</span>
          <button
            type="button"
            onClick={onClose}
            className="w-5 h-5 bg-[#d4d0c8] border border-[#808080] flex items-center justify-center text-[#3d3d3d] hover:bg-[#e0e0e0] text-[12px] leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Row 1: Policy Services Status / Start Date / IFA Commission */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] whitespace-nowrap">Policy Services Status:</span>
              <div className="h-[26px] w-[40px] rounded border border-[#999] bg-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] whitespace-nowrap">Start Date:</span>
              <div className="h-[26px] w-[90px] rounded border border-[#999] bg-white px-2 flex items-center font-['Mulish'] text-[13px] text-[#0000cc]">
                {startDate}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] whitespace-nowrap">IFA Commission:</span>
              <div className="h-[26px] w-[90px] rounded border border-[#999] bg-white" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#999]" />

          {/* Row 2: ReAssurer / ReAss Premium */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] whitespace-nowrap">ReAssurer:</span>
              <div className="h-[26px] w-[110px] rounded border border-[#999] bg-white px-2 flex items-center font-['Mulish'] text-[13px] text-[#3d3d3d]">
                {reAssurer}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] whitespace-nowrap">ReAss Premium:</span>
              <div className="h-[26px] w-[90px] rounded border border-[#999] bg-white" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#999]" />

          {/* Main 3-column grid of fields */}
          <div className="grid grid-cols-3 gap-x-4 gap-y-2">
            {/* Column 1 */}
            <div className="space-y-2">
              <SmallField label="Premium" value={premium} blue />
              <SmallField label="Tax Free Cash" value="0" />
              <SmallField label="Life 1 Annuity" value="0" />
              <SmallField label="Depend's Annuity %" value="" />
              <SmallField label="Life 2 Annuity" value="0" />
              <SmallField label="Capital Element:" value="" />
              <SmallField label="Taxable pay" value={taxablePay} blue />
              <SmallField label="PAYE Tax paid to Date" value="0" />
              <SmallField label="PAYE Tax deduction" value="0" />
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <SmallField label="Overlap" value={overlap} />
              <SmallField label="Escalation options" value={escalation} />
              <SmallField label="Guarantee Options" value="" />
              <SmallField label="Guarantee Expiry" value="" />
              <SmallField label="IR Max Pension:" value="" />
              <SmallField label="IR Balance:" value="" />
              <SmallField label="Free Pay" value="" />
            </div>

            {/* Column 3 */}
            <div className="space-y-2">
              <SmallField label="Cumulative free pay" value="0" />
              <SmallField label="Cumulative instalments" value={cumInstalments} blue />
              <SmallField label="BAL Gross Annuity" value="0" />
              <SmallField label="BAL Capital Element" value="0" />
              <SmallField label="Gross Annuity Due" value="0" />
              <SmallField label="Nth inst for tax year" value={nthInst} />
              <div className="flex items-center gap-2">
                <span className="font-['Mulish'] text-[13px] text-[#3d3d3d] text-right shrink-0">Next Payment Due:</span>
                <div className="h-[26px] w-[90px] rounded border border-[#999] bg-white px-2 flex items-center font-['Mulish'] text-[13px] text-[#0000cc]">
                  {nextPayment}
                </div>
              </div>
              <SmallField label="Instalment Rmg:" value={instRmg} />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-1 border-2 border-[#999] bg-[#d4d0c8] font-['Mulish'] text-[13px] text-[#3d3d3d] hover:bg-[#e0e0e0] active:border-[#333]"
            >
              <MdCheck size={16} className="text-[#178830]" />
              OK (Save changes)
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-1 border-2 border-[#999] bg-[#d4d0c8] font-['Mulish'] text-[13px] text-[#3d3d3d] hover:bg-[#e0e0e0] active:border-[#333]"
            >
              <MdCancel size={16} className="text-[#d72714]" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
