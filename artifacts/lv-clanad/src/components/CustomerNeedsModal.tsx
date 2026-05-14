import { useEffect, useRef, useState } from "react";
import { MdCheck, MdClose, MdArrowDropDown, MdDelete } from "react-icons/md";
import { DatePicker } from "./DatePicker";

const NEEDS_OPTIONS = [
  "BI | Break In Call",
  "CA | Check Customer Is Alone",
  "CN | Callback Needed",
  "CS | External Charity Support",
  "DA | Different Address for Posting",
  "EO | Email Contact Only",
  "F1 | Different Font",
  "FS | Family Support",
  "IH | Priority Serious Ill Health",
  "LT | Large Text",
  "NI | No Interrupts",
  "NJ | No Jargon",
  "OT | Other",
  "PA | POA/COP",
  "PB | Payment Break - Protection",
  "PO | Postal Contact Only",
  "PP | Pronoun Preference",
  "PW | Password Protected",
  "QT | Allow Mbr Time for Questions",
  "RK | Repeat Key Information",
  "RS | Speech Clear Raised Dont Sho",
  "SC | Summarise Call In Writing",
  "SL | Slow Conversation Note Taking",
  "SR | Uses Screen Reader",
  "SS | Slow Clear Speech",
  "TS | Uses Text Service",
  "UT | Uses - Interpreter",
  "VO | Verbal Processes Only",
  "PC | 3rd Party Consent",
  "MP | Moon Print",
  "AC | Audio CD",
  "AM | Audio MP3",
  "CP | Coloured Printing",
  "DF | Dyslexic Font",
  "US | Unable to Sign",
  "TR | Translation",
  "AT | Audiotape",
  "BR | Braille",
  "LP | Large Print",
  "SI | Signer",
  "TP | Text Phone",
];

type NeedRow = {
  dateAdded: string;
  description: string;
};

function fmt(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

export function CustomerNeedsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [need, setNeed] = useState("");
  const [dateUpdated, setDateUpdated] = useState<Date | undefined>(undefined);
  const [needOpen, setNeedOpen] = useState(false);
  const [rows, setRows] = useState<NeedRow[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const needRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!needOpen) return;
    const handler = (e: MouseEvent) => {
      if (needRef.current && !needRef.current.contains(e.target as Node)) {
        setNeedOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [needOpen]);

  if (!open) return null;

  const reset = () => {
    setNeed("");
    setDateUpdated(undefined);
    setNeedOpen(false);
    setSelectedIdx(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleAdd = () => {
    if (!need || !dateUpdated) return;
    setRows((prev) => [...prev, { dateAdded: fmt(dateUpdated), description: need }]);
    setNeed("");
    setDateUpdated(undefined);
  };

  const handleDelete = () => {
    if (selectedIdx === null) return;
    setRows((prev) => prev.filter((_, i) => i !== selectedIdx));
    setSelectedIdx(null);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel w-[760px] bg-white">
        <header className="lve-panel-header flex items-center justify-between">
          <span>CustomerNeeds</span>
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
          <div className="flex items-end gap-4">
            <div className="flex items-center gap-2 flex-1">
              <label className="lve-label shrink-0">Customer Needs:</label>
              <div ref={needRef} className="relative flex-1">
                <button
                  type="button"
                  className="lve-input w-full flex items-center justify-between text-left"
                  onClick={() => setNeedOpen((v) => !v)}
                >
                  <span className={need ? "" : "text-transparent"}>
                    {need || "."}
                  </span>
                  <MdArrowDropDown size={20} className="text-[#555]" />
                </button>
                {needOpen && (
                  <ul className="absolute z-10 left-0 right-0 mt-1 max-h-[180px] overflow-auto bg-white border border-[#bcd] rounded-[8px] shadow-md font-['Mulish'] text-[12px]">
                    {NEEDS_OPTIONS.map((o) => (
                      <li
                        key={o}
                        className={`px-3 py-1.5 cursor-pointer hover:bg-[#05579B] hover:text-white ${
                          o === need ? "bg-[#eaf5f8]" : ""
                        }`}
                        onClick={() => {
                          setNeed(o);
                          setNeedOpen(false);
                        }}
                      >
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="lve-label shrink-0">Date Updated:</label>
              <div className="w-[170px]">
                <DatePicker
                  placeholder="Date Updated"
                  onChange={setDateUpdated}
                  disabled={false}
                />
              </div>
            </div>

            <button
              type="button"
              className="lve-btn"
              onClick={handleAdd}
              disabled={!need || !dateUpdated}
            >
              <MdCheck size={16} />
              ADD
            </button>
          </div>

          <div className="border border-[#bcd] rounded-[8px] overflow-hidden">
            <div className="overflow-auto max-h-[260px] bg-[#002f5c]">
              <table className="w-full border-collapse font-['Mulish'] text-[12px]">
                <thead>
                  <tr className="bg-[#d4d4d4] text-[#3d3d3d]">
                    <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[140px]">
                      DATE_ADDED
                    </th>
                    <th className="text-left px-3 py-1.5">
                      CUSTOMER_NEEDS_DESCRIPTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr
                      key={i}
                      onClick={() => setSelectedIdx(i)}
                      className={`cursor-pointer border-b border-[#1a3a5e] ${
                        selectedIdx === i
                          ? "bg-[#006cf4] text-white"
                          : "bg-white text-[#3d3d3d] hover:bg-[#eaf5f8]"
                      }`}
                    >
                      <td className="px-3 py-1.5 whitespace-nowrap">
                        {r.dateAdded}
                      </td>
                      <td className="px-3 py-1.5">{r.description}</td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td colSpan={2} className="h-[220px]" />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              className="lve-btn lve-btn-secondary"
              onClick={handleDelete}
              disabled={selectedIdx === null}
            >
              <MdDelete size={16} />
              DELETE
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary"
              onClick={handleClose}
            >
              <MdClose size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
