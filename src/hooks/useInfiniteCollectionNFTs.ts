import { useInfiniteQuery } from "@tanstack/react-query";
import { useCollectionNFTs } from "./useCollectionNFTs";
import { Current_Token_Datas_V2_Bool_Exp } from "../gql/graphql";

export function useInfiniteCollectionNFTs(filter: Current_Token_Datas_V2_Bool_Exp) {
  const { data, isLoading, error } = useCollectionNFTs(filter);

  const pageSize = 50;

  return useInfiniteQuery({
    queryKey: ["collection_nfts_infinite", filter],
    queryFn: async ({ pageParam = 0 }) => {
      if (error) throw error;

      const startIndex = pageParam * pageSize;
      return data?.slice(startIndex, startIndex + pageSize) ?? [];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === pageSize ? allPages.length : undefined;
    },
    enabled: !isLoading && (!!data || !!error),
    initialPageParam: 0,
  });
}
