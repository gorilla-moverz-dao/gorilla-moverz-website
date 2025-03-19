import { Network } from "@aptos-labs/ts-sdk";

export const SUPRA_API_URL = import.meta.env?.VITE_SUPRA_API_URL;
export const SURPA_ANON_KEY = import.meta.env?.VITE_SUPRA_ANON_KEY;
export const MODULE_ADDRESS = "ef88d140bd12edaa47736bb34f7af91c7a6cbb0f5853a0c334e04e451f416522";
export const FULL_NODE = "https://testnet.bardock.movementnetwork.xyz/v1";
export const FARM_COLLECTION_ID = "0x50af18d1e4dfbc0a5be5d213f5b1ad88509d7ecab479305c2a7d232080db891e";
export const NETWORK = Network.CUSTOM;
export const NETWORK_NAME = "bardock+testnet";
export const BANANA_CONTRACT_ADDRESS = "0xcbffa124c1b5ffb7efc79a95612b95ea20bc7a1b75d045ca94a7263a5c3c4b40";
export const EXCLUDE_LEADERBOARD = [
  "0x" + MODULE_ADDRESS,
  "0x2c9ab467113c6c3c1a990ae0eec00d4b8d0012278079c3c7705b7cdf57264d14",
];
export const SUPPORTED_WALLETS = ["Nightly", "Razor Wallet"];
