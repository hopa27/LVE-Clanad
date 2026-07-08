import { usePlanCode } from "../context/PlanCodeContext";

export function StatusBar() {
  const { planCode } = usePlanCode();
  const isPlan0   = planCode === "0";
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
  const isPlan90  = planCode === "90";
  const isPlan84  = planCode === "84";
  const isPlan87  = planCode === "87";
  const isSippPol = isPlan90;
  const nonLive = isPlan51 || isPlan83 || isPlan82 || isPlan80 || isPlan621 || isPlan76 || isPlan76z || isPlan62a || isPlan611 || isPlan52 || isPlan61a || isPlan87 || isPlan84;
  const items = [
    {
      label: "Status",
      value: isPlan84 ? "DEAD" : isPlan51 ? "MIGRATED" : isPlan83 ? "Maturity Pending" : isPlan82 ? "Surrendered" : isPlan80 ? "Matured" : isPlan621 ? "Death Pending" : isPlan76z ? "Death Pending" : isPlan76 ? "DEAD" : isPlan62a ? "CANCELLED" : isPlan611 ? "SHELVED - Ntu" : isPlan52 ? "SHELVED - Duplicate" : isPlan61a ? "EXPIRED" : isPlan87 ? "PENDING" : "LIVE",
      highlight: !nonLive,
      error: nonLive,
    },
    { label: isSippPol ? "SIPP Pol" : "Illustration", value: isPlan0 ? "" : isPlan51 ? "927657" : isPlan83 ? "10578050" : isPlan82 ? "2479583" : isPlan80 ? "2079105" : isPlan621 ? "919598" : isPlan76z ? "1030695" : isPlan76 ? "938688" : isPlan62a ? "2684095" : isPlan611 ? "948258" : isPlan52 ? "922450" : isPlan61a ? "1135311" : isPlan90 ? "608513" : isPlan84 ? "2139419" : isPlan87 ? "20825226" : "20911002" },
    { label: "Variant",      value: isPlan0 ? "" : isPlan51 ? "8"      : isPlan83 ? "3"        : isPlan82 ? "2"       : isPlan80 ? "13"      : isPlan621 ? "4"      : isPlan76z ? "8"      : isPlan76 ? "4"      : isPlan62a ? "1"        : isPlan611 ? "5"      : isPlan52 ? "4" : isPlan61a ? "9" : isPlan84 ? "4" : isSippPol ? "" : isPlan87 ? "1" : "7" },
    { label: "RAQ ID",       value: isSippPol ? "" : isPlan84 ? "" : isPlan87 ? "RAQ233845" : nonLive ? "" : "—" },
    { label: "User",         value: isPlan51 || isPlan83 || isPlan62a || isSippPol || isPlan87 ? "UAT1" : isPlan84 ? "UAT2" : "UAT3" },
  ];
  return (
    <div className="lve-panel mt-6 p-4 flex flex-wrap items-center gap-6 sticky bottom-0 z-20 shadow-[0_-2px_6px_rgba(0,0,0,0.08)]">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span className="font-['Livvic'] text-xs uppercase tracking-wider text-[#0d2c41]/60">
            {item.label}:
          </span>
          <span
            className={`font-['Mulish'] text-sm font-semibold ${
              item.highlight ? "text-[#178830]" : (item as any).error ? "text-[#d72714]" : "text-[#3d3d3d]"
            }`}
            role={item.label === "Status" ? "status" : undefined}
            aria-label={item.label === "Status" ? `Policy status: ${item.value}` : undefined}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
