import { Field, SelectInput, TextInput, Checkbox, Section } from "../components/Field";
import { MdSend } from "react-icons/md";

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
        <SelectInput value="" options={["", ...LETTERS]} />
      </Section>

      <Section title="Letter Specific Info">
        <p className="font-['Mulish'] text-[12px] italic text-[#777]">
          Select a letter to view its options.
        </p>
      </Section>

      <Section title="Additional Text" className="lg:col-span-2">
        <textarea
          className="lve-input w-full min-h-[180px] resize-y"
          placeholder="Type any additional text to include in the letter…"
        />
      </Section>

      <div className="space-y-4">
        <Section title="Distribution Info">
          <Field label="Print:" inline>
            <Checkbox />
          </Field>
          <Field label="Fax:" inline>
            <TextInput placeholder="Fax number" />
          </Field>
          <Field label="Email:" inline>
            <TextInput placeholder="recipient@example.com" />
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

        <button type="button" className="lve-btn w-full justify-center">
          <MdSend size={16} /> Generate
        </button>
      </div>
    </div>
  );
}
