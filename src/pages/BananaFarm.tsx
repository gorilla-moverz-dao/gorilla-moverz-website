import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
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
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "../constants";
import BananaFarmBackground from "../components/banana-farm/BananaFarmBackground";

function BananaFarm() {
  const navigate = useNavigate();
  const { account } = useWallet();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigationItems = [
    { id: "farm", name: "Banana farm" },
    { id: "partner", name: "Partner NFTs" },
    { id: "leaderboard", name: "Leaderboard" },
  ];

  if (account?.address === "0x" + MODULE_ADDRESS) {
    navigationItems.push({ id: "create", name: "Create collection" });
  }
  const activeNavigation = navigationItems.find((tab) => window.location.pathname.includes(`bananas/${tab.id}`));

  useEffect(() => {
    if (account?.address) {
      onOpen();
    }
  }, [account]);

  return (
    <div>
      <Modal size="6xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay style={{ backdropFilter: "blur(5px)" }} />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box zIndex={-1} position="absolute" top={0} left={0} right={0} bottom={0} overflow={"hidden"} rounded={8}>
              <BananaFarmBackground />
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

              <Box padding={2}>
                <Heading as="h1" size={"xl"} paddingBottom={12} textAlign={"right"} paddingTop={4}>
                  {activeNavigation?.name}
                </Heading>

                <Outlet />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <Box paddingBottom={4}>
        <WalletSelector />

        {account ? (
          <Box paddingTop={4}>
            <Button onClick={onOpen} colorScheme="green">
              Open Banana Farm
            </Button>
          </Box>
        ) : (
          <Text paddingTop={4}>Please connect your wallet to access the Banana Farm</Text>
        )}
      </Box>
    </div>
  );
}

export default BananaFarm;
