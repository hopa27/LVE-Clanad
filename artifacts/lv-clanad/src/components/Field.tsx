import type { ReactNode } from "react";

export function Field({
  label,
  children,
  labelWidth = 130,
  align = "right",
}: {
  label: ReactNode;
  children: ReactNode;
  labelWidth?: number;
  align?: "right" | "left";
}) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label
        className="text-[12px] text-[color:var(--color-text-secondary)] shrink-0"
        style={{ width: labelWidth, textAlign: align }}
      >
        {label}
      </label>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function TextInput({
  value = "",
  readOnly = true,
  className = "",
  type = "text",
  placeholder,
}: {
  value?: string;
  readOnly?: boolean;
  className?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      defaultValue={value}
      readOnly={readOnly}
      placeholder={placeholder}
      data-readonly={readOnly}
      className={`field-input w-full ${className}`}
    />
  );
}

export function SelectInput({
  value = "",
  options = [],
  className = "",
}: {
  value?: string;
  options?: string[];
  className?: string;
}) {
  return (
    <select
      defaultValue={value}
      className={`field-input w-full ${className}`}
    >
      {value && !options.includes(value) && <option value={value}>{value}</option>}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
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
    <label className="inline-flex items-center gap-2 text-[12px] text-[color:var(--color-text-secondary)]">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="w-4 h-4 rounded border-[color:var(--color-input-border)] accent-[color:var(--color-lv-green)]"
      />
      {label && <span>{label}</span>}
    </label>
  );
}

export function Section({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-header">{title}</header>
      <div className="panel-body">{children}</div>
    </section>
  );
}
