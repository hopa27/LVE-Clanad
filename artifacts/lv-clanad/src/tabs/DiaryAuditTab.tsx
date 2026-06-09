import { useState } from "react";
import { Section } from "../components/Field";
import { MiscDiaryModal, type DiaryEntryInput } from "../components/MiscDiaryModal";
import { CustomerNeedsModal } from "../components/CustomerNeedsModal";
import { CedingSchemeModal } from "../components/CedingSchemeModal";
import { usePlanCode } from "../context/PlanCodeContext";
import {
  MdNoteAdd,
  MdEdit,
  MdCheckCircleOutline,
  MdManageSearch,
  MdGroups,
  MdHelpOutline,
  MdCheck,
  MdClose,
} from "react-icons/md";

type DiaryRow = {
  ref: number;
  type: string;
  notes: string;
  created: string;
  by: string;
  due: string;
  completed: string;
  byCompleted: string;
};

const PLAN_84_DIARY: DiaryRow[] = [
  { ref: 8, type: "Quote",   notes: "Is Var 4 ok?",                                       created: "12/04/2010", by: "LOPNS", due: "19/04/2010", completed: "13/04/2010", byCompleted: "LOPJT1" },
  { ref: 6, type: "Misc",    notes: "IFA email address - admin@lifetimefinancial.biz",    created: "17/03/2010", by: "LONLM", due: "24/03/2010", completed: "13/04/2010", byCompleted: "LOPJT1" },
  { ref: 7, type: "Misc",    notes: "AWAIT ORIGINAL APP",                                 created: "17/03/2010", by: "LONLM", due: "24/03/2010", completed: "07/04/2010", byCompleted: "LOPNS" },
  { ref: 2, type: "Cheques", notes: "Chase for application cheques of AXA",               created: "17/03/2010", by: "LONLM", due: "07/04/2010", completed: "06/04/2010", byCompleted: "LOPRXS" },
  { ref: 3, type: "Misc",    notes: "Confirmation of transfer - AXA",                     created: "17/03/2010", by: "LONLM", due: "24/03/2010", completed: "01/04/2010", byCompleted: "LOPTR" },
  { ref: 5, type: "Misc",    notes: "CVI Form",                                           created: "17/03/2010", by: "LONLM", due: "24/03/2010", completed: "29/03/2010", byCompleted: "PENJOX" },
  { ref: 4, type: "Misc",    notes: "Confirmation of transfer - Friends Provident",      created: "17/03/2010", by: "LONLM", due: "24/03/2010", completed: "26/03/2010", byCompleted: "LOPNS" },
  { ref: 1, type: "Cheques", notes: "Chase for application cheques of Friends Provident", created: "17/03/2010", by: "LONLM", due: "07/04/2010", completed: "26/03/2010", byCompleted: "LOPNS" },
];

const PLAN_87_DIARY: DiaryRow[] = [
  { ref: 6, type: "Death Ben Nom Form", notes: "DBNF missing, incomplete or invalid", created: "15/05/2026", by: "SYSRV", due: "22/05/2026", completed: "", byCompleted: "" },
  { ref: 5, type: "CVI", notes: "Confirmation of Verification of Identity", created: "15/05/2026", by: "SYSRV", due: "22/05/2026", completed: "", byCompleted: "" },
  { ref: 2, type: "Bank Validation", notes: "Supplied bank details do not match to Client 1st Life", created: "15/05/2026", by: "SYSRV", due: "22/05/2026", completed: "", byCompleted: "" },
  { ref: 7, type: "LTA Form", notes: "LTA Form missing, incomplete or invalid", created: "15/05/2026", by: "SYSRV", due: "22/05/2026", completed: "15/05/2026", byCompleted: "SYSRV" },
  { ref: 3, type: "EOA Client", notes: "Annuitant EOA missing, incomplete or invalid", created: "15/05/2026", by: "SYSRV", due: "22/05/2026", completed: "", byCompleted: "" },
  { ref: 1, type: "App Form (B)", notes: "Client bank account details missing/incomplete", created: "15/05/2026", by: "SYSRV", due: "22/05/2026", completed: "15/05/2026", byCompleted: "SYSRV" },
  { ref: 4, type: "App Form (E/F)", notes: "Client declaration not signed", created: "15/05/2026", by: "SYSRV", due: "22/05/2026", completed: "15/05/2026", byCompleted: "SYSRV" },
];

const INITIAL_DIARY: DiaryRow[] = [
  { ref: 14, type: "BCE5A", notes: "BCE 5A check at age 75", created: "28/05/2025", by: "LV67180", due: "26/02/2034", completed: "", byCompleted: "" },
  { ref: 11, type: "Misc", notes: "Is Var 7 ok?", created: "01/05/2025", by: "PENSAK", due: "02/05/2025", completed: "", byCompleted: "" },
  { ref: 13, type: "Misc", notes: "LS form needed", created: "12/05/2025", by: "LV67180", due: "19/05/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 12, type: "Misc", notes: "Bank Statement needed", created: "12/05/2025", by: "LV67180", due: "19/05/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 10, type: "Misc", notes: "Client taking TFC and Lump Sum leaving £15,000.00", created: "22/04/2025", by: "LV62209", due: "29/04/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 8, type: "Misc", notes: "WPFTA dec sent to IFA", created: "22/04/2025", by: "LV62209", due: "29/04/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 2, type: "Fund Correspondence", notes: "Options Case- Prudential- 51641322", created: "13/03/2025", by: "SYSANN", due: "20/03/2025", completed: "28/05/2025", byCompleted: "LV67180" },
  { ref: 1, type: "Funds", notes: "Options Case- Prudential- 51641322", created: "13/03/2025", by: "SYSANN", due: "20/03/2025", completed: "28/05/2025", byCompleted: "LV62209" },
];

const CURRENT_USER = "LV67180";

function fmt(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

const PLAN_90_DIARY: DiaryRow[] = [
  { ref: 2, type: "Fund Correspondence", notes: "LV= Retirement Solutions- 608513", created: "25/06/2025", by: "SYSANN", due: "02/07/2025", completed: "", byCompleted: "" },
  { ref: 1, type: "Funds",               notes: "LV= Retirement Solutions- 608513", created: "25/06/2025", by: "SYSANN", due: "02/07/2025", completed: "", byCompleted: "" },
];

const PLAN_51_DIARY: DiaryRow[] = [
  { ref: 11, type: "Death Cert Client",       notes: "Annuitant Death Certificate",       created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "",           byCompleted: "" },
  { ref: 13, type: "Overpayment",              notes: "Return of overpayment",             created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "03/06/2015", byCompleted: "LOPVB" },
  { ref: 7,  type: "Beneficiary (NINO)",       notes: "Beneficiary NI Number",             created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "14/11/2014", byCompleted: "LOPSL2" },
  { ref: 12, type: "Marriage Certificate",     notes: "Marriage Certificate",              created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "14/11/2014", byCompleted: "LOPSL2" },
  { ref: 10, type: "Benefits Beneficiary Form",notes: "Benefits Beneficiary Form",         created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "14/11/2014", byCompleted: "LOPSL2" },
  { ref: 9,  type: "Beneficiary (DOB)",        notes: "Beneficiary date of birth",         created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "14/11/2014", byCompleted: "LOPSL2" },
  { ref: 8,  type: "Beneficiary (Bank Dets)",  notes: "Beneficiary bank account details",  created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "14/11/2014", byCompleted: "LOPSL2" },
  { ref: 6,  type: "Beneficiary (Name & Add)", notes: "Beneficiary name & address",        created: "14/11/2014", by: "SYSANN", due: "14/12/2014", completed: "14/11/2014", byCompleted: "LOPSL2" },
];

const DATA_CHANGES_51: { changeDate: string; description: string; userId: string }[] = [
  { changeDate: "14/11/2014 10:55:14", description: "Field Annuities-Gross Balance was changed from 131.5 to .",      userId: "LOPSL2" },
  { changeDate: "14/11/2014 10:55:14", description: "Field Installments-Remaining was changed from 1 to .",           userId: "LOPSL2" },
  { changeDate: "14/11/2014 10:55:14", description: "Field Next Payment Due was changed from 28/01/2015 to .",        userId: "LOPSL2" },
];

const AUDIT_84 = Array.from({ length: 10 }, () => "Test Note");
const AUDIT_51 = Array.from({ length: 10 }, () => "Test Note");
const AUDIT_90 = [
  ...Array.from({ length: 10 }, () => "Test Note"),
  "System Advises: P45 details amended by UAT4 on 25/05/2026 at 13:48:46",
];

const PLAN_82_DIARY: DiaryRow[] = [
  { ref: 11, type: "Misc",                notes: "FQ - IS VAR 02 OK?",                         created: "05/01/2011", by: "LOPPY",  due: "12/01/2011", completed: "05/01/2011", byCompleted: "LOPPY" },
  { ref: 10, type: "Misc",                notes: "IFA email address - customerservices@retirementdirect.co.uk", created: "06/10/2010", by: "LONLM", due: "13/10/2010", completed: "05/01/2011", byCompleted: "LOPPY" },
  { ref: 9,  type: "Misc",                notes: "NO TFC BEING PAID",                           created: "21/09/2010", by: "LONLM",  due: "28/09/2010", completed: "05/01/2011", byCompleted: "LOPPY" },
  { ref: 8,  type: "Fund Correspondence", notes: "Aegon",                                        created: "21/09/2010", by: "LONLM",  due: "28/09/2010", completed: "05/01/2011", byCompleted: "LOPPY" },
  { ref: 7,  type: "Funds",               notes: "Aegon",                                        created: "21/09/2010", by: "LONLM",  due: "28/09/2010", completed: "22/11/2010", byCompleted: "LOPPY" },
  { ref: 6,  type: "LTA Form",            notes: "LTA Form missing, incomplete or invalid",      created: "21/09/2010", by: "SYSANN", due: "28/09/2010", completed: "06/10/2010", byCompleted: "LONLM" },
  { ref: 5,  type: "Death Ben Nom Form",  notes: "DBNF missing, incomplete or invalid",          created: "21/09/2010", by: "SYSANN", due: "28/09/2010", completed: "06/10/2010", byCompleted: "LONLM" },
  { ref: 4,  type: "CVI",                 notes: "Confirmation of Verification of Identity",     created: "21/09/2010", by: "SYSANN", due: "28/09/2010", completed: "06/10/2010", byCompleted: "LONLM" },
  { ref: 3,  type: "App Form (E/F)",      notes: "Client declaration not signed",                 created: "21/09/2010", by: "SYSANN", due: "28/09/2010", completed: "06/10/2010", byCompleted: "LONLM" },
  { ref: 2,  type: "EOA Client",          notes: "Annuitant EOA missing, incomplete or invalid",  created: "21/09/2010", by: "SYSANN", due: "28/09/2010", completed: "06/10/2010", byCompleted: "LONLM" },
  { ref: 1,  type: "App Form (B)",        notes: "Client bank account details missing/incomplete", created: "21/09/2010", by: "SYSANN", due: "28/09/2010", completed: "06/10/2010", byCompleted: "LONLM" },
];

const AUDIT_82 = Array.from({ length: 10 }, () => "Test Note");

const PLAN_83_DIARY: DiaryRow[] = [
  { ref: 12, type: "Claim Form Details",   notes: "Claim Form Details",   created: "14/08/2025", by: "SYSANN", due: "21/08/2026", completed: "", byCompleted: "" },
  { ref: 11, type: "Nature Of Payment",    notes: "Nature Of Payment",    created: "14/08/2025", by: "SYSANN", due: "21/08/2026", completed: "", byCompleted: "" },
  { ref: 10, type: "Payment Method",       notes: "Payment Method",       created: "14/08/2025", by: "SYSANN", due: "21/08/2026", completed: "", byCompleted: "" },
  { ref: 9,  type: "Correspondence Details", notes: "Correspondence Details", created: "14/08/2025", by: "SYSANN", due: "21/08/2026", completed: "", byCompleted: "" },
  { ref: 13, type: "Payee Details",        notes: "Payee Details",        created: "14/08/2025", by: "SYSANN", due: "21/08/2026", completed: "", byCompleted: "" },
  { ref: 8,  type: "BCE5A",               notes: "BCE 5A check at age 75", created: "08/11/2016", by: "SYSANN", due: "06/07/2025", completed: "", byCompleted: "" },
  { ref: 7,  type: "Misc",               notes: "is var 3 ok?",          created: "18/08/2015", by: "LOPCH",  due: "25/08/2015", completed: "21/08/2015", byCompleted: "LOPCH" },
  { ref: 6,  type: "Misc",               notes: "RA",                    created: "27/07/2015", by: "LOPBP",  due: "03/08/2015", completed: "18/08/2015", byCompleted: "LOPCH" },
];

const AUDIT_83 = Array.from({ length: 10 }, () => "Test Note");

const PLAN_621_DIARY: DiaryRow[] = [
  { ref: 1, type: "Beneficiary (Name & Add)", notes: "Beneficiary name & address",       created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
  { ref: 2, type: "Beneficiary (NINO)",       notes: "Beneficiary NI Number",             created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
  { ref: 3, type: "Beneficiary (Bank Dets)",  notes: "Beneficiary bank account details",  created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
  { ref: 8, type: "Overpayment",              notes: "Return of overpayment",             created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
  { ref: 5, type: "Benefits Beneficiary Form",notes: "Benefits Beneficiary Form",         created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
  { ref: 6, type: "Death Cert Client",        notes: "Annuitant Death Certificate",       created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
  { ref: 7, type: "Marriage Certificate",     notes: "Marriage Certificate",              created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
  { ref: 4, type: "Beneficiary (DOB)",        notes: "Beneficiary date of birth",         created: "20/11/2023", by: "SYSANN", due: "20/12/2023", completed: "", byCompleted: "" },
];

const AUDIT_621: string[] = [];

const PLAN_76_DIARY: DiaryRow[] = [
  { ref: 2, type: "ICD Codes", notes: "Chase Underwriters for ICD Codes",         created: "13/05/2009", by: "CLMJXG", due: "13/05/2009", completed: "10/09/2009", byCompleted: "CLMJXG" },
  { ref: 3, type: "Misc",      notes: "Obtain death certificate",                  created: "14/05/2009", by: "CLMJXG", due: "14/06/2009", completed: "18/06/2009", byCompleted: "CLMJXG" },
  { ref: 4, type: "Misc",      notes: "Over payment for return",                   created: "18/05/2009", by: "CLMJXG", due: "18/06/2009", completed: "18/06/2009", byCompleted: "CLMJXG" },
  { ref: 1, type: "App Form",  notes: "Care Provider Contract signed by care home",created: "21/01/2008", by: "LOPKXB", due: "04/02/2008", completed: "25/01/2008", byCompleted: "LOPHK" },
];

const PLAN_76z_DIARY: DiaryRow[] = [
  { ref: 3, type: "Prov Overpay", notes: "Chase Care Provider for Overpayment",                        created: "27/03/2015", by: "LOPAL",  due: "27/04/2015", completed: "27/04/2015", byCompleted: "CLMRK"  },
  { ref: 4, type: "Misc",         notes: "death cert",                                                  created: "27/03/2015", by: "LOPAL",  due: "27/06/2015", completed: "31/03/2015", byCompleted: "LOPJW"  },
  { ref: 2, type: "Misc",         notes: "Is var 8 ok?",                                                created: "07/07/2008", by: "LOPCXW", due: "08/07/2008", completed: "08/07/2008", byCompleted: "LOPKXB" },
  { ref: 1, type: "Misc",         notes: "EPOA Doc - certified by IFA (already certified by solicitor)", created: "02/07/2008", by: "LOPKXB", due: "16/07/2008", completed: "02/07/2008", byCompleted: "LOPJT1" },
];

const AUDIT_76z = Array.from({ length: 10 }, () => "Test Note");

const AUDIT_76 = Array.from({ length: 10 }, () => "Test Note");

const PLAN_62a_DIARY: DiaryRow[] = [
  { ref: 9, type: "Fund Correspondence", notes: "Equitable Life- PPP0097463",                    created: "15/12/2010", by: "SYSANN", due: "02/02/2011", completed: "01/02/2011", byCompleted: "LOPRM" },
  { ref: 8, type: "Funds",               notes: "Equitable Life- PPP0097463",                    created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "01/02/2011", byCompleted: "LOPRM" },
  { ref: 7, type: "LTA Form",            notes: "LTA Form missing, incomplete or invalid",        created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "15/12/2010", byCompleted: "LOPRM" },
  { ref: 6, type: "Death Ben Nom Form",  notes: "DBNF missing, incomplete or invalid",            created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "15/12/2010", byCompleted: "LOPRM" },
  { ref: 5, type: "LSQ Dec Client",      notes: "Annuitant LSQ Declaration not signed",           created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "15/12/2010", byCompleted: "LOPRM" },
  { ref: 4, type: "LSQ Client",          notes: "Annuitant LSQ Incomplete/Invalid",               created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "15/12/2010", byCompleted: "LOPRM" },
  { ref: 3, type: "App Form (E/F)",      notes: "Client declaration not signed",                  created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "15/12/2010", byCompleted: "LOPRM" },
  { ref: 2, type: "EOA Client",          notes: "Annuitant EOA missing, incomplete or invalid",   created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "15/12/2010", byCompleted: "LOPRM" },
  { ref: 1, type: "App Form (B)",        notes: "Client bank account details missing/incomplete", created: "15/12/2010", by: "SYSANN", due: "22/12/2010", completed: "15/12/2010", byCompleted: "LOPRM" },
];

const AUDIT_62a = Array.from({ length: 10 }, () => "Test Note");

const PLAN_611_DIARY: DiaryRow[] = [
  { ref: 5, type: "Misc",     notes: "Policy Owner",                              created: "31/01/2008", by: "LOPKXB", due: "14/02/2008", completed: "", byCompleted: "" },
  { ref: 4, type: "Misc",     notes: "LTA %",                                     created: "31/01/2008", by: "LOPKXB", due: "14/02/2008", completed: "", byCompleted: "" },
  { ref: 3, type: "App Form", notes: "Dec D4.2 signed by NU/dec not signed",      created: "31/01/2008", by: "LOPKXB", due: "14/02/2008", completed: "", byCompleted: "" },
  { ref: 2, type: "Cheques",  notes: "CHQ Correspondence - NU",                   created: "31/01/2008", by: "LOPKXB", due: "14/02/2008", completed: "", byCompleted: "" },
  { ref: 1, type: "Cheques",  notes: "Chase for application cheques of Norwich Union", created: "31/01/2008", by: "LOPKXB", due: "20/03/2008", completed: "", byCompleted: "" },
];

const AUDIT_611 = Array.from({ length: 4 }, () => "Test Note");
const AUDIT_52  = ["Test Note"];

const PLAN_61a_DIARY: DiaryRow[] = [
  { ref: 9, type: "Misc",                    notes: "Guaranteed period ends in one month",  created: "22/12/2011", by: "LOPNB",  due: "19/07/2018", completed: "",           byCompleted: "" },
  { ref: 3, type: "Beneficiary (Bank Dets)", notes: "Beneficiary bank account details",     created: "22/12/2011", by: "SYSANN", due: "20/02/2012", completed: "27/01/2012", byCompleted: "LOPNB" },
  { ref: 5, type: "Benefits Beneficiary Form", notes: "Benefits Beneficiary Form",          created: "22/12/2011", by: "SYSANN", due: "21/01/2012", completed: "10/01/2012", byCompleted: "LOPNB" },
  { ref: 6, type: "Death Cert Client",       notes: "Annuitant Death Certificate",          created: "22/12/2011", by: "SYSANN", due: "21/01/2012", completed: "05/01/2012", byCompleted: "LOPNB" },
  { ref: 4, type: "Beneficiary (DOB)",       notes: "Beneficiary date of birth",            created: "22/12/2011", by: "SYSANN", due: "21/01/2012", completed: "22/12/2011", byCompleted: "LOPNB" },
  { ref: 7, type: "Marriage Certificate",    notes: "Marriage Certificate",                 created: "22/12/2011", by: "SYSANN", due: "21/01/2012", completed: "22/12/2011", byCompleted: "LOPNB" },
  { ref: 8, type: "Overpayment",             notes: "Return of overpayment",                created: "22/12/2011", by: "SYSANN", due: "21/01/2012", completed: "22/12/2011", byCompleted: "LOPNB" },
  { ref: 2, type: "Beneficiary (NINO)",       notes: "Beneficiary NI Number",              created: "22/12/2011", by: "SYSANN", due: "21/01/2012", completed: "22/12/2011", byCompleted: "LOPNB" },
  { ref: 1, type: "Beneficiary (Name & Add)", notes: "Beneficiary name & address",         created: "22/12/2011", by: "SYSANN", due: "21/01/2012", completed: "22/12/2011", byCompleted: "LOPNB" },
];

const AUDIT_61a = Array.from({ length: 8 }, () => "Test Note");

const DATA_CHANGES_61a: { changeDate: string; description: string; userId: string }[] = [
  { changeDate: "27/01/2012 10:00:51", description: "Field Tax Details-Suspended was changed from Y to N.",                                     userId: "LOPNB" },
  { changeDate: "27/01/2012 10:00:43", description: "Field Annuities-Gross Balance was changed from 451.33 to 394.91.",                         userId: "LOPNB" },
  { changeDate: "27/01/2012 10:00:43", description: "Field Installments-Cumulative was changed from 0 to 112.82.",                              userId: "LOPNB" },
  { changeDate: "27/01/2012 10:00:43", description: "Field Installments-Number was changed from 0 to 1.",                                       userId: "LOPNB" },
  { changeDate: "27/01/2012 10:00:43", description: "Field Tax Details-Cumulative Free Pay was changed from 0 to 623.25.",                      userId: "LOPNB" },
  { changeDate: "27/01/2012 10:00:43", description: "Field Tax Details-Tax Liability was changed from 0 to -11.2.",                             userId: "LOPNB" },
  { changeDate: "27/01/2012 10:00:43", description: "Field Tax Details-Taxable Pay was changed from 0 to -566.84.",                             userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Capital Element for Ref line 2 was inserted with value: 0.",                 userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Gross for Ref line 2 was inserted with value: 56.41.",                       userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Net for Ref line 2 was inserted with value: 56.41.",                         userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Pay Date for Ref line 2 was inserted with value: 27/01/2012.",               userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Pay Method for Ref line 2 was inserted with value: B.",                      userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Post Adj for Ref line 2 was inserted with value: 0.",                        userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Pre Adj for Ref line 2 was inserted with value: 0.",                         userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Ref for Ref line 2 was inserted with value: 2.",                             userId: "LOPNB" },
  { changeDate: "27/01/2012 09:58:11", description: "Field Payment-Tax for Ref line 2 was inserted with value: 0.",                             userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Cum Free Pay for Ref line 2 was inserted with value: 623.25.",                  userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Cum Instalments for Ref line 2 was inserted with value: 112.82.",               userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Gross for Ref line 2 was inserted with value: 56.41.",                          userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Installment # for Ref line 2 was inserted with value: 1.",                      userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Pay Date for Ref line 2 was inserted with value: 27/01/2012.",                  userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Paye Code for Ref line 2 was inserted with value: 747L*.",                      userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Ref for Ref line 2 was inserted with value: 2.",                                userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Tax Deduction for Ref line 2 was inserted with value: 0.",                      userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Tax Liability for Ref line 2 was inserted with value: -11.2.",                  userId: "LOPNB" },
  { changeDate: "27/01/2012 09:57:35", description: "Field PAYE-Taxable Pay for Ref line 2 was inserted with value: -566.84.",                  userId: "LOPNB" },
  { changeDate: "27/01/2012 09:55:56", description: "Field PAYE-Cum Instalments for Ref line 1 was changed from 507.77 to 56.41.",              userId: "LOPNB" },
  { changeDate: "27/01/2012 09:55:56", description: "Field PAYE-Tax Liability for Ref line 1 was changed from -101.4 to -11.2.",                userId: "LOPNB" },
  { changeDate: "27/01/2012 09:55:56", description: "Field PAYE-Taxable Pay for Ref line 1 was changed from 507.77 to 56.41.",                  userId: "LOPNB" },
  { changeDate: "27/01/2012 09:55:35", description: "Field PAYE-Ref for Ref line 1 was changed from 40 to 1.",                                  userId: "LOPNB" },
  { changeDate: "27/01/2012 09:55:33", description: "Field Payment-Ref for Ref line 1 was changed from 40 to 1.",                               userId: "LOPNB" },
];

const DATA_CHANGES_621: { changeDate: string; description: string; userId: string }[] = [
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Cum Free Pay for Ref line 3 was inserted with value: 2096.52.",   userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Cum Instalments for Ref line 3 was inserted with value: 200.",    userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Gross for Ref line 3 was inserted with value: 200.",              userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Installment # for Ref line 3 was inserted with value: 2.",        userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Pay Date for Ref line 3 was inserted with value: 03/06/2026.",    userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Paye Code for Ref line 3 was inserted with value: 1257L.",        userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Ref for Ref line 3 was inserted with value: 3.",                  userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Tax Deduction for Ref line 3 was inserted with value: 0.",        userId: "UAT5" },
  { changeDate: "03/06/2026 07:36:30", description: "Field PAYE-Tax Liability for Ref line 3 was inserted with value: 0.",        userId: "UAT5" },
];

const DATA_CHANGES_83: { changeDate: string; description: string; userId: string }[] = [
  { changeDate: "08/09/2017 11:29:16", description: "Field Installments-Cumulative was changed from 4212 to 3510.",                          userId: "LOPVB" },
  { changeDate: "08/09/2017 11:29:16", description: "Field PAYE-Cum Free Pay for Ref line 28 was inserted with value: 4795.45.",             userId: "LOPVB" },
  { changeDate: "08/09/2017 11:29:16", description: "Field PAYE-Cum Instalments for Ref line 28 was inserted with value: 3510.",             userId: "LOPVB" },
  { changeDate: "08/09/2017 11:29:16", description: "Field PAYE-Gross for Ref line 28 was inserted with value: -702.",                      userId: "LOPVB" },
  { changeDate: "08/09/2017 11:29:16", description: "Field PAYE-Installment # for Ref line 28 was inserted with value: 3.",                  userId: "LOPVB" },
  { changeDate: "08/09/2017 11:29:16", description: "Field PAYE-Pay Date for Ref line 28 was inserted with value: 08/09/2017.",              userId: "LOPVB" },
  { changeDate: "08/09/2017 11:29:16", description: "Field PAYE-Paye Code for Ref line 28 was inserted with value: 1150L.",                  userId: "LOPVB" },
  { changeDate: "08/09/2017 11:29:16", description: "Field PAYE-Ref for Ref line 28 was inserted with value: 28.",                           userId: "LOPVB" },
];

const PLAN_80_DIARY: DiaryRow[] = [
  { ref: 10, type: "Quote",   notes: "is var 13 ok?",                                         created: "09/03/2010", by: "LOPHK",  due: "23/03/2010", completed: "22/09/2015", byCompleted: "CPUBW" },
  { ref: 7,  type: "Misc",    notes: "IFA email address - sbhundia@hotmail.com",               created: "18/02/2010", by: "LONLM",  due: "25/02/2010", completed: "10/03/2010", byCompleted: "LOPJT1" },
  { ref: 5,  type: "Misc",    notes: "***OPTIONS - L&G***",                                    created: "18/02/2010", by: "LONLM",  due: "25/02/2010", completed: "03/03/2010", byCompleted: "LOPVL" },
  { ref: 3,  type: "Misc",    notes: "Confirmation of transfer - Legal & General",             created: "18/02/2010", by: "LONLM",  due: "25/02/2010", completed: "03/03/2010", byCompleted: "LOPVL" },
  { ref: 1,  type: "Cheques", notes: "Chase for application cheques of Legal & General",       created: "18/02/2010", by: "LONLM",  due: "11/03/2010", completed: "03/03/2010", byCompleted: "LOPVL" },
  { ref: 6,  type: "Misc",    notes: "***OPTIONS - GUARDIAN FINANCIAL SERVICES***",            created: "18/02/2010", by: "LONLM",  due: "25/02/2010", completed: "03/03/2010", byCompleted: "LOPRXS" },
  { ref: 9,  type: "Misc",    notes: "ignore",                                                 created: "01/03/2010", by: "LOPRXS", due: "08/03/2010", completed: "03/03/2010", byCompleted: "LOPRXS" },
  { ref: 8,  type: "Cheques", notes: "ignore",                                                 created: "01/03/2010", by: "LOPRXS", due: "08/03/2010", completed: "03/03/2010", byCompleted: "LOPRXS" },
  { ref: 4,  type: "Misc",    notes: "CQR - Guardian",                                        created: "18/02/2010", by: "LONLM",  due: "08/03/2010", completed: "01/03/2010", byCompleted: "LOPRXS" },
  { ref: 2,  type: "Cheques", notes: "Chase for app chq Guardian",                            created: "18/02/2010", by: "LONLM",  due: "11/03/2010", completed: "01/03/2010", byCompleted: "LOPRXS" },
];

const AUDIT_80 = Array.from({ length: 7 }, () => "Test Note");

const DATA_CHANGES_80: { changeDate: string; description: string; userId: string }[] = [
  { changeDate: "21/02/2013 11:43:04", description: "Field Installments-Remaining was changed from 1 to .",          userId: "CPUBW" },
  { changeDate: "11/02/2013 11:36:11", description: "Field Next Payment Due was changed from 26/02/2013 to .",       userId: "CPUBW" },
];

const DATA_CHANGES_84: { changeDate: string; description: string; userId: string }[] = [
  { changeDate: "24/04/2018 08:48:47", description: "Field Annuities-Gross Balance was changed from 1294 to 1186.17.",                userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Installments-Remaining was changed from 12 to 11.",                       userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Next Payment Due was changed from 30/04/2018 to 31/05/2018.",             userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Payment-Capital Element for Ref line 97 was inserted with value: 0.",     userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Payment-Gross for Ref line 97 was inserted with value: 107.83.",          userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Payment-Net for Ref line 97 was inserted with value: 107.83.",            userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Payment-Pay Date for Ref line 97 was inserted with value: 30/04/2018.",   userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Payment-Pay Method for Ref line 97 was inserted with value: B.",          userId: "LOPJSH" },
  { changeDate: "24/04/2018 08:48:47", description: "Field Payment-Post Adj for Ref line 97 was inserted with value: 0.",            userId: "LOPJSH" },
];

const AUDIT = [
  "Annuitant Details (Nat ins no) updated from ' - - - ' to 'WE-26-35-52-' by LV67647 on 13/03/2025 at 12:21:04",
  "Annuitant Details (Gender) updated from 'Female' to 'Male' by LV67647 on 13/03/2025 at 12:21:04",
  "System Advises: N.I sweep by LV67647 on 13/03/2025 at 12:21:23",
  "System Advises: N.I duplicates exist (1st life) by LV67647 on 13/03/2025 at 12:21:23",
  "IFA Acceptance Pack is generated and emailed to alice oldacre@lv.com by LV67647 on 13/03/2025 at 12:21:53",
  "IRF Letter is printed by LV67561 on 14/03/2025 at 14:11:59",
  "Annuitant Details (Nat ins no) updated from 'WE-26-35-52-' to 'WE-26-35-52-B' by LV67647 on 24/03/2025 at 11:49:36",
  "System Advises: Partial cheque refund by LV62209 on 02/05/2025 at 11:15:13",
  "System Advises: Cheque details amended by LV62209 on 02/05/2025 at 11:15:25",
  "System Advises: Partial cheque refund by LV62209 on 02/05/2025 at 11:17:29",
  "System Advises: Cheque details amended by LV62209 on 02/05/2025 at 11:17:50",
  "BANK_SORT_CODE changed from to 30-15-52 by LV67180 on 28/05/2025 at 08:49:07",
  "BANK_ACCOUNT_NO changed from to 01841281 by LV67180 on 28/05/2025 at 08:49:07",
];

const DIARY_COLS = ["Ref", "Type", "Notes", "Created", "By", "Due", "Completed", "By"];

export function DiaryAuditTab() {
  const { planCode } = usePlanCode();
  const isPlan0   = planCode === "0";
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
  const [trail, setTrail] = useState<"notes" | "data">("notes");
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [needsOpen, setNeedsOpen] = useState(false);
  const [cedingOpen, setCedingOpen] = useState(false);
  const [diary, setDiary] = useState<DiaryRow[]>(
    isPlan87 ? PLAN_87_DIARY : isPlan84 ? PLAN_84_DIARY : isPlan90 ? PLAN_90_DIARY : isPlan51 ? PLAN_51_DIARY : isPlan82 ? PLAN_82_DIARY : isPlan80 ? PLAN_80_DIARY : isPlan83 ? PLAN_83_DIARY : isPlan621 ? PLAN_621_DIARY : isPlan76 ? PLAN_76_DIARY : isPlan76z ? PLAN_76z_DIARY : isPlan62a ? PLAN_62a_DIARY : isPlan611 ? PLAN_611_DIARY : isPlan52 ? [] : isPlan61a ? PLAN_61a_DIARY : INITIAL_DIARY,
  );
  const [selectedRef, setSelectedRef] = useState<number | null>(null);
  const [editConfirmOpen, setEditConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectFirstOpen, setSelectFirstOpen] = useState(false);
  const [selectFirstMsg, setSelectFirstMsg] = useState(
    "Please select a diary note to edit!",
  );
  const [completeConfirmOpen, setCompleteConfirmOpen] = useState(false);
  const [simPoliciesOpen, setSimPoliciesOpen] = useState(false);
  const [simUpdate, setSimUpdate] = useState(false);

  const selectedRow = diary.find((d) => d.ref === selectedRef) ?? null;

  const addDiary = (entry: DiaryEntryInput) => {
    const nextRef = diary.reduce((max, r) => Math.max(max, r.ref), 0) + 1;
    setDiary((prev) => [
      {
        ref: nextRef,
        type: entry.type,
        notes: entry.notes,
        created: fmt(new Date()),
        by: CURRENT_USER,
        due: fmt(entry.due),
        completed: "",
        byCompleted: "",
      },
      ...prev,
    ]);
  };

  const updateDiary = (entry: DiaryEntryInput) => {
    if (selectedRef === null) return;
    setDiary((prev) =>
      prev.map((r) =>
        r.ref === selectedRef
          ? { ...r, type: entry.type, notes: entry.notes, due: fmt(entry.due) }
          : r,
      ),
    );
  };

  const handleEditClick = () => {
    if (selectedRef === null) {
      setSelectFirstMsg("Please select a diary note to edit!");
      setSelectFirstOpen(true);
      return;
    }
    setEditConfirmOpen(true);
  };

  const handleCompleteClick = () => {
    if (selectedRef === null) {
      setSelectFirstMsg("Please select a diary note to complete!");
      setSelectFirstOpen(true);
      return;
    }
    if (selectedRow && selectedRow.completed) {
      setSelectFirstMsg("This diary note is already completed!");
      setSelectFirstOpen(true);
      return;
    }
    setCompleteConfirmOpen(true);
  };

  const completeSelected = () => {
    if (selectedRef === null) return;
    const today = fmt(new Date());
    setDiary((prev) =>
      prev.map((r) =>
        r.ref === selectedRef
          ? { ...r, completed: today, byCompleted: CURRENT_USER }
          : r,
      ),
    );
    setSimPoliciesOpen(false);
    setSimUpdate(false);
  };

  return (
    <div className="space-y-4">
      <Section title="Diary Details">
        <div className="overflow-auto max-h-[320px]">
          <table className="lve-grid">
            <thead>
              <tr>
                {DIARY_COLS.map((c) => (
                  <th key={c} className="whitespace-nowrap !px-4">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(isPlan0 ? [] : diary).map((d) => {
                const isSel = selectedRef === d.ref;
                const tdStyle = isSel
                  ? { backgroundColor: "#05579B", color: "#ffffff" }
                  : undefined;
                return (
                  <tr
                    key={d.ref}
                    onClick={() => setSelectedRef(d.ref)}
                    className="cursor-pointer"
                  >
                    <td className="!px-4 whitespace-nowrap" style={tdStyle}>{d.ref}</td>
                    <td className="!px-4 whitespace-nowrap" style={tdStyle}>{d.type}</td>
                    <td className="!px-4" style={tdStyle}>{d.notes}</td>
                    <td className="!px-4 whitespace-nowrap" style={tdStyle}>{d.created}</td>
                    <td className="!px-4 whitespace-nowrap" style={tdStyle}>{d.by}</td>
                    <td className="!px-4 whitespace-nowrap" style={tdStyle}>{d.due}</td>
                    <td className="!px-4 whitespace-nowrap" style={tdStyle}>{d.completed}</td>
                    <td className="!px-4 whitespace-nowrap" style={tdStyle}>{d.byCompleted}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm"
            onClick={() => setDiaryOpen(true)}
            disabled={isPlan51}
          >
            <MdNoteAdd size={16} /> New Diary Note
          </button>
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm"
            onClick={handleEditClick}
            disabled={isPlan51}
          >
            <MdEdit size={16} /> Edit Diary Note
          </button>
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm"
            onClick={handleCompleteClick}
            disabled={isPlan51}
          >
            <MdCheckCircleOutline size={16} /> Complete diary note
          </button>
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm"
            onClick={() => setCedingOpen(true)}
            disabled={isPlan51}
          >
            <MdManageSearch size={16} /> Ceding Scheme Details
          </button>
          <button
            type="button"
            className="lve-btn lve-btn-secondary lve-btn-sm"
            onClick={() => setNeedsOpen(true)}
          >
            <MdGroups size={16} /> Customer Needs
          </button>
        </div>
      </Section>

      <Section title="Audit Trail">
        <div className="flex items-center gap-1 mb-3">
          <button
            type="button"
            className={`lve-tab ${trail === "notes" ? "active" : ""}`}
            onClick={() => setTrail("notes")}
          >
            Notes
          </button>
          <button
            type="button"
            className={`lve-tab ${trail === "data" ? "active" : ""}`}
            onClick={() => setTrail("data")}
          >
            Data Changes
          </button>
        </div>

        {trail === "notes" ? (
          <div>
            <p className="font-['Mulish'] text-[12px] italic text-[#777] mb-2">
              Audit trail — you cannot amend or delete these notes!
            </p>
            <div className="overflow-auto max-h-[320px]">
              <table className="lve-grid">
                <thead>
                  <tr>
                    <th className="!px-4">Note</th>
                    <th className="whitespace-nowrap !px-4 w-[110px]">By</th>
                    <th className="whitespace-nowrap !px-4 w-[120px]">Date</th>
                    <th className="whitespace-nowrap !px-4 w-[110px]">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {(isPlan0 || isPlan87 ? [] : isPlan84 ? AUDIT_84 : isPlan90 ? AUDIT_90 : isPlan51 ? AUDIT_51 : isPlan82 ? AUDIT_82 : isPlan80 ? AUDIT_80 : isPlan83 ? AUDIT_83 : isPlan621 ? AUDIT_621 : isPlan76 ? AUDIT_76 : isPlan76z ? AUDIT_76z : isPlan62a ? AUDIT_62a : isPlan611 ? AUDIT_611 : isPlan52 ? AUDIT_52 : isPlan61a ? AUDIT_61a : AUDIT).map((line, i) => {
                    const m = line.match(
                      /^(.*?)\s+by\s+(\S+)\s+on\s+(\S+)\s+at\s+(\S+)\s*$/,
                    );
                    const desc = m ? m[1] : line;
                    const by = m ? m[2] : "";
                    const date = m ? m[3] : "";
                    const time = m ? m[4] : "";
                    return (
                      <tr key={i}>
                        <td className="!px-4">{desc}</td>
                        <td className="!px-4 whitespace-nowrap">{by}</td>
                        <td className="!px-4 whitespace-nowrap">{date}</td>
                        <td className="!px-4 whitespace-nowrap">{time}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="overflow-auto max-h-[320px]">
            <table className="lve-grid">
              <thead>
                <tr>
                  <th className="whitespace-nowrap !px-4 w-[140px]">
                    Change Date
                  </th>
                  <th className="!px-4">Description</th>
                  <th className="whitespace-nowrap !px-4 w-[110px]">User ID</th>
                </tr>
              </thead>
              <tbody>
                {isPlan84
                  ? DATA_CHANGES_84.map((r, i) => (
                      <tr key={i}>
                        <td className="!px-4 whitespace-nowrap">{r.changeDate}</td>
                        <td className="!px-4">{r.description}</td>
                        <td className="!px-4 whitespace-nowrap">{r.userId}</td>
                      </tr>
                    ))
                  : isPlan51
                  ? DATA_CHANGES_51.map((r, i) => (
                      <tr key={i}>
                        <td className="!px-4 whitespace-nowrap">{r.changeDate}</td>
                        <td className="!px-4">{r.description}</td>
                        <td className="!px-4 whitespace-nowrap">{r.userId}</td>
                      </tr>
                    ))
                  : isPlan82
                  ? []
                  : isPlan80
                  ? DATA_CHANGES_80.map((r, i) => (
                      <tr key={i}>
                        <td className="!px-4 whitespace-nowrap">{r.changeDate}</td>
                        <td className="!px-4">{r.description}</td>
                        <td className="!px-4 whitespace-nowrap">{r.userId}</td>
                      </tr>
                    ))
                  : isPlan83
                  ? DATA_CHANGES_83.map((r, i) => (
                      <tr key={i}>
                        <td className="!px-4 whitespace-nowrap">{r.changeDate}</td>
                        <td className="!px-4">{r.description}</td>
                        <td className="!px-4 whitespace-nowrap">{r.userId}</td>
                      </tr>
                    ))
                  : isPlan621
                  ? DATA_CHANGES_621.map((r, i) => (
                      <tr key={i}>
                        <td className="!px-4 whitespace-nowrap">{r.changeDate}</td>
                        <td className="!px-4">{r.description}</td>
                        <td className="!px-4 whitespace-nowrap">{r.userId}</td>
                      </tr>
                    ))
                  : isPlan76
                  ? []
                  : isPlan76z
                  ? []
                  : isPlan62a
                  ? []
                  : isPlan611
                  ? []
                  : isPlan52
                  ? []
                  : isPlan61a
                  ? DATA_CHANGES_61a.map((r, i) => (
                      <tr key={i}>
                        <td className="!px-4 whitespace-nowrap">{r.changeDate}</td>
                        <td className="!px-4">{r.description}</td>
                        <td className="!px-4 whitespace-nowrap">{r.userId}</td>
                      </tr>
                    ))
                  : (isPlan0 || isPlan87 || isPlan90 ? [] : AUDIT).map((line, i) => {
                      const m = line.match(
                        /^(.*?)\s+by\s+(\S+)\s+on\s+(\S+)\s+at\s+(\S+)\s*$/,
                      );
                      const desc = m ? m[1] : line;
                      const userId = m ? m[2] : "";
                      const changeDate = m ? `${m[3]} ${m[4]}` : "";
                      return (
                        <tr key={i}>
                          <td className="!px-4 whitespace-nowrap">{changeDate}</td>
                          <td className="!px-4">{desc}</td>
                          <td className="!px-4 whitespace-nowrap">{userId}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <MiscDiaryModal
        open={diaryOpen}
        onClose={() => setDiaryOpen(false)}
        onSubmit={addDiary}
      />

      {editOpen && selectedRow && (
        <MiscDiaryModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSubmit={updateDiary}
          title="Mini-Diary"
          allowPastDue
          initial={{
            type: selectedRow.type,
            notes: selectedRow.notes,
            due: selectedRow.due,
          }}
        />
      )}

      <CustomerNeedsModal
        open={needsOpen}
        onClose={() => setNeedsOpen(false)}
      />

      <CedingSchemeModal
        open={cedingOpen}
        onClose={() => setCedingOpen(false)}
        planCode={planCode}
      />

      {editConfirmOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="w-[360px] bg-white rounded-[8px] shadow-xl overflow-hidden border border-[#bcd]">
            <header className="bg-[#00263e] text-white font-['Livvic'] text-[13px] font-semibold px-3 py-2">
              Confirm
            </header>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <MdHelpOutline size={32} className="text-[#006cf4] shrink-0" />
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                  Edit this diary note?
                </p>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="lve-btn"
                  onClick={() => {
                    setEditConfirmOpen(false);
                    setEditOpen(true);
                  }}
                >
                  <MdCheck size={16} />
                  <span><u>Y</u>es</span>
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => setEditConfirmOpen(false)}
                >
                  <MdClose size={16} />
                  <span><u>N</u>o</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {completeConfirmOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="w-[380px] bg-white rounded-[8px] shadow-xl overflow-hidden border border-[#bcd]">
            <header className="bg-[#00263e] text-white font-['Livvic'] text-[13px] font-semibold px-3 py-2">
              Confirm
            </header>
            <div className="p-5">
              <div className="flex items-start gap-3">
                <MdHelpOutline size={32} className="text-[#006cf4] shrink-0" />
                <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] pt-1">
                  Complete this diary note?
                </p>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="lve-btn"
                  onClick={() => {
                    setCompleteConfirmOpen(false);
                    setSimUpdate(false);
                    setSimPoliciesOpen(true);
                  }}
                >
                  <MdCheck size={16} />
                  <span><u>Y</u>es</span>
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => setCompleteConfirmOpen(false)}
                >
                  <MdClose size={16} />
                  <span><u>N</u>o</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {simPoliciesOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="w-[520px] bg-white rounded-[8px] shadow-xl overflow-hidden border border-[#bcd]">
            <header className="bg-[#00263e] text-white font-['Livvic'] text-[13px] font-semibold px-3 py-2">
              Simultaneous Policies
            </header>
            <div className="p-5">
              <p className="font-['Livvic'] text-[13px] font-semibold text-[#00263e] mb-3">
                Select simultaneous policies to update
              </p>
              <div className="border border-[#bcd] rounded-[8px] overflow-hidden">
                <table className="w-full border-collapse font-['Mulish'] text-[12px]">
                  <thead>
                    <tr className="bg-[#d4d4d4] text-[#3d3d3d]">
                      <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[110px]">
                        Policy No
                      </th>
                      <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[80px]">
                        Status
                      </th>
                      <th className="text-left px-3 py-1.5 border-r border-[#a0a0a0] w-[120px]">
                        Product Type
                      </th>
                      <th className="text-left px-3 py-1.5 w-[90px]">Update?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white text-[#3d3d3d] border-b border-[#e5e5e5]">
                      <td className="px-3 py-1.5">233424</td>
                      <td className="px-3 py-1.5">P</td>
                      <td className="px-3 py-1.5">FTA</td>
                      <td className="px-3 py-1.5">
                        <input
                          type="checkbox"
                          checked={simUpdate}
                          onChange={(e) => setSimUpdate(e.target.checked)}
                          className="w-[14px] h-[14px] accent-[#006cf4]"
                        />
                      </td>
                    </tr>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <tr
                        key={i}
                        className="bg-[#f4f4f4] border-b border-[#e5e5e5] last:border-b-0"
                      >
                        <td className="px-3 py-1.5">&nbsp;</td>
                        <td className="px-3 py-1.5">&nbsp;</td>
                        <td className="px-3 py-1.5">&nbsp;</td>
                        <td className="px-3 py-1.5">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <button type="button" className="lve-btn" onClick={completeSelected}>
                  <MdCheck size={16} />
                  OK
                </button>
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => {
                    setSimPoliciesOpen(false);
                    setSimUpdate(false);
                  }}
                >
                  <MdClose size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectFirstOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="w-[380px] bg-white rounded-[8px] shadow-xl overflow-hidden border border-[#bcd]">
            <header className="bg-[#00263e] text-white font-['Livvic'] text-[13px] font-semibold px-3 py-2">
              Client Annuity Administration System
            </header>
            <div className="p-5">
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] text-center">
                {selectFirstMsg}
              </p>
              <div className="mt-5 flex items-center justify-center">
                <button
                  type="button"
                  className="lve-btn"
                  onClick={() => setSelectFirstOpen(false)}
                >
                  <MdCheck size={16} />
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
