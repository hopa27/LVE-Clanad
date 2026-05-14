import { useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import { Section, Field, TextInput, SelectInput } from "../components/Field";
import { DatePicker } from "../components/DatePicker";

const EVENT_COLS = ["Date of Event", "Event No", "Gross Amount", "Tax Amount", "Event Type"];

export function EventsTab() {
  const [newEventOpen, setNewEventOpen] = useState(false);

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
            <tr>
              <td
                colSpan={5}
                className="!px-4 text-center py-10 font-['Mulish'] text-[12px] italic text-[#777]"
              >
                No events recorded for this policy.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm"
          onClick={() => setNewEventOpen(true)}
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
                <SelectInput value="" options={["", "Reportable", "Taxable"]} />
              </Field>
              <Field inline label="Event Date:">
                <DatePicker placeholder="" />
              </Field>
              <Field inline label="Event No:">
                <TextInput value="" />
              </Field>
              <Field inline label="Gross Amount:">
                <TextInput value="" />
              </Field>
              <Field inline label="Taxable Amount:">
                <TextInput value="" />
              </Field>

              <div className="flex justify-center items-center gap-3 pt-2">
                <button
                  type="button"
                  className="lve-btn lve-btn-sm min-w-[90px] justify-center"
                  onClick={() => setNewEventOpen(false)}
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
