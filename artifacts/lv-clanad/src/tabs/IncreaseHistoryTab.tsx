import { useState, useRef } from "react";
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

const PLAN_82_ROWS: [string, string, string][] = [
  ["A", "31/08/2011", "28/09/2011"],
  ["A", "02/09/2012", "28/09/2012"],
  ["A", "01/09/2013", "28/09/2013"],
  ["A", "31/08/2014", "28/09/2014"],
];

const ROWS_82: string[][] = PLAN_82_ROWS.map(([status, stmtDate, annivDate]) => [
  "Prot Pre 97", status, stmtDate, annivDate,
  "£0.00", "£0.00", "Fixed",
  "0", "n/a", "n/a",
  "n/a", "n/a", "n/a",
  "n/a", "n/a", "n/a",
  "28/09/2015", "1394.32", "0",
  "No", "0", "0", "0", "0",
]);

const ROWS_76z: string[][] = [
  ["Std Pre 97", "A", "18/05/2009", "26/06/2009", "£18,600.00", "£18,901.32", "RPI + 2", "1.62", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "0", "0", "n/a", "0", "0", "0", "0"],
  ["Std Pre 97", "A", "18/05/2010", "26/06/2010", "£18,901.32", "£20,120.46", "RPI + 2", "6.45", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "0", "0", "n/a", "0", "0", "0", "0"],
  ["Std Pre 97", "A", "18/05/2011", "26/06/2011", "£20,120.46", "£21,599.31", "RPI + 2", "7.35", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "0", "0", "n/a", "0", "0", "0", "0"],
  ["Std Pre 97", "A", "20/05/2012", "26/06/2012", "£21,599.31", "£22,802.39", "RPI + 2", "5.57", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "0", "0", "n/a", "0", "0", "0", "0"],
  ["Std Pre 97", "A", "19/05/2013", "26/06/2013", "£22,802.39", "£24,006.36", "RPI + 2", "5.28", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "0", "0", "n/a", "0", "0", "0", "0"],
  ["Std Pre 97", "A", "18/05/2014", "26/06/2014", "£24,006.36", "£25,074.64", "RPI + 2", "4.45", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "0", "0", "n/a", "0", "0", "0", "0"],
];

const ROWS_80: string[][] = [
  ["Std Pre 97", "A", "30/01/2011", "26/02/2011", "£0.00", "£0.00", "Fixed", "0", "", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "26/02/2015", "2262.43", "0", "No", "0", "0", "0", "0"],
  ["Std Pre 97", "A", "29/01/2012", "26/02/2012", "£0.00", "£0.00", "Fixed", "0", "", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "n/a", "26/02/2015", "2262.43", "0", "No", "0", "0", "0", "0"],
];

const ROWS_621: string[][] = [
  //  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15          16    17  18         19   20  21  22  23
  [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "n/a", "", "", "n/a", "", "", "", "" ],
];

export function IncreaseHistoryTab() {
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
  const rows: string[][] = isPlan0 || isPlan87 || isPlan90 || isPlan51 || isPlan76 || isPlan62a || isPlan611 || isPlan52 || isPlan61a
    ? []
    : isPlan621
      ? ROWS_621
      : isPlan84
      ? ROWS_84
      : isPlan83
        ? ROWS_83
        : isPlan80
          ? ROWS_80
          : isPlan82
          ? ROWS_82
          : isPlan76z
          ? ROWS_76z
          : [ROW_DEFAULT];

  const [colOrder, setColOrder] = useState<number[]>(() =>
    COLUMNS.map((_, i) => i)
  );
  const dragColRef = useRef<number | null>(null);
  const dragOverColRef = useRef<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  const DEFAULT_COL_WIDTH = 140;
  const [colWidths, setColWidths] = useState<number[]>(() =>
    COLUMNS.map(() => DEFAULT_COL_WIDTH)
  );
  const resizeRef = useRef<{ colIdx: number; startX: number; startW: number } | null>(null);

  function handleResizeMouseDown(e: React.MouseEvent, colIdx: number) {
    e.preventDefault();
    e.stopPropagation();
    resizeRef.current = { colIdx, startX: e.clientX, startW: colWidths[colIdx] };

    const onMouseMove = (ev: MouseEvent) => {
      if (!resizeRef.current) return;
      const { colIdx: ci, startX, startW } = resizeRef.current;
      const newW = Math.max(60, startW + ev.clientX - startX);
      setColWidths(prev => {
        const next = [...prev];
        next[ci] = newW;
        return next;
      });
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

  function handleDragStart(orderIdx: number) {
    dragColRef.current = orderIdx;
    setDraggingIdx(orderIdx);
  }

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
    setColOrder(prev => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    dragColRef.current = null;
    dragOverColRef.current = null;
    setDragOverIdx(null);
    setDraggingIdx(null);
  }

  function handleDragEnd() {
    dragColRef.current = null;
    dragOverColRef.current = null;
    setDragOverIdx(null);
    setDraggingIdx(null);
  }

  return (
    <div className="space-y-4">
      <Section title="Increase History">
        <div className="overflow-auto" role="grid" aria-label="Increase History grid" aria-rowcount={rows.length}>
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
                      className={`!px-4 select-none transition-colors relative${isFixed ? " sticky left-0 z-10" : " cursor-grab active:cursor-grabbing"}${isDragging ? " opacity-40" : ""}${isDropTarget ? " border-l-4 border-l-[#006cf4]" : ""}`}
                      style={{ width: colWidths[colIdx], minWidth: colWidths[colIdx], maxWidth: colWidths[colIdx], ...(isFixed ? { backgroundColor: "#ffffff" } : {}) }}
                      title={isFixed ? undefined : "Drag to reorder"}
                    >
                      <span className="block truncate">{COLUMNS[colIdx]}</span>
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
              {rows.map((row, ri) => (
                <tr key={ri} role="row" aria-rowindex={ri + 1}>
                  {colOrder.map((colIdx, orderIdx) => {
                    const isFixed = orderIdx === 0;
                    return (
                      <td
                        key={colIdx}
                        className={`!px-4 whitespace-nowrap overflow-hidden${isFixed ? " sticky left-0 z-10 lve-sticky-col" : ""}`}
                        style={{
                          width: colWidths[colIdx],
                          minWidth: colWidths[colIdx],
                          maxWidth: colWidths[colIdx],
                          ...(isFixed ? { backgroundColor: ri % 2 === 0 ? "#ffffff" : "#eaf5f8" } : {}),
                        }}
                      >
                        {row[colIdx]}
                      </td>
                    );
                  })}
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
