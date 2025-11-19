import type { IBookStore } from "../stores/IBookStore";
import type { INotificationStore } from "../stores/INotificationStore";
import type { IUIStore } from "../stores/IUIStore";
import type { IUserStore } from "../stores/IUserStore";

interface IStoreFactory {
  createNotificationStore(): INotificationStore;
  createUserStore(): IUserStore;
  createUIStore(): IUIStore;
  createBookStore(): IBookStore;
  useNotificationStore: <T>(selector: (state: INotificationStore) => T) => T;
  useUserStore: <T>(selector: (state: IUserStore) => T) => T;
  useUIStore: <T>(selector: (state: IUIStore) => T) => T;
  useBookStore: <T>(selector: (state: IBookStore) => T) => T;
}

export type { IStoreFactory };
