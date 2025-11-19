import { create } from "zustand";
import type { Notification } from "../../domain/models/Notification";
import type { INotificationStore } from "../../domain/stores/INotificationStore";

const useNotificationStore = create<INotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification: Notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),
}));

export { useNotificationStore };
