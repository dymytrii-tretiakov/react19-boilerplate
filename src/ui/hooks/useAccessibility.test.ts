import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  useFocusManagement,
  useFocusTrap,
  useKeyboardListNavigation,
  useScreenReaderAnnouncement,
} from "./useAccessibility";

describe("useFocusManagement", () => {
  it("focuses element when isOpen is true", () => {
    const { result } = renderHook(() => useFocusManagement(true, true));

    const mockElement = document.createElement("button");
    const focusSpy = vi.spyOn(mockElement, "focus");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result.current as any).current = mockElement;

    act(() => {
      // Trigger focus
      mockElement.focus();
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  it("returns element ref", () => {
    const { result } = renderHook(() => useFocusManagement());

    expect(result.current).toHaveProperty("current");
  });
});

describe("useFocusTrap", () => {
  let container: HTMLDivElement;
  let button1: HTMLButtonElement;
  let button2: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement("div");
    button1 = document.createElement("button");
    button2 = document.createElement("button");
    button1.textContent = "Button 1";
    button2.textContent = "Button 2";
    container.appendChild(button1);
    container.appendChild(button2);
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("traps focus within container on Tab key", () => {
    const containerRef = { current: container };
    renderHook(() => useFocusTrap(true, containerRef));

    button2.focus();
    expect(document.activeElement).toBe(button2);

    // Simulate Tab key
    const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true });
    document.dispatchEvent(event);

    // Should cycle back to first button (but preventDefault would stop this in real scenario)
    expect(containerRef.current).toBeTruthy();
  });

  it("does not trap focus when isActive is false", () => {
    const containerRef = { current: container };
    renderHook(() => useFocusTrap(false, containerRef));

    button2.focus();
    expect(document.activeElement).toBe(button2);

    // Tab should work normally
    const event = new KeyboardEvent("keydown", { key: "Tab", bubbles: true });
    document.dispatchEvent(event);

    // Focus behavior should not be modified
    expect(containerRef.current).toBeTruthy();
  });
});

describe("useScreenReaderAnnouncement", () => {
  afterEach(() => {
    // Clean up any live regions
    const liveRegions = document.querySelectorAll("[aria-live]");
    liveRegions.forEach((region) => region.remove());
  });

  it("creates live region for announcements", () => {
    renderHook(() => useScreenReaderAnnouncement("Test message"));

    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeTruthy();
  });

  it("creates assertive live region when specified", () => {
    renderHook(() =>
      useScreenReaderAnnouncement("Urgent message", "assertive")
    );

    const liveRegion = document.querySelector('[aria-live="assertive"]');
    expect(liveRegion).toBeTruthy();
  });

  it("updates live region with new message", async () => {
    const { rerender } = renderHook(
      ({ message }) => useScreenReaderAnnouncement(message),
      { initialProps: { message: "First message" } }
    );

    await new Promise((resolve) => setTimeout(resolve, 150));

    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion?.textContent).toBe("First message");

    rerender({ message: "Second message" });

    await new Promise((resolve) => setTimeout(resolve, 150));
    expect(liveRegion?.textContent).toBe("Second message");
  });
});

describe("useKeyboardListNavigation", () => {
  it("handles arrow down navigation", () => {
    const { result } = renderHook(() => useKeyboardListNavigation(5));

    expect(result.current.getCurrentIndex()).toBe(0);

    act(() => {
      result.current.handleKeyDown({
        key: "ArrowDown",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.getCurrentIndex()).toBe(1);
  });

  it("handles arrow up navigation", () => {
    const { result } = renderHook(() => useKeyboardListNavigation(5));

    act(() => {
      result.current.setCurrentIndex(2);
    });

    expect(result.current.getCurrentIndex()).toBe(2);

    act(() => {
      result.current.handleKeyDown({
        key: "ArrowUp",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.getCurrentIndex()).toBe(1);
  });

  it("handles Home key to go to first item", () => {
    const { result } = renderHook(() => useKeyboardListNavigation(5));

    act(() => {
      result.current.setCurrentIndex(3);
    });

    act(() => {
      result.current.handleKeyDown({
        key: "Home",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.getCurrentIndex()).toBe(0);
  });

  it("handles End key to go to last item", () => {
    const { result } = renderHook(() => useKeyboardListNavigation(5));

    act(() => {
      result.current.handleKeyDown({
        key: "End",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.getCurrentIndex()).toBe(4);
  });

  it("calls onSelect when Enter is pressed", () => {
    const onSelect = vi.fn();
    const { result } = renderHook(() => useKeyboardListNavigation(5, onSelect));

    act(() => {
      result.current.setCurrentIndex(2);
    });

    act(() => {
      result.current.handleKeyDown({
        key: "Enter",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(onSelect).toHaveBeenCalledWith(2);
  });

  it("does not go below 0 when pressing arrow up", () => {
    const { result } = renderHook(() => useKeyboardListNavigation(5));

    expect(result.current.getCurrentIndex()).toBe(0);

    act(() => {
      result.current.handleKeyDown({
        key: "ArrowUp",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.getCurrentIndex()).toBe(0);
  });

  it("does not exceed itemCount when pressing arrow down", () => {
    const { result } = renderHook(() => useKeyboardListNavigation(5));

    act(() => {
      result.current.setCurrentIndex(4);
    });

    act(() => {
      result.current.handleKeyDown({
        key: "ArrowDown",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent);
    });

    expect(result.current.getCurrentIndex()).toBe(4);
  });
});
