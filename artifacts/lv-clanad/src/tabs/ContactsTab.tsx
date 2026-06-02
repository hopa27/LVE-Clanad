import { Field, TextInput, Section } from "../components/Field";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { MdClear } from "react-icons/md";
import { usePlanCode } from "../context/PlanCodeContext";

function ContactPanel({
  title,
  prefix,
  showCoName = false,
  showProvName = false,
  showRelationship = false,
  showPoaReceived = false,
  showProviderId = false,
  showContractReceived = false,
  postcodeName,
}: {
  title: string;
  prefix: string;
  showCoName?: boolean;
  showProvName?: boolean;
  showRelationship?: boolean;
  showPoaReceived?: boolean;
  showProviderId?: boolean;
  showContractReceived?: boolean;
  postcodeName: string;
}) {
  return (
    <Section title={title}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
        <Field label="Corres Name:">
          <TextInput value={`${prefix}CorresName`} />
        </Field>
        <Field label="Salutation:">
          <TextInput value={`${prefix}Salutation`} />
        </Field>
      </div>

      {showCoName && (
        <Field label="Co. Name:">
          <TextInput value={`${prefix}CoName`} />
        </Field>
      )}
      {showProvName && (
        <Field label="Prov. Name:">
          <TextInput value={`${prefix}ProvName`} />
        </Field>
      )}

      <Field label="Address:">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <ConnectedAddress
              lines={[
                { placeholder: "Line 1" },
                { placeholder: "Line 2" },
                { placeholder: "Line 3" },
                { placeholder: "Line 4" },
                { placeholder: "Line 5" },
              ]}
              initial={[
                `${prefix}Address1`,
                `${prefix}Address2`,
                `${prefix}Address3`,
                `${prefix}Address4`,
                `${prefix}Address5`,
              ]}
            />
          </div>
          <button
            type="button"
            className="lve-btn lve-btn-secondary shrink-0 inline-flex items-center gap-1"
            title="Clear address"
          >
            <MdClear size={16} />
            Clear
          </button>
        </div>
      </Field>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
        <Field label="Postcode:">
          <TextInput value={postcodeName} />
        </Field>
        <Field label="Tel.:">
          <TextInput value={`${prefix}Tel`} />
        </Field>
      </div>

      {(showRelationship || showPoaReceived) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          {showRelationship && (
            <Field label="Relationship:">
              <TextInput value={`${prefix}Relationship`} />
            </Field>
          )}
          {showPoaReceived && (
            <Field label="POA Received?:">
              <TextInput value="DBE" disabled />
            </Field>
          )}
        </div>
      )}

      {(showProviderId || showContractReceived) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          {showProviderId && (
            <Field label="Provider ID:">
              <TextInput value={`${prefix}ID`} />
            </Field>
          )}
          {showContractReceived && (
            <Field label="ContractReceived?:">
              <TextInput value="DBE" disabled />
            </Field>
          )}
        </div>
      )}
    </Section>
  );
}

function Plan83ContactsLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Section title="Scheme Details">
        <Field label="Wrapper Name:">
          <TextInput value="NM Pensions Trustees Ltd" />
        </Field>
        <Field label="Address:">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <ConnectedAddress
                lines={[
                  { placeholder: "Line 1" },
                  { placeholder: "Line 2" },
                  { placeholder: "Line 3" },
                  { placeholder: "Line 4" },
                  { placeholder: "Line 5" },
                ]}
                initial={["Keynes House", "Tilehouse Street", "Hitchin", "", ""]}
              />
            </div>
            <button
              type="button"
              className="lve-btn lve-btn-secondary shrink-0 inline-flex items-center gap-1"
              title="Clear address"
            >
              <MdClear size={16} />
              Clear
            </button>
          </div>
        </Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Postcode:"><TextInput value="SG5 2DX" /></Field>
          <Field label="Tel.:"><TextInput value="" /></Field>
        </div>
        <Field label="Wrapper Policy No:">
          <TextInput value="101268" />
        </Field>
      </Section>

      <Section title="Annuitant">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Corres Name:"><TextInput value="Testmnbbgajc" /></Field>
          <Field label="Salutation:"><TextInput value="Testmnbbgajc" /></Field>
        </div>
        <Field label="Address:">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <ConnectedAddress
                lines={[
                  { placeholder: "Line 1" },
                  { placeholder: "Line 2" },
                  { placeholder: "Line 3" },
                  { placeholder: "Line 4" },
                  { placeholder: "Line 5" },
                ]}
                initial={["26 Eastern Close", "Verwood", "Marshwood", "", ""]}
              />
            </div>
            <button
              type="button"
              className="lve-btn lve-btn-secondary shrink-0 inline-flex items-center gap-1"
              title="Clear address"
            >
              <MdClear size={16} />
              Clear
            </button>
          </div>
        </Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Postcode:"><TextInput value="VE99 9AB" /></Field>
          <Field label="Tel.:"><TextInput value="" /></Field>
        </div>
      </Section>

      <Section title="Sales Office/IFA Details">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Corres Name:"><TextInput value="" /></Field>
          <Field label="Salutation:"><TextInput value="" /></Field>
        </div>
        <Field label="Name:"><TextInput value="" /></Field>
        <Field label="Address:">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <ConnectedAddress
                lines={[
                  { placeholder: "Line 1" },
                  { placeholder: "Line 2" },
                  { placeholder: "Line 3" },
                  { placeholder: "Line 4" },
                  { placeholder: "Line 5" },
                ]}
                initial={["Manchester", "", "", "", ""]}
              />
            </div>
            <button
              type="button"
              className="lve-btn lve-btn-secondary shrink-0 inline-flex items-center gap-1"
              title="Clear address"
            >
              <MdClear size={16} />
              Clear
            </button>
          </div>
        </Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Postcode:"><TextInput value="" /></Field>
          <Field label="Tel.:"><TextInput value="" /></Field>
        </div>
      </Section>
    </div>
  );
}

export function ContactsTab() {
  const { planCode } = usePlanCode();
  const isPlan83 = planCode === "83";

  if (isPlan83) {
    return <Plan83ContactsLayout />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ContactPanel
        title="Annuitant"
        prefix="dbedAnn"
        postcodeName="dbedAnnPostco"
      />
      <ContactPanel
        title="Power of Attorney"
        prefix="dbedPOA"
        showCoName
        showRelationship
        showPoaReceived
        postcodeName="dbedPOAPostc"
      />
      <ContactPanel
        title="Care Provider"
        prefix="dbedCP"
        showProvName
        showProviderId
        showContractReceived
        postcodeName="dbedCPPostco"
      />
      <ContactPanel
        title="Applicant"
        prefix="dbedApp"
        showCoName
        showRelationship
        postcodeName="dbedAppPostco"
      />
    </div>
  );
}
