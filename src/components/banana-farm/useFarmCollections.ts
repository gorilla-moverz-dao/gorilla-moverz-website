import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabase-client";

const useFarmCollections = () => {
  return useQuery({
    queryKey: ["banana_farm_collections"],
    queryFn: async () => {
      const { data, error } = await supabase.from("banana_farm_collections").select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: true,
  });
};

export default useFarmCollections;
