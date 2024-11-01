import PageTitle from "../components/PageTitle";
import { Box, Flex, Heading, Image, List, ListItem, Text } from "@chakra-ui/react";

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
          <List.Root>
            <List.Item>
              A regular spot you frequent—like a burger joint, library, or coffee shop—can become a Beacon Event. Just
              bring along a GOGO plushie* to be your BEACON!
            </List.Item>
            <List.Item>
              It's the simplest version of Movement Labs' meetups: super casual and easy, and it can turn into a regular
              hangout!
            </List.Item>
          </List.Root>
          <Heading size="md" marginTop={4} marginBottom={2}>
            How to Beacon Event:
          </Heading>
          <List.Root>
            <List.Item marginTop={4}>
              <b>A Regular Location/Spot:</b>
            </List.Item>
            <List.Root>
              <List.Item>Stick to your usual routine and bring your GOGO plushie along.</List.Item>
            </List.Root>
            <List.Item marginTop={4}>
              <b>Actions:</b>
            </List.Item>
            <List.Root>
              <List.Item>Invite Gorillaz or friends to join you!</List.Item>
              <List.Item>Take photos or videos to document GOGO's regular meetups.</List.Item>
            </List.Root>
            <List.Item marginTop={4}>
              <b>Post-Event:</b>
            </List.Item>
            <List.Root>
              <List.Item>Share your Beacon Event on Twitter and the Gorillaz Discord!</List.Item>
              <ListItem>Then, enjoy the rest of your day or evening!</ListItem>
            </List.Root>
          </List.Root>
          <Heading size="md" marginTop={4} marginBottom={2}>
            Recommendations:
          </Heading>
          <List.Root>
            <List.Item>These are fun events that you can easily add to your weekly or bi-weekly routine.</List.Item>
            <List.Item>Get a GOGO plushie*! The official GOGO plushies are still in development.</List.Item>
            <List.Item>Have fun, play, eat, drink, and connect with all your Gorillaz friends!</List.Item>
          </List.Root>
          <Text marginTop={4}>* Any gorilla plushie will work for now.</Text>
        </Box>
      </Flex>
    </>
  );
}

export default BeaconEventsPage;
