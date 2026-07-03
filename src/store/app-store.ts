import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

// Key used to persist the OpenAI key in sessionStorage (cleared when the tab closes).
export const OPENAI_KEY_STORAGE = "openai_key";

interface AppState {
  // Theme
  theme: Theme;

  // User-supplied OpenAI key (sessionStorage-backed; NOT in the persisted localStorage state)
  openaiKey: string;
  setOpenaiKey: (k: string) => void;

  // Query settings
  topK: number;
  setTopK: (k: number) => void;

  // Artifacts pane
  artifactsPaneOpen: boolean;
  toggleArtifactsPane: () => void;
  activeArtifactTab: "results" | "trace";
  setActiveArtifactTab: (tab: "results" | "trace") => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      theme: "dark",

      // OpenAI key — hydrated from sessionStorage at store creation (client only), write-through on set.
      // Excluded from the persisted (localStorage) partition below.
      openaiKey:
        typeof window !== "undefined"
          ? window.sessionStorage.getItem(OPENAI_KEY_STORAGE) ?? ""
          : "",
      setOpenaiKey: (k) => {
        if (typeof window !== "undefined") {
          if (k) window.sessionStorage.setItem(OPENAI_KEY_STORAGE, k);
          else window.sessionStorage.removeItem(OPENAI_KEY_STORAGE);
        }
        set({ openaiKey: k });
      },

      // Query settings
      topK: 5,
      setTopK: (k) => set({ topK: k }),

      // Artifacts pane
      artifactsPaneOpen: true,
      toggleArtifactsPane: () => set((state) => ({ artifactsPaneOpen: !state.artifactsPaneOpen })),
      activeArtifactTab: "results",
      setActiveArtifactTab: (tab) => set({ activeArtifactTab: tab }),
    }),
    {
      name: "qdrant-demo-storage",
      partialize: (state) => ({
        theme: state.theme,
        topK: state.topK,
      }),
    }
  )
);
