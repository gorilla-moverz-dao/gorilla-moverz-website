import { useParams } from "react-router-dom";
import { useNFT } from "../../hooks/useNFT";
import { Badge, Box, Button, Flex, HStack, Image, Spinner, Text } from "@chakra-ui/react";
import BoxBlurred from "../BoxBlurred";
import PageTitle from "../PageTitle";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

function NFTDetail({ collectionId, prefix, digits }: { collectionId: string; prefix: string; digits: number }) {
  const { id } = useParams();
  const paddedId = id?.padStart(digits, "0");
  const { data: nft, isLoading } = useNFT(prefix + paddedId, collectionId);
  const [showQRCode, setShowQRCode] = useState(false);

  if (isLoading) return <Spinner />;
  if (!nft) return <div>NFT not found</div>;

  const properties = nft.current_token_data?.token_properties;
  const imageUrl = nft.current_token_data?.token_uri;

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={6}>
      <Box flex={2}>
        <Image rounded={8} src={imageUrl} style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)" }} />

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
            {nft.current_token_data?.token_name}
          </PageTitle>
          <Text paddingBottom={4}>{nft.current_token_data?.current_collection?.description}</Text>

          {Object.keys(properties).map((key) => (
            <HStack key={key} paddingTop={2}>
              <Badge
                textTransform={"none"}
                fontSize={"14px"}
                width={"120px"}
                paddingX={2}
                borderRadius={"4px"}
                colorScheme={"gray"}
              >
                {key}
              </Badge>
              <Badge textTransform={"none"} fontSize={"14px"} paddingX={2} borderRadius={"4px"} colorScheme={"green"}>
                {properties[key]}
              </Badge>
            </HStack>
          ))}
          <HStack paddingTop={2}>
            <Badge
              textTransform={"none"}
              fontSize={"14px"}
              width={"120px"}
              paddingX={2}
              borderRadius={"4px"}
              colorScheme={"gray"}
            >
              Owner
            </Badge>
            <Badge fontSize={"14px"} paddingX={2} borderRadius={"4px"} colorScheme={"green"}>
              {nft.owner_address ? `${nft.owner_address.slice(0, 6)}...${nft.owner_address.slice(-4)}` : ""}
            </Badge>
          </HStack>
        </BoxBlurred>
      </Box>
    </Flex>
  );
}

export default NFTDetail;
