import { useState } from "react";
import { MdMedicalServices, MdEdit } from "react-icons/md";
import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { DoctorDatabaseModal } from "../components/DoctorDatabaseModal";

type BlockProps = {
  surname?: string;
  forename?: string;
  second?: string;
  shortName?: string;
  showShortName?: boolean;

  dob?: string;
  dod?: string;
  natIns?: string;
  enhanced?: string;
  doctor?: string;
  doctorName?: string;
  gender?: string;

  marRequired?: string;
  marRequiredDisabled?: boolean;
  marCopyLabel?: string;
  marCopyToPH?: string;
  dateMarSent?: string;
  dateMarRec?: string;

  uwRef?: string;
  uwDate?: string;
  daysSinceUW?: string;
  showUwBlock?: boolean;

  icd1?: string;
  icd2?: string;
  icd3?: string;
};

function AnnuitantBlock({
  surname = "",
  forename = "",
  second = "",
  shortName = "",
  showShortName = true,

  dob = "",
  dod = "",
  natIns = "",
  enhanced = "",
  doctor = "",
  doctorName = "",
  gender = "",

  marRequired = "",
  marRequiredDisabled = false,
  marCopyLabel = "MAR Copy to PH?:",
  marCopyToPH = "",
  dateMarSent = "",
  dateMarRec = "",

  uwRef = "",
  uwDate = "",
  daysSinceUW = "",
  showUwBlock = true,

  icd1 = "",
  icd2 = "",
  icd3 = "",
}: BlockProps) {
  const [doctorOpen, setDoctorOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
      {/* Column 1 — Names + Cause of Death */}
      <div>
        <Field label="Surname:"><TextInput value={surname} /></Field>
        <Field label="Forename:"><TextInput value={forename} /></Field>
        <Field label="2nd Name:"><TextInput value={second} /></Field>
        {showShortName && (
          <Field label="Short Name:"><TextInput value={shortName} /></Field>
        )}

        <div className="mt-2 mb-2 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
          Cause of Death:
        </div>
        <div className="grid grid-cols-3 gap-2">
          <Field label="ICD#1"><TextInput value={icd1} /></Field>
          <Field label="ICD#2"><TextInput value={icd2} /></Field>
          <Field label="ICD#3"><TextInput value={icd3} /></Field>
        </div>
      </div>

      {/* Column 2 — DOB / DOD / Nat ins / Enhanced / Doctor / Gender */}
      <div>
        <Field label="DOB:"><DatePicker value={dob} placeholder="DOB" /></Field>
        <Field label="DOD:">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <DatePicker value={dod} placeholder="DOD" />
            </div>
            <div className="shrink-0">
              <Checkbox label="Death Cert Received?" />
            </div>
          </div>
        </Field>
        <Field label="Nat ins no:">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <TextInput value={natIns} />
            </div>
            <button
              type="button"
              className="lve-btn lve-btn-secondary !rounded-full !p-0 !w-10 !h-10 shrink-0 inline-flex items-center justify-center"
              title="Edit Nat ins"
              aria-label="Edit Nat ins"
            >
              <MdEdit size={18} />
            </button>
          </div>
        </Field>
        <Field label="Enhanced?:"><TextInput value={enhanced} disabled /></Field>
        <Field label="Doctor:">
          <div className="flex items-center gap-2">
            <div className="w-32 shrink-0">
              <TextInput value={doctor} />
            </div>
            <button
              type="button"
              onClick={() => setDoctorOpen(true)}
              className="lve-btn lve-btn-secondary !rounded-full !p-0 !w-10 !h-10 shrink-0 inline-flex items-center justify-center"
              title="Doctor Database"
              aria-label="Doctor Database"
            >
              <MdMedicalServices size={18} />
            </button>
            <div className="flex-1 min-w-0">
              <TextInput value={doctorName} disabled />
            </div>
          </div>
        </Field>
        <Field label="Gender:">
          <SelectInput value={gender} options={["", "Male", "Female"]} />
        </Field>
      </div>

      {/* Column 3 — MAR + U/W */}
      <div>
        <Field label="MAR required?:">
          <TextInput value={marRequired} disabled={marRequiredDisabled} />
        </Field>
        <Field label={marCopyLabel}><TextInput value={marCopyToPH} /></Field>
        <Field label="Date MAR Sent:"><TextInput value={dateMarSent} disabled /></Field>
        <Field label="Date MAR Received:"><TextInput value={dateMarRec} /></Field>
        {showUwBlock && (
          <>
            <Field label="U/W Ref:"><TextInput value={uwRef} disabled /></Field>
            <Field label="U/W Date:"><TextInput value={uwDate} disabled /></Field>
            <Field label="Days Since U/W:"><TextInput value={daysSinceUW} disabled /></Field>
          </>
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
          surname="surname1"
          forename="Forename1"
          second="Middlename"
          shortName="ANNSNAME"
          dob="dob1"
          dod="DOD1"
          natIns="NI1"
          enhanced="ENHANCED"
          doctor="Doctor1"
          doctorName="dbDoctorName"
          marRequired="MAR1R"
          marCopyToPH="MAR1C"
          dateMarSent="Mar1sent"
          dateMarRec="mar1recd"
          uwRef="DBEdUWRef"
          uwDate="DBEdUWDat"
          daysSinceUW=""
          icd1="DbedLif"
          icd2="DbedLif"
          icd3="DbedLif"
        />
      </Section>

      <Section title="Dependant / Second Annuitant / Beneficiary">
        <AnnuitantBlock
          showShortName={false}
          showUwBlock={false}
          surname="surname2"
          forename="forename2"
          second="middlename2"
          dob="dob2"
          dod="DOD2"
          natIns="NI2"
          enhanced="ENHANCED"
          doctor="doctor2"
          doctorName="dbDoctor2Name"
          marRequired="DbedEL"
          marRequiredDisabled
          marCopyLabel="Copy to PH?:"
          marCopyToPH="PH2RE"
          dateMarSent="mar2sent"
          dateMarRec="mar2recd"
          icd1="DBedLif"
          icd2="DBedLif"
          icd3="DBedLif"
        />
      </Section>
    </div>
  );
}
