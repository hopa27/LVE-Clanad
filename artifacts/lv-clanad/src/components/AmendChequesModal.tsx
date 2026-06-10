import { useEffect, useRef, useState } from "react";
import {
  MdClose,
  MdFirstPage,
  MdChevronLeft,
  MdChevronRight,
  MdLastPage,
  MdUndo,
  MdReplay,
  MdSave,
  MdAssignmentInd,
} from "react-icons/md";
import { useCheques } from "../context/ChequesContext";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

const SEED_CHEQUE_NOS = new Set(["232693", "232694", "232695"]);

export function AmendChequesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cheques, setCheques } = useCheques();
  const amendable = cheques.filter((c) => !SEED_CHEQUE_NOS.has(c.chequeNo));
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);

  const [idx, setIdx] = useState(0);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [transferCo, setTransferCo] = useState("");
  const [info, setInfo] = useState<string | null>(null);

  const current = amendable[idx];

  useEffect(() => {
    if (!open) return;
    if (idx >= amendable.length) setIdx(0);
  }, [open, amendable.length, idx]);

  useEffect(() => {
    if (!open || !current) {
      setDate("");
      setAmount("");
      setTransferCo("");
      return;
    }
    setDate(current.date);
    setAmount(current.amount);
    setTransferCo(current.transferCompany);
  }, [open, current]);

  if (!open) return null;

  const empty = amendable.length === 0;
  const goFirst = () => setIdx(0);
  const goPrev = () => setIdx((i) => Math.max(0, i - 1));
  const goNext = () => setIdx((i) => Math.min(amendable.length - 1, i + 1));
  const goLast = () => setIdx(Math.max(0, amendable.length - 1));

  const save = () => {
    if (!current) return;
    const next = cheques.map((c) =>
      c.chequeNo === current.chequeNo
        ? { ...c, date, amount, transferCompany: transferCo }
        : c,
    );
    setCheques(next);
    setInfo("Cheque amended successfully");
  };

  const reverse = () => {
    if (!current) return;
    const negated = current.amount.startsWith("-")
      ? current.amount.slice(1)
      : `-${current.amount}`;
    setAmount(negated);
    setInfo(`Cheque ${current.chequeNo} marked as reversed.`);
  };

  const refund = () => {
    if (!current) return;
    setInfo(`Refund raised against cheque ${current.chequeNo}.`);
  };

  const assign = () => {
    if (!current) return;
    setInfo(`Cheque ${current.chequeNo} assigned.`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} className="lve-panel bg-white w-[420px] max-w-full">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Amend the cheques</span>
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

        <div className="lve-panel-body flex flex-col gap-4">
          {/* Navigator */}
          <div className="flex items-center justify-center gap-2">
            <NavBtn icon={MdFirstPage} title="First" onClick={goFirst} disabled={empty || idx === 0} />
            <NavBtn icon={MdChevronLeft} title="Previous" onClick={goPrev} disabled={empty || idx === 0} />
            <NavBtn icon={MdChevronRight} title="Next" onClick={goNext} disabled={empty || idx >= amendable.length - 1} />
            <NavBtn icon={MdLastPage} title="Last" onClick={goLast} disabled={empty || idx >= amendable.length - 1} />
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">
            <Row label="Date:">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={empty}
                className="lve-input !h-[36px] !text-[14px] flex-1"
              />
            </Row>
            <Row label="Amount:">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={empty}
                className="lve-input !h-[36px] !text-[14px] flex-1 text-right"
              />
            </Row>
            <Row label="Transfer Co:">
              <input
                type="text"
                value={transferCo}
                onChange={(e) => setTransferCo(e.target.value)}
                disabled={empty}
                className="lve-input !h-[36px] !text-[14px] flex-1"
              />
            </Row>
          </div>

          {empty && (
            <p className="font-['Mulish'] text-[13px] text-[#7a7a7a] text-center">
              No posted cheques available to amend.
            </p>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={reverse}
              disabled={empty}
              className="lve-btn lve-btn-secondary lve-btn-sm justify-center"
            >
              <MdUndo size={16} />
              <span>Reverse</span>
            </button>
            <button
              type="button"
              onClick={refund}
              disabled={empty}
              className="lve-btn lve-btn-secondary lve-btn-sm justify-center"
            >
              <MdReplay size={16} />
              <span>Refund</span>
            </button>
            <button
              type="button"
              onClick={save}
              disabled={empty}
              className="lve-btn lve-btn-sm justify-center"
            >
              <MdSave size={16} />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={assign}
              disabled={empty}
              className="lve-btn lve-btn-secondary lve-btn-sm justify-center"
            >
              <MdAssignmentInd size={16} />
              <span>Assign</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-secondary lve-btn-sm justify-center col-start-3"
            >
              <MdClose size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {info && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[420px] max-w-full">
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

function NavBtn({
  icon: Icon,
  title,
  onClick,
  disabled,
}: {
  icon: typeof MdFirstPage;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
    >
      <Icon size={18} />
    </button>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41] w-[110px] text-right">
        {label}
      </span>
      {children}
    </div>
  );
}
