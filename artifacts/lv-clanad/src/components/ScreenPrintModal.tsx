import { MdClose } from "react-icons/md";

export function ScreenPrintModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[400px] max-w-full">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Client Annuity Administration System</span>
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
        <div className="lve-panel-body flex flex-col gap-5">
          <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] text-center">
            The Screen Print has been printed!
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-sm min-w-[100px] justify-center"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
