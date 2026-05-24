import { Field, TextInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdFileUpload } from "react-icons/md";
import { usePlanCode } from "../context/PlanCodeContext";

type Row = Record<string, string>;

const PAYMENT_HISTORY_DEFAULT: Row[] = [
  { date: "28/05/2025", gross: "9,570.32", cap: "0", tax: "-2,780.46", postAdj: "0", net: "6,789.86", method: "B", reason: "ONEOFF", bacs: "27/05/2025", hash: "/I ZU" },
  { date: "25/10/2025", gross: "699.50", cap: "0", tax: "0", postAdj: "0", net: "699.50", method: "B", reason: "PROC", bacs: "23/10/2025", hash: "/VT0" },
];

const TAX_HISTORY_DEFAULT: Row[] = [
  { date: "28/05/2025", code: "1257L*", n: "1", gross: "9,570.32", cum: "9,570.32", free: "1,048.26", taxable: "8,522.06", tax: "-2,780.46", ytd: "-2,780.46" },
  { date: "25/10/2025", code: "1257L*", n: "6", gross: "699.50", cum: "10,269.82", free: "6,289.56", taxable: "-5,590.06", tax: "0", ytd: "-2,780.46" },
];

export function PaymentsTab() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";
  const isPlan87 = planCode === "87";

  const paymentHistory = isPlan0 || isPlan87 ? [] : PAYMENT_HISTORY_DEFAULT;
  const taxHistory = isPlan0 || isPlan87 ? [] : TAX_HISTORY_DEFAULT;

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
        {isPlan0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="DBEdit22" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="DBEdit23" disabled /></Field>
              <Field label="Total:"><TextInput value="DBText1" disabled /></Field>
              <Field label="1st Annuitants Gross:"><TextInput value="DBEdit27" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="DBEdit56" disabled /></Field>
            </div>
            <div>
              <Field label="Gross Annuity Year 1:"><TextInput value="dbedGrossAn" disabled /></Field>
              <Field label="Instalments Year 1:"><TextInput value="dbedInstalme" disabled /></Field>
              <Field label="PLA Taxable Element:"><TextInput value="dbedPLATaxa" disabled /></Field>
              <Field label="Taxable pay:"><TextInput value="DBEdit58" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="DBEdit73" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="DBEdit74" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="DBEdit75" disabled /></Field>
              <Field label="BAL Capital Element:"><TextInput value="dbedBALCapi" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="DBEdit59" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="DBEdit60" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:"><TextInput value="DBEdit61" disabled /></Field>
              <Field label="Next Payment Due:"><TextInput value="DBEdit62" disabled /></Field>
              <Field label="Inst Remaining:"><TextInput value="DBE" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="DBE" disabled /></Field>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value={isPlan87 ? "100000" : "15,000"} disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field
                label={
                  isPlan87 ? (
                    <span className="text-[#d72714]">Total:</span>
                  ) : (
                    "Total:"
                  )
                }
              >
                <TextInput
                  value={isPlan87 ? "100000" : "15,000"}
                  disabled
                  className={isPlan87 ? "!text-[#d72714] underline" : ""}
                />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value={isPlan87 ? "0" : "1,399"} disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value={isPlan87 ? "" : "10,269.82"} disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value={isPlan87 ? "" : "699.50"} disabled /></Field>
              <Field label="Taxable pay:"><TextInput value={isPlan87 ? "" : "-5,590.06"} disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value={isPlan87 ? "" : "6,289.56"} disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value={isPlan87 ? "" : "-2,780.46"} disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:"><DatePicker placeholder="Next Anniversary" disabled /></Field>
              <Field label="Next Payment Due:"><DatePicker placeholder="Next Payment Due" disabled /></Field>
              <Field label="Inst Remaining:"><TextInput value={isPlan87 ? "" : "1"} disabled /></Field>
              <Field label="Nth Inst:"><TextInput value={isPlan87 ? "" : "6"} disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="0" disabled /></Field>
            </div>
          </div>
        )}
      </Section>

      <Section title="Payment History">
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                <th>Pay Date</th>
                <th>Gross</th>
                <th>Cap Element</th>
                <th>Tax</th>
                <th>Post Adj</th>
                <th>Net</th>
                <th>Method</th>
                <th>Reason</th>
                <th>BACS Date</th>
                <th>Hash Code</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.gross}</td>
                  <td>{row.cap}</td>
                  <td>{row.tax}</td>
                  <td>{row.postAdj}</td>
                  <td>{row.net}</td>
                  <td>{row.method}</td>
                  <td>{row.reason}</td>
                  <td>{row.bacs}</td>
                  <td>{row.hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Tax History">
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                <th>Pay Date</th>
                <th>Tax Code</th>
                <th>N</th>
                <th>Gross</th>
                <th>Cum Instal</th>
                <th>Free Pay</th>
                <th>Taxable Pay</th>
                <th>Tax</th>
                <th>Tax YTD</th>
              </tr>
            </thead>
            <tbody>
              {taxHistory.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td>{row.code}</td>
                  <td>{row.n}</td>
                  <td>{row.gross}</td>
                  <td>{row.cum}</td>
                  <td>{row.free}</td>
                  <td>{row.taxable}</td>
                  <td>{row.tax}</td>
                  <td>{row.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
