import { useState } from "react";
import PageTitle from "../components/PageTitle";
import {
  Card,
  CardBody,
  Text,
  Stack,
  Heading,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";

interface Episode {
  title: string;
  description: string;
  url: string;
  preview: string;
}

function Media() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const episodes = [
    {
      title: "Movecast Episode #1",
      description: "Gorilla Leon: Vision and Importance of Memes",
      url: "https://www.youtube.com/embed/eWX_ssGKu4w?si=ondczoi9BycPB_nK",
      preview: "https://img.youtube.com/vi/eWX_ssGKu4w/0.jpg",
    },
    {
      title: "Movecast Episode #2",
      description: "Gorilla usedtowels: Real-Life Community Building",
      url: "https://www.youtube.com/embed/a0OTfgkebpg?si=YW9rtr6pdL8wVotn",
      preview: "https://img.youtube.com/vi/a0OTfgkebpg/0.jpg",
    },
    {
      title: "Movecast Episode #3",
      description: "EthCC Integrated Day",
      url: "https://www.youtube.com/embed/_K5VarwTtzU?si=kWlAINbNYFJrA62R",
      preview: "https://img.youtube.com/vi/_K5VarwTtzU/0.jpg",
    },
    {
      title: "Movecast Episode #4",
      description: "BRKT - Bet on what you believe in",
      url: "https://www.youtube.com/embed/Vn22zJktpOs?si=hP0FiFZojW_DLv3m",
      preview: "https://img.youtube.com/vi/Vn22zJktpOs/0.jpg",
    },
    {
      title: "Movecast Episode #5",
      description: "Satay Finance - Unleashing DeFi Simplicity",
      url: "https://www.youtube.com/embed/3WNnaAVH8Sc?si=yUMDfK_LDkQCR8oR",
      preview: "https://img.youtube.com/vi/3WNnaAVH8Sc/0.jpg",
    },
    {
      title: "Movecast Episode #6",
      description: "Lasting Community Design - Cooper Scanlon (Movement Labs)",
      url: "https://www.youtube.com/embed/OydX5_kQG-M?si=ji_k772KbNph4F3i",
      preview: "https://img.youtube.com/vi/OydX5_kQG-M/0.jpg",
    },
  ].reverse();
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>();

  const openEpisodeModal = (episode: Episode) => {
    setSelectedEpisode(episode);
    onOpen();
  };

  return (
    <>
      <Modal size="6xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedEpisode?.description}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              width="100%"
              height="600"
              src={selectedEpisode?.url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <PageTitle size="xl" paddingTop={0}>
        Media
      </PageTitle>

      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(49%, 420px))"
      >
        {episodes.map((episode) => (
          <Card key={episode.url}>
            <CardBody
              onClick={() => openEpisodeModal(episode)}
              cursor={"pointer"}
            >
              <Image src={episode.preview}></Image>
              <Stack mt="6" spacing="3">
                <Heading size="md" color="green.600">
                  {episode.title}
                </Heading>
                <Text>{episode.description}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default Media;
