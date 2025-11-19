import { Link } from "react-router";
import BookList from "../components/BookList";

function Book() {
  return (
    <>
      <nav aria-label="Primary navigation">
        <Link to="/" aria-label="Navigate to home page">
          Go to Home
        </Link>
      </nav>
      <BookList />
    </>
  );
}

export default Book;
