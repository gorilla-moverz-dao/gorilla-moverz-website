import { useOwnedNFTs } from "../../hooks/useOwnedNFTs";
import { Box, Button, Flex, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import PageTitle from "../PageTitle";
import { HeroSection } from "./HeroSection";
import { useEffect, useState } from "react";
import Assets from "../Assets";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import useContractClient from "../../hooks/useContracts";
import useAssets from "../../hooks/useAssets";
import useFarmData from "./useFarmData";
import { useLeaderboard } from "../../hooks/useLeaderboard";
import Countdown from "./Countdown";

function FarmerNFT() {
  const { account } = useWallet();
  const { data: ownedNFTs, isLoading } = useOwnedNFTs();
  const [imageUrl, setImageUrl] = useState<string>("");

  const contractClient = useContractClient();
  const { refetch: refetchAssets } = useAssets();
  const toast = useToast();

  const { data: farmed_data, refetch: refetchFarmed } = useFarmData();
  const { refetch: refetchLeaderboard } = useLeaderboard();

  const withdraw = async () => {
    try {
      const amount = await contractClient.withdraw(ownedNFTs?.current_token_data?.token_data_id ?? "");
      refetchFarmed();
      refetchLeaderboard();

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
    if (ownedNFTs) {
      fetch(ownedNFTs.current_token_data.token_uri).then((res) => {
        res.json().then((data) => {
          setImageUrl(data.image);
        });
      });
    }
  }, [ownedNFTs]);

  if (isLoading) return <Spinner />;

  if (!ownedNFTs)
    return (
      <>
        <PageTitle size="lg" paddingTop={4}>
          No Farmer NFT found
        </PageTitle>
        <Text>Please mint your NFT to participate.</Text>

        <HeroSection />
      </>
    );

  return (
    <>
      {ownedNFTs && (
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
              <Text>NFT Number: {ownedNFTs.current_token_data?.token_name}</Text>

              <Assets />

              {account && farmed_data && (
                <Box paddingTop={4}>
                  <Button
                    onClick={() => withdraw()}
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
                </Box>
              )}
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}

export default FarmerNFT;
