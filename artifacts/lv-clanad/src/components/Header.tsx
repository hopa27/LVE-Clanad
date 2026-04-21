import lvLogo from "../assets/lv-logo.png";
import { MdLogout } from "react-icons/md";

const MENU_ITEMS = ["Options", "Process", "Print", "Supervisor", "Help"];

export function Header({ title }: { title: string }) {
  return (
    <header className="shrink-0">
      <div className="w-full bg-[#00263e] text-white py-5 px-[142px] flex items-center">
        <div className="flex items-center justify-between gap-6 w-full">
          <div className="flex items-center gap-6 min-w-0">
            <img src={lvLogo} alt="LV=" className="h-6 w-auto shrink-0" />
            <h1 className="font-['Livvic'] text-3xl font-normal tracking-tight text-white truncate">
              {title}
            </h1>
          </div>
          <button
            type="button"
            className="h-8 inline-flex items-center gap-2 px-4 rounded-[30px] text-white hover:bg-white/10 font-['Livvic'] text-sm transition-colors shrink-0"
          >
            <MdLogout size={16} />
            Logout
          </button>
        </div>
      </div>
      <nav className="w-full bg-[#e8e8e8] border-y border-[#b8b8b8] px-[142px] py-1 flex items-center gap-5 font-['Mulish'] text-[13px] text-[#3d3d3d]">
        {MENU_ITEMS.map((item) => (
          <button
            key={item}
            type="button"
            className="px-1 py-0.5 hover:bg-[#d6d6d6] rounded-sm"
          >
            <span className="underline">{item.charAt(0)}</span>
            {item.slice(1)}
          </button>
        ))}
      </nav>
    </header>
  );
}
