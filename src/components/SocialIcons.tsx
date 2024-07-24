import { IconButton, Link } from "@chakra-ui/react";
import { FaDiscord, FaXTwitter } from "react-icons/fa6";

function SocialIcons() {
  return (
    <>
      <Link href="https://discord.gg/gorillamoverz" target="_blank">
        <IconButton
          isRound={true}
          size={"md"}
          marginRight={2}
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          aria-label="Discord"
          icon={<FaDiscord size={24} />}
        />
      </Link>
      <Link href="https://x.com/GorillaMoverz" target="_blank">
        <IconButton
          isRound={true}
          size={"md"}
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
          aria-label="Open menu"
          icon={<FaXTwitter size={24} />}
        />
      </Link>
    </>
  );
}

export default SocialIcons;
