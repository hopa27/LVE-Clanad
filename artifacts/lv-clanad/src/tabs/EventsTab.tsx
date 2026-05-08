import { Section } from "../components/Field";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

const EVENT_COLS = ["Date of Event", "Event No", "Gross Amount", "Tax Amount", "Event Type"];

export function EventsTab() {
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
        <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
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
    </Section>
  );
}
