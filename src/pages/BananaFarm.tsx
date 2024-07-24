import { Box, Flex } from "@chakra-ui/react";
import { WalletSelector } from "../components/WalletSelector";
import FarmerNFT from "../components/farmer/FarmerNFT";
import Leaderboard from "../components/farmer/Leaderboard";

function BananaFarm() {
  return (
    <div>
      <Flex flexDir="column">
        <Box paddingBottom={4}>
          <WalletSelector />
        </Box>

        <FarmerNFT />

        <Leaderboard />
      </Flex>
    </div>
  );
}

export default BananaFarm;
