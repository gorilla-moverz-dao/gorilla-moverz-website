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
import { Helmet } from "react-helmet";

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
    {
      title: "Movecast Episode #7",
      description: "The Keys to Business Development in web3 - Torab (Movement Labs)",
      url: "https://www.youtube.com/embed/v7FtGKCmqxQ?si=zW0N4gbNWDNQA28t",
      preview: "https://img.youtube.com/vi/v7FtGKCmqxQ/0.jpg",
    },
    {
      title: "Movecast Episode #8",
      description: "RazorDAO - How to build a community driven product on Movement",
      url: "https://www.youtube.com/embed/Dg24P0Nv3L8?si=p-Vavgr6Q4l5IRaS",
      preview: "https://img.youtube.com/vi/Dg24P0Nv3L8/0.jpg",
    },
    {
      title: "Movecast Episode #9",
      description: "How to Earn on SocialFi on Movement Labs | Movewiffrens",
      url: "https://www.youtube.com/embed/t0vK6WHzb5w?si=N3-35pQ8fW5b4qqn",
      preview: "https://img.youtube.com/vi/t0vK6WHzb5w/0.jpg",
    },
    {
      title: "Movecast Episode #10",
      description: "Bring DeFi back to Bitcoin on Movement Labs SDK - Nexio",
      url: "https://www.youtube.com/embed/1a83Upmg9XA?si=c-bdMf5gP0PT7ibb",
      preview: "https://img.youtube.com/vi/1a83Upmg9XA/0.jpg",
    },
    {
      title: "Movecast Episode #11",
      description: "How to use AI Content Creation Models | CoScription on Movement Labs",
      url: "https://www.youtube.com/embed/KMHoM7yKvwE?si=A9utOxUGkaB33JUx",
      preview: "https://img.youtube.com/vi/KMHoM7yKvwE/0.jpg",
    },
    {
      title: "Movecast Episode #12",
      description: "Monetize public spaces in web3 - Podium on Movement Labs",
      url: "https://www.youtube.com/embed/kwjgQLNQRb8?si=U4AQjgG2Gip-9Z5y",
      preview: "https://img.youtube.com/vi/kwjgQLNQRb8/0.jpg",
    },
    {
      title: "Movecast Episode #13",
      description: "Movement Labs - A Crypto Network for People - Will (Movement Labs)",
      url: "https://www.youtube.com/embed/F08DX5CXMp0?si=OWGIdw51Bq4-DnKa",
      preview: "https://img.youtube.com/vi/F08DX5CXMp0/0.jpg",
    },
    {
      title: "Movecast Episode #14",
      description: "Nightly Building a Wallet on Movement",
      url: "https://www.youtube.com/embed/FFEF2Lv6_i4?si=PcZXtaPg6yz_Cek-",
      preview: "https://img.youtube.com/vi/FFEF2Lv6_i4/0.jpg",
    },
    {
      title: "Movecast Episode #15",
      description: "Henry Social - Yield on Crypto Cashbacks in web3 powered on Movement Labs",
      url: "https://www.youtube.com/embed/mO2LjE2GOEo?si=f-BrnjNN5hbLQx-L",
      preview: "https://img.youtube.com/vi/mO2LjE2GOEo/0.jpg",
    },
    {
      title: "Movecast Episode #16",
      description: "WarpGate - Why we need Memecoins on Movement Labs",
      url: "https://www.youtube.com/embed/BFSwStTtEDI?si=826k5WRXKldzEknG",
      preview: "https://img.youtube.com/vi/BFSwStTtEDI/0.jpg",
    },
  ].reverse();
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>();

  const openEpisodeModal = (episode: Episode) => {
    setSelectedEpisode(episode);
    onOpen();
  };

  return (
    <>
      <Helmet>
        <title>Gorilla Moverz - Movecast</title>
        <meta name="description" content="Media and Movecast Episodes" />
        <meta property="og:title" content="Gorilla Moverz - Movecast" />
        <meta property="og:description" content="Movecast Episodes" />
      </Helmet>

      <Modal size="6xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="gorillaz-modal">
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

      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(49%, 420px))">
        {episodes.map((episode) => (
          <Card key={episode.url} className="gorillaz-card">
            <CardBody onClick={() => openEpisodeModal(episode)}>
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
