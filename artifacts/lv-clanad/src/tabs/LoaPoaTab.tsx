import { Field, TextInput, Section } from "../components/Field";
import { MdEdit, MdCheck, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import { DatePicker } from "../components/DatePicker";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { usePlanCode } from "../context/PlanCodeContext";
import { EditModeProvider, useEditMode } from "../context/EditModeContext";

function LoaPoaButtons() {
  const { editing, setEditing, cancel } = useEditMode();
  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <button
            type="button"
            className="lve-btn lve-btn-sm"
            onClick={() => setEditing(false)}
            title="Save"
          >
            <MdCheck size={16} /> Save
          </button>
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm"
            onClick={cancel}
            title="Cancel"
          >
            <MdClose size={16} /> Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          className="lve-btn lve-btn-secondary lve-btn-sm"
          onClick={() => setEditing(true)}
          title="Edit"
        >
          <MdEdit size={16} /> Edit
        </button>
      )}
    </div>
  );
}

function LoaPoaForm() {
  const { planCode } = usePlanCode();
  const { editing } = useEditMode();
  const isPlan0 = planCode === "0";

  return (
    <Section title="LOA / POA Details" headerAction={<LoaPoaButtons />}>
      <div className="max-w-xl">
        <Field inline labelWidth={140} label="LOA/POA:">
          <div className="relative">
            <select className="lve-input pr-12 appearance-none" disabled={!editing}>
              <option value="">—</option>
              <option value="Letter of Authority">Letter of Authority</option>
              <option value="Power of Attorney">Power of Attorney</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              <span className="h-6 w-px bg-[#BBBBBB]" />
              <span className="px-3 text-[#006cf4]">
                <MdKeyboardArrowDown size={22} />
              </span>
            </div>
          </div>
        </Field>
        <Field inline labelWidth={140} label="Name:">
          <TextInput value={isPlan0 ? "LoaPoaName" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Company:">
          <TextInput value={isPlan0 ? "LoaPoaCompany" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Address:">
          <ConnectedAddress
            lines={[
              { placeholder: "Line 1" },
              { placeholder: "Line 2" },
              { placeholder: "Line 3" },
            ]}
            initial={
              isPlan0
                ? ["LoaPoaAddressLine1", "LoaPoaAddressLine2", "LoaPoaAddressLine3"]
                : ["", "", ""]
            }
          />
        </Field>
        <Field inline labelWidth={140} label="Postal Code:">
          <TextInput value={isPlan0 ? "LoaPoaPostalCode" : ""} />
        </Field>
        <Field inline labelWidth={140} label="Date Appointed:">
          <DatePicker placeholder="DD/MM/YYYY" />
        </Field>
        <Field inline labelWidth={140} label="Telephone:">
          <TextInput value={isPlan0 ? "LoaPoaTelephone" : ""} />
        </Field>
      </div>
    </Section>
  );
}

export function LoaPoaTab() {
  return (
    <EditModeProvider>
      <LoaPoaForm />
    </EditModeProvider>
  );
}
