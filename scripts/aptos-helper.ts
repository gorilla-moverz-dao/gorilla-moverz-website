import {
  Account,
  Aptos,
  Ed25519PrivateKey,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";
import { parsePrivateKey } from "./helper";

export function getSigner(yamlPath: string): Account {
  const pk = parsePrivateKey(yamlPath);
  if (!pk) {
    console.error("Error reading private key");
    process.exit(1);
  }

  return Account.fromPrivateKey({ privateKey: new Ed25519PrivateKey(pk) });
}

export async function submitAndWaitForTransaction(
  aptos: Aptos,
  signer: Account,
  transaction: SimpleTransaction,
) {
  const pendingTxn = await aptos.signAndSubmitTransaction({
    signer,
    transaction,
  });
  const response = await aptos.waitForTransaction({
    transactionHash: pendingTxn.hash,
  });
  return response;
}
