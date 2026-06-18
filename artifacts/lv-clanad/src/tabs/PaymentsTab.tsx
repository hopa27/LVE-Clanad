import { useState } from "react";
import { Field, TextInput, Section } from "../components/Field";
import { DatePicker } from "../components/DatePicker";
import { MdFileUpload } from "react-icons/md";
import { usePlanCode } from "../context/PlanCodeContext";

type Row = Record<string, string>;

const PAYMENT_HISTORY_DEFAULT: Row[] = [
  { date: "28/05/2025", gross: "9,570.32", cap: "0", tax: "-2,780.46", postAdj: "0", net: "6,789.86", method: "B", reason: "ONEOFF", bacs: "27/05/2025", hash: "/I ZU" },
  { date: "25/10/2025", gross: "699.50",   cap: "0", tax: "0",          postAdj: "0", net: "699.50",    method: "B", reason: "PROC",   bacs: "23/10/2025", hash: "/VT0"  },
];

const TAX_HISTORY_DEFAULT: Row[] = [
  { date: "28/05/2025", code: "1257L*", n: "1", gross: "9,570.32",  cum: "9,570.32",  free: "1,048.26", taxable: "8,522.06",   tax: "-2,780.46", ytd: "-2,780.46" },
  { date: "25/10/2025", code: "1257L*", n: "6", gross: "699.50",    cum: "10,269.82", free: "6,289.56", taxable: "-5,590.06",  tax: "0",          ytd: "-2,780.46" },
];

const PAYMENT_HISTORY_84: Row[] = [
  { date: "30/04/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "FIRST", bacs: "29/04/2010", hash: "" },
  { date: "31/05/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "27/05/2010", hash: "" },
  { date: "30/06/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/06/2010", hash: "" },
  { date: "31/07/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/07/2010", hash: "" },
  { date: "31/08/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "27/08/2010", hash: "" },
  { date: "30/09/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/09/2010", hash: "" },
  { date: "31/10/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "28/10/2010", hash: "" },
  { date: "30/11/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "29/11/2010", hash: "" },
  { date: "31/12/2010", gross: "107.83", cap: "0", tax: "0", postAdj: "0", net: "107.83", method: "B", reason: "PROC",  bacs: "30/12/2010", hash: "" },
];

const TAX_HISTORY_84: Row[] = [
  { date: "30/04/2010", code: "647L*", n: "1", gross: "107.83", cum: "107.83", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "31/05/2010", code: "647L*", n: "1", gross: "107.83", cum: "215.66", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "30/06/2010", code: "647L*", n: "1", gross: "107.83", cum: "323.49", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "31/07/2010", code: "647L*", n: "1", gross: "107.83", cum: "431.32", free: "539.92",  taxable: "-432.09",  tax: "0", ytd: "0" },
  { date: "31/08/2010", code: "647L",  n: "5", gross: "107.83", cum: "539.15", free: "2699.6",  taxable: "-2160.45", tax: "0", ytd: "0" },
  { date: "30/09/2010", code: "647L",  n: "6", gross: "107.83", cum: "646.98", free: "3239.52", taxable: "-2592.54", tax: "0", ytd: "0" },
  { date: "31/10/2010", code: "647L",  n: "7", gross: "107.83", cum: "754.81", free: "3779.44", taxable: "-3024.63", tax: "0", ytd: "0" },
];

const PAYMENT_HISTORY_90: Row[] = [
  { date: "07/07/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "FIRST", bacs: "04/07/2025", hash: "/Q2I" },
  { date: "28/07/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "25/07/2025", hash: "/GGJ" },
  { date: "28/08/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/08/2025", hash: "/QH1" },
  { date: "28/09/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "25/09/2025", hash: "/H8L" },
  { date: "28/10/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/10/2025", hash: "/323" },
  { date: "28/11/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/11/2025", hash: "/0QY" },
  { date: "28/12/2025", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "23/12/2025", hash: "/4Q3" },
  { date: "28/01/2026", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "27/01/2026", hash: "/L4l" },
  { date: "28/02/2026", gross: "251.79", cap: "0", tax: "0", postAdj: "0", net: "251.79", method: "B", reason: "PROC",  bacs: "26/02/2026", hash: "/E--" },
];

const TAX_HISTORY_90: Row[] = [
  { date: "07/07/2025", code: "NT", n: "4", gross: "251.79", cum: "251.79",  free: "0", taxable: "251.79",  tax: "0", ytd: "0" },
  { date: "28/07/2025", code: "NT", n: "4", gross: "251.79", cum: "503.58",  free: "0", taxable: "503.58",  tax: "0", ytd: "0" },
  { date: "28/08/2025", code: "NT", n: "5", gross: "251.79", cum: "755.37",  free: "0", taxable: "755.37",  tax: "0", ytd: "0" },
  { date: "28/09/2025", code: "NT", n: "6", gross: "251.79", cum: "1007.16", free: "0", taxable: "1007.16", tax: "0", ytd: "0" },
  { date: "28/10/2025", code: "NT", n: "7", gross: "251.79", cum: "1258.95", free: "0", taxable: "1258.95", tax: "0", ytd: "0" },
  { date: "28/11/2025", code: "NT", n: "8", gross: "251.79", cum: "1510.74", free: "0", taxable: "1510.74", tax: "0", ytd: "0" },
];

const PAYMENT_HISTORY_51: Row[] = [
  { date: "28/04/2008", gross: "131.5",  cap: "0", tax: "-26.2", postAdj: "0", net: "105.3",  method: "B", reason: "PROC", bacs: "25/04/2008", hash: "" },
  { date: "30/04/2008", gross: "-131.5", cap: "0", tax: "26.2",  postAdj: "0", net: "-105.3", method: "R", reason: "",     bacs: "",            hash: "" },
  { date: "24/05/2008", gross: "131.5",  cap: "0", tax: "-26.2", postAdj: "0", net: "105.3",  method: "C", reason: "",     bacs: "",            hash: "" },
  { date: "28/07/2008", gross: "131.5",  cap: "0", tax: "-26.4", postAdj: "0", net: "105.1",  method: "B", reason: "PROC", bacs: "25/07/2008",  hash: "" },
  { date: "30/07/2008", gross: "-131.5", cap: "0", tax: "26.4",  postAdj: "0", net: "-105.1", method: "R", reason: "",     bacs: "",            hash: "" },
  { date: "11/11/2008", gross: "263",    cap: "0", tax: "-52.6", postAdj: "0", net: "210.4",  method: "T", reason: "PROC", bacs: "10/11/2008",  hash: "" },
  { date: "28/01/2009", gross: "131.5",  cap: "0", tax: "-26.4", postAdj: "0", net: "105.1",  method: "B", reason: "PROC", bacs: "27/01/2009",  hash: "" },
  { date: "28/04/2009", gross: "131.5",  cap: "0", tax: "-26.2", postAdj: "0", net: "105.3",  method: "B", reason: "PROC", bacs: "27/04/2009",  hash: "" },
  { date: "28/07/2009", gross: "131.5",  cap: "0", tax: "-26.4", postAdj: "0", net: "105.1",  method: "B", reason: "PROC", bacs: "27/07/2009",  hash: "" },
];

const PAYMENT_HISTORY_83: Row[] = [
  { date: "26/08/2015", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "FIRST", bacs: "25/08/2015", hash: "/E7Z" },
  { date: "14/09/2015", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "FIRST", bacs: "11/09/2015", hash: "/TXY" },
  { date: "14/10/2015", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/10/2015", hash: "/S/-" },
  { date: "14/11/2015", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "12/11/2015", hash: "/FLY" },
  { date: "14/12/2015", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "11/12/2015", hash: "/XFA" },
  { date: "14/01/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/01/2016", hash: "/4C1" },
  { date: "14/02/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "11/02/2016", hash: "/3Y0" },
  { date: "14/03/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "11/03/2016", hash: "/70Y" },
  { date: "14/04/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/04/2016", hash: "//70" },
  { date: "14/05/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "12/05/2016", hash: "/VL8" },
  { date: "14/06/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/06/2016", hash: "/87"  },
  { date: "14/07/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/07/2016", hash: "/L48" },
  { date: "14/08/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "11/08/2016", hash: "/T90" },
  { date: "14/09/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/09/2016", hash: "/LDE" },
  { date: "14/10/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/10/2016", hash: "/FIT" },
  { date: "14/11/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "11/11/2016", hash: "/LB." },
  { date: "14/12/2016", gross: "702", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "13/12/2016", hash: "/-BB" },
];

const PAYMENT_HISTORY_61a: Row[] = [
  { date: "19/12/2011", gross: "56.41", cap: "0", tax: "-11.2", postAdj: "0", net: "45.21", method: "B", reason: "PROC", bacs: "16/12/2011", hash: "" },
  { date: "27/01/2012", gross: "56.41", cap: "0", tax: "0",     postAdj: "0", net: "56.41", method: "B", reason: "",     bacs: "",           hash: "" },
  { date: "19/02/2012", gross: "56.41", cap: "0", tax: "0",     postAdj: "0", net: "56.41", method: "B", reason: "PROC", bacs: "16/02/2012", hash: "" },
  { date: "19/03/2012", gross: "56.41", cap: "0", tax: "0",     postAdj: "0", net: "56.41", method: "B", reason: "PROC", bacs: "16/03/2012", hash: "" },
  { date: "19/04/2012", gross: "56.41", cap: "0", tax: "-11.2", postAdj: "0", net: "45.21", method: "B", reason: "PROC", bacs: "18/04/2012", hash: "" },
  { date: "19/05/2012", gross: "56.41", cap: "0", tax: "-11.2", postAdj: "0", net: "45.21", method: "B", reason: "PROC", bacs: "17/05/2012", hash: "" },
  { date: "19/06/2012", gross: "56.41", cap: "0", tax: "-11.4", postAdj: "0", net: "45.01", method: "B", reason: "PROC", bacs: "18/06/2012", hash: "" },
  { date: "19/07/2012", gross: "56.41", cap: "0", tax: "-11.2", postAdj: "0", net: "45.21", method: "B", reason: "PROC", bacs: "18/07/2012", hash: "" },
  { date: "19/08/2012", gross: "56.45", cap: "0", tax: "-11.4", postAdj: "0", net: "45.05", method: "B", reason: "PROC", bacs: "16/08/2012", hash: "" },
];

const TAX_HISTORY_61a: Row[] = [
  { date: "19/12/2011", code: "BR",    n: "9", gross: "56.41", cum: "56.41",  free: "0",      taxable: "56.41",   tax: "-11.2", ytd: "-11.2" },
  { date: "27/01/2012", code: "747L*", n: "1", gross: "56.41", cum: "112.82", free: "623.25", taxable: "-566.84", tax: "0",     ytd: "-11.2" },
  { date: "19/02/2012", code: "747L*", n: "1", gross: "56.41", cum: "169.23", free: "623.26", taxable: "-566.85", tax: "0",     ytd: "-11.2" },
  { date: "19/03/2012", code: "747L*", n: "1", gross: "56.41", cum: "225.64", free: "623.26", taxable: "-566.85", tax: "0",     ytd: "-11.2" },
  { date: "19/04/2012", code: "BR",    n: "1", gross: "56.41", cum: "56.41",  free: "0",      taxable: "56.41",   tax: "-11.2", ytd: "-11.2" },
  { date: "19/05/2012", code: "BR",    n: "2", gross: "56.41", cum: "112.82", free: "0",      taxable: "112.82",  tax: "-11.2", ytd: "-22.4" },
];

const PAYMENT_HISTORY_621: Row[] = [
  { date: "03/06/2026", gross: "200",  cap: "0", tax: "0", postAdj: "0", net: "200",  method: "B", reason: "MANUAL", bacs: "02/06/2026", hash: "/LB4" },
  { date: "03/06/2026", gross: "-200", cap: "0", tax: "0", postAdj: "0", net: "-200", method: "R", reason: "RETURN", bacs: "",           hash: ""     },
  { date: "03/06/2026", gross: "200",  cap: "0", tax: "0", postAdj: "0", net: "200",  method: "T", reason: "REISS",  bacs: "",           hash: ""     },
];

const TAX_HISTORY_621: Row[] = [
  { date: "03/06/2026", code: "1257L", n: "2", gross: "200",  cum: "200", free: "2096.52", taxable: "-1896.52", tax: "0", ytd: "0" },
  { date: "03/06/2026", code: "1257L", n: "2", gross: "-200", cum: "0",   free: "1048.26", taxable: "-1048.26", tax: "0", ytd: "0" },
  { date: "03/06/2026", code: "1257L", n: "2", gross: "200",  cum: "200", free: "2096.52", taxable: "-1896.52", tax: "0", ytd: "0" },
];

const PAYMENT_HISTORY_76: Row[] = [
  { date: "07/02/2008", gross: "2300", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "FIRST", bacs: "06/02/2008", hash: "" },
  { date: "01/03/2008", gross: "1150", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "28/02/2008", hash: "" },
  { date: "01/04/2008", gross: "1150", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "31/03/2008", hash: "" },
  { date: "01/05/2008", gross: "1150", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "30/04/2008", hash: "" },
  { date: "01/06/2008", gross: "1150", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "29/05/2008", hash: "" },
  { date: "01/07/2008", gross: "1150", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "30/06/2008", hash: "" },
  { date: "01/08/2008", gross: "1150", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "31/07/2008", hash: "" },
  { date: "22/10/2008", gross: "2300", cap: "", tax: "", postAdj: "", net: "", method: "C", reason: "",      bacs: "",           hash: "" },
  { date: "01/11/2008", gross: "1150", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "30/10/2008", hash: "" },
];

const PAYMENT_HISTORY_76z: Row[] = [
  { date: "10/07/2008", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "FIRST", bacs: "09/07/2008", hash: "" },
  { date: "26/07/2008", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "FIRST", bacs: "24/07/2008", hash: "" },
  { date: "26/08/2008", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "22/08/2008", hash: "" },
  { date: "26/09/2008", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "25/09/2008", hash: "" },
  { date: "26/10/2008", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "23/10/2008", hash: "" },
  { date: "26/11/2008", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "25/11/2008", hash: "" },
  { date: "26/12/2008", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "23/12/2008", hash: "" },
  { date: "26/01/2009", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "23/01/2009", hash: "" },
  { date: "26/02/2009", gross: "1550", cap: "", tax: "", postAdj: "", net: "", method: "B", reason: "PROC",  bacs: "25/02/2009", hash: "" },
];

const TAX_HISTORY_76z: Row[] = [];

const TAX_HISTORY_76: Row[] = [];

const TAX_HISTORY_83: Row[] = [];

const TAX_HISTORY_51: Row[] = [
  { date: "28/04/2008", code: "BR", n: "3",  gross: "131.5",  cum: "131.5", free: "0", taxable: "131.5", tax: "-26.2", ytd: "-26.2"  },
  { date: "30/04/2008", code: "BR", n: "3",  gross: "-131.5", cum: "0",     free: "0", taxable: "0",      tax: "26.2",  ytd: "0"      },
  { date: "24/05/2008", code: "BR", n: "3",  gross: "131.5",  cum: "131.5", free: "0", taxable: "131.5", tax: "-26.2", ytd: "-26.2"  },
  { date: "28/07/2008", code: "BR", n: "6",  gross: "131.5",  cum: "263",   free: "0", taxable: "263",    tax: "-26.4", ytd: "-52.6"  },
  { date: "30/07/2008", code: "BR", n: "6",  gross: "-131.5", cum: "131.5", free: "0", taxable: "131.5", tax: "26.4",  ytd: "-26.2"  },
  { date: "11/11/2008", code: "BR", n: "9",  gross: "263",    cum: "394.5", free: "0", taxable: "394.5", tax: "-52.6", ytd: "-78.8"  },
  { date: "28/01/2009", code: "BR", n: "12", gross: "131.5",  cum: "526",   free: "0", taxable: "526",    tax: "-26.4", ytd: "-105.2" },
  { date: "28/04/2009", code: "BR", n: "3",  gross: "131.5",  cum: "131.5", free: "0", taxable: "131.5", tax: "-26.2", ytd: "-26.2"  },
  { date: "28/07/2009", code: "BR", n: "6",  gross: "131.5",  cum: "263",   free: "0", taxable: "263",    tax: "-26.4", ytd: "-52.6"  },
  { date: "28/10/2009", code: "BR", n: "9",  gross: "131.5",  cum: "394.5", free: "0", taxable: "394.5", tax: "-52.6", ytd: "-78.8"  },
  { date: "28/01/2010", code: "BR", n: "12", gross: "131.5",  cum: "526",   free: "0", taxable: "526",    tax: "-26.4", ytd: "-105.2" },
];

export function PaymentsTab() {
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
  const [selectedPayIdx, setSelectedPayIdx] = useState<number | null>(null);

  const paymentHistory = isPlan84
    ? PAYMENT_HISTORY_84
    : isPlan90
    ? PAYMENT_HISTORY_90
    : isPlan51
    ? PAYMENT_HISTORY_51
    : isPlan82
    ? []
    : isPlan80
    ? []
    : isPlan83
    ? PAYMENT_HISTORY_83
    : isPlan621
    ? PAYMENT_HISTORY_621
    : isPlan76
    ? PAYMENT_HISTORY_76
    : isPlan76z
    ? PAYMENT_HISTORY_76z
    : isPlan61a
    ? PAYMENT_HISTORY_61a
    : isPlan62a || isPlan611 || isPlan52
    ? []
    : isPlan0 || isPlan87
    ? []
    : PAYMENT_HISTORY_DEFAULT;
  const taxHistory = isPlan84
    ? TAX_HISTORY_84
    : isPlan90
    ? TAX_HISTORY_90
    : isPlan51
    ? TAX_HISTORY_51
    : isPlan82
    ? []
    : isPlan80
    ? []
    : isPlan83
    ? TAX_HISTORY_83
    : isPlan621
    ? TAX_HISTORY_621
    : isPlan76
    ? TAX_HISTORY_76
    : isPlan76z
    ? TAX_HISTORY_76z
    : isPlan61a
    ? TAX_HISTORY_61a
    : isPlan62a || isPlan611 || isPlan52
    ? []
    : isPlan0 || isPlan87
    ? []
    : TAX_HISTORY_DEFAULT;

  return (
    <div className="space-y-4">
      <Section
        title="Payment Summary"
        headerAction={
          <button type="button" className="lve-btn lve-btn-secondary lve-btn-sm">
            <MdFileUpload size={16} /> Import
          </button>
        }
      >
        {isPlan0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="DBEdit22" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="DBEdit23" disabled /></Field>
              <Field label="Total:"><TextInput value="DBText1" disabled /></Field>
              <Field label="1st Annuitants Gross:"><TextInput value="DBEdit27" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="DBEdit56" disabled /></Field>
            </div>
            <div>
              <Field label="Gross Annuity Year 1:"><TextInput value="dbedGrossAn" disabled /></Field>
              <Field label="Instalments Year 1:"><TextInput value="dbedInstalme" disabled /></Field>
              <Field label="PLA Taxable Element:"><TextInput value="dbedPLATaxa" disabled /></Field>
              <Field label="Taxable pay:"><TextInput value="DBEdit58" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="DBEdit73" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="DBEdit74" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="DBEdit75" disabled /></Field>
              <Field label="BAL Capital Element:"><TextInput value="dbedBALCapi" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="DBEdit59" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="DBEdit60" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:"><TextInput value="DBEdit61" disabled /></Field>
              <Field label="Next Payment Due:"><TextInput value="DBEdit62" disabled /></Field>
              <Field label="Inst Remaining:"><TextInput value="DBE" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="DBE" disabled /></Field>
            </div>
          </div>
        ) : isPlan90 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="3021.57" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="3021.57" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="0" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="503.67" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="503.67" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Final Payment:">
                <DatePicker value="28/05/2027" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="28/06/2026" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="12" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="2" disabled /></Field>
            </div>
          </div>
        ) : isPlan51 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="8940.65" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="8940.65" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="526" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="394.5" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="" disabled /></Field>
              <Field label="Taxable pay:"><TextInput value="394.5" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="-78.8" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="28/01/2015" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="9" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="-26.2" disabled /></Field>
            </div>
          </div>
        ) : isPlan82 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="21391.53" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="21391.53" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="0" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Gross Annuity Year 1:"><TextInput value="0" disabled /></Field>
              <Field label="Instalments Year 1:"><TextInput value="11" disabled /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="-9174.99" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="9174.99" disabled /></Field>
            </div>
            <div>
              <Field label="BAL Gross Annuity:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="28/09/2015" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="26/03/2015" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="7" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="11" disabled /></Field>
            </div>
          </div>
        ) : isPlan83 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="75459.46" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="75459.46" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="8424" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="-1385.04" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="4193.04" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="2808" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="14/08/2025" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="14/08/2025" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="0" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="4" disabled /></Field>
            </div>
          </div>
        ) : isPlan621 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="39911.31" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="13303.76" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="53215.07" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="0" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="772.5" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="-1896.52" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="2096.52" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="200" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="0" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="2" disabled /></Field>
            </div>
          </div>
        ) : isPlan76 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="43962" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="43962" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="13800" disabled /></Field>
            </div>
            <div>
              <Field label="BAL Gross Annuity:"><TextInput value="" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="01/01/2010" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="" disabled /></Field>
            </div>
          </div>
        ) : isPlan76z ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="63697.99" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="63697.99" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="25074.64" disabled /></Field>
            </div>
            <div>
              <Field label="BAL Gross Annuity:"><TextInput value="4179.14" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="26/06/2015" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="26/04/2015" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="2" disabled /></Field>
            </div>
          </div>
        ) : isPlan62a ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="108570" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="36190" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="144760" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="7499" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="" disabled /></Field>
            </div>
          </div>
        ) : isPlan61a ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="6803.69" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="6803.69" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="677" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="282.13" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="282.13" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="-56.4" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="-11.4" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="19/09/2018" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="0" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="5" disabled /></Field>
            </div>
          </div>
        ) : isPlan611 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="3670.56" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="0" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="3670.56" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="169" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="" disabled /></Field>
            </div>
          </div>
        ) : isPlan80 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="30907.56" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="10302.51" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="41210.07" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="0" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="-6757.6" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="6757.6" disabled /></Field>
            </div>
            <div>
              <Field label="BAL Gross Annuity:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="0" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="26/02/2013" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="10" disabled /></Field>
            </div>
          </div>
        ) : isPlan52 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value="32402.98" disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value="10800.99" disabled /></Field>
              <Field label={<span className="text-[#d72714]">Total:</span>}>
                <TextInput value="43203.97" disabled className="!text-[#d72714] underline" />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value="2092" disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label=" "><div className="h-[44px]" /></Field>
              <Field label="Taxable pay:"><TextInput value="" disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value="" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value="" disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value="" disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value="" disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value="" disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value="" placeholder="" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value="" disabled /></Field>
              <Field label="Nth Inst:"><TextInput value="" disabled /></Field>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8">
            <div>
              <Field label="Premium:"><TextInput value={isPlan87 ? "100000" : isPlan84 ? "20348.97" : "15,000"} disabled /></Field>
              <Field label="Tax Free Cash:"><TextInput value={isPlan84 ? "6782.99" : "0"} disabled /></Field>
              <Field
                label={
                  isPlan87 || isPlan84 ? (
                    <span className="text-[#d72714]">Total:</span>
                  ) : (
                    "Total:"
                  )
                }
              >
                <TextInput
                  value={isPlan87 ? "100000" : isPlan84 ? "27131.96" : "15,000"}
                  disabled
                  className={isPlan87 || isPlan84 ? "!text-[#d72714] underline" : ""}
                />
              </Field>
              <Field label="1st Annuitants Gross:"><TextInput value={isPlan87 ? "0" : isPlan84 ? "1294" : "1,399"} disabled /></Field>
              <Field label="2nd Annuitants Gross:"><TextInput value="0" disabled /></Field>
            </div>
            <div>
              <Field label="Cumulative Instal:"><TextInput value={isPlan87 ? "" : isPlan84 ? "107.83" : "10,269.82"} disabled /></Field>
              <Field label="BAL Gross Annuity:"><TextInput value={isPlan87 ? "" : isPlan84 ? "1186.17" : "699.50"} disabled /></Field>
              <Field label="Taxable pay:"><TextInput value={isPlan87 ? "" : isPlan84 ? "63.74" : "-5,590.06"} disabled /></Field>
              <Field label="Cumulative Free Pay:"><TextInput value={isPlan87 ? "" : isPlan84 ? "44.09" : "6,289.56"} disabled /></Field>
              <Field label="PAYE Tax Due To Date:"><TextInput value={isPlan87 ? "" : isPlan84 ? "-12.6" : "-2,780.46"} disabled /></Field>
            </div>
            <div>
              <Field label="Next Anniversary:">
                <DatePicker value={isPlan84 ? "31/03/2027" : ""} placeholder="Next Anniversary" disabled />
              </Field>
              <Field label="Next Payment Due:">
                <DatePicker value={isPlan84 ? "31/05/2026" : ""} placeholder="Next Payment Due" disabled />
              </Field>
              <Field label="Inst Remaining:"><TextInput value={isPlan87 ? "" : isPlan84 ? "11" : "1"} disabled /></Field>
              <Field label="Nth Inst:"><TextInput value={isPlan87 ? "" : isPlan84 ? "1" : "6"} disabled /></Field>
              <Field label="PAYE Tax Deduction:"><TextInput value={isPlan84 ? "-12.6" : "0"} disabled /></Field>
            </div>
          </div>
        )}
      </Section>

      <Section>
        {(() => {
          const handlePayKey = (e: React.KeyboardEvent) => {
            if (!paymentHistory.length) return;
            const last = paymentHistory.length - 1;
            if (e.key === "ArrowDown") { e.preventDefault(); setSelectedPayIdx((i) => Math.min((i ?? -1) + 1, last)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedPayIdx((i) => Math.max((i ?? 1) - 1, 0)); }
            else if (e.key === "Home") { e.preventDefault(); setSelectedPayIdx(0); }
            else if (e.key === "End") { e.preventDefault(); setSelectedPayIdx(last); }
          };
          return (
        <div
          className="overflow-auto max-h-[315px]"
          role="grid"
          tabIndex={0}
          onKeyDown={handlePayKey}
          aria-label="Payment History grid"
          aria-rowcount={paymentHistory.length}
        >
          <table className="lve-grid">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th>Pay Date</th>
                <th>Gross</th>
                {!isPlan82 && !isPlan83 && !isPlan76 && !isPlan76z && <><th>Cap Element</th><th>Tax</th><th>Post Adj</th><th>Net</th></>}
                <th>Method</th>
                <th>Reason</th>
                <th>BACS Date</th>
                <th>Hash Code</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((row, i) => {
                const isSel = selectedPayIdx === i;
                const tdStyle = isSel ? { backgroundColor: "#05579B", color: "#ffffff" } : undefined;
                return (
                  <tr
                    key={i}
                    onClick={() => setSelectedPayIdx(i)}
                    className="cursor-pointer"
                    aria-selected={isSel}
                    role="row"
                    aria-rowindex={i + 1}
                  >
                    <td style={tdStyle}>{row.date}</td>
                    <td style={tdStyle}>{row.gross}</td>
                    {!isPlan82 && !isPlan83 && !isPlan76 && !isPlan76z && <><td style={tdStyle}>{row.cap}</td><td style={tdStyle}>{row.tax}</td><td style={tdStyle}>{row.postAdj}</td><td style={tdStyle}>{row.net}</td></>}
                    <td style={tdStyle}>{row.method}</td>
                    <td style={tdStyle}>{row.reason}</td>
                    <td style={tdStyle}>{row.bacs}</td>
                    <td style={tdStyle}>{row.hash}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
          );
        })()}
      </Section>

      {!isPlan76z && (
      <Section>
        <div className="overflow-auto max-h-[315px]" role="grid" aria-label="Tax History grid" aria-rowcount={taxHistory.length}>
          <table className="lve-grid">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th>Pay Date</th>
                <th>Tax Code</th>
                <th>N</th>
                <th>Gross</th>
                <th>Cum Instal</th>
                <th>Free Pay</th>
                <th>Taxable Pay</th>
                <th>Tax</th>
                <th>Tax YTD</th>
              </tr>
            </thead>
            <tbody>
              {taxHistory.map((row, i) => (
                <tr key={i} role="row" aria-rowindex={i + 1}>
                  <td>{row.date}</td>
                  <td>{row.code}</td>
                  <td>{row.n}</td>
                  <td>{row.gross}</td>
                  <td>{row.cum}</td>
                  <td>{row.free}</td>
                  <td>{row.taxable}</td>
                  <td>{row.tax}</td>
                  <td>{row.ytd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      )}
    </div>
  );
}
