import { useMemo, useState } from "react";
import { MdClose, MdSearch } from "react-icons/md";

export type PlanCode = {
  code: string;
  description: string;
  planType: string;
};

export const PLAN_CODES: PlanCode[] = [
  { code: "51",  description: "Compulsory Purchase Annuity",        planType: "CPA" },
  { code: "61a", description: "Compulsory Purchase - Annual",       planType: "CPA" },
  { code: "61i", description: "Compulsory Purchase - Income",       planType: "CPA" },
  { code: "62a", description: "Purchased Annuity - Annual",         planType: "PPA" },
  { code: "87",  description: "Fixed Term Annuity",                 planType: "FTA" },
  { code: "88",  description: "Fixed Term Annuity (With Profit)",   planType: "FTA" },
  { code: "519", description: "Compulsory Purchase - Legacy",       planType: "CPA" },
  { code: "621", description: "Purchased Pension Annuity",          planType: "PPA" },
];

export function PlanCodeSearchModal({
  open,
  current,
  onClose,
  onSelect,
}: {
  open: boolean;
  current: string;
  onClose: () => void;
  onSelect: (code: PlanCode) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string>(current);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PLAN_CODES;
    return PLAN_CODES.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.planType.toLowerCase().includes(q),
    );
  }, [search]);

  if (!open) return null;

  const handleOk = () => {
    const picked = PLAN_CODES.find((p) => p.code === selected);
    if (picked) onSelect(picked);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[640px] max-w-full max-h-[92vh] flex flex-col">
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
          <div>
            <label className="lve-label">Search For :</label>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="lve-input pr-10"
                placeholder="Code, description or plan type"
              />
              <span className="absolute inset-y-0 right-3 inline-flex items-center text-[#006cf4]">
                <MdSearch size={20} />
              </span>
            </div>
          </div>

          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
            <div className="overflow-auto max-h-[320px]">
              <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d] min-w-[560px]">
                <thead>
                  <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] uppercase text-[#002f5c]">
                    <th className="px-3 py-3 text-left text-[#005a9c] underline">PLAN_CODE</th>
                    <th className="px-3 py-3 text-left">PLAN_TYPE</th>
                    <th className="px-3 py-3 text-left">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p, i) => (
                    <tr
                      key={p.code}
                      onClick={() => setSelected(p.code)}
                      onDoubleClick={() => {
                        setSelected(p.code);
                        onSelect(p);
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
                      <td className="px-3 py-2">{p.code}</td>
                      <td className="px-3 py-2">{p.planType}</td>
                      <td className="px-3 py-2">{p.description}</td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr className="bg-white">
                      <td colSpan={3} className="px-3 py-6 text-center text-[#6a6a6a]">
                        No plan codes match "{search}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
              disabled={!selected}
              className="lve-btn lve-btn-sm min-w-[100px] justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
