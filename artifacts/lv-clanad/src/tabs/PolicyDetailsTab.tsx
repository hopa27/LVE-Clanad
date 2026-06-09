import { Field, TextInput, SelectInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { usePlanCode } from "../context/PlanCodeContext";
import { MdKeyboardArrowDown } from "react-icons/md";

export function PolicyDetailsTab() {
  const { planCode } = usePlanCode();
  const isPlan87 = planCode === "87";
  const isPlan84 = planCode === "84";
  const isPlan90 = planCode === "90";
  const isPlan51 = planCode === "51";
  const isPlan83 = planCode === "83";
  const isPlan76 = planCode === "76";
  const isPlan62a = planCode === "62a";
  const isPlan611 = planCode === "611";
  const isPlan52  = planCode === "52";
  const isPlan61a = planCode === "61a";
  const isPreset = isPlan87 || isPlan84 || isPlan90;
  const isBOrTaxLike84 = isPlan84 || isPlan90 || isPlan51;

  return (
    <div className="columns-1 lg:columns-3 gap-4 [&>section]:break-inside-avoid [&>section]:mb-4">
      <Section title="Policy Details">
        <Field label="Online Application:">
          <Checkbox checked={isPlan87} />
        </Field>
        <Field label="Tax Code:">
          <div className="flex items-center gap-3">
            <div className="w-32">
              <TextInput value={isPlan87 ? "1257L*" : isPlan84 ? "52N" : isPlan90 ? "NT" : isPlan51 ? "1257L" : isPlan83 ? "125L" : isPlan76 ? "" : isPlan62a ? "960L" : isPlan611 ? "939L" : isPlan52 ? "939L" : isPlan61a ? "939L" : "DBTAXC"} />
            </div>
            <Checkbox label="Tax Free" />
          </div>
        </Field>
        <Field label="Initial payment method:">
          {isPlan83 ? (
            <SelectInput value="8" options={["8", "B", "C", "T"]} />
          ) : (
            <SelectInput
              value={isBOrTaxLike84 || isPlan76 ? "B" : ""}
              options={isBOrTaxLike84 || isPlan76 ? ["B", "C", "T"] : ["", "B", "C", "T"]}
            />
          )}
        </Field>
        {!isPlan76 && (
          <Field label="Pay Tax Free Cash by:">
            {isPlan83 ? (
              <SelectInput value="8" options={["8", "B", "C", "T"]} />
            ) : (
              <SelectInput
                value={isBOrTaxLike84 ? "B" : ""}
                options={isBOrTaxLike84 ? ["B", "C", "T"] : ["", "B", "C", "T"]}
              />
            )}
          </Field>
        )}
        {(!isPreset || isPlan90) && !isPlan51 && !isPlan83 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
          <>
            <Field label="IR Max Pension:">
              <TextInput value={isPlan90 ? "" : "dbirmax"} />
            </Field>
            <Field label="IR Balance:">
              <TextInput value={isPlan90 ? "" : "DBEdit10"} />
            </Field>
          </>
        )}
        <Field label="ReAssurance Premium:">
          <TextInput
            value={isPlan87 ? "60000" : isPlan84 ? "12209.38" : isPlan90 ? "" : isPlan51 ? "5364.39" : isPlan83 ? "45275.68" : isPlan76 ? "26377.2" : isPlan62a ? "65142" : isPlan611 ? "0" : isPlan52 ? "0" : isPlan61a ? "0" : "dbreassprem"}
          />
        </Field>
        <Field label="ReAssurer:">
          <TextInput value={isPreset || isPlan51 || isPlan83 || isPlan76 || isPlan62a ? "RGA 1" : isPlan611 || isPlan52 || isPlan61a ? "None" : "dbReassurer"} />
        </Field>
        <Field label="Evidence of Age:">
          <TextInput value={isPlan87 || isPlan52 ? "N" : isPlan84 || isPlan90 || isPlan51 || isPlan83 || isPlan76 || isPlan62a || isPlan611 || isPlan61a ? "Y" : "DB"} />
        </Field>
        <Field label="Advice Type:">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <SelectInput
                value={isPreset || isPlan51 || isPlan83 || isPlan76 || isPlan611 || isPlan52 || isPlan61a ? "Independent" : isPlan62a ? "Non advised" : ""}
                options={
                  isPreset || isPlan51 || isPlan83 || isPlan76 || isPlan611 || isPlan52 || isPlan61a
                    ? ["Independent", "Non advised", "Advised"]
                    : isPlan62a
                    ? ["Non advised", "Independent", "Advised"]
                    : ["", "Non advised", "Advised"]
                }
              />
            </div>
            {!isPreset && !isPlan51 && !isPlan83 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
              <span className="text-[12px] font-['Mulish'] text-[#3d3d3d] whitespace-nowrap">
                er (invisible)
              </span>
            )}
          </div>
        </Field>
        <Field label="Distribution Channel:">
          <SelectInput
            value={isPlan87 || isPlan90 || isPlan83 ? "Whole of market" : ""}
            options={["", "Whole of market", "Restricted"]}
          />
        </Field>
        {!isPreset && !isPlan51 && !isPlan83 && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
          <Field label="Money Laundering Form:">
            <TextInput value={isPlan76 ? "Y" : "DB"} />
          </Field>
        )}
        {!isPreset && !isPlan51 && !isPlan83 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a && (
          <Field label="Advised Sale Info:">
            <SelectInput value="" options={["", "Yes", "No"]} />
          </Field>
        )}
        <Field label="Internal Maturity Transfer:"><Checkbox /></Field>
        <Field label="Scheme Pension:">
          <SelectInput
            value={isPreset || isPlan83 || isPlan76 || isPlan62a || isPlan52 ? "No" : isPlan51 || isPlan611 || isPlan61a ? "Unknown" : "DBLookupComl"}
            options={isPreset || isPlan83 || isPlan76 || isPlan62a || isPlan52 ? ["No", "Yes"] : isPlan51 || isPlan611 || isPlan61a ? ["Unknown", "No", "Yes"] : ["DBLookupComl", "No", "Yes"]}
          />
        </Field>
        <Field label="Purchaser:">
          <TextInput
            value={isPlan87 || isPlan52 || isPlan61a ? "" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testbtcchibd" : isPlan51 ? "Testzhbaabii" : isPlan83 ? "Testindbggajc" : isPlan76 ? "Testmlbaabia" : isPlan62a ? "Testmsbbibag" : isPlan611 ? "Testnnbaadad" : "DBEdit5"}
          />
        </Field>
        <Field label="Policy Owner:">
          <SelectInput
            value={isPlan84 ? "Testmtbbbide" : isPlan90 ? "Belinda Testctcchibd" : isPlan51 ? "Simon Simon Testsubaabii" : isPlan83 ? "Testindbggajc" : isPlan76 ? "Colin Testslbaabia" : isPlan62a ? "Testmsbbibag" : ""}
            options={
              isPlan84
                ? ["Testmtbbbide"]
                : isPlan90
                ? ["Belinda Testctcchibd"]
                : isPlan51
                ? ["Simon Simon Testsubaabii"]
                : isPlan83
                ? ["Testindbggajc"]
                : isPlan76
                ? ["Colin Testslbaabia"]
                : isPlan62a
                ? ["Testmsbbibag"]
                : [""]
            }
          />
        </Field>
      </Section>

      {!isPlan87 && !isPlan611 && !isPlan61a && (
        <Section title="Non Standard Policy">
          <Field label="Non Std Flag:">
            <div className="w-24 relative">
              <select
                defaultValue=""
                className="lve-input pr-10 appearance-none"
              >
                <option value="">—</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                <span className="h-6 w-px bg-[#BBBBBB]" />
                <span className="px-2 text-[#006cf4]">
                  <MdKeyboardArrowDown size={18} />
                </span>
              </div>
            </div>
          </Field>
          <Field label="Non Standard Policy:">
            <TextInput value={isPlan84 || isPlan90 || isPlan51 || isPlan83 || isPlan76 || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "" : "dbNonStdNote"} />
          </Field>
        </Section>
      )}

      <Section title="IFA Contact Details">
        <Field label="Name:">
          <TextInput
            value={
              isPlan87 ? "Oakwood Mortgage Services"
              : isPlan84 ? "Lifetime Financial Consulting Ltd"
              : isPlan90 ? "Lyndhurst Financial Management Ltd"
              : isPlan51 ? "Firth & Scott Financial Services Ltd"
              : isPlan83 ? "Premium Fin Plnr Serv (Ex Taylored FS)"
              : isPlan76 ? "HSBC Bank PLC - NHFA Division"
              : isPlan62a ? "Hargreaves Lansdown"
              : isPlan611 ? "Ashwood law Wealth Mgt-EX PBO D Bee"
              : isPlan52 ? "NM/ Brown Financial Services Ltd"
              : "DBEditBrokerName"
            }
            disabled
          />
        </Field>
        <Field label="Building:">
          <TextInput
            value={
              isPlan87 ? "Astra House"
              : isPlan84 ? "15 East Hanningfield Ro"
              : isPlan90 ? "28 Bridge Street"
              : isPlan51 ? "579 Mansfield Road"
              : isPlan83 ? "37 Cromwell Road"
              : isPlan76 ? "Floor 2"
              : isPlan62a ? "One College Square South"
              : isPlan611 ? "Ashwood Law House"
              : isPlan52 ? "Do not send"
              : "DBEdBuilding"
            }
            disabled
          />
        </Field>
        <Field label="Street:">
          <TextInput
            value={
              isPlan87 ? "The Common"
              : isPlan84 ? "Rettendon Common"
              : isPlan90 ? ""
              : isPlan51 ? "Sherwood"
              : isPlan83 ? "Load Sail Farm"
              : isPlan76 ? "Midland House"
              : isPlan62a ? "Anchor Road"
              : isPlan611 ? "Newton Road"
              : isPlan52 ? ""
              : "DBEdStreet"
            }
            disabled
          />
        </Field>
        <Field label="City:">
          <TextInput
            value={
              isPlan87 ? "Cranleigh"
              : isPlan84 ? "Chelmsford"
              : isPlan90 ? "Hitchin"
              : isPlan51 ? "Nottingham"
              : isPlan83 ? "Hull"
              : isPlan76 ? "Botley"
              : isPlan62a ? "Bristol"
              : isPlan611 ? "Coalville"
              : isPlan52 ? ""
              : "DBEdCity"
            }
            disabled
          />
        </Field>
        <Field label="District:">
          <TextInput value={isPreset || isPlan51 || isPlan83 || isPlan62a || isPlan52 ? "" : isPlan611 ? "Heather" : isPlan76 ? "West Way" : "DBEdDistrict"} disabled />
        </Field>
        <Field label="County:">
          <TextInput
            value={
              isPlan87 ? "Surrey"
              : isPlan84 ? "Essex"
              : isPlan90 ? "Hertfordshire"
              : isPlan51 ? "Nottinghamshire"
              : isPlan83 ? ""
              : isPlan76 ? "Oxford"
              : isPlan62a ? ""
              : isPlan611 ? ""
              : isPlan52 ? ""
              : "DBEdCounty"
            }
            disabled
          />
        </Field>
        <Field label="Post Code:">
          <TextInput
            value={
              isPlan87 ? "GU6 8RZ"
              : isPlan84 ? "CM3 8EG"
              : isPlan90 ? "SG5 2DF"
              : isPlan51 ? "NG5 2JN"
              : isPlan83 ? "HU12 8GF"
              : isPlan76 ? "OX2 0PL"
              : isPlan62a ? "BS1 5HL"
              : isPlan611 ? "LE67 2RD"
              : isPlan52 ? "EX1 3LH"
              : "DBEdPostcode"
            }
            disabled
          />
        </Field>
        <Field label="FAO:">
          <TextInput
            value={
              isPlan87 ? ""
              : isPlan84 ? "Alistair Guy"
              : isPlan90 ? ""
              : isPlan51 ? "Kate Nicol"
              : isPlan83 ? ""
              : isPlan76 ? "Andrew Pike"
              : isPlan62a ? ""
              : isPlan611 ? "Laura Hart"
              : isPlan52 ? "Hayley Tink"
              : "DBEditCONTACT_TXT"
            }
            disabled
          />
        </Field>
        <Field label="Email:">
          <TextInput
            value={
              isPlan87 ? "saimeenakshinathan.s@lv.com"
              : isPlan84 ? ""
              : isPlan90 ? "zzzzzzz@zzzzzzz.zz.zz"
              : isPlan83 ? ""
              : isPlan62a ? ""
              : ""
            }
          />
        </Field>
        <Field label="Tel:">
          <TextInput
            value={
              isPlan87 ? ""
              : isPlan84 ? ""
              : isPlan90 ? "01462 441100"
              : isPlan83 ? ""
              : isPlan62a ? ""
              : ""
            }
          />
        </Field>
      </Section>

      {!isPlan90 && !isPlan51 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && (
        <Section title="Statements & Letters">
          <Field label="Issue Statements:">
            <SelectInput
              value={isPlan87 || isPlan84 || isPlan83 ? "Yes" : ""}
              options={isPlan87 || isPlan84 || isPlan83 ? ["Yes", "No"] : [""]}
            />
          </Field>
          <Field label="Copy Annual Statement to IFA:">
            <SelectInput
              value={isPlan87 || isPlan84 || isPlan83 ? "Yes" : ""}
              options={isPlan87 || isPlan84 || isPlan83 ? ["Yes", "No"] : [""]}
            />
          </Field>
          <Field label="Copy Annual Statement to Policyholder:">
            <SelectInput
              value={isPlan87 || isPlan84 || isPlan83 ? "Yes" : ""}
              options={isPlan87 || isPlan84 || isPlan83 ? ["Yes", "No"] : [""]}
            />
          </Field>
          <Field label="Issue wake up letters/maturity chasers:">
            <SelectInput
              value={isPlan87 || isPlan84 || isPlan83 ? "Yes" : "dblcMat"}
              options={isPlan87 || isPlan84 || isPlan83 ? ["Yes", "No"] : ["dblcMat"]}
            />
          </Field>
        </Section>
      )}

      {!isPreset && !isPlan51 && !isPlan83 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && (
        <Section title="Certificate of Existence Details">
          <Field label="CoE No:"><TextInput value="" /></Field>
          <Field label="CoE Received Date:">
            <DatePicker value="DbEdCoERe" placeholder="DbEdCoERe" />
          </Field>
          <Field label="CoE Due Date:">
            <DatePicker value="DbEdCoEDu" placeholder="DbEdCoEDu" disabled />
          </Field>
          <Field label="CoE Due — Sent Date:">
            <DatePicker value="DbEdCoESe" placeholder="DbEdCoESe" />
          </Field>
          <Field label="CoE Follow Up 1 Date:">
            <DatePicker value="DbEdFollow" placeholder="DbEdFollow" />
          </Field>
          <Field label="Follow Up 1 — Sent Date:">
            <DatePicker value="DbEdCoEFo" placeholder="DbEdCoEFo" />
          </Field>
          <Field label="CoE Follow Up 2 Date:">
            <DatePicker value="DbEdFollow" placeholder="DbEdFollow" />
          </Field>
          <Field label="Follow Up 2 — Sent Date:">
            <DatePicker value="DbEdCoEFo" placeholder="DbEdCoEFo" />
          </Field>
        </Section>
      )}

      {!isPreset && !isPlan51 && !isPlan83 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && (
        <Section title="P45 Details">
          <Field label="P45 date rec'd:">
            <TextInput value="bdp45recd" disabled />
          </Field>
          <Field label="P45 Tax Paid:">
            <TextInput value="bdp45taxpaid" disabled />
          </Field>
          <Field label="P45 Gross Pay:">
            <TextInput value="bdp45grosspay" disabled />
          </Field>
        </Section>
      )}

      {(isPreset || isPlan51 || isPlan83 || isPlan62a || isPlan611 || isPlan52) && (
        <Section title="P45 Details">
          <Field label="P45 date rec'd:">
            <TextInput value="" disabled />
          </Field>
          <Field label="P45 Tax Paid:">
            <TextInput value="" disabled />
          </Field>
          <Field label="P45 Gross Pay:">
            <TextInput value="" disabled />
          </Field>
        </Section>
      )}

      <div className="mb-4 px-1 space-y-3 break-inside-avoid">
        <Field label="Adviser Charge:">
          <Checkbox checked={isPlan87 || isPlan83} />
        </Field>
        <Field label="Serious ill health:">
          <DatePicker
            value={isPreset || isPlan51 || isPlan83 || isPlan76 || isPlan62a || isPlan611 || isPlan52 ? "" : "DbEdSeriou"}
            placeholder={isPreset || isPlan51 || isPlan83 || isPlan76 || isPlan62a || isPlan611 || isPlan52 ? "" : "DbEdSeriou"}
          />
        </Field>
      </div>

      <Section title="IFA Details">
        <Field label="IFA Ref:">
          <TextInput
            value={
              isPlan87 ? "OAKWO-013"
              : isPlan84 ? "LIFET-015"
              : isPlan90 ? "ROTHM-002"
              : isPlan51 ? "FRTH-001"
              : isPlan83 ? "TAYLO-062"
              : isPlan76 ? "SBTYL-004"
              : isPlan62a ? "HARGR-005"
              : isPlan611 ? "INDEP-068"
              : isPlan52 ? "KNOWL-003"
              : "BDIFAREF"
            }
            disabled
          />
        </Field>
        <Field label={isPlan84 || isPlan90 || isPlan51 || isPlan76 || isPlan62a || isPlan611 || isPlan52 ? "Comm. %:" : "Adviser Charge %:"}>
          <TextInput
            value={isPlan87 ? "" : isPlan84 ? "2" : isPlan90 ? "0" : isPlan51 ? "2" : isPlan83 ? "" : isPlan76 ? "4" : isPlan62a ? "3" : isPlan611 ? "1.3" : isPlan52 ? "1" : "edtAdviserChar"}
            disabled
          />
        </Field>
        <Field label={isPlan84 || isPlan90 || isPlan51 || isPlan76 || isPlan62a || isPlan611 || isPlan52 ? "Commission:" : "Adviser Charge:"}>
          <TextInput
            value={isPlan87 ? "0" : isPlan84 ? "406.98" : isPlan90 ? "" : isPlan51 ? "176.81" : isPlan83 ? "0" : isPlan76 ? "1758.48" : isPlan62a ? "3257.1" : isPlan611 ? "47.72" : isPlan52 ? "324.03" : "edtAdviserChar"}
            disabled
          />
        </Field>
        {!isPlan90 && !isPlan51 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && (
          <>
            <Field label="Key Account:">
              <TextInput
                value={isPlan87 ? "" : isPlan84 ? "Q" : isPlan83 ? "P" : "DBEdit4"}
                disabled
              />
            </Field>
            <Field label="Region:">
              <TextInput
                value={isPlan87 ? "" : isPlan84 ? "LON" : isPlan83 ? "MAN" : "DBEdit12"}
                disabled
              />
            </Field>
          </>
        )}
      </Section>

      {!isPlan87 && !isPlan90 && !isPlan51 && !isPlan76 && !isPlan62a && !isPlan611 && !isPlan52 && (
        <Section title="MPAA">
          <Field label=" ">
            <Checkbox label="MPAA Rules Triggered" checked={isPlan84} />
          </Field>
          <Field label="Date MPAA Letter Issued:">
            <TextInput value={isPlan84 ? "05/04/2018" : isPlan83 ? "" : "dbEditMPAAIssued"} />
          </Field>
        </Section>
      )}

      <Section title="Agency Deceased">
        <Field label="Deceased Date:">
          <DatePicker
            value=""
            placeholder=""
            disabled={!isPlan90 && !isPlan51 && !isPlan76 && !isPlan611}
          />
        </Field>
        <Field label="Agency Ref:">
          <TextInput value={isPreset || isPlan51 || isPlan83 || isPlan76 || isPlan62a || isPlan611 || isPlan52 ? "" : "edtAgencyDecea"} disabled />
        </Field>
        <Field label="Agency Unique Ref:">
          <TextInput value={isPreset || isPlan51 || isPlan83 || isPlan76 || isPlan62a || isPlan611 || isPlan52 ? "" : "edtAgencyDecNo"} disabled />
        </Field>
        <Field label="Notification Date:">
          <DatePicker
            value=""
            placeholder=""
            disabled={!isPlan90 && !isPlan51 && !isPlan76 && !isPlan611}
          />
        </Field>
      </Section>

    </div>
  );
}
