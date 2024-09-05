import { useQuery } from "@tanstack/react-query";
import { BANANA_CONTRACT_ADDRESS, EXCLUDE_LEADERBOARD } from "../../constants";
import useMovement from "../../hooks/useMovement";

export interface CurrentTokenData {
  owner_address: string;
  amount: string;
}

interface NFTsQueryResult {
  current_fungible_asset_balances: Array<CurrentTokenData>;
}

export function useFarmLeaderboard() {
  const { queryIndexer } = useMovement();

  return useQuery({
    queryKey: ["leaderboard"],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        const res = await queryIndexer<NFTsQueryResult>({
          query: {
            variables: {
              asset_type: BANANA_CONTRACT_ADDRESS,
              exclude: EXCLUDE_LEADERBOARD,
            },
            query: `
						query GetLeaderboard($asset_type: String, $exclude: [String!]) {
              current_fungible_asset_balances(
                  where: {
                    asset_type: { _eq: $asset_type }
                     _and: {
                        owner_address: { _nin: $exclude }
                    }
                  }
                  order_by: { amount: desc }
                  limit: 100
              ) {
                  asset_type
                  owner_address
                  amount
              }
          }
        `,
          },
        });

        return res.current_fungible_asset_balances;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
