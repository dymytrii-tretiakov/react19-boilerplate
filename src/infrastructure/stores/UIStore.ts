import { create } from "zustand";
import type { IUIStore } from "../../domain/stores/IUIStore";

const useUIStore = create<IUIStore>((set, get) => ({
  hideName: false,
  toggleHideName: () => set(() => ({ hideName: !get().hideName })),
}));

export { useUIStore };
