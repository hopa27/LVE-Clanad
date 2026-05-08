import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";

const COMPANIES = ["Liverpool Victoria Friendly Society Limited"];

const DETAILS = {
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
  webSite: "",
  ourContact: "",
  theirContact: "",
};

export function CompanySelectionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState(0);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[920px] max-w-full max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Company Selection</span>
          <button
            type="button"
            className="text-white/80 hover:text-white"
            onClick={onClose}
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto space-y-4">
          <div>
            <h4 className="font-['Livvic'] text-[13px] font-semibold text-[#3d3d3d] mb-1">
              Select a Company From The List Below
            </h4>
            <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
              <ul className="max-h-[180px] overflow-auto font-['Mulish'] text-[14px] text-[#3d3d3d]">
                {COMPANIES.map((c, i) => (
                  <li
                    key={c}
                    onClick={() => setSelected(i)}
                    className={`px-3 py-2 cursor-pointer ${
                      i === selected
                        ? "bg-[#006cf4] text-white"
                        : "hover:bg-[#eaf5f8]"
                    }`}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-['Livvic'] text-[13px] font-semibold text-[#3d3d3d] mb-1">
              Company Details
            </h4>
            <div className="border border-[#BBBBBB] rounded-[8px] p-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 font-['Mulish'] text-[14px] text-[#3d3d3d]">
              <DetailRow label="NAMES">
                {DETAILS.names.map((n, i) => (
                  <div key={i}>{n}</div>
                ))}
              </DetailRow>

              <DetailRow label="TELEPHONE" inline>
                {DETAILS.telephone}
              </DetailRow>

              <DetailRow label="ADDRESS">
                {DETAILS.address.map((a, i) => (
                  <div key={i}>{a}</div>
                ))}
              </DetailRow>

              <div className="space-y-2">
                <DetailRow label="FAX" inline>
                  {DETAILS.fax}
                </DetailRow>
                <DetailRow label="EMAIL" inline>
                  {DETAILS.email}
                </DetailRow>
                <DetailRow label="WEB SITE" inline>
                  {DETAILS.webSite}
                </DetailRow>
              </div>

              <DetailRow label="POSTCODE" inline>
                {DETAILS.postcode}
              </DetailRow>

              <div className="space-y-2">
                <DetailRow label="OUR CONTACT" inline>
                  {DETAILS.ourContact}
                </DetailRow>
                <DetailRow label="THEIR CONTACT" inline>
                  {DETAILS.theirContact}
                </DetailRow>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button type="button" className="lve-btn" onClick={onClose}>
              <MdCheck size={16} />
              OK
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary"
              onClick={onClose}
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

function DetailRow({
  label,
  inline = false,
  children,
}: {
  label: string;
  inline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={inline ? "flex items-baseline gap-3" : "flex gap-3"}>
      <div className="font-['Livvic'] font-bold text-[#3d3d3d] w-[110px] shrink-0">
        {label}
      </div>
      <div className="flex-1 text-[#3d3d3d]">{children}</div>
    </div>
  );
}
