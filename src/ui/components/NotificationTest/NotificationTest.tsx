import { useTranslation } from "react-i18next";
import { container } from "../../../infrastructure/di";
import NotificationInline from "../NotificationInline";
import styles from "./NotificationTest.module.css";

function NotificationTest() {
  const { t } = useTranslation();
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
      <h2 className={styles.title}>{t("notificationTest.title")}</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {t("notificationTest.toastSection")}
        </h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.successButton}`}
            onClick={showSuccessNotification}
          >
            {t("notificationTest.successToast")}
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningNotification}
          >
            {t("notificationTest.warningToast")}
          </button>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showDangerNotification}
          >
            {t("notificationTest.dangerToast")}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {t("notificationTest.modalSection")}
        </h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.successButton}`}
            onClick={showSuccessModal}
          >
            {t("notificationTest.successInfo")}
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningModal}
          >
            {t("notificationTest.warningInfo")}
          </button>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showDangerModal}
          >
            {t("notificationTest.dangerInfo")}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {t("notificationTest.askModalSection")}
        </h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showAskModal}
          >
            {t("notificationTest.deleteConfirmation")}
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningAskModal}
          >
            {t("notificationTest.saveConfirmation")}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {t("notificationTest.inlineSection")}
        </h3>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.successButton}`}
            onClick={showSuccessInline}
          >
            {t("notificationTest.successInline")}
          </button>
          <button
            className={`${styles.button} ${styles.warningButton}`}
            onClick={showWarningInline}
          >
            {t("notificationTest.warningInline")}
          </button>
          <button
            className={`${styles.button} ${styles.dangerButton}`}
            onClick={showDangerInline}
          >
            {t("notificationTest.dangerInline")}
          </button>
        </div>
        <NotificationInline context="test-inline" />
      </div>
    </div>
  );
}

export default NotificationTest;
