import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabList, Tab, SimpleGrid, CardBody, Card, Stack, Image, Heading } from "@chakra-ui/react";
import PageTitle from "../components/PageTitle";

function GorillaNFTOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = location.pathname.includes("founder") ? 0 : 1;
  const isDetailPageActive = useLocation().pathname.includes("nfts/");

  if (!isDetailPageActive) {
    return (
      <>
        <PageTitle size="xl" paddingTop={0}>
          Gorilla Moverz NFT Collections
        </PageTitle>

        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(49%, 420px))">
          <Card className="gorillaz-card">
            <CardBody onClick={() => navigate("/nfts/founder")}>
              <Image src="images/collection-founder.png"></Image>
              <Stack mt="6" spacing="3">
                <Heading size="md" color="green.600">
                  Founders Collection
                </Heading>
              </Stack>
            </CardBody>
          </Card>

          <Card className="gorillaz-card">
            <CardBody onClick={() => navigate("/nfts/community")}>
              <Image src="images/collection-community.png"></Image>
              <Stack mt="6" spacing="3">
                <Heading size="md" color="green.600">
                  Community Collection
                </Heading>
              </Stack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </>
    );
  }

  return (
    <>
      <Tabs
        index={currentTab}
        paddingBottom={2}
        colorScheme="green"
        onChange={(index) => {
          const path = index === 0 ? "/nfts/founder" : "/nfts/community";
          navigate(path);
        }}
      >
        <TabList>
          <Tab>Founders Collection</Tab>
          <Tab>Community Collection</Tab>
        </TabList>
      </Tabs>

      <Outlet />
    </>
  );
}

export default GorillaNFTOverview;
