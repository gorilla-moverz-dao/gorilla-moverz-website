import { useParams } from "react-router-dom";
import { useNFT } from "../hooks/useNFT";
import { Badge, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import BoxBlurred from "./BoxBlurred";
import PageTitle from "./PageTitle";

function NFTDetail() {
  const { id } = useParams();
  const { data: nft, isLoading } = useNFT(id!);

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
      </Box>

      <Box flex={3}>
        <BoxBlurred padding={4}>
          <PageTitle size="lg" paddingTop={0}>
            {nft.current_token_data?.current_collection?.collection_name} | #{nft.current_token_data?.token_name}
          </PageTitle>
          <Text paddingBottom={4}>{nft.current_token_data?.current_collection?.description}</Text>

          <Text>DNA: {nft.metadata?.dna}</Text>

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
        </BoxBlurred>
      </Box>
    </Flex>
  );
}

export default NFTDetail;
