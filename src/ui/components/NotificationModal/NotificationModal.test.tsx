import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Notification } from "../../../domain/models/Notification";
import { render } from "../../../test/testUtils";
import NotificationModal from "./NotificationModal";

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

describe("NotificationModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNotifications.length = 0;
  });

  it("renders modal notification", () => {
    mockNotifications.push({
      id: "1",
      message: "Modal message",
      severity: "warning",
      type: "modal",
      timestamp: Date.now(),
    });

    render(<NotificationModal />);

    expect(screen.getByText("Modal message")).toBeInTheDocument();
  });

  it("renders info modal with OK button", () => {
    mockNotifications.push({
      id: "1",
      message: "Info message",
      severity: "success",
      type: "modal",
      timestamp: Date.now(),
    });

    render(<NotificationModal />);

    const buttons = screen.getAllByRole("button");
    const okButton = buttons.find((btn) => btn.textContent === "OK");
    expect(okButton).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /cancel/i })
    ).not.toBeInTheDocument();
  });

  it("renders ask modal with action and cancel buttons", () => {
    mockNotifications.push({
      id: "1",
      message: "Confirm action?",
      severity: "danger",
      type: "modal",
      timestamp: Date.now(),
      actionButtonText: "Delete",
      onAction: vi.fn(),
    });

    render(<NotificationModal />);

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("closes info modal when OK button is clicked", async () => {
    const user = userEvent.setup();
    mockNotifications.push({
      id: "1",
      message: "Info message",
      severity: "success",
      type: "modal",
      timestamp: Date.now(),
    });

    render(<NotificationModal />);

    const buttons = screen.getAllByRole("button");
    const okButton = buttons.find((btn) => btn.textContent === "OK");
    if (okButton) {
      await user.click(okButton);
    }

    expect(mockRemoveNotification).toHaveBeenCalledWith("1");
  });

  it("closes ask modal when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnAction = vi.fn();
    mockNotifications.push({
      id: "1",
      message: "Confirm action?",
      severity: "danger",
      type: "modal",
      timestamp: Date.now(),
      actionButtonText: "Delete",
      onAction: mockOnAction,
    });

    render(<NotificationModal />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockRemoveNotification).toHaveBeenCalledWith("1");
    expect(mockOnAction).not.toHaveBeenCalled();
  });

  it("calls onAction and closes when action button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnAction = vi.fn();
    mockNotifications.push({
      id: "1",
      message: "Confirm action?",
      severity: "danger",
      type: "modal",
      timestamp: Date.now(),
      actionButtonText: "Delete",
      onAction: mockOnAction,
    });

    render(<NotificationModal />);

    const actionButton = screen.getByRole("button", { name: /delete/i });
    await user.click(actionButton);

    expect(mockOnAction).toHaveBeenCalled();
    expect(mockRemoveNotification).toHaveBeenCalledWith("1");
  });

  it("has proper accessibility attributes", () => {
    mockNotifications.push({
      id: "1",
      message: "Modal message",
      severity: "warning",
      type: "modal",
      timestamp: Date.now(),
    });

    render(<NotificationModal />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  it("closes modal on Escape key for info modals", async () => {
    const user = userEvent.setup();
    mockNotifications.push({
      id: "1",
      message: "Info message",
      severity: "success",
      type: "modal",
      timestamp: Date.now(),
    });

    render(<NotificationModal />);

    await user.keyboard("{Escape}");

    expect(mockRemoveNotification).toHaveBeenCalledWith("1");
  });

  it("does not close on Escape key for ask modals", async () => {
    const user = userEvent.setup();
    mockNotifications.push({
      id: "1",
      message: "Confirm action?",
      severity: "danger",
      type: "modal",
      timestamp: Date.now(),
      actionButtonText: "Delete",
      onAction: vi.fn(),
    });

    render(<NotificationModal />);

    await user.keyboard("{Escape}");

    expect(mockRemoveNotification).not.toHaveBeenCalled();
  });

  it("only renders modal type notifications", () => {
    mockNotifications.push(
      {
        id: "1",
        message: "Modal message",
        severity: "warning",
        type: "modal",
        timestamp: Date.now(),
      },
      {
        id: "2",
        message: "Toast message",
        severity: "success",
        type: "notification",
        timestamp: Date.now(),
      }
    );

    render(<NotificationModal />);

    expect(screen.getByText("Modal message")).toBeInTheDocument();
    expect(screen.queryByText("Toast message")).not.toBeInTheDocument();
  });

  it("displays context when provided", () => {
    mockNotifications.push({
      id: "1",
      message: "Error occurred",
      severity: "danger",
      type: "modal",
      timestamp: Date.now(),
      context: "loadBooks",
    });

    render(<NotificationModal />);

    expect(screen.getByText(/loadBooks/i)).toBeInTheDocument();
  });
});
