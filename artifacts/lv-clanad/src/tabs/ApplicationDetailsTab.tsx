import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { ConnectedAddress } from "../components/ConnectedAddress";
import { DatePicker } from "../components/DatePicker";
import { usePlanCode } from "../context/PlanCodeContext";
import { MdKeyboardArrowDown } from "react-icons/md";

export function ApplicationDetailsTab() {
  const { planCode } = usePlanCode();
  const isPlan87  = planCode === "87";
  const isPlan84  = planCode === "84";
  const isPlan90  = planCode === "90";
  const isPlan51  = planCode === "51";
  const isPlan83  = planCode === "83";
  const isPlan621 = planCode === "621";
  const isPlan76  = planCode === "76";
  const isPlan62a = planCode === "62a";
  const isCompact = isPlan87 || isPlan84 || isPlan90;

  return (
    <div className="space-y-4">
      <div className="panel panel-body grid grid-cols-1 lg:grid-cols-4 gap-x-6">

        {/* Column 1 */}
        <div>
          <Field label="Set Up Date:">
            <DatePicker
              value={isPlan87 ? "15/05/2026" : isPlan84 ? "17/03/2010" : isPlan90 ? "25/06/2025" : isPlan51 ? "22/01/2008" : isPlan83 ? "27/07/2015" : isPlan621 ? "03/01/2008" : isPlan76 ? "21/01/2008" : isPlan62a ? "15/12/2010" : ""}
              placeholder={isCompact ? "" : "DBEditAPPLI"}
              disabled
            />
          </Field>
          <Field label={isPlan90 ? "MCP Start Date:" : "Received Date:"}>
            <DatePicker
              value={isPlan84 ? "17/03/2010" : isPlan90 ? "25/06/2025" : isPlan51 ? "21/01/2008" : isPlan83 ? "24/07/2015" : isPlan621 ? "27/12/2007" : isPlan76 ? "18/01/2008" : isPlan62a ? "15/12/2010" : ""}
              placeholder={isCompact ? "" : "DBEditAPPLIC"}
            />
          </Field>
          <Field label={isPlan90 ? "Payment Date:" : "Start Date:"}>
            <DatePicker
              value={isPlan87 ? "15/05/2026" : isPlan84 ? "31/03/2010" : isPlan90 ? "28/05/2025" : isPlan51 ? "28/01/2008" : isPlan83 ? "14/08/2015" : isPlan621 ? "07/01/2008" : isPlan76 ? "01/01/2008" : isPlan62a ? "15/12/2010" : ""}
              placeholder={isCompact ? "" : "edtStartdate"}
              disabled={isPlan84 || isPlan90 || isPlan51 || isPlan83 || isPlan621 || isPlan76 || isPlan62a}
            />
          </Field>
          {!isCompact && !isPlan51 && !isPlan83 && !isPlan621 && !isPlan76 && !isPlan62a && (
            <>
              <div className="mb-2 mt-1 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
                WPPA amendment notification date
              </div>
              <Field label="From:"><DatePicker value="" placeholder="" disabled /></Field>
              <Field label="To:"><DatePicker value="" placeholder="" disabled /></Field>
            </>
          )}
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan62a && (
            <Field label="Accept Date:">
              <DatePicker
                value={isPlan87 ? "" : isPlan83 ? "02/09/2015" : ""}
                placeholder={isPlan87 || isPlan83 ? "" : "DBEdit21"}
                disabled
              />
            </Field>
          )}
          <Field label="IFA Payment Date:">
            <DatePicker
              value={isPlan84 ? "13/04/2010 10" : isPlan90 ? "07/07/2025 07" : isPlan51 ? "05/02/2008 09" : isPlan83 ? "24/08/2015 10" : isPlan621 ? "22/01/2008 14" : isPlan76 ? "05/02/2008 09" : isPlan62a ? "" : ""}
              placeholder={isCompact ? "" : "DBEdit13"}
              disabled={isPlan84 || isPlan90 || isPlan51 || isPlan83 || isPlan621 || isPlan76 || isPlan62a}
            />
          </Field>
          <Field label="PostADay:"><Checkbox checked={isPlan87 || isPlan84 || isPlan51 || isPlan83 || isPlan621 || isPlan76 || isPlan62a} /></Field>
          <Field label="Transfer from Beneficiary Drawdown?:">
            <div className="relative">
              <select defaultValue="Unknown" className="lve-input pr-12 appearance-none">
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Unknown">Unknown</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <span className="h-6 w-px bg-[#BBBBBB]" />
                <span className="px-3 text-[#006cf4]">
                  <MdKeyboardArrowDown size={22} />
                </span>
              </div>
            </div>
          </Field>
        </div>

        {/* Column 2 */}
        <div>
          {!isPlan87 && (
            <Field label="Special Status:">
              <TextInput value={isPlan84 || isPlan90 || isPlan51 || isPlan83 || isPlan76 || isPlan62a ? "" : isPlan621 ? "G" : "DBSp"} disabled />
            </Field>
          )}
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan62a && (
            <Field label="Final Quote Issued Date:">
              <DatePicker value="" placeholder={isPlan87 || isPlan83 ? "" : "DBEdit16"} disabled />
            </Field>
          )}
          <Field label="Status:">
            <TextInput value={isPlan87 ? "P" : isPlan84 || isPlan90 ? "L" : isPlan51 ? "Q" : isPlan83 ? "W" : isPlan621 ? "I" : isPlan76 ? "D" : isPlan62a ? "C" : "status"} disabled />
          </Field>
          {!isPlan87 && (
            <Field label="Suspended:">
              <TextInput value={isPlan84 || isPlan90 || isPlan83 || isPlan621 || isPlan62a ? "N" : isPlan51 || isPlan76 ? "Y" : "DBSu"} disabled />
            </Field>
          )}
          <Field label="Days Since Application:">
            <TextInput
              value={isPlan87 ? "" : isPlan84 ? "5912" : isPlan90 ? "334" : isPlan51 ? "6707" : isPlan83 ? "3966" : isPlan621 ? "6738" : isPlan76 ? "6712" : isPlan62a ? "5654" : "dbday"}
              disabled
            />
          </Field>
          {isPlan621 && (
            <>
              <Field label="Commuted Value:"><TextInput value="" disabled /></Field>
              <Field label="LTA Details:"><Checkbox checked /></Field>
            </>
          )}
          {!isCompact && !isPlan51 && !isPlan83 && !isPlan621 && !isPlan76 && (
            <>
              {!isPlan62a && (
                <Field label="Hosp'd Date:">
                  <DatePicker value="" placeholder="dbedHospdDat" />
                </Field>
              )}
              <Field label="LTA Details:"><Checkbox checked={isPlan62a} /></Field>
            </>
          )}
        </div>

        {/* Column 3 — entirely hidden for plan 87 */}
        {!isPlan87 && (
          <div>
            {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan83 && !isPlan76 && !isPlan621 && !isPlan62a && (
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
              <TextInput value={isPlan84 || isPlan90 || isPlan83 ? "" : isPlan51 || isPlan621 || isPlan76 || isPlan62a ? "Y" : "DBLifeOneDe"} disabled />
            </Field>
            <Field label="Life Two Dead:">
              <TextInput value={isPlan84 || isPlan90 || isPlan83 || isPlan621 || isPlan76 || isPlan62a ? "" : "DBLifeTwoDe"} disabled />
            </Field>
            <Field label="Completed:">
              <TextInput
                value={isPlan84 ? "13/04/2010" : isPlan90 ? "02/07/2025" : isPlan51 ? "05/02/2008" : isPlan83 ? "24/08/2015" : isPlan621 ? "22/01/2008" : isPlan76 ? "05/02/2008" : isPlan62a ? "" : "DBCompeted"}
                disabled
              />
            </Field>
            <Field label="Closed:">
              <TextInput value={isPlan84 || isPlan90 || isPlan51 || isPlan83 || isPlan621 || isPlan62a ? "" : isPlan76 ? "10/09/2009 1" : "DBClosed"} disabled />
            </Field>
            {!isPlan84 && !isPlan90 && !isPlan83 && (
              <>
                <Field label="Age at death:">
                  <TextInput value={isPlan51 || isPlan621 || isPlan62a ? "" : isPlan76 ? "94" : "edAge"} disabled />
                </Field>
                <Field label="Gross £:"><TextInput value="" /></Field>
                <Field label="Paid net:">
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <TextInput value="" disabled />
                  </div>
                </Field>
                <Field label="Date Paid:"><DatePicker value="" placeholder="Date Paid" /></Field>
                <Field label="Payee:"><TextInput value="" /></Field>
                <Field label="Trustee:"><Checkbox /></Field>
                <div className="mt-2">
                  <button type="button" className="lve-btn lve-btn-sm" disabled={isPlan51 || isPlan76 || isPlan62a}>
                    Create payment...
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Spacer when col 3 hidden */}
        {isPlan87 && <div />}

        {/* Column 4 */}
        <div>
          {(isPlan87 || isPlan84) && (
            <Field label="">
              <DatePicker value="10/12/2013" placeholder="" disabled={isPlan87} />
            </Field>
          )}
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan83 && !isPlan76 && !isPlan621 && !isPlan62a && (
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
              value={isPlan87 ? "SAIMEENAKSHINA" : isPlan84 ? "LOPVH" : isPlan90 ? "LV66664" : isPlan51 ? "LOPSL2" : isPlan83 ? "LV66656" : isPlan621 ? "LV67320" : isPlan76 ? "LOPNXP" : isPlan62a ? "LOPRM" : "DBEdit18"}
              disabled
            />
          </Field>
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan62a && (
            <>
              <Field label="App Created by:">
                <TextInput value={isPlan87 ? "saimeenakshinathan" : isPlan83 ? "LOPEO" : "DBEdit14"} disabled />
              </Field>
              <Field label="Final Quote Issued by:">
                <TextInput value={isPlan87 || isPlan83 ? "" : "DBEdit19"} disabled />
              </Field>
            </>
          )}
          <Field label="Rates Ok'd by:">
            <TextInput value={isCompact || isPlan51 || isPlan83 || isPlan621 || isPlan76 || isPlan62a ? "" : "DBEdit7"} disabled />
          </Field>
          <Field label="Paykey:">
            <TextInput
              value={isPlan87 ? "1023693" : isPlan84 ? "899032" : isPlan90 ? "1018055" : isPlan51 ? "887324" : isPlan83 ? "956314" : isPlan621 ? "100004.1" : isPlan76 ? "887316" : isPlan62a ? "905319" : "DBEdit20"}
              disabled
            />
          </Field>
          <Field label="Policy No:">
            <TextInput
              value={isPlan87 ? "233451" : isPlan84 ? "111834" : isPlan90 ? "227813" : isPlan51 ? "100188" : isPlan83 ? "166092" : isPlan621 ? "100004.1" : isPlan76 ? "100180" : isPlan62a ? "118106" : "DBEdit24"}
              disabled
            />
          </Field>
          {!isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan62a && (
            <Field label="Dependant Eligible to Receive Benefits:">
              <TextInput value={isPlan87 || isPlan84 || isPlan83 ? "" : "edtEli"} disabled />
            </Field>
          )}
        </div>
      </div>

      {/* Correspondence Details */}
      {!isPlan83 && !isPlan76 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Correspondence Details">
            <Field label="Correspond Name:">
              <TextInput
                value={isPlan87 ? "Dr T Uggiu" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testmtcchibd" : isPlan51 ? "Testmdbaabii" : isPlan621 ? "Testfrbaaaae.b" : isPlan76 ? "Testmlbaabia" : isPlan62a ? "Testmsbbibag" : "correspname"}
              />
            </Field>
            <Field label="Salutation Name:">
              <TextInput
                value={isPlan87 ? "Dr Uggiu" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testmtcchibd" : isPlan51 ? "Testmdbaabii" : isPlan621 ? "Testfrbaaaae.b" : isPlan76 ? "Testmlbaabia" : isPlan62a ? "Testmsbbibag" : "salname"}
              />
            </Field>
            <Field label="Telephone:">
              <TextInput value={isPlan87 ? "" : isPlan84 ? "01632 391651" : isPlan90 ? "" : isPlan51 ? "016324162140" : isPlan621 ? "01632 329 783" : isPlan76 ? "01632 532709" : isPlan62a ? "01632 830 033" : "anntele"} />
            </Field>
            <Field label="E-mail:">
              <TextInput
                value={isPlan87 || isPlan84 || isPlan51 || isPlan76 || isPlan62a ? "" : isPlan90 ? "zzzzzz99@zzzzzzz.zz.zz" : isPlan621 ? "zzzzz@zzzzzzzz.zzz" : "DBEditPH_EMAIL"}
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
                    : isPlan51
                    ? ["10 Western Avenue", "Leicester", "", "", ""]
                    : isPlan621
                    ? ["5 South Drive", "Zennor", "Queensferry", "", ""]
                    : isPlan76
                    ? ["Northampton", "10 Western Avenue", "", "Eastleigh", ""]
                    : isPlan62a
                    ? ["26 Eastern Close", "Exeter", "Reading", "Jarrow", "Marshwood"]
                    : ["phad1", "phad2", "phad3", "phad4", "phad5"]
                }
              />
            </Field>
            <Field label="Postcode:">
              <TextInput
                value={isPlan87 ? "OP9 0OP" : isPlan84 ? "ZE99 9AB" : isPlan90 ? "KI99 9AB" : isPlan51 ? "LE99 9AB" : isPlan621 ? "QU99 9AB" : isPlan76 ? "VE99 9AB" : isPlan62a ? "LE99 9AB" : "phpc"}
              />
            </Field>
            <Field label="Country:">
              <SelectInput
                value={isPlan90 || isPlan51 || isPlan621 || isPlan76 || isPlan62a ? "United Kingdom" : "cmbCountry"}
                options={["United Kingdom", "Ireland", "Other"]}
              />
            </Field>
            <div className="mt-2"><Checkbox label="Address Unknown / Gone Away" /></div>
          </Section>
        </div>
      )}
    </div>
  );
}
