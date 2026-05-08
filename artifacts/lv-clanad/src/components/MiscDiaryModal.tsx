import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { DatePicker } from "./DatePicker";

const TYPE_OPTIONS = [
  "",
  "Misc",
  "BCE5A",
  "Funds",
  "Fund Correspondence",
];

export function MiscDiaryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
      <div className="lve-panel w-[460px] bg-white">
        <header className="lve-panel-header">Misc Diary</header>
        <div className="lve-panel-body space-y-4">
          <div className="flex items-center gap-3">
            <label className="lve-label w-[80px] shrink-0 text-right">
              Date Due:
            </label>
            <div className="flex-1">
              <DatePicker placeholder="Date Due" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="lve-label w-[80px] shrink-0 text-right">
              Type:
            </label>
            <select
              className="lve-input flex-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-start gap-3">
            <label className="lve-label w-[80px] shrink-0 text-right pt-2">
              Notes:
            </label>
            <textarea
              className="lve-input flex-1 min-h-[90px] resize-y"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              className="lve-btn lve-btn-secondary"
              onClick={onClose}
            >
              <MdClose size={16} />
              Cancel
            </button>
            <button type="button" className="lve-btn" onClick={onClose}>
              <MdCheck size={16} />
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
