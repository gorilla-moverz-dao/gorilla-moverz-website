import { Box, Image } from "@chakra-ui/react";
import { MouseParallax } from "react-just-parallax";

function BananaFarmBackground() {
  return (
    <>
      <Box position={"absolute"} top={-10} left={-10} right={-10} bottom={-10} overflow={"hidden"}>
        <MouseParallax strength={0.01} isAbsolutelyPositioned={true}>
          <Image
            position={"absolute"}
            top={-20}
            left={-20}
            right={-20}
            bottom={-20}
            src="/images/bananafarm/banana-farm-background.png"
            alt="Banana farm background"
            width={1300}
            padding={-40}
          />
        </MouseParallax>
        <MouseParallax strength={0.04} isAbsolutelyPositioned={true}>
          <Box position={"absolute"} top={-20} left={-20} right={-20} bottom={-20}>
            <Image src="/images/bananafarm/banana-farm-trees.png" alt="Banana farm trees" width={1300} padding={-40} />
          </Box>
        </MouseParallax>
        <Box position={"absolute"} padding={10}>
          <MouseParallax strength={0.01}>
            <Image src="/images/bananafarm/banana-farm-logo.png" alt="Banana farm logo" width={320} className="logo" />
          </MouseParallax>
        </Box>
      </Box>
    </>
  );
}

export default BananaFarmBackground;
