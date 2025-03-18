import { Network } from "@aptos-labs/ts-sdk";

export const SUPRA_API_URL = import.meta.env?.VITE_SUPRA_API_URL;
export const SURPA_ANON_KEY = import.meta.env?.VITE_SUPRA_ANON_KEY;
export const MODULE_ADDRESS = "ef88d140bd12edaa47736bb34f7af91c7a6cbb0f5853a0c334e04e451f416522";
export const FULL_NODE = "https://aptos.testnet.porto.movementlabs.xyz/v1";
export const FARM_COLLECTION_ID = "0xb0304659f0f67035a59878148092ed5b2426b46489a01bc5cc4d906d3ab9d853";
export const NETWORK = Network.CUSTOM;
export const BANANA_CONTRACT_ADDRESS = "0xcbffa124c1b5ffb7efc79a95612b95ea20bc7a1b75d045ca94a7263a5c3c4b40";
export const EXCLUDE_LEADERBOARD = [
  "0x" + MODULE_ADDRESS,
  "0x2c9ab467113c6c3c1a990ae0eec00d4b8d0012278079c3c7705b7cdf57264d14",
];
export const FOUNDERS_COLLECTION_ID = "0x323f7c341d2fdfda5c5dfefb1b51cad9063a0ad599fdc716ba12fea528510c5b";
export const SUPPORTED_WALLETS = ["Nightly", "Razor Wallet"];
