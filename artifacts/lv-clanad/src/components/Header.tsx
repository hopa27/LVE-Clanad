import lvLogo from "../assets/lv-logo.png";
import { MdLogout } from "react-icons/md";

export function Header({ title }: { title: string }) {
  return (
    <header className="w-full bg-[#00263e] text-white pt-4 pb-6 px-[142px] shrink-0">
      <div className="flex items-center justify-between gap-6">
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
    </header>
  );
}
