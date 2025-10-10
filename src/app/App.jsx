import React, { Fragment, Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../styles/app.scss";
import ScrollToTop from "../shared/components/navigation/ScrollToTop";

import HomePage from "../features/home";
import Communities from "./routes";
import { AppSettingsProvider } from "../shared/contexts/AppSettingsContext";
import { useTranslation } from "../shared/hooks/useTranslation";

const CustomCursor = lazy(() => import("../shared/components/cursor/CustomCursor"));

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
  const [enableCursor, setEnableCursor] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () =>
      setEnableCursor(pointerQuery.matches && !motionQuery.matches);

    update();

    if (typeof pointerQuery.addEventListener === "function") {
      pointerQuery.addEventListener("change", update);
    } else if (typeof pointerQuery.addListener === "function") {
      pointerQuery.addListener(update);
    }

    if (typeof motionQuery.addEventListener === "function") {
      motionQuery.addEventListener("change", update);
    } else if (typeof motionQuery.addListener === "function") {
      motionQuery.addListener(update);
    }

    return () => {
      if (typeof pointerQuery.removeEventListener === "function") {
        pointerQuery.removeEventListener("change", update);
      } else if (typeof pointerQuery.removeListener === "function") {
        pointerQuery.removeListener(update);
      }

      if (typeof motionQuery.removeEventListener === "function") {
        motionQuery.removeEventListener("change", update);
      } else if (typeof motionQuery.removeListener === "function") {
        motionQuery.removeListener(update);
      }
    };
  }, []);

  return (
    <AppSettingsProvider>
      {enableCursor && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}
      <AppRoutes />
    </AppSettingsProvider>
  );
}

export default App;
