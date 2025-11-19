# React + TypeScript + Vite - Fully Accessible Application

This is a fully accessible React application built with TypeScript and Vite, implementing comprehensive accessibility features following WCAG 2.1 Level AA standards.

## ♿ Accessibility Features

This application is designed to be inclusive and accessible to all users:

- ✅ **Keyboard Navigation** - Full keyboard support with Tab, Enter, Escape, and Arrow keys
- ✅ **Screen Reader Support** - Proper ARIA labels, roles, and live regions
- ✅ **Focus Management** - Visible focus indicators and focus trapping in modals
- ✅ **High Contrast Mode** - Automatic adaptation for high contrast preferences
- ✅ **Reduced Motion** - Respects user preference for reduced animations
- ✅ **Semantic HTML** - Proper use of HTML5 landmarks and heading hierarchy
- ✅ **Skip Navigation** - Skip links for keyboard users
- ✅ **Color Contrast** - WCAG AA compliant contrast ratios
- ✅ **Touch Target Sizes** - Minimum 44x44px for mobile devices
- ✅ **Light/Dark Mode** - System preference detection and support

For detailed accessibility documentation, see [ACCESSIBILITY.md](./ACCESSIBILITY.md).

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing Accessibility

### Keyboard Navigation

- Use Tab/Shift+Tab to navigate
- Use Enter to activate buttons
- Use Escape to close modals
- All interactive elements should be reachable

### Screen Readers

- **macOS**: VoiceOver (Cmd + F5)
- **Windows**: NVDA or JAWS
- Verify all content is properly announced

### Browser DevTools

- Chrome DevTools > Lighthouse > Accessibility audit
- Firefox > Accessibility Inspector
- Use browser extensions like Axe DevTools or WAVE

## 🏗️ Architecture

This project follows Clean Architecture principles with:

- **Domain Layer**: Business logic and interfaces
- **Application Layer**: Use cases and services
- **Infrastructure Layer**: External dependencies (API, state management)
- **UI Layer**: React components with full accessibility

## 📦 Tech Stack

- React 19
- TypeScript
- Vite
- Zustand (State Management)
- React Router
- React Transition Group

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
