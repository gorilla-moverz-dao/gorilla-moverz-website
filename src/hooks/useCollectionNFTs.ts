import { useQuery } from "@tanstack/react-query";
import useMovement from "./useMovement";
import { graphql } from "../gql";

const query = graphql(`
  query GetCollectionNfts($collectionId: String!, $offset: Int!) {
    current_token_datas_v2(where: { collection_id: { _eq: $collectionId } }, limit: 100, offset: $offset) {
      description
      token_name
      token_data_id
      token_uri
      cdn_asset_uris {
        cdn_image_uri
        asset_uri
        raw_image_uri
      }
      decimals
    }
  }
`);

export function useCollectionNFTs(collectionId: string) {
  const { address, graphqlRequest, indexerUrl } = useMovement();

  return useQuery({
    queryKey: ["collection_nfts", address],
    queryFn: async () => {
      try {
        if (!address) return null;

        const maxNfts = 369;

        const nfts = [];
        for (let offset = 0; offset < maxNfts; offset += 100) {
          const res = await graphqlRequest(indexerUrl, query, {
            collectionId,
            offset,
          });
          nfts.push(...res.current_token_datas_v2);
        }

        // sort numerically by token_name
        nfts.sort((a, b) => parseInt(a.token_name) - parseInt(b.token_name));

        return nfts;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
