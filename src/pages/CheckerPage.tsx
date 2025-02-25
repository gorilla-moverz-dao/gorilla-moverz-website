import { useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { supabase } from "../services/supabase-client";

function CheckerPage() {
  const walletAddressRef = useRef<HTMLInputElement>(null);
  const [spots, setSpots] = useState<number | null>(null);
  const [error, setError] = useState("");

  const checkCC = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const walletAddress = walletAddressRef.current?.value;

    const { data, error } = await supabase.functions.invoke(`cc-checker/${walletAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setSpots(data?.spots);
    setError(!data?.spots ? "Wallet address not found" : error?.message);
  };

  return (
    <div>
      <PageTitle size="xl" paddingTop={0}>
        Community Collection Checker
      </PageTitle>

      <div>
        <form onSubmit={checkCC}>
          <FormControl marginBottom={4}>
            <FormLabel>Movement Wallet Address</FormLabel>
            <Input type="text" placeholder="Enter your wallet address" ref={walletAddressRef} />
          </FormControl>

          {spots != null && <Text color="lightgreen"> You have {spots} guaranteed WL spots</Text>}
          {error && <Text color="red">{error}</Text>}

          <Button type="submit">Check</Button>
        </form>
      </div>
    </div>
  );
}

export default CheckerPage;
