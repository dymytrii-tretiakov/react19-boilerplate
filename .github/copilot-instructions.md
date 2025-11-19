# AI Coding Agent Instructions

## Architecture Overview

This is a **fully accessible React 19 + TypeScript + Vite application** following **Clean Architecture** principles with comprehensive WCAG 2.1 Level AA accessibility support and i18n.

### Layer Structure (Critical)

```
domain/          → Business logic, interfaces, models (pure TypeScript)
  ├── models/    → Data models (Book, User, Notification)
  ├── repositories/  → IBookRepository, IUserRepository (interfaces only)
  ├── services/      → IBookService, INotificationService (interfaces only)
  ├── stores/        → IBookStore, INotificationStore (interfaces only)
  └── factories/     → IStoreFactory (interface only)

application/     → Use cases and implementations
  ├── repositories/  → BookRepositoryImpl, UserRepositoryImpl
  └── services/      → BookService, NotificationService, UserService

infrastructure/  → External dependencies
  ├── stores/    → Zustand store implementations (BookStore, NotificationStore)
  ├── factories/ → StoreFactory (creates store instances)
  ├── di.ts      → DIContainer singleton - ALL service access goes through here
  ├── api.ts     → Axios instance
  └── config.ts  → Environment variables

ui/              → React components, pages, hooks
  ├── components/    → Reusable components (each has .tsx, .module.css, index.ts)
  ├── pages/         → Route pages
  └── hooks/         → useAccessibility.ts custom hooks
```

**Rule**: Domain layer contains ONLY interfaces and models. Implementations live in application/infrastructure layers.

## Dependency Injection Pattern

**Always** access services through the DI container:

```typescript
import { container } from "../../../infrastructure/di";

// In components:
const books = container.storeFactory.useBookStore((state) => state.books);
await container.bookService.loadAllBooks();
```

**Never** instantiate services directly or import stores directly.

## Notification System

The app has a sophisticated multi-type notification system:

```typescript
// Types: "notification" (toast), "modal", "inline"
// Severities: "success", "warning", "danger"

// Toast (auto-dismisses after 5s)
notificationService.showToast("Saved!", "success", "saveUser");

// Modal - Info (dismissible only)
notificationService.showModal("Are you sure?", "warning");

// Modal - Ask/Confirm (actionable)
notificationService.showModal("Delete this?", "danger", {
  actionButtonText: "Delete",
  onAction: () => performDelete(),
});

// Inline (persistent, context-specific)
notificationService.showInline("Invalid email", "danger", "emailField");

// Error handler (auto-extracts message & code from any error type)
notificationService.handleError(error, "notification", "loadBooks");
```

**Key**: Ask modals require BOTH `actionButtonText` and `onAction`, or neither (info modal).

## Repository Pattern

Repositories are **factory functions** returning objects:

```typescript
function BookRepositoryImpl(api: Axios): IBookRepository {
  async function getBooks(): Promise<Book[]> {
    const response = await api.get<Book[]>("/books");
    return response.data;
  }
  return { getBooks };
}
```

Services receive repositories via constructor injection in `di.ts`.

## Component Structure

Every component folder contains:

- `ComponentName.tsx` - Implementation
- `ComponentName.module.css` - CSS modules (no global styles)
- `index.ts` - Re-exports default

Import via folder: `import BookList from "../components/BookList"`

## Accessibility Requirements (Non-Negotiable)

1. **Semantic HTML**: Use `<main>`, `<nav>`, `<section>`, proper headings
2. **ARIA labels**: Every interactive element needs `aria-label` (translated)
3. **Keyboard navigation**: Tab, Enter, Escape must work everywhere
4. **Focus management**: Use `useFocusManagement` and `useFocusTrap` from `ui/hooks/useAccessibility.ts`
5. **Live regions**: Dynamic content needs `aria-live="polite"` or `role="alert"`
6. **High contrast support**: Check `@media (prefers-contrast: high)` in CSS
7. **Reduced motion**: Respect `@media (prefers-reduced-motion: reduce)`
8. **Color contrast**: WCAG AA minimum (4.5:1)

See `ACCESSIBILITY.md` for comprehensive patterns.

## i18n (Internationalization)

All text must be translated via `react-i18next`:

```typescript
const { t } = useTranslation();
<button aria-label={t("bookList.refreshButton")}>{t("common.refresh")}</button>;
```

Add keys to BOTH `src/i18n/locales/en.json` AND `es.json`. Use interpolation: `t("bookList.author", { name: book.author.name })`.

Language switcher updates HTML `lang` attribute automatically.

## Zustand Store Pattern

Stores split state from actions:

```typescript
type IBookStore = BookStoreState & BookStoreActions;

type BookStoreState = {
  books: Book[];
};

type BookStoreActions = {
  setBooks: (books: Book[]) => void;
};
```

Access via `container.storeFactory.useBookStore(selector)` - **always use selectors** to minimize re-renders.

## Development Workflow

```bash
npm run dev          # Start Vite dev server (port 5173)
npm run json-server  # Start mock API (port 4000)
npm run build        # TypeScript compile + Vite build
npm run lint         # ESLint check
```

**Important**: Run dev server AND json-server in separate terminals. API at `http://localhost:4000`, configured in `src/infrastructure/config.ts`.

## CSS Patterns

- **CSS Modules**: All styles scoped per component
- **Light/dark mode**: Use `light-dark(lightColor, darkColor)` function
- **Responsive**: Touch targets min 44x44px with `@media (pointer: coarse)`
- **Animations**: Wrap in `@media (prefers-reduced-motion: no-preference)`

## Type Safety

- Use `type` for unions/aliases, `interface` for object shapes
- All domain models export as `type` (e.g., `export type { Book }`)
- Repository/service implementations use factory functions or classes
- Strict TypeScript enabled

## Common Gotchas

- Don't import stores directly; use `container.storeFactory`
- StrictMode disabled in dev for React 19 compatibility (see `main.tsx`)
- Notification modals with actions MUST have both `actionButtonText` AND `onAction`
- All ARIA labels must be translated strings, not hardcoded English
- CSS transitions require both enter/exit classes for `react-transition-group`

## React Router v7

Using new data router pattern with `react-router` (not `react-router-dom`):

```tsx
import { BrowserRouter, Route, Routes } from "react-router";
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
</Route>;
```

Layout component uses `<Outlet />` for nested routes.

## Testing Accessibility

Use browser tools:

- Chrome Lighthouse > Accessibility audit
- Firefox Accessibility Inspector
- Test with VoiceOver (macOS): Cmd+F5
- Test keyboard-only: Tab, Enter, Escape
