import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Partner, PartnerSchema } from "../contracts/partner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageTitle from "../components/PageTitle";
import { supabase } from "../services/supabase-client";

function Partners() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Partner>({ resolver: zodResolver(PartnerSchema) });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const integrations = [
    {
      href: "https://movementlabs.xyz/",
      src: "/partners/movement-logo-yellow-rgb.svg",
      alt: "Movement Labs",
    },
    {
      href: "https://razorwallet.xyz/",
      src: "/partners/razor.png",
      alt: "Razor DAO",
    },
    {
      href: "https://www.henry.social/",
      src: "/partners/henry_white_logo.png",
      alt: "Henry Social",
    },
    {
      href: "https://www.curvance.com/",
      src: "/partners/curvance-logo-light.svg",
      alt: "Curvance",
    },
    {
      href: "https://www.brkt.gg/",
      src: "/partners/brkt-logo.svg",
      alt: "BRKT",
    },
    {
      href: "https://interestprotocol.com/",
      src: "/partners/interest-protocol-dark.svg",
      alt: "Interest Protocol",
    },
    {
      href: "https://www.upnetwork.xyz/",
      src: "/partners/upnetwork-logo.png",
      alt: "Up Network",
    },
    {
      href: "https://t.co/wjbCLMmDFD",
      src: "/partners/nexio.png",
      alt: "Nexio",
    },
    {
      href: "https://www.satay.finance/",
      src: "/partners/satay.svg",
      alt: "Satay Finance",
    },
    {
      href: "https://www.movewiffrens.xyz/",
      src: "/partners/movewiffrens.svg",
      alt: "Movewiffrends",
    },
    {
      href: "https://xebra.trade/",
      src: "/partners/xebra.svg",
      alt: "Xebra",
    },
    {
      href: "https://v2.routex.io/",
      src: "/partners/routex.png",
      alt: "Route-X",
    },
  ];

  const onSubmit = async (partner: Partner) => {
    const { error } = await supabase.from("partner").insert([partner]);

    if (error) {
      alert(error.message);
    }

    reset();
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="gorillaz-modal">
          <ModalHeader>Form submitted</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your form has been submitted. We will reach out to you!</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>
        <PageTitle size="xl" paddingTop={0}>
          Integrations
        </PageTitle>
        <Text>
          Gorilla Moverz is the first NFT project on Movement.
          <br />
          Our mission is to be critical “social infrastructure”; a community of engaged, fanatically supportive users of
          Movement and the whole Movement Ecosystem. We work closely with the Movement team in striving to fulfil our
          mission.
        </Text>

        <PageTitle size="lg" paddingTop={4}>
          Existing Integrations
        </PageTitle>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {integrations.map((partner, index) => (
            <GridItem key={index} verticalAlign="center" style={{ display: "flex", alignItems: "center" }}>
              <Card className="gorillaz-card" width="100%" height="100%" alignItems="center">
                <CardBody style={{ alignContent: "center", justifyContent: "center", backgroundColor: "10px" }}>
                  <Link href={partner.href} target="_blank" isExternal>
                    <img
                      style={{ maxWidth: "300px", width: "100%", maxHeight: "60px" }}
                      src={partner.src}
                      alt={partner.alt}
                    />
                  </Link>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </SimpleGrid>

        <PageTitle size="lg" paddingTop={12}>
          Become integrated
        </PageTitle>

        <Text>
          We are always on the look out for partners that vibe with this mission. To us, a partnership should be one of
          trust and respect, focussed on achieving common goals and on mutuality of benefit.
        </Text>
        <Text>We are looking forward to working together.</Text>
        <Text>
          If you are a project or DAO that wants to collaborate or partner with Gorilla Moverz, please do fill out this
          form and a founder-level Gorilla (Silverback) will be in touch if it is of interest.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.name} marginBottom={4}>
            <FormLabel>Project Name</FormLabel>
            <Input
              {...register("name")}
              id="name"
              placeholder="Project Name"
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.socials} marginBottom={4}>
            <FormLabel>Project social media</FormLabel>
            <Input
              {...register("socials")}
              id="socials"
              placeholder="twitter/discord/tg/other"
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            {errors.socials && <FormErrorMessage>{errors.socials.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.contact_discord} marginBottom={4}>
            <FormLabel>Contact person discord</FormLabel>
            <Input
              {...register("contact_discord")}
              id="contact_discord"
              placeholder="Discord handle that is registered in the Gorilla Moverz discord server"
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            {errors.contact_discord && <FormErrorMessage>{errors.contact_discord.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.description} marginBottom={4}>
            <FormLabel>Project description</FormLabel>
            <Textarea
              {...register("description")}
              id="description"
              placeholder="Please tell us about your project"
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            {errors.description && <FormErrorMessage>{errors.description.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.benefits_partner} marginBottom={4}>
            <FormLabel>Your benefits</FormLabel>
            <Textarea
              {...register("benefits_partner")}
              id="benefits_partner"
              placeholder="Please tell us what you think we can offer your project/community"
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            {errors.benefits_partner && <FormErrorMessage>{errors.benefits_partner.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.benefits_gorillaz} marginBottom={4}>
            <FormLabel>Our benefits</FormLabel>
            <Textarea
              {...register("benefits_gorillaz")}
              id="benefits_gorillaz"
              placeholder="And what your project can offer ours"
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            {errors.benefits_gorillaz && <FormErrorMessage>{errors.benefits_gorillaz.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={!!errors.comments} marginBottom={4}>
            <FormLabel>Comments</FormLabel>
            <Textarea
              {...register("comments")}
              id="comments"
              placeholder="Are there any other things you would like to mention?"
              _placeholder={{ opacity: 1, color: "gray.300" }}
            />
            {errors.comments && <FormErrorMessage>{errors.comments.message}</FormErrorMessage>}
          </FormControl>

          <Button colorScheme="green" marginBottom={2} type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Partners;
