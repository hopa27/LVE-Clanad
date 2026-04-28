import { useEffect, useRef, useState } from "react";
import lvLogo from "../assets/lv-logo.png";
import { MdLogout } from "react-icons/md";

type MenuItem = { label: string; options?: string[] };

const MENU_ITEMS: MenuItem[] = [
  { label: "Options" },
  { label: "Process" },
  {
    label: "Print",
    options: ["Calculate", "Copy P60", "Reprint MAR's", "MAR's Diary Report"],
  },
  { label: "Supervisor" },
  { label: "Help" },
];

export function Header({ title }: { title: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIdx(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

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
      <nav
        ref={navRef}
        className="w-full bg-[#e8e8e8] border-y border-[#b8b8b8] px-[142px] py-1 flex items-center gap-5 font-['Mulish'] text-[13px] text-[#3d3d3d]"
      >
        {MENU_ITEMS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={item.label} className="relative">
              <button
                type="button"
                onClick={() =>
                  item.options ? setOpenIdx(isOpen ? null : idx) : setOpenIdx(null)
                }
                className={`px-1 py-0.5 rounded-sm hover:bg-[#d6d6d6] ${
                  isOpen ? "bg-[#d6d6d6]" : ""
                }`}
              >
                <span className="underline">{item.label.charAt(0)}</span>
                {item.label.slice(1)}
              </button>
              {item.options && isOpen && (
                <div className="absolute left-0 top-full mt-0.5 z-30 min-w-[180px] bg-white border border-[#7a7a7a] shadow-md py-0.5 font-['Mulish'] text-[13px] text-[#3d3d3d]">
                  {item.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setOpenIdx(null)}
                      className="block w-full text-left px-3 py-1 hover:bg-[#1f4f8a] hover:text-white"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </header>
  );
}
