import { Button, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import Markdown from "react-markdown";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@/components/ui/dialog";

function FarmAlert({ title, text, url, onClose }: { title: string; text: string; url: string; onClose: () => void }) {
  const { open, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <DialogRoot open={open} onOpenChange={onClose}>
      <DialogContent className="gorillaz-modal">
        <DialogHeader>{title}</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody>
          <Markdown>{text}</Markdown>
        </DialogBody>

        <DialogFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="green" onClick={() => window.open(url, "blank")}>
            Open discord
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default FarmAlert;
