import { useEffect } from "react";
import { useShortcutRegistry } from "../context/ShortcutRegistryContext";

/**
 * Installs global `keydown` listeners for every entry in the shortcut registry
 * that has both a `triggerKey` and a `handler`.  Skips events originating from
 * text inputs, textareas, selects, and contentEditable elements.
 *
 * Reads from `ShortcutRegistryContext` so dynamically registered shortcuts
 * (via `useRegisterShortcut`) are picked up automatically.
 */
export function useRegisteredShortcuts(): void {
  const { entries } = useShortcutRegistry();

  useEffect(() => {
    const active = entries.filter(
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

      for (const entry of active) {
        if (e.key === entry.triggerKey) {
          e.preventDefault();
          entry.handler!(e);
          break;
        }
      }
    };

    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [entries]);
}
