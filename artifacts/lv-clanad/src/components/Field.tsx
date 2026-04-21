import type { ReactNode } from "react";
import { MdKeyboardArrowDown, MdCheck } from "react-icons/md";

export function Field({
  label,
  children,
  className = "",
}: {
  label: ReactNode;
  children: ReactNode;
  className?: string;
}) {
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
  type = "text",
  placeholder,
  error = false,
  className = "",
}: {
  value?: string;
  readOnly?: boolean;
  type?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
}) {
  return (
    <input
      type={type}
      defaultValue={value}
      readOnly={readOnly}
      placeholder={placeholder}
      data-error={error || undefined}
      className={`lve-input ${className}`}
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
  const all = value && !options.includes(value) ? [value, ...options] : options;
  return (
    <div className="relative">
      <select
        defaultValue={value}
        data-error={error || undefined}
        className={`lve-input pr-12 appearance-none ${className}`}
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
}: {
  label?: string;
  checked?: boolean;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none font-['Mulish'] text-[15px] text-[#3d3d3d]">
      <span className="relative inline-flex items-center justify-center w-5 h-5 rounded border border-[#979797] bg-white peer-checked:bg-[#178830]">
        <input
          type="checkbox"
          defaultChecked={checked}
          className="peer absolute inset-0 opacity-0 cursor-pointer"
        />
        <MdCheck className="hidden peer-checked:[display:block] text-white absolute" size={16} />
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
  title: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}) {
  return (
    <section className={`lve-panel ${className}`}>
      <header className="lve-panel-header flex items-center justify-between">
        <span>{title}</span>
        {headerAction}
      </header>
      <div className="lve-panel-body">{children}</div>
    </section>
  );
}
