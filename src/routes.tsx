import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Partners from "./pages/Partners";
import GorillaNFT from "./pages/GorillaNFT";
import Media from "./pages/Media";
import BananaFarm from "./pages/BananaFarm";
import Lighthouse from "./pages/Lighthouse";
import CollectionCreate from "./components/banana-farm/CollectionCreate";
import BananaFarmCollections from "./components/banana-farm/BananaFarmCollections";
import Leaderboard from "./components/banana-farm/Leaderboard";
import FarmerNFT from "./components/banana-farm/FarmerNFT";
import { FARM_COLLECTION_ID } from "./constants";

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
      { path: "lighthouse", element: <Lighthouse /> },
      {
        path: "bananas",
        element: <BananaFarm />,
        children: [
          { index: true, element: <FarmerNFT collectionId={FARM_COLLECTION_ID} enableFarming={true} /> },
          { path: "partner", element: <BananaFarmCollections /> },
          { path: "leaderboard", element: <Leaderboard /> },
          { path: "create", element: <CollectionCreate /> },
        ],
      },
    ],
  },
]);

export default router;
