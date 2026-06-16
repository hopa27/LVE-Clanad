import { useRef, useState } from "react";
import { MdClose, MdFirstPage, MdChevronRight, MdCancel } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";

const FIELDS = [
  "Age 1",
  "COCODE",
  "Created",
  "ENHANCED1",
  "IFA",
  "ILLUSTRATION",
  "LifeType",
  "Master",
  "Name",
  "Quote",
  "Status",
  "Type",
  "User",
  "VARIANT",
  "Variant[T1]",
];

export function LocateFieldValueModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [fieldValue, setFieldValue] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [searchType, setSearchType] = useState<"exact" | "beginning" | "anywhere">("anywhere");
  const [field, setField] = useState("Quote");

  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="locate-field-title"
        className="lve-panel bg-white w-[320px] max-w-[96vw]"
      >
        <header className="lve-panel-header flex items-center justify-between">
          <span id="locate-field-title">Locate Field Value</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] transition-colors"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body space-y-4">
          {/* Field Value */}
          <fieldset className="border border-[#BBBBBB] rounded-[8px] px-3 pt-1 pb-3">
            <legend className="px-1 font-['Mulish'] text-[12px] font-semibold text-[#3d3d3d]">
              Field Value
            </legend>
            <input
              type="text"
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="lve-input w-full"
              autoFocus
            />
          </fieldset>

          {/* Search Type */}
          <fieldset className="border border-[#BBBBBB] rounded-[8px] px-3 pt-1 pb-3">
            <legend className="px-1 font-['Mulish'] text-[12px] font-semibold text-[#3d3d3d]">
              Search Type
            </legend>
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="w-3 h-3 accent-[#006cf4] cursor-pointer"
                />
                Case-sensitive
              </label>
              <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
                <input
                  type="radio"
                  name="search-type"
                  checked={searchType === "exact"}
                  onChange={() => setSearchType("exact")}
                  className="w-3 h-3 accent-[#006cf4] cursor-pointer"
                />
                Exact Match
              </label>
              <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
                <input
                  type="radio"
                  name="search-type"
                  checked={searchType === "beginning"}
                  onChange={() => setSearchType("beginning")}
                  className="w-3 h-3 accent-[#006cf4] cursor-pointer"
                />
                Partial Match at Beginning
              </label>
              <label className="flex items-center gap-2 font-['Mulish'] text-[13px] text-[#3d3d3d] cursor-pointer">
                <input
                  type="radio"
                  name="search-type"
                  checked={searchType === "anywhere"}
                  onChange={() => setSearchType("anywhere")}
                  className="w-3 h-3 accent-[#006cf4] cursor-pointer"
                />
                Partial Match Anywhere
              </label>
            </div>
          </fieldset>

          {/* Fields */}
          <fieldset className="border border-[#BBBBBB] rounded-[8px] px-3 pt-1 pb-3">
            <legend className="px-1 font-['Mulish'] text-[12px] font-semibold text-[#3d3d3d]">
              Fields
            </legend>
            <select
              className="lve-input w-full cursor-pointer"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              {FIELDS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </fieldset>

          {/* Buttons */}
          <div className="flex justify-center gap-2 pt-1">
            <button type="button" className="lve-btn lve-btn-sm min-w-[70px] justify-center">
              <MdFirstPage size={16} />
              First
            </button>
            <button type="button" className="lve-btn lve-btn-sm min-w-[70px] justify-center">
              <MdChevronRight size={16} />
              Next
            </button>
            <button
              type="button"
              onClick={onClose}
              className="lve-btn lve-btn-secondary lve-btn-sm min-w-[70px] justify-center"
            >
              <MdCancel size={16} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
