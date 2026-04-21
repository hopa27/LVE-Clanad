import { Field, TextInput, Section } from "../components/Field";
import { MdFileUpload } from "react-icons/md";

const PAYMENT_HISTORY = [
  { date: "28/05/2025", gross: "9,570.32", cap: "0", tax: "-2,780.46", postAdj: "0", net: "6,789.86", method: "B", reason: "ONEOFF", bacs: "27/05/2025", hash: "/I ZU" },
  { date: "25/10/2025", gross: "699.50", cap: "0", tax: "0", postAdj: "0", net: "699.50", method: "B", reason: "PROC", bacs: "23/10/2025", hash: "/VT0" },
];

const TAX_HISTORY = [
  { date: "28/05/2025", code: "1257L*", n: "1", gross: "9,570.32", cum: "9,570.32", free: "1,048.26", taxable: "8,522.06", tax: "-2,780.46", ytd: "-2,780.46" },
  { date: "25/10/2025", code: "1257L*", n: "6", gross: "699.50", cum: "10,269.82", free: "6,289.56", taxable: "-5,590.06", tax: "0", ytd: "-2,780.46" },
];

export function PaymentsTab() {
  return (
    <div className="space-y-4">
      <Section
        title="Payment Summary"
        headerAction={
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdFileUpload size={16} /> Import
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
          <div>
            <Field label="Premium:"><TextInput value="15,000" /></Field>
            <Field label="Tax Free Cash:"><TextInput value="0" /></Field>
            <Field label="Total:"><TextInput value="15,000" /></Field>
            <Field label="1st Annuitants Gross:"><TextInput value="1,399" /></Field>
            <Field label="2nd Annuitants Gross:"><TextInput value="0" /></Field>
          </div>
          <div>
            <Field label="Cumulative Instal:"><TextInput value="10,269.82" /></Field>
            <Field label="BAL Gross Annuity:"><TextInput value="699.50" /></Field>
            <Field label="Taxable pay:"><TextInput value="-5,590.06" /></Field>
            <Field label="Cumulative Free Pay:"><TextInput value="6,289.56" /></Field>
            <Field label="PAYE Tax Due To Date:"><TextInput value="-2,780.46" /></Field>
            <Field label="PAYE Tax Deduction:"><TextInput value="0" /></Field>
          </div>
          <div>
            <Field label="Next Anniversary:"><TextInput value="25/04/2026" /></Field>
            <Field label="Next Payment Due:"><TextInput value="25/04/2026" /></Field>
            <Field label="Inst Remaining:"><TextInput value="1" /></Field>
            <Field label="Nth Inst:"><TextInput value="6" /></Field>
          </div>
        </div>
      </Section>

      <Section title="Payment History">
        <div className="overflow-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pay Date</th>
                <th className="text-right">Gross</th>
                <th className="text-right">Cap Element</th>
                <th className="text-right">Tax</th>
                <th className="text-right">Post Adj</th>
                <th className="text-right">Net</th>
                <th>Method</th>
                <th>Reason</th>
                <th>BACS Date</th>
                <th>Hash Code</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENT_HISTORY.map((row, i) => (
                <tr key={i} className={i === 0 ? "selected" : ""}>
                  <td className="font-mono">{row.date}</td>
                  <td className="text-right font-mono">{row.gross}</td>
                  <td className="text-right font-mono">{row.cap}</td>
                  <td className="text-right font-mono text-red-600">{row.tax}</td>
                  <td className="text-right font-mono">{row.postAdj}</td>
                  <td className="text-right font-mono">{row.net}</td>
                  <td>{row.method}</td>
                  <td>{row.reason}</td>
                  <td className="font-mono">{row.bacs}</td>
                  <td className="font-mono text-[11px]">{row.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Tax History">
        <div className="overflow-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Pay Date</th>
                <th>Tax Code</th>
                <th>N</th>
                <th className="text-right">Gross</th>
                <th className="text-right">Cum Instal</th>
                <th className="text-right">Free Pay</th>
                <th className="text-right">Taxable Pay</th>
                <th className="text-right">Tax</th>
                <th className="text-right">Tax YTD</th>
              </tr>
            </thead>
            <tbody>
              {TAX_HISTORY.map((row, i) => (
                <tr key={i}>
                  <td className="font-mono">{row.date}</td>
                  <td className="font-mono">{row.code}</td>
                  <td>{row.n}</td>
                  <td className="text-right font-mono">{row.gross}</td>
                  <td className="text-right font-mono">{row.cum}</td>
                  <td className="text-right font-mono">{row.free}</td>
                  <td className="text-right font-mono">{row.taxable}</td>
                  <td className="text-right font-mono">{row.tax}</td>
                  <td className="text-right font-mono">{row.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
