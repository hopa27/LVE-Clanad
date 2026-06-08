import { useState } from "react";
import { MdMedicalServices, MdEdit } from "react-icons/md";
import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { DoctorDatabaseModal } from "../components/DoctorDatabaseModal";
import { usePlanCode } from "../context/PlanCodeContext";

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

  ele?: string;
  mrsd?: string;

  uwRef?: string;
  uwDate?: string;
  daysSinceUW?: string;
  showUwBlock?: boolean;
  showUwDateBlock?: boolean;

  icd1?: string;
  icd2?: string;
  icd3?: string;
  showCauseOfDeath?: boolean;
  showDod?: boolean;
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

  ele,
  mrsd,

  uwRef = "",
  uwDate = "",
  daysSinceUW = "",
  showUwBlock = true,
  showUwDateBlock = true,

  icd1 = "",
  icd2 = "",
  icd3 = "",
  showCauseOfDeath = true,
  showDod = true,
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

        {showCauseOfDeath && (
          <>
            <div className="mt-2 mb-2 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
              Cause of Death:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Field label="ICD#1"><TextInput value={icd1} /></Field>
              <Field label="ICD#2"><TextInput value={icd2} /></Field>
              <Field label="ICD#3"><TextInput value={icd3} /></Field>
            </div>
          </>
        )}
      </div>

      {/* Column 2 — DOB / DOD / Nat ins / Enhanced / Doctor / Gender */}
      <div>
        <Field label="DOB:"><DatePicker value={dob} placeholder="DOB" /></Field>
        {showDod && (
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
        )}
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

      {/* Column 3 — ELE/MRSD + MAR + U/W */}
      <div>
        {ele !== undefined && (
          <Field label="ELE:"><TextInput value={ele} disabled /></Field>
        )}
        {mrsd !== undefined && (
          <Field label="MRSD:"><TextInput value={mrsd} disabled /></Field>
        )}
        <Field label="MAR required?:">
          <TextInput value={marRequired} disabled={marRequiredDisabled} />
        </Field>
        <Field label={marCopyLabel}><TextInput value={marCopyToPH} /></Field>
        <Field label="Date MAR Sent:"><TextInput value={dateMarSent} disabled /></Field>
        <Field label="Date MAR Received:"><TextInput value={dateMarRec} /></Field>
        {showUwBlock && (
          <>
            <Field label="U/W Ref:"><TextInput value={uwRef} disabled /></Field>
            {showUwDateBlock && (
              <>
                <Field label="U/W Date:"><TextInput value={uwDate} disabled /></Field>
                <Field label="Days Since U/W:"><TextInput value={daysSinceUW} disabled /></Field>
              </>
            )}
          </>
        )}
      </div>

      <DoctorDatabaseModal open={doctorOpen} onClose={() => setDoctorOpen(false)} />
    </div>
  );
}

export function AnnuitantDetailsTab() {
  const { planCode } = usePlanCode();
  const isPlan87  = planCode === "87";
  const isPlan84  = planCode === "84";
  const isPlan90  = planCode === "90";
  const isPlan51  = planCode === "51";
  const isPlan83  = planCode === "83";
  const isPlan621 = planCode === "621";
  const isPlan76  = planCode === "76";
  const isPreset  = isPlan87 || isPlan84 || isPlan90;

  return (
    <div className="space-y-4">
      <Section title="Annuitant">
        <AnnuitantBlock
          surname={
            isPlan87  ? "Uggiu"
            : isPlan84  ? "Testptbbbide"
            : isPlan90  ? "Testctcchibd"
            : isPlan51  ? "Testsubaabii"
            : isPlan83  ? "Testenbggajc"
            : isPlan621 ? "Testfrbaaaae.b"
            : isPlan76  ? "Testslbaabia"
            : "surname1"
          }
          forename={
            isPlan87  ? "Test"
            : isPlan84  ? "Rachael"
            : isPlan90  ? "Belinda"
            : isPlan51  ? "Simon"
            : isPlan83  ? "Simon"
            : isPlan621 ? "Michael"
            : isPlan76  ? "Colin"
            : "Forename1"
          }
          second={
            isPlan87  ? ""
            : isPlan84  ? "Colin"
            : isPlan90  ? ""
            : isPlan51  ? "Simon"
            : isPlan83  ? ""
            : isPlan621 ? ""
            : isPlan76  ? ""
            : "Middlename"
          }
          shortName={
            isPlan87  ? "UGGIU T"
            : isPlan84  ? "TESTPTBBBIDE R C"
            : isPlan90  ? "TESTCTCCHIBD B"
            : isPlan51  ? "TESTSUBAABII S S"
            : isPlan83  ? "TESTENBGGAJC S"
            : isPlan621 ? "TESTFRBAAAAE.B M"
            : isPlan76  ? "TESTSLBAABIA C"
            : "ANNSNAME"
          }
          dob={
            isPlan87  ? "09/09/1956"
            : isPlan84  ? "25/10/1958"
            : isPlan90  ? "10/05/1959"
            : isPlan51  ? "31/01/1956"
            : isPlan83  ? "06/07/1950"
            : isPlan621 ? "07/01/1943"
            : isPlan76  ? "04/02/1915"
            : "dob1"
          }
          dod={
            isPreset    ? ""
            : isPlan51  ? "26/09/2014"
            : isPlan83  ? ""
            : isPlan621 ? "06/11/2023"
            : isPlan76  ? "28/04/2009"
            : "DOD1"
          }
          natIns={
            isPlan87  ? "JK-90-90-90-C"
            : isPlan84  ? "PK-25-10-58-A"
            : isPlan90  ? "CH-10-05-59-A"
            : isPlan51  ? "SB-31-01-56-A"
            : isPlan83  ? "EA-06-07-50-A"
            : isPlan621 ? "EX-07-01-43-A"
            : isPlan76  ? "SB-04-02-15-A"
            : "NI1"
          }
          enhanced={isPlan621 ? "SP1" : isPlan76 ? "ICF" : isPreset || isPlan51 || isPlan83 ? "" : "ENHANCED"}
          doctor={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "Doctor1"}
          doctorName={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "dbDoctorName"}
          gender={
            isPlan87  ? "Male"
            : isPlan84  ? "Female"
            : isPlan90  ? "Male"
            : isPlan51  ? "Male"
            : isPlan83  ? "Male"
            : isPlan621 ? "Male"
            : isPlan76  ? "Female"
            : ""
          }
          marRequired={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "MAR1R"}
          marCopyToPH={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "MAR1C"}
          dateMarSent={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "Mar1sent"}
          dateMarRec={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "mar1recd"}
          ele={isPlan76 ? "75" : undefined}
          mrsd={isPlan76 ? "0" : undefined}
          uwRef={
            isPreset || isPlan51 || isPlan83 || isPlan621 ? ""
            : isPlan76 ? "UW027459"
            : "DBEdUWRef"
          }
          uwDate={
            isPreset || isPlan51 || isPlan83 || isPlan621 ? ""
            : isPlan76 ? "08/01/2008"
            : "DBEdUWDat"
          }
          daysSinceUW={isPlan76 ? "6726" : ""}
          showCauseOfDeath={!isPreset && !isPlan83}
          showDod={!isPlan87 && !isPlan90}
          showUwDateBlock={!isPreset && !isPlan51 && !isPlan83 && !isPlan621}
          icd1={isPlan76 ? "447" : ""}
          icd2=""
          icd3=""
        />
      </Section>

      {!isPlan76 && <Section title="Dependant / Second Annuitant / Beneficiary">
        <AnnuitantBlock
          showShortName={false}
          showUwBlock={false}
          surname={isPreset || isPlan51 || isPlan83 || isPlan76 ? "" : isPlan621 ? "Testgebaaaae.b" : "surname2"}
          forename={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "forename2"}
          second={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "middlename2"}
          dob={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "dob2"}
          dod={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "DOD2"}
          natIns={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "NI2"}
          enhanced={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "ENHANCED"}
          doctor={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "doctor2"}
          doctorName={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "dbDoctor2Name"}
          marRequired={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "DbedEL"}
          marRequiredDisabled={!isPlan90}
          marCopyLabel="Copy to PH?:"
          marCopyToPH={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "PH2RE"}
          dateMarSent={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "mar2sent"}
          dateMarRec={isPreset || isPlan51 || isPlan83 || isPlan621 || isPlan76 ? "" : "mar2recd"}
          showCauseOfDeath={!isPreset && !isPlan51 && !isPlan83 && !isPlan621 && !isPlan76}
          showDod={!isPlan87}
          icd1=""
          icd2=""
          icd3=""
        />
      </Section>}

      {!isPlan76 && <div className="rounded-[8px] border border-[#BBBBBB] bg-white overflow-hidden">
        <div className="relative h-7 w-full bg-white">
          <div
            className="absolute inset-y-0 left-0 bg-[#178830] transition-[width]"
            style={{ width: "0%" }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-['Mulish'] text-[13px] font-semibold text-[#3d3d3d]">
            0%
          </div>
        </div>
      </div>}
    </div>
  );
}
