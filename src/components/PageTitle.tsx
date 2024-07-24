import { Box, Heading } from "@chakra-ui/react";

function PageTitle({
  children,
  size,
  paddingTop,
}: {
  children: React.ReactNode;
  size: "lg" | "xl";
  paddingTop: number;
}) {
  return (
    <>
      <Heading as="h1" size={size} paddingTop={paddingTop}>
        {children}
      </Heading>
      <Box paddingBottom={4} paddingTop={1}>
        <hr />
      </Box>
    </>
  );
}

export default PageTitle;
