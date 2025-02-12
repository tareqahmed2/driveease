import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
    <ToastContainer position="top-center" autoClose={2000} />
  </StrictMode>
);
