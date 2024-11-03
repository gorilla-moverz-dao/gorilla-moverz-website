import { useQuery } from "@tanstack/react-query";
import useMovement from "./useMovement";
import { graphql } from "../gql";
import { Current_Token_Datas_V2_Bool_Exp } from "../gql/graphql";

const query = graphql(`
  query GetCollectionNfts($limit: Int!, $offset: Int!, $filter: current_token_datas_v2_bool_exp) {
    current_token_datas_v2(where: $filter, limit: $limit, offset: $offset) {
      description
      token_name
      token_data_id
      token_uri
      decimals
    }
  }
`);

export function useCollectionNFTs(filter: Current_Token_Datas_V2_Bool_Exp) {
  const { graphqlRequest, indexerUrl } = useMovement();

  return useQuery({
    queryKey: ["collection_nfts", filter],
    queryFn: async () => {
      try {
        const maxNfts = 369;
        const pageSize = 100;

        const nfts = [];
        for (let offset = 0; offset < maxNfts; offset += pageSize) {
          const res = await graphqlRequest(indexerUrl, query, {
            limit: pageSize,
            offset,
            filter,
          });
          nfts.push(...res.current_token_datas_v2);
          // TODO: This is a temporary fix to stop the query from running to many times.
          // We need to find a better way to paginate the query.
          if (res.current_token_datas_v2.length < pageSize) {
            break;
          }
        }

        // sort numerically by token_name
        nfts.sort((a, b) => parseInt(a.token_name.split("#")[1]) - parseInt(b.token_name.split("#")[1]));

        return nfts;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
