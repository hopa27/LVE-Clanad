import { useRef, useState } from "react";
import { MdCheck, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { DatePicker } from "./DatePicker";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

type BankData = {
  sortCode: string;
  bankName: string;
  accountName: string;
  accountNo: string;
  paymentRef: string;
  accountType: string;
  paymentMethod: string;
  effectiveDate: string;
};

function dataForPlan(planCode: string): BankData {
  switch (planCode) {
    case "87":
      return {
        sortCode: "20-00-00",
        bankName: "BARCLAY'S BANK PLC, 1 CHURCHILL PLACE",
        accountName: "Test",
        accountNo: "83608808",
        paymentRef: "233451",
        accountType: "0",
        paymentMethod: "B",
        effectiveDate: "",
      };
    case "84":
      return {
        sortCode: "77-48-14",
        bankName: "TSB, WINSFORD",
        accountName: "Testktbbbide",
        accountNo: "24782346",
        paymentRef: "111834",
        accountType: "0",
        paymentMethod: "B",
        effectiveDate: "",
      };
    case "90":
      return {
        sortCode: "77-48-14",
        bankName: "TSB, WINSFORD",
        accountName: "Testmtcchibd",
        accountNo: "24782346",
        paymentRef: "227813",
        accountType: "0",
        paymentMethod: "B",
        effectiveDate: "25/05/2026",
      };
    default:
      return {
        sortCode: "",
        bankName: "",
        accountName: "",
        accountNo: "",
        paymentRef: "",
        accountType: "0",
        paymentMethod: "B",
        effectiveDate: "",
      };
  }
}

export function EditBankDetailsModal({
  open,
  onClose,
  planCode,
}: {
  open: boolean;
  onClose: () => void;
  planCode: string;
}) {
  const initial = dataForPlan(planCode);
  const [form, setForm] = useState<BankData>(initial);
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);

  if (!open) return null;

  const set = (k: keyof BankData, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div ref={containerRef} className="bg-white rounded-[8px] shadow-xl border border-[#bcd] w-[520px] max-w-full overflow-hidden">
        <header className="bg-[#00263e] text-white font-['Livvic'] text-[14px] font-semibold px-4 py-2 flex items-center justify-between">
          <span>New bank details</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="p-6 space-y-4">
          {/* Change Effective Date — full width at top */}
          <div className="flex items-center gap-4">
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c] whitespace-nowrap">
              Change Effective Date
            </label>
            <div className="w-[180px]">
              <DatePicker
                value={form.effectiveDate}
                placeholder=""
                onChange={(d) => {
                  if (!d) return;
                  const dd = String(d.getDate()).padStart(2, "0");
                  const mm = String(d.getMonth() + 1).padStart(2, "0");
                  set("effectiveDate", `${dd}/${mm}/${d.getFullYear()}`);
                }}
              />
            </div>
          </div>

          <hr className="border-[#dce3ea]" />

          {/* Two-column grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 items-center">
            {/* Left col labels */}
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c]">
              Bank sort code
            </label>
            {/* Right — Bank Name label */}
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c]">
              Bank Name
            </label>

            {/* Row 1 inputs */}
            <input
              className="lve-input"
              value={form.sortCode}
              onChange={(e) => set("sortCode", e.target.value)}
            />
            {/* Bank Name — styled as a disabled navy-blue display box */}
            <div className="lve-input bg-[#002f5c] text-white border-[#002f5c] flex items-center overflow-hidden cursor-default select-none truncate">
              {form.bankName}
            </div>

            {/* Row 2 labels */}
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c]">
              Account name
            </label>
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c]">
              Bank account no
            </label>

            {/* Row 2 inputs */}
            <input
              className="lve-input"
              value={form.accountName}
              onChange={(e) => set("accountName", e.target.value)}
            />
            <input
              className="lve-input"
              value={form.accountNo}
              onChange={(e) => set("accountNo", e.target.value)}
            />

            {/* Row 3 labels */}
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c]">
              Payment Ref
            </label>
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c]">
              Account Type
            </label>

            {/* Row 3 inputs */}
            <input
              className="lve-input"
              value={form.paymentRef}
              onChange={(e) => set("paymentRef", e.target.value)}
            />
            <input
              className="lve-input bg-[#002f5c] text-white border-[#002f5c] cursor-default"
              value={form.accountType}
              readOnly
            />

            {/* Row 4 labels — only right col */}
            <div />
            <label className="font-['Livvic'] text-[14px] font-medium text-[#002f5c]">
              Payment method
            </label>

            {/* Row 4 inputs — only right col */}
            <div />
            <div className="relative">
              <select
                value={form.paymentMethod}
                onChange={(e) => set("paymentMethod", e.target.value)}
                className="lve-input pr-12 appearance-none"
              >
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="DB">DB</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <span className="h-6 w-px bg-[#BBBBBB]" />
                <span className="px-3 text-[#006cf4]">
                  <MdKeyboardArrowDown size={22} />
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              type="button"
              className="lve-btn lve-btn-sm min-w-[100px] justify-center"
              onClick={onClose}
            >
              <MdCheck size={16} /> OK
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm min-w-[100px] justify-center"
              onClick={onClose}
            >
              <MdClose size={16} /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
