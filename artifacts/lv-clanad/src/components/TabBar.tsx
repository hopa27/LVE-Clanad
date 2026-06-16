import { useEffect, useRef, useState, type RefObject } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { usePlanCode } from "../context/PlanCodeContext";

export type TabKey =
  | "application"
  | "annuitant"
  | "contacts"
  | "contacts2"
  | "policy"
  | "bank"
  | "payments"
  | "increase"
  | "quote"
  | "diary"
  | "notes"
  | "letters"
  | "events"
  | "maturities"
  | "loa";

export const TABS: { key: TabKey; label: string }[] = [
  { key: "application", label: "Application Details" },
  { key: "annuitant", label: "Annuitant(s) Details" },
  { key: "contacts", label: "Contacts" },
  { key: "contacts2", label: "Contacts" },
  { key: "policy", label: "Policy Details" },
  { key: "bank", label: "Bank Acc Details" },
  { key: "payments", label: "Payments" },
  { key: "increase", label: "Increase History" },
  { key: "quote", label: "Quote Details" },
  { key: "diary", label: "Diary & Audit Trail" },
  { key: "notes", label: "Notes" },
  { key: "letters", label: "Letters" },
  { key: "events", label: "Events" },
  { key: "maturities", label: "Maturities / Surrender" },
  { key: "loa", label: "LOA/POA" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const SCROLL_STEP = 220;

export function TabBar({
  activeTab,
  onChange,
  panelRef,
  activeTabRef,
}: {
  activeTab: TabKey;
  onChange: (key: TabKey) => void;
  panelRef?: RefObject<HTMLElement | null>;
  activeTabRef?: RefObject<HTMLButtonElement | null>;
}) {
  const { planCode } = usePlanCode();
  const listRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateArrows();

    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += delta;
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -SCROLL_STEP : SCROLL_STEP, behavior: "smooth" });
  };

  const visibleTabs =
    planCode === "611" || planCode === "61a"
      ? TABS.filter((t) => t.key !== "contacts" && t.key !== "contacts2")
      : planCode === "87" || planCode === "84" || planCode === "90" || planCode === "51" || planCode === "80" || planCode === "82" || planCode === "621" || planCode === "62a" || planCode === "52"
      ? TABS.filter((t) => t.key !== "contacts" && t.key !== "contacts2")
      : planCode === "83" || planCode === "76"
      ? TABS.filter((t) => t.key !== "contacts2")
      : TABS;

  const activeIdx = visibleTabs.findIndex((t) => t.key === activeTab);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const buttons = listRef.current
      ? Array.from(listRef.current.querySelectorAll<HTMLButtonElement>("button[role='tab']"))
      : [];
    if (!buttons.length) return;

    if (e.key === "Tab" && !e.shiftKey) {
      if (panelRef?.current) {
        const firstFocusable = panelRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        if (firstFocusable) {
          e.preventDefault();
          firstFocusable.focus();
          return;
        }
      }
      return;
    }

    let nextIdx = activeIdx;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextIdx = (activeIdx + 1) % visibleTabs.length;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextIdx = (activeIdx - 1 + visibleTabs.length) % visibleTabs.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIdx = visibleTabs.length - 1;
    } else {
      return;
    }

    onChange(visibleTabs[nextIdx].key);
    buttons[nextIdx]?.focus();
  };

  return (
    <div className="flex items-end gap-1">
      <button
        type="button"
        aria-label="Scroll tabs left"
        onClick={() => scrollBy("left")}
        disabled={!canScrollLeft}
        className="flex-shrink-0 self-center mb-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#04589b] text-[#04589b] bg-white hover:bg-[#eaf5f8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <MdChevronLeft size={20} />
      </button>

      <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-hidden">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Policy tabs"
          className="flex flex-row gap-4 min-w-max"
          onKeyDown={handleKeyDown}
        >
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                ref={isActive ? activeTabRef : undefined}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                type="button"
                className={`lve-tab ${isActive ? "active" : ""}`}
                onClick={() => onChange(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll tabs right"
        onClick={() => scrollBy("right")}
        disabled={!canScrollRight}
        className="flex-shrink-0 self-center mb-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#04589b] text-[#04589b] bg-white hover:bg-[#eaf5f8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <MdChevronRight size={20} />
      </button>
    </div>
  );
}
