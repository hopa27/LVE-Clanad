import { useState } from "react";
import { MdEdit, MdCheck, MdClose } from "react-icons/md";
import { Field, TextInput, SelectInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";

export function MaturitiesSurrenderTab() {
  const [bankModalOpen, setBankModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Section title="Bank Details">
          <Field label="Type:"><SelectInput value="" options={["", "Maturity", "Surrender"]} /></Field>
          <Field label="Bank sort code:"><TextInput value="-  -" /></Field>
          <Field label="Bank account no:"><TextInput value="" /></Field>
          <Field label="Bank account name:"><TextInput value="" /></Field>
          <Field label="Bank name:"><TextInput value="" disabled /></Field>
          <Field label="Payment Ref:"><TextInput value="" /></Field>
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm mt-2"
            onClick={() => setBankModalOpen(true)}
          >
            <MdEdit size={14} /> Edit Bank Details
          </button>
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

      {bankModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[720px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>New Maturity / Surrender Bank Details</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
                onClick={() => setBankModalOpen(false)}
                title="Close"
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body space-y-5">
              <div className="flex justify-end">
                <Field inline label="Change Effective Date:">
                  <DatePicker value="14/05/2026" />
                </Field>
              </div>

              <div className="border border-[color:var(--color-panel-border)] rounded-[8px] p-4 grid grid-cols-2 gap-x-6">
                <div>
                  <Field inline label="Bank sort code:"><TextInput value="" /></Field>
                  <Field inline label="Account name:"><TextInput value="" /></Field>
                  <Field inline label="Payment Ref:"><TextInput value="233433" /></Field>
                </div>
                <div>
                  <Field inline label="Bank Name:"><TextInput value="" disabled /></Field>
                  <Field inline label="Bank account no:"><TextInput value="" /></Field>
                  <Field inline label="Account Type:"><TextInput value="0" disabled /></Field>
                  <Field inline label="Payment method:">
                    <SelectInput value="" options={["", "B", "C"]} />
                  </Field>
                </div>
              </div>

              <div className="flex justify-center items-center gap-3">
                <button
                  type="button"
                  className="lve-btn lve-btn-sm min-w-[90px] justify-center"
                  onClick={() => setBankModalOpen(false)}
                >
                  <MdCheck size={16} /> OK
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary lve-btn-sm min-w-[90px] justify-center"
                  onClick={() => setBankModalOpen(false)}
                >
                  <MdClose size={16} /> Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
