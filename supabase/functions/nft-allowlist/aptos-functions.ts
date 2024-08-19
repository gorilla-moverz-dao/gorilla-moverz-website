import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "npm:@aptos-labs/ts-sdk@^1.18.1";

const aptosConfig = new AptosConfig({
  network: Network.TESTNET,
});
const aptos = new Aptos(aptosConfig);
const privateKey = new Ed25519PrivateKey(Deno.env.get("APTOS_PK")!);
const signer = Account.fromPrivateKey({
  privateKey,
});

export async function addAllowlistAddresses(address: string, guildId: string) {
  const addr = Deno.env.get("ACCOUNT_ADDRESS")!;
  const transaction = await aptos.transaction.build.simple({
    sender: signer.accountAddress,
    data: {
      function: `${addr}::launchpad::add_allowlist_addresses`,
      functionArguments: [[address], guildId],
    },
  });

  const res = await aptos.signAndSubmitTransaction({
    signer: signer,
    transaction,
  });
  console.log(res);
  const transactionResult = await aptos.waitForTransaction({
    transactionHash: res.hash,
  });

  return transactionResult;
}
