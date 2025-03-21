import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Partners from "./pages/Partners";
import GorillaNFT from "./pages/GorillaNFT";
import Media from "./pages/Movecast";
import BananaFarm from "./pages/BananaFarm";
import BeaconEventsPage from "./pages/BeaconEventsPage";

import { farmRoutes } from "./components/banana-farm/routes";
import GalleryPage from "./pages/GalleryPage";
import NFTDetail from "./components/nft-browser/NFTDetail";
import CheckerPage from "./pages/CheckerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "nfts", element: <GorillaNFT />, children: [{ path: "founder/:id", element: <NFTDetail /> }] },
      { path: "media", element: <Media /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "partners", element: <Partners /> },
      { path: "beacon-events", element: <BeaconEventsPage /> },
      { path: "checker", element: <CheckerPage /> },
      { path: "bananas", element: <BananaFarm />, children: farmRoutes },
    ],
  },
]);

export default router;
