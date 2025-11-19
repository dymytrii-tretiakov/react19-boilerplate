import type { IStoreFactory } from "../../domain/factories/IStoreFactory";
import type { IBookStore } from "../../domain/stores/IBookStore";
import type { INotificationStore } from "../../domain/stores/INotificationStore";
import type { IUIStore } from "../../domain/stores/IUIStore";
import type { IUserStore } from "../../domain/stores/IUserStore";
import { useBookStore } from "../stores/BookStore";
import { useNotificationStore } from "../stores/NotificationStore";
import { useUIStore } from "../stores/UIStore";
import { useUserStore } from "../stores/UserStore";

const storeFactory: IStoreFactory = {
  createNotificationStore(): INotificationStore {
    return useNotificationStore.getState();
  },

  createUserStore(): IUserStore {
    return useUserStore.getState();
  },

  createUIStore: function (): IUIStore {
    return useUIStore.getState();
  },

  createBookStore: function (): IBookStore {
    return useBookStore.getState();
  },

  useNotificationStore<T>(selector: (state: INotificationStore) => T): T {
    return useNotificationStore(selector);
  },

  useUserStore<T>(selector: (state: IUserStore) => T): T {
    return useUserStore(selector);
  },

  useUIStore: function <T>(selector: (state: IUIStore) => T): T {
    return useUIStore(selector);
  },

  useBookStore: function <T>(selector: (state: IBookStore) => T): T {
    return useBookStore(selector);
  },
};

export { storeFactory };
