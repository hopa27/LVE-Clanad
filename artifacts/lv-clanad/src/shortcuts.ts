export interface ShortcutEntry {
  /** Display labels rendered in the help panel (e.g. ["Shift", "Tab"]). */
  keys: string[];
  /** Human-readable description shown in the help panel. */
  description: string;
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
