import { createBrowserRouter } from "react-router-dom";

import Statistics from "../Statistics/Statistics.tsx";
import App from "../App.tsx";
import AllSongsPage from "../Songs/AllSongs.tsx";

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
    element: <AllSongsPage />,
  },
]);
