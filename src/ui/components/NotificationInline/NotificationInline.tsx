import { useMemo } from "react";
import type { NotificationType } from "../../../domain/models/Notification";
import { storeFactory } from "../../../infrastructure/factories/StoreFactory";
import styles from "./NotificationInline.module.css";

type NotificationInlineProps = {
  context: string;
  type?: NotificationType;
};

function NotificationInline({
  context,
  type = "inline",
}: NotificationInlineProps) {
  const notifications = storeFactory.useNotificationStore(
    (state) => state.notifications
  );
  const removeNotification = storeFactory.useNotificationStore(
    (state) => state.removeNotification
  );

  const notification = useMemo(
    () => notifications.find((n) => n.context === context && n.type === type),
    [notifications, context, type]
  );

  if (!notification) {
    return null;
  }

  return (
    <div className={`${styles.notification} ${styles[notification.severity]}`}>
      <span className={styles.message}>{notification.message}</span>
      <button
        className={styles.closeButton}
        onClick={() => removeNotification(notification.id)}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default NotificationInline;
