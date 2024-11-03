import { useQuery } from "@tanstack/react-query";
import { BANANA_CONTRACT_ADDRESS, EXCLUDE_LEADERBOARD } from "../../constants";
import useMovement from "../../hooks/useMovement";
import { graphql } from "../../gql";

const query = graphql(`
  query GetLeaderboard($asset_type: String, $exclude: [String!]) {
    current_fungible_asset_balances(
      where: { asset_type: { _eq: $asset_type }, _and: { owner_address: { _nin: $exclude } } }
      order_by: { amount: desc }
      limit: 100
    ) {
      asset_type
      owner_address
      amount
    }
  }
`);

export function useFarmLeaderboard() {
  const { graphqlRequest, indexerUrl } = useMovement();

  return useQuery({
    queryKey: ["leaderboard"],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        const res = await graphqlRequest(indexerUrl, query, {
          asset_type: BANANA_CONTRACT_ADDRESS,
          exclude: EXCLUDE_LEADERBOARD,
        });

        return res.current_fungible_asset_balances;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
