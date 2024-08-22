import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Markdown from "react-markdown";

function FarmAlert({ title, text, url, onClose }: { title: string; text: string; url: string; onClose: () => void }) {
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Markdown>{text}</Markdown>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={() => window.open(url, "blank")}>
            Open discord
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default FarmAlert;
