import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import theme from "./theme/theme.ts";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Statistics from "./Statistics/Statistics.tsx";
import SongsPage from "./Songs/Songs.tsx";
import "rc-dialog/assets/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
  {
    path: "/songs",
    element: <SongsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
