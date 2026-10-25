import React from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./styles.css";
import App from "./App";
import { StudyProvider } from "./lib/store";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StudyProvider>
      <App />
    </StudyProvider>
  </React.StrictMode>,
);
