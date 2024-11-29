import { useParams } from "react-router-dom";
import { useNFT } from "../../hooks/useNFT";
import { Badge, Box, Button, Flex, HStack, Image, Spinner, Text } from "@chakra-ui/react";
import BoxBlurred from "../BoxBlurred";
import PageTitle from "../PageTitle";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState, useEffect } from "react";
import { FOUNDERS_COLLECTION_ID } from "../../constants";

function NFTDetail() {
  const { id } = useParams();
  const { data: nft, isLoading } = useNFT("Gorilla Founder #" + id, FOUNDERS_COLLECTION_ID);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrSize, setQrSize] = useState(352);

  useEffect(() => {
    const updateQRSize = () => {
      if (window.innerWidth <= 768) {
        const containerSize = Math.min(window.innerWidth - 32, 353.6);
        setQrSize(containerSize - 32); // padding'leri çıkarıyoruz (2 * 16px)
      } else {
        setQrSize(352);
      }
    };

    updateQRSize();
    window.addEventListener('resize', updateQRSize);
    return () => window.removeEventListener('resize', updateQRSize);
  }, []);

  if (isLoading) return <Spinner />;
  if (!nft) return <div>NFT not found</div>;

  const properties = nft.current_token_data?.token_properties;
  const imageUrl =
    "https://pinphweythafvrejqfgm.supabase.co/storage/v1/object/public/nft-founders-collection/images/" + id + ".png";

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={6}>
      <Box flex={2}>
        <Image rounded={8} src={imageUrl} style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)" }} />

        <Box paddingTop={4}>
          <Button marginBottom={2} onClick={() => setShowQRCode(!showQRCode)}>
            {showQRCode ? "Hide QR Code" : "Show QR Code"}
          </Button>
          {showQRCode && (
            <Box 
              width={{ base: "100%", md: "353.6px" }}
              height={{ base: "auto", md: "353.6px" }}
            >
              <BoxBlurred padding={4}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <QRCodeCanvas
                    value={window.location.href}
                    size={qrSize}
                    bgColor={"#00000000"}
                    fgColor={"#dddddd"}
                  />
                </Box>
              </BoxBlurred>
            </Box>
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
              {truncateAddress(nft.owner_address)}
            </Badge>
          </HStack>
        </BoxBlurred>
      </Box>
    </Flex>
  );
}

export default NFTDetail;
