import { ChevronDown, ExternalLink, MoreHorizontal } from "lucide-react";

export function PolicyHeader() {
  return (
    <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-[color:var(--color-lv-green-dark)] text-white">
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[12px] font-mono"
          title="Select policy"
        >
          225810 <ChevronDown size={12} />
        </button>
        <button
          type="button"
          className="p-1 rounded-md bg-white/10 hover:bg-white/20"
          title="Open policy"
        >
          <ExternalLink size={14} />
        </button>
      </div>

      <div className="flex items-center px-3 py-1 rounded-md bg-white/15 font-semibold text-[13px]">
        Liverpool Victoria Friendly Society Limited
      </div>

      <div className="flex items-center px-2 py-1 rounded-md bg-white/15 font-mono text-[12px]">
        225810
      </div>

      <div className="flex items-center px-2 py-1 rounded-md bg-[color:var(--color-lv-orange)] text-white font-semibold text-[12px]">
        87
      </div>

      <div className="flex items-center px-3 py-1 rounded-md bg-[color:var(--color-lv-orange)] font-semibold text-[12px]">
        Turner
      </div>

      <div className="flex items-center px-3 py-1 rounded-md bg-white/15 text-[12px]">
        Simultaneous Policies
      </div>

      <button
        type="button"
        className="p-1 rounded-md bg-white/10 hover:bg-white/20"
        title="More"
      >
        <MoreHorizontal size={14} />
      </button>

      <input
        type="text"
        placeholder="Quick find…"
        className="ml-auto px-3 py-1 rounded-md bg-white/15 placeholder-white/60 text-[12px] outline-none focus:bg-white/25 w-56"
      />
    </div>
  );
}
