import { useRef } from "react";
import { MdHelpOutline } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

export function ConfirmDialog({
  open,
  title = "Confirm",
  message,
  onYes,
  onNo,
}: {
  open: boolean;
  title?: string;
  message: string;
  onYes: () => void;
  onNo: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onNo : null);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
      <div ref={containerRef} className="lve-panel w-[360px] bg-white">
        <header className="lve-panel-header">{title}</header>
        <div className="lve-panel-body">
          <div className="flex items-start gap-3">
            <MdHelpOutline
              size={32}
              className="text-[#006cf4] shrink-0 mt-0.5"
            />
            <p className="font-['Mulish'] text-[13px] text-[#3d3d3d]">
              {message}
            </p>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              className="lve-btn lve-btn-secondary"
              onClick={onNo}
            >
              No
            </button>
            <button type="button" className="lve-btn" onClick={onYes}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
