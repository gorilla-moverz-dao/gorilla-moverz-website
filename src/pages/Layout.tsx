import { Analytics } from "@vercel/analytics/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import BoxBlurred from "../components/BoxBlurred";
import { FiMenu } from "react-icons/fi";
import SocialIcons from "../components/SocialIcons";

function Layout() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isMobile && (
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <DrawerCloseButton />
            <DrawerHeader>Gorilla Moverz</DrawerHeader>
            <DrawerBody>
              <NavBar onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}

      <Flex direction={"column"}>
        <Flex>
          <NavLink to={"/"}>
            <img
              src="/images/gogo-shake.png"
              width={isMobile ? 120 : 200}
              style={{ paddingLeft: isMobile ? 0 : 20 }}
              className="logo"
              alt="GOGO logo"
            />
          </NavLink>

          {isMobile ? (
            <Box flex="1" paddingLeft={2} textAlign={"left"}>
              <Heading className="logo-text-mobile" lineHeight={1.1}>
                Gorilla Moverz
              </Heading>
              <Box paddingTop={2} paddingBottom={2}>
                <SocialIcons />
              </Box>
            </Box>
          ) : (
            <Box flex="1" textAlign={"left"}>
              <Heading marginLeft={12} className="logo-text">
                Gorilla Moverz
              </Heading>
            </Box>
          )}
          {isMobile && (
            <IconButton
              variant="outline"
              style={{
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
              onClick={onOpen}
              aria-label="Open menu"
              icon={<FiMenu />}
            />
          )}

          {!isMobile && (
            <Box paddingLeft={isMobile ? 0 : 4}>
              <SocialIcons />
            </Box>
          )}
        </Flex>
        <Flex>
          {!isMobile && (
            <Box width={300} paddingLeft={4} paddingRight={4}>
              <NavBar />
            </Box>
          )}

          <Box width={"100%"} textAlign={"left"} marginTop={isMobile ? 0 : -106}>
            <BoxBlurred>
              <Box padding={4}>
                <Outlet />
                <Analytics />
              </Box>
            </BoxBlurred>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Layout;
