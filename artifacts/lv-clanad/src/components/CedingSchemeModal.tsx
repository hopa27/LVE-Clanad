import { useState } from "react";
import {
  MdClose,
  MdInsertDriveFile,
  MdEdit,
  MdSave,
  MdCheck,
  MdArrowDropDown,
} from "react-icons/md";

const TRANSFER_TYPES = [
  "",
  "Transfer In",
  "Transfer Out",
  "Internal Transfer",
  "Pension Sharing Order",
];

type ChequeRow = {
  chequeNo: number;
  amount: number;
  scheme: string;
  schemeRef: string;
};

const CHEQUES: ChequeRow[] = [
  { chequeNo: 1, amount: 10000, scheme: "NMPTL", schemeRef: "" },
];

function DisabledField({ value, className = "" }: { value?: string; className?: string }) {
  return (
    <div
      className={`flex h-[44px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-[11px] py-[7px] font-['Mulish'] text-[15px] text-[#3d3d3d] cursor-not-allowed ${className}`}
    >
      {value ?? ""}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-['Livvic'] text-[12px] font-semibold tracking-wide text-[#3d3d3d] uppercase">
      {children}
    </span>
  );
}

function ToolBtn({
  icon,
  label,
  disabled = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-3 py-1 rounded-[6px] min-w-[58px] font-['Mulish'] text-[12px] ${
        disabled
          ? "text-[#a0a0a0] cursor-not-allowed"
          : "text-[#3d3d3d] hover:bg-[#eaf5f8]"
      }`}
    >
      <span className="mb-0.5">{icon}</span>
      {label}
    </button>
  );
}

function DisabledRadio({ label, checked }: { label: string; checked: boolean }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-not-allowed text-[#9a9a9a] font-['Mulish'] text-[13px]">
      <span
        className={`inline-block w-4 h-4 rounded-full border-[2px] border-[#9a9a9a] bg-white relative ${
          checked
            ? "after:content-[''] after:absolute after:inset-[3px] after:rounded-full after:bg-[#9a9a9a]"
            : ""
        }`}
      />
      {label}
    </label>
  );
}

export function CedingSchemeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [transferType, setTransferType] = useState("");
  const [transferOpen, setTransferOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel w-[1024px] max-w-[95vw] bg-white">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Ceding Company Details</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-1 border-b border-[#e0e0e0] pb-2">
            <ToolBtn icon={<MdInsertDriveFile size={20} />} label="New" />
            <ToolBtn icon={<MdEdit size={20} />} label="Edit" />
            <ToolBtn icon={<MdSave size={20} />} label="Save" disabled />
            <ToolBtn
              icon={<MdCheck size={20} className="text-[#178830]" />}
              label="Ok"
              onClick={onClose}
            />
          </div>

          {/* Two-column form */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {/* Left column */}
            <div className="space-y-3">
              <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <Label>Policy Number</Label>
                <div className="flex h-[44px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-white px-[11px] font-['Mulish'] text-[15px] text-[#3d3d3d] w-[180px]">
                  233433
                </div>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <Label>Scheme Name</Label>
                <DisabledField />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <Label>Amount</Label>
                <DisabledField className="!w-[180px]" />
              </div>
              <div className="space-y-2 pt-1">
                <Label>Transfer-Type of Ceding Scheme</Label>
                <div className="relative">
                  <button
                    type="button"
                    className="lve-input w-full flex items-center justify-between text-left"
                    onClick={() => setTransferOpen((v) => !v)}
                  >
                    <span className={transferType ? "" : "text-transparent"}>
                      {transferType || "."}
                    </span>
                    <MdArrowDropDown size={20} className="text-[#555]" />
                  </button>
                  {transferOpen && (
                    <ul className="absolute z-10 left-0 right-0 mt-1 max-h-[180px] overflow-auto bg-white border border-[#bcd] rounded-[8px] shadow-md font-['Mulish'] text-[12px]">
                      {TRANSFER_TYPES.filter((o) => o !== "").map((o) => (
                        <li
                          key={o}
                          className={`px-3 py-1.5 cursor-pointer hover:bg-[#05579B] hover:text-white ${
                            o === transferType ? "bg-[#eaf5f8]" : ""
                          }`}
                          onClick={() => {
                            setTransferType(o);
                            setTransferOpen(false);
                          }}
                        >
                          {o}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-3">
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Ceding Scheme Policy Ref</Label>
                <DisabledField />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Address 1</Label>
                <DisabledField />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Address 2</Label>
                <DisabledField />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Address 3</Label>
                <DisabledField />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Post Code</Label>
                <DisabledField className="!w-[180px]" />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Telephone</Label>
                <DisabledField />
              </div>
            </div>
          </div>

          {/* Status row */}
          <div className="grid grid-cols-2 gap-x-8 items-center pt-1">
            <fieldset className="border border-[#bcd] rounded-[8px] px-4 py-2">
              <legend className="font-['Mulish'] text-[12px] text-[#3d3d3d] px-1">
                Letter Status
              </legend>
              <div className="flex items-center gap-6">
                <DisabledRadio label="Active" checked={false} />
                <DisabledRadio label="Suspended" checked={false} />
              </div>
            </fieldset>
            <div className="flex items-center gap-6 justify-end pr-2">
              <Label>Option Case?</Label>
              <DisabledRadio label="Yes" checked={false} />
              <DisabledRadio label="No" checked={false} />
            </div>
          </div>

          {/* Cheques data grid */}
          <div className="border border-[#bcd] rounded-[8px] overflow-hidden">
            <div className="overflow-auto max-h-[260px] bg-[#cccccc]">
              <table className="w-full border-collapse font-['Mulish'] text-[12px]">
                <thead>
                  <tr className="bg-[#d4d4d4] text-[#3d3d3d]">
                    <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[100px]">
                      Cheque No
                    </th>
                    <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[120px]">
                      Amount
                    </th>
                    <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0]">
                      Ceding Scheme
                    </th>
                    <th className="text-left px-3 py-1.5 w-[200px]">
                      Scheme Ref
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CHEQUES.map((c, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelectedRow(i)}
                      className={`cursor-pointer ${
                        selectedRow === i
                          ? "bg-[#002f5c] text-white"
                          : "bg-white text-[#3d3d3d] hover:bg-[#eaf5f8]"
                      }`}
                    >
                      <td className="px-3 py-1.5 text-right">{c.chequeNo}</td>
                      <td className="px-3 py-1.5 text-right">
                        {c.amount.toLocaleString("en-GB")}
                      </td>
                      <td className="px-3 py-1.5">{c.scheme}</td>
                      <td className="px-3 py-1.5">{c.schemeRef}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={4} className="h-[180px]" />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
