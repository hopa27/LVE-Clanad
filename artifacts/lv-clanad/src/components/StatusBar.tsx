const ITEMS = [
  { label: "Status", value: "LIVE", highlight: true },
  { label: "Illustration", value: "20911002" },
  { label: "Variant", value: "7" },
  { label: "RAQ ID", value: "—" },
  { label: "User", value: "UAT3" },
];

export function StatusBar() {
  return (
    <div className="flex items-center text-[11px] bg-[color:var(--color-status-bar)] text-white">
      {ITEMS.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-2 px-3 py-1.5 border-r border-white/10"
        >
          <span className="text-white/60 uppercase tracking-wider">{item.label}:</span>
          <span
            className={
              item.highlight
                ? "font-semibold text-[color:var(--color-lv-orange)]"
                : "font-medium"
            }
          >
            {item.value}
          </span>
        </div>
      ))}
      <div className="ml-auto px-3 text-white/50">v2.0 · Modernized UI</div>
    </div>
  );
}
