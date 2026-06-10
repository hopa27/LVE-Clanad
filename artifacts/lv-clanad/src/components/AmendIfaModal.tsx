import { useRef, useState } from "react";
import { MdClose, MdCheck, MdNoteAdd } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

type Ifa = {
  ref: string;
  postCode: string;
  brokerName: string;
  address: [string, string, string, string];
  sibNo: string;
  authorisedBy: string;
  authorisedOn: string;
  ifaPortfolio: boolean;
};

const IFAS: Ifa[] = [
  {
    ref: "PATRI-008",
    postCode: "PE14 8RS",
    brokerName: "Patrick Murphy",
    address: ["LV=", "4 Russell Drive", "Outwell", "Wisbech"],
    sibNo: "110035",
    authorisedBy: "",
    authorisedOn: "",
    ifaPortfolio: true,
  },
];

export function AmendIfaModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [refFilter, setRefFilter] = useState("PATRI-008");
  const [postcodeFilter, setPostcodeFilter] = useState("");
  const [brokerFilter, setBrokerFilter] = useState("");
  const [statuses, setStatuses] = useState({
    authorised: true,
    cancelled: false,
    duplicate: false,
    revoked: false,
  });
  const [selected, setSelected] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const rows = IFAS.filter(
    (i) =>
      (!refFilter || i.ref.toLowerCase().includes(refFilter.toLowerCase())) &&
      (!postcodeFilter ||
        i.postCode.toLowerCase().includes(postcodeFilter.toLowerCase())) &&
      (!brokerFilter ||
        i.brokerName.toLowerCase().includes(brokerFilter.toLowerCase())),
  );
  const current = rows[selected] ?? rows[0];

  const Cb = ({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-[14px] h-[14px] accent-[#006cf4]"
      />
      <span>{label}</span>
    </label>
  );

  const FilterField = ({
    label,
    value,
    onChange,
    width,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    width: number;
  }) => (
    <div className="flex flex-col gap-1" style={{ width }}>
      <span className="font-['Livvic'] font-semibold text-[12px] text-[#0d2c41]">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="lve-input !h-[34px] !text-[13px]"
      />
    </div>
  );

  const Detail = ({
    label,
    children,
    width = 110,
  }: {
    label: string;
    children: React.ReactNode;
    width?: number;
  }) => (
    <div className="flex items-center gap-3">
      <span
        className="font-['Livvic'] font-semibold text-[13px] text-[#0d2c41] text-right"
        style={{ width }}
      >
        {label}
      </span>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby="amend-ifa-title" className="lve-panel bg-white w-[1000px] max-w-full max-h-[90vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span id="amend-ifa-title">IFA Lookup</span>
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

        <div className="lve-panel-body flex flex-col gap-4 overflow-auto">
          {/* Top filter row */}
          <div className="flex items-end gap-3 flex-wrap">
            <FilterField label="IFA Ref." value={refFilter} onChange={setRefFilter} width={120} />
            <FilterField label="Postcode" value={postcodeFilter} onChange={setPostcodeFilter} width={120} />
            <FilterField label="Broker Name" value={brokerFilter} onChange={setBrokerFilter} width={260} />
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm !h-[34px] !min-w-[44px] justify-center"
              title="North West"
            >
              NW
            </button>

            <div className="flex flex-col gap-1 ml-2">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <Cb
                  label="Authorised"
                  checked={statuses.authorised}
                  onChange={(v) => setStatuses({ ...statuses, authorised: v })}
                />
                <Cb
                  label="Cancelled"
                  checked={statuses.cancelled}
                  onChange={(v) => setStatuses({ ...statuses, cancelled: v })}
                />
                <Cb
                  label="Duplicate Record"
                  checked={statuses.duplicate}
                  onChange={(v) => setStatuses({ ...statuses, duplicate: v })}
                />
                <Cb
                  label="Revoked"
                  checked={statuses.revoked}
                  onChange={(v) => setStatuses({ ...statuses, revoked: v })}
                />
              </div>
            </div>

            <div className="ml-auto flex items-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="lve-btn lve-btn-sm !h-[34px]"
              >
                <MdCheck size={16} />
                <span>OK</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="lve-btn lve-btn-secondary lve-btn-sm !h-[34px]"
              >
                <MdClose size={16} />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                className="lve-btn lve-btn-secondary lve-btn-sm !h-[34px]"
              >
                <MdNoteAdd size={16} />
                <span>New</span>
              </button>
            </div>
          </div>

          {/* Data grid */}
          <div className="overflow-auto" role="grid" aria-label="IFA results grid" aria-rowcount={rows.length} style={{ maxHeight: 240 }}>
            <table className="lve-grid">
              <thead>
                <tr>
                  <th style={{ width: 140 }}>IFA_REF</th>
                  <th style={{ width: 140 }}>POST_CODE</th>
                  <th>BROKER_NAME</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.ref}
                    onClick={() => setSelected(i)}
                    role="row"
                    aria-rowindex={i + 1}
                    style={{
                      cursor: "pointer",
                      ...(i === selected
                        ? { background: "#002f5c", color: "#ffffff" }
                        : {}),
                    }}
                  >
                    <td style={i === selected ? { color: "#ffffff" } : undefined}>
                      {r.ref}
                    </td>
                    <td style={i === selected ? { color: "#ffffff" } : undefined}>
                      {r.postCode}
                    </td>
                    <td style={i === selected ? { color: "#ffffff" } : undefined}>
                      {r.brokerName}
                    </td>
                  </tr>
                ))}
                {Array.from({ length: Math.max(0, 6 - rows.length) }).map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amendable Details */}
          <fieldset className="border border-[#BBBBBB] rounded-[8px] px-4 pt-2 pb-4">
            <legend className="px-2 font-['Livvic'] font-semibold text-[13px] text-[#0d2c41]">
              Amendable Details
            </legend>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-1">
              <div className="flex flex-col gap-2">
                <Detail label="Address:">
                  <input
                    type="text"
                    defaultValue={current?.address[0] ?? ""}
                    className="lve-input !h-[34px] !text-[13px] flex-1"
                  />
                </Detail>
                <Detail label="">
                  <input
                    type="text"
                    defaultValue={current?.address[1] ?? ""}
                    className="lve-input !h-[34px] !text-[13px] flex-1"
                  />
                </Detail>
                <Detail label="">
                  <input
                    type="text"
                    defaultValue={current?.address[2] ?? ""}
                    className="lve-input !h-[34px] !text-[13px] flex-1"
                  />
                </Detail>
                <Detail label="">
                  <input
                    type="text"
                    defaultValue={current?.address[3] ?? ""}
                    className="lve-input !h-[34px] !text-[13px] flex-1"
                  />
                </Detail>
                <Detail label="Post Code:">
                  <input
                    type="text"
                    defaultValue={current?.postCode ?? ""}
                    className="lve-input !h-[34px] !text-[13px] !w-[160px]"
                  />
                </Detail>
              </div>
              <div className="flex flex-col gap-2">
                <Detail label="SIB No:" width={120}>
                  <input
                    type="text"
                    defaultValue={current?.sibNo ?? ""}
                    className="lve-input !h-[34px] !text-[13px] !w-[200px]"
                  />
                </Detail>
                <Detail label="Authorised By:" width={120}>
                  <input
                    type="text"
                    defaultValue={current?.authorisedBy ?? ""}
                    className="lve-input !h-[34px] !text-[13px] flex-1"
                  />
                </Detail>
                <Detail label="Authorised On:" width={120}>
                  <input
                    type="text"
                    defaultValue={current?.authorisedOn ?? ""}
                    className="lve-input !h-[34px] !text-[13px] flex-1"
                  />
                </Detail>
                <Detail label="" width={120}>
                  <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#7a7a7a]">
                    <input
                      type="checkbox"
                      defaultChecked={current?.ifaPortfolio ?? false}
                      disabled
                      className="w-[14px] h-[14px] accent-[#006cf4]"
                    />
                    <span>IFA Portfolio</span>
                  </label>
                </Detail>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
