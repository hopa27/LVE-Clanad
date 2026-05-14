import { useState } from "react";
import { MdClose, MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

type PolicyRow = {
  policyRef: string;
  planType: string;
  planCode: string;
  surname: string;
  natInsNo: string;
  originalQuote: string;
  status: string;
  premium: string;
  fullName1: string;
  fullName2: string;
};

const POLICIES: PolicyRow[] = [
  {
    policyRef: "233433",
    planType: "FTA",
    planCode: "88",
    surname: "TEST",
    natInsNo: "JK-90-90-90-C",
    originalQuote: "20825118",
    status: "L",
    premium: "£10,000.00",
    fullName1: "Test  Test",
    fullName2: "",
  },
];

const STATUSES = ["Pending", "Completed", "Shelved", "ALL"] as const;
type Status = (typeof STATUSES)[number];

function Radio({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer font-['Mulish'] text-[14px] text-[#3d3d3d] select-none">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-[#006cf4]">
        {checked ? (
          <MdRadioButtonChecked size={18} />
        ) : (
          <MdRadioButtonUnchecked size={18} />
        )}
      </span>
      {label}
    </label>
  );
}

export function FindPolicyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("233433");
  const [status, setStatus] = useState<Status>("ALL");
  const [selected, setSelected] = useState(0);

  if (!open) return null;

  const rec = POLICIES[selected];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[940px] max-w-full max-h-[92vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Find Policy</span>
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
          {/* Search row */}
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1 max-w-[440px]">
              <label className="lve-label">Search For :</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="lve-input"
              />
            </div>

            <fieldset className="border border-[#BBBBBB] rounded-[8px] px-4 pb-3 pt-1">
              <legend className="px-2 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
                Policy Status
              </legend>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {STATUSES.map((s) => (
                  <Radio
                    key={s}
                    label={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                  />
                ))}
              </div>
            </fieldset>
          </div>

          {/* Results grid */}
          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d] min-w-[860px]">
                <thead>
                  <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] uppercase text-[#002f5c]">
                    <th className="px-3 py-3 text-left text-[#005a9c] underline">POLICY_REF</th>
                    <th className="px-3 py-3 text-left">PLANTYPE</th>
                    <th className="px-3 py-3 text-left">PLAN_CODE</th>
                    <th className="px-3 py-3 text-left">SURNAME_1_UPPER</th>
                    <th className="px-3 py-3 text-left">NAT_INS_NO_1</th>
                    <th className="px-3 py-3 text-right">ORIGINALQUOTE</th>
                    <th className="px-3 py-3 text-left">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {POLICIES.map((p, i) => (
                    <tr
                      key={p.policyRef}
                      onClick={() => setSelected(i)}
                      className={`cursor-pointer ${
                        i === selected
                          ? "bg-[#003578] text-white"
                          : i % 2 === 0
                            ? "bg-white hover:bg-[#003578] hover:text-white"
                            : "bg-[#e7ebec34] hover:bg-[#003578] hover:text-white"
                      }`}
                    >
                      <td className="px-3 py-2 text-right">{p.policyRef}</td>
                      <td className="px-3 py-2">{p.planType}</td>
                      <td className="px-3 py-2">{p.planCode}</td>
                      <td className="px-3 py-2">{p.surname}</td>
                      <td className="px-3 py-2">{p.natInsNo}</td>
                      <td className="px-3 py-2 text-right">{p.originalQuote}</td>
                      <td className="px-3 py-2">{p.status}</td>
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 4 - POLICIES.length) }).map(
                    (_, i) => (
                      <tr
                        key={`empty-${i}`}
                        className={i % 2 === 0 ? "bg-[#e7ebec34]" : "bg-white"}
                      >
                        <td className="px-3 py-2">&nbsp;</td>
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2"></td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          <div className="border border-[#BBBBBB] rounded-[8px] p-5 space-y-4 font-['Mulish'] text-[14px] text-[#3d3d3d]">
            <div className="grid grid-cols-[110px_180px_110px_1fr] items-center gap-x-4 gap-y-3">
              <div className="font-bold text-[#4a4a49]">Premium</div>
              <div className="flex h-[36px] items-center justify-end rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-3 cursor-not-allowed">
                {rec?.premium}
              </div>
              <div className="font-bold text-[#4a4a49]">Full Name 1</div>
              <div className="flex h-[36px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-3 cursor-not-allowed">
                {rec?.fullName1}
              </div>

              <div></div>
              <div></div>
              <div className="font-bold text-[#4a4a49]">Full Name 2</div>
              <div className="flex h-[36px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-3 cursor-not-allowed">
                {rec?.fullName2}
              </div>
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-4 items-start">
              <div className="font-bold text-[#4a4a49] pt-2">Cheques Rec</div>
              <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] text-[#002f5c]">
                      <th className="px-3 py-2 text-left">Transfer Company</th>
                      <th className="px-3 py-2 text-left w-[140px]">Date</th>
                      <th className="px-3 py-2 text-right w-[140px]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}
                      >
                        <td className="px-3 py-2">&nbsp;</td>
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
