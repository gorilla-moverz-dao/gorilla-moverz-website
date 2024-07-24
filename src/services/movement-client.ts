import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { NETWORK } from "../constants";

const aptosConfig = new AptosConfig({
  network: NETWORK,
});
const movementClient = new Aptos(aptosConfig);

export default movementClient;
