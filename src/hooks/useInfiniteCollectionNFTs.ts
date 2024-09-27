import { useInfiniteQuery } from "@tanstack/react-query";
import { useCollectionNFTs } from "./useCollectionNFTs";

export function useInfiniteCollectionNFTs(collectionId: string, filter: object) {
  const { data, isLoading } = useCollectionNFTs(collectionId, filter);

  return useInfiniteQuery({
    queryKey: ["collection_nfts_infinite", collectionId, filter],
    queryFn: async ({ pageParam = 0 }) => {
      const pageSize = 50;
      const startIndex = pageParam * pageSize;
      return data?.slice(startIndex, startIndex + pageSize) ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length !== 0 ? allPages.length : undefined;
    },
    enabled: !isLoading && !!data,
    initialPageParam: 0,
  });
}
