# Accessibility Features

This project implements comprehensive accessibility features to ensure all users can interact with the application effectively.

## Implemented Features

### 1. Semantic HTML5

- **Main landmark**: Content wrapped in `<main>` element with `role="main"` and `id="main-content"`
- **Navigation**: Navigation links wrapped in `<nav>` with `aria-label` attributes
- **Sections**: Component sections use `<section>` with `aria-labelledby` for proper identification
- **Headings**: Proper heading hierarchy (h1, h2) for screen reader navigation

### 2. ARIA (Accessible Rich Internet Applications)

- **ARIA labels**: All interactive elements have descriptive `aria-label` attributes
- **ARIA live regions**: Dynamic content updates announced to screen readers
  - Toast notifications: `role="alert"` with `aria-live="assertive"`
  - Loading states: `aria-live="polite"`
  - Dynamic content: `aria-live="polite"` for non-critical updates
- **ARIA roles**:
  - Modal dialogs: `role="dialog"` with `aria-modal="true"`
  - Status updates: `role="status"`
  - Buttons: `aria-pressed` for toggle buttons
- **ARIA descriptions**:
  - Modal: `aria-labelledby` and `aria-describedby` for title and content association

### 3. Keyboard Navigation

- **Tab navigation**: All interactive elements reachable via Tab key
- **Enter key**: Activates primary actions in modals and buttons
- **Escape key**: Closes modal dialogs (when not in ask/confirm mode)
- **Focus trap**: Modal dialogs trap focus within them using Tab and Shift+Tab
- **Focus indicators**: Visible focus outlines (2-3px solid blue) on all focusable elements
- **Focus management**:
  - Focus automatically moves to modal when opened
  - Focus returns to previous element when modal closes

### 4. Screen Reader Support

- **Skip links**: "Skip to main content" link appears on focus for keyboard users
- **Descriptive labels**: All buttons, links, and inputs have clear, descriptive labels
- **Loading states**: Screen readers announce loading states with `role="status"` and `aria-live="polite"`
- **Error messages**: Errors announced with `role="alert"` for immediate attention
- **Button states**: Toggle buttons announce their state with `aria-pressed`

### 5. High Contrast Mode

- **Media query**: `@media (prefers-contrast: high)` adjusts colors for maximum contrast
- **Color adjustments**:
  - Text: Pure black (#000000) on white (#ffffff)
  - Borders: 2px solid black borders on interactive elements
  - Focus outlines: 4px solid black outlines
- **Sufficient contrast ratios**: All text meets WCAG AAA standards (7:1 for normal text, 4.5:1 for large text)

### 6. Reduced Motion Support

- **Media query**: `@media (prefers-reduced-motion: reduce)` respects user preferences
- **Animation removal**: All animations, transitions, and transforms disabled
- **Smooth scrolling**: Disabled for users who prefer reduced motion
- **Component animations**: Modal and toast animations bypassed

### 7. Color Scheme Support

- **Light/Dark mode**: Uses CSS `light-dark()` function for automatic theme switching
- **System preference**: Respects `prefers-color-scheme` media query
- **High contrast dark mode**: Enhanced contrast for dark mode users

### 8. Touch Target Sizes

- **Minimum size**: All interactive elements minimum 44x44px on touch devices
- **Media query**: `@media (pointer: coarse)` ensures proper sizing for mobile/tablet

### 9. Text Readability

- **Line height**: 1.5 for body text, 1.2 for headings
- **Font smoothing**: Antialiased for better readability
- **Link underlines**: Links underlined by default for easy identification
- **Disabled states**: Clear visual indication with reduced opacity

### 10. Screen Reader Only Content

- **`.sr-only` class**: Visually hidden but accessible to screen readers
- **Use cases**: Additional context, skip links, state announcements

## Keyboard Shortcuts

| Key         | Action               | Context                     |
| ----------- | -------------------- | --------------------------- |
| Tab         | Navigate forward     | All pages                   |
| Shift + Tab | Navigate backward    | All pages                   |
| Enter       | Activate button/link | Buttons, links              |
| Escape      | Close modal          | Modal dialogs (non-confirm) |
| Space       | Activate button      | Buttons                     |

## Testing Accessibility

### Screen Readers

- **macOS**: VoiceOver (Cmd + F5)
- **Windows**: NVDA (free), JAWS (commercial)
- **Browser extensions**: ChromeVox, Screen Reader

### Keyboard Navigation

1. Disable your mouse/trackpad
2. Use Tab key to navigate through all interactive elements
3. Verify all elements are reachable and have visible focus indicators
4. Use Enter to activate buttons and links
5. Use Escape to close modals

### High Contrast Mode

- **Windows**: Settings > Ease of Access > High Contrast
- **macOS**: System Preferences > Accessibility > Display > Increase Contrast
- **Browser**: Chrome DevTools > Rendering > Emulate CSS media feature prefers-contrast

### Reduced Motion

- **Windows**: Settings > Ease of Access > Display > Show animations
- **macOS**: System Preferences > Accessibility > Display > Reduce motion
- **Browser**: Chrome DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion

### Color Contrast

- Use browser extensions like:
  - Axe DevTools
  - WAVE
  - Lighthouse (Chrome DevTools)

## WCAG Compliance

This application aims to meet **WCAG 2.1 Level AA** standards:

- ✅ **1.1.1 Non-text Content**: All images and icons have text alternatives
- ✅ **1.3.1 Info and Relationships**: Semantic HTML and ARIA for relationships
- ✅ **1.4.3 Contrast**: Minimum 4.5:1 contrast ratio for text
- ✅ **2.1.1 Keyboard**: All functionality available via keyboard
- ✅ **2.1.2 No Keyboard Trap**: Focus can move away from all components
- ✅ **2.4.1 Bypass Blocks**: Skip navigation links provided
- ✅ **2.4.3 Focus Order**: Logical tab order
- ✅ **2.4.7 Focus Visible**: Clear focus indicators
- ✅ **3.2.4 Consistent Navigation**: Navigation consistent across pages
- ✅ **4.1.2 Name, Role, Value**: All components properly identified
- ✅ **4.1.3 Status Messages**: Live regions for dynamic content

## Future Improvements

- [ ] Add more keyboard shortcuts (e.g., Ctrl+K for search)
- [ ] Implement landmark navigation shortcuts
- [ ] Add ARIA expanded/collapsed states for collapsible content
- [ ] Test with multiple screen readers
- [ ] Add voice control support
- [ ] Implement custom focus indicators per component theme
- [ ] Add accessibility statement page
- [ ] Regular accessibility audits with automated tools

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
