import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { NETWORK } from "../constants";

const aptosConfig = new AptosConfig({
  network: NETWORK,
  fullnode: "https://aptos.testnet.suzuka.movementlabs.xyz/v1",
  indexer: "https://aptos.testnet.suzuka.movementlabs.xyz/indexer",
});
const movementClient = new Aptos(aptosConfig);

export default movementClient;
