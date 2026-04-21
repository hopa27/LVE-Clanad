import { Field, TextInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdEdit } from "react-icons/md";

const TRANSFERS = [
  { company: "PRUDENTIAL", ref: "225810", date: "25/04/2025", amount: "32,760.42" },
  { company: "TFC", ref: "", date: "02/05/2025", amount: "-8,190.10" },
  { company: "TLS", ref: "", date: "02/05/2025", amount: "-9,570.32" },
];

export function BankAccDetailsTab() {
  return (
    <div className="space-y-4">
      <Section
        title="Bank Details"
        headerAction={
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdEdit size={16} /> Edit Bank Details
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          <div>
            <Field inline label="Bank sort code:"><TextInput value="30-15-52" /></Field>
            <Field inline label="Bank account no:"><TextInput value="01841281" /></Field>
            <Field inline label="Bank account name:"><TextInput value="Mrs Linda Turner" /></Field>
            <Field inline label="Bank name:"><TextInput value="LLOYDS BANK PLC, WIRRAL" /></Field>
          </div>
          <div>
            <Field inline label="Payment Ref:"><TextInput value="225810" /></Field>
            <Field inline label="Payment Method:"><TextInput value="B" /></Field>
            <Field inline label="Change Effective Date:"><DatePicker placeholder="Change Effective Date" /></Field>
            <Field inline label="TOTAL:"><TextInput value="£15,000.00" disabled /></Field>
          </div>
        </div>
      </Section>

      <Section title="Transfers In">
        <div className="overflow-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transfer Company</th>
                <th>Ref</th>
                <th>Date</th>
                <th className="text-right">Amount (£)</th>
              </tr>
            </thead>
            <tbody>
              {TRANSFERS.map((t, i) => (
                <tr key={i} className={i === 0 ? "selected" : ""}>
                  <td className="font-medium">{t.company}</td>
                  <td className="font-mono text-[11px] text-[color:var(--color-text-secondary)]">{t.ref}</td>
                  <td className="font-mono text-[11px]">{t.date}</td>
                  <td className={`text-right font-mono ${t.amount.startsWith("-") ? "text-red-600" : "text-[color:var(--color-lv-green-dark)]"}`}>
                    {t.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
