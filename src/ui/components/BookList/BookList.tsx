import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { container } from "../../../infrastructure/di";
import styles from "./BookList.module.css";

function BookList() {
  const { t } = useTranslation();
  const books = container.storeFactory.useBookStore((state) => state.books);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      try {
        await container.bookService.loadAllBooks();
      } finally {
        setIsLoading(false);
      }
    };
    loadBooks();
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await container.bookService.loadAllBooks();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.container} aria-labelledby="book-list-heading">
      <div className={styles.header}>
        <h1 id="book-list-heading" className={styles.title}>
          {t("bookList.title")}
        </h1>
        <button
          className={styles.refreshButton}
          onClick={handleRefresh}
          aria-label={t("bookList.refreshButton")}
          disabled={isLoading}
        >
          {isLoading ? t("common.loading") : t("common.refresh")}
        </button>
      </div>
      {isLoading && books.length === 0 ? (
        <p className={styles.emptyState} aria-live="polite">
          {t("bookList.loadingBooks")}
        </p>
      ) : books.length === 0 ? (
        <p className={styles.emptyState} aria-live="polite">
          {t("bookList.empty")}
        </p>
      ) : (
        <ul className={styles.bookList} aria-label={t("aria.bookListSection")}>
          {books.map((book) => (
            <li key={book.id} className={styles.bookItem}>
              <div className={styles.bookTitle}>{book.title}</div>
              <div
                className={styles.bookAuthor}
                aria-label={t("bookList.authorLabel", {
                  name: book.author.name,
                })}
              >
                {t("bookList.author", { name: book.author.name })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BookList;
