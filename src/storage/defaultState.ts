export const defaultState = {
  theme: "system" as "system" | "light" | "dark",
  defaultProvider: "google",
  favoriteProviders: ["google", "yandex"],
  showProviderPanel: true,
  sourceLang: "auto",
  targetLang: "en",
};

export type AppState = typeof defaultState;
