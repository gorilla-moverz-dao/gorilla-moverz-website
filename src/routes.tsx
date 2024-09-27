import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Partners from "./pages/Partners";
import GorillaNFT from "./pages/GorillaNFT";
import Media from "./pages/Media";
import BananaFarm from "./pages/BananaFarm";
import BeaconEventsPage from "./pages/BeaconEventsPage";

import { farmRoutes } from "./components/banana-farm/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "nfts", element: <GorillaNFT /> },
      { path: "media", element: <Media /> },
      { path: "partners", element: <Partners /> },
      { path: "beacon-events", element: <BeaconEventsPage /> },
      {
        path: "bananas",
        element: <BananaFarm />,
        children: farmRoutes,
      },
    ],
  },
]);

export default router;
