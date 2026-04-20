import { MdKeyboardArrowDown, MdOpenInNew, MdMoreHoriz } from "react-icons/md";

export function PolicyHeader() {
  return (
    <div className="lve-panel mb-6 p-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="inline-flex items-center gap-1 px-3 h-9 rounded-[8px] border border-[#BBBBBB] bg-white font-['Mulish'] text-[#3d3d3d] hover:border-[#178830]"
      >
        225810 <MdKeyboardArrowDown />
      </button>
      <button
        type="button"
        className="h-9 w-9 inline-flex items-center justify-center rounded-[8px] border border-[#BBBBBB] bg-white text-[#006cf4] hover:border-[#178830]"
        title="Open"
      >
        <MdOpenInNew size={16} />
      </button>

      <div className="px-4 h-9 inline-flex items-center rounded-[30px] bg-[#00263e] text-white font-['Livvic'] font-semibold text-sm">
        Liverpool Victoria Friendly Society Limited
      </div>

      <div className="px-3 h-9 inline-flex items-center rounded-[8px] bg-[#eaf5f8] text-[#0d2c41] font-['Mulish'] text-sm">
        225810
      </div>

      <div className="px-3 h-9 inline-flex items-center rounded-[8px] bg-[#006cf4] text-white font-['Livvic'] font-semibold text-sm">
        87
      </div>

      <div className="px-4 h-9 inline-flex items-center rounded-[30px] bg-[#178830] text-white font-['Livvic'] font-semibold text-sm">
        Turner
      </div>

      <div className="px-3 h-9 inline-flex items-center rounded-[8px] bg-[#eaf5f8] text-[#0d2c41] font-['Mulish'] text-sm">
        Simultaneous Policies
      </div>

      <button
        type="button"
        className="h-9 w-9 inline-flex items-center justify-center rounded-[8px] border border-[#BBBBBB] bg-white text-[#3d3d3d] hover:border-[#178830]"
        title="More"
      >
        <MdMoreHoriz size={18} />
      </button>

      <input
        type="text"
        placeholder="Quick find…"
        className="lve-input ml-auto max-w-xs"
      />
    </div>
  );
}
