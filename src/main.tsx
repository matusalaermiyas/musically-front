import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./store/configureStore";

import { ToastContainer } from "react-toastify";

import { RouterProvider } from "react-router-dom";

import { router } from "./config/routes.tsx";

import { ThemeProvider } from "styled-components";
import theme from "./theme/theme.ts";

import "rc-dialog/assets/index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
