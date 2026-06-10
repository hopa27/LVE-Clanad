import { useEffect } from "react";

const handlerStack: Array<() => void> = [];

function onDocumentKeyDown(e: KeyboardEvent) {
  if (e.key !== "Escape") return;
  const top = handlerStack[handlerStack.length - 1];
  if (top) {
    e.stopPropagation();
    top();
  }
}

document.addEventListener("keydown", onDocumentKeyDown, true);

export function useEscapeKey(handler: (() => void) | null) {
  useEffect(() => {
    if (!handler) return;
    handlerStack.push(handler);
    return () => {
      const idx = handlerStack.lastIndexOf(handler);
      if (idx !== -1) handlerStack.splice(idx, 1);
    };
  }, [handler]);
}
