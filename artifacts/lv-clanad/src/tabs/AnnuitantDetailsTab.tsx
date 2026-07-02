import { useState } from "react";
import { MdMedicalServices, MdCancel } from "react-icons/md";
import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { DoctorDatabaseModal } from "../components/DoctorDatabaseModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { WinErrorDialog } from "../components/WinErrorDialog";
import { usePlanCode } from "../context/PlanCodeContext";
import { useEditMode } from "../context/EditModeContext";

type BlockProps = {
  surname?: string;
  forename?: string;
  second?: string;
  shortName?: string;
  showShortName?: boolean;

  dob?: string;
  dod?: string;
  deathCertReceived?: boolean;
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
  doctorDisabled?: boolean;
  natInsDisabled?: boolean;
  isPlan76z?: boolean;
  natInsShowMigratedError?: boolean;
};

function AnnuitantBlock({
  surname = "",
  forename = "",
  second = "",
  shortName = "",
  showShortName = true,

  dob = "",
  dod = "",
  deathCertReceived = false,
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
  doctorDisabled = false,
  natInsDisabled = false,
  isPlan76z = false,
  natInsShowMigratedError = false,
}: BlockProps) {
  const [doctorOpen, setDoctorOpen] = useState(false);
  const [niConfirmOpen, setNiConfirmOpen] = useState(false);
  const [niMigratedOpen, setNiMigratedOpen] = useState(false);
  const { editing } = useEditMode();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6">
      {/* Column 1 — Names + Cause of Death */}
      <div>
        <Field inline labelWidth={120} label="Surname:"><TextInput value={surname} /></Field>
        <Field inline labelWidth={120} label="Forename:"><TextInput value={forename} /></Field>
        <Field inline labelWidth={120} label="2nd Name:"><TextInput value={second} /></Field>
        {showShortName && (
          <Field inline labelWidth={120} label="Short Name:"><TextInput value={shortName} /></Field>
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
        <Field inline labelWidth={120} label="DOB:"><DatePicker value={dob} placeholder="DOB" /></Field>
        {showDod && (
          <>
            <Field inline labelWidth={120} label="DOD:">
              <DatePicker value={dod} placeholder="DOD" />
            </Field>
            <Field inline labelWidth={120} label="">
              <Checkbox label="Death Cert Received?" checked={deathCertReceived} />
            </Field>
          </>
        )}
        <Field inline labelWidth={120} label="Enhanced?:"><TextInput value={enhanced} disabled /></Field>
        {!isPlan76z && (
          <>
            <Field inline labelWidth={120} label="Doctor:">
              <div className="flex items-center gap-2">
                <div className="w-32 shrink-0">
                  <TextInput value={doctor} />
                </div>
                <button
                  type="button"
                  onClick={() => editing && setDoctorOpen(true)}
                  disabled={!editing}
                  className="lve-btn lve-btn-secondary !rounded-full !p-0 !w-10 !h-10 shrink-0 inline-flex items-center justify-center"
                  title="Doctor Database"
                  aria-label="Doctor Database"
                >
                  <MdMedicalServices size={18} />
                </button>
              </div>
            </Field>
            <Field inline labelWidth={120} label="">
              <TextInput value={doctorName} disabled />
            </Field>
          </>
        )}
        <Field inline labelWidth={120} label="Nat ins no:">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <TextInput value={natIns} />
            </div>
            <button
              type="button"
              disabled={natInsDisabled || (editing && !natInsShowMigratedError)}
              onClick={() => natInsShowMigratedError ? setNiMigratedOpen(true) : setNiConfirmOpen(true)}
              className="lve-btn lve-btn-secondary !rounded-full !p-0 !w-10 !h-10 shrink-0 inline-flex items-center justify-center"
              title="Click here to delete NI Number"
              aria-label="Click here to delete NI Number"
            >
              <MdCancel size={18} />
            </button>
          </div>
        </Field>
        <Field inline labelWidth={120} label="Gender:">
          <SelectInput value={gender} options={["", "Male", "Female"]} />
        </Field>
      </div>

      {/* Column 3 — ELE/MRSD + MAR + U/W */}
      <div>
        {ele !== undefined && (
          <Field inline labelWidth={120} label="ELE:"><TextInput value={ele} disabled /></Field>
        )}
        {mrsd !== undefined && (
          <Field inline labelWidth={120} label="MRSD:"><TextInput value={mrsd} disabled /></Field>
        )}
        {!isPlan76z && (
          <>
            <Field inline labelWidth={120} label="MAR required?:">
              <TextInput value={marRequired} disabled={marRequiredDisabled} />
            </Field>
            <Field inline labelWidth={120} label={marCopyLabel}><TextInput value={marCopyToPH} /></Field>
            <Field inline labelWidth={120} label="Date MAR Sent:"><TextInput value={dateMarSent} disabled /></Field>
            <Field inline labelWidth={120} label="Date MAR Received:"><TextInput value={dateMarRec} /></Field>
          </>
        )}
        {showUwBlock && (
          <>
            <Field inline labelWidth={120} label="U/W Ref:"><TextInput value={uwRef} disabled /></Field>
            {showUwDateBlock && (
              <>
                <Field inline labelWidth={120} label="U/W Date:"><TextInput value={uwDate} disabled /></Field>
                <Field inline labelWidth={120} label="Days Since U/W:"><TextInput value={daysSinceUW} disabled /></Field>
              </>
            )}
          </>
        )}
      </div>

      <DoctorDatabaseModal open={doctorOpen} onClose={() => setDoctorOpen(false)} />

      <ConfirmDialog
        open={niConfirmOpen}
        message="Are you sure?"
        onYes={() => setNiConfirmOpen(false)}
        onNo={() => setNiConfirmOpen(false)}
      />
      <WinErrorDialog
        open={niMigratedOpen}
        message="Policy has been migrated."
        onOk={() => setNiMigratedOpen(false)}
      />
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
  const isPlan82  = planCode === "82";
  const isPlan80  = planCode === "80";
  const isPlan621 = planCode === "621";
  const isPlan76  = planCode === "76";
  const isPlan76z = planCode === "76z";
  const isPlan62a = planCode === "62a";
  const isPlan611 = planCode === "611";
  const isPlan52  = planCode === "52";
  const isPlan61a = planCode === "61a";
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
            : isPlan82  ? "Testtrbbgeee"
            : isPlan80  ? "Testkrbbbaib"
            : isPlan83  ? "Testenbggajc"
            : isPlan621 ? "Testfrbaaaae.b"
            : isPlan76  ? "Testslbaabia"
            : isPlan76z ? "Testkybabihd"
            : isPlan62a ? "Testcsbbibag"
            : isPlan611 ? "Testssbaadad"
            : isPlan52  ? ""
            : isPlan61a ? "Testmhbacjcj.b"
            : "surname1"
          }
          forename={
            isPlan87  ? "Test"
            : isPlan84  ? "Rachael"
            : isPlan90  ? "Belinda"
            : isPlan51  ? "Simon"
            : isPlan82  ? "Petula"
            : isPlan80  ? "Belinda"
            : isPlan83  ? "Simon"
            : isPlan621 ? "Michael"
            : isPlan76  ? "Colin"
            : isPlan76z ? "Michael"
            : isPlan62a ? "Gordon"
            : isPlan611 ? "Ian"
            : isPlan52  ? ""
            : isPlan61a ? "Gordon"
            : "Forename1"
          }
          second={
            isPlan87  ? ""
            : isPlan84  ? "Colin"
            : isPlan90  ? ""
            : isPlan51  ? "Simon"
            : isPlan80  ? ""
            : isPlan83  ? ""
            : isPlan621 ? ""
            : isPlan76  ? ""
            : isPlan76z ? ""
            : isPlan62a ? ""
            : isPlan611 ? "Colin"
            : isPlan52  ? ""
            : isPlan61a ? ""
            : "Middlename"
          }
          shortName={
            isPlan87  ? "UGGIU T"
            : isPlan84  ? "TESTPTBBBIDE R C"
            : isPlan90  ? "TESTCTCCHIBD B"
            : isPlan51  ? "TESTSUBAABII S S"
            : isPlan82  ? "TESTTRBBGEEE P"
            : isPlan80  ? "TESTKRBBBAIB B"
            : isPlan83  ? "TESTENBGGAJC S"
            : isPlan621 ? "TESTFRBAAAAE.B M"
            : isPlan76  ? "TESTSLBAABIA C"
            : isPlan76z ? "TESTKYBABIHD M"
            : isPlan62a ? "TESTCSBBIBAG G"
            : isPlan611 ? "TESTSSBAADAD I C"
            : isPlan52  ? ""
            : isPlan61a ? "TESTMHBACJCJ.B G"
            : "ANNSNAME"
          }
          dob={
            isPlan87  ? "09/09/1956"
            : isPlan84  ? "25/10/1958"
            : isPlan90  ? "10/05/1959"
            : isPlan51  ? "31/01/1956"
            : isPlan82  ? "11/05/1955"
            : isPlan80  ? "01/02/1948"
            : isPlan83  ? "06/07/1950"
            : isPlan621 ? "07/01/1943"
            : isPlan76  ? "04/02/1915"
            : isPlan76z ? "02/02/1920"
            : isPlan62a ? "30/11/1951"
            : isPlan611 ? "25/11/1944"
            : isPlan52  ? "07/04/1953"
            : isPlan61a ? "25/08/1943"
            : "dob1"
          }
          dod={
            isPreset    ? ""
            : isPlan51  ? "26/09/2014"
            : isPlan80  ? ""
            : isPlan83  ? ""
            : isPlan621 ? "06/11/2023"
            : isPlan76  ? "28/04/2009"
            : isPlan76z ? "19/03/2015"
            : isPlan62a ? ""
            : isPlan611 ? ""
            : isPlan52  ? ""
            : isPlan61a ? "29/11/2011"
            : "DOD1"
          }
          deathCertReceived={isPlan76z}
          natIns={
            isPlan87  ? "JK-90-90-90-C"
            : isPlan84  ? "PK-25-10-58-A"
            : isPlan90  ? "CH-10-05-59-A"
            : isPlan51  ? "SB-31-01-56-A"
            : isPlan82  ? "TE-11-05-55-A"
            : isPlan80  ? "KB-01-02-48-A"
            : isPlan83  ? "EA-06-07-50-A"
            : isPlan621 ? "EX-07-01-43-A"
            : isPlan76  ? "SB-04-02-15-A"
            : isPlan76z ? "KB-02-02-20-A"
            : isPlan62a ? "CH-30-11-51-A"
            : isPlan611 ? "SB-25-11-44-A"
            : isPlan52  ? ""
            : isPlan61a ? "MW-25-08-43-A"
            : "NI1"
          }
          enhanced={isPlan621 || isPlan611 || isPlan61a ? "SP1" : isPlan76 || isPlan76z ? "ICF" : isPlan62a ? "DTE" : isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan52 ? "" : "ENHANCED"}
          doctor={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "Doctor1"}
          doctorName={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "dbDoctorName"}
          gender={
            isPlan87  ? "Male"
            : isPlan84  ? "Female"
            : isPlan90  ? "Male"
            : isPlan51  ? "Male"
            : isPlan82  ? "Male"
            : isPlan80  ? "Female"
            : isPlan83  ? "Male"
            : isPlan621 ? "Male"
            : isPlan76  ? "Female"
            : isPlan76z ? "Female"
            : isPlan62a ? "Male"
            : isPlan611 ? "Female"
            : isPlan52  ? "Female"
            : isPlan61a ? "Male"
            : ""
          }
          marRequired={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "MAR1R"}
          marCopyToPH={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "MAR1C"}
          dateMarSent={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "Mar1sent"}
          dateMarRec={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "mar1recd"}
          ele={isPlan76z ? "175" : isPlan76 ? "75" : undefined}
          mrsd={isPlan76 || isPlan76z ? "0" : undefined}
          uwRef={
            isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? ""
            : isPlan76  ? "UW027459"
            : isPlan76z ? "UW030174"
            : "DBEdUWRef"
          }
          uwDate={
            isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? ""
            : isPlan76  ? "08/01/2008"
            : isPlan76z ? "02/06/2008"
            : "DBEdUWDat"
          }
          daysSinceUW={isPlan76z ? "6581" : isPlan76 ? "6726" : ""}
          showCauseOfDeath={!isPreset && !isPlan80 && !isPlan83 && !isPlan82 && !isPlan52}
          showDod={!isPlan87 && !isPlan611}
          doctorDisabled={isPlan621 || isPlan87}
          showUwDateBlock={!isPreset && !isPlan51 && !isPlan80 && !isPlan83 && !isPlan82 && !isPlan621 && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a}
          icd1={isPlan76z ? "F01" : isPlan76 ? "447" : isPlan61a ? "155" : ""}
          icd2={isPlan61a ? "428" : ""}
          icd3={isPlan61a ? "414" : ""}
          isPlan76z={isPlan76z}
          natInsShowMigratedError={isPlan51 || isPlan80}
        />
      </Section>

      {!isPlan76 && !isPlan76z && <Section title="Dependant / Second Annuitant / Beneficiary">
        <AnnuitantBlock
          showShortName={false}
          showUwBlock={false}
          surname={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan76 || isPlan76z || isPlan62a || isPlan52 ? "" : isPlan621 ? "Testgebaaaae.b" : isPlan611 ? "Testssbaadad" : isPlan61a ? "Testmhbacjcj.b" : "surname2"}
          forename={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan52 ? "" : isPlan611 ? "Justine" : isPlan61a ? "Gordon" : "forename2"}
          second={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan52 || isPlan61a ? "" : isPlan611 ? "Diana" : "middlename2"}
          dob={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan52 ? "" : isPlan611 ? "27/05/1944" : isPlan61a ? "18/07/1946" : "dob2"}
          dod={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "DOD2"}
          natIns={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan52 ? "" : isPlan611 ? "SB-27-05-44-A" : isPlan61a ? "MW-18-07-46-A" : "NI2"}
          enhanced={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "ENHANCED"}
          doctor={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "doctor2"}
          doctorName={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "dbDoctor2Name"}
          marRequired={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "DbedEL"}
          marRequiredDisabled={!isPlan90}
          marCopyLabel="Copy to PH?:"
          marCopyToPH={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "PH2RE"}
          dateMarSent={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "mar2sent"}
          dateMarRec={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "mar2recd"}
          gender={isPlan611 ? "Male" : isPlan61a ? "Female" : ""}
          showCauseOfDeath={!isPreset && !isPlan51 && !isPlan80 && !isPlan83 && !isPlan82 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a}
          showDod={!isPlan87 && !isPlan611}
          doctorDisabled={isPlan621 || isPlan87}
          icd1=""
          icd2=""
          icd3=""
        />
      </Section>}

      {planCode === "0" && (
        <div className="rounded-[8px] border border-[#BBBBBB] bg-white overflow-hidden">
          <div className="relative h-7 w-full bg-white">
            <div
              className="absolute inset-y-0 left-0 bg-[#178830] transition-[width]"
              style={{ width: "0%" }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-['Mulish'] text-[13px] font-semibold text-[#3d3d3d]">
              0%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
