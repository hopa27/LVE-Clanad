import { useState } from "react";
import { MdClose, MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { usePlanCode, PLAN_CODE_VERSIONS, type PlanCodeVersion } from "../context/PlanCodeContext";

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
};

const POLICIES: PolicyRow[] = [
  { policyRef: "100001",   planType: "CPA", planCode: "1",   surname: "TESTPEBAAAAB",    natInsNo: "",              originalQuote: "965685", status: "N", phPostCode: "",         ifaRef: "HARGR-00",  dob1: "18/04/1948", policyNo: "100001",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Pebaaaab",   fullName2: "" },
  { policyRef: "100002",   planType: "FTA", planCode: "87",  surname: "TESTCBAAAAAC",   natInsNo: "CH-26-10-47-A", originalQuote: "929591", status: "D", phPostCode: "",         ifaRef: "THEM&-005", dob1: "26/10/1947", policyNo: "100002",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Cbaaaaac",  fullName2: "" },
  { policyRef: "100003",   planType: "PPA", planCode: "621", surname: "TESTSEBAAAAD",   natInsNo: "SB-25-07-53-A", originalQuote: "930942", status: "D", phPostCode: "DA99 9AB", ifaRef: "",          dob1: "25/07/1953", policyNo: "100003",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Sebaaaad",   fullName2: "" },
  { policyRef: "100004",   planType: "PPA", planCode: "621", surname: "TESTFRBAAAAE",   natInsNo: "EX-07-01-43-A", originalQuote: "919598", status: "D", phPostCode: "",         ifaRef: "FORUM-00",  dob1: "07/01/1943", policyNo: "100004",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Frbaaaae",   fullName2: "" },
  { policyRef: "100004.1", planType: "PPA", planCode: "621", surname: "TESTFRBAAAAE.B", natInsNo: "EX-07-01-43-A", originalQuote: "919598", status: "D", phPostCode: "QU99 9AB", ifaRef: "",          dob1: "07/01/1943", policyNo: "100004.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Frbaaaae.B", fullName2: "" },
  { policyRef: "100005",   planType: "CPA", planCode: "519", surname: "TESTBIBAAAAF",   natInsNo: "BB-13-08-34-A", originalQuote: "916856", status: "D", phPostCode: "",         ifaRef: "TOWER-02",  dob1: "13/08/1934", policyNo: "100005",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Bibaaaaf",   fullName2: "" },
  { policyRef: "100006",   planType: "CPA", planCode: "51",  surname: "TESTBEBAAAAG",   natInsNo: "BB-28-10-49-A", originalQuote: "925272", status: "L", phPostCode: "QU99 9AB", ifaRef: "ACPFI-001", dob1: "28/10/1949", policyNo: "100006",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Bebaaaag",   fullName2: "" },
  { policyRef: "100007",   planType: "CPA", planCode: "51",  surname: "TESTLNBAAAAH",   natInsNo: "LT-12-01-48-A", originalQuote: "925463", status: "L", phPostCode: "CO99 9AB", ifaRef: "OAKFI-006", dob1: "12/01/1948", policyNo: "100007",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Lnbaaaah",   fullName2: "" },
  { policyRef: "100008",   planType: "CPA", planCode: "51",  surname: "TESTCSBAAAAI",   natInsNo: "CH-03-10-42-A", originalQuote: "922618", status: "D", phPostCode: "RE99 9AB", ifaRef: "",          dob1: "03/10/1942", policyNo: "100008",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Csbaaaai",   fullName2: "" },
  { policyRef: "100008.1", planType: "CPA", planCode: "51",  surname: "TESTCSBAAAAI.B", natInsNo: "CH-03-10-42-A", originalQuote: "922618", status: "D", phPostCode: "",         ifaRef: "WILLI-027", dob1: "03/10/1942", policyNo: "100008.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Csbaaaai.B", fullName2: "" },
  { policyRef: "100009",   planType: "CPA", planCode: "51",  surname: "TESTBSBAAAAJ",   natInsNo: "BB-15-12-47-A", originalQuote: "922132", status: "D", phPostCode: "LE99 9AB", ifaRef: "AAMIN-001", dob1: "15/12/1947", policyNo: "100009",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Bsbaaaaj",   fullName2: "" },
  { policyRef: "100010",   planType: "CPA", planCode: "61a", surname: "TESTHSBAAABA",   natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "L", phPostCode: "EX99 9AB", ifaRef: "",          dob1: "20/01/1943", policyNo: "100010",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaaba",   fullName2: "" },
  { policyRef: "100010.1", planType: "CPA", planCode: "61a", surname: "TESTHSBAAABA.B", natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "L", phPostCode: "",         ifaRef: "CRTOO-001", dob1: "20/01/1943", policyNo: "100010.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaaba.B", fullName2: "" },
  { policyRef: "100011",   planType: "PPA", planCode: "62a", surname: "TESTHSBAAABB",   natInsNo: "YT-26-09-35-A", originalQuote: "926191", status: "D", phPostCode: "",         ifaRef: "HENRY-001", dob1: "26/09/1935", policyNo: "100011",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabb",   fullName2: "" },
  { policyRef: "100011.1", planType: "PPA", planCode: "62a", surname: "TESTHSBAAABB.B", natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "D", phPostCode: "CO99 9AB", ifaRef: "",          dob1: "20/01/1943", policyNo: "100011.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabb.B", fullName2: "" },
  { policyRef: "100012",   planType: "CPA", planCode: "62a", surname: "TESTHSBAAABC",   natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "D", phPostCode: "",         ifaRef: "WILLI-027", dob1: "20/01/1943", policyNo: "100012",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabc",   fullName2: "" },
  { policyRef: "100012.1", planType: "CPA", planCode: "62a", surname: "TESTHSBAAABC.B", natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "D", phPostCode: "",         ifaRef: "CRTOO-001", dob1: "20/01/1943", policyNo: "100012.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabc.B", fullName2: "" },
  { policyRef: "100013",   planType: "FTA", planCode: "84",  surname: "TESTHDBAAABD",   natInsNo: "HA-27-06-49-A", originalQuote: "917616", status: "D", phPostCode: "JA99 9AB", ifaRef: "BANKO-011", dob1: "27/06/1949", policyNo: "100013",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hdbaaabd",   fullName2: "" },
  { policyRef: "100014",   planType: "CPA", planCode: "61a", surname: "TESTCDBAAABE",   natInsNo: "CH-20-02-53-A", originalQuote: "930977", status: "L", phPostCode: "RE99 9AB", ifaRef: "JELFF-001", dob1: "20/02/1953", policyNo: "100014",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Cdbaaabe",   fullName2: "" },
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
  const [search, setSearch] = useState("100001");
  const [status, setStatus] = useState<Status>("ALL");
  const [selected, setSelected] = useState(0);
  const { setPlanCode } = usePlanCode();

  if (!open) return null;

  const rec = POLICIES[selected];

  const versionCodes = PLAN_CODE_VERSIONS.map((v) => v.code) as string[];

  const handleOk = () => {
    if (rec && versionCodes.includes(rec.planCode)) {
      setPlanCode(rec.planCode as PlanCodeVersion);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[1200px] max-w-full max-h-[92vh] flex flex-col">
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
          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
            <div className="overflow-auto max-h-[320px]">
              <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d] min-w-[1160px]">
                <thead>
                  <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] uppercase text-[#002f5c]">
                    <th className="px-3 py-3 text-left text-[#005a9c] underline">POLICY_REF</th>
                    <th className="px-3 py-3 text-left">PLANTYPE</th>
                    <th className="px-3 py-3 text-left">PLAN_CODE</th>
                    <th className="px-3 py-3 text-left">SURNAME_1_UPPER</th>
                    <th className="px-3 py-3 text-left">NAT_INS_NO_1</th>
                    <th className="px-3 py-3 text-right">ORIGINALQUOTE</th>
                    <th className="px-3 py-3 text-left">STATUS</th>
                    <th className="px-3 py-3 text-left">PH_POST_CODE</th>
                    <th className="px-3 py-3 text-left">IFA_REF</th>
                    <th className="px-3 py-3 text-left">DOB_1</th>
                    <th className="px-3 py-3 text-left">POLICY_NO</th>
                    <th className="px-3 py-3 text-left">COCODE</th>
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
                      <td className="px-3 py-2">{p.phPostCode}</td>
                      <td className="px-3 py-2">{p.ifaRef}</td>
                      <td className="px-3 py-2">{p.dob1}</td>
                      <td className="px-3 py-2 text-right">{p.policyNo}</td>
                      <td className="px-3 py-2">{p.cocode}</td>
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 4 - POLICIES.length) }).map(
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
