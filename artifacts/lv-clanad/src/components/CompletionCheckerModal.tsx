import { MdClose, MdCheck } from "react-icons/md";

const SECTIONS: { heading: string; items: string[] }[] = [
  {
    heading: "FTA Requirements:",
    items: [
      "Sales office Key Account and Region are blank, please update IFA Lite.",
    ],
  },
  {
    heading: "Payment Forecast Requirements:",
    items: [
      "Either a payment forecast has not been run OR Quotation details have changed since the last payment forecast was run. Please re-run the forecast and then recheck the completion.",
    ],
  },
  {
    heading: "Application Requirements:",
    items: [
      "There are no cheques logged for this policy. Please check that valid cheques are logged and recheck the completion.",
      "There is no evidence of age logged for this policy. Please check that evidence of age has been received and recheck the completion.",
      'An "NI sweep" has not been run. Please run the sweep and then recheck the completion.',
      "Initial Payment Method cannot be blank.",
      "Tax Free Cash Payment Method cannot be blank.",
    ],
  },
  {
    heading: "Authorisation Requirements:",
    items: [
      "The bank details have not been authorised. Please refer this case to your supervisor.",
    ],
  },
  {
    heading: "System Requirements:",
    items: [
      "The total monies received does NOT match the total premium for this policy. Please Recheck!",
    ],
  },
];

export function CompletionCheckerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[640px] max-w-full max-h-[85vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Completion Checker</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            aria-label="Close"
            title="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body flex flex-col gap-5">
          <div className="overflow-auto pr-1 max-h-[55vh] font-['Mulish'] text-[14px] text-[#04589b] leading-relaxed flex flex-col gap-4">
            {SECTIONS.map((s) => (
              <div key={s.heading} className="flex flex-col gap-3">
                <div className="font-semibold">=&gt; {s.heading}</div>
                {s.items.map((it, i) => (
                  <p key={i}>{it}</p>
                ))}
              </div>
            ))}
            <p>This case is not ready to be set live...</p>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-sm min-w-[100px] justify-center"
            >
              <MdCheck size={16} />
              <span>OK</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
