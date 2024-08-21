import { Link, useSearchParams } from "react-router-dom";
import useFarmCollections from "./useFarmCollections";
import FarmerOverview from "./FarmOverview";
import { Card, CardBody, Heading, SimpleGrid, Stack, Image } from "@chakra-ui/react";

function FarmPartners() {
  const { data, error } = useFarmCollections();
  const collections = data?.filter((collection) => collection.slug !== "farmer");
  const [searchParams] = useSearchParams();
  const collectionId = searchParams.get("collectionId");

  if (error) return null;

  if (collectionId) {
    return (
      <div>
        <FarmerOverview collectionId={collectionId} enableFarming={false} />
      </div>
    );
  }

  return (
    <div>
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(30%, 320px))">
        {collections?.map((collection) => (
          <Link key={collection.id} to={`./?collectionId=${collection.collection_address}`}>
            <Card
              key={collection.id}
              style={{
                backdropFilter: "blur(20px)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.28)",
                borderRadius: 8,
              }}
            >
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

export default FarmPartners;
