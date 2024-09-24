import PageTitle from "../components/PageTitle";
import NFTBrowser from "../components/NFTBrowser";
import { Outlet, useLocation } from "react-router-dom";

function GorillaNFT() {
  const detailRouteActive = useLocation().pathname.includes("founder");
  return (
    <>
      <PageTitle size="xl" paddingTop={0}>
        Gorilla NFTs
      </PageTitle>

      <Outlet />

      <div style={{ display: detailRouteActive ? "none" : "block" }}>
        <NFTBrowser />
      </div>
    </>
  );
}

export default GorillaNFT;
