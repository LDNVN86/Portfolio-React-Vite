import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/App.scss";
import ScrollToTop from "../shared/components/navigation/ScrollToTop";

import HomePage from "../features/home";
import Communities from "./routes";
import { AppSettingsProvider } from "../shared/contexts/AppSettingsContext";
import { useTranslation } from "../shared/hooks/useTranslation";

const AppRoutes = () => {
  const { t } = useTranslation();

  return (
    <Router>
      <ScrollToTop />
      <Suspense
        fallback={
          <div
            className="fixed inset-0 flex items-center justify-center px-6 text-center text-base font-semibold"
            style={{
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.08), rgba(6,182,212,0.12))",
              color: "var(--text-primary)",
            }}
          >
            {t("common.loading")}
          </div>
        }
      >
        <Routes>
          {Communities.map(({ path, component: Page, layout }, id) => {
            const Layout = layout === null ? Fragment : layout || HomePage;
            return (
              <Route
                key={id}
                path={path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

function App() {
  return (
    <AppSettingsProvider>
      <AppRoutes />
    </AppSettingsProvider>
  );
}

export default App;
