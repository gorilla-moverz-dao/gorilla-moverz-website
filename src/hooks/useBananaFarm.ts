import useMovement from "./useMovement";

const useBananaFarm = () => {
  const { address, signAndAwaitTransaction, createEntryPayload, bananaFarmABI, bananaFarmClient } = useMovement();

  const farm = async (nft: `0x${string}`, partnerNfts: `0x${string}`[]) => {
    const response = await signAndAwaitTransaction(
      createEntryPayload(bananaFarmABI, {
        function: "farm",
        functionArguments: [nft, partnerNfts],
        typeArguments: [],
      }),
    );

    const amount =
      response.events?.find((i) => i.type === "0x1::fungible_asset::Deposit")?.data.amount / Math.pow(10, 9);

    return amount;
  };

  const getTreasuryTimeout = async () => {
    const response = await bananaFarmClient.view.get_treasury_timeout({
      typeArguments: [],
      functionArguments: [],
    });
    return parseInt(response[0]);
  };

  const getCollectionAddress = async () => {
    const response = await bananaFarmClient.view.collection_address({
      typeArguments: [],
      functionArguments: [],
    });

    return response[0];
  };

  const getLastFarmed = async () => {
    const response = await bananaFarmClient.view.last_farmed({
      typeArguments: [],
      functionArguments: [address!],
    });
    return response[0];
  };

  return {
    address,
    farm,
    getTreasuryTimeout,
    getCollectionAddress,
    getLastFarmed,
  };
};

export default useBananaFarm;
