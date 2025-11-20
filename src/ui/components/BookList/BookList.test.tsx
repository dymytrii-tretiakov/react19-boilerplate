import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "../../../infrastructure/di";
import { render } from "../../../test/testUtils";
import BookList from "./BookList";

// Mock the DI container
vi.mock("../../../infrastructure/di", () => ({
  container: {
    bookService: {
      loadAllBooks: vi.fn(),
    },
    storeFactory: {
      useBookStore: vi.fn(),
    },
  },
}));

describe("BookList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    vi.mocked(container.storeFactory.useBookStore).mockReturnValue([]);

    render(<BookList />);

    expect(screen.getByText("Loading books...")).toBeInTheDocument();
  });

  it("renders empty state when no books", async () => {
    vi.mocked(container.storeFactory.useBookStore).mockReturnValue([]);
    vi.mocked(container.bookService.loadAllBooks).mockResolvedValue();

    render(<BookList />);

    await waitFor(() => {
      expect(screen.getByText(/no books/i)).toBeInTheDocument();
    });
  });

  it("renders books list when books are loaded", async () => {
    const mockBooks = [
      {
        id: "1",
        title: "Test Book 1",
        author: { id: "1", name: "Author One" },
      },
      {
        id: "2",
        title: "Test Book 2",
        author: { id: "2", name: "Author Two" },
      },
    ];

    vi.mocked(container.storeFactory.useBookStore).mockReturnValue(mockBooks);
    vi.mocked(container.bookService.loadAllBooks).mockResolvedValue();

    render(<BookList />);

    await waitFor(() => {
      expect(screen.getByText("Test Book 1")).toBeInTheDocument();
      expect(screen.getByText("Test Book 2")).toBeInTheDocument();
      expect(screen.getByText(/Author One/i)).toBeInTheDocument();
      expect(screen.getByText(/Author Two/i)).toBeInTheDocument();
    });
  });

  it("calls loadAllBooks on mount", async () => {
    vi.mocked(container.storeFactory.useBookStore).mockReturnValue([]);
    vi.mocked(container.bookService.loadAllBooks).mockResolvedValue();

    render(<BookList />);

    await waitFor(() => {
      expect(container.bookService.loadAllBooks).toHaveBeenCalledTimes(1);
    });
  });

  it("refreshes books when refresh button is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(container.storeFactory.useBookStore).mockReturnValue([]);
    vi.mocked(container.bookService.loadAllBooks).mockResolvedValue();

    render(<BookList />);

    // Wait for initial load
    await waitFor(() => {
      expect(container.bookService.loadAllBooks).toHaveBeenCalledTimes(1);
    });

    const refreshButton = screen.getByRole("button", { name: /refresh/i });
    await user.click(refreshButton);

    await waitFor(() => {
      expect(container.bookService.loadAllBooks).toHaveBeenCalledTimes(2);
    });
  });

  it("has proper accessibility attributes", () => {
    vi.mocked(container.storeFactory.useBookStore).mockReturnValue([]);

    render(<BookList />);

    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "book-list-heading");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "book-list-heading");

    const refreshButton = screen.getByRole("button", { name: /refresh/i });
    expect(refreshButton).toHaveAttribute("aria-label");
  });

  it("disables refresh button while loading", async () => {
    vi.mocked(container.storeFactory.useBookStore).mockReturnValue([]);
    vi.mocked(container.bookService.loadAllBooks).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<BookList />);

    const refreshButton = screen.getByRole("button", { name: /refresh/i });
    expect(refreshButton).toBeDisabled();
    expect(refreshButton).toHaveTextContent("Loading...");
  });
});
