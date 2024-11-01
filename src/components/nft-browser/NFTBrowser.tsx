import { FOUNDERS_COLLECTION_ID } from "../../constants";
import { Card, Heading, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NFTFilter from "./NFTFilter";
import { useInfiniteCollectionNFTs } from "../../hooks/useInfiniteCollectionNFTs";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NFTBrowser() {
  const searchParams = new URLSearchParams(useLocation().search);
  const filterFromQueryString = searchParams.get("filter");
  const [filter, setFilter] = useState(filterFromQueryString ? JSON.parse(filterFromQueryString) : {});
  const navigate = useNavigate();
  const isDetailPageActive = useLocation().pathname.includes("nfts/founder");

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

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteCollectionNFTs({
    collection_id: { _eq: FOUNDERS_COLLECTION_ID },
    token_properties: { _contains: filter },
  });

  if (isLoading) return <div>Loading...</div>;

  const itemsCount = data?.pages.reduce((acc, page) => acc + page.length, 0) || 0;

  return (
    <div>
      <NFTFilter filter={filter} onFilterChange={buildFilter} />
      <InfiniteScroll
        dataLength={itemsCount}
        next={fetchNextPage}
        hasMore={!!hasNextPage && !isDetailPageActive}
        loader={<Spinner />}
      >
        <SimpleGrid gap={4} templateColumns="repeat(auto-fill, minmax(29%, 300px))">
          {data &&
            data.pages.map((page) =>
              page.map((nft) => (
                <Card.Root
                  className="gorillaz-card"
                  key={nft.token_data_id}
                  onClick={() => {
                    navigate(`/nfts/founder/${nft.token_name.split("#")[1]}`);
                  }}
                >
                  <Card.Body>
                    <LazyLoadImage
                      alt={nft.description}
                      src={nft.token_uri}
                      width={260}
                      height={260}
                      effect="blur"
                      threshold={100}
                    />
                    <Stack mt="6" gap="3">
                      <Heading size="md" color="green.600">
                        {nft.token_name}
                      </Heading>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              )),
            )}
        </SimpleGrid>
      </InfiniteScroll>
    </div>
  );
}

export default NFTBrowser;
