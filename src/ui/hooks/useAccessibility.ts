import { useEffect, useRef } from "react";

/**
 * Custom hook for managing focus in accessible components
 *
 * @param isOpen - Boolean indicating if the component requiring focus management is open
 * @param focusOnMount - Whether to focus the element when it mounts
 * @returns ref - Ref to attach to the element that should receive focus
 */
export function useFocusManagement<T extends HTMLElement>(
  isOpen: boolean = true,
  focusOnMount: boolean = true
) {
  const elementRef = useRef<T>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen && focusOnMount) {
      // Store the currently focused element
      previousActiveElementRef.current = document.activeElement as HTMLElement;

      // Focus the new element
      if (elementRef.current) {
        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(() => {
          elementRef.current?.focus();
        }, 0);

        return () => clearTimeout(timeoutId);
      }
    } else if (!isOpen) {
      // Restore focus when component closes
      if (previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    }
  }, [isOpen, focusOnMount]);

  return elementRef;
}

/**
 * Custom hook for trapping focus within a component (e.g., modals, dialogs)
 *
 * @param isActive - Boolean indicating if focus trap should be active
 * @param containerRef - Ref to the container element
 */
export function useFocusTrap(
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const container = containerRef.current;
      if (!container) return;

      const focusableElements = container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement) return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive, containerRef]);
}

/**
 * Custom hook for announcing changes to screen readers
 *
 * @param message - Message to announce
 * @param politeness - Politeness level: "polite" (default) or "assertive"
 */
export function useScreenReaderAnnouncement(
  message: string,
  politeness: "polite" | "assertive" = "polite"
) {
  useEffect(() => {
    if (!message) return;

    // Create a live region if it doesn't exist
    let liveRegion = document.getElementById(`sr-announcement-${politeness}`);

    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = `sr-announcement-${politeness}`;
      liveRegion.setAttribute("aria-live", politeness);
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
    }

    // Clear previous message and set new one
    liveRegion.textContent = "";

    // Use setTimeout to ensure the screen reader picks up the change
    setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    }, 100);

    // Clear the message after it's been announced
    const clearTimeoutId = setTimeout(() => {
      if (liveRegion) {
        liveRegion.textContent = "";
      }
    }, 5000);

    return () => clearTimeout(clearTimeoutId);
  }, [message, politeness]);
}

/**
 * Custom hook for handling keyboard navigation in lists
 *
 * @param itemCount - Number of items in the list
 * @param onSelect - Callback when an item is selected
 * @returns handleKeyDown - Event handler for keyboard navigation
 * @returns getCurrentIndex - Function to get current index
 */
export function useKeyboardListNavigation(
  itemCount: number,
  onSelect?: (index: number) => void
) {
  const currentIndexRef = useRef(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        currentIndexRef.current = Math.min(
          currentIndexRef.current + 1,
          itemCount - 1
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        currentIndexRef.current = Math.max(currentIndexRef.current - 1, 0);
        break;
      case "Home":
        e.preventDefault();
        currentIndexRef.current = 0;
        break;
      case "End":
        e.preventDefault();
        currentIndexRef.current = itemCount - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (onSelect) {
          onSelect(currentIndexRef.current);
        }
        break;
    }
  };

  const getCurrentIndex = () => currentIndexRef.current;
  const setCurrentIndex = (index: number) => {
    currentIndexRef.current = index;
  };

  return {
    handleKeyDown,
    getCurrentIndex,
    setCurrentIndex,
  };
}
