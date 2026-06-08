import { usePlanCode } from "../context/PlanCodeContext";

export function StatusBar() {
  const { planCode } = usePlanCode();
  const isPlan0   = planCode === "0";
  const isPlan51  = planCode === "51";
  const isPlan83  = planCode === "83";
  const isPlan621 = planCode === "621";
  const isPlan76  = planCode === "76";
  const isPlan62a = planCode === "62a";
  const items = [
    {
      label: "Status",
      value: isPlan51 ? "MIGRATED" : isPlan83 ? "Maturity Pending" : isPlan621 ? "Death Pending" : isPlan76 ? "DEAD" : isPlan62a ? "CANCELLED" : "LIVE",
      highlight: !isPlan51 && !isPlan83 && !isPlan621 && !isPlan76 && !isPlan62a,
      error: isPlan51 || isPlan83 || isPlan621 || isPlan76 || isPlan62a,
    },
    { label: "Illustration", value: isPlan0 ? "" : isPlan51 ? "927657" : isPlan83 ? "10578050" : isPlan621 ? "919598" : isPlan76 ? "938688" : isPlan62a ? "2684095" : "20911002" },
    { label: "Variant",      value: isPlan0 ? "" : isPlan51 ? "8"      : isPlan83 ? "3"        : isPlan621 ? "4"      : isPlan76 ? "4"      : isPlan62a ? "1"        : "7"       },
    { label: "RAQ ID",       value: isPlan51 || isPlan83 || isPlan621 || isPlan76 || isPlan62a ? "" : "—" },
    { label: "User",         value: isPlan51 || isPlan83 || isPlan62a ? "UAT1" : "UAT3" },
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
