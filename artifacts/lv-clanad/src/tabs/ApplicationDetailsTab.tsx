import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { DatePicker } from "../components/DatePicker";
import { usePlanCode } from "../context/PlanCodeContext";

export function ApplicationDetailsTab() {
  const { planCode } = usePlanCode();
  const isPlan87 = planCode === "87";
  const isPlan84 = planCode === "84";
  const isPlan90 = planCode === "90";
  const isCompact = isPlan87 || isPlan84 || isPlan90;

  return (
    <div className="space-y-4">
      {/* Top main grid — 4 columns matching legacy form */}
      <div className="panel panel-body grid grid-cols-1 lg:grid-cols-4 gap-x-6">
        {/* Column 1 */}
        <div>
          <Field label="Set Up Date:">
            <DatePicker
              value={isPlan87 ? "15/05/2026" : isPlan84 ? "17/03/2010" : isPlan90 ? "25/06/2025" : ""}
              placeholder={isCompact ? "" : "DBEditAPPLI"}
              disabled
            />
          </Field>
          <Field label={isPlan90 ? "MCP Start Date:" : "Received Date:"}>
            <DatePicker
              value={isPlan84 ? "17/03/2010" : isPlan90 ? "25/06/2025" : ""}
              placeholder={isCompact ? "" : "DBEditAPPLIC"}
              disabled={isPlan90}
            />
          </Field>
          <Field label={isPlan90 ? "Payment Date:" : "Start Date:"}>
            <DatePicker
              value={isPlan87 ? "15/05/2026" : isPlan84 ? "31/03/2010" : isPlan90 ? "28/05/2025" : ""}
              placeholder={isCompact ? "" : "edtStartdate"}
              disabled={isPlan84 || isPlan90}
            />
          </Field>
          {!isCompact && (
            <>
              <div className="mb-2 mt-1 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
                WPPA amendment notification date
              </div>
              <Field label="From:"><DatePicker value="" placeholder="" disabled /></Field>
              <Field label="To:"><DatePicker value="" placeholder="" disabled /></Field>
            </>
          )}
          {!isPlan84 && !isPlan90 && (
            <Field label="Accept Date:">
              <DatePicker value="" placeholder={isPlan87 ? "" : "DBEdit21"} disabled />
            </Field>
          )}
          <Field label="IFA Payment Date:">
            <DatePicker
              value={isPlan84 ? "13/04/2010 10" : isPlan90 ? "07/07/2025 07" : ""}
              placeholder={isCompact ? "" : "DBEdit13"}
              disabled={isPlan84 || isPlan90}
            />
          </Field>
          <Field label="PostADay:"><Checkbox checked={isPlan87 || isPlan84} /></Field>
          <Field label="Transfer from Beneficiary Drawdown?:">
            <SelectInput
              value={isCompact ? "Unknown" : "DBBeneficiary"}
              options={["Yes", "No", "Unknown"]}
            />
          </Field>
        </div>

        {/* Column 2 */}
        <div>
          {!isPlan87 && (
            <Field label="Special Status:">
              <TextInput value={isPlan84 || isPlan90 ? "" : "DBSp"} disabled />
            </Field>
          )}
          {!isPlan84 && !isPlan90 && (
            <Field label="Final Quote Issued Date:">
              <DatePicker value="" placeholder={isPlan87 ? "" : "DBEdit16"} disabled />
            </Field>
          )}
          <Field label="Status:">
            <TextInput value={isPlan87 ? "P" : isPlan84 || isPlan90 ? "L" : "status"} disabled />
          </Field>
          {!isPlan87 && (
            <Field label="Suspended:">
              <TextInput value={isPlan84 || isPlan90 ? "N" : "DBSu"} disabled />
            </Field>
          )}
          <Field label="Days Since Application:">
            <TextInput
              value={isPlan87 ? "" : isPlan84 ? "5912" : isPlan90 ? "334" : "dbday"}
              disabled
            />
          </Field>
          {!isCompact && (
            <>
              <Field label="Hosp'd Date:">
                <DatePicker value="" placeholder="dbedHospdDat" />
              </Field>
              <Field label="LTA Details:"><Checkbox /></Field>
            </>
          )}
        </div>

        {/* Column 3 — entirely hidden for plan 87 */}
        {!isPlan87 && (
          <div>
            {!isPlan84 && !isPlan90 && (
              <Field label="GAD Anniversary:">
                <div className="flex gap-2">
                  <TextInput value="10" className="!w-16" disabled />
                  <SelectInput value="dbe" options={[
                    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
                  ]} disabled />
                  <TextInput value="13" className="!w-16" disabled />
                </div>
              </Field>
            )}
            <Field label="Life One Dead:">
              <TextInput value={isPlan84 || isPlan90 ? "" : "DBLifeOneDe"} disabled />
            </Field>
            <Field label="Life Two Dead:">
              <TextInput value={isPlan84 || isPlan90 ? "" : "DBLifeTwoDe"} disabled />
            </Field>
            <Field label="Completed:">
              <TextInput
                value={isPlan84 ? "13/04/2010" : isPlan90 ? "02/07/2025" : "DBCompeted"}
                disabled
              />
            </Field>
            <Field label="Closed:">
              <TextInput value={isPlan84 || isPlan90 ? "" : "DBClosed"} disabled />
            </Field>
            {!isPlan84 && !isPlan90 && (
              <>
                <Field label="Age at death:"><TextInput value="edAge" disabled /></Field>
                <Field label="Gross £:"><TextInput value="dbedGross" /></Field>
                <Field label="Paid net:">
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <TextInput value="dbedPaidNet" disabled />
                  </div>
                </Field>
                <Field label="Date Paid:"><DatePicker value="" placeholder="Date Paid" /></Field>
                <Field label="Payee:"><TextInput value="dbedPayee" /></Field>
                <Field label="Trustee:"><Checkbox /></Field>
                <div className="mt-2">
                  <button type="button" className="lve-btn lve-btn-sm">
                    Create payment...
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Spacer to keep column 4 in its original position when col 3 hidden */}
        {isPlan87 && <div />}

        {/* Column 4 */}
        <div>
          {(isPlan87 || isPlan84) && (
            <Field label="">
              <DatePicker value="10/12/2013" placeholder="" disabled={isPlan87} />
            </Field>
          )}
          {!isPlan84 && !isPlan90 && (
            <Field label="Quote Expiry Date:">
              <DatePicker
                value={isPlan87 ? "14/06/2026" : ""}
                placeholder={isPlan87 ? "" : "dbedQuoteEx"}
                disabled
              />
            </Field>
          )}
          <Field label="Last amended by:">
            <TextInput
              value={isPlan87 ? "SAIMEENAKSHINA" : isPlan84 ? "LOPVH" : isPlan90 ? "LV66664" : "DBEdit18"}
              disabled
            />
          </Field>
          {!isPlan84 && !isPlan90 && (
            <>
              <Field label="App Created by:">
                <TextInput value={isPlan87 ? "saimeenakshinathan" : "DBEdit14"} disabled />
              </Field>
              <Field label="Final Quote Issued by:">
                <TextInput value={isPlan87 ? "" : "DBEdit19"} disabled />
              </Field>
            </>
          )}
          <Field label="Rates Ok'd by:">
            <TextInput value={isCompact ? "" : "DBEdit7"} disabled />
          </Field>
          <Field label="Paykey:">
            <TextInput
              value={isPlan87 ? "1023693" : isPlan84 ? "899032" : isPlan90 ? "1018055" : "DBEdit20"}
              disabled
            />
          </Field>
          <Field label="Policy No:">
            <TextInput
              value={isPlan87 ? "233451" : isPlan84 ? "111834" : isPlan90 ? "227813" : "DBEdit24"}
              disabled
            />
          </Field>
          {!isPlan90 && (
            <Field label="Dependant Eligible to Receive Benefits:">
              <TextInput value={isPlan87 || isPlan84 ? "" : "edtEli"} disabled />
            </Field>
          )}
        </div>
      </div>

      {/* Two-column section panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Correspondence Details">
          <Field label="Correspond Name:">
            <TextInput
              value={isPlan87 ? "Dr T Uggiu" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testmtcchibd" : "correspname"}
            />
          </Field>
          <Field label="Salutation Name:">
            <TextInput
              value={isPlan87 ? "Dr Uggiu" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testmtcchibd" : "salname"}
            />
          </Field>
          <Field label="Telephone:">
            <TextInput value={isPlan87 ? "" : isPlan84 ? "01632 391651" : isPlan90 ? "" : "anntele"} />
          </Field>
          <Field label="E-mail:">
            <TextInput
              value={isPlan87 || isPlan84 ? "" : isPlan90 ? "zzzzzz99@zzzzzzz.zz.zz" : "DBEditPH_EMAIL"}
            />
          </Field>
        </Section>

        <Section title="Correspondence Address">
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
                isPlan87
                  ? ["Test", "Test", "", "", ""]
                  : isPlan84
                  ? ["17 North Road", "Marshwood", "Exeter", "", "Leicester"]
                  : isPlan90
                  ? ["26 Eastern Close", "Queensferry", "Verwood", "", ""]
                  : ["phad1", "phad2", "phad3", "phad4", "phad5"]
              }
            />
          </Field>
          <Field label="Postcode:">
            <TextInput
              value={isPlan87 ? "OP9 0OP" : isPlan84 ? "ZE99 9AB" : isPlan90 ? "KI99 9AB" : "phpc"}
            />
          </Field>
          <Field label="Country:">
            <SelectInput
              value={isPlan90 ? "United Kingdom" : "cmbCountry"}
              options={["United Kingdom", "Ireland", "Other"]}
              disabled={isPlan90}
            />
          </Field>
          <div className="mt-2"><Checkbox label="Address Unknown / Gone Away" /></div>
        </Section>
      </div>
    </div>
  );
}
