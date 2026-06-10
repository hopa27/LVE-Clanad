import {
  createContext,
  useCallback,
  useContext,
  useId,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SHORTCUT_SECTIONS, type ShortcutSection } from "../shortcuts";

export interface RegisterShortcutOptions {
  section: string;
  keys: string[];
  description: string;
  triggerKey?: string;
  handler?: (e: KeyboardEvent) => void;
}

interface RegistryEntry extends RegisterShortcutOptions {
  id: string;
}

interface ShortcutRegistryContextValue {
  sections: ShortcutSection[];
  entries: RegistryEntry[];
  registerShortcut: (opts: RegisterShortcutOptions) => () => void;
}

const ShortcutRegistryContext = createContext<ShortcutRegistryContextValue | null>(null);

function seedEntries(): RegistryEntry[] {
  return SHORTCUT_SECTIONS.flatMap((sec) =>
    sec.shortcuts.map((s, i) => ({
      id: `seed:${sec.heading}:${i}`,
      section: sec.heading,
      ...s,
    }))
  );
}

function entriesToSections(entries: RegistryEntry[]): ShortcutSection[] {
  const order: string[] = [];
  const map = new Map<string, ShortcutSection>();

  for (const e of entries) {
    if (!map.has(e.section)) {
      order.push(e.section);
      map.set(e.section, { heading: e.section, shortcuts: [] });
    }
    map.get(e.section)!.shortcuts.push({
      keys: e.keys,
      description: e.description,
      triggerKey: e.triggerKey,
      handler: e.handler,
    });
  }

  return order.map((h) => map.get(h)!);
}

export function ShortcutRegistryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<RegistryEntry[]>(seedEntries);

  const registerShortcut = useCallback((opts: RegisterShortcutOptions): (() => void) => {
    const id = `dynamic:${opts.section}:${opts.description}:${Math.random().toString(36).slice(2)}`;
    const entry: RegistryEntry = { id, ...opts };
    setEntries((prev) => [...prev, entry]);
    return () => setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const sections = entriesToSections(entries);

  return (
    <ShortcutRegistryContext.Provider value={{ sections, entries, registerShortcut }}>
      {children}
    </ShortcutRegistryContext.Provider>
  );
}

export function useShortcutRegistry(): ShortcutRegistryContextValue {
  const ctx = useContext(ShortcutRegistryContext);
  if (!ctx) {
    throw new Error("useShortcutRegistry must be used inside ShortcutRegistryProvider");
  }
  return ctx;
}

/**
 * Call inside a component to register a keyboard shortcut for the lifetime of
 * the component.  The shortcut is automatically removed when the component
 * unmounts.
 *
 * Changing `opts` identity on every render would cause churn; wrap the value in
 * `useMemo` / define it outside the component if it never changes.
 */
export function useRegisterShortcut(opts: RegisterShortcutOptions): void {
  const { registerShortcut } = useShortcutRegistry();

  const optsRef = useRef(opts);
  optsRef.current = opts;

  useEffect(() => {
    const cleanup = registerShortcut(optsRef.current);
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerShortcut]);
}
