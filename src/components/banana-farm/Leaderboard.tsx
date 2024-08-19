import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useLeaderboard } from "./useLeaderboard";
import { Box, Heading, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import BoxBlurred from "../BoxBlurred";

function Leaderboard() {
  const { data, isLoading } = useLeaderboard();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading as="h1" size={"xl"} paddingBottom={16} textAlign={"right"} paddingTop={4}>
        Leaderboard
      </Heading>
      <BoxBlurred>
        <Box padding={4}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Address</Th>
                  <Th isNumeric>Bananas</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item, index) => (
                  <Tr key={index}>
                    <Td>{truncateAddress(item.owner_address)}</Td>
                    <Td isNumeric>{parseInt(item.amount) / Math.pow(10, 9)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </BoxBlurred>
    </>
  );
}

export default Leaderboard;
