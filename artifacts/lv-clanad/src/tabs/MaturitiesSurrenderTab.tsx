import { Field, TextInput, SelectInput, Section } from "../components/Field";
import { Pencil } from "lucide-react";

export function MaturitiesSurrenderTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Section title="Bank Details">
          <Field label="Type:"><SelectInput value="" options={["", "Maturity", "Surrender"]} /></Field>
          <Field label="Bank sort code:"><TextInput value="-  -" /></Field>
          <Field label="Bank account no:"><TextInput value="" /></Field>
          <Field label="Bank account name:"><TextInput value="" /></Field>
          <Field label="Bank name:"><TextInput value="" /></Field>
          <Field label="Payment Ref:"><TextInput value="" /></Field>
          <button type="button" className="btn mt-2"><Pencil size={14} /> Edit Bank Details</button>
        </Section>

        <Section title="Payment">
          <Field label="Claim Form Received:"><TextInput value="/  /" /></Field>
          <Field label="Nature of Payment:">
            <SelectInput value="" options={["", "Lump Sum", "Annuity"]} />
          </Field>
          <Field label="Payment Method:"><SelectInput value="" options={["", "B", "C"]} /></Field>
          <Field label="Payment Date:"><TextInput value="/  /" /></Field>
          <Field label="Gross:"><TextInput value="" /></Field>
          <button type="button" className="btn mt-2" disabled>Create payment…</button>
        </Section>
      </div>

      <Section title="Maturity / Surrender Address">
        <Field label="Maturity Destination:">
          <SelectInput value="" options={["", "Client", "IFA", "Other"]} />
        </Field>
        <Field label="Correspondance Name:"><TextInput value="" /></Field>
        <Field label="Salutation:"><TextInput value="" /></Field>
        <Field label="Telephone:"><TextInput value="" /></Field>
        <div className="my-3 border-t border-[color:var(--color-panel-border)]" />
        <Field label="Line 1:"><TextInput value="" /></Field>
        <Field label="Line 2:"><TextInput value="" /></Field>
        <Field label="Line 3:"><TextInput value="" /></Field>
        <Field label="Line 4:"><TextInput value="" /></Field>
        <Field label="Line 5 (County):"><TextInput value="" /></Field>
        <Field label="Postcode:"><TextInput value="" /></Field>
        <Field label="Country:">
          <SelectInput value="" options={["", "United Kingdom", "Ireland", "Other"]} />
        </Field>
      </Section>
    </div>
  );
}
