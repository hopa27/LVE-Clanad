import { useState } from "react";
import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { ViewNotionalValueModal } from "../components/ViewNotionalValueModal";
import { usePlanCode } from "../context/PlanCodeContext";

const QUOTE_ROWS = [
  {
    type: "Std Post 97", premium: "£15,000.00", tfc: "£0.00", original: "£1,399.00",
    escType: "Fixed", escRate: "0", currentInc: "0", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "Yes",
    valProt: "100", taxFree: "0", maxFree: "F",
    valProtFlag: "Y", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_87 = [
  {
    type: "Std Post 97", premium: "£100,000.00", tfc: "", original: "£1.00",
    escType: "Fixed", escRate: "0", currentInc: "", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "",
    valProt: "", taxFree: "", maxFree: "",
    valProtFlag: "", lsConvert: "", planProt: "", dependant: "",
  },
];

const QUOTE_ROWS_84 = [
  {
    type: "Std Pre 97", premium: "£27,131.96", tfc: "£6,782.99", original: "£1,294.00",
    escType: "Fixed", escRate: "0", currentInc: "£1,294.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "No",
    valProt: "100", taxFree: "", maxFree: "",
    valProtFlag: "", lsConvert: "", planProt: "", dependant: "",
  },
];

const QUOTE_ROWS_90 = [
  {
    type: "Std Pre 97", premium: "", tfc: "£0.00", original: "£0.00",
    escType: "Fixed", escRate: "0", currentInc: "£0.00", spousePct: "",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "No",
    valProt: "100", taxFree: "0", maxFree: "F",
    valProtFlag: "Y", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_COLUMNS = [
  "Type","Premium","Tax Free Cash Amount","Original Income","Esc Type","Esc Rate %",
  "Current Income","Spouse %","Spouse Income","Guarantee","Last Pay Under Guarantee",
  "Overlap","Value Protection %","Tax Free %","Max Tax Free Cash",
  "Value Protection Flag","LS_CONVERT","Plan Protection %","DEPENDANT",
];

export function QuoteDetailsTab() {
  const [notionalOpen, setNotionalOpen] = useState(false);
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";
  const isPlan87 = planCode === "87";
  const isPlan84 = planCode === "84";
  const isPlan90 = planCode === "90";
  const showGad = false;
  const quoteRows = isPlan0
    ? []
    : isPlan87
    ? QUOTE_ROWS_87
    : isPlan84
    ? QUOTE_ROWS_84
    : isPlan90
    ? QUOTE_ROWS_90
    : QUOTE_ROWS;

  return (
    <div className="space-y-4">
      <Section title="Basis Details">
        {isPlan0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
              <div>
                <Field label="Life Type:"><TextInput value="DBEd" disabled /></Field>
                <Field label="Plan Type:">
                  <div className="grid grid-cols-2 gap-2">
                    <TextInput value="DBEdit1" disabled />
                    <TextInput value="DBEdit" disabled />
                  </div>
                </Field>
                <Field label="Overlap:"><TextInput value="DBEd" disabled /></Field>
                <Field label="Payments:"><TextInput value="payty" disabled /></Field>
                <Field label="Frequency:"><TextInput value="payfre" disabled /></Field>
                <Field label="DMT:"><TextInput value="Dbed" disabled /></Field>
                <Field label="Value Protection %:"><TextInput value="ValueProte" disabled /></Field>
              </div>
              <div>
                <Field label="ELE:"><TextInput value="EdELE" disabled /></Field>
                <Field label="Original Amnt Vested:"><TextInput value="DBOriginal" disabled /></Field>
                <Field label="Series:"><TextInput value="bdseri" disabled /></Field>
                <Field label="With Profit Series:"><TextInput value="EdWithProfit" disabled /></Field>
                <Field label="Policy Type:"><TextInput value="EdPolicyTyp" disabled /></Field>
                <Field label="Last Survivor?:"><TextInput value="DBEd" disabled /></Field>
                <Field label="Escalation Rate:"><TextInput value="DBEdit" disabled /></Field>
              </div>
              <div>
                <Field label="Escalation Type:"><TextInput value="dbedEscTy" disabled /></Field>
                <Field label="Capital Protection?:"><TextInput value="DBEdit" disabled /></Field>
                <Field label="Max Tax Free Cash:"><Checkbox disabled /></Field>
                <Field label="Value Protection:"><Checkbox disabled /></Field>
                <Field label="Withheld Minimal Income:"><Checkbox disabled /></Field>
              </div>
            </div>

            <Section title="LTA Details">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
                <div>
                  <Field label="LTA% Crystallised:"><TextInput value="dbeLTACrys" disabled /></Field>
                  <Field label="Scheme Name:"><TextInput value="dbedSchem" /></Field>
                  <Field label="NHMRC Scheme Pension Number:"><TextInput value="DBEDSCHE" /></Field>
                  <Field label="Standard Lifetime Allowance:"><TextInput value="DBEdit29" disabled /></Field>
                  <Field label="First BCE:"><Checkbox disabled /></Field>
                  <Field label="LTA Protection type:"><TextInput value="edtlblLtaPro" disabled /></Field>
                </div>
                <div>
                  <Field label="Enhancement:"><TextInput value="edtOtherLad" disabled /></Field>
                  <Field label="HMRC Certificate Number:"><TextInput value="EDTHMRCC" /></Field>
                  <Field label="% Crystallised Post 5th Apr 2024:"><TextInput value="DBEditCrtyl" /></Field>
                  <Field label="Cumulative LTA%:"><TextInput value="dbeLTACurr" disabled /></Field>
                  <Field label="LTA Excess Tax:"><TextInput value="DBEdit31" disabled /></Field>
                </div>
                <div>
                  <Field label="Net LTA Excess Lumpsum:"><TextInput value="DBEdit32" disabled /></Field>
                  <Field label="Pensions In Payment LTA%:"><TextInput value="DBEdit33" disabled /></Field>
                  <Field label="LSA Amount:"><TextInput value="DBEdit25" /></Field>
                  <Field label="PCLS Protection:"><TextInput value="edtPclsProt" disabled /></Field>
                  <Field label="Enhancement:"><TextInput value="edtProtec" disabled /></Field>
                </div>
              </div>
            </Section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 pt-4 border-t border-[#e0e0e0]">
              <div>
                <Field label="Policy Term (months):"><TextInput value="dbedPolicy" disabled /></Field>
                <Field label="Last Payment Date:"><TextInput value="dbedLastPa" disabled /></Field>
                <Field label="Maturity Date:"><TextInput value="dbedMaturit" disabled /></Field>
                <Field label="Guaranteed Maturity:"><TextInput value="dbedGuaran" disabled /></Field>
                <Field label="Original GAD Limit Upper:"><TextInput value="dbedGADLi" disabled /></Field>
              </div>
              <div>
                <Field label="Original GAD Limit:"><TextInput value="dbedGADLi" disabled /></Field>
                <Field label="Original GAD Review Date:"><TextInput value="dbedCalcul" disabled /></Field>
                <Field label="GAD Review Maximum:"><TextInput value="dbedGADR" disabled /></Field>
                <Field label="GAD Review Date:"><TextInput value="dbedGADR" disabled /></Field>
                <Field label="Notional Value:"><TextInput value="DBEdit48" disabled /></Field>
              </div>
              <div>
                <Field label="Value Date:"><TextInput value="DBEdit49" disabled /></Field>
                <Field label="Total Withheld Minimal Income:"><TextInput value="edTW" disabled /></Field>
                <Field label="Total Mutual Bonus:"><TextInput value="edTW" disabled /></Field>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setNotionalOpen(true)}
                    className="lve-btn lve-btn-secondary lve-btn-sm"
                  >
                    View Notional Value
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
              <div>
                <Field label="Life Type:"><TextInput value={isPlan87 ? "M" : isPlan90 ? "" : "F"} disabled /></Field>
                <Field label="Plan Type:">
                  {isPlan84 ? (
                    <div className="grid grid-cols-2 gap-2">
                      <TextInput value="FTA" disabled />
                      <TextInput value="(PRP)" disabled />
                    </div>
                  ) : (
                    <TextInput value={isPlan90 ? "MCP" : "FTA"} disabled />
                  )}
                </Field>
                <Field label="Payments:"><TextInput value="AR" disabled /></Field>
                <Field label="Frequency:"><TextInput value={isPlan87 ? "1" : isPlan84 || isPlan90 ? "12" : "2"} disabled /></Field>
                <Field label="ELE:"><TextInput value="" disabled /></Field>
                {!isPlan84 && !isPlan90 && (
                  <Field label="Capital Protection?:"><TextInput value="" disabled /></Field>
                )}
                <Field label="Original Amnt Vested:"><TextInput value="" disabled /></Field>
                {!isPlan84 && !isPlan90 && (
                  <Field label="Withheld Minimal Income:"><Checkbox checked={isPlan87} disabled /></Field>
                )}
              </div>
              <div>
                <Field label="Series:"><TextInput value={isPlan87 ? "912" : isPlan84 ? "700" : isPlan90 ? "" : "893"} disabled /></Field>
                <Field label="Policy Type:">
                  <SelectInput
                    value={isPlan84 || isPlan90 ? "non profit" : "with profit"}
                    options={["with profit", "without profit", "non profit"]}
                    disabled
                  />
                </Field>
                {(isPlan84 || isPlan90) && (
                  <Field label="Capital Protection?:"><TextInput value="" disabled /></Field>
                )}
                {showGad && (
                  <>
                    <Field label="Original GAD Limit Upper:"><TextInput value="" disabled /></Field>
                    <Field label="Original GAD Limit:"><TextInput value="" disabled /></Field>
                    <Field label="Original GAD Review Date:"><TextInput value="" disabled /></Field>
                    <Field label="GAD Review Maximum:"><TextInput value="" disabled /></Field>
                    <Field label="GAD Review Date:"><TextInput value="" disabled /></Field>
                  </>
                )}
                {isPlan87 && (
                  <>
                    <Field label="Guaranteed Maturity:"><TextInput value="127081" disabled /></Field>
                    <Field label="Maturity Date:"><TextInput value="09/09/2031" disabled /></Field>
                  </>
                )}
                {isPlan84 && (
                  <>
                    <Field label="Policy Term (months):"><TextInput value="271" disabled /></Field>
                    <Field label="Guaranteed Maturity:"><TextInput value="889" disabled /></Field>
                    <Field label="Maturity Date:"><TextInput value="31/10/2032" disabled /></Field>
                  </>
                )}
              </div>
              {!isPlan87 && !isPlan90 && (
                <div>
                  <Field label="Notional Value:"><TextInput value={isPlan84 ? "8189.23" : "14,828"} disabled /></Field>
                  <Field label="Value Date:"><TextInput value={isPlan84 ? "30/04/2026" : "25/03/2026"} disabled /></Field>
                  {!isPlan84 && (
                    <>
                      <Field label="Total Withheld Minimal Income:"><TextInput value="" disabled /></Field>
                      <Field label="Total Mutual Bonus:"><TextInput value="" disabled /></Field>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setNotionalOpen(true)}
                    className="lve-btn lve-btn-secondary lve-btn-sm mt-2"
                  >
                    View Notional Value
                  </button>
                </div>
              )}
            </div>

            {!isPlan90 && (
            <Section title="LTA Details">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                <div>
                  <Field inline labelWidth={260} label="LTA% Crystallised:"><TextInput value={isPlan84 ? "1.55" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Pension Fund within LTA:"><TextInput value={isPlan87 ? "" : isPlan84 ? "20348.97" : "15,000"} disabled /></Field>
                  <Field inline labelWidth={260} label="Net LTA Excess Pension Fund Retained:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Standard Lifetime Allowance:"><TextInput value={isPlan87 ? "" : isPlan84 ? "1750000" : "1,073,100"} disabled /></Field>
                  <Field inline labelWidth={260} label="First BCE:"><Checkbox checked={true} disabled /></Field>
                  <Field inline labelWidth={260} label="LTA Protection type:"><TextInput value={isPlan87 ? "" : "N"} disabled /></Field>
                  <Field inline labelWidth={260} label="Enhancement:"><TextInput value={isPlan87 || isPlan84 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="HMRC Certificate Number:"><TextInput value="" /></Field>
                </div>
                <div>
                  <Field inline labelWidth={260} label="Cumulative LTA%:"><TextInput value={isPlan87 ? "" : isPlan84 ? "1.55" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="LTA Excess Tax:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Net LTA Excess Lumpsum:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Pensions In Payment LTA%:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="LSA Amount:"><TextInput value={isPlan87 ? "" : isPlan84 ? "4158" : "8,190"} /></Field>
                  <Field inline labelWidth={260} label="PCLS Protection:"><TextInput value={isPlan87 ? "" : "N"} disabled /></Field>
                  <Field inline labelWidth={260} label="Enhancement:"><TextInput value={isPlan87 ? "" : "0.25"} disabled /></Field>
                  <Field inline labelWidth={260} label="% Crystallised Post 5th Apr 2024:"><TextInput value={isPlan87 ? "0" : isPlan84 ? "" : "100"} /></Field>
                </div>
              </div>
            </Section>
            )}
          </>
        )}
      </Section>

      <Section title="Quote Lines">
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                {QUOTE_COLUMNS.map((c) => (
                  <th key={c} className="whitespace-nowrap !px-4">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {quoteRows.map((r, i) => (
                <tr key={i}>
                  {[
                    r.type, r.premium, r.tfc, r.original, r.escType, r.escRate,
                    r.currentInc, r.spousePct, r.spouseInc, r.guarantee, r.lastPay,
                    r.overlap, r.valProt, r.taxFree, r.maxFree,
                    r.valProtFlag, r.lsConvert, r.planProt, r.dependant,
                  ].map((v, j) => (
                    <td key={j} className="!px-4 whitespace-nowrap">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {isPlan0 && (
        <Section title="GroupBox1">
          <div className="overflow-auto">
            <table className="lve-grid">
              <thead>
                <tr>
                  <th className="!px-4">&nbsp;</th>
                </tr>
              </thead>
              <tbody />
            </table>
          </div>
        </Section>
      )}

      <ViewNotionalValueModal open={notionalOpen} onClose={() => setNotionalOpen(false)} />
    </div>
  );
}
