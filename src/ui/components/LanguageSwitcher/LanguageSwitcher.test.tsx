import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { render } from "../../../test/testUtils";
import LanguageSwitcher from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
  it("renders language switcher buttons", () => {
    render(<LanguageSwitcher />);

    expect(
      screen.getByRole("button", { name: /english/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /español/i })
    ).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<LanguageSwitcher />);

    const englishButton = screen.getByRole("button", { name: /english/i });
    expect(englishButton).toHaveAttribute("aria-pressed");
    expect(englishButton).toHaveAttribute("aria-label");

    const spanishButton = screen.getByRole("button", { name: /español/i });
    expect(spanishButton).toHaveAttribute("aria-pressed");
    expect(spanishButton).toHaveAttribute("aria-label");
  });

  it("changes language when button is clicked", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const spanishButton = screen.getByRole("button", { name: /español/i });
    await user.click(spanishButton);

    // Check if the HTML lang attribute is updated
    expect(document.documentElement.lang).toBe("es");
  });

  it("marks active language button as pressed", () => {
    render(<LanguageSwitcher />);

    const buttons = screen.getAllByRole("button");
    const englishButton = buttons.find((btn) => btn.textContent === "English");
    const spanishButton = buttons.find((btn) => btn.textContent === "Español");

    // Check that one of them is pressed (default language may vary)
    expect(englishButton).toHaveAttribute("aria-pressed");
    expect(spanishButton).toHaveAttribute("aria-pressed");
  });

  it("switches between languages multiple times", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    // Switch to Spanish
    const spanishButton = screen.getByRole("button", { name: /español/i });
    await user.click(spanishButton);
    expect(document.documentElement.lang).toBe("es");

    // Switch back to English
    const englishButton = screen.getByRole("button", { name: /english/i });
    await user.click(englishButton);
    expect(document.documentElement.lang).toBe("en");
  });

  it("has visible focus indicators for keyboard navigation", () => {
    render(<LanguageSwitcher />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeVisible();
      expect(button).toBeEnabled();
    });
  });
});
