import { Field, TextInput, SelectInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { ConnectedAddress } from "../components/ConnectedAddress";

export function LoaPoaTab() {
  return (
    <Section title="LOA / POA Details">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 max-w-3xl">
        <div>
          <Field label="LOA/POA:">
            <SelectInput value="" options={["", "Letter of Authority", "Power of Attorney"]} />
          </Field>
          <Field label="Name:"><TextInput value="" /></Field>
          <Field label="Company:"><TextInput value="" /></Field>
          <Field label="Address:">
            <ConnectedAddress
              lines={[
                { placeholder: "Line 1" },
                { placeholder: "Line 2" },
                { placeholder: "Line 3" },
              ]}
              initial={["", "", ""]}
            />
          </Field>
        </div>
        <div>
          <Field label="Postal Code:"><TextInput value="" /></Field>
          <Field label="Date Appointed:"><DatePicker placeholder="/  /" /></Field>
          <Field label="Telephone:"><TextInput value="" /></Field>
        </div>
      </div>
    </Section>
  );
}
