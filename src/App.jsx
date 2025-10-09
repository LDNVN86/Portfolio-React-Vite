import React, { Fragment, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/HomePageStyles.scss";
import "./styles/index.scss";
import "./styles/Audio.scss";
import ScrollToTop from "./components/contents/scroll";
import CustomCursor from "./components/contents/CustomCursor";

import HomePage from "./components/pages/Home/HomePage";
import Communities from "./routes";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { useTranslation } from "./hooks/useTranslation";

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
      <CustomCursor />
      <AppRoutes />
    </AppSettingsProvider>
  );
}

export default App;
