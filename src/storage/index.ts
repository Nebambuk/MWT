import { defaultState, type AppState } from "./defaultState";

export const storage = {
  async get<K extends keyof AppState>(key: K): Promise<AppState[K]> {
    const result = await chrome.storage.local.get(key);
    return result[key] !== undefined ? result[key] : defaultState[key];
  },

  async getAll(): Promise<AppState> {
    const result = await chrome.storage.local.get();
    return { ...defaultState, ...result };
  },

  async set<K extends keyof AppState>(
    key: K,
    value: AppState[K],
  ): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
  },

  async setAll(state: Partial<AppState>): Promise<void> {
    await chrome.storage.local.set(state);
  },

  onChange(callback: (changes: Partial<AppState>) => void): void {
    chrome.storage.local.onChanged.addListener((changes) => {
      const parsedChanges: Partial<AppState> = {};
      for (const [key, { newValue }] of Object.entries(changes)) {
        if (key in defaultState) {
          parsedChanges[key as keyof AppState] = newValue;
        }
      }
      callback(parsedChanges);
    });
  },
};
