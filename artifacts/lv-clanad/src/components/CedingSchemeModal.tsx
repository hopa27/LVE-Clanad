import { useState } from "react";
import {
  MdClose,
  MdInsertDriveFile,
  MdEdit,
  MdSave,
  MdCheck,
  MdArrowDropDown,
  MdHelpOutline,
} from "react-icons/md";

const TRANSFER_TYPES = [
  "",
  "UK Registered Defined Benefit Occupational Pension Scheme",
  "UK Registered Defined Contribution Occupational Pension Scheme",
  'Other UK Registered Pension Scheme (eg. "Personal Pension" or "SIPP")',
  "Deferred Annuity Contract (Section 32)",
  "Other - Please Specify",
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

type Mode = "view" | "new" | "edit";

type FormState = {
  policyNumber: string;
  schemeName: string;
  amount: string;
  transferType: string;
  cedingRef: string;
  address1: string;
  address2: string;
  address3: string;
  postCode: string;
  telephone: string;
  letterStatus: "" | "Active" | "Suspended";
  optionCase: "" | "Yes" | "No";
};

const INITIAL_FORM: FormState = {
  policyNumber: "233433",
  schemeName: "",
  amount: "",
  transferType: "",
  cedingRef: "",
  address1: "",
  address2: "",
  address3: "",
  postCode: "",
  telephone: "",
  letterStatus: "",
  optionCase: "",
};

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

function FormField({
  value,
  onChange,
  enabled,
  width,
}: {
  value: string;
  onChange: (v: string) => void;
  enabled: boolean;
  width?: string;
}) {
  if (enabled) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`flex h-[44px] items-center rounded-[8px] border-[2px] border-[#178830] bg-white px-[11px] py-[7px] font-['Mulish'] text-[15px] text-[#3d3d3d] outline-none focus:border-[#178830] ${width ?? "w-full"}`}
      />
    );
  }
  return (
    <div
      className={`flex h-[44px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-[11px] py-[7px] font-['Mulish'] text-[15px] text-[#3d3d3d] cursor-not-allowed ${width ?? "w-full"}`}
    >
      {value}
    </div>
  );
}

function Radio({
  label,
  checked,
  enabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  enabled: boolean;
  onChange?: () => void;
}) {
  const color = enabled ? "#006cf4" : "#9a9a9a";
  return (
    <label
      className={`inline-flex items-center gap-2 font-['Mulish'] text-[13px] ${
        enabled ? "cursor-pointer text-[#3d3d3d]" : "cursor-not-allowed text-[#9a9a9a]"
      }`}
      onClick={() => enabled && onChange?.()}
    >
      <span
        className="inline-block w-4 h-4 rounded-full border-[2px] bg-white relative"
        style={{ borderColor: color }}
      >
        {checked && (
          <span
            className="absolute inset-[3px] rounded-full"
            style={{ background: color }}
          />
        )}
      </span>
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
  const [mode, setMode] = useState<Mode>("view");
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [transferOpen, setTransferOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [confirmNewOpen, setConfirmNewOpen] = useState(false);

  if (!open) return null;

  const editable = mode !== "view";

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleNew = () => {
    setConfirmNewOpen(true);
  };

  const confirmNew = () => {
    setForm({ ...INITIAL_FORM, policyNumber: "" });
    setMode("new");
    setConfirmNewOpen(false);
  };

  const handleEdit = () => {
    setMode("edit");
  };

  const handleSave = () => {
    setMode("view");
  };

  const handleClose = () => {
    setMode("view");
    setTransferOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel w-[1024px] max-w-[95vw] bg-white">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Ceding Company Details</span>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-1 border-b border-[#e0e0e0] pb-2">
            <ToolBtn
              icon={<MdInsertDriveFile size={20} />}
              label="New"
              disabled={editable}
              onClick={handleNew}
            />
            <ToolBtn
              icon={<MdEdit size={20} />}
              label="Edit"
              disabled={editable}
              onClick={handleEdit}
            />
            <ToolBtn
              icon={<MdSave size={20} />}
              label="Save"
              disabled={!editable}
              onClick={handleSave}
            />
            <ToolBtn
              icon={<MdCheck size={20} className="text-[#178830]" />}
              label="Ok"
              onClick={handleClose}
            />
          </div>

          {/* Two-column form */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {/* Left column */}
            <div className="space-y-3">
              <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <Label>Policy Number</Label>
                <FormField
                  value={form.policyNumber}
                  onChange={(v) => upd("policyNumber", v)}
                  enabled={editable}
                  width="w-[180px]"
                />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <Label>Scheme Name</Label>
                <FormField
                  value={form.schemeName}
                  onChange={(v) => upd("schemeName", v)}
                  enabled={editable}
                />
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-3">
                <Label>Amount</Label>
                <FormField
                  value={form.amount}
                  onChange={(v) => upd("amount", v)}
                  enabled={editable}
                  width="w-[180px]"
                />
              </div>
              <div className="space-y-2 pt-1">
                <Label>Transfer-Type of Ceding Scheme</Label>
                <div className="relative">
                  <button
                    type="button"
                    disabled={!editable}
                    className={`w-full flex items-center justify-between text-left h-[44px] rounded-[8px] border-[2px] px-[11px] py-[7px] font-['Mulish'] text-[15px] ${
                      editable
                        ? "border-[#178830] bg-white text-[#3d3d3d]"
                        : "border-[#ACACAC] bg-[#CCCCCC] text-[#3d3d3d] cursor-not-allowed"
                    }`}
                    onClick={() => editable && setTransferOpen((v) => !v)}
                  >
                    <span className={form.transferType ? "" : "text-transparent"}>
                      {form.transferType || "."}
                    </span>
                    <MdArrowDropDown size={20} className="text-[#555]" />
                  </button>
                  {transferOpen && editable && (
                    <ul className="absolute z-10 left-0 right-0 mt-1 max-h-[180px] overflow-auto bg-white border border-[#bcd] rounded-[8px] shadow-md font-['Mulish'] text-[12px]">
                      {TRANSFER_TYPES.filter((o) => o !== "").map((o) => (
                        <li
                          key={o}
                          className={`px-3 py-1.5 cursor-pointer hover:bg-[#05579B] hover:text-white ${
                            o === form.transferType ? "bg-[#eaf5f8]" : ""
                          }`}
                          onClick={() => {
                            upd("transferType", o);
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
                <FormField
                  value={form.cedingRef}
                  onChange={(v) => upd("cedingRef", v)}
                  enabled={editable}
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Address 1</Label>
                <FormField
                  value={form.address1}
                  onChange={(v) => upd("address1", v)}
                  enabled={editable}
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Address 2</Label>
                <FormField
                  value={form.address2}
                  onChange={(v) => upd("address2", v)}
                  enabled={editable}
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Address 3</Label>
                <FormField
                  value={form.address3}
                  onChange={(v) => upd("address3", v)}
                  enabled={editable}
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Post Code</Label>
                <FormField
                  value={form.postCode}
                  onChange={(v) => upd("postCode", v)}
                  enabled={editable}
                  width="w-[180px]"
                />
              </div>
              <div className="grid grid-cols-[180px_1fr] items-center gap-3">
                <Label>Telephone</Label>
                <FormField
                  value={form.telephone}
                  onChange={(v) => upd("telephone", v)}
                  enabled={editable}
                />
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
                <Radio
                  label="Active"
                  checked={form.letterStatus === "Active"}
                  enabled={editable}
                  onChange={() => upd("letterStatus", "Active")}
                />
                <Radio
                  label="Suspended"
                  checked={form.letterStatus === "Suspended"}
                  enabled={editable}
                  onChange={() => upd("letterStatus", "Suspended")}
                />
              </div>
            </fieldset>
            <div className="flex items-center gap-6 justify-end pr-2">
              <Label>Option Case?</Label>
              <Radio
                label="Yes"
                checked={form.optionCase === "Yes"}
                enabled={editable}
                onChange={() => upd("optionCase", "Yes")}
              />
              <Radio
                label="No"
                checked={form.optionCase === "No"}
                enabled={editable}
                onChange={() => upd("optionCase", "No")}
              />
            </div>
          </div>

          {/* Cheques data grid */}
          <div className="overflow-auto max-h-[260px]">
            <table className="lve-grid">
              <thead>
                <tr>
                  <th className="!px-4 whitespace-nowrap w-[110px] text-right">
                    Cheque No
                  </th>
                  <th className="!px-4 whitespace-nowrap w-[140px] text-right">
                    Amount
                  </th>
                  <th className="!px-4">Ceding Scheme</th>
                  <th className="!px-4 w-[220px]">Scheme Ref</th>
                </tr>
              </thead>
              <tbody>
                {CHEQUES.map((c, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedRow(i)}
                    className="cursor-pointer"
                    style={
                      selectedRow === i
                        ? { background: "#05579B", color: "#ffffff" }
                        : undefined
                    }
                  >
                    <td className="!px-4 text-right">{c.chequeNo}</td>
                    <td className="!px-4 text-right">
                      {c.amount.toLocaleString("en-GB")}
                    </td>
                    <td className="!px-4">{c.scheme}</td>
                    <td className="!px-4">{c.schemeRef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {confirmNewOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="lve-panel w-[360px] bg-white">
            <header className="lve-panel-header">Confirm</header>
            <div className="lve-panel-body">
              <div className="flex items-start gap-3">
                <MdHelpOutline size={32} className="text-[#006cf4] shrink-0" />
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                  Insert a new record?
                </p>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button type="button" className="lve-btn" onClick={confirmNew}>
                  <MdCheck size={16} />
                  Yes
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => setConfirmNewOpen(false)}
                >
                  <MdClose size={16} />
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
