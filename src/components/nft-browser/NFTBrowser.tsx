import { Card, CardBody } from "@chakra-ui/card";
import { FOUNDERS_COLLECTION_ID } from "../../constants";
import { Heading, Image, SimpleGrid, Spinner, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NFTFilter from "./NFTFilter";
import { useInfiniteCollectionNFTs } from "../../hooks/useInfiniteCollectionNFTs";
import InfiniteScroll from "react-infinite-scroll-component";

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

  const { data, isLoading, fetchNextPage, hasNextPage, refetch } = useInfiniteCollectionNFTs(FOUNDERS_COLLECTION_ID, {
    _contains: filter,
  });

  if (isLoading) return <div>Loading...</div>;

  const itemsCount = data?.pages.reduce((acc, page) => acc + page.length, 0) || 0;

  return (
    <div>
      <NFTFilter filter={filter} onFilterChange={buildFilter} />
      <InfiniteScroll
        dataLength={itemsCount} //This is important field to render the next data
        next={fetchNextPage}
        hasMore={!!hasNextPage && !isDetailPageActive}
        loader={<Spinner />}
        refreshFunction={refetch}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>}
        releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>}
      >
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(29%, 300px))">
          {data &&
            data.pages.map((page) =>
              page.map((nft) => (
                <Card
                  className="gorillaz-card"
                  key={nft.token_data_id}
                  onClick={() => {
                    navigate(`/nfts/founder/${nft.token_name}`);
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
              )),
            )}
        </SimpleGrid>
      </InfiniteScroll>
    </div>
  );
}

export default NFTBrowser;
