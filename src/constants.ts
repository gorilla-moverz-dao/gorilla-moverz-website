import { Network } from "@aptos-labs/ts-sdk";

export const SUPRA_API_URL = import.meta.env.VITE_SUPRA_API_URL;
export const SURPA_ANON_KEY = import.meta.env.VITE_SUPRA_ANON_KEY;
export const MODULE_ADDRESS = "054211d69a169a86cb370b0492a20382160c5cb62f3a0524c15f2678c20a7c1e";
export const FULL_NODE = "https://aptos.devnet.m1.movementlabs.xyz";
export const FARM_COLLECTION_ID = "0xba47e8a4111d53d81773e920b55c4152976a47ea4b002777cd81e8eb6ed9e4e2";
export const NETWORK = Network.TESTNET;
export const BANANA_CONTRACT_ADDRESS = "0x4d92915d90fe5b2a99c942d3f249493e2ff57e835b5ce8f88c178444641828c0";
export const EXCLUDE_LEADERBOARD = ["0x" + MODULE_ADDRESS];
