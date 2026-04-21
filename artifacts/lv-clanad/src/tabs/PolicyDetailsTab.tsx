import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";

export function PolicyDetailsTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Policy Details" className="lg:col-span-1">
        <Field label="Online Application:"><Checkbox /></Field>
        <Field label="Tax Code:">
          <div className="flex items-center gap-2">
            <TextInput value="BR" className="w-24" />
            <Checkbox label="Tax Free" />
          </div>
        </Field>
        <Field label="Initial payment method:">
          <SelectInput value="B" options={["B", "C", "D"]} />
        </Field>
        <Field label="Pay Tax Free Cash by:">
          <SelectInput value="B" options={["B", "C"]} />
        </Field>
        <div className="my-3 border-t border-[color:var(--color-panel-border)]" />
        <Field label="ReAssurance Premium:"><TextInput value="9000" /></Field>
        <Field label="ReAssurer:"><TextInput value="RGA 1" /></Field>
        <Field label="Evidence of Age:"><TextInput value="Y" /></Field>
        <Field label="Advice Type:">
          <SelectInput value="Non advised" options={["Non advised", "Advised"]} />
        </Field>
        <Field label="Distribution Channel:">
          <SelectInput value="Whole of market" options={["Whole of market", "Restricted"]} />
        </Field>
        <div className="my-3 border-t border-[color:var(--color-panel-border)]" />
        <Field label="Internal Maturity Transfer:"><Checkbox /></Field>
        <Field label="Scheme Pension:">
          <SelectInput value="No" options={["No", "Yes"]} />
        </Field>
        <Field label="Purchaser:"><TextInput value="Mrs L Turner" /></Field>
        <Field label="Policy Owner:"><TextInput value="Mrs L Turner" /></Field>
      </Section>

      <div className="space-y-4 lg:col-span-1">
        <Section title="IFA Contact Details">
          <Field label="Name:"><TextInput value="Age Partnership Wealth Management Limited" /></Field>
          <Field label="Building:"><TextInput value="2200 Century Way" /></Field>
          <Field label="City:"><TextInput value="Leeds" /></Field>
          <Field label="County:"><TextInput value="" /></Field>
          <Field label="FAO:"><TextInput value="Sirs" /></Field>
          <Field label="Tel:"><TextInput value="" /></Field>
          <Field label="Street:"><TextInput value="Thorpe Park" /></Field>
          <Field label="District:"><TextInput value="" /></Field>
          <Field label="Post Code:"><TextInput value="LS15 8ZB" /></Field>
          <Field label="Email:"><TextInput value="WMCS@agepartnership.com" /></Field>
        </Section>

        <Section title="Non Standard Policy">
          <Field label="Non Std Flag:">
            <SelectInput value="" options={["", "Y", "N"]} />
          </Field>
          <Field label="Non Standard Policy:"><TextInput value="" /></Field>
        </Section>
      </div>

      <div className="space-y-4 lg:col-span-1">
        <Section title="Agency Deceased">
          <Field label="Deceased Date:"><DatePicker placeholder="Deceased Date" /></Field>
          <Field label="Agency Ref:"><TextInput value="" /></Field>
          <Field label="Agency Unique Ref:"><TextInput value="" /></Field>
          <Field label="Notification Date:"><DatePicker placeholder="Notification Date" /></Field>
        </Section>

        <Section title="Statements & Letters">
          <Field label="Issue Statements:">
            <SelectInput value="Yes" options={["Yes", "No"]} />
          </Field>
          <Field label="Copy Annual Statement to IFA:">
            <SelectInput value="Yes" options={["Yes", "No"]} />
          </Field>
          <Field label="Copy Annual Statement to Policyholder:">
            <SelectInput value="Yes" options={["Yes", "No"]} />
          </Field>
          <Field label="Issue wake up letters/maturity chasers:">
            <SelectInput value="Yes" options={["Yes", "No"]} />
          </Field>
        </Section>

        <Section title="P45 Details">
          <Field label="P45 date rec'd:"><TextInput value="" /></Field>
          <Field label="P45 Tax Paid:"><TextInput value="" /></Field>
          <Field label="P45 Gross Pay:"><TextInput value="" /></Field>
        </Section>

        <Section title="IFA Details">
          <Field label="IFA Ref:"><TextInput value="AGEPA-002" /></Field>
          <Field label="Comm. %:"><TextInput value="1.8" /></Field>
          <Field label="Commission:"><TextInput value="270" /></Field>
          <Field label="Key Account:"><TextInput value="Z" /></Field>
          <Field label="Region:"><TextInput value="MAN" /></Field>
          <Field label="Adviser Charge:"><Checkbox /></Field>
          <Field label="Serious ill health:"><TextInput value="/  /" /></Field>
        </Section>
      </div>
    </div>
  );
}
