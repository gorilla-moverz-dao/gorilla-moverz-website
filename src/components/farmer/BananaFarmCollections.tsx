import { Link, useSearchParams } from "react-router-dom";
import useBananaFarmCollections from "./useBananaFarmCollections";
import FarmerNFT from "./FarmerNFT";
import { Card, CardBody, Heading, SimpleGrid, Stack, Image } from "@chakra-ui/react";

function BananaFarmCollections() {
  const { data, error } = useBananaFarmCollections();
  const collections = data?.filter((collection) => collection.slug !== "farmer");
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collectionId");

  if (error) return null;

  if (collectionId) {
    return (
      <div>
        <FarmerNFT collectionId={collectionId} enableFarming={false} />
      </div>
    );
  }

  return (
    <div>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(49%, 420px))">
        {collections?.map((collection) => (
          <Link key={collection.id} to={`./?collectionId=${collection.collection_address}`}>
            <Card key={collection.id}>
              <CardBody cursor={"pointer"}>
                <Image src={`/nfts/${collection.slug}/collection.png`}></Image>
                <Stack mt="6" spacing="3">
                  <Heading size="md" color="green.600">
                    {collection.name}
                  </Heading>
                </Stack>
              </CardBody>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
}

export default BananaFarmCollections;
