// Import this module only from server code. Client code receives its dictionary
// through LocaleProvider, so Spanish pages never bundle the English catalog.
import en from "./en.json";
import {
  translate as translateWithDictionary,
  translator as translatorWithDictionary,
  type Dictionary,
  type Locale,
} from "./shared";

const spanishDictionary: Dictionary = Object.freeze({});
export const dictionaryForLocale = (locale: Locale): Dictionary =>
  locale === "en" ? en : spanishDictionary;

export const translate = (key: string, locale: Locale) =>
  translateWithDictionary(key, locale, dictionaryForLocale(locale));

export const translator = (locale: Locale) =>
  translatorWithDictionary(locale, dictionaryForLocale(locale));
