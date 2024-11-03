import { createSurfClient } from "@thalalabs/surf";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { NETWORK, FULL_NODE } from "../constants";
import { ABI as bananaFarmABI } from "./banana_farm.ts";
import { ABI as launchpadABI } from "./launchpad.ts";
import { ABI as bananaABI } from "./banana.ts";

const aptosConfig = new AptosConfig({
  network: NETWORK,
  fullnode: FULL_NODE,
  indexer: "https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql",
});
const aptosClient = new Aptos(aptosConfig);
const bananaFarmClient = createSurfClient(aptosClient).useABI(bananaFarmABI);
const launchpadClient = createSurfClient(aptosClient).useABI(launchpadABI);
const bananaClient = createSurfClient(aptosClient).useABI(bananaABI);

export { aptosClient, bananaFarmClient, launchpadClient, launchpadABI, bananaFarmABI, bananaClient };
