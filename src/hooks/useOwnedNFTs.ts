import movementClient from "../services/movement-client";
import { useQuery } from "@tanstack/react-query";
import { FARM_COLLECTION_ID } from "../constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export interface Token {
  token_name: string;
  token_data_id: string;
  token_uri: string;
  collection_id: string;
  cdn_asset_uris: {
    cdn_image_uri: string;
    asset_uri: string;
    raw_image_uri: string;
  };
}

export interface CurrentTokenData {
  current_token_data: Token;
  owner_address: string;
  amount: string;
}

interface NFTsQueryResult {
  current_token_ownerships_v2: Array<CurrentTokenData>;
}

export function useOwnedNFTs(collection_id: string = FARM_COLLECTION_ID) {
  const { account } = useWallet();

  return useQuery({
    queryKey: ["owned_nfts", account?.address],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        if (!collection_id || !account?.address) return null;

        const res = await movementClient.queryIndexer<NFTsQueryResult>({
          query: {
            variables: {
              address: account?.address,
              collection_id,
            },
            query: `
						query GetAccountNfts($address: String, $collection_id: String) {
              current_token_ownerships_v2(
                where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, current_token_data: {current_collection: {collection_id: {_eq: $collection_id}}}}
              ) {
                current_token_data {
                  collection_id
                  largest_property_version_v1
                  current_collection {
                    collection_id
                    collection_name
                    description
                    creator_address
                    uri
                    __typename
                  }
                  description
                  token_name
                  token_data_id
                  token_standard
                  token_uri
                  cdn_asset_uris {
                    cdn_image_uri
                    asset_uri
                    raw_image_uri
                  }
                  __typename
                }
                owner_address
                amount
                __typename
              }
            }
`,
          },
        });

        const nft = res.current_token_ownerships_v2[0];
        if (!nft) return null;

        return nft;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
