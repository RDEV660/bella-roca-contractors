import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./locales/en").then((m) => m.en),
  es: () => import("./locales/es").then((m) => m.es),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export { dictionaries };
