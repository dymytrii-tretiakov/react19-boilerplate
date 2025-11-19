import { createRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import type { NotificationSeverity } from "../../../domain/models/Notification";
import { storeFactory } from "../../../infrastructure/factories/StoreFactory";
import styles from "./NotificationToast.module.css";

const severityTitles: Record<NotificationSeverity, string> = {
  danger: "Error",
  warning: "Warning",
  success: "Success",
};

function NotificationToast() {
  const notifications = storeFactory.useNotificationStore(
    (state) => state.notifications
  );
  const removeNotification = storeFactory.useNotificationStore(
    (state) => state.removeNotification
  );

  const toastNotifications = useMemo(
    () => notifications.filter((n) => n.type === "notification"),
    [notifications]
  );

  return (
    <div
      className={styles.container}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-atomic="false"
    >
      <TransitionGroup component={null}>
        {toastNotifications.map((notification) => {
          const nodeRef = createRef<HTMLDivElement>();

          return (
            <CSSTransition
              key={notification.id}
              timeout={300}
              classNames={{
                enter: styles.toastEnter,
                enterActive: styles.toastEnterActive,
                exit: styles.toastExit,
                exitActive: styles.toastExitActive,
              }}
              nodeRef={nodeRef}
            >
              <div
                ref={nodeRef}
                className={`${styles.toast} ${styles[notification.severity]}`}
                role="alert"
                aria-live="assertive"
              >
                <div className={styles.content}>
                  <div className={styles.textContent}>
                    <strong className={styles.title}>
                      {severityTitles[notification.severity]}
                    </strong>
                    {notification.context && (
                      <span className={styles.context}>
                        {" "}
                        ({notification.context})
                      </span>
                    )}
                    <p className={styles.message}>{notification.message}</p>
                  </div>
                  <button
                    className={styles.closeButton}
                    onClick={() => removeNotification(notification.id)}
                    aria-label={`Close ${severityTitles[
                      notification.severity
                    ].toLowerCase()} notification`}
                  >
                    ×
                  </button>
                </div>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
}

export default NotificationToast;
