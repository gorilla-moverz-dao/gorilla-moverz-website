import { useQuery } from "@tanstack/react-query";
import useMovement from "./useMovement";

const useAssets = () => {
  const { address, getAccountCoinsData } = useMovement();

  return useQuery({
    queryKey: ["assets", address],
    queryFn: () => getAccountCoinsData(),
    enabled: true,
  });
};

export default useAssets;
