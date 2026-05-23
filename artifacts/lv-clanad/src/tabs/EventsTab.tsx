import { useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdCheck,
  MdClose,
  MdKeyboardArrowDown,
  MdHelpOutline,
} from "react-icons/md";
import { Section, Field } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { usePlanCode } from "../context/PlanCodeContext";

const EVENT_COLS = ["Date of Event", "Event No", "Gross Amount", "Tax Amount", "Event Type"];

type EventRow = {
  date: string;
  no: string;
  gross: string;
  tax: string;
  type: string;
};

const fmt = (d: Date | undefined) => {
  if (!d) return "";
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
};

const parseDate = (s: string): Date | undefined => {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s);
  if (!m) return undefined;
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
};

type FormState = {
  type: string;
  date: Date | undefined;
  no: string;
  gross: string;
  tax: string;
};

const emptyForm: FormState = { type: "", date: undefined, no: "", gross: "", tax: "" };

const SAMPLE_ROWS: EventRow[] = [
  { date: "12/04/2018", no: "1001", gross: "12,500.00", tax: "2,500.00", type: "Reportable" },
  { date: "06/09/2019", no: "1002", gross: "8,750.00", tax: "1,750.00", type: "Taxable" },
  { date: "21/01/2021", no: "1003", gross: "15,300.00", tax: "3,060.00", type: "Reportable" },
  { date: "30/11/2022", no: "1004", gross: "6,420.00", tax: "1,284.00", type: "Taxable" },
  { date: "14/07/2024", no: "1005", gross: "10,000.00", tax: "2,000.00", type: "Reportable" },
];

export function EventsTab() {
  const { planCode } = usePlanCode();
  const [rows, setRows] = useState<EventRow[]>(planCode === "0" ? [] : SAMPLE_ROWS);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editConfirm, setEditConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const openNew = () => {
    setEditingIdx(null);
    setForm(emptyForm);
    setNewEventOpen(true);
  };

  const askEdit = () => {
    if (selectedIdx === null) return;
    setEditConfirm(true);
  };

  const confirmEdit = () => {
    setEditConfirm(false);
    if (selectedIdx === null) return;
    const r = rows[selectedIdx];
    setEditingIdx(selectedIdx);
    setForm({
      type: r.type,
      date: parseDate(r.date),
      no: r.no,
      gross: r.gross,
      tax: r.tax,
    });
    setNewEventOpen(true);
  };

  const askDelete = () => {
    if (selectedIdx === null) return;
    setDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setDeleteConfirm(false);
    if (selectedIdx === null) return;
    setRows((prev) => prev.filter((_, i) => i !== selectedIdx));
    setSelectedIdx(null);
    setToast("Event deleted successfully!");
    window.setTimeout(() => setToast(null), 2500);
  };

  const selectedNo = selectedIdx !== null ? rows[selectedIdx]?.no ?? "" : "";

  const handleOk = () => {
    const next: EventRow = {
      date: fmt(form.date),
      no: form.no,
      gross: form.gross,
      tax: form.tax,
      type: form.type,
    };
    if (editingIdx !== null) {
      setRows((prev) => prev.map((r, i) => (i === editingIdx ? next : r)));
    } else {
      setRows((prev) => [...prev, next]);
    }
    setNewEventOpen(false);
  };

  const hasSelection = selectedIdx !== null;

  return (
    <Section title="Event Details">
      <div className="overflow-auto">
        <table className="lve-grid">
          <thead>
            <tr>
              {EVENT_COLS.map((c) => (
                <th key={c} className="whitespace-nowrap !px-4">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="!px-4 text-center py-10 font-['Mulish'] text-[12px] italic text-[#777]"
                >
                  No events recorded for this policy.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => {
                const isSel = selectedIdx === i;
                const tdStyle = isSel
                  ? { backgroundColor: "#05579B", color: "#ffffff" }
                  : undefined;
                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedIdx(i)}
                    className="cursor-pointer"
                  >
                    <td className="!px-4" style={tdStyle}>{r.date}</td>
                    <td className="!px-4" style={tdStyle}>{r.no}</td>
                    <td className="!px-4" style={tdStyle}>{r.gross}</td>
                    <td className="!px-4" style={tdStyle}>{r.tax}</td>
                    <td className="!px-4" style={tdStyle}>{r.type}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm"
          onClick={openNew}
        >
          <MdAdd size={16} /> New Event
        </button>
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasSelection}
          onClick={askEdit}
        >
          <MdEdit size={16} /> Edit Event
        </button>
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!hasSelection}
          onClick={askDelete}
        >
          <MdDelete size={16} /> Delete Event
        </button>
      </div>

      {newEventOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[520px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>{editingIdx !== null ? "Edit Event" : "New Event"}</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
                onClick={() => setNewEventOpen(false)}
                title="Close"
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body space-y-4">
              <Field inline label="Event Type:">
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className="lve-input pr-12 appearance-none"
                  >
                    <option value="">—</option>
                    <option value="Reportable">Reportable</option>
                    <option value="Taxable">Taxable</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                    <span className="h-6 w-px bg-[#BBBBBB]" />
                    <span className="px-3 text-[#006cf4]">
                      <MdKeyboardArrowDown size={22} />
                    </span>
                  </div>
                </div>
              </Field>
              <Field inline label="Event Date:">
                <DatePicker
                  value={fmt(form.date)}
                  placeholder=""
                  onChange={(d) => setForm((f) => ({ ...f, date: d }))}
                />
              </Field>
              <Field inline label="Event No:">
                <input
                  type="text"
                  value={form.no}
                  onChange={(e) => setForm((f) => ({ ...f, no: e.target.value }))}
                  className="lve-input"
                />
              </Field>
              <Field inline label="Gross Amount:">
                <input
                  type="text"
                  value={form.gross}
                  onChange={(e) => setForm((f) => ({ ...f, gross: e.target.value }))}
                  className="lve-input"
                />
              </Field>
              <Field inline label="Taxable Amount:">
                <input
                  type="text"
                  value={form.tax}
                  onChange={(e) => setForm((f) => ({ ...f, tax: e.target.value }))}
                  className="lve-input"
                />
              </Field>

              <div className="flex justify-center items-center gap-3 pt-2">
                <button
                  type="button"
                  className="lve-btn lve-btn-sm min-w-[90px] justify-center"
                  onClick={handleOk}
                >
                  <MdCheck size={16} /> OK
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary lve-btn-sm min-w-[90px] justify-center"
                  onClick={() => setNewEventOpen(false)}
                >
                  <MdClose size={16} /> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[400px] max-w-full">
            <header className="lve-panel-header">Confirm</header>
            <div className="lve-panel-body">
              <div className="flex items-start gap-3">
                <span className="text-[#006cf4] mt-0.5"><MdHelpOutline size={28} /></span>
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                  Edit this event?
                </p>
              </div>
              <div className="flex justify-center items-center gap-3 mt-5">
                <button
                  type="button"
                  className="lve-btn lve-btn-sm min-w-[80px] justify-center"
                  onClick={confirmEdit}
                >
                  <u>Y</u>es
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary lve-btn-sm min-w-[80px] justify-center"
                  onClick={() => setEditConfirm(false)}
                >
                  <u>N</u>o
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[440px] max-w-full">
            <header className="lve-panel-header">Confirm</header>
            <div className="lve-panel-body">
              <div className="flex items-start gap-3">
                <span className="text-[#006cf4] mt-0.5"><MdHelpOutline size={28} /></span>
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                  Are you sure you want to delete the Event '{selectedNo}' ?
                </p>
              </div>
              <div className="flex justify-center items-center gap-3 mt-5">
                <button
                  type="button"
                  className="lve-btn lve-btn-sm min-w-[80px] justify-center"
                  onClick={confirmDelete}
                >
                  <u>Y</u>es
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary lve-btn-sm min-w-[80px] justify-center"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[400px] max-w-full">
            <header className="lve-panel-header">Client Annuity Administration System</header>
            <div className="lve-panel-body">
              <p className="text-center font-['Mulish'] text-[14px] text-[#3d3d3d] py-2">
                {toast}
              </p>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="lve-btn lve-btn-sm min-w-[90px] justify-center"
                  onClick={() => setToast(null)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
