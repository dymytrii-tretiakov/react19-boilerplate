import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import type {
  Notification,
  NotificationSeverity,
} from "../../../domain/models/Notification";
import { storeFactory } from "../../../infrastructure/factories/StoreFactory";
import styles from "./NotificationModal.module.css";

const severityTitles: Record<NotificationSeverity, string> = {
  danger: "Error",
  warning: "Warning",
  success: "Success",
};

function NotificationModal() {
  const notifications = storeFactory.useNotificationStore(
    (state) => state.notifications
  );
  const removeNotification = storeFactory.useNotificationStore(
    (state) => state.removeNotification
  );

  const modalNotifications = useMemo(
    () => notifications.filter((n) => n.type === "modal"),
    [notifications]
  );

  const [displayedNotification, setDisplayedNotification] =
    useState<Notification | null>(null);
  const hasNotification = modalNotifications.length > 0;
  const nodeRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Update displayed notification when new one arrives
  const currentNotification = modalNotifications[0];
  if (
    currentNotification &&
    currentNotification.id !== displayedNotification?.id
  ) {
    setDisplayedNotification(currentNotification);
  }

  const notification = displayedNotification;
  const isAskModal = notification?.actionButtonText && notification?.onAction;

  // Focus management
  useEffect(() => {
    if (hasNotification) {
      // Store current focused element
      previousActiveElementRef.current = document.activeElement as HTMLElement;

      // Focus the modal
      const modalElement = nodeRef.current?.querySelector(
        '[role="dialog"]'
      ) as HTMLElement;
      if (modalElement) {
        setTimeout(() => modalElement.focus(), 100);
      }
    } else {
      // Restore focus when modal closes
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    }
  }, [hasNotification]);

  // Focus trap
  useEffect(() => {
    if (!hasNotification) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const modalElement = nodeRef.current?.querySelector('[role="dialog"]');
      if (!modalElement) return;

      const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, [hasNotification]);

  const handleAction = () => {
    if (notification?.onAction) {
      notification.onAction();
    }
    if (notification) {
      removeNotification(notification.id);
    }
  };

  const handleCancel = () => {
    if (notification) {
      removeNotification(notification.id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasNotification) return;

      if (e.key === "Escape" && !isAskModal) {
        handleCancel();
      } else if (
        e.key === "Enter" &&
        document.activeElement?.tagName !== "BUTTON"
      ) {
        if (isAskModal) {
          handleAction();
        } else {
          handleCancel();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hasNotification, notification, isAskModal]);

  return (
    <CSSTransition
      in={hasNotification}
      timeout={300}
      classNames={{
        enter: styles.overlayEnter,
        enterActive: styles.overlayEnterActive,
        exit: styles.overlayExit,
        exitActive: styles.overlayExitActive,
      }}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className={styles.overlay}
        onClick={!isAskModal ? handleCancel : undefined}
        role="presentation"
      >
        <div
          className={`${styles.modal} ${
            notification?.severity
              ? styles[notification.severity]
              : styles.danger
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-message"
          tabIndex={-1}
        >
          {notification && (
            <>
              <div className={styles.header}>
                <h2 id="modal-title" className={styles.title}>
                  {severityTitles[notification.severity]}
                </h2>
                <button
                  className={styles.closeButton}
                  onClick={handleCancel}
                  aria-label="Close notification dialog"
                >
                  ×
                </button>
              </div>
              {notification.context && (
                <p className={styles.context}>
                  Context: {notification.context}
                </p>
              )}
              <p id="modal-message" className={styles.message}>
                {notification.message}
              </p>
              {notification.code && (
                <p className={styles.code}>Code: {notification.code}</p>
              )}
              <div className={styles.footer}>
                {isAskModal && (
                  <button
                    className={`${styles.button} ${styles.cancelButton}`}
                    onClick={handleCancel}
                    aria-label="Cancel action"
                  >
                    Cancel
                  </button>
                )}
                <button
                  className={`${styles.button} ${styles.actionButton}`}
                  onClick={isAskModal ? handleAction : handleCancel}
                  aria-label={
                    isAskModal
                      ? notification.actionButtonText || "Confirm action"
                      : "Close notification"
                  }
                >
                  {isAskModal
                    ? notification.actionButtonText || "Confirm"
                    : "OK"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </CSSTransition>
  );
}

export default NotificationModal;
