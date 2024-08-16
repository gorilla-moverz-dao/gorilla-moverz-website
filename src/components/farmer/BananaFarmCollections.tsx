import useBananaFarmCollections from "./useBananaFarmCollections";

function BananaFarmCollections() {
  const { data, error } = useBananaFarmCollections();

  if (error) return null;

  return <div>{JSON.stringify(data)}</div>;
}

export default BananaFarmCollections;
