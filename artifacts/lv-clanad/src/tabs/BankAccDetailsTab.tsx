import { Field, TextInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdEdit } from "react-icons/md";
import { useCheques } from "../context/ChequesContext";

const TRANSFERS = [
  { company: "PRUDENTIAL", ref: "225810", date: "25/04/2025", amount: "32,760.42" },
  { company: "TFC", ref: "", date: "02/05/2025", amount: "-8,190.10" },
  { company: "TLS", ref: "", date: "02/05/2025", amount: "-9,570.32" },
];

const SEED_CHEQUE_NOS = new Set(["232693", "232694", "232695"]);

export function BankAccDetailsTab() {
  const { cheques } = useCheques();
  const postedRows = cheques
    .filter((c) => !SEED_CHEQUE_NOS.has(c.chequeNo))
    .map((c) => ({
      company: c.transferCompany,
      ref: c.chequeNo,
      date: c.date,
      amount: c.amount,
    }));
  const rows = [...TRANSFERS, ...postedRows];
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
            <Field inline label="Bank name:"><TextInput value="LLOYDS BANK PLC, WIRRAL" disabled /></Field>
          </div>
          <div>
            <Field inline label="Payment Ref:"><TextInput value="225810" /></Field>
            <Field inline label="Payment Method:"><TextInput value="B" disabled /></Field>
            <Field inline label="Change Effective Date:"><DatePicker placeholder="Change Effective Date" disabled /></Field>
            <Field inline label="TOTAL:"><TextInput value="£15,000.00" disabled /></Field>
          </div>
        </div>
      </Section>

      <Section>
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                <th>Transfer Company</th>
                <th>Ref</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Amount (£)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => (
                <tr key={i}>
                  <td>{t.company}</td>
                  <td>{t.ref}</td>
                  <td>{t.date}</td>
                  <td style={{ textAlign: "right" }}>{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
