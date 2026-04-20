const ITEMS = [
  { label: "Status", value: "LIVE", highlight: true },
  { label: "Illustration", value: "20911002" },
  { label: "Variant", value: "7" },
  { label: "RAQ ID", value: "—" },
  { label: "User", value: "UAT3" },
];

export function StatusBar() {
  return (
    <div className="lve-panel mt-6 p-4 flex flex-wrap items-center gap-6">
      {ITEMS.map((item) => (
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
