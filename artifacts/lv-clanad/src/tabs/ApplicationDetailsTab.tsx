import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { DatePicker } from "../components/DatePicker";
import { usePlanCode } from "../context/PlanCodeContext";

export function ApplicationDetailsTab() {
  const { policyRef } = usePlanCode();

  return (
    <div className="space-y-4">
      {/* Top main grid — 4 columns matching legacy form */}
      <div className="panel panel-body grid grid-cols-1 lg:grid-cols-4 gap-x-6">
        {/* Column 1 */}
        <div>
          <Field label="Set Up Date:"><TextInput value="13/03/2025" disabled /></Field>
          <Field label="Received Date:"><TextInput value="11/03/2025" /></Field>
          <Field label="Start Date:"><TextInput value="25/04/2025" disabled /></Field>
          <div className="mb-2 mt-1 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
            WPPA amendment notification date
          </div>
          <Field label="From:"><DatePicker value="" placeholder="From" /></Field>
          <Field label="To:"><DatePicker value="" placeholder="To" /></Field>
          <Field label="Accept Date:"><DatePicker value="" placeholder="Accept Date" /></Field>
          <Field label="IFA Payment Date:"><DatePicker value="30/05/2025" placeholder="IFA Payment Date" disabled /></Field>
          <Field label="PostADay:"><Checkbox checked={true} /></Field>
          <Field label="Transfer from Beneficiary Drawdown?:">
            <SelectInput value="Unknown" options={["Yes", "No", "Unknown"]} />
          </Field>
        </div>

        {/* Column 2 */}
        <div>
          <Field label="Special Status:"><TextInput value="" disabled /></Field>
          <Field label="Final Quote Issued Date:"><TextInput value="" disabled /></Field>
          <Field label="Status:"><TextInput value="L" disabled /></Field>
          <Field label="Suspended:"><TextInput value="N" disabled /></Field>
          <Field label="Days Since Application:"><TextInput value="385" disabled /></Field>
          <Field label="Hosp'd Date:"><DatePicker value="" placeholder="Hosp'd Date" /></Field>
          <Field label="LTA Details:"><Checkbox /></Field>
        </div>

        {/* Column 3 */}
        <div>
          <Field label="GAD Anniversary:">
            <div className="flex gap-2">
              <TextInput value="10" className="!w-16" />
              <SelectInput value="May" options={[
                "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
              ]} />
            </div>
          </Field>
          <Field label="Life One Dead:"><TextInput value="" disabled /></Field>
          <Field label="Life Two Dead:"><TextInput value="" disabled /></Field>
          <Field label="Completed:"><TextInput value="28/05/2025" disabled /></Field>
          <Field label="Closed:"><TextInput value="" disabled /></Field>
          <Field label="Age at death:"><TextInput value="" disabled /></Field>
          <Field label="Gross £:"><TextInput value="" /></Field>
          <Field label="Paid net:">
            <div className="flex items-center gap-2">
              <Checkbox />
              <TextInput value="" />
            </div>
          </Field>
          <Field label="Date Paid:"><DatePicker value="" placeholder="Date Paid" /></Field>
          <Field label="Payee:"><TextInput value="" /></Field>
          <Field label="Trustee:"><Checkbox /></Field>
          <div className="mt-2">
            <button type="button" className="lve-btn lve-btn-sm">
              Create payment...
            </button>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <Field label="Quote Expiry Date:"><TextInput value="" disabled /></Field>
          <Field label="Last amended by:"><TextInput value="LV67180" disabled /></Field>
          <Field label="App Created by:"><TextInput value="" disabled /></Field>
          <Field label="Final Quote Issued by:"><TextInput value="" disabled /></Field>
          <Field label="Rates Ok'd by:"><TextInput value="" disabled /></Field>
          <Field label="Paykey:"><TextInput value="1016052" disabled /></Field>
          <Field label="Policy No:"><TextInput value={policyRef} disabled /></Field>
          <Field label="Dependant Eligible to Receive Benefits:">
            <TextInput value="" disabled />
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
          <Field label="Address:">
            <ConnectedAddress
              lines={[
                { placeholder: "Line 1" },
                { placeholder: "Line 2" },
                { placeholder: "Line 3" },
                { placeholder: "Line 4" },
                { placeholder: "Line 5 (County)" },
              ]}
              initial={["Little East Down Farm", "Ashwater", "", "", ""]}
            />
          </Field>
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
