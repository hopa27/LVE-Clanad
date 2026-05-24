import { Field, TextInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdEdit } from "react-icons/md";
import { useCheques } from "../context/ChequesContext";
import { usePlanCode } from "../context/PlanCodeContext";

const TRANSFERS: { company: string; ref: string; date: string; amount: string }[] = [];

const SEED_CHEQUE_NOS = new Set(["232693", "232694", "232695"]);

export function BankAccDetailsTab() {
  const { planCode } = usePlanCode();
  const isPlan87 = planCode === "87";
  const { cheques } = useCheques();
  const postedRows = isPlan87
    ? []
    : cheques
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
            <Field inline label="Bank sort code:">
              <TextInput value={isPlan87 ? "20-00-00" : "DBEdit41"} />
            </Field>
            <Field inline label="Bank account no:">
              <TextInput value={isPlan87 ? "83608808" : "DBEdit77"} />
            </Field>
            <Field inline label="Bank account name:">
              <TextInput value={isPlan87 ? "Test" : "DBEdit79"} />
            </Field>
            <Field inline label="Bank name:">
              <TextInput
                value={isPlan87 ? "BARCLAY'S BANK PLC, 1 CHURCHILL  PLACE" : ""}
                disabled
              />
            </Field>
          </div>
          <div>
            <Field inline label="Payment Ref:">
              <TextInput value={isPlan87 ? "233451" : "DBEdit6"} />
            </Field>
            <Field inline label="Payment Method:">
              <TextInput value={isPlan87 ? "B" : "DB"} disabled />
            </Field>
            {!isPlan87 && (
              <>
                <Field inline label="Change Effective Date:">
                  <DatePicker
                    value="dbedChangeEffect"
                    placeholder="dbedChangeEffect"
                    disabled
                  />
                </Field>
                <Field inline label="TOTAL:"><TextInput value="" disabled /></Field>
              </>
            )}
            {isPlan87 && (
              <Field inline label="TOTAL:"><TextInput value="" disabled /></Field>
            )}
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
