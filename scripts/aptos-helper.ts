import { Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { parsePrivateKey } from "./helper";

export function getSigner(yamlPath: string): Account {
  const pk = parsePrivateKey(yamlPath);
  if (!pk) {
    console.error("Error reading private key");
    process.exit(1);
  }

  return Account.fromPrivateKey({ privateKey: new Ed25519PrivateKey(pk) });
}
