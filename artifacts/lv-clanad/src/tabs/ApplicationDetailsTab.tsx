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
  const isPlan82  = planCode === "82";
  const isPlan80  = planCode === "80";
  const isPlan621 = planCode === "621";
  const isPlan76  = planCode === "76";
  const isPlan76z = planCode === "76z";
  const isPlan62a = planCode === "62a";
  const isPlan611 = planCode === "611";
  const isPlan52  = planCode === "52";
  const isPlan61a = planCode === "61a";
  const isCompact = isPlan87 || isPlan84 || isPlan90;

  function daysSince(ddmmyyyy: string): string {
    if (!ddmmyyyy) return "";
    const [d, m, y] = ddmmyyyy.split("/").map(Number);
    const start = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor((today.getTime() - start.getTime()) / 86400000);
    return diff > 0 ? String(diff) : "";
  }

  const daysSinceApplication =
    isPlan87  ? ""
    : isPlan84  ? daysSince("17/03/2010")
    : isPlan90  ? daysSince("25/06/2025")
    : isPlan51  ? daysSince("21/01/2008")
    : isPlan82  ? daysSince("17/09/2010")
    : isPlan80  ? daysSince("17/02/2010")
    : isPlan83  ? daysSince("24/07/2015")
    : isPlan621 ? daysSince("27/12/2007")
    : isPlan76  ? ""
    : isPlan76z ? daysSince("26/06/2008")
    : isPlan62a ? daysSince("15/12/2010")
    : isPlan611 ? daysSince("30/01/2008")
    : isPlan52  ? daysSince("16/01/2008")
    : isPlan61a ? daysSince("26/08/2008")
    : "dbday";

  return (
    <div className="space-y-4">
      <div className="panel panel-body grid grid-cols-1 lg:grid-cols-4 gap-x-6">

        {/* Column 1 */}
        <div>
          <Field label="Set Up Date:">
            <DatePicker
              value={isPlan87 ? "15/05/2026" : isPlan84 ? "17/03/2010" : isPlan90 ? "25/06/2025" : isPlan51 ? "22/01/2008" : isPlan82 ? "21/09/2010" : isPlan80 ? "18/02/2010" : isPlan83 ? "27/07/2015" : isPlan621 ? "03/01/2008" : isPlan76 ? "21/01/2008" : isPlan76z ? "02/07/2008" : isPlan62a ? "15/12/2010" : isPlan611 ? "31/01/2008" : isPlan52 ? "16/01/2008" : isPlan61a ? "06/09/2008" : ""}
              placeholder={isCompact ? "" : "DBEditAPPLI"}
              disabled
            />
          </Field>
          <Field label={isPlan90 ? "MCP Start Date:" : "Received Date:"}>
            <DatePicker
              value={isPlan84 ? "17/03/2010" : isPlan90 ? "25/06/2025" : isPlan51 ? "21/01/2008" : isPlan82 ? "17/09/2010" : isPlan80 ? "17/02/2010" : isPlan83 ? "24/07/2015" : isPlan621 ? "27/12/2007" : isPlan76 ? "18/01/2008" : isPlan76z ? "26/06/2008" : isPlan62a ? "15/12/2010" : isPlan611 ? "30/01/2008" : isPlan61a ? "26/08/2008" : ""}
              placeholder={isCompact ? "" : "DBEditAPPLIC"}
            />
          </Field>
          <Field label={isPlan90 ? "Payment Date:" : "Start Date:"}>
            <DatePicker
              value={isPlan87 ? "15/05/2026" : isPlan84 ? "31/03/2010" : isPlan90 ? "28/05/2025" : isPlan51 ? "28/01/2008" : isPlan82 ? "26/10/2010" : isPlan80 ? "26/02/2010" : isPlan83 ? "14/08/2015" : isPlan621 ? "07/01/2008" : isPlan76 ? "01/01/2008" : isPlan76z ? "26/06/2008" : isPlan62a ? "15/12/2010" : isPlan611 ? "31/01/2008" : isPlan52 ? "16/01/2008" : isPlan61a ? "19/09/2008" : ""}
              placeholder={isCompact ? "" : "edtStartdate"}
              disabled={isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a}
            />
          </Field>
          {!isCompact && !isPlan51 && !isPlan80 && !isPlan83 && !isPlan82 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
            <>
              <div className="mb-2 mt-1 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
                WPPA amendment notification date
              </div>
              <Field label="From:"><DatePicker value="" placeholder="" disabled /></Field>
              <Field label="To:"><DatePicker value="" placeholder="" disabled /></Field>
            </>
          )}
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
            <Field label="Accept Date:">
              <DatePicker
                value={isPlan87 ? "" : isPlan82 ? "05/01/2011" : isPlan80 ? "10/03/2010" : isPlan83 ? "02/09/2015" : ""}
                placeholder={isPlan87 || isPlan83 || isPlan82 || isPlan80 ? "" : "DBEdit21"}
                disabled
              />
            </Field>
          )}
          <Field label="IFA Payment Date:">
            {isPlan76 ? (
              <TextInput value="05/02/2008 09:33:52" disabled />
            ) : (
              <DatePicker
                value={isPlan84 ? "13/04/2010 10" : isPlan90 ? "11/07/2025" : isPlan51 ? "05/02/2008 09" : isPlan82 ? "06/01/2011 09" : isPlan80 ? "11/03/2010 08" : isPlan83 ? "24/08/2015 10" : isPlan621 ? "22/01/2008 14" : isPlan76z ? "08/07/2008 08" : isPlan62a ? "" : isPlan611 ? "" : isPlan61a ? "30/09/2008 08" : ""}
                placeholder={isCompact ? "" : "DBEdit13"}
                disabled={isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a}
              />
            )}
          </Field>
          <Field label="PostADay:"><Checkbox checked={isPlan87 || isPlan84 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a} /></Field>
          <Field label="Transfer from Beneficiary Drawdown?:">
            <SelectInput value="Unknown" options={["Yes", "No", "Unknown"]} />
          </Field>
        </div>

        {/* Column 2 */}
        <div>
          {!isPlan87 && (
            <Field label="Special Status:">
              <TextInput value={isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 ? "" : isPlan621 || isPlan61a ? "G" : "DBSp"} disabled />
            </Field>
          )}
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
            <Field label="Final Quote Issued Date:">
              <DatePicker value="" placeholder={isPlan87 || isPlan83 || isPlan80 || isPlan82 ? "" : "DBEdit16"} disabled />
            </Field>
          )}
          <Field label="Status:">
            <TextInput value={isPlan87 ? "P" : isPlan84 || isPlan90 ? "L" : isPlan51 ? "Q" : isPlan82 ? "S" : isPlan80 ? "M" : isPlan83 ? "W" : isPlan621 ? "I" : isPlan76 ? "D" : isPlan76z ? "Z" : isPlan62a ? "C" : isPlan611 ? "N" : isPlan52 ? "X" : isPlan61a ? "E" : "status"} disabled />
          </Field>
          {!isPlan87 && (
            <Field label="Suspended:">
              <TextInput value={isPlan82 ? "Y" : isPlan84 || isPlan90 || isPlan80 || isPlan83 || isPlan621 || isPlan62a || isPlan611 || isPlan52 ? "N" : isPlan51 || isPlan76 || isPlan76z || isPlan61a ? "Y" : "DBSu"} disabled />
            </Field>
          )}
          {!isPlan76z && !isPlan76 && (
            <Field label="Days Since Application:">
              <TextInput value={daysSinceApplication} disabled />
            </Field>
          )}
          {isPlan621 && (
            <>
              <Field label="Commuted Value:"><TextInput value="" disabled /></Field>
              <Field label="LTA Details:"><Checkbox checked /></Field>
            </>
          )}
          {isPlan76z && (
            <Field label="Hosp'd Date:">
              <DatePicker value="" placeholder="" />
            </Field>
          )}
          {!isCompact && !isPlan51 && !isPlan83 && !isPlan82 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan611 && !isPlan61a && (
            <>
              {!isPlan62a && !isPlan52 && (
                <Field label="Hosp'd Date:">
                  <DatePicker value="" placeholder="dbedHospdDat" />
                </Field>
              )}
              <Field label="LTA Details:"><Checkbox checked={isPlan62a || isPlan52} /></Field>
            </>
          )}
        </div>

        {/* Column 3 — entirely hidden for plan 87 */}
        {!isPlan87 && (
          <div>
            {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan83 && !isPlan82 && !isPlan76 && !isPlan76z && !isPlan621 && !isPlan62a && !isPlan52 && !isPlan61a && (
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
              <TextInput value={isPlan84 || isPlan90 || isPlan80 || isPlan83 || isPlan82 || isPlan76z || isPlan611 || isPlan52 ? "" : isPlan51 || isPlan621 || isPlan76 || isPlan62a || isPlan61a ? "Y" : "DBLifeOneDe"} disabled />
            </Field>
            <Field label="Life Two Dead:">
              <TextInput value={isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "DBLifeTwoDe"} disabled />
            </Field>
            <Field label="Completed:">
              <TextInput
                value={isPlan84 ? "13/04/2010" : isPlan90 ? "02/07/2025" : isPlan51 ? "05/02/2008" : isPlan82 ? "06/01/2011" : isPlan80 ? "11/03/2010" : isPlan83 ? "24/08/2015" : isPlan621 ? "22/01/2008" : isPlan76 ? "05/02/2008" : isPlan76z ? "08/07/2008" : isPlan62a ? "" : isPlan611 ? "" : isPlan52 ? "" : isPlan61a ? "30/09/2008" : "DBCompeted"}
                disabled
              />
            </Field>
            <Field label="Closed:">
              <TextInput value={isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76z || isPlan62a || isPlan611 || isPlan61a ? "" : isPlan76 ? "10/09/2009 15:29:25" : isPlan52 ? "29/01/2008 1" : "DBClosed"} disabled />
            </Field>
            {!isPlan84 && !isPlan90 && !isPlan80 && !isPlan83 && !isPlan82 && !isPlan76z && (
              <>
                <Field label="Age at death:">
                  <TextInput value={isPlan621 || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : isPlan51 ? "58" : isPlan76 ? "94" : isPlan76z ? "95" : "edAge"} disabled />
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
                  <button type="button" className="lve-btn lve-btn-sm" disabled={isPlan51 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a}>
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
          {(isPlan87 || isPlan84 || isPlan82) && (
            <Field label="">
              <DatePicker value={isPlan82 ? "28/09/2015" : "10/12/2013"} placeholder="" disabled={isPlan87 || isPlan82} />
            </Field>
          )}
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan80 && !isPlan83 && !isPlan82 && !isPlan76 && !isPlan76z && !isPlan621 && !isPlan62a && !isPlan52 && !isPlan61a && !isPlan611 && (
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
              value={isPlan87 ? "SAIMEENAKSHINATHAN.S@LV.com" : isPlan84 ? "LOPVH" : isPlan90 ? "LV66664" : isPlan51 ? "LOPSL2" : isPlan82 ? "LOPSL2" : isPlan80 ? "LOPRXP" : isPlan83 ? "LV66656" : isPlan621 ? "LV67320" : isPlan76 ? "LOPNXP" : isPlan76z ? "LOPSH" : isPlan62a ? "LOPRM" : isPlan611 ? "LOPKXB" : isPlan52 ? "LOPAW" : isPlan61a ? "LOPSH" : "DBEdit18"}
              disabled
            />
          </Field>
          {!isPlan84 && !isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
            <>
              <Field label="App Created by:">
                <TextInput value={isPlan87 ? "saimaanakshinathan.s@lv.com" : isPlan82 ? "LONLM" : isPlan80 ? "LONLM" : isPlan83 ? "LOPEO" : "DBEdit14"} disabled />
              </Field>
              <Field label="Final Quote Issued by:">
                <TextInput value={isPlan87 || isPlan83 || isPlan80 || isPlan82 ? "" : "DBEdit19"} disabled />
              </Field>
            </>
          )}
          {!isPlan76z && (
            <Field label="Rates Ok'd by:">
              <TextInput value={isCompact || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "DBEdit7"} disabled />
            </Field>
          )}
          <Field label="Paykey:">
            <TextInput
              value={isPlan87 ? "1023693" : isPlan84 ? "899032" : isPlan90 ? "1018055" : isPlan51 ? "887324" : isPlan82 ? "903655" : isPlan80 ? "898243" : isPlan83 ? "956314" : isPlan621 ? "100004.1" : isPlan76 ? "887316" : isPlan76z ? "889009" : isPlan62a ? "905319" : isPlan611 ? "887439" : isPlan52 ? "887254" : isPlan61a ? "102929.1" : "DBEdit20"}
              disabled
            />
          </Field>
          <Field label="Policy No:">
            <TextInput
              value={isPlan87 ? "233451" : isPlan84 ? "111834" : isPlan90 ? "227813" : isPlan51 ? "100188" : isPlan82 ? "116444" : isPlan80 ? "111081" : isPlan83 ? "166092" : isPlan621 ? "100004.1" : isPlan76 ? "100180" : isPlan76z ? "101873" : isPlan62a ? "118106" : isPlan611 ? "100303" : isPlan52 ? "100118" : isPlan61a ? "102929.1" : "DBEdit24"}
              disabled
            />
          </Field>
          {!isPlan90 && !isPlan51 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
            <Field label="Dependant Eligible to Receive Benefits:">
              <TextInput value={isPlan87 || isPlan84 || isPlan80 || isPlan83 || isPlan82 ? "" : "edtEli"} disabled />
            </Field>
          )}
        </div>
      </div>

      {/* Correspondence Details */}
      {!isPlan83 && !isPlan76 && !isPlan76z && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Section title="Correspondence Details">
            <Field label="Correspond Name:">
              <TextInput
                value={isPlan87 ? "Dr T Uggiu" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testmtcchibd" : isPlan51 ? "Testmdbaabii" : isPlan82 ? "Testmrbbgeee" : isPlan80 ? "Testmrbbbaib" : isPlan621 ? "Testfrbaaaae.b" : isPlan76 ? "Testmlbaabia" : isPlan76z ? "Testmybabihd" : isPlan62a ? "Testmsbbibag" : isPlan611 ? "Testmssbaadad" : isPlan52 ? "" : isPlan61a ? "Testmhbacjcj b" : "correspname"}
              />
            </Field>
            <Field label="Salutation Name:">
              <TextInput
                value={isPlan87 ? "Dr Uggiu" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testmtcchibd" : isPlan51 ? "Testmdbaabii" : isPlan82 ? "Testmrbbgeee" : isPlan80 ? "Testmrbbbaib" : isPlan621 ? "Testfrbaaaae.b" : isPlan76 ? "Testmlbaabia" : isPlan76z ? "Testmybabihd" : isPlan62a ? "Testmsbbibag" : isPlan611 ? "Testmssbaadad" : isPlan52 ? "" : isPlan61a ? "Testmhbacjcj b" : "salname"}
              />
            </Field>
            <Field label="Telephone:">
              <TextInput value={isPlan87 ? "" : isPlan84 ? "01632 391651" : isPlan90 ? "" : isPlan51 ? "016324162140" : isPlan82 ? "01632555660" : isPlan80 ? "016322100780" : isPlan621 ? "01632 329 783" : isPlan76 ? "01632 532709" : isPlan76z ? "01632 650888" : isPlan62a ? "01632 830 033" : isPlan611 ? "01632 741501" : isPlan52 ? "" : isPlan61a ? "01632653076" : "anntele"} />
            </Field>
            <Field label="E-mail:">
              <TextInput
                value={isPlan87 || isPlan84 || isPlan51 || isPlan80 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : isPlan90 ? "zzzzzz99@zzzzzzz.zz.zz" : isPlan621 ? "zzzzz@zzzzzzzz.zzz" : "DBEditPH_EMAIL"}
              />
            </Field>
          </Section>

          <Section title="Correspondence Address">
            <Field label="Address:">
              <ConnectedAddress
                lines={[
                  {},
                  {},
                  {},
                  {},
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
                    : isPlan82
                    ? ["10 Rightway Close", "Exeter", "", "", "Oldham"]
                    : isPlan80
                    ? ["26 Eastern Close", "Southampton", "Oldham", "", ""]
                    : isPlan621
                    ? ["5 South Drive", "Zennor", "Queensferry", "", ""]
                    : isPlan76
                    ? ["Northampton", "10 Western Avenue", "", "Eastleigh", ""]
                    : isPlan76z
                    ? ["Reading", "", "Reading", "Avonmouth", "Leicester"]
                    : isPlan62a
                    ? ["26 Eastern Close", "Exeter", "Reading", "Jarrow", "Marshwood"]
                    : isPlan611
                    ? ["Kinson", "Verwood", "Marshwood", "Eastleigh", "Exeter"]
                    : isPlan52
                    ? ["", "", "", "", ""]
                    : isPlan61a
                    ? ["19 Uplands Crescent", "Oldham", "Verwood", "Queensferry", ""]
                    : ["phad1", "phad2", "phad3", "phad4", "phad5"]
                }
              />
            </Field>
            <Field label="Postcode:">
              <TextInput
                value={isPlan87 ? "OP9 0OP" : isPlan84 ? "ZE99 9AB" : isPlan90 ? "KI99 9AB" : isPlan51 ? "LE99 9AB" : isPlan82 ? "QU99 9AB" : isPlan80 ? "OL99 9AB" : isPlan621 ? "QU99 9AB" : isPlan76 ? "VE99 9AB" : isPlan76z ? "QU99 9AB" : isPlan62a ? "LE99 9AB" : isPlan611 ? "RE99 9AB" : isPlan52 ? "" : isPlan61a ? "VE99 9AB" : "phpc"}
              />
            </Field>
            <Field label="Country:">
              <SelectInput
                value="United Kingdom"
                options={["United Kingdom", "Ireland", "Other"]}
                disabled
              />
            </Field>
            <div className="mt-2"><Checkbox label="Address Unknown / Gone Away" /></div>
          </Section>
        </div>
      )}
    </div>
  );
}
