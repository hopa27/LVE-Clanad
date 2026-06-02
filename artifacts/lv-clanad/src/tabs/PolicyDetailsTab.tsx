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
              <TextInput value={isPlan87 ? "1257L*" : isPlan84 ? "52N" : isPlan90 ? "NT" : isPlan51 ? "1257L" : "DBTAXC"} />
            </div>
            <Checkbox label="Tax Free" />
          </div>
        </Field>
        <Field label="Initial payment method:">
          <SelectInput
            value={isBOrTaxLike84 ? "B" : ""}
            options={isBOrTaxLike84 ? ["B", "C", "T"] : ["", "B", "C", "T"]}
          />
        </Field>
        <Field label="Pay Tax Free Cash by:">
          <SelectInput
            value={isBOrTaxLike84 ? "B" : ""}
            options={isBOrTaxLike84 ? ["B", "C", "T"] : ["", "B", "C", "T"]}
          />
        </Field>
        {(!isPreset || isPlan90) && !isPlan51 && (
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
            value={isPlan87 ? "60000" : isPlan84 ? "12209.38" : isPlan90 ? "" : isPlan51 ? "5364.39" : "dbreassprem"}
          />
        </Field>
        <Field label="ReAssurer:">
          <TextInput value={isPreset || isPlan51 ? "RGA 1" : "dbReassurer"} />
        </Field>
        <Field label="Evidence of Age:">
          <TextInput value={isPlan87 ? "N" : isPlan84 || isPlan90 || isPlan51 ? "Y" : "DB"} />
        </Field>
        <Field label="Advice Type:">
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <SelectInput
                value={isPreset || isPlan51 ? "Independent" : ""}
                options={
                  isPreset || isPlan51
                    ? ["Independent", "Non advised", "Advised"]
                    : ["", "Non advised", "Advised"]
                }
              />
            </div>
            {!isPreset && !isPlan51 && (
              <span className="text-[12px] font-['Mulish'] text-[#3d3d3d] whitespace-nowrap">
                er (invisible)
              </span>
            )}
          </div>
        </Field>
        <Field label="Distribution Channel:">
          <SelectInput
            value={isPlan87 || isPlan90 ? "Whole of market" : ""}
            options={["", "Whole of market", "Restricted"]}
          />
        </Field>
        {!isPreset && !isPlan51 && (
          <>
            <Field label="Money Laundering Form:"><TextInput value="DB" /></Field>
            <Field label="Advised Sale Info:">
              <SelectInput value="" options={["", "Yes", "No"]} />
            </Field>
          </>
        )}
        <Field label="Internal Maturity Transfer:"><Checkbox /></Field>
        <Field label="Scheme Pension:">
          <SelectInput
            value={isPreset ? "No" : isPlan51 ? "Unknown" : "DBLookupComl"}
            options={isPreset ? ["No", "Yes"] : isPlan51 ? ["Unknown", "No", "Yes"] : ["DBLookupComl", "No", "Yes"]}
          />
        </Field>
        <Field label="Purchaser:">
          <TextInput
            value={isPlan87 ? "" : isPlan84 ? "Testmtbbbide" : isPlan90 ? "Testbtcchibd" : isPlan51 ? "Testzhbaabii" : "DBEdit5"}
          />
        </Field>
        <Field label="Policy Owner:">
          <SelectInput
            value={isPlan84 ? "Testmtbbbide" : isPlan90 ? "Belinda Testctcchibd" : isPlan51 ? "Simon Simon Testsubaabii" : ""}
            options={
              isPlan84
                ? ["Testmtbbbide"]
                : isPlan90
                ? ["Belinda Testctcchibd"]
                : isPlan51
                ? ["Simon Simon Testsubaabii"]
                : [""]
            }
          />
        </Field>
      </Section>

      {!isPlan87 && (
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
            <TextInput value={isPlan84 || isPlan90 || isPlan51 ? "" : "dbNonStdNote"} />
          </Field>
        </Section>
      )}

      <Section title="IFA Contact Details">
        <Field label="Name:">
          <TextInput
            value={
              isPlan87
                ? "Oakwood Mortgage Services"
                : isPlan84
                ? "Lifetime Financial Consulting Ltd"
                : isPlan90
                ? "Lyndhurst Financial Management Ltd"
                : isPlan51
                ? "Firth & Scott Financial Services Ltd"
                : "DBEditBrokerName"
            }
            disabled
          />
        </Field>
        <Field label="Building:">
          <TextInput
            value={
              isPlan87
                ? "Astra House"
                : isPlan84
                ? "15 East Hanningfield Ro"
                : isPlan90
                ? "28 Bridge Street"
                : isPlan51
                ? "579 Mansfield Road"
                : "DBEdBuilding"
            }
            disabled
          />
        </Field>
        <Field label="Street:">
          <TextInput
            value={
              isPlan87
                ? "The Common"
                : isPlan84
                ? "Rettendon Common"
                : isPlan90
                ? ""
                : isPlan51
                ? "Sherwood"
                : "DBEdStreet"
            }
            disabled
          />
        </Field>
        <Field label="City:">
          <TextInput
            value={
              isPlan87
                ? "Cranleigh"
                : isPlan84
                ? "Chelmsford"
                : isPlan90
                ? "Hitchin"
                : isPlan51
                ? "Nottingham"
                : "DBEdCity"
            }
            disabled
          />
        </Field>
        <Field label="District:">
          <TextInput value={isPreset || isPlan51 ? "" : "DBEdDistrict"} disabled />
        </Field>
        <Field label="County:">
          <TextInput
            value={
              isPlan87
                ? "Surrey"
                : isPlan84
                ? "Essex"
                : isPlan90
                ? "Hertfordshire"
                : isPlan51
                ? "Nottinghamshire"
                : "DBEdCounty"
            }
            disabled
          />
        </Field>
        <Field label="Post Code:">
          <TextInput
            value={
              isPlan87
                ? "GU6 8RZ"
                : isPlan84
                ? "CM3 8EG"
                : isPlan90
                ? "SG5 2DF"
                : isPlan51
                ? "NG5 2JN"
                : "DBEdPostcode"
            }
            disabled
          />
        </Field>
        <Field label="FAO:">
          <TextInput
            value={
              isPlan87
                ? ""
                : isPlan84
                ? "Alistair Guy"
                : isPlan90
                ? ""
                : isPlan51
                ? "Kate Nicol"
                : "DBEditCONTACT_TXT"
            }
            disabled
          />
        </Field>
        <Field label="Email:">
          <TextInput
            value={
              isPlan87
                ? "saimeenakshinathan.s@lv.com"
                : isPlan84
                ? ""
                : isPlan90
                ? "zzzzzzz@zzzzzzz.zz.zz"
                : ""
            }
          />
        </Field>
        <Field label="Tel:">
          <TextInput
            value={
              isPlan87
                ? ""
                : isPlan84
                ? ""
                : isPlan90
                ? "01462 441100"
                : ""
            }
          />
        </Field>
      </Section>

      {!isPlan90 && !isPlan51 && (
        <Section title="Statements & Letters">
          <Field label="Issue Statements:">
            <SelectInput
              value={isPlan87 || isPlan84 ? "Yes" : ""}
              options={isPlan87 || isPlan84 ? ["Yes", "No"] : [""]}
            />
          </Field>
          <Field label="Copy Annual Statement to IFA:">
            <SelectInput
              value={isPlan87 || isPlan84 ? "Yes" : ""}
              options={isPlan87 || isPlan84 ? ["Yes", "No"] : [""]}
            />
          </Field>
          <Field label="Copy Annual Statement to Policyholder:">
            <SelectInput
              value={isPlan87 || isPlan84 ? "Yes" : ""}
              options={isPlan87 || isPlan84 ? ["Yes", "No"] : [""]}
            />
          </Field>
          <Field label="Issue wake up letters/maturity chasers:">
            <SelectInput
              value={isPlan87 || isPlan84 ? "Yes" : "dblcMat"}
              options={isPlan87 || isPlan84 ? ["Yes", "No"] : ["dblcMat"]}
            />
          </Field>
        </Section>
      )}

      {!isPreset && !isPlan51 && (
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

      <Section title="P45 Details">
        <Field label="P45 date rec'd:">
          <TextInput value={isPreset || isPlan51 ? "" : "bdp45recd"} disabled />
        </Field>
        <Field label="P45 Tax Paid:">
          <TextInput value={isPreset || isPlan51 ? "" : "bdp45taxpaid"} disabled />
        </Field>
        <Field label="P45 Gross Pay:">
          <TextInput value={isPreset || isPlan51 ? "" : "bdp45grosspay"} disabled />
        </Field>
      </Section>

      <div className="mb-4 px-1 space-y-3 break-inside-avoid">
        <Field label="Adviser Charge:">
          <Checkbox checked={isPlan87} />
        </Field>
        <Field label="Serious ill health:">
          <DatePicker
            value={isPreset || isPlan51 ? "" : "DbEdSeriou"}
            placeholder={isPreset || isPlan51 ? "" : "DbEdSeriou"}
          />
        </Field>
      </div>

      <Section title="IFA Details">
        <Field label="IFA Ref:">
          <TextInput
            value={
              isPlan87
                ? "OAKWO-013"
                : isPlan84
                ? "LIFET-015"
                : isPlan90
                ? "ROTHM-002"
                : isPlan51
                ? "FRTH-001"
                : "BDIFAREF"
            }
            disabled
          />
        </Field>
        <Field label={isPlan84 || isPlan90 || isPlan51 ? "Comm. %:" : "Adviser Charge %:"}>
          <TextInput
            value={isPlan87 ? "" : isPlan84 ? "2" : isPlan90 ? "0" : isPlan51 ? "2" : "edtAdviserChar"}
            disabled
          />
        </Field>
        <Field label={isPlan84 || isPlan90 || isPlan51 ? "Commission:" : "Adviser Charge:"}>
          <TextInput
            value={isPlan87 ? "0" : isPlan84 ? "406.98" : isPlan90 ? "" : isPlan51 ? "176.81" : "edtAdviserChar"}
            disabled
          />
        </Field>
        {!isPlan90 && !isPlan51 && (
          <>
            <Field label="Key Account:">
              <TextInput
                value={isPlan87 ? "" : isPlan84 ? "Q" : "DBEdit4"}
                disabled
              />
            </Field>
            <Field label="Region:">
              <TextInput
                value={isPlan87 ? "" : isPlan84 ? "LON" : "DBEdit12"}
                disabled
              />
            </Field>
          </>
        )}
      </Section>

      {!isPlan87 && !isPlan90 && !isPlan51 && (
        <Section title="MPAA">
          <Field label=" ">
            <Checkbox label="MPAA Rules Triggered" checked={isPlan84} />
          </Field>
          <Field label="Date MPAA Letter Issued:">
            <TextInput value={isPlan84 ? "05/04/2018" : "dbEditMPAAIssued"} />
          </Field>
        </Section>
      )}

      <Section title="Agency Deceased">
        <Field label="Deceased Date:">
          <DatePicker
            value={isPreset ? "" : ""}
            placeholder=""
            disabled={!isPlan90 && !isPlan51}
          />
        </Field>
        <Field label="Agency Ref:">
          <TextInput value={isPreset || isPlan51 ? "" : "edtAgencyDecea"} disabled />
        </Field>
        <Field label="Agency Unique Ref:">
          <TextInput value={isPreset || isPlan51 ? "" : "edtAgencyDecNo"} disabled />
        </Field>
        <Field label="Notification Date:">
          <DatePicker
            value=""
            placeholder=""
            disabled={!isPlan90 && !isPlan51}
          />
        </Field>
      </Section>

    </div>
  );
}
