import useFarmCollections from "./useFarmCollections";

const useFarmCollection = (collectionId: string) => {
  const { data } = useFarmCollections();
  return data?.find((collection) => collection.collection_address === collectionId);
};

export default useFarmCollection;
