import type { ITranslatorProvider, TranslationResult } from "./types";

export const yandexProvider: ITranslatorProvider = {
  name: "yandex",
  async translate(text, sourceLang, targetLang): Promise<TranslationResult> {
    return {
      text: `[Yandex Mock] ${text} -> ${targetLang}`,
      originalText: text,
      detectedLang: sourceLang === "auto" ? "en" : sourceLang,
    };
  },
};
