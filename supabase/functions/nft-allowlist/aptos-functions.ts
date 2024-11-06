import { aptos, signer } from "../_shared/aptos-client.ts";

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
