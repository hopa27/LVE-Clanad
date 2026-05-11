import { useState, type ReactNode } from "react";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";
import { useEditMode } from "../context/EditModeContext";

export function Field({
  label,
  children,
  className = "",
  inline = false,
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
  inline?: boolean;
}) {
  if (inline) {
    return (
      <div className={`mb-4 flex items-center gap-3 ${className}`}>
        <label className="lve-label !mb-0 text-right shrink-0 w-[170px]">{label}</label>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    );
  }
  return (
    <div className={`mb-4 ${className}`}>
      <label className="lve-label">{label}</label>
      {children}
    </div>
  );
}

export function TextInput({
  value = "",
  readOnly = false,
  disabled = false,
  type = "text",
  placeholder,
  error = false,
  className = "",
}: {
  value?: string;
  readOnly?: boolean;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
}) {
  const { editing } = useEditMode();
  const lockedReadOnly = readOnly || !editing;
  return (
    <input
      type={type}
      defaultValue={value}
      readOnly={lockedReadOnly}
      disabled={disabled}
      placeholder={placeholder}
      data-error={error || undefined}
      className={`lve-input ${
        lockedReadOnly && !disabled ? "bg-[#fafafa] cursor-default" : ""
      } ${className}`}
    />
  );
}

export function SelectInput({
  value = "",
  options = [],
  className = "",
  error = false,
}: {
  value?: string;
  options?: string[];
  className?: string;
  error?: boolean;
}) {
  const { editing } = useEditMode();
  const all = value && !options.includes(value) ? [value, ...options] : options;
  return (
    <div className="relative">
      <select
        defaultValue={value}
        disabled={!editing}
        data-error={error || undefined}
        className={`lve-input pr-12 appearance-none ${
          !editing ? "bg-[#fafafa] cursor-default" : ""
        } ${className}`}
      >
        {all.map((opt) => (
          <option key={opt} value={opt}>
            {opt || "—"}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
        <span className="h-6 w-px bg-[#BBBBBB]" />
        <span className={`px-3 ${error ? "text-[#d72714]" : "text-[#006cf4]"}`}>
          <MdKeyboardArrowDown size={22} />
        </span>
      </div>
    </div>
  );
}

export function Checkbox({
  label,
  checked = false,
  disabled = false,
}: {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
}) {
  const { editing } = useEditMode();
  const [isChecked, setIsChecked] = useState(checked);
  const [focused, setFocused] = useState(false);
  const isLocked = disabled || !editing;

  return (
    <label
      className={`inline-flex items-center gap-2 select-none font-['Mulish'] text-[14px] text-[#3d3d3d] ${
        isLocked
          ? `cursor-not-allowed ${disabled ? "opacity-60" : ""}`
          : "cursor-pointer"
      }`}
    >
      <span className="relative inline-flex items-center justify-center w-5 h-5">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={isLocked}
          onChange={(e) => setIsChecked(e.target.checked)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
        <span
          className={`inline-flex items-center justify-center w-5 h-5 rounded-[4px] transition-colors ${
            isChecked
              ? "bg-[#006cf4] border-[1px] border-[#006cf4]"
              : "bg-white border border-[#BBBBBB]"
          } ${focused ? "ring-2 ring-[#178830] ring-offset-0" : ""}`}
        >
          {isChecked && <MdCheck className="text-white" size={14} />}
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}

export function Section({
  title,
  children,
  className = "",
  headerAction,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}) {
  return (
    <section className={`lve-panel ${className}`}>
      {(title || headerAction) && (
        <header className="lve-panel-header flex items-center justify-between">
          <span>{title}</span>
          {headerAction}
        </header>
      )}
      <div className="lve-panel-body">{children}</div>
    </section>
  );
}
