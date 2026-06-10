import { useState } from "react";
import { MdClose, MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { usePlanCode, PLAN_CODE_VERSIONS, type PlanCodeVersion } from "../context/PlanCodeContext";

type ChequeRow = { company: string; date: string; amount: string };

type PolicyRow = {
  policyRef: string;
  planType: string;
  planCode: string;
  surname: string;
  natInsNo: string;
  originalQuote: string;
  status: string;
  phPostCode: string;
  ifaRef: string;
  dob1: string;
  policyNo: string;
  cocode: string;
  premium: string;
  fullName1: string;
  fullName2: string;
  cheques?: ChequeRow[];
};

const POLICIES: PolicyRow[] = [
  { policyRef: "dbePolNo", planType: "master", planCode: "0",   surname: "Master",       natInsNo: "",              originalQuote: "965685",   status: "N", phPostCode: "",         ifaRef: "HARGR-00",  dob1: "18/04/1948", policyNo: "dbePolNo", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Pebaaaab",   fullName2: "" },
  { policyRef: "233451",   planType: "FTA",    planCode: "87",  surname: "UGGIU",         natInsNo: "JK-90-90-90-C", originalQuote: "20825226", status: "P", phPostCode: "OP9 0OP",  ifaRef: "OAKWO-01",  dob1: "09/09/1956", policyNo: "233451",   cocode: "STALW-00", premium: "£100,000.00", fullName1: "Test  Uggiu",       fullName2: "" },
  { policyRef: "111834",   planType: "PRP",    planCode: "84",  surname: "TESTPTBBBIDE",  natInsNo: "PK-25-10-58-A", originalQuote: "2139419",  status: "L", phPostCode: "ZE99 9AB", ifaRef: "LIFET-015", dob1: "25/10/1958", policyNo: "111834",   cocode: "STALW-00", premium: "£20,348.97", fullName1: "Rachael Colin Testptbbbide", fullName2: "", cheques: [{ company: "FPMS Gladis PYMTS", date: "25/03/2010", amount: "£24,064.73" }, { company: "Axa Sun Life PLC", date: "31/03/2010", amount: "£3,067.23" }] },
  { policyRef: "227813",   planType: "MCP",    planCode: "90",  surname: "TESTCTCCHIBD",  natInsNo: "CH-10-05-59-A", originalQuote: "25027464", status: "L", phPostCode: "KI99 9AB", ifaRef: "ROTHM-00",  dob1: "10/05/1959", policyNo: "227813",   cocode: "STALW-00", premium: "£3,021.57",  fullName1: "Belinda Testctcchibd",      fullName2: "", cheques: [{ company: "NM PENSIONS TRUSTE   MCP227813   BGCFrom:", date: "01/07/2025", amount: "£3,021.57" }] },
  { policyRef: "100188",   planType: "CPA",    planCode: "51",  surname: "TESTSUBAABII",  natInsNo: "SB-31-01-56-A", originalQuote: "927657",   status: "Q", phPostCode: "LE99 9AB", ifaRef: "FIRTH-001", dob1: "31/01/1956", policyNo: "100188",   cocode: "STALW-00", premium: "£8,940.65",  fullName1: "Simon Simon Testsubaabii",  fullName2: "", cheques: [{ company: "Zurich Assurance Ltd.", date: "28/01/2008", amount: "£8,940.65" }] },
  { policyRef: "111081",   planType: "PRP",    planCode: "80",  surname: "TESTKRBBBAIB",  natInsNo: "KB-01-02-48-A", originalQuote: "2079105",  status: "M", phPostCode: "OL99 9AB", ifaRef: "TRUEP-001", dob1: "01/02/1948", policyNo: "111081",   cocode: "STALW-00",  premium: "£30,907.56", fullName1: "Belinda Testkrbbbaib",      fullName2: "", cheques: [{ company: "GUARDIAN ASSURANCE", date: "25/02/2010", amount: "£28,079.50" }, { company: "LEGAL AND GENERAL", date: "26/02/2010", amount: "£13,130.57" }, { company: "LV=", date: "19/03/2013", amount: "-£28,079.50" }, { company: "LV=", date: "19/03/2013", amount: "-£13,130.57" }] },
  { policyRef: "116444",   planType: "PRP",    planCode: "82",  surname: "TESTTRBBGEEE",  natInsNo: "TE-11-05-55-A", originalQuote: "2479583",  status: "S", phPostCode: "QU99 9AB", ifaRef: "READL-001", dob1: "11/05/1955", policyNo: "116444",   cocode: "STALW-001", premium: "£21,391.53", fullName1: "Petula  Testtrbbgeee",      fullName2: "", cheques: [{ company: "Scottish Equitable", date: "26/10/2010", amount: "£21,391.53" }] },
  { policyRef: "166092",   planType: "PRP",    planCode: "83",  surname: "TESTENBGGAJC",  natInsNo: "EA-06-07-50-A", originalQuote: "10578050", status: "W", phPostCode: "VE99 9AB", ifaRef: "TAYLO-062", dob1: "06/07/1950", policyNo: "166092",   cocode: "STALW-00", premium: "£75,459.46", fullName1: "Simon  Testenbggajc",       fullName2: "", cheques: [{ company: "NM PENSION TRUST", date: "21/08/2015", amount: "£75,459.46" }] },
  { policyRef: "100004.1", planType: "PPA",    planCode: "621", surname: "TESTFRBAAAAE.B", natInsNo: "EX-07-01-43-A", originalQuote: "919598",   status: "I", phPostCode: "QU99 9AB", ifaRef: "FORUM-00",  dob1: "07/01/1943", policyNo: "100004.1", cocode: "STALW-00", premium: "£39,911.31", fullName1: "Michael  Testfrbaaaae.b", fullName2: "Testgebaaaae.b" },
  { policyRef: "100180",   planType: "ICFP",   planCode: "76",  surname: "TESTSLBAABIA",   natInsNo: "SB-04-02-15-A", originalQuote: "938688",   status: "D", phPostCode: "",         ifaRef: "SBTYL-004", dob1: "04/02/1915", policyNo: "100180",   cocode: "STALW-00", premium: "£43,962.00", fullName1: "Colin  Testslbaabia",       fullName2: "", cheques: [{ company: "MR C SNASHALL", date: "18/01/2008", amount: "£43,962.00" }] },
  { policyRef: "118106",   planType: "PPA",    planCode: "62a", surname: "TESTCSBBIBAG",   natInsNo: "CH-30-11-51-A", originalQuote: "2684095",  status: "C", phPostCode: "LE99 9AB", ifaRef: "HARGR-001", dob1: "30/11/1951", policyNo: "118106",   cocode: "STALW-00",  premium: "£108,570.00", fullName1: "Gordon  Testcsbbibag",   fullName2: "" },
  { policyRef: "100303",   planType: "CPA",    planCode: "611", surname: "TESTSSBAADAD",   natInsNo: "SB-25-11-44-A", originalQuote: "948258",   status: "N", phPostCode: "RE99 9AB", ifaRef: "INDEP-088", dob1: "25/11/1944", policyNo: "100303",   cocode: "STALW-001", premium: "£3,670.56", fullName1: "Ian Colin Testssbaadad", fullName2: "Justine Diana Testssbaadad" },
  { policyRef: "100118",   planType: "PPA",    planCode: "52",  surname: "",               natInsNo: "",              originalQuote: "922450",   status: "X", phPostCode: "",         ifaRef: "KNOWL-00",  dob1: "07/04/1953", policyNo: "100118",   cocode: "STALW-001", premium: "£32,402.98", fullName1: "", fullName2: "" },
  { policyRef: "102929.1", planType: "CPA",    planCode: "61a", surname: "TESTMHBACJCJ.B", natInsNo: "MW-25-08-43-A", originalQuote: "1135311",  status: "E", phPostCode: "VE99 9AB", ifaRef: "POSIT-053", dob1: "25/08/1943", policyNo: "102929.1", cocode: "STALW-001", premium: "£6,803.69", fullName1: "Gordon  Testmhbacjcj.b", fullName2: "Gordon  Testmhbacjcj.b" },
  { policyRef: "101873",   planType: "ICFP",   planCode: "76z", surname: "TESTKYBABIAHD",   natInsNo: "KB-02-02-20-A", originalQuote: "1030695",  status: "Z", phPostCode: "",         ifaRef: "QUOTE-00",  dob1: "02/02/1920", policyNo: "101873",   cocode: "STALW-00",  premium: "£63,697.99", fullName1: "Michael Testkybabihd", fullName2: "", cheques: [{ company: "Stuart L Kinsey", date: "26/06/2008", amount: "£21,232.66" }, { company: "Martin L Kinsey", date: "26/06/2008", amount: "£21,232.67" }, { company: "MT & Mrs Blakekey", date: "26/06/2008", amount: "£21,232.66" }] },
];

const STATUSES = ["Pending", "Completed", "Shelved", "ALL"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_CODES: Record<Status, Set<string> | null> = {
  Pending:   new Set(["P"]),
  Completed: new Set(["L"]),
  Shelved:   new Set(["N", "X"]),
  ALL:       null,
};

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

type ColumnKey =
  | "policyRef"
  | "planType"
  | "planCode"
  | "surname"
  | "natInsNo"
  | "originalQuote"
  | "status"
  | "phPostCode"
  | "ifaRef"
  | "dob1"
  | "policyNo"
  | "cocode";

const PLAN0_VISIBLE = new Set<ColumnKey>(["policyRef", "planType", "planCode", "surname"]);

const COLUMNS: { key: ColumnKey; label: string; align?: "left" | "right" }[] = [
  { key: "policyRef",     label: "POLICY_REF",      align: "right" },
  { key: "planType",      label: "PLANTYPE" },
  { key: "planCode",      label: "PLAN_CODE" },
  { key: "surname",       label: "SURNAME_1_UPPER" },
  { key: "natInsNo",      label: "NAT_INS_NO_1" },
  { key: "originalQuote", label: "ORIGINALQUOTE",   align: "right" },
  { key: "status",        label: "STATUS" },
  { key: "phPostCode",    label: "PH_POST_CODE" },
  { key: "ifaRef",        label: "IFA_REF" },
  { key: "dob1",          label: "DOB_1" },
  { key: "policyNo",      label: "POLICY_NO",       align: "right" },
  { key: "cocode",        label: "COCODE" },
];

export function FindPolicyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>("ALL");
  const [selected, setSelected] = useState(0);
  const [searchColumn, setSearchColumn] = useState<ColumnKey>("policyRef");
  const { setPlanCode, setSurname, setPolicyRef } = usePlanCode();

  if (!open) return null;

  const placeholder = POLICIES[0]?.[searchColumn] ?? "";
  const q = search.trim().toLowerCase();
  const allowedStatuses = STATUS_CODES[status];
  const filtered = POLICIES.filter((p) => {
    const textMatch = !q || String(p[searchColumn] ?? "").toLowerCase().includes(q);
    const statusMatch = allowedStatuses === null || allowedStatuses.has(p.status);
    return textMatch && statusMatch;
  });

  const rec = filtered[selected] ?? filtered[0];

  const versionCodes = PLAN_CODE_VERSIONS.map((v) => v.code) as string[];

  const handleOk = () => {
    if (rec && versionCodes.includes(rec.planCode)) {
      setPlanCode(rec.planCode as PlanCodeVersion);
    }
    if (rec) {
      setSurname(rec.surname);
      setPolicyRef(rec.policyRef);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[1200px] max-w-full h-[96vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Find Policy</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto flex flex-col gap-4 flex-1 min-h-0">
          {/* Search row */}
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1 max-w-[440px]">
              <label className="lve-label">Search For :</label>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelected(0);
                }}
                placeholder={String(placeholder)}
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
                    onChange={() => { setStatus(s); setSelected(0); }}
                  />
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2 pb-1">
              <button
                type="button"
                onClick={handleOk}
                className="lve-btn lve-btn-sm min-w-[100px] justify-center"
              >
                OK
              </button>
              <button
                type="button"
                onClick={onClose}
                className="lve-btn lve-btn-secondary lve-btn-sm min-w-[100px] justify-center"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Results grid */}
          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden flex-1 min-h-[200px] flex flex-col">
            <div className="overflow-auto flex-1">
              <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d] min-w-[1160px] border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-white font-['Livvic'] font-semibold text-[13px] uppercase text-[#002f5c]">
                    {COLUMNS.map((c) => {
                      const active = c.key === searchColumn;
                      return (
                        <th
                          key={c.key}
                          onClick={() => {
                            setSearchColumn(c.key);
                            setSearch("");
                            setSelected(0);
                          }}
                          className={`px-3 py-3 cursor-pointer select-none border-t-[3px] border-b-[3px] border-[#04589b] ${
                            c.align === "right" ? "text-right" : "text-left"
                          } ${
                            active
                              ? "bg-[#eaf5f8] text-[#005a9c] underline"
                              : "text-[#005a9c] hover:bg-[#f4f9fb]"
                          }`}
                        >
                          {c.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={p.policyRef}
                      onClick={() => setSelected(i)}
                      onDoubleClick={() => {
                        setSelected(i);
                        if (versionCodes.includes(p.planCode)) {
                          setPlanCode(p.planCode as PlanCodeVersion);
                        }
                        setSurname(p.surname);
                        setPolicyRef(p.policyRef);
                        onClose();
                      }}
                      className={`cursor-pointer ${
                        i === selected
                          ? "bg-[#003578] text-white"
                          : i % 2 === 0
                            ? "bg-white hover:bg-[#003578] hover:text-white"
                            : "bg-[#e7ebec34] hover:bg-[#003578] hover:text-white"
                      }`}
                    >
                      {COLUMNS.map((c) => (
                        <td
                          key={c.key}
                          className={`px-3 py-2 ${
                            c.align === "right" ? "text-right" : ""
                          }`}
                        >
                          {p.planCode === "0" && !PLAN0_VISIBLE.has(c.key) ? "" : p[c.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 5 - filtered.length) }).map(
                    (_, i) => (
                      <tr
                        key={`empty-${i}`}
                        className={i % 2 === 0 ? "bg-[#e7ebec34]" : "bg-white"}
                      >
                        {Array.from({ length: 12 }).map((__, j) => (
                          <td key={j} className="px-3 py-2">
                            {j === 0 ? "\u00A0" : ""}
                          </td>
                        ))}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          <div className="border border-[#BBBBBB] rounded-[8px] p-3 space-y-2 font-['Mulish'] text-[13px] text-[#3d3d3d] shrink-0">
            <div className="grid grid-cols-[90px_160px_90px_1fr_90px_1fr] items-center gap-x-3 gap-y-2">
              <div className="font-bold text-[#4a4a49]">Premium</div>
              <div className="flex h-[28px] items-center justify-end rounded-[6px] border border-[#ACACAC] bg-[#CCCCCC] px-2 cursor-not-allowed">
                {rec?.planCode !== "0" ? rec?.premium : ""}
              </div>
              <div className="font-bold text-[#4a4a49]">Full Name 1</div>
              <div className="flex h-[28px] items-center rounded-[6px] border border-[#ACACAC] bg-[#CCCCCC] px-2 cursor-not-allowed">
                {rec?.planCode !== "0" ? rec?.fullName1 : ""}
              </div>
              <div className="font-bold text-[#4a4a49]">Full Name 2</div>
              <div className="flex h-[28px] items-center rounded-[6px] border border-[#ACACAC] bg-[#CCCCCC] px-2 cursor-not-allowed">
                {rec?.planCode !== "0" ? rec?.fullName2 : ""}
              </div>
            </div>

            <div className="grid grid-cols-[90px_1fr] gap-3 items-start">
              <div className="font-bold text-[#4a4a49] pt-1">Cheques Rec</div>
              <div className="border border-[#BBBBBB] rounded-[6px] overflow-y-auto h-[96px]">
                <table className="w-full text-[12px]">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-white border-y-[2px] border-[#04589b] font-['Livvic'] font-semibold text-[12px] text-[#002f5c]">
                      <th className="px-2 py-1 text-left">Transfer Company</th>
                      <th className="px-2 py-1 text-left w-[140px]">Date</th>
                      <th className="px-2 py-1 text-right w-[140px]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(rec?.cheques ?? []).map((c, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}
                      >
                        <td className="px-2 py-1">{c.company}</td>
                        <td className="px-2 py-1">{c.date}</td>
                        <td className="px-2 py-1 text-right">{c.amount}</td>
                      </tr>
                    ))}
                    {rec?.planCode !== "0" && Array.from({ length: Math.max(0, 3 - (rec?.cheques?.length ?? 0)) }).map((_, i) => (
                      <tr
                        key={`pad-${i}`}
                        className={(( (rec?.cheques?.length ?? 0) + i) % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]")}
                      >
                        <td className="px-2 py-1">&nbsp;</td>
                        <td className="px-2 py-1"></td>
                        <td className="px-2 py-1"></td>
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
