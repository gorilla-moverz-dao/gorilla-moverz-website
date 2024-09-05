import useMovement from "./useMovement";

const useLaunchpad = () => {
  const { address, signAndAwaitTransaction, createEntryPayload, launchpadABI, launchpadClient } = useMovement();

  const mintNFT = async (collectionId: `0x${string}`) => {
    const response = await signAndAwaitTransaction(
      createEntryPayload(launchpadABI, {
        function: "mint_nft",
        functionArguments: [collectionId, 1],
        typeArguments: [],
      }),
    );
    return response;
  };

  async function getStartAndEndTime(collection_id: `0x${string}`) {
    const mintStageRes = await launchpadClient.view.get_active_or_next_mint_stage({
      typeArguments: [],
      functionArguments: [collection_id],
    });

    const mintStage = mintStageRes[0].vec[0];

    const startAndEndRes = await launchpadClient.view.get_mint_stage_start_and_end_time({
      typeArguments: [],
      functionArguments: [collection_id, mintStage as string],
    });

    const [start, end] = startAndEndRes;

    return {
      startDate: new Date(parseInt(start, 10) * 1000),
      endDate: new Date(parseInt(end, 10) * 1000),
      // isMintInfinite is true if the mint stage is 100 years later
      isMintInfinite: parseInt(end, 10) === parseInt(start, 10) + 100 * 365 * 24 * 60 * 60,
    };
  }

  async function getIsAllowlisted(address: `0x${string}`, collection_id: `0x${string}`) {
    return (
      await launchpadClient.view.is_allowlisted({
        functionArguments: [address, collection_id],
        typeArguments: [],
      })
    )[0];
  }

  return {
    address,
    mintNFT,
    getStartAndEndTime,
    getIsAllowlisted,
  };
};

export default useLaunchpad;
