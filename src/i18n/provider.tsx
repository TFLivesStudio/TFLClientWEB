"use client";
import { createContext, useContext } from "react";
import { translator, type Locale } from "./shared";
const Context = createContext<Locale>("es");
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <Context.Provider value={locale}>{children}</Context.Provider>;
}
export const useLocale = () => useContext(Context);
export const useT = () => translator(useLocale());
