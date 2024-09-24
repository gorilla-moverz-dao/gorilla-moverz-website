import { useQuery } from "@tanstack/react-query";
import useMovement from "./useMovement";
import { graphql } from "../gql";

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  dna: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

const query = graphql(`
  query GetNft($id: String) {
    current_token_ownerships_v2(where: { amount: { _gt: "0" }, current_token_data: { token_data_id: { _eq: $id } } }) {
      current_token_data {
        collection_id
        largest_property_version_v1
        current_collection {
          collection_id
          collection_name
          description
          uri
        }
        description
        token_name
        token_data_id
        token_uri
        cdn_asset_uris {
          cdn_image_uri
          asset_uri
          raw_image_uri
        }
      }
      owner_address
      amount
    }
  }
`);

export function useNFT(id: string) {
  const { graphqlRequest, indexerUrl } = useMovement();

  return useQuery({
    queryKey: ["nft", id],
    queryFn: async () => {
      try {
        const res = await graphqlRequest(indexerUrl, query, {
          id,
        });

        const nft = res.current_token_ownerships_v2[0];
        const metadata = await fetch(nft.current_token_data!.token_uri!);
        const metadataJson = await metadata.json();

        return { ...nft, metadata: metadataJson as NFTMetadata };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
