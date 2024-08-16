import useAssets from "../hooks/useAssets";
import { Box, HStack, Image } from "@chakra-ui/react";
import PageTitle from "./PageTitle";
import { BANANA_CONTRACT_ADDRESS } from "../constants";

function Assets() {
  const { data: assets } = useAssets();
  const bananas = assets?.filter((i) => i.asset_type === BANANA_CONTRACT_ADDRESS);
  if (!bananas?.length) return null;

  return (
    <>
      {bananas && bananas.length > 0 && (
        <>
          <PageTitle size="lg" paddingTop={0}>
            My bananas
          </PageTitle>

          {bananas.map((asset) => {
            return (
              <HStack key={asset.asset_type} alignItems={"center"}>
                <Image src={asset.metadata?.icon_uri ?? ""} boxSize="48px" />
                <Box>
                  <b>{asset.metadata?.name}</b>
                  <br />
                  Amount: {asset.amount / Math.pow(10, asset.metadata?.decimals ?? 0)}
                </Box>
              </HStack>
            );
          })}
        </>
      )}
    </>
  );
}

export default Assets;
