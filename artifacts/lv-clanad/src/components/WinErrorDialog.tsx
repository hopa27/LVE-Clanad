import { useRef } from "react";
import { MdCancel } from "react-icons/md";
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
        className="lve-panel w-[360px] bg-white"
      >
        <header id="win-err-title" className="lve-panel-header">Error</header>
        <div className="lve-panel-body">
          <div className="flex items-start gap-3">
            <MdCancel size={32} className="text-[#d72714] shrink-0 mt-0.5" />
            <p className="font-['Mulish'] text-[13px] text-[#3d3d3d]">{message}</p>
          </div>
          <div className="mt-6 flex items-center justify-end">
            <button type="button" autoFocus className="lve-btn" onClick={onOk}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
