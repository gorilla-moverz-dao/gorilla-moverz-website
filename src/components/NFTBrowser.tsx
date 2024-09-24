import { Card, CardBody } from "@chakra-ui/card";
import { FOUNDERS_COLLECTION_ID } from "../constants";
import { useCollectionNFTs } from "../hooks/useCollectionNFTs";
import { Heading, Image, SimpleGrid, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function NFTBrowser() {
  const { data, isLoading } = useCollectionNFTs(FOUNDERS_COLLECTION_ID);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(29%, 300px))">
        {data &&
          data.map((nft) => (
            <Card
              className="gorillaz-card"
              key={nft.token_data_id}
              onClick={() => {
                navigate(`/nfts/founder/${nft.token_data_id}`);
              }}
            >
              <CardBody>
                <Image src={`${nft.cdn_asset_uris?.cdn_image_uri}`}></Image>
                <Stack mt="6" spacing="3">
                  <Heading size="md" color="green.600">
                    Founders Collection #{nft.token_name}
                  </Heading>
                </Stack>
              </CardBody>
            </Card>
          ))}
      </SimpleGrid>
    </div>
  );
}

export default NFTBrowser;
