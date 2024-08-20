import movementClient from "../../services/movement-client";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useFarmCollections from "./useFarmCollections";

export interface Token {
  token_name: string;
  description: string;
  token_data_id: string;
  token_uri: string;
  collection_id: string;
  current_collection: {
    collection_id: string;
    collection_name: string;
    description: string;
  };
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

export function useFarmOwnedNFTs() {
  const { account } = useWallet();
  const { data: collections, isLoading } = useFarmCollections();

  return useQuery({
    queryKey: ["owned_nfts", account?.address],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        if (!account?.address) return null;
        if (isLoading) return null;

        const collectionIds = collections?.map((collection) => collection.collection_address);

        const res = await movementClient.queryIndexer<NFTsQueryResult>({
          query: {
            variables: {
              address: account?.address,
              collectionIds,
            },
            query: `
						query GetAccountNfts($address: String, $collectionIds: [String!]) {
              current_token_ownerships_v2(
                where: {owner_address: {_eq: $address}, amount: {_gt: "0"}, current_token_data: {current_collection: {collection_id: {_in: $collectionIds}}}}
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

        return res.current_token_ownerships_v2;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
