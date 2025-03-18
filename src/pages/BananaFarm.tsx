import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { WalletSelector } from "../components/WalletSelector";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MODULE_ADDRESS } from "../constants";
import FarmParallax from "../components/banana-farm/FarmParallax";
import useMovement from "../hooks/useMovement";

function BananaFarm() {
  const navigate = useNavigate();
  const { address } = useMovement();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigationItems = [
    { id: "farm", name: "Banana farm" },
    { id: "partner", name: "Partner NFTs" },
    { id: "leaderboard", name: "Leaderboard" },
  ];

  if (address === "0x" + MODULE_ADDRESS) {
    navigationItems.push({ id: "create", name: "Create collection" });
  }
  const activeNavigation = navigationItems.find((tab) => window.location.pathname.includes(`bananas/${tab.id}`));

  useEffect(() => {
    if (address) {
      onOpen();
    }
  }, [address]);

  return (
    <div>
      <Modal size="6xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay style={{ backdropFilter: "blur(5px)" }} />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box zIndex={-1} position="absolute" top={0} left={0} right={0} bottom={0} overflow={"hidden"} rounded={8}>
              <FarmParallax />
            </Box>
            <Flex flexDir="column" minHeight={700} paddingTop={4}>
              <HStack alignSelf={"end"}>
                {navigationItems.map((tab) => (
                  <NavLink key={tab.id} to={tab.id}>
                    {({ isActive }) => (
                      <Button
                        style={{ width: "100%" }}
                        colorScheme={isActive ? "green" : "gray"}
                        backdropFilter={"blur(5px)"}
                        border={"1px solid rgba(255, 255, 255, 0.1)"}
                        textShadow={!isActive ? "1px 1px 1px rgba(0, 0, 0, 0.5)" : ""}
                        onClick={() => {
                          navigate(tab.id);
                        }}
                      >
                        {tab.name}
                      </Button>
                    )}
                  </NavLink>
                ))}
              </HStack>

              <Flex padding={2} flexDir={"column"} flex={1}>
                <Heading as="h1" size={"xl"} paddingBottom={12} textAlign={"right"} paddingTop={4}>
                  {activeNavigation?.name}
                </Heading>

                <Box flex={1} position={"relative"}>
                  <Box position={"absolute"} top={0} left={0} right={0} bottom={0} overflow={"auto"}>
                    <Outlet />
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Box paddingBottom={4}>
        <HStack>
          <img src="/images/bananafarm/banana-farm-logo.png" width={320} />

          <Box>
            {address ? (
              <Box paddingTop={4}>
                <Button onClick={onOpen} colorScheme="green">
                  Open Banana Farm
                </Button>
              </Box>
            ) : (
              <>
                <Text paddingTop={2}>Please connect your wallet to access the Banana Farm</Text>
                <Text paddingTop={2}>Use Razor Wallet or Nightly and connect to the Bardock Testnet</Text>
              </>
            )}

            <Text paddingTop={2}>
              🎬{" "}
              <Link isExternal href="https://www.youtube.com/watch?v=C_ahuRpoStU" target="_blank">
                <b>View How to Video</b>
              </Link>
            </Text>

            <Box paddingTop={4}>
              <WalletSelector />
            </Box>
          </Box>
        </HStack>
      </Box>
    </div>
  );
}

export default BananaFarm;
