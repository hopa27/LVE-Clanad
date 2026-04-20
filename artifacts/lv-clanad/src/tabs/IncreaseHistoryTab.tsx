import { Section } from "../components/Field";

const COLUMNS = [
  "Type", "Status", "Statement Issue Date", "Policy Anniversary Date",
  "Previous Annuity Amount", "New Annuity Amount", "Escalation Type",
  "Esc Rate", "New Basic Annual Income", "Regular Annual Bonus Rate",
  "Topup Bonus Rate", "Regular Bonus Dec Date", "Topup Bonus Amount",
  "Topup Bonus Dec Date", "Guar Charge", "Fund Mngmnt Charge",
];

const ROW = [
  "Std Post 97", "P", "29/03/2026", "25/04/2026",
  "£1,399.00", "£1,399.00", "Fixed",
  "0", "0", "0",
  "0", "", "£0.00",
  "", "0", "0",
];

export function IncreaseHistoryTab() {
  return (
    <Section title="Increase History">
      <div className="overflow-auto">
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="selected">
              {ROW.map((v, i) => (
                <td key={i} className={i > 3 ? "font-mono text-right" : "font-mono"}>{v}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Section>
  );
}
