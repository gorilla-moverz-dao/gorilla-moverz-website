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
import { COMMUNITY_COLLECTION_ID, FOUNDERS_COLLECTION_ID } from "./constants";
import GorillaNFTOverview from "./pages/GorillaNFTOverview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      {
        path: "nfts",
        element: <GorillaNFTOverview />,
        children: [
          {
            element: <GorillaNFT collectionId={FOUNDERS_COLLECTION_ID} title="Founders Edition" path="founder" />,
            path: "founder",
            children: [{ path: ":id", element: <NFTDetail collectionId={FOUNDERS_COLLECTION_ID} /> }],
          },
          {
            element: <GorillaNFT collectionId={COMMUNITY_COLLECTION_ID} title="Community Edition" path="community" />,
            path: "community",
            children: [{ path: ":id", element: <NFTDetail collectionId={COMMUNITY_COLLECTION_ID} /> }],
          },
        ],
      },
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
