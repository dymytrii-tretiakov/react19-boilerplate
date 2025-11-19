const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
const IS_LOCAL_DEVELOPMENT = import.meta.env.MODE === "development";

export { API_BASE_URL, IS_LOCAL_DEVELOPMENT };
