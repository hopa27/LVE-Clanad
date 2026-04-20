const MENU_ITEMS = ["Options", "Process", "Print", "Supervisor", "Help"];

export function TopMenu() {
  return (
    <div className="flex items-center justify-between bg-white border-b border-[color:var(--color-panel-border)] px-3 py-1.5">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[color:var(--color-lv-green)] flex items-center justify-center text-white font-bold text-xs">
            LV
          </div>
          <div className="leading-tight">
            <div className="text-[12px] font-semibold">Client Annuity Administration System</div>
            <div className="text-[10px] text-[color:var(--color-text-muted)] uppercase tracking-wider">CLANAD</div>
          </div>
        </div>
        <nav className="flex items-center gap-0.5 ml-3">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className="px-2.5 py-1 rounded-md text-[12px] text-[color:var(--color-text-secondary)] hover:bg-[#f1f4f8] hover:text-[color:var(--color-text-primary)]"
            >
              <span className="underline-offset-2">
                <span className="underline">{item.charAt(0)}</span>
                {item.slice(1)}
              </span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-3 text-[12px] text-[color:var(--color-text-secondary)]">
        <span>Standard User</span>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[color:var(--color-lv-green)]" />
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
}
