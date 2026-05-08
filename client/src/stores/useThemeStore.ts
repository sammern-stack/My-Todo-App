import { create } from "zustand";

type themeTypes = {
  theme: "dark" | "light",
  toggleTheme: () => void,
}

export const useThemeStore = create<themeTypes>((set) => ({
  theme: "dark",
  toggleTheme: () => set((s) => ({ theme: s.theme === "light" ? "dark" : "light" }))
}))