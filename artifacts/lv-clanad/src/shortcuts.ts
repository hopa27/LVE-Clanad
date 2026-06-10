export interface ShortcutEntry {
  /** Display labels rendered in the help panel (e.g. ["Shift", "Tab"]). */
  keys: string[];
  /** Human-readable description shown in the help panel. */
  description: string;
  /**
   * Stable identifier for programmatic lookup (e.g. by toolbar buttons).
   * Components can call `getShortcutKeys(id)` to retrieve the display keys.
   */
  id?: string;
  /**
   * The `KeyboardEvent.key` value that triggers this shortcut globally.
   * Omit for shortcuts that are handled at the component level (e.g. arrow
   * keys inside the tab-bar) — they will still appear in the modal but will
   * not install a global listener.
   */
  triggerKey?: string;
  /**
   * Action to run when the shortcut fires.
   * Required when `triggerKey` is set; omit otherwise.
   */
  handler?: (e: KeyboardEvent) => void;
}

export interface ShortcutSection {
  heading: string;
  shortcuts: ShortcutEntry[];
}

/**
 * Central shortcut registry — the single source of truth for all keyboard
 * bindings in the app.  Both the global key-handler hook (`useRegisteredShortcuts`)
 * and `KeyboardShortcutsModal` consume this list, so adding an entry here is
 * all that is needed to both wire the behaviour and surface it in the help panel.
 *
 * Sections are displayed in the order they appear here.
 */
export const SHORTCUT_SECTIONS: ShortcutSection[] = [
  {
    heading: "Tab navigation",
    shortcuts: [
      { keys: ["←", "→"], description: "Move between tabs" },
      { keys: ["Home"], description: "Jump to first tab" },
      { keys: ["End"], description: "Jump to last tab" },
      { keys: ["Tab"], description: "Move focus into the tab panel" },
      { keys: ["Shift", "Tab"], description: "Return focus to the active tab" },
    ],
  },
  {
    heading: "Toolbar actions",
    shortcuts: [
      { id: "toolbar:new-app",  keys: ["N"], description: "New Application" },
      { id: "toolbar:edit",     keys: ["E"], description: "Edit / Save" },
      { id: "toolbar:cancel",   keys: ["X"], description: "Cancel edit" },
      { id: "toolbar:search",   keys: ["F"], description: "Find policy" },
      { id: "toolbar:log",      keys: ["L"], description: "Cheque log" },
      { id: "toolbar:crs",      keys: ["R"], description: "CRS" },
      { id: "toolbar:reports",  keys: ["T"], description: "Reports" },
      { id: "toolbar:company",  keys: ["O"], description: "Company selection" },
    ],
  },
  {
    heading: "General",
    shortcuts: [
      {
        keys: ["?"],
        description: "Open this keyboard shortcuts help",
        triggerKey: "?",
        handler: () => window.dispatchEvent(new Event("clanad:open-shortcuts")),
      },
      { keys: ["Esc"], description: "Close any open dialog or modal" },
    ],
  },
];

/**
 * Returns the display key labels for the shortcut with the given `id`, or
 * `undefined` if no entry with that id exists.
 *
 * Usage in toolbar tooltips:
 *   const keys = getShortcutKeys("toolbar:edit"); // ["E"]
 */
export function getShortcutKeys(id: string): string[] | undefined {
  for (const section of SHORTCUT_SECTIONS) {
    for (const entry of section.shortcuts) {
      if (entry.id === id) return entry.keys;
    }
  }
  return undefined;
}
