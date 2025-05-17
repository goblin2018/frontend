import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AssetGallery from "./AssetGallery";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AssetGallery />
  </StrictMode>
);
