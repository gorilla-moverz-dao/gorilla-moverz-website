import { useFarmOwnedNFTs } from "./useFarmOwnedNFTs";
import { Box, Flex, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import PageTitle from "../PageTitle";
import FarmCollectionMint from "./FarmCollectionMint";
import { useEffect, useState } from "react";
import Assets from "../Assets";
import useAssets from "../../hooks/useAssets";
import useFarmData from "./useFarmData";
import FarmCountdown from "./FarmCountdown";
import useFarmCollection from "./useFarmCollection";
import BoxBlurred from "../BoxBlurred";
import useBananaFarm from "../../hooks/useBananaFarm";

interface Props {
  collectionId: `0x${string}`;
  enableFarming: boolean;
}

function FarmerOverview({ collectionId, enableFarming }: Props) {
  const { data: ownedNFTs, isLoading } = useFarmOwnedNFTs();
  const farmerNFT = ownedNFTs?.find((nft) => nft.current_token_data?.collection_id === collectionId);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { address, farm } = useBananaFarm();
  const { refetch: refetchAssets } = useAssets();
  const toast = useToast();

  const { data: farmed_data, refetch: refetchFarmed } = useFarmData();

  const collection = useFarmCollection(collectionId);

  const farmNFT = async (farmerNFT: `0x${string}`, partnerNFTs: `0x${string}`[]) => {
    try {
      const amount = await farm(farmerNFT, partnerNFTs);
      refetchFarmed();

      toast({
        title: "Success",
        description: "Farmed " + amount + " Banana(s)",
        colorScheme: "green",
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error",
        description: (e as Error).message,
        colorScheme: "red",
        isClosable: true,
      });
    }
    refetchAssets();
  };

  useEffect(() => {
    if (farmerNFT) {
      fetch(farmerNFT.current_token_data?.token_uri ?? "").then((res) => {
        res.json().then((data) => {
          setImageUrl(data.image);
        });
      });
    }
  }, [farmerNFT]);

  if (isLoading || !collection) return <Spinner />;

  if (!farmerNFT) {
    return (
      <>
        <FarmCollectionMint collectionId={collectionId} />
      </>
    );
  }

  if (!ownedNFTs) return <Spinner />;

  const partnerNFTIds = ownedNFTs
    ?.filter((nft) => nft.current_token_data?.collection_id !== collectionId)
    .map((nft) => nft.current_token_data?.token_data_id as `0x${string}`);

  return (
    <>
      {farmerNFT && (
        <>
          <Flex direction={{ base: "column", md: "row" }} gap={6}>
            <Box flex={2}>
              {imageUrl && (
                <Image rounded={8} src={imageUrl} style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)" }} />
              )}
              {!imageUrl && (
                <>
                  <Spinner />
                  <Text>Loading image...</Text>
                </>
              )}
            </Box>

            <Box flex={3}>
              <BoxBlurred padding={4}>
                <PageTitle size="lg" paddingTop={0}>
                  {farmerNFT.current_token_data?.current_collection?.collection_name} | #
                  {farmerNFT.current_token_data?.token_name}
                </PageTitle>
                <Text paddingBottom={4}>{farmerNFT.current_token_data?.current_collection?.description}</Text>

                <Assets />

                {enableFarming ? (
                  <>
                    {address && farmed_data && (
                      <Box paddingTop={4}>
                        <FarmCountdown
                          seconds={farmed_data.remainingTime > 0 ? farmed_data.remainingTime : 0}
                          onActivate={() =>
                            farmNFT(farmerNFT.current_token_data?.token_data_id as `0x${string}`, partnerNFTIds)
                          }
                        />
                        <Text paddingTop={2}>
                          <i>
                            Last Farmed:&nbsp;
                            {farmed_data.lastFarmedDate && farmed_data.lastFarmedDate.getDate() > 0
                              ? farmed_data.lastFarmedDate.toLocaleString()
                              : "Never"}
                          </i>
                        </Text>

                        {partnerNFTIds.length > 0 && (
                          <Text>You have {partnerNFTIds.length} Partner NFTs that will boost your farm. </Text>
                        )}
                      </Box>
                    )}
                  </>
                ) : (
                  <Text paddingTop={4}>Farm bananas in the banana farm an enjoy the boost!</Text>
                )}
              </BoxBlurred>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}

export default FarmerOverview;
