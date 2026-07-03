import type { ITranslatorProvider } from "./types";
import { googleProvider } from "./google";
import { yandexProvider } from "./yandex";

const providers: Record<string, ITranslatorProvider> = {
  google: googleProvider,
  yandex: yandexProvider,
};

export const getProvider = (name: string): ITranslatorProvider => {
  return providers[name] || providers["google"];
};

export const getAvailableProviders = (): string[] => {
  return Object.keys(providers);
};
