import { useQuery } from "@tanstack/react-query";
import useContractClient from "./useContracts";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const useAssets = () => {
  const contractClient = useContractClient();
  const { account } = useWallet();

  return useQuery({
    queryKey: ["assets", account?.address],
    queryFn: () => contractClient.getAccountCoinsData(),
    enabled: true,
  });
};

export default useAssets;
