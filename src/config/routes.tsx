import { createBrowserRouter } from "react-router-dom";

import Statistics from "../Statistics/Statistics.tsx";
import App from "../App.tsx";
import SongsPage from "../Songs/Songs.tsx";

export const router = createBrowserRouter([
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
