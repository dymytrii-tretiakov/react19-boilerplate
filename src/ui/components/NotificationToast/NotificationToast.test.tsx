import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Notification } from "../../../domain/models/Notification";
import { render } from "../../../test/testUtils";
import NotificationToast from "./NotificationToast";

// Mock the store factory
const mockRemoveNotification = vi.fn();
const mockNotifications: Notification[] = [];

vi.mock("../../../infrastructure/factories/StoreFactory", () => ({
  storeFactory: {
    useNotificationStore: (
      selector: (state: {
        notifications: Notification[];
        removeNotification: (id: string) => void;
      }) => unknown
    ) =>
      selector({
        notifications: mockNotifications,
        removeNotification: mockRemoveNotification,
      }),
  },
}));

describe("NotificationToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNotifications.length = 0;
  });

  it("renders toast notifications", () => {
    mockNotifications.push({
      id: "1",
      message: "Success message",
      severity: "success",
      type: "notification",
      timestamp: Date.now(),
    });

    render(<NotificationToast />);

    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  it("renders correct severity title for success", () => {
    mockNotifications.push({
      id: "1",
      message: "Success message",
      severity: "success",
      type: "notification",
      timestamp: Date.now(),
    });

    render(<NotificationToast />);

    expect(screen.getByRole("alert")).toHaveTextContent(/success/i);
  });

  it("renders correct severity title for warning", () => {
    mockNotifications.push({
      id: "1",
      message: "Warning message",
      severity: "warning",
      type: "notification",
      timestamp: Date.now(),
    });

    render(<NotificationToast />);

    expect(screen.getByRole("alert")).toHaveTextContent(/warning/i);
  });

  it("renders correct severity title for danger", () => {
    mockNotifications.push({
      id: "1",
      message: "Error message",
      severity: "danger",
      type: "notification",
      timestamp: Date.now(),
    });

    render(<NotificationToast />);

    expect(screen.getByRole("alert")).toHaveTextContent(/error/i);
  });

  it("displays context when provided", () => {
    mockNotifications.push({
      id: "1",
      message: "Test message",
      severity: "success",
      type: "notification",
      timestamp: Date.now(),
      context: "saveUser",
    });

    render(<NotificationToast />);

    expect(screen.getByText(/saveUser/i)).toBeInTheDocument();
  });

  it("closes notification when close button is clicked", async () => {
    const user = userEvent.setup();
    mockNotifications.push({
      id: "1",
      message: "Test message",
      severity: "success",
      type: "notification",
      timestamp: Date.now(),
    });

    render(<NotificationToast />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(mockRemoveNotification).toHaveBeenCalledWith("1");
  });

  it("has proper ARIA live region attributes", () => {
    render(<NotificationToast />);

    const container = screen.getByRole("region");
    expect(container).toHaveAttribute("aria-live", "polite");
    expect(container).toHaveAttribute("aria-atomic", "false");
    expect(container).toHaveAttribute("aria-label");
  });

  it("each toast has alert role", () => {
    mockNotifications.push({
      id: "1",
      message: "Test message",
      severity: "success",
      type: "notification",
      timestamp: Date.now(),
    });

    render(<NotificationToast />);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "assertive");
  });

  it("renders multiple toasts", () => {
    mockNotifications.push(
      {
        id: "1",
        message: "First message",
        severity: "success",
        type: "notification",
        timestamp: Date.now(),
      },
      {
        id: "2",
        message: "Second message",
        severity: "warning",
        type: "notification",
        timestamp: Date.now(),
      }
    );

    render(<NotificationToast />);

    expect(screen.getByText("First message")).toBeInTheDocument();
    expect(screen.getByText("Second message")).toBeInTheDocument();
  });

  it("only renders notification type messages", () => {
    mockNotifications.push(
      {
        id: "1",
        message: "Toast message",
        severity: "success",
        type: "notification",
        timestamp: Date.now(),
      },
      {
        id: "2",
        message: "Modal message",
        severity: "warning",
        type: "modal",
        timestamp: Date.now(),
      }
    );

    render(<NotificationToast />);

    expect(screen.getByText("Toast message")).toBeInTheDocument();
    expect(screen.queryByText("Modal message")).not.toBeInTheDocument();
  });
});
