import { useEffect, useState } from "react";
import { container } from "../../../infrastructure/di";
import styles from "./BookList.module.css";

function BookList() {
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
          Book List
        </h1>
        <button
          className={styles.refreshButton}
          onClick={handleRefresh}
          aria-label="Refresh book list"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Refresh"}
        </button>
      </div>
      {isLoading && books.length === 0 ? (
        <p className={styles.emptyState} aria-live="polite">
          Loading books...
        </p>
      ) : books.length === 0 ? (
        <p className={styles.emptyState} aria-live="polite">
          No books available.
        </p>
      ) : (
        <ul className={styles.bookList} aria-label="Book list">
          {books.map((book) => (
            <li key={book.id} className={styles.bookItem}>
              <div className={styles.bookTitle}>{book.title}</div>
              <div
                className={styles.bookAuthor}
                aria-label={`Author: ${book.author.name}`}
              >
                by {book.author.name}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default BookList;
