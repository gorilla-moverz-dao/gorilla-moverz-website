import useBananaFarmCollections from "./useBananaFarmCollections";

const useBananaFarmCollection = (collectionId: string) => {
  const { data } = useBananaFarmCollections();
  return data?.find((collection) => collection.collection_address === collectionId);
};

export default useBananaFarmCollection;
