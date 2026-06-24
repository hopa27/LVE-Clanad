import { useState } from "react";
import { Field, SelectInput, TextInput, Checkbox, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdSend, MdCheck, MdInfoOutline } from "react-icons/md";
import { EditModeContext } from "../context/EditModeContext";
import { usePlanCode } from "../context/PlanCodeContext";

const ALWAYS_EDITING = {
  editing: true,
  setEditing: () => {},
  cancel: () => {},
  cancelKey: 0,
};

const CLAIM_FORM_POLICY_TYPES = ["Transfer", "Open Market Option", "Flexible Drawdown Income"];
const IRF_CEDING_SCHEMES = ["Friends Provident - Z99999/9999", "AXA - ZZ9999999"];

const LETTERS = [
  "Chaser Letter OS Application Client",
  "Chaser Letter OS Application IFA",
  "Claim Form",
  "Completion Pack",
  "IFA Acceptance Pack",
  "IRF Acceptance Pack inc Client Ltr",
  "IRF Letter",
  "MPAA Letter",
  "Plan Schedule",
  "Return Original Certificates",
  "Rewrite Completion Pack",
  "Transfer Forms",
];

type DistConfig = {
  print: boolean;
  fax: boolean;
  email: boolean;
  sendTo: { client: boolean; ifa: boolean; ceding: boolean; other: boolean };
};

const LETTER_DIST: Record<string, DistConfig> = {
  "Chaser Letter OS Application Client": { print: true,  fax: true,  email: true,  sendTo: { client: true,  ifa: false, ceding: false, other: false } },
  "Chaser Letter OS Application IFA":    { print: true,  fax: true,  email: true,  sendTo: { client: false, ifa: true,  ceding: false, other: false } },
  "Claim Form":                           { print: true,  fax: false, email: true,  sendTo: { client: true,  ifa: true,  ceding: false, other: false } },
  "Completion Pack":                      { print: true,  fax: false, email: true,  sendTo: { client: true,  ifa: true,  ceding: false, other: true  } },
  "IFA Acceptance Pack":                  { print: true,  fax: true,  email: true,  sendTo: { client: false, ifa: true,  ceding: false, other: false } },
  "IRF Acceptance Pack inc Client Ltr":   { print: true,  fax: true,  email: true,  sendTo: { client: true,  ifa: false, ceding: true,  other: false } },
  "IRF Letter":                           { print: true,  fax: true,  email: false, sendTo: { client: false, ifa: false, ceding: true,  other: false } },
  "MPAA Letter":                          { print: true,  fax: false, email: true,  sendTo: { client: true,  ifa: false, ceding: false, other: true  } },
  "Plan Schedule":                        { print: true,  fax: false, email: true,  sendTo: { client: true,  ifa: true,  ceding: false, other: false } },
  "Return Original Certificates":         { print: true,  fax: false, email: false, sendTo: { client: true,  ifa: false, ceding: false, other: false } },
  "Rewrite Completion Pack":              { print: true,  fax: false, email: true,  sendTo: { client: true,  ifa: true,  ceding: false, other: true  } },
  "Transfer Forms":                       { print: true,  fax: true,  email: false, sendTo: { client: true,  ifa: false, ceding: true,  other: false } },
};

const NO_DIST: DistConfig = {
  print: false, fax: false, email: false,
  sendTo: { client: false, ifa: false, ceding: false, other: false },
};

export function LettersTab() {
  return (
    <EditModeContext.Provider value={ALWAYS_EDITING}>
      <LettersTabInner />
    </EditModeContext.Provider>
  );
}

function LettersTabInner() {
  const { planCode } = usePlanCode();
  const isPlan0 = planCode === "0";

  const availableLetters = planCode === "76" ? ["MPAA Letter"] : LETTERS;

  const [selectedLetter, setSelectedLetter] = useState("");
  const [letterError, setLetterError] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [distInfoOpen, setDistInfoOpen] = useState(false);

  // Distribution method state — reset via key when letter changes
  const [printChecked, setPrintChecked] = useState(false);
  const [faxChecked,   setFaxChecked]   = useState(false);
  const [faxValue,     setFaxValue]     = useState("");
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailValue,   setEmailValue]   = useState("");
  const [sendToClient,  setSendToClient]  = useState(false);
  const [sendToIFA,     setSendToIFA]     = useState(false);
  const [sendToCeding,  setSendToCeding]  = useState(false);
  const [sendToOther,   setSendToOther]   = useState(false);

  const cfg = selectedLetter ? (LETTER_DIST[selectedLetter] ?? NO_DIST) : NO_DIST;

  const hasDistribution =
    (cfg.print  && printChecked)        ||
    (cfg.fax    && faxChecked)          ||
    (cfg.email  && emailChecked)        ||
    (cfg.sendTo.client  && sendToClient)  ||
    (cfg.sendTo.ifa     && sendToIFA)     ||
    (cfg.sendTo.ceding  && sendToCeding)  ||
    (cfg.sendTo.other   && sendToOther);

  function handleGenerate() {
    if (!selectedLetter) {
      setLetterError(true);
      setInfoOpen(true);
      return;
    }
    if (!hasDistribution) {
      setDistInfoOpen(true);
      return;
    }
  }

  function handleLetterChange(v: string) {
    setSelectedLetter(v);
    if (v) setLetterError(false);
    // Reset distribution state when letter changes
    setPrintChecked(false);
    setFaxChecked(false);
    setFaxValue("");
    setEmailChecked(false);
    setEmailValue(isPlan0 && v ? "dbedEmail" : "");
    setSendToClient(false);
    setSendToIFA(false);
    setSendToCeding(false);
    setSendToOther(false);
  }

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Select Letter" className="lg:col-span-2">
        <div className={letterError ? "rounded-[8px] ring-2 ring-[#d72714]" : ""}>
          <SelectInput
            value={selectedLetter}
            options={["", ...availableLetters]}
            onChange={handleLetterChange}
          />
        </div>
      </Section>

      <Section title="Letter Specific Info">
        {selectedLetter === "Claim Form" ? (
          <div>
            <label className="lve-label">Policy Type</label>
            <SelectInput value="" options={["", ...CLAIM_FORM_POLICY_TYPES]} />
          </div>
        ) : selectedLetter === "Rewrite Completion Pack" ? (
          <div className="space-y-1">
            <Field inline label="Next Income Amount" labelWidth={200}>
              <TextInput value="" />
            </Field>
            <Field inline label="Next Income Date" labelWidth={200}>
              <DatePicker placeholder="DD/MM/YYYY" />
            </Field>
            <Field inline label="Next Regular Income Amount" labelWidth={200}>
              <TextInput value="" />
            </Field>
          </div>
        ) : selectedLetter === "IRF Letter" || selectedLetter === "Transfer Forms" ? (
          <div>
            <div className="font-['Livvic'] text-[13px] font-semibold text-[#00263e] mb-2">
              Ceding Scheme
            </div>
            <div className="flex flex-col">
              {IRF_CEDING_SCHEMES.map((s) => (
                <Checkbox key={s} label={s} />
              ))}
            </div>
          </div>
        ) : (
          <p className="font-['Mulish'] text-[12px] italic text-[#777]">
            Select a letter to view its options.
          </p>
        )}
      </Section>

      <Section title="Additional Text" className="lg:col-span-2">
        <textarea
          className="lve-input w-full min-h-[180px] resize-y"
          placeholder="Type any additional text to include in the letter…"
        />
      </Section>

      {/* Distribution Info — keyed so checkboxes reset on letter change */}
      <div className="space-y-4" key={selectedLetter}>
        <Section title="Distribution Info">
          <div className="space-y-3">
            <Checkbox label="Print" disabled={!cfg.print} onChange={setPrintChecked} />
            {selectedLetter !== "MPAA Letter" && (
              <>
                <div className="flex items-center gap-3">
                  <Checkbox label="Fax" disabled={!cfg.fax} checked={faxChecked} onChange={(v) => { setFaxChecked(v); if (!v) setFaxValue(""); }} />
                  <div className="flex-1 min-w-0">
                    <TextInput
                      value={faxValue}
                      disabled={!cfg.fax || !faxChecked}
                      onChange={setFaxValue}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox label="Email" disabled={!cfg.email} checked={emailChecked} onChange={(v) => { setEmailChecked(v); if (!v) setEmailValue(""); }} />
                  <div className="flex-1 min-w-0">
                    <TextInput
                      value={emailValue}
                      disabled={!cfg.email || !emailChecked}
                      onChange={setEmailValue}
                    />
                  </div>
                </div>
              </>
            )}
            {isPlan0 && (
              <div className="flex items-center gap-3">
                <label className="lve-label !mb-0 text-right shrink-0 w-[70px]">Archive:</label>
                <div className="flex-1 min-w-0">
                  <Checkbox disabled={!selectedLetter} />
                </div>
              </div>
            )}
          </div>

          {selectedLetter !== "MPAA Letter" && (
            <div className="mt-4 pt-3 border-t border-[#d8d8d8]">
              <div className="font-['Livvic'] text-[13px] font-semibold text-[#00263e] mb-2">
                Send To
              </div>
              <div className="grid grid-cols-2 gap-y-2">
                <Checkbox label="Client"        disabled={!cfg.sendTo.client}  onChange={setSendToClient}  />
                <Checkbox label="IFA"           disabled={!cfg.sendTo.ifa}     onChange={setSendToIFA}     />
                <Checkbox label="Ceding Scheme" disabled={!cfg.sendTo.ceding}  onChange={setSendToCeding}  />
                <Checkbox label="Other"         disabled={!cfg.sendTo.other}   onChange={setSendToOther}   />
              </div>
            </div>
          )}
        </Section>

        <button type="button" className="lve-btn lve-btn-secondary w-full justify-center" onClick={handleGenerate}>
          <MdSend size={16} /> Generate
        </button>
      </div>
    </div>

    {infoOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-[8px] shadow-xl border border-[#bcd] w-[340px] overflow-hidden">
          <header className="bg-[#00263e] text-white font-['Livvic'] text-[14px] font-semibold px-4 py-2">
            Information
          </header>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <MdInfoOutline size={32} className="text-[#006cf4] shrink-0 mt-0.5" />
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                Please select letter/pack.
              </p>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <button type="button" className="lve-btn lve-btn-sm min-w-[80px] justify-center" onClick={() => setInfoOpen(false)}>
                <MdCheck size={16} /> OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {distInfoOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-[8px] shadow-xl border border-[#bcd] w-[340px] overflow-hidden">
          <header className="bg-[#00263e] text-white font-['Livvic'] text-[14px] font-semibold px-4 py-2">
            Information
          </header>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <MdInfoOutline size={32} className="text-[#006cf4] shrink-0 mt-0.5" />
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                Please select at least one distribution method.
              </p>
            </div>
            <div className="mt-5 flex items-center justify-center">
              <button type="button" className="lve-btn lve-btn-sm min-w-[80px] justify-center" onClick={() => setDistInfoOpen(false)}>
                <MdCheck size={16} /> OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
