import { useState } from "react";
import { Field, TextInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdEdit, MdCancel } from "react-icons/md";
import { useCheques } from "../context/ChequesContext";
import { usePlanCode } from "../context/PlanCodeContext";
import { EditBankDetailsModal } from "../components/EditBankDetailsModal";
import { ConfirmDialog } from "../components/ConfirmDialog";

const TRANSFERS: { company: string; ref: string; date: string; amount: string }[] = [];

const SEED_CHEQUE_NOS = new Set(["232693", "232694", "232695"]);

export function BankAccDetailsTab() {
  const [editBankOpen, setEditBankOpen] = useState(false);
  const [selectedTransferIdx, setSelectedTransferIdx] = useState<number | null>(null);
  const [deleteSortCodeOpen, setDeleteSortCodeOpen] = useState(false);
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
  const isPreset  = isPlan87 || isPlan84 || isPlan90;
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
  const plan82Rows = isPlan82
    ? [{ company: "Scottish Equitable", ref: "", date: "26/10/2010", amount: "21391.53" }]
    : [];
  const plan621Rows = isPlan621
    ? [
        { company: "SCOTTISH WIDOWS",  ref: "", date: "03/01/2008", amount: "5970.55"  },
        { company: "clerical medical", ref: "", date: "17/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "31/12/2010", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "47244.52" },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "44"       },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "44"       },
        { company: "clerical medical", ref: "", date: "03/06/2008", amount: "44"       },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "44"       },
        { company: "clerical medical", ref: "", date: "09/01/2008", amount: "44"       },
      ]
    : [];
  const plan76Rows = isPlan76
    ? [{ company: "MR C SNASHALL", ref: "", date: "18/01/2008", amount: "43962" }]
    : [];
  const plan76zRows = isPlan76z
    ? [
        { company: "Stuart L Kinsey",   ref: "", date: "26/06/2008", amount: "21232.66" },
        { company: "Martin L Kinsey",   ref: "", date: "26/06/2008", amount: "21232.67" },
        { company: "MT & Mrs Blakekey", ref: "", date: "26/06/2008", amount: "21232.66" },
      ]
    : [];
  const plan80Rows = isPlan80
    ? [
        { company: "GUARDIAN ASSURANCE", ref: "", date: "25/02/2010", amount: "28079.5"  },
        { company: "LEGAL AND GENERAL",  ref: "", date: "26/02/2010", amount: "13130.57" },
        { company: "LV=",                ref: "", date: "19/03/2013", amount: "-28079.5" },
        { company: "LV=",                ref: "", date: "19/03/2013", amount: "-13130.57"},
      ]
    : [];
  const postedRows = isPreset || isPlan80 || isPlan51 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a
    ? []
    : cheques
        .filter((c) => !SEED_CHEQUE_NOS.has(c.chequeNo))
        .map((c) => ({
          company: c.transferCompany,
          ref: c.chequeNo,
          date: c.date,
          amount: c.amount,
        }));
  const rows = [...TRANSFERS, ...plan84Rows, ...plan90Rows, ...plan51Rows, ...plan80Rows, ...plan82Rows, ...plan83Rows, ...plan621Rows, ...plan76Rows, ...plan76zRows, ...postedRows];
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
              <div className="flex items-center gap-2">
                <div className="flex-1 min-w-0">
                  <TextInput
                    value={isPlan87 ? "20-00-00" : isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan61a ? "77-48-14" : isPlan52 ? "" : "DBEdit41"}
                    disabled={isPlan84 || isPlan90}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteSortCodeOpen(true)}
                  className="lve-btn lve-btn-secondary !rounded-full !p-0 !w-10 !h-10 shrink-0 inline-flex items-center justify-center"
                  title="Delete sort code"
                  aria-label="Delete sort code"
                >
                  <MdCancel size={18} />
                </button>
              </div>
            </Field>
            <Field inline label="Bank account no:">
              <TextInput
                value={isPlan87 ? "83608808" : isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan61a ? "24782346" : isPlan52 ? "" : "DBEdit77"}
                disabled={isPlan84 || isPlan90}
              />
            </Field>
            <Field inline label="Bank account name:">
              <TextInput
                value={isPlan87 ? "Test" : isPlan84 ? "Testktbbbide" : isPlan90 ? "Testmtcchibd" : isPlan51 ? "Testmubaabii" : isPlan82 ? "Testmrbbgeee" : isPlan80 ? "Testmrbbbaib" : isPlan83 ? "Testnybggajc" : isPlan621 ? "Testmrbaaaae.b" : isPlan76 ? "Testakbaabia" : isPlan76z ? "Testtebabihd" : isPlan62a ? "Testmsbbibag" : isPlan611 ? "Testjsbaadad" : isPlan52 ? "" : isPlan61a ? "" : "DBEdit79"}
                disabled={isPlan84 || isPlan90}
              />
            </Field>
            <Field inline label="Bank name:">
              <TextInput
                value={
                  isPlan87
                    ? "BARCLAY'S BANK PLC, 1 CHURCHILL  PLACE"
                    : isPlan84 || isPlan90 || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan61a
                    ? "TSB, WINSFORD"
                    : isPlan52
                    ? "ROYAL BANK OF SCOT, RBS Bishopsgate (C)"
                    : ""
                }
                disabled
              />
            </Field>
          </div>
          <div>
            <Field inline label="Payment Ref:">
              <TextInput
                value={isPlan87 ? "233451" : isPlan84 ? "111834" : isPlan90 ? "227813" : isPlan51 ? "100188" : isPlan82 ? "D/1494543610" : isPlan80 ? "111081" : isPlan83 ? "INVENC123588" : isPlan621 ? "100004" : isPlan76 ? "100180" : isPlan76z ? "101873" : isPlan62a ? "118106" : isPlan611 ? "100303" : isPlan52 ? "100118" : isPlan61a ? "102929.1" : "DBEdit6"}
                disabled={isPlan84 || isPlan90}
              />
            </Field>
            <Field inline label="Payment Method:">
              <TextInput value={isPreset || isPlan51 || isPlan80 || isPlan83 || isPlan82 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a ? "B" : "DB"} disabled />
            </Field>
            {((!isPreset && !isPlan80 && !isPlan51 && !isPlan83 && !isPlan82 && !isPlan621 && !isPlan76 && !isPlan76z && !isPlan62a && !isPlan611 && !isPlan52 && !isPlan61a) || isPlan90) ? (
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
                value={isPlan84 ? "27131.96" : isPlan90 ? "3021.57" : isPlan51 ? "8940.65" : isPlan82 ? "21391.53" : isPlan80 ? "" : isPlan83 ? "75459.46" : isPlan76 ? "43962" : isPlan76z ? "63697.99" : isPlan621 ? "" : ""}
                disabled
              />
            </Field>
          </div>
        </div>
      </Section>

      <Section>
        {(() => {
          const handleTransferKey = (e: React.KeyboardEvent) => {
            if (!rows.length) return;
            const last = rows.length - 1;
            if (e.key === "ArrowDown") { e.preventDefault(); setSelectedTransferIdx((i) => Math.min((i ?? -1) + 1, last)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedTransferIdx((i) => Math.max((i ?? 1) - 1, 0)); }
            else if (e.key === "Home") { e.preventDefault(); setSelectedTransferIdx(0); }
            else if (e.key === "End") { e.preventDefault(); setSelectedTransferIdx(last); }
          };
          return (
        <div
          className="overflow-auto max-h-[320px]"
          role="grid"
          tabIndex={0}
          onKeyDown={handleTransferKey}
          aria-label="Transfer history grid"
          aria-rowcount={rows.length}
        >
          <table className="lve-grid">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th>Transfer Company</th>
                {!isPlan90 && <th>Ref</th>}
                <th>Date</th>
                <th style={{ textAlign: "right" }}>Amount (£)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t, i) => {
                const isSel = selectedTransferIdx === i;
                const tdStyle = isSel ? { backgroundColor: "#05579B", color: "#ffffff" } : undefined;
                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedTransferIdx(i)}
                    className="cursor-pointer"
                    aria-selected={isSel}
                    role="row"
                    aria-rowindex={i + 1}
                  >
                    <td style={tdStyle}>{t.company}</td>
                    {!isPlan90 && <td style={tdStyle}>{t.ref}</td>}
                    <td style={tdStyle}>{t.date}</td>
                    <td style={{ textAlign: "right", ...(isSel ? { backgroundColor: "#05579B", color: "#ffffff" } : {}) }}>{t.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
          );
        })()}
      </Section>

      <EditBankDetailsModal
        open={editBankOpen}
        onClose={() => setEditBankOpen(false)}
        planCode={planCode}
      />

      <ConfirmDialog
        open={deleteSortCodeOpen}
        message="Are you sure?"
        onYes={() => setDeleteSortCodeOpen(false)}
        onNo={() => setDeleteSortCodeOpen(false)}
      />
    </div>
  );
}
