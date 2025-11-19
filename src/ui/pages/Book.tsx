import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import BookList from "../components/BookList";

function Book() {
  const { t } = useTranslation();

  return (
    <>
      <nav aria-label={t("navigation.primaryNavigation")}>
        <Link to="/" aria-label={t("navigation.goToHomePage")}>
          {t("navigation.goToHome")}
        </Link>
      </nav>
      <BookList />
    </>
  );
}

export default Book;
