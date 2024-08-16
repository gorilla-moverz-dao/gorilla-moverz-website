import { Box, Flex, Text } from "@chakra-ui/react";
import "./HomePage.css";
import PageTitle from "../components/PageTitle";

function HomePage() {
  return (
    <>
      <PageTitle size="xl" paddingTop={0}>
        Wassa wasssaaa! 🍌
      </PageTitle>

      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Box flex={1}>
          <video loop autoPlay muted>
            <source src="/videos/apes-together-strong.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
        <Flex flex={1} flexDirection="column">
          <Text>
            <b>Gorilla Moverz</b> is committed to helping <b>Movement Labs</b> reach the moon. We are the{" "}
            <b>Social Infrastructure</b> project on Movement. As a community of engaged, fanatically supportive Movement
            users, our role involves stimulating activity, promoting initiatives, and providing steady support during
            testnets. Soon this infrastructure will be represented on-chain through an NFT and memecoin. Together, we're
            shaping the future of crypto.
          </Text>
          <Text>
            Beyond this mission, we actively seek strategic partnerships with prominent players and crypto projects in
            the broad Movement ecosystem.
          </Text>
          <Text>
            <b>Apes together strong!</b> 🦍 🍌
          </Text>
        </Flex>
      </Flex>
    </>
  );
}

export default HomePage;
