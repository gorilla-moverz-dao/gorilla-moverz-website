import PageTitle from "../components/PageTitle";
import NFTBrowser from "../components/nft-browser/NFTBrowser";
import { Outlet, useLocation } from "react-router-dom";

function GorillaNFT({ collectionId, title, path }: { collectionId: string; title: string; path: string }) {
  const detailRouteActive = useLocation().pathname.includes(path + "/");
  return (
    <>
      <PageTitle size="xl" paddingTop={0}>
        {title}
      </PageTitle>

      <Outlet />

      <div style={{ display: detailRouteActive ? "none" : "block" }}>
        <NFTBrowser collectionId={collectionId} collectionName={path} />
      </div>
    </>
  );
}

export default GorillaNFT;
