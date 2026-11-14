"use client";
import { createContext, useContext, useMemo } from "react";
import { translator, type Dictionary, type Locale } from "./shared";
const Context = createContext<{ locale: Locale; dictionary: Dictionary }>({
  locale: "es",
  dictionary: {},
});
export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, dictionary }), [locale, dictionary]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useLocale = () => useContext(Context).locale;
export function useT() {
  const { locale, dictionary } = useContext(Context);
  return useMemo(() => translator(locale, dictionary), [locale, dictionary]);
}
