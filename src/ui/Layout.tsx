import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import LanguageSwitcher from "./components/LanguageSwitcher";
import NotificationModal from "./components/NotificationModal";
import NotificationToast from "./components/NotificationToast";

function Layout() {
  const { t } = useTranslation();

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("navigation.skipToMain")}
      </a>
      <LanguageSwitcher />
      <NotificationToast />
      <NotificationModal />
      <main id="main-content" role="main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
