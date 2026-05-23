import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { DatePicker } from "../components/DatePicker";

export function ApplicationDetailsTab() {
  return (
    <div className="space-y-4">
      {/* Top main grid — 4 columns matching legacy form */}
      <div className="panel panel-body grid grid-cols-1 lg:grid-cols-4 gap-x-6">
        {/* Column 1 */}
        <div>
          <Field label="Set Up Date:"><TextInput value="DBEditAPPLI" disabled /></Field>
          <Field label="Received Date:"><TextInput value="DBEditAPPLIC" /></Field>
          <Field label="Start Date:"><TextInput value="edtStartdate" /></Field>
          <div className="mb-2 mt-1 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
            WPPA amendment notification date
          </div>
          <Field label="From:"><TextInput value="" disabled /></Field>
          <Field label="To:"><TextInput value="" disabled /></Field>
          <Field label="Accept Date:"><TextInput value="DBEdit21" disabled /></Field>
          <Field label="IFA Payment Date:"><TextInput value="DBEdit13" /></Field>
          <Field label="PostADay:"><Checkbox /></Field>
          <Field label="Transfer from Beneficiary Drawdown?:">
            <SelectInput value="DBBeneficiary" options={["Yes", "No", "Unknown"]} />
          </Field>
        </div>

        {/* Column 2 */}
        <div>
          <Field label="Special Status:"><TextInput value="DBSp" disabled /></Field>
          <Field label="Final Quote Issued Date:"><TextInput value="DBEdit16" disabled /></Field>
          <Field label="Status:"><TextInput value="status" disabled /></Field>
          <Field label="Suspended:"><TextInput value="DBSu" disabled /></Field>
          <Field label="Days Since Application:"><TextInput value="dbday" disabled /></Field>
          <Field label="Hosp'd Date:"><TextInput value="dbedHospdDat" /></Field>
          <Field label="LTA Details:"><Checkbox /></Field>
        </div>

        {/* Column 3 */}
        <div>
          <Field label="GAD Anniversary:">
            <div className="flex gap-2">
              <TextInput value="10" className="!w-16" disabled />
              <SelectInput value="dbe" options={[
                "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
              ]} disabled />
              <TextInput value="13" className="!w-16" disabled />
            </div>
          </Field>
          <Field label="Life One Dead:"><TextInput value="DBLifeOneDe" disabled /></Field>
          <Field label="Life Two Dead:"><TextInput value="DBLifeTwoDe" disabled /></Field>
          <Field label="Completed:"><TextInput value="DBCompeted" disabled /></Field>
          <Field label="Closed:"><TextInput value="DBClosed" disabled /></Field>
          <Field label="Age at death:"><TextInput value="edAge" disabled /></Field>
          <Field label="Gross £:"><TextInput value="dbedGross" /></Field>
          <Field label="Paid net:">
            <div className="flex items-center gap-2">
              <Checkbox />
              <TextInput value="dbedPaidNet" disabled />
            </div>
          </Field>
          <Field label="Date Paid:"><DatePicker value="" placeholder="Date Paid" /></Field>
          <Field label="Payee:"><TextInput value="dbedPayee" /></Field>
          <Field label="Trustee:"><Checkbox /></Field>
          <div className="mt-2">
            <button type="button" className="lve-btn lve-btn-sm">
              Create payment...
            </button>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <Field label="Quote Expiry Date:"><TextInput value="dbedQuoteEx" disabled /></Field>
          <Field label="Last amended by:"><TextInput value="DBEdit18" disabled /></Field>
          <Field label="App Created by:"><TextInput value="DBEdit14" disabled /></Field>
          <Field label="Final Quote Issued by:"><TextInput value="DBEdit19" disabled /></Field>
          <Field label="Rates Ok'd by:"><TextInput value="DBEdit7" disabled /></Field>
          <Field label="Paykey:"><TextInput value="DBEdit20" disabled /></Field>
          <Field label="Policy No:"><TextInput value="DBEdit24" disabled /></Field>
          <Field label="Dependant Eligible to Receive Benefits:">
            <TextInput value="edtEli" disabled />
          </Field>
        </div>
      </div>

      {/* Two-column section panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Correspondence Details">
          <Field label="Correspond Name:"><TextInput value="correspname" /></Field>
          <Field label="Salutation Name:"><TextInput value="salname" /></Field>
          <Field label="Telephone:"><TextInput value="anntele" /></Field>
          <Field label="E-mail:"><TextInput value="DBEditPH_EMAIL" /></Field>
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
              initial={["phad1", "phad2", "phad3", "phad4", "phad5"]}
            />
          </Field>
          <Field label="Postcode:"><TextInput value="phpc" /></Field>
          <Field label="Country:">
            <SelectInput value="cmbCountry" options={["United Kingdom", "Ireland", "Other"]} />
          </Field>
          <div className="mt-2"><Checkbox label="Address Unknown / Gone Away" /></div>
        </Section>
      </div>
    </div>
  );
}
