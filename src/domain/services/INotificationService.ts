import type {
  NotificationSeverity,
  NotificationType,
} from "../models/Notification";

interface INotificationService {
  showNotification(
    message: string,
    severity: NotificationSeverity,
    type: NotificationType,
    context?: string
  ): void;
  showToast(
    message: string,
    severity: NotificationSeverity,
    context?: string
  ): void;
  showInline(
    message: string,
    severity: NotificationSeverity,
    context: string
  ): void;
  showModal(
    message: string,
    severity: NotificationSeverity,
    options?: {
      context?: string;
      actionButtonText?: string;
      onAction?: () => void;
    }
  ): void;
  handleError(error: unknown, type: NotificationType, context?: string): void;
  clearNotification(id: string): void;
  clearAllNotifications(): void;
}

export type { INotificationService };
