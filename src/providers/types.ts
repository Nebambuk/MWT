export interface DictionaryEntry {
  pos: string;
  terms: string[];
}

export interface TranslationResult {
  text: string;
  originalText: string;
  detectedLang?: string;
  dictionary?: DictionaryEntry[];
}

export interface ITranslatorProvider {
  name: string;
  translate(
    text: string,
    sourceLang: string,
    targetLang: string,
  ): Promise<TranslationResult>;
}
