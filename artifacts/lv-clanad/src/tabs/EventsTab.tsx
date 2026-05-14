import { useState } from "react";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdCheck,
  MdClose,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { Section, Field } from "../components/Field";
import { DatePicker } from "../components/DatePicker";

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

type FormState = {
  type: string;
  date: Date | undefined;
  no: string;
  gross: string;
  tax: string;
};

const emptyForm: FormState = { type: "", date: undefined, no: "", gross: "", tax: "" };

export function EventsTab() {
  const [rows, setRows] = useState<EventRow[]>([]);
  const [newEventOpen, setNewEventOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const openModal = () => {
    setForm(emptyForm);
    setNewEventOpen(true);
  };

  const handleOk = () => {
    setRows((prev) => [
      ...prev,
      {
        date: fmt(form.date),
        no: form.no,
        gross: form.gross,
        tax: form.tax,
        type: form.type,
      },
    ]);
    setNewEventOpen(false);
  };

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
              rows.map((r, i) => (
                <tr key={i}>
                  <td className="!px-4">{r.date}</td>
                  <td className="!px-4">{r.no}</td>
                  <td className="!px-4">{r.gross}</td>
                  <td className="!px-4">{r.tax}</td>
                  <td className="!px-4">{r.type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm"
          onClick={openModal}
        >
          <MdAdd size={16} /> New Event
        </button>
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm"
          disabled
        >
          <MdEdit size={16} /> Edit Event
        </button>
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm"
          disabled
        >
          <MdDelete size={16} /> Delete Event
        </button>
      </div>

      {newEventOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[520px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>New Event</span>
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
    </Section>
  );
}
