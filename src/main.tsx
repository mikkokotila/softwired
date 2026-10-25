import React from "react";
import { createRoot } from "react-dom/client";
import "./fonts.css";
import "./design/tokens.css";
import "./styles.css";
import "./design/command-center.css";
import App from "./App";
import { StudyProvider } from "./lib/store";
import { ThemeProvider } from "./design/ThemeProvider";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <StudyProvider>
        <App />
      </StudyProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
