import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";

export function ApplicationDetailsTab() {
  return (
    <div className="space-y-4">
      {/* Top main grid - 3 columns */}
      <div className="panel panel-body grid grid-cols-1 lg:grid-cols-3 gap-x-6">
        <div>
          <Field label="Set Up Date:"><TextInput value="13/03/2025" /></Field>
          <Field label="Received Date:"><TextInput value="11/03/2025" /></Field>
          <Field label="Start Date:"><TextInput value="25/04/2025" /></Field>
          <Field label="Days Since Application:"><TextInput value="385" /></Field>
        </div>
        <div>
          <Field label="Special Status:"><TextInput value="" /></Field>
          <Field label="Status:"><TextInput value="L" /></Field>
          <Field label="Suspended:"><TextInput value="N" /></Field>
          <Field label="Closed:"><TextInput value="" /></Field>
        </div>
        <div>
          <Field label="Life One Dead:"><TextInput value="" /></Field>
          <Field label="Life Two Dead:"><TextInput value="" /></Field>
          <Field label="Completed:"><TextInput value="28/05/2025" /></Field>
          <Field label="Last amended by:"><TextInput value="LV67180" /></Field>
        </div>
      </div>

      {/* Second row */}
      <div className="panel panel-body grid grid-cols-1 lg:grid-cols-3 gap-x-6">
        <div>
          <Field label="IFA Payment Date:"><TextInput value="30/05/2025 08" /></Field>
          <Field label="PostADay:"><Checkbox checked={true} /></Field>
          <Field label="Transfer from Beneficiary Drawdown?:">
            <SelectInput value="Unknown" options={["Unknown", "Yes", "No"]} />
          </Field>
        </div>
        <div>
          <Field label=""><TextInput value="10/12/2013" /></Field>
          <Field label="Rates Ok'd by:"><TextInput value="" /></Field>
          <Field label="Paykey:"><TextInput value="1016052" /></Field>
          <Field label="Policy No:"><TextInput value="225810" /></Field>
        </div>
        <div>
          <Field label="Dependant Eligible to Receive Benefits:">
            <TextInput value="" />
          </Field>
        </div>
      </div>

      {/* Two-column section panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Correspondence Details">
          <Field label="Correspond Name:"><TextInput value="Mrs L Turner" /></Field>
          <Field label="Salutation Name:"><TextInput value="Mrs Turner" /></Field>
          <Field label="Telephone:"><TextInput value="07896 335511" /></Field>
          <Field label="E-mail:"><TextInput value="lturner@hotmail.com" /></Field>
        </Section>

        <Section title="Correspondence Address">
          <Field label="Line 1:"><TextInput value="Little East Down Farm" /></Field>
          <Field label="Line 2:"><TextInput value="Ashwater" /></Field>
          <Field label="Line 3:"><TextInput value="" /></Field>
          <Field label="Line 4:"><TextInput value="" /></Field>
          <Field label="Line 5 (County):"><TextInput value="" /></Field>
          <Field label="Postcode:"><TextInput value="EX21 5UP" /></Field>
          <Field label="Country:">
            <SelectInput value="United Kingdom" options={["United Kingdom", "Ireland", "Other"]} />
          </Field>
          <div className="mt-2"><Checkbox label="Address Unknown / Gone Away" /></div>
        </Section>
      </div>
    </div>
  );
}
