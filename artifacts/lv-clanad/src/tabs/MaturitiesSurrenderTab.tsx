import { useState } from "react";
import { MdEdit, MdCheck, MdClose } from "react-icons/md";
import { Field, TextInput, SelectInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { usePlanCode } from "../context/PlanCodeContext";

export function MaturitiesSurrenderTab() {
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";
  const isPlan83 = planCode === "83";
  const isPlan82 = planCode === "82";

  if (isPlan0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <Section title="Bank Details">
            <Field label="Type:">
              <SelectInput value="" options={["", "Maturity", "Surrender"]} />
            </Field>
            <Field label="Bank sort code:"><TextInput value="DBMatSortCode" /></Field>
            <Field label="Bank account no:"><TextInput value="DBMatAccountNo" /></Field>
            <Field label="Bank account name:"><TextInput value="DBMatAccountName" /></Field>
            <Field label="Bank name:"><TextInput value="" disabled /></Field>
            <Field label="Payment Ref:"><TextInput value="DBMatBankRef" /></Field>
            <Field label="Change Effective Date:">
              <TextInput value="DBMatEffectiveDate" />
            </Field>
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm mt-2"
              onClick={() => setBankModalOpen(true)}
            >
              <MdEdit size={14} /> Edit Bank Details
            </button>
            <p className="font-['Mulish'] text-[12px] text-[#3d3d3d] mt-3">
              BCE4 crystallisation event will occur on Surrender/Maturity for policies
              where the money is being used to purchase an OMO Annuity.
            </p>
            <p className="font-['Mulish'] text-[12px] text-[#3d3d3d] mt-2">
              BCE5A crystallisation event will occur on Surrender/Maturity
            </p>
          </Section>

          <Section title="Payment">
            <Field label="Claim Form Received:"><DatePicker placeholder="" /></Field>
            <Field label="Nature of Payment:">
              <SelectInput value="" options={["", "Lump Sum", "Annuity"]} />
            </Field>
            <Field label="Payment Method:">
              <SelectInput value="" options={["", "B", "C", "T"]} />
            </Field>
            <Field label="Payment Date:"><DatePicker placeholder="" /></Field>
            <Field label="Gross:"><TextInput value="" /></Field>
            <Field label="Tax:"><TextInput value="" /></Field>
            <Field label="Net:"><TextInput value="" /></Field>
            <button
              type="button"
              className="lve-btn lve-btn-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Create payment…
            </button>
          </Section>

          <Section title="IFA Contact Details">
            <Field label="Name:"><TextInput value="DBEdit45" disabled /></Field>
            <Field label="Building:"><TextInput value="DBEdit38" disabled /></Field>
            <Field label="City:"><TextInput value="DBEdit" disabled /></Field>
            <Field label="County:"><TextInput value="DBEdit43" disabled /></Field>
            <Field label="Postcode:"><TextInput value="" disabled /></Field>
            <Field label="FAO:"><TextInput value="DBEdit46" disabled /></Field>
          </Section>
        </div>

        <div className="space-y-4">
          <Section>
            <Field label="Maturity Destination:">
              <SelectInput value="" options={["", "Client", "IFA", "Other"]} />
            </Field>
            <Field label="Correspondance Name:">
              <TextInput value="DBMatCorrespondanceName" />
            </Field>
            <Field label="Salutation:"><TextInput value="DBMatSalutation" /></Field>
            <Field label="Telephone:"><TextInput value="DBMatTelephone" /></Field>
          </Section>

          <Section title="Maturity / Surrender Address">
            <ConnectedAddress
              lines={[
                { placeholder: "Line 1" },
                { placeholder: "Line 2" },
                { placeholder: "Line 3" },
                { placeholder: "Line 4" },
                { placeholder: "Line 5" },
              ]}
              initial={[
                "DBMatAddress1",
                "DBMatAddress2",
                "DBMatAddress3",
                "DBMatAddress4",
                "DBMatAddress5",
              ]}
            />
            <div className="mt-2">
              <Field label="Postcode:"><TextInput value="DBMatPostCode" /></Field>
              <Field label="Country:">
                <SelectInput value="cbMatCountry" options={["cbMatCountry"]} />
              </Field>
            </div>
          </Section>

          <Section title="Correspondence Address">
            <ConnectedAddress
              lines={[
                { placeholder: "Line 1" },
                { placeholder: "Line 2" },
                { placeholder: "Line 3" },
                { placeholder: "Line 4" },
                { placeholder: "Line 5" },
              ]}
              initial={["DBEdit3", "DBEdit15", "DBEdit34", "DBEdit35", "DBEdit36"]}
            />
            <div className="mt-2">
              <Field label="Postcode:"><TextInput value="DBEdit37" /></Field>
              <Field label="Country:">
                <SelectInput value="DBLookupComboBox1" options={["DBLookupComboBox1"]} />
              </Field>
            </div>
          </Section>
        </div>

        {bankModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
            <div className="lve-panel bg-white w-[720px] max-w-full">
              <header className="lve-panel-header flex items-center justify-between">
                <span>New Maturity / Surrender Bank Details</span>
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
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
                      <SelectInput value="" options={["", "B", "C", "T"]} />
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Section title="Bank Details">
          <Field label="Type:">
            <SelectInput
              value={isPlan82 ? "Surrender" : isPlan83 ? "Maturity" : ""}
              options={(isPlan82 || isPlan83) ? ["Maturity", "Surrender"] : ["", "Maturity", "Surrender"]}
              disabled={isPlan82 || isPlan83}
            />
          </Field>
          <Field label="Bank sort code:"><TextInput value={(isPlan82 || isPlan83) ? "77-48-14" : "-  -"} /></Field>
          <Field label="Bank account no:"><TextInput value={(isPlan82 || isPlan83) ? "24782346" : ""} /></Field>
          <Field label="Bank account name:"><TextInput value={isPlan82 ? "Testmrbbgeee" : isPlan83 ? "Testnybggajc" : ""} /></Field>
          <Field label="Bank name:"><TextInput value={(isPlan82 || isPlan83) ? "TSB, WINSFORD" : ""} disabled /></Field>
          <Field label="Payment Ref:"><TextInput value={isPlan82 ? "D/1494543610" : isPlan83 ? "INVENC123588" : ""} /></Field>
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm mt-2"
            onClick={() => setBankModalOpen(true)}
            disabled={!isPlan82 && !isPlan83}
          >
            <MdEdit size={14} /> Edit Bank Details
          </button>
          {isPlan82 && (
            <p className="font-['Mulish'] text-[12px] text-[#3d3d3d] mt-3 bg-[#fffff0] border border-[#ccc] rounded p-2">
              BCE4 crystallisation event will occur on Surrender/Maturity for policies
              where the money is being used to purchase an OMO Annuity.
            </p>
          )}
        </Section>

        <Section title="Payment">
          <Field label="Claim Form Received:">
            <DatePicker value={isPlan82 ? "03/08/2015" : isPlan83 ? "19/08/2025" : ""} placeholder="" />
          </Field>
          <Field label="Nature of Payment:">
            <SelectInput
              value={isPlan82 ? "" : isPlan83 ? "Transfer" : ""}
              options={["", "Transfer", "Lump Sum", "Annuity"]}
              disabled={isPlan83}
            />
          </Field>
          <Field label="Payment Method:">
            <SelectInput
              value={isPlan82 ? "B" : isPlan83 ? "T" : ""}
              options={["", "B", "C", "T"]}
            />
          </Field>
          <Field label="Payment Date:"><DatePicker value={isPlan82 ? "06/08/2015" : ""} placeholder="" disabled={isPlan82} /></Field>
          <Field label="Gross:"><TextInput value={isPlan82 ? "22575.80" : isPlan83 ? "501.00" : ""} /></Field>
          <button
            type="button"
            className="lve-btn lve-btn-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            Create payment…
          </button>
        </Section>
      </div>

      <div className="mb-1">
        <Field label="Maturity Destination:">
          <SelectInput
            value={isPlan82 ? "Policy Holder" : isPlan83 ? "Trustee" : ""}
            options={["", "Client", "IFA", "Policy Holder", "Trustee", "Other"]}
          />
        </Field>
        <Field label="Correspondance Name:"><TextInput value={isPlan82 ? "Testmrbbgeee" : isPlan83 ? "Testmnbggajc" : ""} /></Field>
        <Field label="Salutation:"><TextInput value={isPlan82 ? "Testmrbbgeee" : isPlan83 ? "Testmnbggajc" : ""} /></Field>
        <Field label="Telephone:"><TextInput value={isPlan82 ? "01632555660" : ""} /></Field>
      </div>

      <Section title="Maturity / Surrender Address">
        <Field label="Address:">
          <ConnectedAddress
            lines={[
              { placeholder: "Line 1" },
              { placeholder: "Line 2" },
              { placeholder: "Line 3" },
              { placeholder: "Line 4" },
              { placeholder: "Line 5 (County)" },
            ]}
            initial={
              isPlan82 ? ["10 Rightway Close", "Exeter", "", "", "Oldham"]
              : isPlan83 ? ["Congleton", "Avonmouth", "Reading", "Verwood", ""]
              : ["", "", "", "", ""]
            }
          />
        </Field>
        <Field label="Postcode:"><TextInput value={isPlan82 ? "QU99 9AB" : isPlan83 ? "EX99 9AB" : ""} /></Field>
        <Field label="Country:">
          <SelectInput
            value={(isPlan82 || isPlan83) ? "United Kingdom" : ""}
            options={["", "United Kingdom", "Ireland", "Other"]}
            disabled={isPlan82 || isPlan83}
          />
        </Field>
      </Section>

      {bankModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[720px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>New Maturity / Surrender Bank Details</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/10 text-white hover:bg-[#d72714] hover:text-white transition-colors"
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
                    <SelectInput value="" options={["", "B", "C", "T"]} />
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
