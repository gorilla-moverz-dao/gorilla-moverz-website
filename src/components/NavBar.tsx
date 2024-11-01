import { Box } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import BoxBlurred from "./BoxBlurred";
import { Button } from "@/components/ui/button";

interface Props {
  onClose?: () => void;
}

function NavBar({ onClose }: Props) {
  const navigate = useNavigate();
  const navigation = [
    { to: "/", label: "Home" },
    { to: "/nfts", label: "Gorilla NFTs" },
    { to: "/media", label: "Movecast" },
    { to: "/gallery", label: "Gallery" },
    { to: "/beacon-events", label: "Beacon Events" },
    { to: "/partners", label: "Integrations" },
  ];

  return (
    <>
      <BoxBlurred>
        <Box padding={2} paddingTop={4} paddingBottom={2}>
          {navigation.map((nav) => (
            <Box key={nav.to} padding={2} paddingBottom={4}>
              <NavLink to={nav.to}>
                {({ isActive }) => (
                  <Button
                    style={{ width: "100%" }}
                    colorPalette={isActive ? "green" : "gray"}
                    backdropBlur="5px"
                    backdropFilter={"auto"}
                    variant="subtle"
                    className={isActive ? "active" : ""}
                    onClick={() => {
                      navigate(nav.to);
                      onClose?.();
                    }}
                  >
                    {nav.label}
                  </Button>
                )}
              </NavLink>
            </Box>
          ))}
        </Box>
      </BoxBlurred>
    </>
  );
}

export default NavBar;
