import { useQuery } from "@tanstack/react-query";
import useBananaFarm from "../../hooks/useBananaFarm";

const useFarmData = () => {
  const { address, getTreasuryTimeout, getLastFarmed } = useBananaFarm();

  return useQuery({
    queryKey: ["last_farmed", address],
    refetchInterval: 1000 * 60,
    queryFn: async () => {
      if (!address) return null;

      try {
        const treasuryTimeout = await getTreasuryTimeout();
        const lastFarmed = await getLastFarmed();

        const lastFarmedDate = lastFarmed !== "0" ? new Date(parseInt(lastFarmed) * 1000) : undefined;

        const currentDate = new Date();
        const differenceInSeconds = lastFarmedDate
          ? Math.floor((currentDate.getTime() - lastFarmedDate.getTime()) / 1000)
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
