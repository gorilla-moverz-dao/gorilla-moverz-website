import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useLeaderboard } from "./useLeaderboard";
import PageTitle from "../PageTitle";
import { Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

function Leaderboard() {
  const { data, isLoading } = useLeaderboard();

  if (isLoading) return <Spinner />;

  return (
    <>
      <PageTitle size="xl" paddingTop={8}>
        Leaderboard
      </PageTitle>

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
    </>
  );
}

export default Leaderboard;
