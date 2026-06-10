import { useEffect } from "react";

export function useEscapeKey(handler: (() => void) | null) {
  useEffect(() => {
    if (!handler) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handler();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handler]);
}
