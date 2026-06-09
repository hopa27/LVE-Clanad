import { usePlanCode } from "../context/PlanCodeContext";

export function StatusBar() {
  const { planCode } = usePlanCode();
  const isPlan0   = planCode === "0";
  const isPlan51  = planCode === "51";
  const isPlan83  = planCode === "83";
  const isPlan82  = planCode === "82";
  const isPlan621 = planCode === "621";
  const isPlan76  = planCode === "76";
  const isPlan62a = planCode === "62a";
  const isPlan611 = planCode === "611";
  const isPlan52  = planCode === "52";
  const isPlan61a = planCode === "61a";
  const items = [
    {
      label: "Status",
      value: isPlan51 ? "MIGRATED" : isPlan83 ? "Maturity Pending" : isPlan82 ? "SUSPENDED" : isPlan621 ? "Death Pending" : isPlan76 ? "DEAD" : isPlan62a ? "CANCELLED" : isPlan611 ? "SHELVED - Ntu" : isPlan52 ? "SHELVED - Duplicate" : isPlan61a ? "EXPIRED" : "LIVE",
      highlight: !isPlan51 && !isPlan83 && !isPlan82 && !isPlan621 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a,
      error: isPlan51 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan62a || isPlan611 || isPlan52 || isPlan61a,
    },
    { label: "Illustration", value: isPlan0 ? "" : isPlan51 ? "927657" : isPlan83 ? "10578050" : isPlan82 ? "2479583" : isPlan621 ? "919598" : isPlan76 ? "938688" : isPlan62a ? "2684095" : isPlan611 ? "948258" : isPlan52 ? "922450" : isPlan61a ? "1135311" : "20911002" },
    { label: "Variant",      value: isPlan0 ? "" : isPlan51 ? "8"      : isPlan83 ? "3"        : isPlan82 ? "3"       : isPlan621 ? "4"      : isPlan76 ? "4"      : isPlan62a ? "1"        : isPlan611 ? "5"      : isPlan52 ? "4" : isPlan61a ? "9" : "7"       },
    { label: "RAQ ID",       value: isPlan51 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "—" },
    { label: "User",         value: isPlan51 || isPlan83 || isPlan82 || isPlan62a ? "UAT1" : "UAT3" },
  ];
  return (
    <div className="lve-panel mt-6 p-4 flex flex-wrap items-center gap-6 sticky bottom-0 z-20 shadow-[0_-2px_6px_rgba(0,0,0,0.08)]">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="font-['Livvic'] text-xs uppercase tracking-wider text-[#0d2c41]/60">
            {item.label}:
          </span>
          <span
            className={`font-['Mulish'] text-sm font-semibold ${
              item.highlight ? "text-[#178830]" : (item as any).error ? "text-[#d72714]" : "text-[#3d3d3d]"
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
