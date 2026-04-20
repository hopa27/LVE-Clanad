import { Section } from "../components/Field";
import { Plus, Pencil, Trash2 } from "lucide-react";

export function EventsTab() {
  return (
    <Section title="Event Details">
      <div className="overflow-auto border border-[color:var(--color-panel-border)] rounded-md">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date of Event</th>
              <th>Event No</th>
              <th>Gross Amount</th>
              <th>Tax Amount</th>
              <th>Event Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center py-12 text-[color:var(--color-text-muted)] italic">
                No events recorded for this policy.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button type="button" className="btn"><Plus size={14} /> New Event</button>
        <button type="button" className="btn" disabled><Pencil size={14} /> Edit Event</button>
        <button type="button" className="btn" disabled><Trash2 size={14} /> Delete Event</button>
      </div>
    </Section>
  );
}
