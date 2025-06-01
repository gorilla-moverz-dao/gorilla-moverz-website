import { FaArrowAltCircleLeft } from "react-icons/fa";
import PageTitle from "../components/PageTitle";
import NFTBrowser from "../components/nft-browser/NFTBrowser";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { COMMUNITY_COLLECTION_ID } from "../constants";

function GorillaNFT({ collectionId, title, path }: { collectionId: string; title: string; path: string }) {
  const detailRouteActive = useLocation().pathname.includes(path + "/");
  return (
    <>
      <PageTitle size="xl" paddingTop={0}>
        {detailRouteActive && (
          <span onClick={() => window.history.back()} style={{ cursor: "pointer", marginRight: "8px" }}>
            <FaArrowAltCircleLeft
              style={{
                display: "inline",
                marginRight: "4px",
                verticalAlign: "middle",
                marginBottom: "4px",
                color: "#68d391",
              }}
            />
          </span>
        )}
        {detailRouteActive ? (
          <span onClick={() => window.history.back()} style={{ cursor: "pointer", marginRight: "8px" }}>
            {title}
          </span>
        ) : (
          <Link to={`/nfts/${path}`}>{title}</Link>
        )}
      </PageTitle>
      <Text fontSize="sm" color="gray.300">
        Collection: {collectionId}
      </Text>
      {collectionId === COMMUNITY_COLLECTION_ID && (
        <div style={{ marginBottom: "16px" }}>
          Mint at:{" "}
          <Link
            to="https://cc.gorilla-moverz.xyz"
            target="_blank"
            style={{ textDecoration: "underline", color: "lightgreen", fontWeight: "bold" }}
          >
            cc.gorilla-moverz.xyz
          </Link>
        </div>
      )}

      <Outlet />
      <div style={{ display: detailRouteActive ? "none" : "block" }}>
        <NFTBrowser collectionId={collectionId} collectionName={path} />
      </div>
    </>
  );
}

export default GorillaNFT;
