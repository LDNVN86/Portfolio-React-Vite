import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/HomePageStyles.scss";
import "./styles/index.scss";
import "./styles/Audio.scss";
import ScrollToTop from "./components/contents/scroll";

import HomePage from "./components/pages/Home/HomePage";
import Communities from "./routes";

function App() {
  return (
    <Router>
      <ScrollToTop></ScrollToTop>
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
    </Router>
  );
}

export default App;
