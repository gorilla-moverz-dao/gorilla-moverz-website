import { Card, CardBody } from "@chakra-ui/card";
import { FOUNDERS_COLLECTION_ID } from "../../constants";
import { useCollectionNFTs } from "../../hooks/useCollectionNFTs";
import { Heading, Image, SimpleGrid, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NFTFilter from "./NFTFilter";

function NFTBrowser() {
  const searchParams = new URLSearchParams(useLocation().search);
  const filterFromQueryString = searchParams.get("filter");
  const [filter, setFilter] = useState(filterFromQueryString ? JSON.parse(filterFromQueryString) : {});
  const navigate = useNavigate();

  const buildFilter = (property: string, value: string) => {
    const newFilter = { ...filter };
    if (value === "All") {
      delete newFilter[property];
    } else {
      newFilter[property] = value;
    }
    setFilter(newFilter);

    // Add filter to query string
    const queryString = JSON.stringify(newFilter);
    navigate(`/nfts?filter=${queryString}`);
  };

  const { data, isLoading } = useCollectionNFTs(FOUNDERS_COLLECTION_ID, {
    _contains: filter,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <NFTFilter filter={filter} onFilterChange={buildFilter} />
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
