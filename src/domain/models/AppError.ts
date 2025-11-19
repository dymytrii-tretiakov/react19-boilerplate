type ErrorType = "inline" | "notification" | "modal";

type AppError = {
  id: string;
  message: string;
  type: ErrorType;
  code?: string;
  timestamp: number;
  context?: string; // Which operation failed (e.g., "loadMe", "saveUser")
};

export type { AppError, ErrorType };
