import { useState } from "react";
import { MdClose, MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { usePlanCode, PLAN_CODE_VERSIONS, type PlanCodeVersion } from "../context/PlanCodeContext";

type PolicyRow = {
  policyRef: string;
  planType: string;
  planCode: string;
  surname: string;
  natInsNo: string;
  originalQuote: string;
  status: string;
  phPostCode: string;
  ifaRef: string;
  dob1: string;
  policyNo: string;
  cocode: string;
  premium: string;
  fullName1: string;
  fullName2: string;
};

const POLICIES: PolicyRow[] = [
  { policyRef: "100001",   planType: "master", planCode: "0",   surname: "Master",    natInsNo: "",              originalQuote: "965685", status: "N", phPostCode: "",         ifaRef: "HARGR-00",  dob1: "18/04/1948", policyNo: "100001",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Pebaaaab",   fullName2: "" },
  { policyRef: "100002",   planType: "FTA", planCode: "87",  surname: "TESTCBAAAAAC",   natInsNo: "CH-26-10-47-A", originalQuote: "929591", status: "D", phPostCode: "",         ifaRef: "THEM&-005", dob1: "26/10/1947", policyNo: "100002",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Cbaaaaac",  fullName2: "" },
  { policyRef: "100003",   planType: "PPA", planCode: "621", surname: "TESTSEBAAAAD",   natInsNo: "SB-25-07-53-A", originalQuote: "930942", status: "D", phPostCode: "DA99 9AB", ifaRef: "",          dob1: "25/07/1953", policyNo: "100003",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Sebaaaad",   fullName2: "" },
  { policyRef: "100004",   planType: "PPA", planCode: "621", surname: "TESTFRBAAAAE",   natInsNo: "EX-07-01-43-A", originalQuote: "919598", status: "D", phPostCode: "",         ifaRef: "FORUM-00",  dob1: "07/01/1943", policyNo: "100004",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Frbaaaae",   fullName2: "" },
  { policyRef: "100004.1", planType: "PPA", planCode: "621", surname: "TESTFRBAAAAE.B", natInsNo: "EX-07-01-43-A", originalQuote: "919598", status: "D", phPostCode: "QU99 9AB", ifaRef: "",          dob1: "07/01/1943", policyNo: "100004.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Frbaaaae.B", fullName2: "" },
  { policyRef: "100005",   planType: "CPA", planCode: "519", surname: "TESTBIBAAAAF",   natInsNo: "BB-13-08-34-A", originalQuote: "916856", status: "D", phPostCode: "",         ifaRef: "TOWER-02",  dob1: "13/08/1934", policyNo: "100005",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Bibaaaaf",   fullName2: "" },
  { policyRef: "100006",   planType: "CPA", planCode: "51",  surname: "TESTBEBAAAAG",   natInsNo: "BB-28-10-49-A", originalQuote: "925272", status: "L", phPostCode: "QU99 9AB", ifaRef: "ACPFI-001", dob1: "28/10/1949", policyNo: "100006",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Bebaaaag",   fullName2: "" },
  { policyRef: "100007",   planType: "CPA", planCode: "51",  surname: "TESTLNBAAAAH",   natInsNo: "LT-12-01-48-A", originalQuote: "925463", status: "L", phPostCode: "CO99 9AB", ifaRef: "OAKFI-006", dob1: "12/01/1948", policyNo: "100007",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Lnbaaaah",   fullName2: "" },
  { policyRef: "100008",   planType: "CPA", planCode: "51",  surname: "TESTCSBAAAAI",   natInsNo: "CH-03-10-42-A", originalQuote: "922618", status: "D", phPostCode: "RE99 9AB", ifaRef: "",          dob1: "03/10/1942", policyNo: "100008",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Csbaaaai",   fullName2: "" },
  { policyRef: "100008.1", planType: "CPA", planCode: "51",  surname: "TESTCSBAAAAI.B", natInsNo: "CH-03-10-42-A", originalQuote: "922618", status: "D", phPostCode: "",         ifaRef: "WILLI-027", dob1: "03/10/1942", policyNo: "100008.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Csbaaaai.B", fullName2: "" },
  { policyRef: "100009",   planType: "CPA", planCode: "51",  surname: "TESTBSBAAAAJ",   natInsNo: "BB-15-12-47-A", originalQuote: "922132", status: "D", phPostCode: "LE99 9AB", ifaRef: "AAMIN-001", dob1: "15/12/1947", policyNo: "100009",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Bsbaaaaj",   fullName2: "" },
  { policyRef: "100010",   planType: "CPA", planCode: "61a", surname: "TESTHSBAAABA",   natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "L", phPostCode: "EX99 9AB", ifaRef: "",          dob1: "20/01/1943", policyNo: "100010",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaaba",   fullName2: "" },
  { policyRef: "100010.1", planType: "CPA", planCode: "61a", surname: "TESTHSBAAABA.B", natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "L", phPostCode: "",         ifaRef: "CRTOO-001", dob1: "20/01/1943", policyNo: "100010.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaaba.B", fullName2: "" },
  { policyRef: "100011",   planType: "PPA", planCode: "62a", surname: "TESTHSBAAABB",   natInsNo: "YT-26-09-35-A", originalQuote: "926191", status: "D", phPostCode: "",         ifaRef: "HENRY-001", dob1: "26/09/1935", policyNo: "100011",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabb",   fullName2: "" },
  { policyRef: "100011.1", planType: "PPA", planCode: "62a", surname: "TESTHSBAAABB.B", natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "D", phPostCode: "CO99 9AB", ifaRef: "",          dob1: "20/01/1943", policyNo: "100011.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabb.B", fullName2: "" },
  { policyRef: "100012",   planType: "CPA", planCode: "62a", surname: "TESTHSBAAABC",   natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "D", phPostCode: "",         ifaRef: "WILLI-027", dob1: "20/01/1943", policyNo: "100012",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabc",   fullName2: "" },
  { policyRef: "100012.1", planType: "CPA", planCode: "62a", surname: "TESTHSBAAABC.B", natInsNo: "HA-20-01-43-A", originalQuote: "909862", status: "D", phPostCode: "",         ifaRef: "CRTOO-001", dob1: "20/01/1943", policyNo: "100012.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hsbaaabc.B", fullName2: "" },
  { policyRef: "100013",   planType: "FTA", planCode: "84",  surname: "TESTHDBAAABD",   natInsNo: "HA-27-06-49-A", originalQuote: "917616", status: "D", phPostCode: "JA99 9AB", ifaRef: "BANKO-011", dob1: "27/06/1949", policyNo: "100013",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hdbaaabd",   fullName2: "" },
  { policyRef: "100014",   planType: "CPA", planCode: "61a", surname: "TESTCDBAAABE",   natInsNo: "CH-20-02-53-A", originalQuote: "930977", status: "L", phPostCode: "RE99 9AB", ifaRef: "JELFF-001", dob1: "20/02/1953", policyNo: "100014",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Cdbaaabe",   fullName2: "" },
  { policyRef: "233451",   planType: "FTA", planCode: "87",  surname: "UGGIU",          natInsNo: "JK-90-90-90-C", originalQuote: "20825226", status: "P", phPostCode: "OP9 0OP",  ifaRef: "OAKWO-01",  dob1: "09/09/1956", policyNo: "233451",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Uggiu",             fullName2: "" },
  { policyRef: "226317",   planType: "FTA", planCode: "87",  surname: "TESTTNCCGDBH",   natInsNo: "TE-23-03-61-A", originalQuote: "20982079", status: "L", phPostCode: "MA99 9AB", ifaRef: "RETIR-013", dob1: "23/03/1961", policyNo: "226317",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Tnccgdbh",    fullName2: "" },
  { policyRef: "226318",   planType: "FTA", planCode: "87",  surname: "TESTMSCCGDBI",   natInsNo: "MW-29-07-50-A", originalQuote: "21039413", status: "L", phPostCode: "KI99 9AB", ifaRef: "COMPA-01",  dob1: "29/07/1950", policyNo: "226318",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Msccgdbi",    fullName2: "" },
  { policyRef: "228545",   planType: "FTA", planCode: "87",  surname: "TESTCLCCIFEF",   natInsNo: "CH-08-09-54-A", originalQuote: "21255056", status: "L", phPostCode: "PE99 9AB", ifaRef: "QUOTE-01",  dob1: "08/09/1954", policyNo: "228545",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Clccifef",    fullName2: "" },
  { policyRef: "228568",   planType: "FTA", planCode: "87",  surname: "TESTHNCCIFGI",   natInsNo: "HA-02-06-55-A", originalQuote: "21365539", status: "L", phPostCode: "JA99 9AB", ifaRef: "QUOTE-01",  dob1: "02/06/1955", policyNo: "228568",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hnccifgi",    fullName2: "" },
  { policyRef: "228986",   planType: "FTA", planCode: "87",  surname: "TESTPLCCIJIG",   natInsNo: "PK-10-05-47-A", originalQuote: "21475168", status: "L", phPostCode: "IL99 9AB", ifaRef: "RETIR-013", dob1: "10/05/1947", policyNo: "228986",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Plccijig",    fullName2: "" },
  { policyRef: "228990",   planType: "FTA", planCode: "87",  surname: "TESTRNCCIJJA",   natInsNo: "RR-17-03-69-A", originalQuote: "21482989", status: "L", phPostCode: "RE99 9AB", ifaRef: "BROAD-015", dob1: "17/03/1969", policyNo: "228990",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Rnccijja",    fullName2: "" },
  { policyRef: "231604",   planType: "FTA", planCode: "87",  surname: "TESTWNCDBGAE",   natInsNo: "YA-24-12-59-A", originalQuote: "21791740", status: "L", phPostCode: "EA99 9AB", ifaRef: "RETIR-013", dob1: "24/12/1959", policyNo: "231604",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Wncdbgae",    fullName2: "" },
  { policyRef: "231606",   planType: "FTA", planCode: "87",  surname: "TESTCLCDBGAG",   natInsNo: "CH-15-05-64-A", originalQuote: "21819605", status: "L", phPostCode: "KI99 9AB", ifaRef: "PHOEN-03",  dob1: "15/05/1964", policyNo: "231606",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Clcdbgag",    fullName2: "" },
  { policyRef: "231613",   planType: "FTA", planCode: "87",  surname: "TESTNSCDBGBD",   natInsNo: "NS-30-10-64-A", originalQuote: "21834078", status: "X", phPostCode: "EX99 9AB", ifaRef: "SKERR-005", dob1: "30/10/1964", policyNo: "231613",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Nscdbgbd",    fullName2: "" },
  { policyRef: "231644",   planType: "FTA", planCode: "87",  surname: "TESTCNCDBGEE",   natInsNo: "CH-09-11-58-A", originalQuote: "21779267", status: "L", phPostCode: "ZE99 9AB", ifaRef: "AGEPA-002", dob1: "09/11/1958", policyNo: "231644",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Cncdbgee",    fullName2: "" },
  { policyRef: "231646",   planType: "FTA", planCode: "87",  surname: "TESTTRCDBGEG",   natInsNo: "TE-12-12-60-A", originalQuote: "21839818", status: "P", phPostCode: "KI99 9AB", ifaRef: "DUMMY-00",  dob1: "12/12/1960", policyNo: "231646",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Trcdbgeg",    fullName2: "" },
  { policyRef: "228709",   planType: "FTA", planCode: "87",  surname: "TESTTPCCIHAJ",   natInsNo: "TE-15-07-50-A", originalQuote: "21424815", status: "L", phPostCode: "EX99 9AB", ifaRef: "QUOTE-01",  dob1: "15/07/1950", policyNo: "228709",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Tpccihaj",    fullName2: "" },
  { policyRef: "232252",   planType: "FTA", planCode: "87",  surname: "TESTTTCDCCFC",   natInsNo: "TE-10-10-66-A", originalQuote: "21938836", status: "C", phPostCode: "KI99 9AB", ifaRef: "QUOTE-001", dob1: "10/10/1966", policyNo: "232252",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Ttcdccfc",    fullName2: "" },
  { policyRef: "232255",   planType: "FTA", planCode: "87",  surname: "TESTITCDCCFF",   natInsNo: "JA-12-12-50-A", originalQuote: "21939729", status: "C", phPostCode: "LE99 9AB", ifaRef: "DUMMY-00",  dob1: "12/12/1950", policyNo: "232255",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Itcdccff",    fullName2: "" },
  { policyRef: "232274",   planType: "FTA", planCode: "87",  surname: "TESTFRCDCCHE",   natInsNo: "EX-10-12-62-A", originalQuote: "21940287", status: "L", phPostCode: "ZE99 9AB", ifaRef: "LIFET-012", dob1: "10/12/1962", policyNo: "232274",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Frcdcche",    fullName2: "" },
  { policyRef: "232292",   planType: "FTA", planCode: "87",  surname: "TESTCYCDCCJC",   natInsNo: "CH-02-09-63-A", originalQuote: "22058063", status: "L", phPostCode: "UR99 9AB", ifaRef: "SFSIN-001", dob1: "02/09/1963", policyNo: "232292",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Cycdccjc",    fullName2: "" },
  { policyRef: "232294",   planType: "FTA", planCode: "87",  surname: "TESTBLCDCCJE",   natInsNo: "BB-23-12-65-A", originalQuote: "21914032", status: "L", phPostCode: "QU99 9AB", ifaRef: "WILLI-014", dob1: "23/12/1965", policyNo: "232294",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Blcdccje",    fullName2: "" },
  { policyRef: "229550",   planType: "FTA", planCode: "87",  surname: "TESTETCCJFFA",   natInsNo: "EA-27-10-61-A", originalQuote: "21529464", status: "L", phPostCode: "EX99 9AB", ifaRef: "COMPA-025", dob1: "27/10/1961", policyNo: "229550",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Etccjffa",    fullName2: "" },
  { policyRef: "229551",   planType: "FTA", planCode: "87",  surname: "TESTCKCCJFFB",   natInsNo: "CH-29-04-63-A", originalQuote: "21557190", status: "L", phPostCode: "JA99 9AB", ifaRef: "HARRI-035", dob1: "29/04/1963", policyNo: "229551",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Ckccjffb",    fullName2: "" },
  { policyRef: "229564",   planType: "FTA", planCode: "87",  surname: "TESTRCCCJFGE",   natInsNo: "EX-24-07-65-A", originalQuote: "21489849", status: "L", phPostCode: "QU99 9AB", ifaRef: "RETIR-013", dob1: "24/07/1965", policyNo: "229564",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Rcccjfge",    fullName2: "" },
  { policyRef: "111834",   planType: "PRP", planCode: "84",  surname: "TESTPTBBBIDE",   natInsNo: "PK-25-10-58-A", originalQuote: "2139419",  status: "L", phPostCode: "ZE99 9AB", ifaRef: "LIFET-015", dob1: "25/10/1958", policyNo: "111834",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Ptbbbide",    fullName2: "" },
  { policyRef: "113547",   planType: "PRP", planCode: "84",  surname: "TESTRGBBDFEH",   natInsNo: "RR-24-09-52-A", originalQuote: "2253189",  status: "M", phPostCode: "EX99 9AB", ifaRef: "PETER-016", dob1: "24/09/1952", policyNo: "113547",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Rgbbdfeh",    fullName2: "" },
  { policyRef: "114208",   planType: "PRP", planCode: "84",  surname: "TESTRIBBECAI",   natInsNo: "RR-07-03-50-A", originalQuote: "2240359",  status: "M", phPostCode: "EX99 9AB", ifaRef: "QUOTE-01",  dob1: "07/03/1950", policyNo: "114208",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Ribbecai",    fullName2: "" },
  { policyRef: "114680",   planType: "PRP", planCode: "84",  surname: "TESTSKBBEGIA",   natInsNo: "SB-28-06-45-A", originalQuote: "2260257",  status: "M", phPostCode: "JA99 9AB", ifaRef: "SMGFS-001", dob1: "28/06/1945", policyNo: "114680",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Skbbegia",    fullName2: "" },
  { policyRef: "114685",   planType: "PRP", planCode: "84",  surname: "TESTSKBBEGIF",   natInsNo: "SB-28-06-45-A", originalQuote: "2260294",  status: "M", phPostCode: "JA99 9AB", ifaRef: "SMGFS-001", dob1: "28/06/1945", policyNo: "114685",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Skbbegif",    fullName2: "" },
  { policyRef: "114971",   planType: "PRP", planCode: "84",  surname: "TESTBLBBEJHB",   natInsNo: "BB-15-01-49-A", originalQuote: "2338012",  status: "M", phPostCode: "ZE99 9AB", ifaRef: "",          dob1: "15/01/1949", policyNo: "114971",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Blbbejhb",    fullName2: "" },
  { policyRef: "115242",   planType: "PRP", planCode: "84",  surname: "TESTOEBBFCEC",   natInsNo: "OP-29-06-45-A", originalQuote: "2327766",  status: "M", phPostCode: "VE99 9AB", ifaRef: "J ILL-001", dob1: "29/06/1945", policyNo: "115242",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Oebbfcec",    fullName2: "" },
  { policyRef: "115439",   planType: "PRP", planCode: "84",  surname: "TESTCYBBFEDJ",   natInsNo: "CH-06-07-45-A", originalQuote: "2327637",  status: "M", phPostCode: "HI99 9AB", ifaRef: "J ILL-001", dob1: "06/07/1945", policyNo: "115439",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Cybbfedj",    fullName2: "" },
  { policyRef: "115661",   planType: "PRP", planCode: "84",  surname: "TESTMYBBFGGB",   natInsNo: "MW-04-08-45-A", originalQuote: "2396649",  status: "M", phPostCode: "CO99 9AB", ifaRef: "CHART-025", dob1: "04/08/1945", policyNo: "115661",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Mybbfggb",    fullName2: "" },
  { policyRef: "125259",   planType: "PRP", planCode: "84",  surname: "TESTHHBCFCFJ",   natInsNo: "HA-05-05-41-A", originalQuote: "3539598",  status: "M", phPostCode: "DA99 9AB", ifaRef: "GILLI-006", dob1: "05/05/1941", policyNo: "125259",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hhbcfcfj",    fullName2: "" },
  { policyRef: "125590",   planType: "PRP", planCode: "84",  surname: "TESTSSBCFFJA",   natInsNo: "SB-28-10-48-A", originalQuote: "3394037",  status: "M", phPostCode: "EX99 9AB", ifaRef: "PRACT-002", dob1: "28/10/1948", policyNo: "125590",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Ssbcffja",    fullName2: "" },
  { policyRef: "174557",   planType: "PRP", planCode: "84",  surname: "TESTDNBHEFFH",   natInsNo: "RR-20-04-56-A", originalQuote: "13171330", status: "L", phPostCode: "MA99 9AB", ifaRef: "MYPEN-002", dob1: "20/04/1956", policyNo: "174557",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Dnbheffh",    fullName2: "" },
  { policyRef: "125800",   planType: "PRP", planCode: "84",  surname: "TESTASBCFIAA",   natInsNo: "AE-15-04-56-A", originalQuote: "3627488",  status: "M", phPostCode: "JA99 9AB", ifaRef: "D&GFI-002", dob1: "15/04/1956", policyNo: "125800",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Asbcfiaa",    fullName2: "" },
  { policyRef: "164870.1", planType: "PRP", planCode: "84",  surname: "TESTSRBGEIHA.B", natInsNo: "SB-12-07-55-A", originalQuote: "10101034", status: "E", phPostCode: "MA99 9AB", ifaRef: "THEAN-010", dob1: "12/07/1955", policyNo: "164870.1", cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Srbgeiha.B",  fullName2: "" },
  { policyRef: "125177",   planType: "PRP", planCode: "84",  surname: "TESTWYBCFDHB",   natInsNo: "YA-12-05-49-A", originalQuote: "3584885",  status: "M", phPostCode: "CO99 9AB", ifaRef: "STERL-083", dob1: "12/05/1949", policyNo: "125177",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Wybcfdhb",    fullName2: "" },
  { policyRef: "125940",   planType: "PRP", planCode: "84",  surname: "TESTGTBCFJEA",   natInsNo: "GY-23-06-52-A", originalQuote: "3646835",  status: "M", phPostCode: "CO99 9AB", ifaRef: "GANDS-001", dob1: "23/06/1952", policyNo: "125940",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Gtbcfjea",    fullName2: "" },
  { policyRef: "125878",   planType: "PRP", planCode: "84",  surname: "TESTBRBHEEFI",   natInsNo: "BB-21-08-49-A", originalQuote: "12946810", status: "S", phPostCode: "CO99 9AB", ifaRef: "MYPEN-002", dob1: "26/08/1949", policyNo: "125878",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Brbheefi",    fullName2: "" },
  { policyRef: "174461",   planType: "PRP", planCode: "84",  surname: "TESTFTBHEEGB",   natInsNo: "EX-14-08-51-A", originalQuote: "12936525", status: "M", phPostCode: "RE99 9AB", ifaRef: "LLOYD-061", dob1: "14/08/1951", policyNo: "174461",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Ftbheegb",    fullName2: "" },
  { policyRef: "125258",   planType: "PRP", planCode: "84",  surname: "TESTAEBCFEDJ",   natInsNo: "AE-30-08-53-A", originalQuote: "3565991",  status: "M", phPostCode: "KI99 9AB", ifaRef: "ASTUS-001", dob1: "30/08/1953", policyNo: "125258",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Aebcfedj",    fullName2: "" },
  { policyRef: "125468",   planType: "PRP", planCode: "84",  surname: "TESTVSBCFEGI",   natInsNo: "WP-25-03-53-A", originalQuote: "3364423",  status: "M", phPostCode: "KI99 9AB", ifaRef: "INNES-001", dob1: "25/03/1953", policyNo: "125468",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Vsbcfegi",    fullName2: "" },
  { policyRef: "125704",   planType: "PRP", planCode: "84",  surname: "TESTHDBCFHAE",   natInsNo: "HA-21-08-53-A", originalQuote: "3574837",  status: "M", phPostCode: "SO99 9AB", ifaRef: "LANDM-001", dob1: "21/08/1953", policyNo: "125704",   cocode: "STALW-00", premium: "£10,000.00", fullName1: "Test  Hdbcfhae",    fullName2: "" },
];

const STATUSES = ["Pending", "Completed", "Shelved", "ALL"] as const;
type Status = (typeof STATUSES)[number];

function Radio({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer font-['Mulish'] text-[14px] text-[#3d3d3d] select-none">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-[#006cf4]">
        {checked ? (
          <MdRadioButtonChecked size={18} />
        ) : (
          <MdRadioButtonUnchecked size={18} />
        )}
      </span>
      {label}
    </label>
  );
}

type ColumnKey =
  | "policyRef"
  | "planType"
  | "planCode"
  | "surname"
  | "natInsNo"
  | "originalQuote"
  | "status"
  | "phPostCode"
  | "ifaRef"
  | "dob1"
  | "policyNo"
  | "cocode";

const COLUMNS: { key: ColumnKey; label: string; align?: "left" | "right" }[] = [
  { key: "policyRef",     label: "POLICY_REF",      align: "right" },
  { key: "planType",      label: "PLANTYPE" },
  { key: "planCode",      label: "PLAN_CODE" },
  { key: "surname",       label: "SURNAME_1_UPPER" },
  { key: "natInsNo",      label: "NAT_INS_NO_1" },
  { key: "originalQuote", label: "ORIGINALQUOTE",   align: "right" },
  { key: "status",        label: "STATUS" },
  { key: "phPostCode",    label: "PH_POST_CODE" },
  { key: "ifaRef",        label: "IFA_REF" },
  { key: "dob1",          label: "DOB_1" },
  { key: "policyNo",      label: "POLICY_NO",       align: "right" },
  { key: "cocode",        label: "COCODE" },
];

export function FindPolicyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status>("ALL");
  const [selected, setSelected] = useState(0);
  const [searchColumn, setSearchColumn] = useState<ColumnKey>("policyRef");
  const { setPlanCode } = usePlanCode();

  if (!open) return null;

  const placeholder = POLICIES[0]?.[searchColumn] ?? "";
  const q = search.trim().toLowerCase();
  const filtered = q
    ? POLICIES.filter((p) =>
        String(p[searchColumn] ?? "").toLowerCase().includes(q),
      )
    : POLICIES;

  const rec = filtered[selected] ?? filtered[0];

  const versionCodes = PLAN_CODE_VERSIONS.map((v) => v.code) as string[];

  const handleOk = () => {
    if (rec && versionCodes.includes(rec.planCode)) {
      setPlanCode(rec.planCode as PlanCodeVersion);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[1200px] max-w-full max-h-[92vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Find Policy</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto flex flex-col gap-5">
          {/* Search row */}
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1 max-w-[440px]">
              <label className="lve-label">Search For :</label>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelected(0);
                }}
                placeholder={String(placeholder)}
                className="lve-input"
              />
            </div>

            <fieldset className="border border-[#BBBBBB] rounded-[8px] px-4 pb-3 pt-1">
              <legend className="px-2 font-['Livvic'] text-[13px] font-semibold text-[#0d2c41]">
                Policy Status
              </legend>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {STATUSES.map((s) => (
                  <Radio
                    key={s}
                    label={s}
                    checked={status === s}
                    onChange={() => setStatus(s)}
                  />
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-2 pb-1">
              <button
                type="button"
                onClick={handleOk}
                className="lve-btn lve-btn-sm min-w-[100px] justify-center"
              >
                OK
              </button>
              <button
                type="button"
                onClick={onClose}
                className="lve-btn lve-btn-secondary lve-btn-sm min-w-[100px] justify-center"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Results grid */}
          <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
            <div className="overflow-auto max-h-[320px]">
              <table className="w-full font-['Mulish'] text-[13px] text-[#3d3d3d] min-w-[1160px]">
                <thead>
                  <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] uppercase text-[#002f5c]">
                    {COLUMNS.map((c) => {
                      const active = c.key === searchColumn;
                      return (
                        <th
                          key={c.key}
                          onClick={() => {
                            setSearchColumn(c.key);
                            setSearch("");
                            setSelected(0);
                          }}
                          className={`px-3 py-3 cursor-pointer select-none ${
                            c.align === "right" ? "text-right" : "text-left"
                          } ${
                            active
                              ? "bg-[#eaf5f8] text-[#005a9c] underline"
                              : "text-[#005a9c] hover:bg-[#f4f9fb]"
                          }`}
                        >
                          {c.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={p.policyRef}
                      onClick={() => setSelected(i)}
                      className={`cursor-pointer ${
                        i === selected
                          ? "bg-[#003578] text-white"
                          : i % 2 === 0
                            ? "bg-white hover:bg-[#003578] hover:text-white"
                            : "bg-[#e7ebec34] hover:bg-[#003578] hover:text-white"
                      }`}
                    >
                      {COLUMNS.map((c) => (
                        <td
                          key={c.key}
                          className={`px-3 py-2 ${
                            c.align === "right" ? "text-right" : ""
                          }`}
                        >
                          {p[c.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 4 - filtered.length) }).map(
                    (_, i) => (
                      <tr
                        key={`empty-${i}`}
                        className={i % 2 === 0 ? "bg-[#e7ebec34]" : "bg-white"}
                      >
                        {Array.from({ length: 12 }).map((__, j) => (
                          <td key={j} className="px-3 py-2">
                            {j === 0 ? "\u00A0" : ""}
                          </td>
                        ))}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail panel */}
          <div className="border border-[#BBBBBB] rounded-[8px] p-5 space-y-4 font-['Mulish'] text-[14px] text-[#3d3d3d]">
            <div className="grid grid-cols-[110px_180px_110px_1fr] items-center gap-x-4 gap-y-3">
              <div className="font-bold text-[#4a4a49]">Premium</div>
              <div className="flex h-[36px] items-center justify-end rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-3 cursor-not-allowed">
                {rec?.premium}
              </div>
              <div className="font-bold text-[#4a4a49]">Full Name 1</div>
              <div className="flex h-[36px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-3 cursor-not-allowed">
                {rec?.fullName1}
              </div>

              <div></div>
              <div></div>
              <div className="font-bold text-[#4a4a49]">Full Name 2</div>
              <div className="flex h-[36px] items-center rounded-[8px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-3 cursor-not-allowed">
                {rec?.fullName2}
              </div>
            </div>

            <div className="grid grid-cols-[110px_1fr] gap-4 items-start">
              <div className="font-bold text-[#4a4a49] pt-2">Cheques Rec</div>
              <div className="border border-[#BBBBBB] rounded-[8px] overflow-hidden">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-white border-y-[3px] border-[#04589b] font-['Livvic'] font-semibold text-[13px] text-[#002f5c]">
                      <th className="px-3 py-2 text-left">Transfer Company</th>
                      <th className="px-3 py-2 text-left w-[140px]">Date</th>
                      <th className="px-3 py-2 text-right w-[140px]">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#e7ebec34]"}
                      >
                        <td className="px-3 py-2">&nbsp;</td>
                        <td className="px-3 py-2"></td>
                        <td className="px-3 py-2"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
