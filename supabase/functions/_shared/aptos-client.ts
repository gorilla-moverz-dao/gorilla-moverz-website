import { Account, Aptos, AptosConfig, Ed25519PrivateKey, Network } from "npm:@aptos-labs/ts-sdk@^1.18.1";

const aptosConfig = new AptosConfig({
  network: Network.CUSTOM,
  fullnode: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
  indexer: "https://indexer.testnet.movementnetwork.xyz/v1/graphql",
});
export const aptos = new Aptos(aptosConfig);
const privateKey = new Ed25519PrivateKey(Deno.env.get("APTOS_PK")!);
export const signer = Account.fromPrivateKey({
  privateKey,
});
