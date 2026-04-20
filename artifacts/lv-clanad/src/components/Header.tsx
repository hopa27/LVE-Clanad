import lvLogo from "../assets/lv-logo.png";
import { MdLogout } from "react-icons/md";

export function Header({ title }: { title: string }) {
  return (
    <header className="w-full bg-[#00263e] text-white pt-4 pb-6 px-[142px] shrink-0">
      <div className="flex items-center justify-between">
        <img src={lvLogo} alt="LV=" className="h-6 w-auto" />
        <button
          type="button"
          className="h-8 inline-flex items-center gap-2 px-4 rounded-[30px] text-white hover:bg-white/10 font-['Livvic'] text-sm transition-colors"
        >
          <MdLogout size={16} />
          Logout
        </button>
      </div>
      <div className="h-px bg-slate-600/50 my-6" />
      <h1 className="font-['Livvic'] text-3xl font-normal tracking-tight text-white">
        {title}
      </h1>
    </header>
  );
}
