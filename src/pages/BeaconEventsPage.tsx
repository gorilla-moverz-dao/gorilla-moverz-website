import PageTitle from "../components/PageTitle";
import { Box, Flex, Heading, Image, ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";

function BeaconEventsPage() {
  return (
    <>
      <PageTitle size="xl" paddingTop={0}>
        Beacon Events
      </PageTitle>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Box flex={2}>
          <Image rounded={8} src="/images/gorilla-beacon.jpg" alt="Gorilla Beacon Events" />
        </Box>

        <Box flex={3}>
          <Heading size="md" marginBottom={2}>
            What Are Beacon Events?
          </Heading>
          <UnorderedList>
            <ListItem>
              A regular spot you frequent—like a burger joint, library, or coffee shop—can become a Beacon Event. Just
              bring along a GOGO plushie* to be your BEACON!
            </ListItem>
            <ListItem>
              It's the simplest version of Movement Labs' meetups: super casual and easy, and it can turn into a regular
              hangout!
            </ListItem>
          </UnorderedList>
          <Heading size="md" marginTop={4} marginBottom={2}>
            How to Beacon Event:
          </Heading>
          <OrderedList>
            <ListItem marginTop={4}>
              <b>A Regular Location/Spot:</b>
            </ListItem>
            <UnorderedList>
              <ListItem>Stick to your usual routine and bring your GOGO plushie along.</ListItem>
            </UnorderedList>
            <ListItem marginTop={4}>
              <b>Actions:</b>
            </ListItem>
            <UnorderedList>
              <ListItem>Invite Gorillaz or friends to join you!</ListItem>
              <ListItem>Take photos or videos to document GOGO's regular meetups.</ListItem>
            </UnorderedList>
            <ListItem marginTop={4}>
              <b>Post-Event:</b>
            </ListItem>
            <UnorderedList>
              <ListItem>Share your Beacon Event on Twitter and the Gorillaz Discord!</ListItem>
              <ListItem>Then, enjoy the rest of your day or evening!</ListItem>
            </UnorderedList>
          </OrderedList>
          <Heading size="md" marginTop={4} marginBottom={2}>
            Recommendations:
          </Heading>
          <UnorderedList>
            <ListItem>These are fun events that you can easily add to your weekly or bi-weekly routine.</ListItem>
            <ListItem>Get a GOGO plushie*! The official GOGO plushies are still in development.</ListItem>
            <ListItem>Have fun, play, eat, drink, and connect with all your Gorillaz friends!</ListItem>
          </UnorderedList>
          <Text marginTop={4}>* Any gorilla plushie will work for now.</Text>
        </Box>
      </Flex>
    </>
  );
}

export default BeaconEventsPage;
