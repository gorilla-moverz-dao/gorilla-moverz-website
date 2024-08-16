import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../services/supabase-client";

const useBananaFarmCollections = () => {
  return useQuery({
    queryKey: ["banana_farm_collections"],
    queryFn: async () => {
      const { data, error } = await supabase.from("banana_farm_collections").select("*").neq("slug", "farmer");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    enabled: true,
  });
};

export default useBananaFarmCollections;
