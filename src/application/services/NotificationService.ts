import type {
  Notification,
  NotificationSeverity,
  NotificationType,
} from "../../domain/models/Notification";
import type { INotificationService } from "../../domain/services/INotificationService";
import type { INotificationStore } from "../../domain/stores/INotificationStore";

class NotificationService implements INotificationService {
  private notificationStore: INotificationStore;

  constructor(notificationStore: INotificationStore) {
    this.notificationStore = notificationStore;
  }

  showNotification(
    message: string,
    severity: NotificationSeverity,
    type: NotificationType,
    context?: string
  ): void {
    const notification: Notification = {
      id: crypto.randomUUID(),
      message,
      severity,
      type,
      timestamp: Date.now(),
      context,
    };

    this.notificationStore.addNotification(notification);

    // Auto-clear notification type after 5 seconds
    if (type === "notification") {
      setTimeout(() => {
        this.notificationStore.removeNotification(notification.id);
      }, 5000);
    }
  }

  showToast(
    message: string,
    severity: NotificationSeverity,
    context?: string
  ): void {
    const notification: Notification = {
      id: crypto.randomUUID(),
      message,
      severity,
      type: "notification",
      timestamp: Date.now(),
      context,
    };

    this.notificationStore.addNotification(notification);

    // Auto-clear toast after 5 seconds
    setTimeout(() => {
      this.notificationStore.removeNotification(notification.id);
    }, 5000);
  }

  showInline(
    message: string,
    severity: NotificationSeverity,
    context: string
  ): void {
    const notification: Notification = {
      id: crypto.randomUUID(),
      message,
      severity,
      type: "inline",
      timestamp: Date.now(),
      context,
    };

    this.notificationStore.addNotification(notification);
  }

  showModal(
    message: string,
    severity: NotificationSeverity,
    options?: {
      context?: string;
      actionButtonText?: string;
      onAction?: () => void;
    }
  ): void {
    // Validate that both actionButtonText and onAction are present or both absent
    const hasActionButton = options?.actionButtonText !== undefined;
    const hasOnAction = options?.onAction !== undefined;

    if (hasActionButton !== hasOnAction) {
      throw new Error(
        "Both actionButtonText and onAction must be provided together for ask modals, or neither for info modals"
      );
    }

    const notification: Notification =
      hasActionButton && hasOnAction
        ? {
            id: crypto.randomUUID(),
            message,
            severity,
            type: "modal",
            timestamp: Date.now(),
            context: options?.context,
            actionButtonText: options.actionButtonText!,
            onAction: options.onAction!,
          }
        : {
            id: crypto.randomUUID(),
            message,
            severity,
            type: "modal",
            timestamp: Date.now(),
            context: options?.context,
          };

    this.notificationStore.addNotification(notification);
  }

  handleError(error: unknown, type: NotificationType, context?: string): void {
    const notification: Notification = {
      id: crypto.randomUUID(),
      message: this.extractErrorMessage(error),
      severity: "danger",
      type,
      code: this.extractErrorCode(error),
      timestamp: Date.now(),
      context,
    };

    this.notificationStore.addNotification(notification);

    // Auto-clear notification errors after 5 seconds
    if (type === "notification") {
      setTimeout(() => {
        this.notificationStore.removeNotification(notification.id);
      }, 5000);
    }
  }

  clearNotification(id: string): void {
    this.notificationStore.removeNotification(id);
  }

  clearAllNotifications(): void {
    this.notificationStore.clearNotifications();
  }

  private extractErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      return error.message;
    }
    return "An unexpected error occurred";
  }

  private extractErrorCode(error: unknown): string | undefined {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      typeof error.code === "string"
    ) {
      return error.code;
    }
    return undefined;
  }
}

export { NotificationService };
