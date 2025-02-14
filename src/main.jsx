import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Headers from "./components/Header.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Headers />
    <App />
  </StrictMode>
);
