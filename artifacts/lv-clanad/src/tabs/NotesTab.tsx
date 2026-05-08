import { Section } from "../components/Field";
import {
  MdAdd,
  MdRemove,
  MdEdit,
  MdAccessTime,
  MdPerson,
} from "react-icons/md";

const NOTES = [
  {
    author: "Alice Oldacre", date: "13/03/2025 12:22",
    body: `ORIGINALLY 225762\nTask – New business app\nVetting done\ntracesmart and sira passed`,
  },
  {
    author: "Tayla Annon-Batson", date: "19/03/2025 09:19",
    body: `IFA CALLED\nID&V COMPLETE\nWANTED UPDATE ON TRANSFER\nCONFIRMED IT WAS PUT OOS AND THEY REQUESTED PAPER TRANSFER SO WE SENT IRF FORMS ON 14/03`,
  },
  {
    author: "James Males", date: "22/04/2025 13:26",
    body: `IFA called - ID&V verified\nCalled as they wanted an update on the transfer as Pru have said they haven't rec'd a request\nI checked this has not been requested on Origo - I have requested the transfer now\nI have also requote on current rate and rate the application was rec'd with due to LV= delays and emailed to IFA with WP FTA dec`,
  },
  {
    author: "James Males", date: "22/04/2025 13:26",
    body: `From: Annuity Servicing\nSent: 22 April 2025 13:24\nTo: 'WMCS@agepartnership.com' <WMCS@agepartnership.com>\nSubject: Mrs L Turner - 225810: Transfer re-requested`,
  },
  {
    author: "James Males", date: "22/04/2025 13:27",
    body: `Email cont.\nI'm requesting that LV= now invest the funds within the new LV= Fixed Term Investment/Annuity product, which has replaced the LV= Protected Retirement Plan on the basis outlined in the quote attached (<quote reference>).\nI/we read the Plan Conditions, Key Features and Customer Facing Principles and Practices of Financial Management documents applicable to the new plan.\nWhere I/we/ asked for the Plan to be set up to provide a Guaranteed Maturity Value (GMV) only, I/we also instructing LV= to produce a minimal income of £1 each year payable in arrears, which will be held back within the pension scheme and added to the GMV at the end of`,
  },
  {
    author: "Michael Hibbs", date: "24/04/2025 17:08",
    body: `Funds sent, not yet received`,
  },
  {
    author: "James Males", date: "28/04/2025 12:20",
    body: `Funds rec'd - TV dec in file\nReady for FQ`,
  },
];

const AVATAR_COLORS = [
  "bg-[#006cf4]",
  "bg-[#04589b]",
  "bg-[#00263e]",
  "bg-[#178830]",
  "bg-[#005a9c]",
  "bg-[#05579B]",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function NotesTab() {
  return (
    <Section
      title={`Notes (${NOTES.length})`}
      headerAction={
        <div className="flex items-center gap-2">
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdAdd size={16} /> Add
          </button>
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdEdit size={16} /> Edit
          </button>
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdRemove size={16} /> Delete
          </button>
        </div>
      }
    >
      <div className="space-y-3 max-h-[620px] overflow-auto pr-1">
        {NOTES.map((n, i) => (
          <article
            key={i}
            className="relative bg-white rounded-[8px] border border-[#e0e0e0] overflow-hidden"
          >
            <div className="p-4">
              <header className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-[#eef2f5]">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-['Livvic'] font-semibold text-[13px] shrink-0 ${colorFor(
                      n.author,
                    )}`}
                  >
                    {initials(n.author)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 font-['Livvic'] font-semibold text-[14px] text-[#00263e] truncate">
                      <MdPerson size={14} className="text-[#777] shrink-0" />
                      {n.author}
                    </div>
                    <div className="flex items-center gap-1.5 font-['Mulish'] text-[11px] text-[#777] mt-0.5">
                      <MdAccessTime size={12} />
                      {n.date}
                    </div>
                  </div>
                </div>
                <span className="font-['Mulish'] text-[10px] tracking-wider uppercase text-[#04589b] bg-[#eaf5f8] border border-[#d6e7ef] rounded-full px-2.5 py-0.5 shrink-0">
                  Note #{NOTES.length - i}
                </span>
              </header>
              <pre className="font-['Mulish'] text-[12.5px] whitespace-pre-wrap text-[#3d3d3d] leading-[1.6] m-0">
                {n.body}
              </pre>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
