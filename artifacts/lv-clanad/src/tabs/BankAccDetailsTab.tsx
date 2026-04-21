import { Field, TextInput, Section } from "../components/Field";
import { Pencil } from "lucide-react";

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
          <button type="button" className="lve-btn-secondary inline-flex items-center gap-1">
            <Pencil size={14} /> Edit Bank Details
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          <div>
            <Field label="Bank sort code:"><TextInput value="30-15-52" /></Field>
            <Field label="Bank account no:"><TextInput value="01841281" /></Field>
            <Field label="Bank account name:"><TextInput value="Mrs Linda Turner" /></Field>
          </div>
          <div>
            <Field label="Bank name:"><TextInput value="LLOYDS BANK PLC, WIRRAL" /></Field>
            <Field label="Payment Ref:"><TextInput value="225810" /></Field>
            <Field label="Payment Method:"><TextInput value="B" /></Field>
            <Field label="Change Effective Date:"><TextInput value="" /></Field>
          </div>
        </div>

        <div className="flex items-center justify-end mt-3 gap-2">
          <span className="text-[12px] text-[color:var(--color-text-secondary)]">TOTAL:</span>
          <span className="px-3 py-1 rounded-md bg-[#e8f5ee] text-[color:var(--color-lv-green-dark)] font-semibold text-[13px]">
            £15,000.00
          </span>
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
