import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabase-client";

interface LeaderboardEntry {
  asset_type: string;
  owner_address: string;
  amount: string;
  discord_user_name?: string;
}

export function useFarmLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      try {
        const res = await supabase.functions.invoke<LeaderboardEntry[]>("banana-farm-leaderboard");
        return res.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  });
}
