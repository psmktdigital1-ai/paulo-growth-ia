import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PauloGrowthIA from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PauloGrowthIA />
  </StrictMode>
);
