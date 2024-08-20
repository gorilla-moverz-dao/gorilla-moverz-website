import { Box } from "@chakra-ui/react";

function BoxBlurred({ children, padding }: { children: React.ReactNode; padding?: number }) {
  return (
    <div
      style={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        border: "1px solid hsla(0,0%,100%,.28)",
        borderRadius: "8px",
      }}
    >
      <Box padding={padding}>{children}</Box>
    </div>
  );
}

export default BoxBlurred;
