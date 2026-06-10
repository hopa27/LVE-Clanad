import { useEffect } from "react";
import { SHORTCUT_SECTIONS } from "../shortcuts";

/**
 * Installs global `keydown` listeners for every entry in `SHORTCUT_SECTIONS`
 * that has both a `triggerKey` and a `handler`.  Skips events originating
 * from text inputs, textareas, selects, and contentEditable elements.
 *
 * Because the registry is the single source of truth, adding a new entry
 * with `triggerKey` + `handler` automatically wires the runtime behaviour
 * as well as updating the KeyboardShortcutsModal.
 */
export function useRegisteredShortcuts(): void {
  useEffect(() => {
    const entries = SHORTCUT_SECTIONS.flatMap((s) => s.shortcuts).filter(
      (s) => s.triggerKey !== undefined && s.handler !== undefined
    );

    const listener = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      for (const entry of entries) {
        if (e.key === entry.triggerKey) {
          e.preventDefault();
          entry.handler!(e);
          break;
        }
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, []);
}
