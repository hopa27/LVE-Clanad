import { useState } from "react";
import {
  MdClose,
  MdNoteAdd,
  MdEdit,
  MdSave,
  MdDelete,
  MdLightbulbOutline,
  MdFolderOpen,
  MdSearch,
} from "react-icons/md";

type Cheque = {
  chequeNo: string;
  transferCompany: string;
  amount: string;
  loggedBy: string;
  date: string;
};

const INITIAL_CHEQUES: Cheque[] = [
  {
    chequeNo: "232693",
    transferCompany: "Liverpool Victoria Friendly Society Limited",
    amount: "12,450.00",
    loggedBy: "JSMITH",
    date: "12/05/2026",
  },
  {
    chequeNo: "232694",
    transferCompany: "Aviva Life & Pensions UK Limited",
    amount: "3,200.50",
    loggedBy: "AKHAN",
    date: "13/05/2026",
  },
  {
    chequeNo: "232695",
    transferCompany: "Legal & General Assurance Society",
    amount: "8,775.00",
    loggedBy: "RBROWN",
    date: "14/05/2026",
  },
];

export function ChequeLoggerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [cheques, setCheques] = useState<Cheque[]>(INITIAL_CHEQUES);
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

  if (!open) return null;

  const rec = cheques[selected] ?? INITIAL_CHEQUES[0]!;

  const startNew = () => {
    const today = new Date().toLocaleDateString("en-GB");
    setDraft({
      chequeNo: "",
      transferCompany: "",
      amount: "",
      loggedBy: "JSMITH",
      date: today,
    });
    setCreating(true);
  };

  const cancelNew = () => setCreating(false);

  const saveNew = () => {
    if (!draft.chequeNo.trim()) {
      setInfo("Please enter a Cheque No.");
      return;
    }
    const next = [...cheques, draft];
    setCheques(next);
    setSelected(next.length - 1);
    setCreating(false);
    setInfo("Cheque added successfully");
  };

  const ToolBtn = ({
    icon: Icon,
    title,
    onClick,
  }: {
    icon: typeof MdNoteAdd;
    title: string;
    onClick?: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
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
    <div className="flex flex-col gap-1" style={{ width }}>
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
      <div className="lve-panel bg-white w-[920px] max-w-full max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Cheque Logger</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
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
              value={creating ? draft.chequeNo : rec.chequeNo}
              onChange={(e) =>
                creating && setDraft({ ...draft, chequeNo: e.target.value })
              }
              readOnly={!creating}
              placeholder={creating ? "Cheque No" : ""}
              className={`lve-input !h-[36px] !text-[14px] !w-[120px] ${
                creating ? "" : "!bg-[#fafafa]"
              }`}
            />
            <ToolBtn icon={MdNoteAdd} title="New" onClick={startNew} />
            <ToolBtn icon={MdSave} title="Save" onClick={creating ? saveNew : undefined} />
            <ToolBtn icon={MdEdit} title="Edit" />
            <ToolBtn icon={MdDelete} title="Delete" />
            <ToolBtn icon={MdLightbulbOutline} title="Info" />
            <ToolBtn icon={MdFolderOpen} title="Open" />
            <input
              type="text"
              value={creating ? "" : rec.transferCompany}
              readOnly
              className="lve-input !h-[36px] !text-[14px] flex-1 !bg-[#fafafa]"
            />
            <button
              type="button"
              onClick={creating ? cancelNew : onClose}
              title={creating ? "Cancel" : "Exit"}
              className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
            >
              <MdClose size={16} />
            </button>
          </div>

          {/* Header fields row */}
          <div className="flex gap-3">
            <HeaderField label="Cheque No" value={rec.chequeNo} width={120} />
            <HeaderField label="Date" value={rec.date} width={120} />
            <HeaderField label="Amount" value={rec.amount} width={140} />
            <HeaderField label="Transfer Company" value={rec.transferCompany} width={420} />
          </div>

          {/* Data grid */}
          <div className="border border-[#BBBBBB] rounded-[4px] overflow-hidden">
            <table className="w-full text-[13px] font-['Mulish']">
              <thead>
                <tr className="bg-[#002f5c] text-white text-left">
                  <th className="px-3 py-2 font-semibold w-[120px]">CHEQNO</th>
                  <th className="px-3 py-2 font-semibold">TRANSFERCOMPANY</th>
                  <th className="px-3 py-2 font-semibold w-[120px] text-right">AMOUNT</th>
                  <th className="px-3 py-2 font-semibold w-[120px]">LOGGEDBY</th>
                </tr>
              </thead>
              <tbody className="text-[#3d3d3d]">
                {cheques.map((c, i) => {
                  const isSel = i === selected;
                  return (
                    <tr
                      key={c.chequeNo}
                      onClick={() => setSelected(i)}
                      className={`cursor-pointer ${
                        isSel
                          ? "bg-[#002f5c] text-white"
                          : i % 2
                          ? "bg-[#f7f7f7]"
                          : "bg-white"
                      }`}
                    >
                      <td className="px-3 py-2 border-b border-[#e5e5e5]">{c.chequeNo}</td>
                      <td className="px-3 py-2 border-b border-[#e5e5e5]">{c.transferCompany}</td>
                      <td className="px-3 py-2 border-b border-[#e5e5e5] text-right">{c.amount}</td>
                      <td className="px-3 py-2 border-b border-[#e5e5e5]">{c.loggedBy}</td>
                    </tr>
                  );
                })}
                {Array.from({ length: 6 }).map((_, i) => (
                  <tr key={`empty-${i}`} className={i % 2 ? "bg-[#f7f7f7]" : "bg-white"}>
                    <td className="px-3 py-2 border-b border-[#e5e5e5]">&nbsp;</td>
                    <td className="px-3 py-2 border-b border-[#e5e5e5]"></td>
                    <td className="px-3 py-2 border-b border-[#e5e5e5]"></td>
                    <td className="px-3 py-2 border-b border-[#e5e5e5]"></td>
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

      {info && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[440px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>Information</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
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
