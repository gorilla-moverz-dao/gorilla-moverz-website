import { Analytics } from "@vercel/analytics/react";
import { NavLink, Outlet } from "react-router-dom";
import { Box, Flex, Heading, IconButton, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import BoxBlurred from "../components/BoxBlurred";
import { FiMenu } from "react-icons/fi";
import SocialIcons from "../components/SocialIcons";
import { Helmet } from "react-helmet";
import {
  DrawerRoot,
  DrawerContent,
  DrawerBackdrop,
  DrawerHeader,
  DrawerBody,
  DrawerCloseTrigger,
} from "@/components/ui/drawer";

function Layout() {
  // const [isMobile] = useMediaQuery(["(max-width: 768px)"], { ssr: false });
  // TODO: fix this
  const isMobile = false;
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Helmet>
        <title>Gorilla Moverz</title>
        <meta
          name="description"
          content="Gorilla Moverz: The Social Infrastructure project on Movement. We stimulate activity, promote initiatives, and support Movement testnet. Join our community shaping crypto's future. Apes together strong! 🦍🍌"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.gorilla-moverz.xyz/" />
        <meta property="og:title" content="Gorilla Moverz" />
        <meta
          property="og:description"
          content="Gorilla Moverz: The Social Infrastructure project on Movement. We stimulate activity, promote initiatives, and support testnets. Join our community shaping crypto's future. Apes together strong! 🦍🍌"
        />
        <meta property="og:image" content="https://www.gorilla-moverz.xyz/images/favicon.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      {isMobile && (
        <DrawerRoot placement="end" onOpenChange={(x) => x.open && onClose()} open={open}>
          <DrawerBackdrop />
          <DrawerContent
            style={{
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <DrawerCloseTrigger />
            <DrawerHeader>Gorilla Moverz</DrawerHeader>
            <DrawerBody>
              <NavBar onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </DrawerRoot>
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
            >
              <FiMenu />
            </IconButton>
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
