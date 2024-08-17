import { useOwnedNFTs } from "../../hooks/useOwnedNFTs";
import { Box, Button, Flex, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import PageTitle from "../PageTitle";
import HeroSection from "./HeroSection";
import { useEffect, useState } from "react";
import Assets from "../Assets";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useContractClient from "../../hooks/useContracts";
import useAssets from "../../hooks/useAssets";
import useFarmData from "./useFarmData";
import Countdown from "./Countdown";
import useBananaFarmCollection from "./useBananaFarmCollection";

interface Props {
  collectionId: string;
  enableFarming: boolean;
}

function FarmerNFT({ collectionId, enableFarming }: Props) {
  const { account } = useWallet();
  const { data: ownedNFTs, isLoading } = useOwnedNFTs();
  const farmerNFT = ownedNFTs?.find((nft) => nft.current_token_data.collection_id === collectionId);
  const [imageUrl, setImageUrl] = useState<string>("");

  const contractClient = useContractClient();
  const { refetch: refetchAssets } = useAssets();
  const toast = useToast();

  const { data: farmed_data, refetch: refetchFarmed } = useFarmData();

  const collection = useBananaFarmCollection(collectionId);

  const withdraw = async (farmerNFT: string, partnerNFTs: string[]) => {
    try {
      const amount = await contractClient.farm(farmerNFT, partnerNFTs);
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
      fetch(farmerNFT.current_token_data.token_uri).then((res) => {
        res.json().then((data) => {
          setImageUrl(data.image);
        });
      });
    }
  }, [farmerNFT]);

  if (!collection) return null;

  if (isLoading) return <Spinner />;

  if (!ownedNFTs)
    return (
      <>
        <PageTitle size="lg" paddingTop={4}>
          No Farmer NFT found
        </PageTitle>
        <Text>Please mint your NFT to participate.</Text>

        <HeroSection collectionId={collectionId} />
      </>
    );

  const partnerNFTCollectionIds = ownedNFTs
    ?.filter((nft) => nft.current_token_data.collection_id !== collectionId)
    .map((nft) => nft.current_token_data.token_data_id);

  return (
    <>
      {ownedNFTs && farmerNFT && (
        <>
          <PageTitle size="lg" paddingTop={4}>
            Your Farmer
          </PageTitle>

          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            <Box flex={1}>
              {imageUrl && <Image rounded={8} src={imageUrl} />}
              {!imageUrl && (
                <>
                  <Spinner />
                  <Text>Loading image...</Text>
                </>
              )}
            </Box>

            <Box flex={1}>
              <PageTitle size="lg" paddingTop={0}>
                {farmerNFT.current_token_data.current_collection.collection_name} | #
                {farmerNFT.current_token_data.token_name}
              </PageTitle>
              <Text paddingBottom={4}>{farmerNFT.current_token_data.current_collection.description}</Text>

              <Assets />

              {enableFarming ? (
                <>
                  {account && farmed_data && (
                    <Box paddingTop={4}>
                      <Button
                        onClick={() => withdraw(farmerNFT.current_token_data.token_data_id, partnerNFTCollectionIds)}
                        colorScheme={farmed_data.remainingTime > 0 ? "gray" : "green"}
                        disabled={farmed_data.remainingTime > 0}
                      >
                        <Countdown seconds={farmed_data.remainingTime > 0 ? farmed_data.remainingTime : 0} />
                      </Button>
                      <Text paddingTop={2}>
                        <i>
                          Last Farmed:&nbsp;
                          {farmed_data.lastFarmedDate && farmed_data.lastFarmedDate.getDate() > 0
                            ? farmed_data.lastFarmedDate.toLocaleString()
                            : "Never"}
                        </i>
                      </Text>

                      {partnerNFTCollectionIds.length > 0 && (
                        <Text>You have {partnerNFTCollectionIds.length} Partner NFTs that will boost your farm. </Text>
                      )}
                    </Box>
                  )}
                </>
              ) : (
                <Text paddingTop={4}>Farm bananas in the banana farm an enjoy the boost!</Text>
              )}
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}

export default FarmerNFT;
