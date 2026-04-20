import { Field, TextInput, SelectInput, Section } from "../components/Field";

export function LoaPoaTab() {
  return (
    <Section title="LOA / POA Details">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 max-w-3xl">
        <div>
          <Field label="LOA/POA:">
            <SelectInput value="" options={["", "LOA", "POA"]} />
          </Field>
          <Field label="Name:"><TextInput value="" /></Field>
          <Field label="Company:"><TextInput value="" /></Field>
          <Field label="Address line 1:"><TextInput value="" /></Field>
          <Field label="Address line 2:"><TextInput value="" /></Field>
          <Field label="Address line 3:"><TextInput value="" /></Field>
        </div>
        <div>
          <Field label="Postal Code:"><TextInput value="" /></Field>
          <Field label="Date Appointed:"><TextInput value="/  /" /></Field>
          <Field label="Telephone:"><TextInput value="" /></Field>
        </div>
      </div>
    </Section>
  );
}
