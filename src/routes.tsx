import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./pages/Layout";
import BananaFarm from "./pages/BananaFarm";
import { farmRoutes } from "./components/banana-farm/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <BananaFarm />,
        children: farmRoutes,
      },
    ],
  },
]);

export default router;
