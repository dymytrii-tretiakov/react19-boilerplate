import { create } from "zustand";
import type { User } from "../../domain/models/User";
import type { IUserStore } from "../../domain/stores/IUserStore";

const useUserStore = create<IUserStore>((set) => ({
  me: null,
  setMe: (me: User) => set(() => ({ me })),
}));

export { useUserStore };
