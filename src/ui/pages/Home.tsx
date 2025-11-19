import { Link } from "react-router";
import Me from "../components/Me";
import NotificationTest from "../components/NotificationTest";

function Home() {
  return (
    <>
      <nav aria-label="Primary navigation">
        <Link to="/book" aria-label="Navigate to book list page">
          Go to Book
        </Link>
      </nav>
      <Me />
      <NotificationTest />
    </>
  );
}

export default Home;
