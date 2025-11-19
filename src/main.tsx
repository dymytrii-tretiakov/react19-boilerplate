import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import { IS_LOCAL_DEVELOPMENT } from "./infrastructure/config";
import Layout from "./ui/Layout";
import Book from "./ui/pages/Book";
import Home from "./ui/pages/Home";

// eslint-disable-next-line react-refresh/only-export-components
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

createRoot(document.getElementById("root")!).render(
  IS_LOCAL_DEVELOPMENT ? (
    <App />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  )
);
