import { useRef, useState } from "react";
import {
  MdClose,
  MdAddCircle,
  MdCancel,
  MdPublish,
  MdDelete,
  MdLightbulb,
  MdFolderOpen,
  MdSearch,
  MdCloudDownload,
} from "react-icons/md";
import { useCheques, type Cheque } from "../context/ChequesContext";
import { CompanySelectionModal } from "./CompanySelectionModal";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

const CHEQUE_DB: Record<string, { date: string; amount: string; transferCompany: string }> = {
  "232693": { date: "12/05/2026", amount: "12,450.00", transferCompany: "Liverpool Victoria Friendly Society Limited" },
  "232694": { date: "13/05/2026", amount: "3,200.50", transferCompany: "Aviva Life & Pensions UK Limited" },
  "232695": { date: "14/05/2026", amount: "8,775.00", transferCompany: "Legal & General Assurance Society" },
  "232696": { date: "15/05/2026", amount: "5,120.75", transferCompany: "Prudential Assurance Company Limited" },
  "232697": { date: "15/05/2026", amount: "9,980.00", transferCompany: "Standard Life Assurance Limited" },
};

export function ChequeLoggerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cheques, addCheque, markChequeDeleted } = useCheques();
  const [selected, setSelected] = useState(0);
  const [findValue, setFindValue] = useState("");
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Cheque>({
    chequeNo: "",
    transferCompany: "",
    amount: "",
    loggedBy: "JSMITH",
    date: "",
  });
  const [info, setInfo] = useState<string | null>(null);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Cheque | null>(null);
  const [companyName, setCompanyName] = useState(
    "Liverpool Victoria Friendly Society Limited",
  );
  const [posted, setPosted] = useState<{ date: string; amount: string; transferCompany: string }>({
    date: "",
    amount: "",
    transferCompany: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const rec = cheques[selected] ?? cheques[0]!;

  const startNew = () => {
    const today = new Date().toLocaleDateString("en-GB");
    const lastNo = parseInt(cheques[cheques.length - 1]?.chequeNo ?? "232695", 10);
    setDraft({
      chequeNo: String(lastNo + 1),
      transferCompany: "",
      amount: "",
      loggedBy: "JSMITH",
      date: today,
    });
    setCreating(true);
    setPosted({ date: "", amount: "", transferCompany: "" });
  };

  const cancelNew = () => {
    setCreating(false);
    setPosted({ date: "", amount: "", transferCompany: "" });
  };

  const postCheque = () => {
    const no = draft.chequeNo.trim();
    if (!no) {
      setInfo("Please enter a Cheque No before posting.");
      return;
    }
    const hit = CHEQUE_DB[no];
    if (!hit) {
      setInfo(`No cheque found in database for Cheque No ${no}.`);
      setPosted({ date: "", amount: "", transferCompany: "" });
      return;
    }
    if (cheques.some((c) => c.chequeNo === no)) {
      setInfo(`Cheque No ${no} has already been logged.`);
      return;
    }
    setPosted(hit);
    const newCheque: Cheque = { chequeNo: no, loggedBy: "JSMITH", ...hit };
    setDraft((d) => ({ ...d, ...hit }));
    addCheque(newCheque);
    setSelected(cheques.length);
    setCreating(false);
  };

  const saveNew = () => {
    if (!draft.chequeNo.trim()) {
      setInfo("Please enter a Cheque No.");
      return;
    }
    addCheque(draft);
    setSelected(cheques.length);
    setCreating(false);
    setPosted({ date: "", amount: "", transferCompany: "" });
    setInfo("Cheque added successfully");
  };

  const ToolBtn = ({
    icon: Icon,
    title,
    onClick,
    disabled,
  }: {
    icon: typeof MdAddCircle;
    title: string;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className="lve-btn lve-btn-secondary lve-btn-sm !px-2 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <Icon size={16} />
    </button>
  );

  const HeaderField = ({
    label,
    value,
    width,
  }: {
    label: string;
    value: string;
    width: number;
  }) => (
    <div className="flex flex-col gap-1" style={width ? { width } : undefined}>
      <span className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41]">
        {label}
      </span>
      <div className="h-[28px] rounded-[4px] bg-[#002f5c] px-3 flex items-center font-['Mulish'] text-[13px] text-white">
        {value || "\u00A0"}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} className="lve-panel bg-white w-[1200px] max-w-full max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Cheque Logger</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto flex flex-col gap-4">
          {/* Top action row: cheque no + action icons + company name */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value="225810"
              disabled
              title="Policy No"
              className="lve-input !h-[36px] !text-[14px] !w-[120px]"
            />
            <ToolBtn icon={MdAddCircle} title="Add Cheque" onClick={startNew} disabled={creating} />
            <ToolBtn icon={MdPublish} title="Post Cheque" onClick={postCheque} disabled={!creating} />
            <ToolBtn icon={MdCancel} title="Cancel" onClick={cancelNew} disabled={!creating} />
            <ToolBtn
              icon={MdDelete}
              title="Delete"
              disabled={creating}
              onClick={() => {
                const target = cheques[selected];
                if (target) setConfirmDelete(target);
              }}
            />
            <ToolBtn
              icon={MdLightbulb}
              title="Change Company"
              onClick={() => setCompanyOpen(true)}
            />
            <ToolBtn icon={MdFolderOpen} title="Open" />
            <input
              type="text"
              value={companyName}
              disabled
              className="lve-input !h-[36px] !text-[14px] flex-1"
            />
          </div>

          {/* Header fields row */}
          <div className="flex items-end gap-3">
            <div className="flex flex-col gap-1" style={{ width: 120 }}>
              <span className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41]">
                Cheque No
              </span>
              <input
                type="text"
                value={creating ? draft.chequeNo : ""}
                onChange={(e) =>
                  creating && setDraft({ ...draft, chequeNo: e.target.value })
                }
                readOnly={!creating}
                className="lve-input !h-[36px] !text-[14px]"
              />
            </div>
            <div className="flex flex-col gap-1" style={{ width: 120 }}>
              <span className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41]">
                Date
              </span>
              <input
                type="text"
                value={posted.date}
                disabled
                className="lve-input !h-[36px] !text-[14px]"
              />
            </div>
            <div className="flex flex-col gap-1" style={{ width: 140 }}>
              <span className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41]">
                Amount
              </span>
              <input
                type="text"
                value={posted.amount}
                disabled
                className="lve-input !h-[36px] !text-[14px] text-right"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <span className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41]">
                Transfer Company
              </span>
              <input
                type="text"
                value={posted.transferCompany}
                disabled
                className="lve-input !h-[36px] !text-[14px]"
              />
            </div>
          </div>

          {/* Data grid */}
          <div className="overflow-auto">
            <table className="lve-grid w-full text-[12px] [&_td]:whitespace-nowrap [&_td]:!px-2 [&_th]:whitespace-nowrap [&_th]:!px-2">
              <thead>
                <tr>
                  <th style={{ width: 80 }}>CHEQNO</th>
                  <th>TRANSFERCOMPANY</th>
                  <th style={{ width: 90, textAlign: "right" }}>AMOUNT</th>
                  <th style={{ width: 85 }}>LOGGEDBY</th>
                  <th style={{ width: 105 }}>DATELOGGED</th>
                  <th style={{ width: 75 }}>DELETED</th>
                  <th style={{ width: 110 }}>DELETEDDATE</th>
                  <th style={{ width: 90 }}>DELETEDBY</th>
                  <th style={{ width: 80 }}>ASSIGNED</th>
                  <th style={{ width: 110 }}>ASSIGNEDDATE</th>
                  <th style={{ width: 95 }}>ASSIGNEDBY</th>
                </tr>
              </thead>
              <tbody>
                {cheques.map((c, i) => {
                  const isSel = i === selected;
                  const tdStyle = isSel
                    ? { backgroundColor: "#003578", color: "#ffffff" }
                    : undefined;
                  return (
                    <tr
                      key={c.chequeNo}
                      onClick={() => setSelected(i)}
                      style={{ cursor: "pointer" }}
                    >
                      <td style={tdStyle}>{c.chequeNo}</td>
                      <td style={tdStyle}>{c.transferCompany}</td>
                      <td style={{ textAlign: "right", ...(tdStyle ?? {}) }}>{c.amount}</td>
                      <td style={tdStyle}>{c.loggedBy}</td>
                      <td style={tdStyle}>{c.date}</td>
                      <td style={tdStyle}>{c.deleted ?? ""}</td>
                      <td style={tdStyle}>{c.deletedDate ?? ""}</td>
                      <td style={tdStyle}>{c.deletedBy ?? ""}</td>
                      <td style={tdStyle}>{c.assigned ?? ""}</td>
                      <td style={tdStyle}>{c.assignedDate ?? ""}</td>
                      <td style={tdStyle}>{c.assignedBy ?? ""}</td>
                    </tr>
                  );
                })}
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Find row */}
          <div className="flex items-center gap-3 pt-1">
            <input
              type="text"
              value={findValue}
              onChange={(e) => setFindValue(e.target.value)}
              className="lve-input !h-[36px] !text-[14px] !w-[180px]"
            />
            <button
              type="button"
              onClick={() => {
                const idx = cheques.findIndex((c) =>
                  c.chequeNo.toLowerCase().includes(findValue.trim().toLowerCase()),
                );
                if (idx >= 0) setSelected(idx);
              }}
              className="lve-btn lve-btn-secondary lve-btn-sm"
            >
              <MdSearch size={16} />
              <span>Find Cheque</span>
            </button>
          </div>
        </div>
      </div>

      <CompanySelectionModal
        open={companyOpen}
        onClose={() => setCompanyOpen(false)}
        onSelect={(name) => setCompanyName(name)}
      />

      {confirmDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[420px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Information</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
                onClick={() => setConfirmDelete(null)}
                aria-label="Close"
                title="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body flex flex-col gap-5">
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d]">
                Remove this Cheque {confirmDelete.chequeNo} from the Log?
              </p>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    markChequeDeleted(confirmDelete.chequeNo, "UAT1");
                    setConfirmDelete(null);
                  }}
                  className="lve-btn lve-btn-sm min-w-[100px] justify-center"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(null)}
                  className="lve-btn lve-btn-secondary lve-btn-sm min-w-[100px] justify-center"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {info && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[440px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Information</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
                onClick={() => setInfo(null)}
                aria-label="Close"
                title="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body flex flex-col gap-5">
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d]">{info}</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setInfo(null)}
                  className="lve-btn lve-btn-sm min-w-[100px] justify-center"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
