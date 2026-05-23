import { Field, TextInput, SelectInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { usePlanCode } from "../context/PlanCodeContext";

export function LoaPoaTab() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";

  return (
    <Section title="LOA / POA Details">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 max-w-3xl">
        <div>
          <Field label="LOA/POA:">
            <SelectInput value="" options={["", "Letter of Authority", "Power of Attorney"]} />
          </Field>
          <Field label="Name:"><TextInput value={isPlan0 ? "LoaPoaName" : ""} /></Field>
          <Field label="Company:"><TextInput value={isPlan0 ? "LoaPoaCompany" : ""} /></Field>
          <Field label="Address:">
            <ConnectedAddress
              lines={[
                { placeholder: "Line 1" },
                { placeholder: "Line 2" },
                { placeholder: "Line 3" },
              ]}
              initial={
                isPlan0
                  ? ["LoaPoaAddressLine1", "LoaPoaAddressLine2", "LoaPoaAddressLine3"]
                  : ["", "", ""]
              }
            />
          </Field>
        </div>
        <div>
          <Field label="Postal Code:"><TextInput value={isPlan0 ? "LoaPoaPostalCode" : ""} /></Field>
          <Field label="Date Appointed:"><DatePicker placeholder="" /></Field>
          <Field label="Telephone:"><TextInput value={isPlan0 ? "LoaPoaTelephone" : ""} /></Field>
        </div>
      </div>
    </Section>
  );
}
