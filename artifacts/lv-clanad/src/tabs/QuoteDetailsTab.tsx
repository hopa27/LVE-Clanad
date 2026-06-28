import { useState, useRef } from "react";
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
    escType: "Fixed", escRate: "0", currentInc: "0", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "No",
    valProt: "100", taxFree: "0", maxFree: "0",
    valProtFlag: "F", lsConvert: "T", planProt: "", dependant: "None",
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

const QUOTE_ROWS_51 = [
  {
    type: "Std Pre 97", premium: "£8,940.65", tfc: "", original: "£526.00",
    escType: "Fixed", escRate: "0", currentInc: "£526.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "None", lastPay: "", overlap: "No",
    valProt: "", taxFree: "", maxFree: "F",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_83 = [
  {
    type: "Std Post 97", premium: "£75,459.46", tfc: "", original: "£8,424.00",
    escType: "Fixed", escRate: "0", currentInc: "£8,424.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "No",
    valProt: "100", taxFree: "0", maxFree: "F",
    valProtFlag: "T", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_82 = [
  {
    type: "Prot Pre 97", premium: "£21,391.53", tfc: "", original: "£0.00",
    escType: "Fixed", escRate: "0", currentInc: "£0.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "No",
    valProt: "100", taxFree: "", maxFree: "F",
    valProtFlag: "T", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_76z = [
  {
    type: "Std Pre 97", premium: "£63,697.99", tfc: "", original: "£18,600.00",
    escType: "RPI + 2", escRate: "0", currentInc: "£25,074.64", spousePct: "0",
    spouseInc: "£0.00", guarantee: "None", lastPay: "", overlap: "No",
    valProt: "", taxFree: "", maxFree: "F",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_76 = [
  {
    type: "Std Pre 97", premium: "£43,962.00", tfc: "", original: "£13,800.00",
    escType: "Fixed", escRate: "0", currentInc: "£13,800.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "None", lastPay: "", overlap: "No",
    valProt: "", taxFree: "", maxFree: "F",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_611 = [
  {
    type: "Std Pre 97", premium: "£3,670.56", tfc: "", original: "£169.00",
    escType: "Fixed", escRate: "0", currentInc: "", spousePct: "100",
    spouseInc: "£169.00", guarantee: "None", lastPay: "", overlap: "No",
    valProt: "", taxFree: "", maxFree: "F",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "Named",
  },
];

const QUOTE_ROWS_62a = [
  {
    type: "Std Pre 97", premium: "£144,760.00", tfc: "£36,190.00", original: "£7,499.00",
    escType: "Fixed", escRate: "0", currentInc: "", spousePct: "",
    spouseInc: "£0.00", guarantee: "10 year", lastPay: "", overlap: "No",
    valProt: "", taxFree: "25", maxFree: "F",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "Named",
  },
];

const QUOTE_ROWS_621 = [
  {
    type: "Std Pre 97",  premium: "£23,364.96", tfc: "£5,841.24", original: "£1,494.00",
    escType: "Fixed", escRate: "0", currentInc: "£1,494.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "5 year", lastPay: "07/01/2013", overlap: "No",
    valProt: "", taxFree: "25", maxFree: "F", valProtFlag: "", lsConvert: "F", planProt: "", dependant: "None",
  },
  {
    type: "Prot Pre 97", premium: "£29,850.11", tfc: "£7,462.52", original: "£1,545.00",
    escType: "Fixed", escRate: "0", currentInc: "£0.00", spousePct: "50",
    spouseInc: "£772.50", guarantee: "5 year", lastPay: "07/01/2013", overlap: "No",
    valProt: "", taxFree: "25", maxFree: "F", valProtFlag: "", lsConvert: "F", planProt: "", dependant: "Any",
  },
];

const QUOTE_ROWS_61a = [
  {
    type: "Std Pre 97", premium: "£6,803.69", tfc: "", original: "£677.00",
    escType: "Fixed", escRate: "0", currentInc: "£677.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "10 year", lastPay: "19/08/2018", overlap: "No",
    valProt: "", taxFree: "", maxFree: "F",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_80 = [
  {
    type: "Std Pre 97", premium: "£41,210.07", tfc: "£10,302.51", original: "£0.00",
    escType: "Fixed", escRate: "0", currentInc: "£0.00", spousePct: "0",
    spouseInc: "£0.00", guarantee: "", lastPay: "", overlap: "No",
    valProt: "100", taxFree: "25", maxFree: "F",
    valProtFlag: "T", lsConvert: "", planProt: "", dependant: "None",
  },
];

const QUOTE_ROWS_52 = [
  {
    type: "Std Pre 97", premium: "£11,218.88", tfc: "£2,804.72", original: "£540.00",
    escType: "Fixed", escRate: "0", currentInc: "", spousePct: "0",
    spouseInc: "£0.00", guarantee: "10 year", lastPay: "", overlap: "No",
    valProt: "", taxFree: "25", maxFree: "T",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "None",
  },
  {
    type: "Prot Pre 97", premium: "£31,985.09", tfc: "£7,996.27", original: "£1,552.00",
    escType: "Fixed", escRate: "0", currentInc: "", spousePct: "0",
    spouseInc: "£0.00", guarantee: "5 year", lastPay: "", overlap: "No",
    valProt: "", taxFree: "25", maxFree: "T",
    valProtFlag: "F", lsConvert: "", planProt: "", dependant: "None",
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
  const [selectedQuoteIdx, setSelectedQuoteIdx] = useState<number | null>(null);
  const [colOrder, setColOrder] = useState<number[]>(() => QUOTE_COLUMNS.map((_, i) => i));
  const [colWidths, setColWidths] = useState<number[]>(() => QUOTE_COLUMNS.map(() => 140));
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const dragColRef = useRef<number | null>(null);
  const dragOverColRef = useRef<number | null>(null);
  const resizeRef = useRef<{ colIdx: number; startX: number; startW: number } | null>(null);

  function handleResizeMouseDown(e: React.MouseEvent, colIdx: number) {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = { colIdx, startX: e.clientX, startW: colWidths[colIdx] };
    const onMouseMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      const { colIdx: ci, startX, startW } = resizeRef.current;
      setColWidths(prev => { const next = [...prev]; next[ci] = Math.max(60, startW + ev.clientX - startX); return next; });
    };
    const onMouseUp = () => {
      resizeRef.current = null;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function handleDragStart(orderIdx: number) { dragColRef.current = orderIdx; setDraggingIdx(orderIdx); }
  function handleDragOver(e: React.DragEvent, orderIdx: number) {
    e.preventDefault();
    if (orderIdx === 0) return;
    dragOverColRef.current = orderIdx;
    setDragOverIdx(orderIdx);
  }
  function handleDrop(orderIdx: number) {
    const from = dragColRef.current;
    const to = orderIdx;
    if (from === null || from === to || from === 0 || to === 0) return;
    setColOrder(prev => { const next = [...prev]; const [moved] = next.splice(from, 1); next.splice(to, 0, moved); return next; });
    dragColRef.current = null; dragOverColRef.current = null; setDragOverIdx(null); setDraggingIdx(null);
  }
  function handleDragEnd() { dragColRef.current = null; dragOverColRef.current = null; setDragOverIdx(null); setDraggingIdx(null); }
  const { planCode } = usePlanCode();
  const isPlan0   = planCode === "0";
  const isPlan87  = planCode === "87";
  const isPlan84  = planCode === "84";
  const isPlan90  = planCode === "90";
  const isPlan51  = planCode === "51";
  const isPlan83  = planCode === "83";
  const isPlan82  = planCode === "82";
  const isPlan80  = planCode === "80";
  const isPlan621 = planCode === "621";
  const isPlan76  = planCode === "76";
  const isPlan76z = planCode === "76z";
  const isPlan62a = planCode === "62a";
  const isPlan611 = planCode === "611";
  const isPlan52  = planCode === "52";
  const isPlan61a = planCode === "61a";
  const showGad = isPlan82 || isPlan80;
  const quoteRows = isPlan0
    ? []
    : isPlan87
    ? QUOTE_ROWS_87
    : isPlan84
    ? QUOTE_ROWS_84
    : isPlan90
    ? QUOTE_ROWS_90
    : isPlan51
    ? QUOTE_ROWS_51
    : isPlan82
    ? QUOTE_ROWS_82
    : isPlan80
    ? QUOTE_ROWS_80
    : isPlan83
    ? QUOTE_ROWS_83
    : isPlan621
    ? QUOTE_ROWS_621
    : isPlan76
    ? QUOTE_ROWS_76
    : isPlan76z
    ? QUOTE_ROWS_76z
    : isPlan62a
    ? QUOTE_ROWS_62a
    : isPlan611
    ? QUOTE_ROWS_611
    : isPlan52
    ? QUOTE_ROWS_52
    : isPlan61a
    ? QUOTE_ROWS_61a
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
                <Field label="Life Type:"><TextInput value={isPlan611 ? "FM" : isPlan87 || isPlan51 || isPlan82 || isPlan83 || isPlan621 || isPlan62a || isPlan61a ? "M" : isPlan90 ? "" : "F"} disabled /></Field>
                <Field label="Plan Type:">
                  {isPlan84 ? (
                    <div className="grid grid-cols-2 gap-2">
                      <TextInput value="FTA" disabled />
                      <TextInput value="(PRP)" disabled />
                    </div>
                  ) : (
                    <TextInput value={isPlan90 ? "MCP" : isPlan51 || isPlan611 || isPlan61a ? "CPA" : (isPlan80 || isPlan82 || isPlan83) ? "PRP" : isPlan621 || isPlan62a || isPlan52 ? "PPA" : isPlan76 || isPlan76z ? "ICFP" : "FTA"} disabled />
                  )}
                </Field>
                <Field label="Payments:"><TextInput value={isPlan83 || isPlan76 || isPlan76z || isPlan611 || isPlan52 || isPlan61a ? "AD" : "AR"} disabled /></Field>
                <Field label="Frequency:"><TextInput value={isPlan87 || isPlan62a ? "1" : isPlan80 || isPlan84 || isPlan90 || isPlan82 || isPlan83 || isPlan621 || isPlan76 || isPlan76z || isPlan611 || isPlan52 || isPlan61a ? "12" : isPlan51 ? "4" : "2"} disabled /></Field>
                {(isPlan76 || isPlan76z) && (
                  <Field label="DMT:"><TextInput value="0" disabled /></Field>
                )}
                <Field label="ELE:"><TextInput value="" disabled={!isPlan51} /></Field>
                {!isPlan84 && !isPlan90 && !isPlan76 && !isPlan76z && (
                  <Field label="Capital Protection?:"><TextInput value="" disabled={!isPlan51} /></Field>
                )}
                <Field label="Original Amnt Vested:"><TextInput value="" disabled={!isPlan51} /></Field>
                {!isPlan80 && !isPlan84 && !isPlan90 && !isPlan51 && !isPlan82 && !isPlan83 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
                  <Field label="Withheld Minimal Income:"><Checkbox checked={isPlan87} disabled /></Field>
                )}
              </div>
              <div>
                <Field label="Series:"><TextInput value={isPlan87 ? "912" : isPlan84 || isPlan80 ? "700" : isPlan90 ? "" : isPlan51 ? "325" : isPlan82 ? "716" : isPlan83 ? "792" : isPlan621 ? "322" : isPlan76 ? "325" : isPlan76z ? "335" : isPlan62a ? "378" : isPlan611 ? "325" : isPlan52 ? "325" : isPlan61a ? "351" : "893"} disabled /></Field>
                <Field label="Policy Type:">
                  <SelectInput
                    value={isPlan80 || isPlan84 || isPlan90 || isPlan51 || isPlan82 || isPlan83 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "non profit" : "with profit"}
                    options={["with profit", "without profit", "non profit"]}
                    disabled
                  />
                </Field>
                {(isPlan84 || isPlan90) && (
                  <Field label="Capital Protection?:"><TextInput value="" disabled /></Field>
                )}
                {showGad && (
                  <>
                    <Field label="Original GAD Limit Upper:"><TextInput value={isPlan80 ? "2262.43" : "1394.32"} disabled /></Field>
                    <Field label="Original GAD Limit:"><TextInput value="0" disabled /></Field>
                    <Field label="Original GAD Review Date:"><TextInput value={isPlan80 ? "26/02/2015" : "28/09/2015"} disabled /></Field>
                    <Field label="GAD Review Maximum:"><TextInput value={isPlan80 ? "2262.43" : "1394.32"} disabled /></Field>
                    <Field label="GAD Review Date:"><TextInput value={isPlan80 ? "26/02/2015" : "28/09/2015"} disabled /></Field>
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
                {isPlan82 && (
                  <>
                    <Field label="Policy Term (months):"><TextInput value="60" disabled /></Field>
                    <Field label="Guaranteed Maturity:"><TextInput value="22651" disabled /></Field>
                    <Field label="Maturity Date:"><TextInput value="26/10/2015" disabled /></Field>
                  </>
                )}
                {isPlan83 && (
                  <>
                    <Field label="Policy Term (months):"><TextInput value="120" disabled /></Field>
                    <Field label="Guaranteed Maturity:"><TextInput value="501" disabled /></Field>
                    <Field label="Maturity Date:"><TextInput value="14/08/2025" disabled /></Field>
                  </>
                )}
                {isPlan80 && (
                  <>
                    <Field label="Policy Term (months):"><TextInput value="36" disabled /></Field>
                    <Field label="Guaranteed Maturity:"><TextInput value="31243" disabled /></Field>
                    <Field label="Maturity Date:"><TextInput value="26/02/2013" disabled /></Field>
                  </>
                )}
              </div>
              {!isPlan80 && !isPlan87 && !isPlan90 && !isPlan51 && !isPlan82 && !isPlan83 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
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

            {!isPlan90 && !isPlan83 && !isPlan76 && !isPlan76z && (
            <Section title="LTA Details">
              {isPlan51 || isPlan611 || isPlan61a || isPlan82 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                  <div>
                    <Field inline labelWidth={200} label="LTA% Crystallised:"><TextInput value={isPlan611 ? "0" : isPlan61a ? "0.54" : isPlan82 ? "1.83" : "7.4"} disabled /></Field>
                    <Field inline labelWidth={200} label="Scheme Name:"><TextInput value={isPlan611 || isPlan61a || isPlan82 ? "" : "Zurich"} /></Field>
                    <Field inline labelWidth={200} label="HMRC Scheme Number:"><TextInput value="" /></Field>
                  </div>
                  <div>
                    <Field inline labelWidth={200} label="LSA Amount:"><TextInput value="" /></Field>
                  </div>
                </div>
              ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
                <div>
                  <Field inline labelWidth={260} label="LTA% Crystallised:"><TextInput value={isPlan80 ? "2.35" : isPlan84 ? "1.55" : isPlan621 ? "3.33" : isPlan62a ? "8.04" : isPlan52 ? "2.7" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Pension Fund within LTA:"><TextInput value={isPlan87 ? "" : isPlan80 ? "30907.56" : isPlan84 ? "20348.97" : isPlan621 ? "39911.31" : isPlan62a ? "108570" : isPlan52 ? "32402.98" : "15,000"} disabled /></Field>
                  <Field inline labelWidth={260} label="Net LTA Excess Pension Fund Retained:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Standard Lifetime Allowance:"><TextInput value={isPlan87 ? "" : isPlan80 || isPlan84 ? "1750000" : isPlan621 ? "1600000" : isPlan62a ? "1800000" : isPlan52 ? "1600000" : "1,073,100"} disabled /></Field>
                  <Field inline labelWidth={260} label="First BCE:"><Checkbox checked={!isPlan621} disabled /></Field>
                  <Field inline labelWidth={260} label="LTA Protection type:"><TextInput value={isPlan87 ? "" : "N"} disabled /></Field>
                  <Field inline labelWidth={260} label="Enhancement:"><TextInput value={isPlan87 || isPlan84 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="HMRC Certificate Number:"><TextInput value="" /></Field>
                </div>
                <div>
                  <Field inline labelWidth={260} label="Cumulative LTA%:"><TextInput value={isPlan87 ? "" : isPlan80 ? "2.35" : isPlan84 ? "1.55" : isPlan621 ? "4.28" : isPlan62a ? "8.04" : isPlan52 ? "2.7" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="LTA Excess Tax:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Net LTA Excess Lumpsum:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="Pensions In Payment LTA%:"><TextInput value={isPlan87 ? "" : "0"} disabled /></Field>
                  <Field inline labelWidth={260} label="LSA Amount:"><TextInput value={isPlan87 ? "" : isPlan84 ? "4158" : isPlan80 || isPlan621 || isPlan62a || isPlan52 ? "" : "8,190"} /></Field>
                  <Field inline labelWidth={260} label="PCLS Protection:"><TextInput value={isPlan87 ? "" : "N"} disabled /></Field>
                  <Field inline labelWidth={260} label="Enhancement:"><TextInput value={isPlan87 ? "" : "0.25"} disabled /></Field>
                  <Field inline labelWidth={260} label="% Crystallised Post 5th Apr 2024:"><TextInput value={isPlan87 ? "0" : isPlan80 || isPlan84 || isPlan621 || isPlan62a || isPlan52 ? "" : "100"} /></Field>
                </div>
              </div>
              )}
            </Section>
            )}
          </>
        )}
      </Section>

      <Section>
        {(() => {
          const handleQuoteKey = (e: React.KeyboardEvent) => {
            if (!quoteRows.length) return;
            const last = quoteRows.length - 1;
            if (e.key === "ArrowDown") { e.preventDefault(); setSelectedQuoteIdx((i) => Math.min((i ?? -1) + 1, last)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedQuoteIdx((i) => Math.max((i ?? 1) - 1, 0)); }
            else if (e.key === "Home") { e.preventDefault(); setSelectedQuoteIdx(0); }
            else if (e.key === "End") { e.preventDefault(); setSelectedQuoteIdx(last); }
          };
          return (
        <div
          className="overflow-auto"
          role="grid"
          tabIndex={0}
          onKeyDown={handleQuoteKey}
          aria-label="Quote Lines grid"
          aria-rowcount={quoteRows.length}
        >
          <table className="lve-grid" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                {colOrder.map((colIdx, orderIdx) => {
                  const isFixed = orderIdx === 0;
                  const isDragging = draggingIdx === orderIdx;
                  const isDropTarget = dragOverIdx === orderIdx && !isFixed;
                  return (
                    <th
                      key={colIdx}
                      draggable={!isFixed}
                      onDragStart={isFixed ? undefined : () => handleDragStart(orderIdx)}
                      onDragOver={isFixed ? undefined : (e) => handleDragOver(e, orderIdx)}
                      onDrop={isFixed ? undefined : () => handleDrop(orderIdx)}
                      onDragEnd={handleDragEnd}
                      className={`!px-4 select-none whitespace-nowrap transition-colors relative${isFixed ? "" : " cursor-grab active:cursor-grabbing"}${isDragging ? " opacity-40" : ""}${isDropTarget ? " border-l-4 border-l-[#006cf4]" : ""}`}
                      style={{ width: colWidths[colIdx], minWidth: colWidths[colIdx], maxWidth: colWidths[colIdx] }}
                      title={isFixed ? undefined : "Drag to reorder"}
                    >
                      <span className="block truncate">{QUOTE_COLUMNS[colIdx]}</span>
                      <div
                        className="absolute top-0 right-0 h-full w-2 cursor-col-resize z-20 flex items-center justify-center group"
                        onMouseDown={(e) => handleResizeMouseDown(e, colIdx)}
                        onClick={(e) => e.stopPropagation()}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        title="Drag to resize column"
                      >
                        <div className="w-0.5 h-4 bg-[#BBBBBB] group-hover:bg-[#006cf4] rounded-full transition-colors" />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {quoteRows.map((r, i) => {
                const isSel = selectedQuoteIdx === i;
                const tdStyle = isSel ? { backgroundColor: "#05579B", color: "#ffffff" } : undefined;
                const vals = [
                  r.type, r.premium, r.tfc, r.original, r.escType, r.escRate,
                  r.currentInc, r.spousePct, r.spouseInc, r.guarantee, r.lastPay,
                  r.overlap, r.valProt, r.taxFree, r.maxFree,
                  r.valProtFlag, r.lsConvert, r.planProt, r.dependant,
                ];
                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedQuoteIdx(i)}
                    className="cursor-pointer"
                    aria-selected={isSel}
                    role="row"
                    aria-rowindex={i + 1}
                  >
                    {colOrder.map((colIdx) => (
                      <td
                        key={colIdx}
                        className="!px-4 whitespace-nowrap overflow-hidden"
                        style={{ width: colWidths[colIdx], minWidth: colWidths[colIdx], maxWidth: colWidths[colIdx], ...tdStyle }}
                      >
                        {vals[colIdx]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
          );
        })()}
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
