import { useEffect } from "react";
import { container } from "../../../infrastructure/di";
import styles from "./Me.module.css";

function Me() {
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
        Loading...
      </div>
    );
  }

  return (
    <section
      className={styles.container}
      aria-labelledby="user-profile-heading"
    >
      <h1 id="user-profile-heading" className={styles.title}>
        Me
      </h1>
      <div className={styles.info}>
        <p className={styles.infoItem}>
          <span className={styles.label}>Email:</span> {me.email}
        </p>
        {!hideName && (
          <p className={styles.infoItem} aria-live="polite">
            <span className={styles.label}>Name:</span> {me.fistName}{" "}
            {me.lastName}
          </p>
        )}
      </div>
      <button
        className={styles.toggleButton}
        onClick={toggleHideName}
        aria-pressed={!hideName}
        aria-label={hideName ? "Show your name" : "Hide your name"}
      >
        {hideName ? "Show name" : "Hide name"}
      </button>
    </section>
  );
}

export default Me;
