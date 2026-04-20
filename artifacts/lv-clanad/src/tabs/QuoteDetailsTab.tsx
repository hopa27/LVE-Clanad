import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";

const QUOTE_ROWS = [
  {
    type: "Std Post 97", premium: "£15,000.00", tfc: "£0.00", original: "£1,399.00",
    escType: "Fixed", escRate: "0", currentInc: "0", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "Yes",
    valProt: "100", taxFree: "0", maxFree: "F",
  },
];

export function QuoteDetailsTab() {
  return (
    <div className="space-y-4">
      <Section title="Basis Details">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
          <div>
            <Field label="Life Type:"><TextInput value="F" /></Field>
            <Field label="Plan Type:"><TextInput value="FTA" /></Field>
            <Field label="Payments:"><TextInput value="AR" /></Field>
            <Field label="Frequency:"><TextInput value="2" /></Field>
            <Field label="ELE:"><TextInput value="" /></Field>
            <Field label="Capital Protection?:"><TextInput value="" /></Field>
            <Field label="Original Amnt Vested:"><TextInput value="" /></Field>
            <Field label="Withheld Minimal Income:"><Checkbox /></Field>
          </div>
          <div>
            <Field label="Series:"><TextInput value="893" /></Field>
            <Field label="Policy Type:">
              <SelectInput value="with profit" options={["with profit", "without profit"]} />
            </Field>
          </div>
          <div className="lg:col-span-1">
            <h4 className="text-[12px] font-semibold text-[color:var(--color-lv-orange-dark)] mb-2">LTA Details</h4>
            <Field label="LTA% Crystallised:"><TextInput value="0" /></Field>
            <Field label="Pension Fund within LTA:"><TextInput value="15,000" /></Field>
            <Field label="Net LTA Excess Pension Fund Retained:"><TextInput value="0" /></Field>
            <Field label="Standard Lifetime Allowance:"><TextInput value="1,073,100" /></Field>
            <Field label="First BCE:"><Checkbox checked={true} /></Field>
            <Field label="LTA Protection type:"><TextInput value="N" /></Field>
            <Field label="Enhancement:"><TextInput value="0" /></Field>
            <Field label="HMRC Certificate Number:"><TextInput value="" /></Field>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 mt-4 pt-4 border-t border-[color:var(--color-panel-border)]">
          <div>
            <Field label="Cumulative LTA%:"><TextInput value="0" /></Field>
            <Field label="LTA Excess Tax:"><TextInput value="0" /></Field>
            <Field label="Net LTA Excess Lumpsum:"><TextInput value="0" /></Field>
            <Field label="Pensions In Payment LTA%:"><TextInput value="0" /></Field>
            <Field label="LSA Amount:"><TextInput value="8,190" /></Field>
            <Field label="PCLS Protection:"><TextInput value="N" /></Field>
            <Field label="Enhancement:"><TextInput value="0.25" /></Field>
            <Field label="% Crystallised Post 5th Apr 2024:"><TextInput value="100" /></Field>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[12px] font-semibold mb-2">Notional Value</h4>
            <Field label="Notional Value:"><TextInput value="14,828" /></Field>
            <Field label="Value Date:"><TextInput value="25/03/2026" /></Field>
            <Field label="Total Withheld Minimal Income:"><TextInput value="" /></Field>
            <Field label="Total Mutual Bonus:"><TextInput value="" /></Field>
            <button type="button" className="btn mt-2">View Notional Value</button>
          </div>
        </div>
      </Section>

      <Section title="Quote Lines">
        <div className="overflow-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th><th>Premium</th><th>Tax Free Cash Amount</th>
                <th>Original Income</th><th>Esc Type</th><th>Esc Rate %</th>
                <th>Current Income</th><th>Spouse %</th><th>Spouse Income</th>
                <th>Guarantee</th><th>Last Pay Under Guarantee</th>
                <th>Overlap</th><th>Value Protection %</th><th>Tax Free %</th>
                <th>Max Tax Free</th>
              </tr>
            </thead>
            <tbody>
              {QUOTE_ROWS.map((r, i) => (
                <tr key={i} className="selected">
                  <td>{r.type}</td>
                  <td className="font-mono">{r.premium}</td>
                  <td className="font-mono">{r.tfc}</td>
                  <td className="font-mono">{r.original}</td>
                  <td>{r.escType}</td>
                  <td className="font-mono">{r.escRate}</td>
                  <td className="font-mono">{r.currentInc}</td>
                  <td className="font-mono">{r.spousePct}</td>
                  <td className="font-mono">{r.spouseInc}</td>
                  <td>{r.guarantee}</td>
                  <td>{r.lastPay}</td>
                  <td>{r.overlap}</td>
                  <td className="font-mono">{r.valProt}</td>
                  <td className="font-mono">{r.taxFree}</td>
                  <td>{r.maxFree}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
