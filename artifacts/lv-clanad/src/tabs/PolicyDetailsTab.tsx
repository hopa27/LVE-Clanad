import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";

export function PolicyDetailsTab() {
  return (
    <div className="columns-1 lg:columns-3 gap-4 [&>section]:break-inside-avoid [&>section]:mb-4">
      <Section title="Policy Details">
        <Field label="Online Application:"><Checkbox /></Field>
        <Field label="Tax Code:">
          <div className="flex items-center gap-3">
            <div className="w-32">
              <TextInput value="DBTAXC" />
            </div>
            <Checkbox label="Tax Free" />
          </div>
        </Field>
        <Field label="Initial payment method:">
          <SelectInput value="" options={["", "B", "C", "T"]} />
        </Field>
        <Field label="Pay Tax Free Cash by:">
          <SelectInput value="" options={["", "B", "C", "T"]} />
        </Field>
        <Field label="IR Max Pension:"><TextInput value="dbirmax" /></Field>
        <Field label="IR Balance:"><TextInput value="DBEdit10" /></Field>
        <Field label="ReAssurance Premium:"><TextInput value="dbreassprem" /></Field>
        <Field label="ReAssurer:"><TextInput value="dbReassurer" /></Field>
        <Field label="Evidence of Age:"><TextInput value="DB" /></Field>
        <Field label="Advice Type:">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <SelectInput value="" options={["", "Non advised", "Advised"]} />
            </div>
            <span className="text-[12px] font-['Mulish'] text-[#3d3d3d] whitespace-nowrap">
              er (invisible)
            </span>
          </div>
        </Field>
        <Field label="Distribution Channel:">
          <SelectInput value="" options={["", "Whole of market", "Restricted"]} />
        </Field>
        <Field label="Money Laundering Form:"><TextInput value="DB" /></Field>
        <Field label="Advised Sale Info:">
          <SelectInput value="" options={["", "Yes", "No"]} />
        </Field>
        <Field label="Internal Maturity Transfer:"><Checkbox /></Field>
        <Field label="Scheme Pension:">
          <SelectInput value="DBLookupComl" options={["DBLookupComl", "No", "Yes"]} />
        </Field>
        <Field label="Purchaser:"><TextInput value="DBEdit5" /></Field>
        <Field label="Policy Owner:">
          <SelectInput value="" options={[""]} />
        </Field>
      </Section>

      <Section title="IFA Contact Details">
        <Field label="Name:"><TextInput value="DBEditBrokerName" disabled /></Field>
        <Field label="Building:"><TextInput value="DBEdBuilding" disabled /></Field>
        <Field label="Street:"><TextInput value="DBEdStreet" disabled /></Field>
        <Field label="City:"><TextInput value="DBEdCity" disabled /></Field>
        <Field label="District:"><TextInput value="DBEdDistrict" disabled /></Field>
        <Field label="County:"><TextInput value="DBEdCounty" disabled /></Field>
        <Field label="Post Code:"><TextInput value="DBEdPostcode" disabled /></Field>
        <Field label="FAO:"><TextInput value="DBEditCONTACT_TXT" disabled /></Field>
        <Field label="Email:"><TextInput value="DBEditEMAIL_TO_TXT" /></Field>
        <Field label="Tel:"><TextInput value="DBEdIFA_TEL" disabled /></Field>
      </Section>

      <Section title="IFA Details">
        <Field label="IFA Ref:"><TextInput value="BDIFAREF" disabled /></Field>
        <Field label="Adviser Charge %:"><TextInput value="edtAdviserChar" /></Field>
        <Field label="Adviser Charge:"><TextInput value="edtAdviserChar" /></Field>
        <Field label="Key Account:"><TextInput value="DBEdit4" disabled /></Field>
        <Field label="Region:"><TextInput value="DBEdit12" disabled /></Field>
      </Section>

      <Section title="Statements & Letters">
        <Field label="Issue Statements:">
          <SelectInput value="" options={[""]} />
        </Field>
        <Field label="Copy Annual Statement to IFA:">
          <SelectInput value="" options={[""]} />
        </Field>
        <Field label="Copy Annual Statement to Policyholder:">
          <SelectInput value="" options={[""]} />
        </Field>
        <Field label="Issue wake up letters/maturity chasers:">
          <SelectInput value="dblcMat" options={["dblcMat"]} />
        </Field>
      </Section>

      <Section title="Certificate of Existence Details">
        <Field label="CoE No:"><TextInput value="" /></Field>
        <Field label="CoE Received Date:">
          <DatePicker value="DbEdCoERe" placeholder="DbEdCoERe" />
        </Field>
        <Field label="CoE Due Date:">
          <DatePicker value="DbEdCoEDu" placeholder="DbEdCoEDu" disabled />
        </Field>
        <Field label="CoE Due — Sent Date:">
          <DatePicker value="DbEdCoESe" placeholder="DbEdCoESe" disabled />
        </Field>
        <Field label="CoE Follow Up 1 Date:">
          <DatePicker value="DbEdFollow" placeholder="DbEdFollow" />
        </Field>
        <Field label="Follow Up 1 — Sent Date:">
          <DatePicker value="DbEdCoEFo" placeholder="DbEdCoEFo" disabled />
        </Field>
        <Field label="CoE Follow Up 2 Date:">
          <DatePicker value="DbEdFollow" placeholder="DbEdFollow" />
        </Field>
        <Field label="Follow Up 2 — Sent Date:">
          <DatePicker value="DbEdCoEFo" placeholder="DbEdCoEFo" disabled />
        </Field>
      </Section>

      <Section title="P45 Details">
        <Field label="P45 date rec'd:"><TextInput value="bdp45recd" /></Field>
        <Field label="P45 Tax Paid:"><TextInput value="bdp45taxpaid" /></Field>
        <Field label="P45 Gross Pay:"><TextInput value="bdp45grosspay" /></Field>
        <Field label="Adviser Charge:"><Checkbox /></Field>
        <Field label="Serious ill health:">
          <DatePicker value="DbEdSeriou" placeholder="DbEdSeriou" />
        </Field>
      </Section>

      <Section title="MPAA">
        <Field label=" ">
          <Checkbox label="MPAA Rules Triggered" />
        </Field>
        <Field label="Date MPAA Letter Issued:">
          <TextInput value="dbEditMPAAIssued" disabled />
        </Field>
      </Section>

      <Section title="Agency Deceased">
        <Field label="Deceased Date:">
          <DatePicker value="dteAgencyDe" placeholder="dteAgencyDe" disabled />
        </Field>
        <Field label="Agency Ref:">
          <TextInput value="edtAgencyDecea" disabled />
        </Field>
        <Field label="Agency Unique Ref:">
          <TextInput value="edtAgencyDecNo" disabled />
        </Field>
        <Field label="Notification Date:">
          <DatePicker value="dteAgencyDe" placeholder="dteAgencyDe" disabled />
        </Field>
      </Section>

      <Section title="Non Standard Policy">
        <Field label="Non Std Flag:">
          <div className="w-24">
            <TextInput value="" />
          </div>
        </Field>
        <Field label="Non Standard Policy:">
          <TextInput value="dbNonStdNote" />
        </Field>
      </Section>
    </div>
  );
}
