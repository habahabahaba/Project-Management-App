// React:
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Providers:
import ProjectsLocalProvider from "./context/ProjectsLocalProvider";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProjectsLocalProvider>
      <App />
    </ProjectsLocalProvider>
  </StrictMode>,
);
