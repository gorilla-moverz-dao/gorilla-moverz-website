import { launchpadClient, aptosClient } from "../services/movement-client";
import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export interface Token {
  token_name: string;
  cdn_asset_uris: {
    cdn_image_uri: string;
    asset_uri: string;
    raw_image_uri: string;
  };
}

export interface Collection {
  creator_address: string;
  collection_id: `0x${string}`;
  collection_name: string;
  current_supply: number;
  max_supply: number;
  uri: string;
  description: string;
  cdn_asset_uris: {
    cdn_animation_uri: string;
    cdn_image_uri: string;
  };
}

interface MintQueryResult {
  start_date: string;
  end_date: string;
  current_collections_v2: Array<Collection>;
  current_collection_ownership_v2_view: {
    owner_address: string;
  };
  current_collection_ownership_v2_view_aggregate: {
    aggregate: {
      count: number;
    };
  };
  current_token_datas_v2: Array<Token>;
}

interface MintData {
  maxSupply: number;
  totalMinted: number;
  uniqueHolders: number;
  collection: Collection;
  startDate: Date;
  endDate: Date;
  isMintActive: boolean;
  isMintInfinite: boolean;
  isAllowlisted: boolean;
}

async function getStartAndEndTime(collection_id: `0x${string}`) {
  const mintStageRes = await launchpadClient.view.get_active_or_next_mint_stage({
    typeArguments: [],
    functionArguments: [collection_id],
  });

  const mintStage = mintStageRes[0].vec[0];

  const startAndEndRes = await launchpadClient.view.get_mint_stage_start_and_end_time({
    typeArguments: [],
    functionArguments: [collection_id, mintStage as string],
  });

  const [start, end] = startAndEndRes;

  return {
    startDate: new Date(parseInt(start, 10) * 1000),
    endDate: new Date(parseInt(end, 10) * 1000),
    // isMintInfinite is true if the mint stage is 100 years later
    isMintInfinite: parseInt(end, 10) === parseInt(start, 10) + 100 * 365 * 24 * 60 * 60,
  };
}

async function getIsAllowlisted(address: `0x${string}`, collection_id: `0x${string}`) {
  return (
    await launchpadClient.view.is_allowlisted({
      functionArguments: [address, collection_id],
      typeArguments: [],
    })
  )[0];
}

export function useMintData(collection_id: `0x${string}`) {
  const { account } = useWallet();
  const address = account?.address;

  return useQuery({
    queryKey: ["collection_info", address, collection_id],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        if (!collection_id) return null;

        const { startDate, endDate, isMintInfinite } = await getStartAndEndTime(collection_id);

        const isAllowlisted = address ? await getIsAllowlisted(address as `0x${string}`, collection_id) : false;

        const res = await aptosClient.queryIndexer<MintQueryResult>({
          query: {
            variables: {
              collection_id,
            },
            query: `
						query TokenQuery($collection_id: String) {
							current_collections_v2(
								where: { collection_id: { _eq: $collection_id } }
								limit: 1
							) {
                creator_address
                collection_id
								collection_name
								current_supply
								max_supply
								uri
								description
                cdn_asset_uris {
                  cdn_animation_uri
                  cdn_image_uri
                }
							}
							current_collection_ownership_v2_view(
								where: { collection_id: { _eq: $collection_id } }
								order_by: { last_transaction_version: desc }
							) {
								owner_address
							}
							current_collection_ownership_v2_view_aggregate(
								where: { collection_id: { _eq: $collection_id } }
							) {
								aggregate {
									count(distinct: true, columns: owner_address)
								}
							}
						}`,
          },
        });

        const collection = res.current_collections_v2[0];
        if (!collection) return null;

        return {
          maxSupply: collection.max_supply ?? 0,
          totalMinted: collection.current_supply ?? 0,
          uniqueHolders: res.current_collection_ownership_v2_view_aggregate.aggregate?.count ?? 0,
          collection,
          endDate,
          startDate,
          isMintActive:
            new Date() >= startDate && new Date() <= endDate && collection.max_supply > collection.current_supply,
          isMintInfinite,
          isAllowlisted,
        } satisfies MintData;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
