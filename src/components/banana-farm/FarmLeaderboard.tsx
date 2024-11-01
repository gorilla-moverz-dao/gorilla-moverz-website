import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useFarmLeaderboard } from "./useFarmLeaderboard";
import { Spinner, Table } from "@chakra-ui/react";
import BoxBlurred from "../BoxBlurred";

function FarmLeaderboard() {
  const { data, isLoading } = useFarmLeaderboard();

  if (isLoading) return <Spinner />;

  return (
    <>
      <BoxBlurred padding={2}>
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.Cell>Address</Table.Cell>
              <Table.Cell textAlign="right">Bananas</Table.Cell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{truncateAddress(item.owner_address)}</Table.Cell>
                <Table.Cell textAlign="right">{parseInt(item.amount) / Math.pow(10, 9)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </BoxBlurred>
    </>
  );
}

export default FarmLeaderboard;
