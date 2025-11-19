import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = lng;
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${
          i18n.language === "en" ? styles.active : ""
        }`}
        onClick={() => changeLanguage("en")}
        aria-pressed={i18n.language === "en"}
        aria-label="Switch to English"
      >
        English
      </button>
      <button
        className={`${styles.button} ${
          i18n.language === "es" ? styles.active : ""
        }`}
        onClick={() => changeLanguage("es")}
        aria-pressed={i18n.language === "es"}
        aria-label="Cambiar a Español"
      >
        Español
      </button>
    </div>
  );
}

export default LanguageSwitcher;
