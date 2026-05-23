import { Field, Section, TextInput, SelectInput } from "../components/Field";
import { usePlanCode } from "../context/PlanCodeContext";

const COLUMNS = [
  "Type", "Status", "Statement Issue Date", "Policy Anniversary Date",
  "Previous Annuity Amount", "New Annuity Amount", "Escalation Type",
  "Esc Rate", "New Basic Annual Income", "Regular Annual Bonus Rate",
  "Topup Bonus Rate", "Regular Bonus Dec Date", "Topup Bonus Amount",
  "Topup Bonus Dec Date", "Guar Charge", "Fund Mngmnt Charge",
];

const ROW_DEFAULT = [
  "Std Post 97", "P", "29/03/2026", "25/04/2026",
  "£1,399.00", "£1,399.00", "Fixed",
  "0", "0", "0",
  "0", "", "£0.00",
  "", "0", "0",
];

export function IncreaseHistoryTab() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";
  const rows: string[][] = isPlan0 ? [] : [ROW_DEFAULT];

  return (
    <div className="space-y-4">
      <Section title="Increase History">
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                {COLUMNS.map((c) => (
                  <th key={c} className="whitespace-nowrap !px-4">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((v, i) => (
                    <td key={i} className="!px-4 whitespace-nowrap">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {isPlan0 && (
        <Section>
          <div className="max-w-md space-y-1">
            <Field label="New GAD Max:"><TextInput value="dbNewGadMax" /></Field>
            <Field label="Income Restricted:">
              <SelectInput value="cbIncomeRestricted" options={["cbIncomeRestricted", "Yes", "No"]} />
            </Field>
            <Field label=" ">
              <SelectInput value="" options={[""]} />
            </Field>
            <Field label="New Annuity Amount:"><TextInput value="dbNewAnnuityAmt" /></Field>
            <Field label="Withheld Income:"><TextInput value="dbWithheldIncome" /></Field>
            <Field label="Previous Annuity Amount:"><TextInput value="dbPreviousAnnuityAmt" /></Field>
          </div>
        </Section>
      )}
    </div>
  );
}
