import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";

function AnnuitantBlock({
  surname = "",
  forename = "",
  second = "",
  shortName = "",
  dob = "",
  ddd = "",
  natIns = "",
  enhanced = "",
  doctor = "",
  gender = "",
  marRequired = "",
  marCopyToPH = "",
  dateMarSent = "",
  dateMarRec = "",
  uwRef = "",
  deathCert = false,
}: Record<string, string | boolean | undefined>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
      <div>
        <Field label="Surname:"><TextInput value={surname as string} /></Field>
        <Field label="Forename:"><TextInput value={forename as string} /></Field>
        <Field label="2nd Name:"><TextInput value={second as string} /></Field>
        <Field label="Short Name:"><TextInput value={shortName as string} /></Field>
      </div>
      <div>
        <Field label="DOB:"><TextInput value={dob as string} /></Field>
        <Field label="Date of Death (DOD):"><TextInput value={ddd as string} /></Field>
        <Field label="Death Cert Received?:"><Checkbox checked={deathCert as boolean} /></Field>
        <Field label="Nat ins no:"><TextInput value={natIns as string} /></Field>
        <Field label="Enhanced?:"><TextInput value={enhanced as string} /></Field>
        <Field label="Doctor:"><TextInput value={doctor as string} /></Field>
        <Field label="Gender:">
          <SelectInput value={gender as string} options={["", "Male", "Female"]} />
        </Field>
      </div>
      <div>
        <Field label="MAR required?:"><TextInput value={marRequired as string} /></Field>
        <Field label="MAR Copy to PH?:"><TextInput value={marCopyToPH as string} /></Field>
        <Field label="Date MAR Sent:"><TextInput value={dateMarSent as string} /></Field>
        <Field label="Date MAR Received:"><TextInput value={dateMarRec as string} /></Field>
        <Field label="U/W Ref:"><TextInput value={uwRef as string} /></Field>
      </div>
    </div>
  );
}

export function AnnuitantDetailsTab() {
  return (
    <div className="space-y-4">
      <Section title="Annuitant">
        <AnnuitantBlock
          surname="Turner"
          forename="Linda"
          shortName="TURNER L"
          dob="26/02/1959"
          natIns="WE-26-35-52-B"
          gender="Female"
        />
      </Section>

      <Section title="Dependant / Second Annuitant / Beneficiary">
        <AnnuitantBlock />
      </Section>
    </div>
  );
}
