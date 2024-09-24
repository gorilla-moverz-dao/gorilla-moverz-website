import { useParams } from "react-router-dom";
import { useNFT } from "../hooks/useNFT";
import { Badge, Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import BoxBlurred from "./BoxBlurred";
import PageTitle from "./PageTitle";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

function NFTDetail() {
  const { id } = useParams();
  const { data: nft, isLoading } = useNFT(id!);
  const [showQRCode, setShowQRCode] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!nft) return <div>NFT not found</div>;

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={6}>
      <Box flex={2}>
        {nft.current_token_data?.cdn_asset_uris?.cdn_image_uri && (
          <Image
            rounded={8}
            src={nft.current_token_data.cdn_asset_uris.cdn_image_uri}
            style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)" }}
          />
        )}

        <Box paddingTop={4}>
          <Button marginBottom={2} onClick={() => setShowQRCode(!showQRCode)}>
            {showQRCode ? "Hide QR Code" : "Show QR Code"}
          </Button>
          {showQRCode && (
            <BoxBlurred>
              <Box padding={4}>
                <QRCodeCanvas
                  style={{ paddingTop: 10 }}
                  value={window.location.href}
                  size={320}
                  bgColor={"#00000000"}
                  fgColor={"#dddddd"}
                />
              </Box>
            </BoxBlurred>
          )}
        </Box>
      </Box>

      <Box flex={3}>
        <BoxBlurred padding={4}>
          <PageTitle size="lg" paddingTop={0}>
            {nft.current_token_data?.current_collection?.collection_name} | #{nft.current_token_data?.token_name}
          </PageTitle>
          <Text paddingBottom={4}>{nft.current_token_data?.current_collection?.description}</Text>

          <HStack paddingTop={2}>
            <Badge fontSize={"14px"} width={"100px"} paddingX={2} borderRadius={"4px"} colorScheme={"gray"}>
              DNA
            </Badge>
            <Badge fontSize={"14px"} paddingX={2} borderRadius={"4px"} colorScheme={"green"}>
              {nft.metadata.dna}
            </Badge>
          </HStack>

          {nft.metadata.attributes.map((attribute) => (
            <>
              <HStack paddingTop={2}>
                <Badge fontSize={"14px"} width={"100px"} paddingX={2} borderRadius={"4px"} colorScheme={"gray"}>
                  {attribute.trait_type}
                </Badge>
                <Badge fontSize={"14px"} paddingX={2} borderRadius={"4px"} colorScheme={"green"}>
                  {attribute.value}
                </Badge>
              </HStack>
            </>
          ))}
          <HStack paddingTop={2}>
            <Badge fontSize={"14px"} width={"100px"} paddingX={2} borderRadius={"4px"} colorScheme={"gray"}>
              Owner
            </Badge>
            <Badge fontSize={"14px"} paddingX={2} borderRadius={"4px"} colorScheme={"green"}>
              {truncateAddress(nft.owner_address)}
            </Badge>
          </HStack>
        </BoxBlurred>
      </Box>
    </Flex>
  );
}

export default NFTDetail;
