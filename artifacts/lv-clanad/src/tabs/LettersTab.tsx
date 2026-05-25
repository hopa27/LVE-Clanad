import { useState } from "react";
import { Field, SelectInput, TextInput, Checkbox, Section } from "../components/Field";
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
  const isPlan84 = planCode === "84";
  const [selectedLetter, setSelectedLetter] = useState("");
  const [letterError, setLetterError] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const noLetter = selectedLetter === "";

  function handleGenerate() {
    if (noLetter) {
      setLetterError(true);
      setInfoOpen(true);
    }
  }

  function handleLetterChange(v: string) {
    setSelectedLetter(v);
    if (v) setLetterError(false);
  }

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Section title="Select Letter" className="lg:col-span-2">
        <div className={letterError ? "rounded-[8px] ring-2 ring-[#d72714]" : ""}>
          <SelectInput
            value={selectedLetter}
            options={["", ...LETTERS]}
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
              <TextInput value="" type="date" />
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

      <div className="space-y-4">
        <Section title="Distribution Info">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="lve-label !mb-0 text-right shrink-0 w-[70px]">Print:</label>
              <div className="flex-1 min-w-0">
                <Checkbox disabled={noLetter} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="lve-label !mb-0 text-right shrink-0 w-[70px]">Fax:</label>
              <div className="flex-1 min-w-0">
                <TextInput value={isPlan0 ? "dbedFaxNo" : ""} placeholder="Fax number" disabled={noLetter || isPlan84} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="lve-label !mb-0 text-right shrink-0 w-[70px]">Email:</label>
              <div className="flex-1 min-w-0">
                <TextInput value={isPlan0 ? "dbedEmail" : ""} placeholder="recipient@example.com" disabled={noLetter || isPlan84} />
              </div>
            </div>
            {isPlan0 && (
              <div className="flex items-center gap-3">
                <label className="lve-label !mb-0 text-right shrink-0 w-[70px]">Archive:</label>
                <div className="flex-1 min-w-0">
                  <Checkbox disabled={noLetter} />
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#d8d8d8]">
            <div className="font-['Livvic'] text-[13px] font-semibold text-[#00263e] mb-2">
              Send To
            </div>
            <div className="grid grid-cols-2 gap-y-2">
              <Checkbox label="Client" disabled={noLetter || isPlan84} />
              <Checkbox label="IFA" disabled={noLetter || isPlan84} />
              <Checkbox label="Ceding Scheme" disabled={noLetter || isPlan84} />
              <Checkbox label="Other" disabled={noLetter || isPlan84} />
            </div>
          </div>
        </Section>

        <button type="button" className="lve-btn w-full justify-center" onClick={handleGenerate}>
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
              <button
                type="button"
                className="lve-btn lve-btn-sm min-w-[80px] justify-center"
                onClick={() => setInfoOpen(false)}
              >
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
