import { useQuery } from "@tanstack/react-query";
import useMovement from "./useMovement";
import useLaunchpad from "./useLaunchpad";
import { graphql } from "../gql";

const query = graphql(`
  query GetTokenData($collection_id: String) {
    current_collections_v2(where: { collection_id: { _eq: $collection_id } }, limit: 1) {
      creator_address
      collection_id
      collection_name
      current_supply
      max_supply
      uri
      description
    }
    current_collection_ownership_v2_view(
      where: { collection_id: { _eq: $collection_id } }
      order_by: { last_transaction_version: desc }
    ) {
      owner_address
    }
    current_collection_ownership_v2_view_aggregate(where: { collection_id: { _eq: $collection_id } }) {
      aggregate {
        count(distinct: true, columns: owner_address)
      }
    }
  }
`);

export function useMintData(collection_id: `0x${string}`) {
  const { address, graphqlRequest, indexerUrl } = useMovement();
  const { getStartAndEndTime, getIsAllowlisted } = useLaunchpad();

  return useQuery({
    queryKey: ["collection_info", address, collection_id],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        if (!collection_id) return null;

        const { startDate, endDate, isMintInfinite } = await getStartAndEndTime(collection_id);

        const isAllowlisted = address ? await getIsAllowlisted(address as `0x${string}`, collection_id) : false;

        const res = await graphqlRequest(indexerUrl, query, {
          collection_id,
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
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
