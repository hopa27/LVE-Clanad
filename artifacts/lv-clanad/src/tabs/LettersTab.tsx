import { Field, Checkbox, Section } from "../components/Field";

const LETTERS = [
  "Chaser Letter OS Application Client",
  "Chaser Letter OS Application IFA",
  "Claim Form",
  "Completion Pack",
  "IFA Acceptance Pack",
  "IRF Acceptance Pack inc Client Ltr",
  "IRF Letter",
];

export function LettersTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Select Letter" className="lg:col-span-2">
        <select className="field-input w-full mb-3">
          <option>— Select a letter —</option>
        </select>
        <div className="border border-[color:var(--color-panel-border)] rounded-md overflow-auto max-h-[260px]">
          <ul className="divide-y divide-[color:var(--color-panel-border)]">
            {LETTERS.map((l) => (
              <li key={l} className="px-3 py-2 text-[12px] hover:bg-[color:var(--color-row-hover)] cursor-pointer">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Letter Specific Info">
        <p className="text-[12px] text-[color:var(--color-text-muted)] italic">
          Select a letter to view its options.
        </p>
      </Section>

      <Section title="Additional Text" className="lg:col-span-2">
        <textarea
          className="field-input w-full min-h-[180px] resize-y"
          placeholder="Type any additional text to include in the letter…"
        />
      </Section>

      <div className="space-y-4">
        <Section title="Distribution Info">
          <Field label="Print:"><Checkbox /></Field>
          <Field label="Fax:">
            <input className="field-input w-full" placeholder="Fax number" />
          </Field>
          <Field label="Email:">
            <input className="field-input w-full" placeholder="recipient@example.com" />
          </Field>
        </Section>

        <Section title="Send To">
          <div className="grid grid-cols-2 gap-y-2">
            <Checkbox label="Client" />
            <Checkbox label="IFA" />
            <Checkbox label="Ceding Scheme" />
            <Checkbox label="Other" />
          </div>
        </Section>

        <button type="button" className="btn-primary btn w-full justify-center">
          Generate
        </button>
      </div>
    </div>
  );
}
