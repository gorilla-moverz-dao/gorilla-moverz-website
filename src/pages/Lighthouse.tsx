import { FaExternalLinkAlt } from "react-icons/fa";
import PageTitle from "../components/PageTitle";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";

function Lighthouse() {
  return (
    <>
      <PageTitle size="xl" paddingTop={0}>
        Project Gorilla Lighthouse
      </PageTitle>
      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Box flex={1}>
          <Link href="/documents/lighthouse/gorilla-lighthouse-companion.pdf" isExternal>
            <Image rounded={8} src="/images/lighthouse.jpg" alt="Gorilla Lighthouse" />
          </Link>
        </Box>

        <Box flex={1}>
          <Text>
            <i>
              <b>
                A Gorillish resource aimed to help facilitate local meetups to further Movement's community-driven ethos
              </b>
            </i>
          </Text>
          <Text>
            Movement strives to create an inclusive community designed to welcome every Gorilla regardless of
            circumstance. Part of Movement's mission includes establishing an environment built on respect,
            transparency, and accountability, where each member feels valued.
          </Text>
          <Text>
            Meetups are part of the magic! They provide opportunities for face-to-face interactions, fostering
            meaningful connections and building a strong talent pool. These events also serve as powerful online
            content, showcasing the community-driven essence of Movement.
          </Text>
          <Text>
            Gorilla Lighthouse is the guiding light for Gorillaz who are apeset on hosting a meetup. It is an ongoing
            project and experiment, alive and reactive to the community. The guiding materials and supporting
            documentation will be subject to ongoing updates to ensure they remain relevant and address evolving needs.
          </Text>
          <Link href="/documents/lighthouse/gorilla-lighthouse-companion.pdf" isExternal>
            <Flex alignItems="center">
              <b>View PDF</b>
              <FaExternalLinkAlt alignmentBaseline="baseline" style={{ marginLeft: 8 }} />
            </Flex>
          </Link>
        </Box>
      </Flex>
    </>
  );
}

export default Lighthouse;
