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

const PAYMENT_HISTORY_84: Row[] = [
  { date: "30/04/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "FIRST", bacs: "29/04/2010", hash: "" },
  { date: "31/05/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "27/05/2010", hash: "" },
  { date: "30/06/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/06/2010", hash: "" },
  { date: "31/07/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/07/2010", hash: "" },
  { date: "31/08/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "27/08/2010", hash: "" },
  { date: "30/09/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/09/2010", hash: "" },
  { date: "31/10/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "28/10/2010", hash: "" },
  { date: "30/11/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/11/2010", hash: "" },
  { date: "31/12/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "30/12/2010", hash: "" },
];

const TAX_HISTORY_84: Row[] = [
  { date: "30/04/2010", code: "647L*", n: "1", gross: "107.83", cum: "107.83", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "31/05/2010", code: "647L*", n: "1", gross: "107.83", cum: "215.66", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "30/06/2010", code: "647L*", n: "1", gross: "107.83", cum: "323.49", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "31/07/2010", code: "647L*", n: "1", gross: "107.83", cum: "431.32", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "31/08/2010", code: "647L",  n: "5", gross: "107.83", cum: "539.15", free: "2699.6",  taxable: "-2160.45", tax: "0", ytd: "0" },
  { date: "30/09/2010", code: "647L",  n: "6", gross: "107.83", cum: "646.98", free: "3239.52", taxable: "-2592.54", tax: "0", ytd: "0" },
  { date: "31/10/2010", code: "647L",  n: "7", gross: "107.83", cum: "754.81", free: "3779.44", taxable: "-3024.63", tax: "0", ytd: "0" },
];

const PAYMENT_HISTORY_90: Row[] = [
  { date: "07/07/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "FIRST", bacs: "04/07/2025", hash: "/Q2I" },
  { date: "28/07/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "25/07/2025", hash: "/GGJ" },
  { date: "28/08/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/08/2025", hash: "/QH1" },
  { date: "28/09/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "25/09/2025", hash: "/H8L" },
  { date: "28/10/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/10/2025", hash: "/323" },
  { date: "28/11/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/11/2025", hash: "/0QY" },
  { date: "28/12/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "23/12/2025", hash: "/4Q3" },
  { date: "28/01/2026", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/01/2026", hash: "/L4l" },
  { date: "28/02/2026", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "26/02/2026", hash: "/E--" },
];

const TAX_HISTORY_90: Row[] = [
  { date: "07/07/2025", code: "NT", n: "4", gross: "251.79", cum: "251.79",  free: "0", taxable: "251.79",  tax: "0", ytd: "0" },
  { date: "28/07/2025", code: "NT", n: "4", gross: "251.79", cum: "503.58",  free: "0", taxable: "503.58",  tax: "0", ytd: "0" },
  { date: "28/08/2025", code: "NT", n: "5", gross: "251.79", cum: "755.37",  free: "0", taxable: "755.37",  tax: "0", ytd: "0" },
  { date: "28/09/2025", code: "NT", n: "6", gross: "251.79", cum: "1007.16", free: "0", taxable: "1007.16", tax: "0", ytd: "0" },
  { date: "28/10/2025", code: "NT", n: "7", gross: "251.79", cum: "1258.95", free: "0", taxable: "1258.95", tax: "0", ytd: "0" },
  { date: "28/11/2025", code: "NT", n: "8", gross: "251.79", cum: "1510.74", free: "0", taxable: "1510.74", tax: "0", ytd: "0" },
];

export function PaymentsTab() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";
  const isPlan87 = planCode === "87";
  const isPlan84 = planCode === "84";
  const isPlan90 = planCode === "90";

  const paymentHistory = isPlan84
    ? PAYMENT_HISTORY_84
    : isPlan90
    ? PAYMENT_HISTORY_90
    : isPlan0 || isPlan87
    ? []
    : PAYMENT_HISTORY_DEFAULT;
  const taxHistory = isPlan84
    ? TAX_HISTORY_84
    : isPlan90
    ? TAX_HISTORY_90
    : isPlan0 || isPlan87
    ? []
    : TAX_HISTORY_DEFAULT;

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
        ) : isPlan90 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="3021.57" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="3021.57" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="0" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="503.67" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="503.67" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Final Payment:">
                <DatePicker value="28/05/2027" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="28/06/2026" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="12" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="2" disabled /></Field>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value={isPlan87 ? "100000" : isPlan84 ? "20348.97" : "15,000"} disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value={isPlan84 ? "6782.99" : "0"} disabled /></Field>
              <Field
                label={
                  isPlan87 || isPlan84 ? (
                    <span className="text-[#d72714]">Total:</span>
                  ) : (
                    "Total:"
                  )
                }
              >
                <TextInput
                  value={isPlan87 ? "100000" : isPlan84 ? "27131.96" : "15,000"}
                  disabled
                  className={isPlan87 || isPlan84 ? "!text-[#d72714] underline" : ""}
                />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value={isPlan87 ? "0" : isPlan84 ? "1294" : "1,399"} disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value={isPlan87 ? "" : isPlan84 ? "107.83" : "10,269.82"} disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value={isPlan87 ? "" : isPlan84 ? "1186.17" : "699.50"} disabled /></Field>
              <Field label="Taxable pay:"><TextInput value={isPlan87 ? "" : isPlan84 ? "63.74" : "-5,590.06"} disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value={isPlan87 ? "" : isPlan84 ? "44.09" : "6,289.56"} disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value={isPlan87 ? "" : isPlan84 ? "-12.6" : "-2,780.46"} disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value={isPlan84 ? "31/03/2027" : ""} placeholder="Next Anniversary" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value={isPlan84 ? "31/05/2026" : ""} placeholder="Next Payment Due" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value={isPlan87 ? "" : isPlan84 ? "11" : "1"} disabled /></Field>
              <Field label="Nth Inst:"><TextInput value={isPlan87 ? "" : isPlan84 ? "1" : "6"} disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value={isPlan84 ? "-12.6" : "0"} disabled /></Field>
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
