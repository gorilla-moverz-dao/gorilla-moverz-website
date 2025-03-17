import { Card, CardBody } from "@chakra-ui/react";
import { Heading, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import NFTFilter from "./NFTFilter";
import { useInfiniteCollectionNFTs } from "../../hooks/useInfiniteCollectionNFTs";
import InfiniteScroll from "react-infinite-scroll-component";
import { LazyLoadImage } from "react-lazy-load-image-component";

function NFTBrowser({ collectionId, collectionName }: { collectionId: string; collectionName: string }) {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const filterFromQueryString = searchParams.get("filter");
  const [filter, setFilter] = useState(filterFromQueryString ? JSON.parse(filterFromQueryString) : {});

  useEffect(() => {
    const newFilterFromQueryString = searchParams.get("filter");
    if (newFilterFromQueryString) {
      setFilter(JSON.parse(newFilterFromQueryString));
    } else {
      setFilter({});
    }
  }, [searchParams]);

  const navigate = useNavigate();
  const isDetailPageActive = useLocation().pathname.includes("nfts/" + collectionName);

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
    navigate(`/nfts/${collectionName}?filter=${queryString}`);
  };

  const { data, isLoading, fetchNextPage, hasNextPage, error } = useInfiniteCollectionNFTs({
    collection_id: { _eq: collectionId },
    token_properties: { _contains: filter },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const itemsCount = data?.pages.reduce((acc, page) => acc + page.length, 0) || 0;

  return (
    <div>
      <NFTFilter collectionName={collectionName} filter={filter} onFilterChange={buildFilter} />
      <InfiniteScroll
        dataLength={itemsCount}
        next={fetchNextPage}
        hasMore={!!hasNextPage && !isDetailPageActive}
        loader={<Spinner />}
      >
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(29%, 300px))">
          {data &&
            data.pages.map((page) =>
              page.map((nft) => (
                <Card
                  className="gorillaz-card"
                  key={nft.token_data_id}
                  onClick={() => {
                    navigate(`/nfts/${collectionName}/${nft.token_name.split("#")[1]}`);
                  }}
                >
                  <CardBody>
                    <LazyLoadImage
                      alt={nft.description}
                      src={nft.token_uri}
                      width={260}
                      height={260}
                      effect="blur"
                      threshold={100}
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" color="green.600">
                        {nft.token_name}
                      </Heading>
                    </Stack>
                  </CardBody>
                </Card>
              )),
            )}
        </SimpleGrid>
      </InfiniteScroll>
    </div>
  );
}

export default NFTBrowser;
