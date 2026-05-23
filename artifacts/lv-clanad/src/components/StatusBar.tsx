import { usePlanCode } from "../context/PlanCodeContext";

export function StatusBar() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";
  const items = [
    { label: "Status", value: "LIVE", highlight: true },
    { label: "Illustration", value: isPlan0 ? "" : "20911002" },
    { label: "Variant", value: isPlan0 ? "" : "7" },
    { label: "RAQ ID", value: "—" },
    { label: "User", value: "UAT3" },
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
              item.highlight ? "text-[#178830]" : "text-[#3d3d3d]"
            }`}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
