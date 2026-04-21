import { useEffect, useLayoutEffect, useRef, useState } from "react";

type LineDef = { placeholder?: string; readOnly?: boolean };

let measureCanvas: HTMLCanvasElement | null = null;
function measureText(text: string, font: string): number {
  if (!measureCanvas) measureCanvas = document.createElement("canvas");
  const ctx = measureCanvas.getContext("2d");
  if (!ctx) return text.length * 8;
  ctx.font = font;
  return ctx.measureText(text).width;
}

function reflow(rawLines: string[], widths: number[], font: string): string[] {
  const n = rawLines.length;
  if (widths.length !== n || widths.some((w) => !w)) return rawLines.slice();

  // Treat each line independently: if it overflows, push the trailing word(s) into the next line.
  // We do NOT pull words back upward — that would fight the user while they type at the end of a line.
  const out = rawLines.map((s) => s);
  for (let i = 0; i < n; i++) {
    const text = out[i] ?? "";
    if (measureText(text, font) <= widths[i]) continue;
    // Find the largest prefix that fits, breaking on spaces if possible.
    let cut = text.length;
    while (cut > 0 && measureText(text.slice(0, cut), font) > widths[i]) cut--;
    // Prefer breaking at the last space before `cut`.
    const lastSpace = text.lastIndexOf(" ", cut);
    if (lastSpace > 0) cut = lastSpace;
    if (cut <= 0) cut = 1;
    const head = text.slice(0, cut);
    const tail = text.slice(cut).replace(/^\s+/, "");
    out[i] = head;
    if (i + 1 < n) {
      out[i + 1] = tail + (out[i + 1] ? " " + out[i + 1] : "");
    }
    // If the last line still overflowed, leave it — there is nowhere to push it.
  }
  return out;
}

export function ConnectedAddress({
  lines,
  initial = [],
}: {
  lines: LineDef[];
  initial?: string[];
}) {
  const [values, setValues] = useState<string[]>(() =>
    lines.map((_, i) => initial[i] ?? "")
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const recompute = () => {
    const widths = inputRefs.current.map((el) => {
      if (!el) return 0;
      const styles = window.getComputedStyle(el);
      const padL = parseFloat(styles.paddingLeft) || 0;
      const padR = parseFloat(styles.paddingRight) || 0;
      return el.clientWidth - padL - padR - 2;
    });
    const fonts = inputRefs.current.map((el) => {
      if (!el) return "16px Mulish, sans-serif";
      const s = window.getComputedStyle(el);
      return `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    });
    const next = reflow(values, widths, fonts[0]);
    if (next.some((v, i) => v !== values[i])) setValues(next);
  };

  useLayoutEffect(() => {
    recompute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.join("\u0001")]);

  useEffect(() => {
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (i: number, v: string) => {
    const next = values.slice();
    next[i] = v;
    setValues(next);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    if (e.key === "Backspace" && el.selectionStart === 0 && el.selectionEnd === 0 && i > 0) {
      e.preventDefault();
      const prev = values[i - 1] ?? "";
      const merged = prev + values[i];
      const next = values.slice();
      next[i - 1] = merged;
      next[i] = "";
      setValues(next);
      requestAnimationFrame(() => {
        const prevEl = inputRefs.current[i - 1];
        if (prevEl) {
          prevEl.focus();
          prevEl.setSelectionRange(prev.length, prev.length);
        }
      });
    }
  };

  return (
    <div className="space-y-2">
      {lines.map((line, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          value={values[i] ?? ""}
          placeholder={line.placeholder ?? `Line ${i + 1}`}
          readOnly={line.readOnly}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="lve-input"
        />
      ))}
    </div>
  );
}
