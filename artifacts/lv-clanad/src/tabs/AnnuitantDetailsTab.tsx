import { useState } from "react";
import { MdLocalHospital } from "react-icons/md";
import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { DoctorDatabaseModal } from "../components/DoctorDatabaseModal";

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
  showShortName = true,
  showUwRef = true,
}: Record<string, string | boolean | undefined>) {
  const [doctorOpen, setDoctorOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
      <div>
        <Field label="Surname:"><TextInput value={surname as string} /></Field>
        <Field label="Forename:"><TextInput value={forename as string} /></Field>
        <Field label="2nd Name:"><TextInput value={second as string} /></Field>
        {showShortName && (
          <Field label="Short Name:"><TextInput value={shortName as string} /></Field>
        )}
      </div>
      <div>
        <Field label="DOB:"><DatePicker value={dob as string} placeholder="DOB" /></Field>
        <Field label="DOD:"><DatePicker value={ddd as string} placeholder="DOD" /></Field>
        <Field label="Death Cert Received?:"><Checkbox checked={deathCert as boolean} /></Field>
        <Field label="Nat ins no:"><TextInput value={natIns as string} /></Field>
        <Field label="Enhanced?:"><TextInput value={enhanced as string} disabled /></Field>
        <Field label="Doctor:">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <TextInput value={doctor as string} />
            </div>
            <button
              type="button"
              onClick={() => setDoctorOpen(true)}
              className="lve-btn lve-btn-secondary lve-btn-sm !px-3 shrink-0"
              title="Doctor Database"
              aria-label="Doctor Database"
            >
              <MdLocalHospital size={18} />
            </button>
          </div>
        </Field>
        <Field label="Gender:">
          <SelectInput value={gender as string} options={["", "Male", "Female"]} />
        </Field>
      </div>
      <div>
        <Field label="MAR required?:"><TextInput value={marRequired as string} /></Field>
        <Field label="MAR Copy to PH?:"><TextInput value={marCopyToPH as string} /></Field>
        <Field label="Date MAR Sent:"><TextInput value={dateMarSent as string} disabled /></Field>
        <Field label="Date MAR Received:"><TextInput value={dateMarRec as string} /></Field>
        {showUwRef && (
          <Field label="U/W Ref:"><TextInput value={uwRef as string} disabled /></Field>
        )}
      </div>
      <DoctorDatabaseModal open={doctorOpen} onClose={() => setDoctorOpen(false)} />
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
        <AnnuitantBlock showShortName={false} showUwRef={false} />
      </Section>
    </div>
  );
}
