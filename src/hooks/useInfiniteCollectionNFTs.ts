import { useInfiniteQuery } from "@tanstack/react-query";
import { graphql } from "../gql";
import { Current_Token_Datas_V2_Bool_Exp } from "../gql/graphql";
import { INDEXER_URL } from "../constants";
import { request } from "graphql-request";

const query = graphql(`
  query GetCollectionNfts($limit: Int!, $offset: Int!, $filter: current_token_datas_v2_bool_exp) {
    current_token_datas_v2(where: $filter, limit: $limit, offset: $offset, order_by: [{ token_name: asc }]) {
      description
      token_name
      token_data_id
      token_uri
      decimals
    }
  }
`);

export function useInfiniteCollectionNFTs(filter: Current_Token_Datas_V2_Bool_Exp) {
  const pageSize = 50;

  return useInfiniteQuery({
    queryKey: ["collection_nfts_infinite", filter],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const offset = pageParam * pageSize;
        const res = await request(INDEXER_URL, query, {
          limit: pageSize,
          offset,
          filter,
        });

        return res.current_token_datas_v2;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === pageSize ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
}
