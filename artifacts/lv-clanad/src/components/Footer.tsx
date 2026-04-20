import lvLogo from "../assets/lv-logo.png";

export function Footer() {
  return (
    <footer className="mt-auto shrink-0 w-full bg-white border-t border-slate-200 py-4 px-8 flex items-center justify-between">
      <img src={lvLogo} alt="LV=" className="h-6 w-auto" />
      <div className="text-[10px] font-medium text-slate-400 leading-tight text-right font-['Mulish']">
        <div>Liverpool Victoria Friendly Society Limited, County Gates, Bournemouth BH1 2NF.</div>
        <div>Authorised by the Prudential Regulation Authority and regulated by the FCA and PRA.</div>
      </div>
    </footer>
  );
}
