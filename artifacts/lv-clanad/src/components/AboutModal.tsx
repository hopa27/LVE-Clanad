import { MdClose } from "react-icons/md";
import lvLogo from "../assets/lv-logo.png";

export function AboutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[760px] max-w-full">
        <header className="lve-panel-header flex items-center justify-between">
          <span>About</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body">
          <div className="grid grid-cols-[220px_1fr] gap-6">
            {/* Left: Clanad branding panel */}
            <div className="bg-[#e8e8e8] border border-[#BBBBBB] rounded-[4px] flex flex-col items-center justify-between py-5 px-3 min-h-[320px]">
              <div className="font-['Livvic'] text-[#178830] italic text-[14px] text-center font-semibold leading-tight">
                Annuity Administration System
              </div>
              <div
                className="font-['Livvic'] text-[#178830] font-bold tracking-wider"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "56px",
                  letterSpacing: "0.15em",
                }}
              >
                Clanad
              </div>
              <img src={lvLogo} alt="LV=" className="h-10 mt-3" />
            </div>

            {/* Right: details */}
            <div className="flex flex-col">
              <div className="text-center mb-6">
                <div className="font-['Livvic'] text-[22px] text-[#005a9c] font-medium leading-tight">
                  Client Annuity Administration System
                </div>
                <div className="font-['Livvic'] text-[20px] text-[#005a9c] font-medium leading-tight">
                  Version 2.0.153.303
                </div>
              </div>

              <div className="font-['Mulish'] text-[14px] text-[#3d3d3d] space-y-2">
                <div className="grid grid-cols-[150px_1fr] gap-3">
                  <span className="text-right font-bold text-[#4a4a49]">
                    Executable:
                  </span>
                  <span>\\whynvap13\UAT\Anad96\Exe\Clanad.exe</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] gap-3">
                  <span className="text-right font-bold text-[#4a4a49]">
                    Working directory:
                  </span>
                  <span>H:\</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] gap-3">
                  <span className="text-right font-bold text-[#4a4a49]">
                    Environment:
                  </span>
                  <span>BDE is not used</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] gap-3">
                  <span className="text-right font-bold text-[#4a4a49]">
                    User:
                  </span>
                  <span>UAT3</span>
                </div>
                <div className="grid grid-cols-[150px_1fr] gap-3">
                  <span className="text-right font-bold text-[#4a4a49]">
                    Workstation:
                  </span>
                  <span>WHYNVCX16</span>
                </div>
              </div>

              <div className="mt-6 font-['Mulish'] text-[14px] text-[#3d3d3d] space-y-1">
                <div>Windows NT 5.2 (Build 3790: Service Pack 2)</div>
                <div>Memory available to Windows: 2,097,152 KB</div>
              </div>

              <div className="flex justify-end items-center gap-3 mt-6">
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary lve-btn-sm min-w-[110px] justify-center"
                >
                  Copy To Clip
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary lve-btn-sm min-w-[80px] justify-center"
                >
                  email
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="lve-btn lve-btn-sm min-w-[80px] justify-center"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
