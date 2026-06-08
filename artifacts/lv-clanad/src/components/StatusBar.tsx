import { usePlanCode } from "../context/PlanCodeContext";

export function StatusBar() {
  const { planCode } = usePlanCode();
  const isPlan0   = planCode === "0";
  const isPlan51  = planCode === "51";
  const isPlan83  = planCode === "83";
  const isPlan621 = planCode === "621";
  const items = [
    {
      label: "Status",
      value: isPlan51 ? "MIGRATED" : isPlan83 ? "Maturity Pending" : isPlan621 ? "Death Pending" : "LIVE",
      highlight: !isPlan51 && !isPlan83 && !isPlan621,
      error: isPlan51 || isPlan83 || isPlan621,
    },
    { label: "Illustration", value: isPlan0 ? "" : isPlan51 ? "927657" : isPlan83 ? "10578050" : isPlan621 ? "919598" : "20911002" },
    { label: "Variant",      value: isPlan0 ? "" : isPlan51 ? "8"      : isPlan83 ? "3"        : isPlan621 ? "4"      : "7"       },
    { label: "RAQ ID",       value: isPlan51 || isPlan83 || isPlan621 ? "" : "—" },
    { label: "User",         value: isPlan51 || isPlan83 ? "UAT1" : "UAT3" },
  ];
  return (
    <div className="lve-panel mt-6 p-4 flex flex-wrap items-center gap-6">
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
