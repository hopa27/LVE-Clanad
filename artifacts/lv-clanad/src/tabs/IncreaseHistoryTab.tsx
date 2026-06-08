import { Field, Section, TextInput, SelectInput } from "../components/Field";
import { usePlanCode } from "../context/PlanCodeContext";

const COLUMNS = [
  "Type", "Status", "Statement Issue Date", "Policy Anniversary Date",
  "Previous Annuity Amount", "New Annuity Amount", "Escalation Type",
  "Esc Rate", "New Basic Annual Income", "Regular Annual Bonus Rate",
  "Topup Bonus Rate", "Regular Bonus Dec Date", "Topup Bonus Amount",
  "Topup Bonus Dec Date", "Guar Charge", "Fund Mngmnt Charge",
  "Next GAD review date", "GAD Maximum", "Withheld Income",
  "Income Restricted", "Mutual Bonus Added", "New Guarantee Min Income",
  "New Yearly Income Before Guarantee", "Declared Investment Return",
];

const ROW_DEFAULT = [
  "Std Post 97", "P", "29/03/2026", "25/04/2026",
  "£1,399.00", "£1,399.00", "Fixed",
  "0", "0", "0",
  "0", "", "£0.00",
  "", "0", "0",
  "n/a", "", "",
  "n/a", "", "", "", "",
];

const PLAN_84_ANNIV: string[] = [
  "03/03/2011", "04/03/2012", "03/03/2013", "03/03/2014",
  "03/03/2015", "03/03/2016", "05/03/2017", "04/03/2018",
  "03/03/2019", "03/03/2020", "03/03/2021", "03/03/2022",
  "05/03/2023", "03/03/2024", "03/03/2025", "03/03/2026",
];

function plan84GadFor(idx: number): { date: string; max: string } {
  if (idx <= 3) return { date: "31/03/2015", max: "1294.19" };
  if (idx <= 6) return { date: "31/03/2018", max: "1377.9" };
  if (idx === 7) return { date: "31/03/2021", max: "1377.9" };
  return { date: "30/12/1899", max: "0" };
}

const ROWS_84: string[][] = PLAN_84_ANNIV.map((d, i) => {
  const gad = plan84GadFor(i);
  return [
    "Std Pre 97", "A", d, d,
    "£1,294.00", "£1,294.00", "Fixed",
    "0", "n/a", "n/a",
    "n/a", "n/a", "n/a",
    "n/a", "n/a", "n/a",
    gad.date, gad.max, "0",
    "No", "0", "0", "0", "0",
  ];
});

const PLAN_83_ROWS: [string, string, string][] = [
  ["A", "17/07/2017", "14/08/2017"],
  ["A", "19/07/2018", "14/08/2018"],
  ["A", "17/07/2019", "14/08/2019"],
  ["A", "19/07/2020", "14/08/2020"],
  ["A", "18/07/2021", "14/08/2021"],
  ["A", "17/07/2022", "14/08/2022"],
  ["A", "17/07/2023", "14/08/2023"],
  ["A", "17/07/2024", "14/08/2024"],
  ["P", "17/07/2025", "14/08/2025"],
];

const ROWS_83: string[][] = PLAN_83_ROWS.map(([status, stmtDate, annivDate]) => [
  "Std Post 97", status, stmtDate, annivDate,
  "£8,424.00", "£8,424.00", "Fixed",
  "0", "0", "n/a",
  "n/a", "n/a", "n/a",
  "n/a", "n/a", "n/a",
  "30/12/1899", "0", "0",
  "No", "0", "0", "0", "0",
]);

export function IncreaseHistoryTab() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";
  const isPlan87 = planCode === "87";
  const isPlan84 = planCode === "84";
  const isPlan90 = planCode === "90";
  const isPlan51 = planCode === "51";
  const isPlan83 = planCode === "83";
  const rows: string[][] = isPlan0 || isPlan87 || isPlan90 || isPlan51
    ? []
    : isPlan84
      ? ROWS_84
      : isPlan83
        ? ROWS_83
        : [ROW_DEFAULT];

  return (
    <div className="space-y-4">
      <Section title="Increase History">
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                {COLUMNS.map((c, i) => (
                  <th
                    key={c}
                    className={`!px-4 max-w-[120px]${i === 0 ? " sticky left-0 z-10" : ""}`}
                    style={i === 0 ? { backgroundColor: "#ffffff" } : undefined}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((v, i) => (
                    <td
                      key={i}
                      className={`!px-4 whitespace-nowrap${i === 0 ? " sticky left-0 z-10 lve-sticky-col" : ""}`}
                      style={i === 0 ? { backgroundColor: ri % 2 === 0 ? "#ffffff" : "#eaf5f8" } : undefined}
                    >
                      {v}
                    </td>
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
