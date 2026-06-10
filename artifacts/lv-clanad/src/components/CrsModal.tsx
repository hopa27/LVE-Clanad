import { useRef, useMemo, useState } from "react";
import {
  MdClose,
  MdFirstPage,
  MdNavigateBefore,
  MdNavigateNext,
  MdLastPage,
  MdNoteAdd,
  MdEdit,
  MdSave,
  MdSearch,
  MdCalculate,
  MdPrint,
  MdLocalOffer,
} from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

type LineItem = {
  id: string;
  refNo: number;
  costCentre: string;
  expenseCode: string;
  itemValue: number;
};

type Requisition = {
  id: string;
  requisitionNo: string;
  date: string;
  requestedBy: string;
  approvedBy: string;
  acctsOnly: "Yes" | "No";
  policyNo: string;
  accountNo: string;
  payableTo: string;
  details: string;
  items: LineItem[];
};

const REQS: Requisition[] = [
  { id: "1", requisitionNo: "181947", date: "", requestedBy: "LOPCXS", approvedBy: "", acctsOnly: "No", policyNo: "117147", accountNo: "62", payableTo: "Dr Moncrieff", details: "Medical Fees Invoice", items: [{ id: "101", refNo: 1, costCentre: "MED", expenseCode: "290", itemValue: 89.0 }] },
  { id: "2", requisitionNo: "181948", date: "09/01/2008", requestedBy: "UATS", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Dr A Attard", details: "Med Fee", items: [{ id: "201", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 90.0 }] },
  { id: "3", requisitionNo: "181949", date: "09/01/2008", requestedBy: "WQU", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Dr Waters & Partners", details: "Med Fee", items: [{ id: "301", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 79.2 }] },
  { id: "4", requisitionNo: "181950", date: "09/01/2008", requestedBy: "LOPCXS", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Dr K Bhatt & Tanna", details: "Med Fee", items: [{ id: "401", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 35.0 }] },
  { id: "5", requisitionNo: "181951", date: "09/01/2008", requestedBy: "UATS", approvedBy: "Amanda Harman", acctsOnly: "Yes", policyNo: "117150", accountNo: "843", payableTo: "Dr J Southgate", details: "Med Fee", items: [{ id: "501", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 79.2 }] },
  { id: "6", requisitionNo: "181952", date: "09/01/2008", requestedBy: "WQU", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Dr Jefferies", details: "Med Fee", items: [{ id: "601", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 79.2 }] },
  { id: "7", requisitionNo: "181953", date: "09/01/2008", requestedBy: "LOPCXS", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Dr H Owen", details: "Med Fee", items: [{ id: "701", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 40.0 }] },
  { id: "8", requisitionNo: "181954", date: "09/01/2008", requestedBy: "UATS", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Dr Crimmins & Partners", details: "Med Fee", items: [{ id: "801", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 34.85 }] },
  { id: "9", requisitionNo: "181955", date: "09/01/2008", requestedBy: "WQU", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Denton Turret Medical Centre", details: "Med Fee", items: [{ id: "901", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 99.4 }] },
  { id: "10", requisitionNo: "181956", date: "09/01/2008", requestedBy: "LOPCXS", approvedBy: "Amanda Harman", acctsOnly: "No", policyNo: "117150", accountNo: "843", payableTo: "Dr R Fry", details: "Med Fee", items: [{ id: "1001", refNo: 1, costCentre: "MED", expenseCode: "300", itemValue: 79.2 }] },
  { id: "11", requisitionNo: "197828", date: "16/12/2025", requestedBy: "UATS", approvedBy: "JULIE SHARP", acctsOnly: "Yes", policyNo: "197810", accountNo: "12345678", payableTo: "Confidential Payee", details: "Confidential Payment", items: [] },
];

const MASK = "***";

function StatusBadge({ status }: { status: "Drawn" | "Processed" | "Draft" }) {
  const styles =
    status === "Drawn"
      ? "bg-[#178830]/10 text-[#178830] border-[#178830]"
      : status === "Processed"
        ? "bg-[#006cf4]/10 text-[#006cf4] border-[#006cf4]"
        : "bg-slate-100 text-slate-600 border-slate-300";
  return (
    <span
      className={`inline-block px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider border ${styles}`}
    >
      {status}
    </span>
  );
}

function ReadOnlyField({ value, className = "" }: { value: string; className?: string }) {
  return (
    <div
      className={`flex h-[44px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-[11px] py-[7px] font-['Mulish'] text-[15px] text-[#3d3d3d] cursor-not-allowed ${className}`}
    >
      {value || "\u00A0"}
    </div>
  );
}

function FieldRow({
  label,
  children,
  errored,
}: {
  label: string;
  children: React.ReactNode;
  errored?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`w-32 text-right font-['Mulish'] font-bold text-[14px] shrink-0 ${
          errored ? "text-[#d72714]" : "text-[#4a4a49]"
        }`}
      >
        {label}:
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function CrsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState<{ title: string; message: string } | null>(null);

  const rec = REQS[index]!;
  const total = useMemo(
    () => rec.items.reduce((sum, it) => sum + it.itemValue, 0),
    [rec],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const isDrawn = rec.requisitionNo === "181947";
  const isProcessed = rec.acctsOnly === "Yes";
  const status: "Drawn" | "Processed" | "Draft" = isDrawn
    ? "Drawn"
    : isProcessed
      ? "Processed"
      : "Draft";

  const editVisuallyDisabled = isProcessed || isDrawn;

  const go = (target: number) => {
    if (editing) return;
    setIndex(Math.max(0, Math.min(REQS.length - 1, target)));
  };

  const handleEdit = () => {
    if (isDrawn) {
      setInfo({
        title: "Error",
        message:
          "You can not edit this cheque rec as it has already been drawn by accounts",
      });
      return;
    }
    if (isProcessed) return;
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    setInfo({ title: "Information", message: "Requisition updated successfully" });
  };

  const handlePrint = () => {
    if (rec.requestedBy === "WQU") {
      setInfo({
        title: "Error",
        message: "Queue Print Error: No User profile exists - please contact IT",
      });
      return;
    }
    setInfo({
      title: "Information",
      message:
        "Your cheque rec has been submitted to the Print Queue and will be printed shortly...",
    });
  };

  const reqDateDisplay = isDrawn ? MASK : rec.date;
  const reqByDisplay = isDrawn ? MASK : rec.requestedBy;
  const approvedDisplay = isDrawn || isProcessed ? MASK : rec.approvedBy;
  const acctsOnlyDisplay = isDrawn ? "No" : rec.acctsOnly;
  const policyDisplay = isProcessed ? MASK : rec.policyNo;
  const payableDisplay = isProcessed ? MASK : rec.payableTo;
  const detailsDisplay = isProcessed ? MASK : rec.details;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby="crs-title" className="lve-panel bg-white w-[1180px] max-w-full max-h-[92vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span id="crs-title">Cheque Requisition System</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto flex flex-col gap-5">
          {/* Toolbar */}
          <div className="flex items-center justify-between bg-white border border-slate-200 rounded-[12px] px-4 py-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={index <= 0 || editing}
                onClick={() => go(0)}
                className="lve-btn lve-btn-secondary lve-btn-sm"
                title="First"
              >
                <MdFirstPage size={18} />
              </button>
              <button
                type="button"
                disabled={index <= 0 || editing}
                onClick={() => go(index - 1)}
                className="lve-btn lve-btn-secondary lve-btn-sm"
                title="Previous"
              >
                <MdNavigateBefore size={18} />
              </button>
              <span className="text-[13px] font-['Mulish'] font-bold text-[#4a4a49] px-2 min-w-[80px] text-center select-none">
                {index + 1} of {REQS.length}
              </span>
              <button
                type="button"
                disabled={index >= REQS.length - 1 || editing}
                onClick={() => go(index + 1)}
                className="lve-btn lve-btn-secondary lve-btn-sm"
                title="Next"
              >
                <MdNavigateNext size={18} />
              </button>
              <button
                type="button"
                disabled={index >= REQS.length - 1 || editing}
                onClick={() => go(REQS.length - 1)}
                className="lve-btn lve-btn-secondary lve-btn-sm"
                title="Last"
              >
                <MdLastPage size={18} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={editing}
                className="lve-btn lve-btn-secondary lve-btn-sm"
              >
                <MdNoteAdd size={16} />
                New
              </button>
              <button
                type="button"
                onClick={editing ? handleSave : handleEdit}
                disabled={editVisuallyDisabled}
                className={`${editing ? "lve-btn" : "lve-btn lve-btn-secondary"} lve-btn-sm`}
              >
                {editing ? <MdSave size={16} /> : <MdEdit size={16} />}
                {editing ? "Save" : "Edit"}
              </button>
              <button
                type="button"
                disabled={editing}
                className="lve-btn lve-btn-secondary lve-btn-sm"
              >
                <MdSearch size={16} />
                Find
              </button>
              <button
                type="button"
                disabled={editing || editVisuallyDisabled}
                className="lve-btn lve-btn-secondary lve-btn-sm"
              >
                <MdCalculate size={16} />
                Accts
              </button>
              <button
                type="button"
                onClick={handlePrint}
                disabled={editing || isProcessed}
                className="lve-btn lve-btn-secondary lve-btn-sm"
              >
                <MdPrint size={16} />
                Print
              </button>
              <button
                type="button"
                disabled={editing || editVisuallyDisabled}
                className="lve-btn lve-btn-secondary lve-btn-sm"
              >
                <MdLocalOffer size={16} />
                Codes
              </button>
            </div>
          </div>

          {/* Requisition Details */}
          <section className="border border-slate-200 rounded-[12px] bg-white">
            <header className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-['Livvic'] font-semibold text-[18px] text-[#0d2c41]">
                Requisition Details
              </h2>
              {editing && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="lve-btn lve-btn-sm"
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="lve-btn lve-btn-secondary lve-btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </header>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
                <FieldRow label="Requisition No">
                  <ReadOnlyField value={rec.requisitionNo} />
                </FieldRow>
                <FieldRow label="Status">
                  <div className="h-[44px] flex items-center">
                    <StatusBadge status={status} />
                  </div>
                </FieldRow>

                <FieldRow label="Req'd on">
                  <ReadOnlyField value={reqDateDisplay} />
                </FieldRow>
                <FieldRow label="Requested By">
                  <ReadOnlyField value={reqByDisplay} />
                </FieldRow>

                <FieldRow label="Accts Only">
                  <ReadOnlyField value={acctsOnlyDisplay} />
                </FieldRow>
                <FieldRow label="Approved By">
                  <ReadOnlyField
                    value={approvedDisplay}
                    className={isProcessed ? "opacity-50" : ""}
                  />
                </FieldRow>

                <FieldRow label="Policy No">
                  {editing ? (
                    <input
                      type="text"
                      defaultValue={rec.policyNo}
                      className="lve-input"
                    />
                  ) : (
                    <ReadOnlyField
                      value={policyDisplay}
                      className={isProcessed ? "opacity-50" : ""}
                    />
                  )}
                </FieldRow>
                <FieldRow label="Account No">
                  {editing ? (
                    <input
                      type="text"
                      defaultValue={rec.accountNo}
                      className="lve-input"
                    />
                  ) : (
                    <ReadOnlyField value={rec.accountNo} />
                  )}
                </FieldRow>
              </div>

              <FieldRow label="Payable To">
                {editing ? (
                  <input
                    type="text"
                    defaultValue={rec.payableTo}
                    className="lve-input"
                  />
                ) : (
                  <ReadOnlyField
                    value={payableDisplay}
                    className={isProcessed ? "opacity-50" : ""}
                  />
                )}
              </FieldRow>

              <FieldRow label="Details">
                {editing ? (
                  <input
                    type="text"
                    defaultValue={rec.details}
                    className="lve-input"
                  />
                ) : (
                  <ReadOnlyField
                    value={detailsDisplay}
                    className={isProcessed ? "opacity-50" : ""}
                  />
                )}
              </FieldRow>

              {/* Line items grid - hidden when processed */}
              {!isProcessed && (
                <div className="pt-2">
                  <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
                    <div className="grid grid-cols-[10%_35%_35%_20%] bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[14px] uppercase text-[#002f5c]">
                      <div className="px-3 py-4">Ref No</div>
                      <div className="px-3 py-4">Cost Centre</div>
                      <div className="px-3 py-4">Expense Code</div>
                      <div className="px-3 py-4 text-right">Item Value (£)</div>
                    </div>
                    <div className="font-['Mulish'] text-[14px] text-[#3d3d3d]">
                      {Array.from({ length: Math.max(3, rec.items.length) }).map(
                        (_, i) => {
                          const it = rec.items[i];
                          return (
                            <div
                              key={i}
                              className={`grid grid-cols-[10%_35%_35%_20%] h-[44px] items-center ${
                                i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"
                              }`}
                            >
                              <div className="px-3">{it ? it.refNo : ""}</div>
                              <div className="px-3">{it ? it.costCentre : ""}</div>
                              <div className="px-3">{it ? it.expenseCode : ""}</div>
                              <div className="px-3 text-right">
                                {it ? `£${it.itemValue.toFixed(2)}` : ""}
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end items-center gap-4 mt-3">
                    <span className="font-['Mulish'] font-bold text-[14px] text-[#4a4a49]">
                      Total Amount
                    </span>
                    <ReadOnlyField
                      value={`£${total.toFixed(2)}`}
                      className="min-w-[160px] justify-end font-bold"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {info && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[480px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>{info.title}</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
                onClick={() => setInfo(null)}
                title="Close"
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body flex flex-col gap-5">
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d]">
                {info.message}
              </p>
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
