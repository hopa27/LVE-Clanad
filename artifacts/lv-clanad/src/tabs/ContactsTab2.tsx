import { Field, TextInput, Section } from "../components/Field";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { MdClear } from "react-icons/md";

function AddressBlock({ prefix }: { prefix: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1 min-w-0">
        <ConnectedAddress
          lines={[
            {},
            {},
            {},
            {},
            {},
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
  );
}

export function ContactsTab2() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Section title="Scheme Details">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Corres Name:">
            <TextInput value="dbedSchCorresName" />
          </Field>
          <Field label="Salutation Name:">
            <TextInput value="dbedSchName" />
          </Field>
        </div>
        <Field label="Wrapper Name:">
          <TextInput value="dbedSchWrapperName" />
        </Field>
        <Field label="Address:">
          <AddressBlock prefix="dbedSch" />
        </Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Postcode:"><TextInput value="dbedSchPostco" /></Field>
          <Field label="Tel.:"><TextInput value="dbedSchTel" /></Field>
        </div>
        <Field label="Wrapper Policy No:">
          <TextInput value="dbedSchWrapp" />
        </Field>
      </Section>

      <Section title="Annuitant">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Corres Name:">
            <TextInput value="dbedPRPAnnCorresNa" />
          </Field>
          <Field label="Salutation:">
            <TextInput value="dbedPRPAnnSalutation" />
          </Field>
        </div>
        <Field label="Address:">
          <AddressBlock prefix="dbedPRPAnn" />
        </Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Postcode:"><TextInput value="dbedPRPAnnP" /></Field>
          <Field label="Tel.:"><TextInput value="dbedPRPAnnTel" /></Field>
        </div>
      </Section>

      <Section title="Sales Office/IFA Details">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Corres Name:">
            <TextInput value="dbedIFACorresName" />
          </Field>
          <Field label="Salutation:">
            <TextInput value="dbedIFAAnnSalutation" />
          </Field>
        </div>
        <Field label="Name:">
          <TextInput value="dbedIFAName" />
        </Field>
        <Field label="Address:">
          <AddressBlock prefix="dbedIFA" />
        </Field>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3">
          <Field label="Postcode:"><TextInput value="dbedIFAWrapp" /></Field>
          <Field label="Tel.:"><TextInput value="dbedIFATel" /></Field>
        </div>
      </Section>
    </div>
  );
}
