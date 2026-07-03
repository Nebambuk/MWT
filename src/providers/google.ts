import type {
  ITranslatorProvider,
  TranslationResult,
  DictionaryEntry,
} from "./types";

export const googleProvider: ITranslatorProvider = {
  name: "google",
  async translate(text, sourceLang, targetLang): Promise<TranslationResult> {
    const sl = sourceLang === "auto" ? "auto" : sourceLang;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${targetLang}&dt=t&dt=bd&q=${encodeURIComponent(text)}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Network error");

    const data = await response.json();

    let translatedText = "";
    if (data[0]) {
      data[0].forEach((sentence: any) => {
        if (sentence[0]) translatedText += sentence[0];
      });
    }

    let dictionary: DictionaryEntry[] | undefined;
    if (data[1]) {
      dictionary = data[1].map((item: any) => ({
        pos: item[0],
        terms: item[1],
      }));
    }

    return {
      text: translatedText,
      originalText: text,
      detectedLang: data[2],
      dictionary,
    };
  },
};
