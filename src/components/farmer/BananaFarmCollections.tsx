import { Link, useSearchParams } from "react-router-dom";
import useBananaFarmCollections from "./useBananaFarmCollections";
import FarmerNFT from "./FarmerNFT";
import { Card, CardBody, Heading, SimpleGrid, Stack, Image } from "@chakra-ui/react";

function BananaFarmCollections() {
  const { data, error } = useBananaFarmCollections();
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collectionId");
  const slug = data?.find((collection) => collection.collection_address === collectionId)?.slug ?? "";

  if (error) return null;

  if (collectionId) {
    return (
      <div>
        <FarmerNFT collectionId={collectionId} slug={slug} enableFarming={false} />
      </div>
    );
  }

  return (
    <div>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(49%, 420px))">
        {data?.map((collection) => (
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
