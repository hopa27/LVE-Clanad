import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";
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

type PostCodeLookupEntry = {
  scheme: string;
  address1: string;
  address2: string;
  address3: string;
  postCode: string;
  telephone: string;
};

const POSTCODE_LOOKUP: Record<string, PostCodeLookupEntry> = {
  "SG52DX": {
    scheme: "NM Pensions Trustees Ltd",
    address1: "Keynes House",
    address2: "Tilehouse Street",
    address3: "Hitchin, Herts",
    postCode: "SG5 2DX",
    telephone: "01462 456789",
  },
  "SW1A1AA": {
    scheme: "Buckingham Pensions Trust",
    address1: "10 Downing Street",
    address2: "Westminster",
    address3: "London",
    postCode: "SW1A 1AA",
    telephone: "020 7946 0011",
  },
  "S12HE": {
    scheme: "Sheffield Pension Scheme",
    address1: "1 Fitzalan Square",
    address2: "City Centre",
    address3: "Sheffield",
    postCode: "S1 2HE",
    telephone: "0114 496 0022",
  },
  "SN11AB": {
    scheme: "Swindon Retirement Fund",
    address1: "25 Regent Street",
    address2: "Old Town",
    address3: "Swindon",
    postCode: "SN1 1AB",
    telephone: "01793 496033",
  },
  "SL12AB": {
    scheme: "Slough Pension Trustees",
    address1: "5 High Street",
    address2: "Town Centre",
    address3: "Slough",
    postCode: "SL1 2AB",
    telephone: "01753 496044",
  },
};

function normalizePostcode(v: string): string {
  return v.replace(/\s+/g, "").toUpperCase();
}

type ChequeRow = {
  chequeNo: number;
  amount: number;
  scheme: string;
  schemeRef: string;
  address1: string;
  address2: string;
  address3: string;
  postcode: string;
  letterStatus: string;
  telephone: string;
};

const CHEQUES_DEFAULT: ChequeRow[] = [
  {
    chequeNo: 1,
    amount: 10000,
    scheme: "NMPTL",
    schemeRef: "",
    address1: "NM Pensions Trustees Ltd",
    address2: "Keynes House",
    address3: "Tilehouse Street",
    postcode: "SG5 2DX",
    letterStatus: "",
    telephone: "",
  },
];

const CHEQUES_90: ChequeRow[] = [
  {
    chequeNo: 1,
    amount: 3021.57,
    scheme: "LV= Retirement Solutions",
    schemeRef: "999999",
    address1: "Pease House",
    address2: "Tilehouse Street",
    address3: "Hitchin, Herts",
    postcode: "SG5 2DX",
    letterStatus: "Y",
    telephone: "",
  },
];

const CHEQUES_84: ChequeRow[] = [
  {
    chequeNo: 1,
    amount: 23722.24,
    scheme: "Friends Provident",
    schemeRef: "Z99999/9999",
    address1: "PO Box 1550",
    address2: "Milford",
    address3: "Salisbury, Wiltshire",
    postcode: "SP1 2TW",
    letterStatus: "Active",
    telephone: "",
  },
  {
    chequeNo: 2,
    amount: 3032.91,
    scheme: "AXA",
    schemeRef: "ZZ99999999",
    address1: "",
    address2: "",
    address3: "",
    postcode: "",
    letterStatus: "",
    telephone: "",
  },
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

function initialForm(planCode: string): FormState {
  if (planCode === "90") {
    return {
      policyNumber: "227813",
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
  }
  if (planCode === "84") {
    return {
      policyNumber: "111834",
      schemeName: "Friends Provident",
      amount: "23722.24",
      transferType: "",
      cedingRef: "Z99999/9999",
      address1: "PO Box 1550",
      address2: "Milford",
      address3: "Salisbury, Wiltshire",
      postCode: "SP1 2TW",
      telephone: "",
      letterStatus: "Active",
      optionCase: "No",
    };
  }
  return {
    policyNumber: planCode === "87" ? "233451" : "233433",
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
}

function chequesFor(planCode: string): ChequeRow[] {
  if (planCode === "90") return CHEQUES_90;
  if (planCode === "84") return CHEQUES_84;
  return CHEQUES_DEFAULT;
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
  planCode = "0",
}: {
  open: boolean;
  onClose: () => void;
  planCode?: string;
}) {
  const CHEQUES = chequesFor(planCode);
  const [mode, setMode] = useState<Mode>("view");
  const [form, setForm] = useState<FormState>(() => initialForm(planCode));
  const [transferOpen, setTransferOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [postCodeSearch, setPostCodeSearch] = useState("");
  const [postCodeSuggestOpen, setPostCodeSuggestOpen] = useState(false);
  const [postCodeDropdownRect, setPostCodeDropdownRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const [confirmNewOpen, setConfirmNewOpen] = useState(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const postCodeInputRef = useRef<HTMLInputElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);

  if (!open) return null;

  const editable = mode !== "view";
  const filteredCheques =
    mode === "new"
      ? []
      : postCodeSearch.trim()
        ? CHEQUES.filter((c) =>
            c.postcode.toLowerCase().includes(postCodeSearch.trim().toLowerCase())
          )
        : CHEQUES;

  const upd = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const applyPostCodeMatch = (match: PostCodeLookupEntry) => {
    setForm((f) => ({
      ...f,
      schemeName: match.scheme,
      address1: match.address1,
      address2: match.address2,
      address3: match.address3,
      postCode: match.postCode,
      telephone: match.telephone,
    }));
  };

  const postCodeSuggestions =
    mode === "new" && postCodeSearch.trim()
      ? Object.values(POSTCODE_LOOKUP).filter((entry) =>
          normalizePostcode(entry.postCode).startsWith(normalizePostcode(postCodeSearch))
        )
      : [];

  const updatePostCodeDropdownRect = () => {
    const el = postCodeInputRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPostCodeDropdownRect({ top: r.bottom + 4, left: r.left, width: Math.max(r.width, 260) });
  };

  const handlePostCodeSearchChange = (v: string) => {
    setPostCodeSearch(v);
    setPostCodeSuggestOpen(true);
    updatePostCodeDropdownRect();
    if (mode === "new") {
      const match = POSTCODE_LOOKUP[normalizePostcode(v)];
      if (match) {
        applyPostCodeMatch(match);
      }
    }
  };

  const handlePostCodeSuggestionSelect = (match: PostCodeLookupEntry) => {
    setPostCodeSearch(match.postCode);
    applyPostCodeMatch(match);
    setPostCodeSuggestOpen(false);
  };

  const handleNew = () => {
    setConfirmNewOpen(true);
  };

  const confirmNew = () => {
    setForm({ ...initialForm(planCode), policyNumber: "" });
    setMode("new");
    setConfirmNewOpen(false);
  };

  const handleEdit = () => {
    setConfirmEditOpen(true);
  };

  const confirmEdit = () => {
    const row = CHEQUES[selectedRow];
    if (row) {
      setForm((f) => ({
        ...f,
        schemeName: row.scheme,
        cedingRef: row.schemeRef,
        amount: row.amount.toLocaleString("en-GB"),
        address1: row.address1,
        address2: row.address2,
        address3: row.address3,
        postCode: row.postcode,
        telephone: row.telephone,
        letterStatus:
          row.letterStatus === "Active" || row.letterStatus === "Suspended"
            ? row.letterStatus
            : f.letterStatus,
      }));
    }
    setMode("edit");
    setConfirmEditOpen(false);
  };

  const handleCancel = () => {
    setConfirmCancelOpen(true);
  };

  const doCancel = () => {
    setForm(initialForm(planCode));
    setPostCodeSearch("");
    setMode("view");
    setConfirmCancelOpen(false);
  };

  const handleSave = () => {
    setPostCodeSearch("");
    setMode("view");
  };

  const handleClose = () => {
    setMode("view");
    setTransferOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby="ceding-scheme-title" className="lve-panel w-[1024px] max-w-[95vw] bg-white">
        <header className="lve-panel-header flex items-center justify-between">
          <span id="ceding-scheme-title">Ceding Company Details</span>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body space-y-4">
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b border-[#e0e0e0] pb-3">
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm"
              disabled={editable}
              onClick={handleNew}
            >
              <MdInsertDriveFile size={16} /> New
            </button>
            {editable ? (
              <button
                type="button"
                className="lve-btn lve-btn-secondary lve-btn-sm"
                onClick={handleCancel}
              >
                <MdClose size={16} /> Cancel
              </button>
            ) : (
              <button
                type="button"
                className="lve-btn lve-btn-secondary lve-btn-sm"
                onClick={handleEdit}
              >
                <MdEdit size={16} /> Edit
              </button>
            )}
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm"
              disabled={!editable}
              onClick={handleSave}
            >
              <MdSave size={16} /> Save
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-sm"
              disabled={editable}
              onClick={handleClose}
            >
              <MdCheck size={16} /> Ok
            </button>
            {editable && (
              <div className="ml-auto flex items-center gap-2">
                <label className="font-['Mulish'] text-[13px] text-[#3d3d3d] whitespace-nowrap">
                  Post Code Search:
                </label>
                <div className="relative">
                  <input
                    ref={postCodeInputRef}
                    type="text"
                    value={postCodeSearch}
                    onChange={(e) => handlePostCodeSearchChange(e.target.value)}
                    onFocus={() => {
                      updatePostCodeDropdownRect();
                      setPostCodeSuggestOpen(true);
                    }}
                    onBlur={() => setTimeout(() => setPostCodeSuggestOpen(false), 150)}
                    placeholder="e.g. SG5 2DX"
                    className="lve-input w-[140px]"
                  />
                  {postCodeSuggestOpen &&
                    postCodeSuggestions.length > 0 &&
                    postCodeDropdownRect &&
                    createPortal(
                      <ul
                        style={{
                          position: "fixed",
                          top: postCodeDropdownRect.top,
                          left: postCodeDropdownRect.left,
                          width: postCodeDropdownRect.width,
                        }}
                        className="z-[80] max-h-[220px] overflow-auto bg-white border border-[#bcd] rounded-[8px] shadow-md font-['Mulish'] text-[12px]"
                      >
                        {postCodeSuggestions.map((entry) => (
                          <li
                            key={entry.postCode}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handlePostCodeSuggestionSelect(entry);
                            }}
                            className="px-3 py-1.5 cursor-pointer hover:bg-[#05579B] hover:text-white"
                          >
                            <div className="font-semibold">{entry.postCode}</div>
                            <div className="text-[11px] opacity-80 truncate">{entry.scheme}</div>
                          </li>
                        ))}
                      </ul>,
                      document.body
                    )}
                </div>
              </div>
            )}
          </div>

          {/* Unified two-column form — labels and fields aligned across both columns */}
          <div className="grid grid-cols-[150px_minmax(0,1fr)_200px_minmax(0,1fr)] items-center gap-x-4 gap-y-3">
            {/* Row 1 */}
            <Label>Policy Number</Label>
            <FormField
              value={form.policyNumber}
              onChange={(v) => upd("policyNumber", v)}
              enabled={editable}
            />
            <Label>Ceding Scheme Policy Ref</Label>
            <FormField
              value={form.cedingRef}
              onChange={(v) => upd("cedingRef", v)}
              enabled={editable}
            />

            {/* Row 2 */}
            <Label>Scheme Name</Label>
            <FormField
              value={form.schemeName}
              onChange={(v) => upd("schemeName", v)}
              enabled={editable}
            />
            <Label>Address 1</Label>
            <FormField
              value={form.address1}
              onChange={(v) => upd("address1", v)}
              enabled={editable}
            />

            {/* Row 3 */}
            <Label>Amount</Label>
            <FormField
              value={form.amount}
              onChange={(v) => upd("amount", v)}
              enabled={editable}
            />
            <Label>Address 2</Label>
            <FormField
              value={form.address2}
              onChange={(v) => upd("address2", v)}
              enabled={editable}
            />

            {/* Row 4 — transfer type spans 2 cols on left, address 3 on right */}
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
                <span className={`truncate ${form.transferType ? "" : "text-transparent"}`}>
                  {form.transferType || "."}
                </span>
                <MdArrowDropDown size={20} className="text-[#555] shrink-0" />
              </button>
              {transferOpen && editable && (
                <ul className="absolute z-10 left-0 right-0 mt-1 max-h-[220px] overflow-auto bg-white border border-[#bcd] rounded-[8px] shadow-md font-['Mulish'] text-[12px]">
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
            <Label>Address 3</Label>
            <FormField
              value={form.address3}
              onChange={(v) => upd("address3", v)}
              enabled={editable}
            />

            {/* Row 5 — empty under transfer-type, post code on right */}
            <div />
            <div />
            <Label>Post Code</Label>
            <FormField
              value={form.postCode}
              onChange={(v) => upd("postCode", v)}
              enabled={editable}
            />

            {/* Row 6 — telephone on right */}
            <div />
            <div />
            <Label>Telephone</Label>
            <FormField
              value={form.telephone}
              onChange={(v) => upd("telephone", v)}
              enabled={editable}
            />
          </div>

          {/* Status row */}
          <div className="grid grid-cols-[150px_minmax(0,1fr)_200px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 pt-1">
            <div className="col-span-2">
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
            </div>
            <Label>Option Case?</Label>
            <div className="flex items-center gap-6">
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
            <table className="lve-grid w-full">
              <thead>
                <tr>
                  <th className="!px-4 whitespace-nowrap w-[90px] text-right">Cheque No</th>
                  <th className="!px-4 whitespace-nowrap w-[110px] text-right">Amount</th>
                  <th className="!px-4 whitespace-nowrap w-[140px]">Ceding Scheme</th>
                  <th className="!px-4 whitespace-nowrap w-[140px]">Scheme Ref</th>
                  <th className="!px-4 whitespace-nowrap w-[200px]">Address 1</th>
                  <th className="!px-4 whitespace-nowrap w-[160px]">Address 2</th>
                  <th className="!px-4 whitespace-nowrap w-[160px]">Address 3</th>
                  <th className="!px-4 whitespace-nowrap w-[100px]">Postcode</th>
                  <th className="!px-4 whitespace-nowrap w-[110px]">Letter Status</th>
                  <th className="!px-4 whitespace-nowrap w-[140px]">Telephone</th>
                </tr>
              </thead>
              <tbody>
                {filteredCheques.map((c, i) => {
                  const sel = selectedRow === i;
                  const tdStyle = sel
                    ? { background: "#05579B", color: "#ffffff" }
                    : undefined;
                  return (
                    <tr
                      key={i}
                      onClick={() => setSelectedRow(i)}
                      className="cursor-pointer"
                    >
                      <td className="!px-4 text-right whitespace-nowrap" style={tdStyle}>
                        {c.chequeNo}
                      </td>
                      <td className="!px-4 text-right whitespace-nowrap" style={tdStyle}>
                        {c.amount.toLocaleString("en-GB")}
                      </td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.scheme}</td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.schemeRef}</td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.address1}</td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.address2}</td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.address3}</td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.postcode}</td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.letterStatus}</td>
                      <td className="!px-4 whitespace-nowrap" style={tdStyle}>{c.telephone}</td>
                    </tr>
                  );
                })}
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

      {confirmCancelOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="lve-panel w-[400px] bg-white">
            <header className="lve-panel-header">Confirm</header>
            <div className="lve-panel-body">
              <div className="flex items-start gap-3">
                <MdHelpOutline size={32} className="text-[#006cf4] shrink-0" />
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                  Changes made, if any, will not be saved. Are you sure?
                </p>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button type="button" className="lve-btn" onClick={doCancel}>
                  <MdCheck size={16} /> Yes
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => setConfirmCancelOpen(false)}
                >
                  <MdClose size={16} /> No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmEditOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="lve-panel w-[400px] bg-white">
            <header className="lve-panel-header">Confirm</header>
            <div className="lve-panel-body">
              <div className="flex items-start gap-3">
                <MdHelpOutline size={32} className="text-[#006cf4] shrink-0" />
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                  Have you selected the correct scheme?
                </p>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button type="button" className="lve-btn" onClick={confirmEdit}>
                  <MdCheck size={16} />
                  <span><u>Y</u>es</span>
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => setConfirmEditOpen(false)}
                >
                  <MdClose size={16} />
                  <span><u>N</u>o</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
