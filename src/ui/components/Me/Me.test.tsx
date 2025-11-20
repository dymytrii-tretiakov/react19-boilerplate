import { screen } from "@testing-library/react";
import { container } from "../../../infrastructure/di";
import { render } from "../../../test/testUtils";
import Me from "./Me";

// Mock the DI container
vi.mock("../../../infrastructure/di", () => ({
  container: {
    userService: {
      loadMe: vi.fn(),
      updateShowName: vi.fn(),
    },
    storeFactory: {
      useUserStore: vi.fn(),
      useUIStore: vi.fn(() => ({
        toggleHideName: vi.fn(),
        hideName: false,
      })),
    },
  },
}));

describe("Me", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    vi.mocked(container.storeFactory.useUserStore).mockImplementation(
      (selector) => selector({ me: null, setMe: vi.fn() })
    );

    render(<Me />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("renders user information when loaded", async () => {
    const mockMe = {
      id: "1",
      fistName: "Jane",
      lastName: "Smith",
      email: "test@example.com",
    };

    vi.mocked(container.storeFactory.useUserStore).mockImplementation(
      (selector) => selector({ me: mockMe, setMe: vi.fn() })
    );
    vi.mocked(container.userService.loadMe).mockResolvedValue();

    render(<Me />);

    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    // Check that name section is visible - get the parent paragraph element
    const nameLabel = screen.getByText(/Name:/);
    const nameParagraph = nameLabel.closest("p");
    expect(nameParagraph).toBeInTheDocument();
    expect(nameParagraph?.textContent).toContain("Jane");
    expect(nameParagraph?.textContent).toContain("Smith");
  });

  it("renders show/hide name toggle", () => {
    const mockMe = {
      id: "1",
      fistName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };
    vi.mocked(container.storeFactory.useUserStore).mockImplementation(
      (selector) => selector({ me: mockMe, setMe: vi.fn() })
    );

    render(<Me />);

    const toggleButton = screen.getByRole("button", { name: /hide/i });
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveAttribute("aria-pressed", "true");
  });

  it("has proper accessibility attributes", () => {
    const mockMe = {
      id: "1",
      fistName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    vi.mocked(container.storeFactory.useUserStore).mockImplementation(
      (selector) => selector({ me: mockMe, setMe: vi.fn() })
    );

    render(<Me />);

    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id");
  });

  it("calls loadMe on mount", () => {
    vi.mocked(container.storeFactory.useUserStore).mockImplementation(
      (selector) => selector({ me: null, setMe: vi.fn() })
    );
    vi.mocked(container.userService.loadMe).mockResolvedValue();

    render(<Me />);

    expect(container.userService.loadMe).toHaveBeenCalledTimes(1);
  });

  it("renders user profile section with semantic HTML", () => {
    const mockMe = {
      id: "1",
      fistName: "John",
      lastName: "Doe",
      email: "john@example.com",
    };

    vi.mocked(container.storeFactory.useUserStore).mockImplementation(
      (selector) => selector({ me: mockMe, setMe: vi.fn() })
    );

    render(<Me />);

    // Check for semantic heading
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

    // Check for section landmark
    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});
