import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router";
import i18n from "../i18n/config";

interface AllTheProvidersProps {
  children: React.ReactNode;
}

function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>{children}</BrowserRouter>
    </I18nextProvider>
  );
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
