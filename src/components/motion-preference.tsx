"use client";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Accessibility } from "lucide-react";
import { useT } from "@/i18n/provider";
const KEY = "tfl-motion";
let memoryValue = false;
const EVENT = "tfl-motion-change";
const subscribe = (notify: () => void) => {
  window.addEventListener(EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(EVENT, notify);
    window.removeEventListener("storage", notify);
  };
};
const read = () => {
  try {
    return localStorage.getItem(KEY) === "reduced";
  } catch {
    return memoryValue;
  }
};
const MotionPreference = createContext<{
  reduced: boolean;
  setReduced: (value: boolean) => void;
}>({ reduced: false, setReduced: () => {} });
export function MotionPreferenceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const reduced = useSyncExternalStore(subscribe, read, () => false);
  const setReduced = (value: boolean) => {
    memoryValue = value;
    try {
      localStorage.setItem(KEY, value ? "reduced" : "full");
    } catch {}
    document.documentElement.classList.toggle("reduce-motion", value);
    window.dispatchEvent(new Event(EVENT));
  };
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);
  return (
    <MotionPreference.Provider value={{ reduced, setReduced }}>
      {children}
    </MotionPreference.Provider>
  );
}
export const useMotionPreference = () => useContext(MotionPreference);
export function MotionPreferenceControl() {
  const tr = useT();
  const { reduced, setReduced } = useMotionPreference();
  return (
    <button
      className="motion-preference"
      role="switch"
      aria-checked={reduced}
      onClick={() => setReduced(!reduced)}
    >
      <Accessibility size={16} />
      <span>{tr("Reducir animaciones")}</span>
      <span className="preference-switch" aria-hidden="true">
        <i />
      </span>
    </button>
  );
}
