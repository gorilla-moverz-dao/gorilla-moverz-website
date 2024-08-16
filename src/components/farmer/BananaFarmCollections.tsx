import { Link, useSearchParams } from "react-router-dom";
import useBananaFarmCollections from "./useBananaFarmCollections";
import FarmerNFT from "./FarmerNFT";

function BananaFarmCollections() {
  const { data, error } = useBananaFarmCollections();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collectionId");

  if (error) return null;

  if (collectionId) {
    return (
      <div>
        <h1>Collection ID: {collectionId}</h1>
        <FarmerNFT collectionId={collectionId} />
      </div>
    );
  }

  return (
    <div>
      {data?.map((collection) => (
        <Link key={collection.id} to={`./?collectionId=${collection.collection_address}`}>
          <div>
            <h3>{collection.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BananaFarmCollections;
