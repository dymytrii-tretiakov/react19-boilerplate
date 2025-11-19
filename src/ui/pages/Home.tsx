import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Me from "../components/Me";
import NotificationTest from "../components/NotificationTest";

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <nav aria-label={t("navigation.primaryNavigation")}>
        <Link to="/book" aria-label={t("navigation.goToBookPage")}>
          {t("navigation.goToBook")}
        </Link>
      </nav>
      <Me />
      <NotificationTest />
    </>
  );
}

export default Home;
