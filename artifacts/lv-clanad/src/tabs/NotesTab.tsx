import { Section } from "../components/Field";
import { MdAdd, MdRemove, MdEdit } from "react-icons/md";

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

export function NotesTab() {
  return (
    <Section title="Notes">
      <div className="flex flex-wrap gap-2 mb-4">
        <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
          <MdAdd size={16} /> Add
        </button>
        <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
          <MdRemove size={16} /> Delete
        </button>
        <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
          <MdEdit size={16} /> Edit
        </button>
      </div>

      <div className="border border-[#e0e0e0] rounded-[8px] bg-white divide-y divide-[#e0e0e0] max-h-[560px] overflow-auto">
        {NOTES.map((n, i) => (
          <article key={i} className="p-4 hover:bg-[#eaf5f8]">
            <header className="font-['Mulish'] text-[12px] text-[#555] mb-2">
              Added by{" "}
              <span className="font-semibold text-[#00263e]">{n.author}</span>,{" "}
              {n.date}
            </header>
            <pre className="font-['Mulish'] text-[12px] whitespace-pre-wrap text-[#3d3d3d] leading-relaxed">
              {n.body}
            </pre>
          </article>
        ))}
      </div>
    </Section>
  );
}
