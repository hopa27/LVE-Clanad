import { useState } from "react";
import { MdClose } from "react-icons/md";
import {
  PLAN_CODE_VERSIONS,
  type PlanCodeVersion,
} from "../context/PlanCodeContext";

export function PlanCodeSearchModal({
  open,
  current,
  onClose,
  onSelect,
}: {
  open: boolean;
  current: PlanCodeVersion;
  onClose: () => void;
  onSelect: (code: PlanCodeVersion) => void;
}) {
  const [selected, setSelected] = useState<PlanCodeVersion>(current);

  if (!open) return null;

  const handleOk = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[560px] max-w-full max-h-[92vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Plan Code Search</span>
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

        <div className="lve-panel-body overflow-auto flex flex-col gap-5">
          <p className="font-['Mulish'] text-[13px] text-[#3d3d3d]">
            Select a plan code to switch the version of the application. Each
            plan code determines which controls are available to the user.
          </p>

          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
            <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d]">
              <thead>
                <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] uppercase text-[#002f5c]">
                  <th className="px-3 py-3 text-left text-[#005a9c] underline w-[120px]">PLAN_CODE</th>
                  <th className="px-3 py-3 text-left w-[120px]">PLAN_TYPE</th>
                  <th className="px-3 py-3 text-left">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_CODE_VERSIONS.map((p, i) => (
                  <tr
                    key={p.code}
                    onClick={() => setSelected(p.code)}
                    onDoubleClick={() => {
                      setSelected(p.code);
                      onSelect(p.code);
                      onClose();
                    }}
                    className={`cursor-pointer ${
                      p.code === selected
                        ? "bg-[#003578] text-white"
                        : i % 2 === 0
                          ? "bg-white hover:bg-[#003578] hover:text-white"
                          : "bg-[#e7ebec34] hover:bg-[#003578] hover:text-white"
                    }`}
                  >
                    <td className="px-3 py-2 font-semibold">{p.code}</td>
                    <td className="px-3 py-2">{p.planType}</td>
                    <td className="px-3 py-2">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-secondary lve-btn-sm min-w-[100px] justify-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOk}
              className="lve-btn lve-btn-sm min-w-[100px] justify-center"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
