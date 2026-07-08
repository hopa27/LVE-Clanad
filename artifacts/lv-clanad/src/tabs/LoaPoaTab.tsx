import { Field, TextInput, SelectInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { usePlanCode } from "../context/PlanCodeContext";

export function LoaPoaTab() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";

  return (
    <Section title="LOA / POA Details">
      <div className="max-w-xl">
        <Field inline labelWidth={140} label="LOA/POA:">
          <SelectInput
            options={["", "Letter of Authority", "Power of Attorney"]}
          />
        </Field>
        <Field inline labelWidth={140} label="Name:">
          <TextInput value={isPlan0 ? "LoaPoaName" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Company:">
          <TextInput value={isPlan0 ? "LoaPoaCompany" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Address:">
          <ConnectedAddress
            lines={[{}, {}, {}]}
            initial={
              isPlan0
                ? ["LoaPoaAddressLine1", "LoaPoaAddressLine2", "LoaPoaAddressLine3"]
                : ["", "", ""]
            }
          />
        </Field>
        <Field inline labelWidth={140} label="Postal Code:">
          <TextInput value={isPlan0 ? "LoaPoaPostalCode" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Date Appointed:">
          <DatePicker placeholder="DD/MM/YYYY" />
        </Field>
        <Field inline labelWidth={140} label="Telephone:">
          <TextInput value={isPlan0 ? "LoaPoaTelephone" : ""} />
        </Field>
      </div>
    </Section>
  );
}
