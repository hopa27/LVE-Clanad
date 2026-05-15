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
            <Field label="Life Type:"><TextInput value="F" disabled /></Field>
            <Field label="Plan Type:"><TextInput value="FTA" disabled /></Field>
            <Field label="Payments:"><TextInput value="AR" disabled /></Field>
            <Field label="Frequency:"><TextInput value="2" disabled /></Field>
            <Field label="ELE:"><TextInput value="" disabled /></Field>
            <Field label="Capital Protection?:"><TextInput value="" disabled /></Field>
            <Field label="Original Amnt Vested:"><TextInput value="" disabled /></Field>
            <Field label="Withheld Minimal Income:"><Checkbox disabled /></Field>
          </div>
          <div>
            <Field label="Series:"><TextInput value="893" disabled /></Field>
            <Field label="Policy Type:">
              <SelectInput value="with profit" options={["with profit", "without profit"]} disabled />
            </Field>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold mb-2">Notional Value</h4>
            <Field label="Notional Value:"><TextInput value="14,828" disabled /></Field>
            <Field label="Value Date:"><TextInput value="25/03/2026" disabled /></Field>
            <Field label="Total Withheld Minimal Income:"><TextInput value="" disabled /></Field>
            <Field label="Total Mutual Bonus:"><TextInput value="" disabled /></Field>
            <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm mt-2">View Notional Value</button>
          </div>
        </div>

        <Section title="LTA Details">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
            <div>
              <Field label="LTA% Crystallised:"><TextInput value="0" disabled /></Field>
              <Field label="Pension Fund within LTA:"><TextInput value="15,000" disabled /></Field>
              <Field label="Net LTA Excess Pension Fund Retained:"><TextInput value="0" disabled /></Field>
              <Field label="Standard Lifetime Allowance:"><TextInput value="1,073,100" disabled /></Field>
              <Field label="First BCE:"><Checkbox checked={true} disabled /></Field>
              <Field label="LTA Protection type:"><TextInput value="N" disabled /></Field>
              <Field label="Enhancement:"><TextInput value="0" disabled /></Field>
              <Field label="HMRC Certificate Number:"><TextInput value="" /></Field>
            </div>
            <div>
              <Field label="Cumulative LTA%:"><TextInput value="0" disabled /></Field>
              <Field label="LTA Excess Tax:"><TextInput value="0" disabled /></Field>
              <Field label="Net LTA Excess Lumpsum:"><TextInput value="0" disabled /></Field>
              <Field label="Pensions In Payment LTA%:"><TextInput value="0" disabled /></Field>
              <Field label="LSA Amount:"><TextInput value="8,190" /></Field>
              <Field label="PCLS Protection:"><TextInput value="N" disabled /></Field>
              <Field label="Enhancement:"><TextInput value="0.25" disabled /></Field>
              <Field label="% Crystallised Post 5th Apr 2024:"><TextInput value="100" /></Field>
            </div>
          </div>
        </Section>
      </Section>

      <Section title="Quote Lines">
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                {[
                  "Type","Premium","Tax Free Cash Amount","Original Income","Esc Type","Esc Rate %",
                  "Current Income","Spouse %","Spouse Income","Guarantee","Last Pay Under Guarantee",
                  "Overlap","Value Protection %","Tax Free %","Max Tax Free",
                ].map((c) => (
                  <th key={c} className="whitespace-nowrap !px-4">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUOTE_ROWS.map((r, i) => (
                <tr key={i}>
                  {[
                    r.type, r.premium, r.tfc, r.original, r.escType, r.escRate,
                    r.currentInc, r.spousePct, r.spouseInc, r.guarantee, r.lastPay,
                    r.overlap, r.valProt, r.taxFree, r.maxFree,
                  ].map((v, j) => (
                    <td key={j} className="!px-4 whitespace-nowrap">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
