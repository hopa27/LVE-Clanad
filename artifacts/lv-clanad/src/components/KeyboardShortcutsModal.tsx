import { useRef } from "react";
import { MdClose, MdKeyboard } from "react-icons/md";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useEscapeKey } from "../hooks/useEscapeKey";
import { SHORTCUT_SECTIONS } from "../shortcuts";

function Key({ children }: { children: string }) {
  return (
    <kbd className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded border border-[#c8d6e0] bg-[#f0f5f9] text-[#00263e] font-['Mulish'] text-[12px] font-semibold shadow-[0_1px_0_rgba(0,0,0,0.15)] select-none">
      {children}
    </kbd>
  );
}

export function KeyboardShortcutsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, open);
  useEscapeKey(open ? onClose : null);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30"
    >
      <div
        ref={containerRef}
        className="lve-panel w-[480px] max-h-[90vh] bg-white flex flex-col"
      >
        <header className="lve-panel-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdKeyboard size={18} />
            <span>Keyboard Shortcuts</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close keyboard shortcuts"
            className="rounded p-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-y-auto flex-1">
          {SHORTCUT_SECTIONS.map((section) => (
            <section key={section.heading} className="mb-6 last:mb-0">
              <h3 className="font-['Livvic'] text-[11px] font-semibold uppercase tracking-wider text-[#005a9c] mb-3 pb-1 border-b border-[#e0eaf0]">
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.shortcuts.map((s) => (
                  <li
                    key={s.description}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="font-['Mulish'] text-[13px] text-[#3d3d3d]">
                      {s.description}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      {s.keys.map((k, i) => (
                        <span key={k} className="flex items-center gap-1">
                          {i > 0 && (
                            <span className="font-['Mulish'] text-[11px] text-[#888] mx-0.5">
                              +
                            </span>
                          )}
                          <Key>{k}</Key>
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className="mt-6 font-['Mulish'] text-[11px] text-[#888] border-t border-[#e0eaf0] pt-4">
            Press <Key>?</Key> anywhere (outside a text input) to toggle this panel.
          </p>
        </div>
      </div>
    </div>
  );
}
