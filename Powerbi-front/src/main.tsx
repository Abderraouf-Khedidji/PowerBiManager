import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ComponentList } from "./components/components/ComponentsList.tsx";
import { TemplateMain } from "./components/templates/TemplateMain.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/components"
          element={
            <TemplateMain>
              <ComponentList />
            </TemplateMain>
          }
        />
        <Route
          path="/add-component"
          element={
            <TemplateMain>
              <h1>AÑADIR PAGE</h1>
            </TemplateMain>
          }
        />
      </Routes>
    </Router>
  </StrictMode>
);
