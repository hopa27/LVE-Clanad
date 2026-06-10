import { useRef, useState } from "react";
import { MdClose, MdCheck } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

type Company = {
  names: string[];
  address: string[];
  postcode: string;
  telephone: string;
  fax: string;
  email: string;
  website: string;
  ourContact: string;
  theirContact: string;
};

const COMPANIES: Company[] = [
  {
    names: [
      "Liverpool Victoria Friendly Society Limited",
      "Liverpool Victoria Friendly Society Limited",
      "LV=",
    ],
    address: ["Keynes House", "Tilehouse Street", "Hitchin", "Herts"],
    postcode: "SG5 2DX",
    telephone: "08001691111",
    fax: "08702430078",
    email: "",
    website: "",
    ourContact: "",
    theirContact: "",
  },
];

function DetailLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['Livvic'] font-semibold text-[12px] uppercase tracking-wide text-[#0d2c41]">
      {children}
    </div>
  );
}

function DetailValue({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-['Mulish'] text-[13px] text-[#3d3d3d] min-h-[18px]">
      {children || "\u00A0"}
    </div>
  );
}

export function CompanySelectionModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect?: (companyName: string) => void;
}) {
  const [selected, setSelected] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const c = COMPANIES[selected];
  const primaryName = c?.names[0] ?? "";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby="company-selection-title" className="lve-panel bg-white w-[820px] max-w-full max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span id="company-selection-title">Company Selection</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto flex flex-col gap-5">
          {/* List */}
          <div>
            <div className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41] mb-2">
              Select a Company From The List Below
            </div>
            <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
              <div className="max-h-[200px] overflow-auto">
                <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d]">
                  <tbody>
                    {COMPANIES.map((co, i) => {
                      const isSel = i === selected;
                      return (
                        <tr
                          key={i}
                          onClick={() => setSelected(i)}
                          className={`cursor-pointer border-b border-[#e5e5e5] last:border-b-0 ${
                            isSel
                              ? "bg-[#003578] text-white"
                              : "bg-white hover:bg-[#e7ebec34]"
                          }`}
                        >
                          <td className="px-3 py-2">{co.names[0]}</td>
                        </tr>
                      );
                    })}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <tr
                        key={`blank-${i}`}
                        className="bg-white border-b border-[#e5e5e5] last:border-b-0"
                      >
                        <td className="px-3 py-2">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41] mb-2">
              Company Details
            </div>
            <div className="border border-[#BBBBBB] rounded-[8px] p-5 grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex gap-4">
                <div className="w-[88px] shrink-0">
                  <DetailLabel>Names</DetailLabel>
                </div>
                <div className="flex flex-col">
                  {c.names.map((n, i) => (
                    <DetailValue key={i}>{n}</DetailValue>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[96px] shrink-0 flex flex-col gap-4">
                  <DetailLabel>Telephone</DetailLabel>
                  <DetailLabel>Fax</DetailLabel>
                </div>
                <div className="flex flex-col gap-4">
                  <DetailValue>{c.telephone}</DetailValue>
                  <DetailValue>{c.fax}</DetailValue>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[88px] shrink-0">
                  <DetailLabel>Address</DetailLabel>
                </div>
                <div className="flex flex-col">
                  {c.address.map((a, i) => (
                    <DetailValue key={i}>{a}</DetailValue>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[96px] shrink-0 flex flex-col gap-4">
                  <DetailLabel>Email</DetailLabel>
                  <DetailLabel>Web Site</DetailLabel>
                </div>
                <div className="flex flex-col gap-4">
                  <DetailValue>{c.email}</DetailValue>
                  <DetailValue>{c.website}</DetailValue>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[88px] shrink-0">
                  <DetailLabel>Postcode</DetailLabel>
                </div>
                <div className="flex flex-col">
                  <DetailValue>{c.postcode}</DetailValue>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-[96px] shrink-0 flex flex-col gap-4">
                  <DetailLabel>Our Contact</DetailLabel>
                  <DetailLabel>Their Contact</DetailLabel>
                </div>
                <div className="flex flex-col gap-4">
                  <DetailValue>{c.ourContact}</DetailValue>
                  <DetailValue>{c.theirContact}</DetailValue>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                onSelect?.(primaryName);
                onClose();
              }}
              className="lve-btn lve-btn-sm min-w-[100px] justify-center"
            >
              <MdCheck size={16} />
              OK
            </button>
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-secondary lve-btn-sm min-w-[100px] justify-center"
            >
              <MdClose size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
