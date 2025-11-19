import type { User } from "../models/User";

type UserStoreState = {
  me: User | null;
};

type UserStoreActions = {
  setMe: (user: User) => void;
};

type IUserStore = UserStoreState & UserStoreActions;

export type { IUserStore };
