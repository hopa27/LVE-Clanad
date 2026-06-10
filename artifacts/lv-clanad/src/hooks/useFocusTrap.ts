import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.closest("[aria-hidden='true']"),
  );
}

const activeTrapStack: symbol[] = [];

export function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean) {
  const prevFocus = useRef<HTMLElement | null>(null);
  const trapId = useRef<symbol>(Symbol("focus-trap"));

  useEffect(() => {
    if (!active) return;

    const id = trapId.current;
    prevFocus.current = document.activeElement as HTMLElement | null;
    activeTrapStack.push(id);

    const container = containerRef.current;
    if (!container) {
      return () => {
        const idx = activeTrapStack.lastIndexOf(id);
        if (idx !== -1) activeTrapStack.splice(idx, 1);
        prevFocus.current?.focus();
      };
    }

    const focusable = getFocusable(container);
    focusable[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTrapStack[activeTrapStack.length - 1] !== id) return;
      if (e.key !== "Tab") return;
      const els = getFocusable(container);
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const idx = activeTrapStack.lastIndexOf(id);
      if (idx !== -1) activeTrapStack.splice(idx, 1);
      prevFocus.current?.focus();
    };
  }, [active, containerRef]);
}
