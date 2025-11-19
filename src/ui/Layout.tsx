import { Outlet } from "react-router";
import NotificationModal from "./components/NotificationModal";
import NotificationToast from "./components/NotificationToast";

function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NotificationToast />
      <NotificationModal />
      <main id="main-content" role="main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
