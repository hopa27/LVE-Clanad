import { useRef } from "react";
import { MdClose, MdCancel } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

export function WinErrorDialog({
  open,
  message,
  onOk,
}: {
  open: boolean;
  message: string;
  onOk: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onOk : null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
      <div
        ref={containerRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="win-err-title"
        className="w-[280px] bg-[#d4d0c8] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[2px_2px_0_#000] font-['Mulish']"
      >
        {/* Title bar */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-[3px]">
          <span id="win-err-title" className="text-white text-[11px] font-bold font-['Mulish'] select-none">
            Error
          </span>
          <button
            type="button"
            onClick={onOk}
            className="w-[16px] h-[14px] bg-[#d4d0c8] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] flex items-center justify-center text-[#3d3d3d] hover:bg-[#c0c0c0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white"
            aria-label="Close"
          >
            <MdClose size={11} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start gap-3 mb-5">
            <MdCancel size={32} className="text-[#cc0000] shrink-0 mt-0.5" />
            <p className="text-[13px] text-[#000000] leading-[1.4] pt-1">{message}</p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              autoFocus
              onClick={onOk}
              className="min-w-[75px] h-[23px] bg-[#d4d0c8] border border-t-white border-l-white border-r-[#808080] border-b-[#808080] text-[13px] text-[#000000] px-4 hover:bg-[#c0c0c0] active:border-t-[#808080] active:border-l-[#808080] active:border-r-white active:border-b-white focus:outline focus:outline-1 focus:outline-[#000080] focus:outline-offset-[-3px]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
