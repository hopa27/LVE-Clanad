import { Field, TextInput, Section } from "../components/Field";
import { MdKeyboardArrowDown } from "react-icons/md";
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
          <div className="relative">
            <select className="lve-input pr-12 appearance-none">
              <option value="">—</option>
              <option value="Letter of Authority">Letter of Authority</option>
              <option value="Power of Attorney">Power of Attorney</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              <span className="h-6 w-px bg-[#BBBBBB]" />
              <span className="px-3 text-[#006cf4]">
                <MdKeyboardArrowDown size={22} />
              </span>
            </div>
          </div>
        </Field>
        <Field inline labelWidth={140} label="Name:">
          <TextInput value={isPlan0 ? "LoaPoaName" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Company:">
          <TextInput value={isPlan0 ? "LoaPoaCompany" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Address:">
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
        <Field inline labelWidth={140} label="Postal Code:">
          <TextInput value={isPlan0 ? "LoaPoaPostalCode" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Date Appointed:">
          <DatePicker placeholder="" />
        </Field>
        <Field inline labelWidth={140} label="Telephone:">
          <TextInput value={isPlan0 ? "LoaPoaTelephone" : ""} />
        </Field>
      </div>
    </Section>
  );
}
