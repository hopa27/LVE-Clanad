import { useState } from "react";
import { Field, TextInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdEdit } from "react-icons/md";
import { useCheques } from "../context/ChequesContext";
import { usePlanCode } from "../context/PlanCodeContext";
import { EditBankDetailsModal } from "../components/EditBankDetailsModal";

const TRANSFERS: { company: string; ref: string; date: string; amount: string }[] = [];

const SEED_CHEQUE_NOS = new Set(["232693", "232694", "232695"]);

export function BankAccDetailsTab() {
  const [editBankOpen, setEditBankOpen] = useState(false);
  const { planCode } = usePlanCode();
  const isPlan87 = planCode === "87";
  const isPlan84 = planCode === "84";
  const isPlan90 = planCode === "90";
  const isPlan51 = planCode === "51";
  const isPlan83 = planCode === "83";
  const isPreset = isPlan87 || isPlan84 || isPlan90;
  const { cheques } = useCheques();
  const plan84Rows = isPlan84
    ? [
        { company: "FPMS Gladis PYMTS", ref: "", date: "25/03/2010", amount: "24064.73" },
        { company: "Axa Sun Life PLC",  ref: "", date: "31/03/2010", amount: "3067.23" },
      ]
    : [];
  const plan90Rows = isPlan90
    ? [{ company: "NM PENSIONS TRUSTE  MCP227813  BGCFrom:", ref: "", date: "01/07/2025", amount: "3021.57" }]
    : [];
  const plan51Rows = isPlan51
    ? [{ company: "Zurich Assurance Ltd.", ref: "", date: "28/01/2008", amount: "8940.65" }]
    : [];
  const plan83Rows = isPlan83
    ? [{ company: "NM PENSION TRUST", ref: "", date: "21/08/2015", amount: "75459.46" }]
    : [];
  const postedRows = isPreset || isPlan51 || isPlan83
    ? []
    : cheques
        .filter((c) => !SEED_CHEQUE_NOS.has(c.chequeNo))
        .map((c) => ({
          company: c.transferCompany,
          ref: c.chequeNo,
          date: c.date,
          amount: c.amount,
        }));
  const rows = [...TRANSFERS, ...plan84Rows, ...plan90Rows, ...plan51Rows, ...plan83Rows, ...postedRows];
  return (
    <div className="space-y-4">
      <Section
        title="Bank Details"
        headerAction={
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm" onClick={() => setEditBankOpen(true)}>
            <MdEdit size={16} /> Edit Bank Details
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          <div>
            <Field inline label="Bank sort code:">
              <TextInput
                value={isPlan87 ? "20-00-00" : isPlan84 || isPlan90 || isPlan51 || isPlan83 ? "77-48-14" : "DBEdit41"}
                disabled={isPlan84 || isPlan90}
              />
            </Field>
            <Field inline label="Bank account no:">
              <TextInput
                value={isPlan87 ? "83608808" : isPlan84 || isPlan90 || isPlan51 || isPlan83 ? "24782346" : "DBEdit77"}
                disabled={isPlan84 || isPlan90}
              />
            </Field>
            <Field inline label="Bank account name:">
              <TextInput
                value={isPlan87 ? "Test" : isPlan84 ? "Testktbbbide" : isPlan90 ? "Testmtcchibd" : isPlan51 ? "Testmubaabii" : isPlan83 ? "Testnybggajc" : "DBEdit79"}
                disabled={isPlan84 || isPlan90}
              />
            </Field>
            <Field inline label="Bank name:">
              <TextInput
                value={
                  isPlan87
                    ? "BARCLAY'S BANK PLC, 1 CHURCHILL  PLACE"
                    : isPlan84 || isPlan90 || isPlan51 || isPlan83
                    ? "TSB, WINSFORD"
                    : ""
                }
                disabled
              />
            </Field>
          </div>
          <div>
            <Field inline label="Payment Ref:">
              <TextInput
                value={isPlan87 ? "233451" : isPlan84 ? "111834" : isPlan90 ? "227813" : isPlan51 ? "100188" : isPlan83 ? "INVENC123588" : "DBEdit6"}
                disabled={isPlan84 || isPlan90}
              />
            </Field>
            <Field inline label="Payment Method:">
              <TextInput value={isPreset || isPlan51 || isPlan83 ? "B" : "DB"} disabled />
            </Field>
            {(!isPreset && !isPlan51 && !isPlan83) || isPlan90 ? (
              <Field inline label="Change Effective Date:">
                <DatePicker
                  value={isPlan90 ? "" : "dbedChangeEffect"}
                  placeholder={isPlan90 ? "" : "dbedChangeEffect"}
                  disabled
                />
              </Field>
            ) : null}
            <Field inline label="TOTAL:">
              <TextInput
                value={isPlan84 ? "27131.96" : isPlan90 ? "3021.57" : isPlan51 ? "8940.65" : isPlan83 ? "75459.46" : ""}
                disabled
              />
            </Field>
          </div>
        </div>
      </Section>

      <Section>
        <div className="overflow-auto">
          <table className="lve-grid">
            <thead>
              <tr>
                <th>Transfer Company</th>
                <th>Ref</th>
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Amount (£)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => (
                <tr key={i}>
                  <td>{t.company}</td>
                  <td>{t.ref}</td>
                  <td>{t.date}</td>
                  <td style={{ textAlign: "right" }}>{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <EditBankDetailsModal
        open={editBankOpen}
        onClose={() => setEditBankOpen(false)}
        planCode={planCode}
      />
    </div>
  );
}
