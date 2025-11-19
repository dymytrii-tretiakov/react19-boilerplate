type NotificationType = "inline" | "notification" | "modal";
type NotificationSeverity = "success" | "warning" | "danger";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  severity: NotificationSeverity;
  code?: string;
  timestamp: number;
  context?: string; // Which operation occurred (e.g., "loadMe", "saveUser")
} & (
  | {
      // Ask modal - requires both action button text and handler
      actionButtonText: string;
      onAction: () => void;
    }
  | {
      // Info modal or other types - neither should be present
      actionButtonText?: never;
      onAction?: never;
    }
);

export type { Notification, NotificationSeverity, NotificationType };
