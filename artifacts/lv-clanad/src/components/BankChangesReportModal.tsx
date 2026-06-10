import { useRef, useState } from "react";
import {
  MdClose,
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
  MdPrint,
  MdSearch,
} from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

type Row = { policy: string; surname: string; username: string; date: string };

const PAGE_1: Row[] = [
  { policy: "100092.1", surname: "Testrdbaajc.b",   username: "LOPSP",   date: "30/03/2020" },
  { policy: "100094.1", surname: "Testrdbaaje.b",   username: "LOPSP",   date: "30/03/2020" },
  { policy: "100139.1", surname: "Testpsbaabdj.b",  username: "LV65348", date: "23/07/2025" },
  { policy: "100168.0", surname: "Testclbaabgi",    username: "LOPLXK",  date: "31/01/2011" },
  { policy: "100250.1", surname: "Testswbaacfa.b",  username: "AGYHKL",  date: "12/11/2012" },
  { policy: "100329.0", surname: "Testygbaadcj",    username: "LOPGM",   date: "07/08/2012" },
  { policy: "100370.1", surname: "Testblbaadha.b",  username: "LOPAL",   date: "28/01/2016" },
  { policy: "100631.0", surname: "Testggbaagdb",    username: "LV67711", date: "05/12/2025" },
  { policy: "100652.1", surname: "Testswbaagfc.b",  username: "AGYHKL",  date: "12/11/2012" },
  { policy: "100737.1", surname: "Testdnbaahdh.b",  username: "LOPGM",   date: "09/05/2013" },
  { policy: "100807.1", surname: "Testbrbaaiah.b",  username: "CLMJXG",  date: "11/06/2009" },
  { policy: "100858.0", surname: "Testhsbaaifi",    username: "LOPCPA",  date: "25/04/2014" },
  { policy: "100889.0", surname: "Testtrbaaijj",    username: "LOPVH",   date: "03/09/2014" },
  { policy: "100936.1", surname: "Testjnbaajdg.b",  username: "LOPSP",   date: "27/09/2018" },
  { policy: "100937.0", surname: "Testdnbaajdh",    username: "LV66186", date: "22/04/2022" },
  { policy: "101035.0", surname: "Testssbabadg",    username: "LOPJSH",  date: "26/11/2020" },
  { policy: "101269.0", surname: "Testcebabcgj",    username: "LOPRXP",  date: "07/09/2017" },
  { policy: "101270.0", surname: "Testcebabcha",    username: "LOPRXP",  date: "07/09/2017" },
  { policy: "101556.0", surname: "Testpnbabffg",    username: "SIPXAM",  date: "13/03/2015" },
  { policy: "101557.1", surname: "Testbebabffh.b",  username: "SIPSDH",  date: "02/09/2008" },
  { policy: "101574.0", surname: "Testeebabfhe",    username: "LV67320", date: "15/12/2023" },
  { policy: "101588.0", surname: "Teststbabfii",    username: "LOPTO",   date: "04/05/2016" },
  { policy: "101592.0", surname: "Teststbabfjc",    username: "LOPTO",   date: "29/04/2016" },
  { policy: "101596.1", surname: "Testedbabfjg.b",  username: "LOPSP",   date: "03/03/2020" },
  { policy: "101602.0", surname: "Testflbabgac",    username: "CPUBW",   date: "20/09/2013" },
  { policy: "101674.0", surname: "Testglbabghe",    username: "LOPAU",   date: "24/04/2014" },
  { policy: "101753.1", surname: "Testmybabhfd.b",  username: "LOPNB",   date: "11/04/2012" },
  { policy: "101858.0", surname: "Testhdababifi",   username: "LOPSL2",  date: "03/02/2015" },
  { policy: "101989.0", surname: "Testctbabjij",    username: "LV63195", date: "02/01/2021" },
  { policy: "102016.0", surname: "Teststbacabg",    username: "LOPRXP",  date: "17/11/2011" },
  { policy: "102117.1", surname: "Testhsbacbbh.b",  username: "LV67480", date: "22/09/2025" },
  { policy: "102127.1", surname: "Testshbacbch.b",  username: "LOPEM",   date: "28/02/2017" },
  { policy: "102134.0", surname: "Testpebacbde",    username: "LOPDF",   date: "15/12/2016" },
  { policy: "102168.0", surname: "Testpebacbgi",    username: "LOPDF",   date: "15/12/2016" },
  { policy: "102196.1", surname: "Testedbacbjg.b",  username: "LOPSP",   date: "03/03/2020" },
  { policy: "102206.0", surname: "Testhmbaccag",    username: "LOPCPA",  date: "20/03/2013" },
];

const PAGE_28: Row[] = [
  { policy: "213719.0", surname: "Testhnbcbdhbj",   username: "LV65787", date: "23/07/2024" },
  { policy: "213929.1", surname: "Testdncbdjcj.b",  username: "LV67480", date: "05/05/2026" },
  { policy: "217413.1", surname: "Testdncbhebd.b",  username: "LV63195", date: "05/06/2025" },
  { policy: "218057.1", surname: "Testcdcbiafh.b",  username: "LV67480", date: "05/01/2026" },
  { policy: "220492.0", surname: "Testgnccaejc",    username: "LV66656", date: "29/07/2024" },
  { policy: "220709.0", surname: "Testcsccahaj",    username: "LV65787", date: "11/06/2024" },
  { policy: "220859.0", surname: "Testbtrcaifj",    username: "LV68337", date: "17/11/2025" },
  { policy: "220972.0", surname: "Testhsccajhc",    username: "LV61717", date: "18/06/2024" },
  { policy: "221227.0", surname: "Testbtrcbcch",    username: "LV68337", date: "17/11/2025" },
  { policy: "229684.0", surname: "Testeeccjgie",    username: "LV68429", date: "03/02/2026" },
];

const TOTAL_PAGES = 28;
const TOTAL_ROWS = 3404;

const navBtn =
  "w-[44px] h-[44px] flex items-center justify-center rounded-[30px] border border-[#04589b] bg-white text-[#04589b] shadow-sm hover:bg-[#003578] hover:text-white hover:border-[#003578] disabled:opacity-30 disabled:cursor-not-allowed transition-colors";
const divider = "h-6 w-px bg-[#BBBBBB]";

export function BankChangesReportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);
  

  if (!open) return null;

  const rows = page === 28 ? PAGE_28 : PAGE_1;
  const isFirst = page === 1;
  const isLast = page === TOTAL_PAGES;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div ref={containerRef} className="lve-panel bg-white w-[820px] max-w-full max-h-[90vh] flex flex-col">

        {/* LVE header */}
        <header className="lve-panel-header flex items-center justify-between">
          <span>Bank Detail Amendments Report</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-[#d0d5dd] shrink-0">

          {/* Page nav */}
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPage(1)} disabled={isFirst} title="First page" className={navBtn}>
              <MdFirstPage size={20} />
            </button>
            <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={isFirst} title="Previous page" className={navBtn}>
              <MdChevronLeft size={20} />
            </button>
            <span className="px-2 min-w-[80px] text-center text-sm font-bold text-[#4a4a49] select-none font-['Mulish']">
              {page} of {TOTAL_PAGES}
            </span>
            <button type="button" onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))} disabled={isLast} title="Next page" className={navBtn}>
              <MdChevronRight size={20} />
            </button>
            <button type="button" onClick={() => setPage(TOTAL_PAGES)} disabled={isLast} title="Last page" className={navBtn}>
              <MdLastPage size={20} />
            </button>
          </div>

          <span className={divider} />

          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdPrint size={16} />
            Print
          </button>
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdSearch size={16} />
            Find
          </button>

          <span className={divider} />

          <select className="lve-input h-8 w-[90px] text-[13px]">
            <option>100%</option>
            <option>75%</option>
            <option>50%</option>
          </select>

          <span className={divider} />

          <span className="font-['Mulish'] text-[13px] text-[#7a7a7a]">
            Total: <strong className="text-[#3d3d3d]">{TOTAL_ROWS}</strong>
          </span>
          <span className="font-['Mulish'] text-[13px] text-[#7a7a7a]">
            {TOTAL_ROWS} of {TOTAL_ROWS}
          </span>
        </div>

        {/* Document area */}
        <div className="bg-[#f0f0f0] overflow-y-auto flex-1 p-6">
          <div
            className="bg-white mx-auto shadow-md font-['Courier_New',monospace]"
            style={{ width: 680, minHeight: 880, padding: "48px 56px" }}
          >
            {page === 1 && (
              <>
                <div className="text-center mb-1">
                  <span className="text-[15px] font-bold underline">
                    Supervisor Report – Bank Detail Amendments Requiring Authorisation
                  </span>
                </div>
                <div className="text-right text-[12px] mb-4">
                  <span className="font-bold">Date - 25 May 2026</span>
                </div>
              </>
            )}

            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr>
                  {["POLICY NUMBER", "CLIENT SURNAME", "USERNAME", "DATE CHANGED"].map((h) => (
                    <th key={h} className="border border-black px-2 py-1 text-left font-bold text-[12px] bg-white">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td className="border border-black px-2 py-[2px] text-center">{r.policy}</td>
                    <td className="border border-black px-2 py-[2px]">{r.surname}</td>
                    <td className="border border-black px-2 py-[2px]">{r.username}</td>
                    <td className="border border-black px-2 py-[2px] text-center">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-center mt-8 text-[12px]">
              Page {page} of {TOTAL_PAGES}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
