import { useQuery } from "@tanstack/react-query";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useContractClient from "../../hooks/useContracts";

const useFarmData = () => {
  const { account } = useWallet();
  const client = useContractClient();

  return useQuery({
    queryKey: ["last_farmed", account?.address],
    refetchInterval: 1000 * 60,
    queryFn: async () => {
      if (!account?.address) return null;

      try {
        const treasuryTimeout = await client.getTreasuryTimeout();
        const lastFarmed = await client.getLastFarmed();

        const lastFarmedDate =
          lastFarmed !== "0"
            ? new Date(parseInt(lastFarmed) * 1000)
            : undefined;

        const currentDate = new Date();
        const differenceInSeconds = lastFarmedDate
          ? Math.floor(
              (currentDate.getTime() - lastFarmedDate.getTime()) / 1000
            )
          : treasuryTimeout;
        const remainingTime = treasuryTimeout - differenceInSeconds;

        return {
          lastFarmedDate,
          remainingTime,
          treasuryTimeout,
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    enabled: true,
  });
};

export default useFarmData;
