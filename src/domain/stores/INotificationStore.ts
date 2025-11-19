import type { Notification } from "../models/Notification";

type NotificationStoreState = {
  notifications: Notification[];
};

type NotificationStoreActions = {
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};

type INotificationStore = NotificationStoreState & NotificationStoreActions;

export type { INotificationStore };
