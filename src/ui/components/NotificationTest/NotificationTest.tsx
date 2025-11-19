import { container } from "../../../infrastructure/di";
import NotificationInline from "../NotificationInline";
import styles from "./NotificationTest.module.css";

function NotificationTest() {
  const notificationService = container.notificationService;

  const showSuccessNotification = () => {
    notificationService.showNotification(
      "Operation completed successfully!",
      "success",
      "notification",
      "test"
    );
  };

  const showWarningNotification = () => {
    notificationService.showNotification(
      "This is a warning message. Please be careful!",
      "warning",
      "notification",
      "test"
    );
  };

  const showDangerNotification = () => {
    notificationService.showNotification(
      "An error occurred. Please try again.",
      "danger",
      "notification",
      "test"
    );
  };

  const showSuccessModal = () => {
    notificationService.showModal(
      "Your changes have been saved successfully!",
      "success",
      {
        context: "test",
      }
    );
  };

  const showWarningModal = () => {
    notificationService.showModal(
      "You have unsaved changes. Do you want to continue?",
      "warning",
      { context: "test" }
    );
  };

  const showDangerModal = () => {
    notificationService.showModal(
      "A critical error has occurred. Please contact support.",
      "danger",
      { context: "test" }
    );
  };

  const showAskModal = () => {
    notificationService.showModal(
      "Are you sure you want to delete this item? This action cannot be undone.",
      "danger",
      {
        context: "test",
        actionButtonText: "Delete",
        onAction: () => {
          console.log("Item deleted!");
          notificationService.showNotification(
            "Item successfully deleted",
            "success",
            "notification"
          );
        },
      }
    );
  };

  const showWarningAskModal = () => {
    notificationService.showModal(
      "Do you want to save your changes before leaving?",
      "warning",
      {
        context: "test",
        actionButtonText: "Save Changes",
        onAction: () => {
          console.log("Changes saved!");
          notificationService.showNotification(
            "Changes saved successfully",
            "success",
            "notification"
          );
        },
      }
    );
  };

  const showSuccessInline = () => {
    notificationService.showNotification(
      "Inline success message!",
      "success",
      "inline",
      "test-inline"
    );
  };

  const showWarningInline = () => {
    notificationService.showNotification(
      "Inline warning message!",
      "warning",
      "inline",
      "test-inline"
    );
  };

  const showDangerInline = () => {
    notificationService.showNotification(
      "Inline error message!",
      "danger",
      "inline",
      "test-inline"
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Notification System Test</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Toast Notifications</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.successButton}`}
            onClick={showSuccessNotification}
          >
            Success Toast
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningNotification}
          >
            Warning Toast
          </button>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showDangerNotification}
          >
            Danger Toast
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Info Modals (OK button)</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.successButton}`}
            onClick={showSuccessModal}
          >
            Success Info
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningModal}
          >
            Warning Info
          </button>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showDangerModal}
          >
            Danger Info
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Ask Modals (Action + Cancel)</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showAskModal}
          >
            Delete Confirmation
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningAskModal}
          >
            Save Confirmation
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Inline Notifications</h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.successButton}`}
            onClick={showSuccessInline}
          >
            Success Inline
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningInline}
          >
            Warning Inline
          </button>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showDangerInline}
          >
            Danger Inline
          </button>
        </div>
        <NotificationInline context="test-inline" />
      </div>
    </div>
  );
}

export default NotificationTest;
