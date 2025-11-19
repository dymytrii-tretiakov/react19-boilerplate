import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { container } from "../../../infrastructure/di";
import styles from "./Me.module.css";

function Me() {
  const { t } = useTranslation();
  const me = container.storeFactory.useUserStore((state) => state.me);
  const { toggleHideName, hideName } = container.storeFactory.useUIStore(
    (state) => state
  );

  useEffect(() => {
    container.userService.loadMe();
  }, []);

  if (!me) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        {t("common.loading")}
      </div>
    );
  }

  return (
    <section
      className={styles.container}
      aria-labelledby="user-profile-heading"
    >
      <h1 id="user-profile-heading" className={styles.title}>
        {t("user.title")}
      </h1>
      <div className={styles.info}>
        <p className={styles.infoItem}>
          <span className={styles.label}>{t("user.email")}</span> {me.email}
        </p>
        {!hideName && (
          <p className={styles.infoItem} aria-live="polite">
            <span className={styles.label}>{t("user.name")}</span> {me.fistName}{" "}
            {me.lastName}
          </p>
        )}
      </div>
      <button
        className={styles.toggleButton}
        onClick={toggleHideName}
        aria-pressed={!hideName}
        aria-label={
          hideName ? t("user.showNameLabel") : t("user.hideNameLabel")
        }
      >
        {hideName ? t("user.showName") : t("user.hideName")}
      </button>
    </section>
  );
}

export default Me;
