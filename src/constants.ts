import { Network } from "@aptos-labs/ts-sdk";

export const SUPRA_API_URL = import.meta.env?.VITE_SUPRA_API_URL;
export const SURPA_ANON_KEY = import.meta.env?.VITE_SUPRA_ANON_KEY;
export const FULL_NODE = "https://aptos.testnet.bardock.movementlabs.xyz/v1";
export const NETWORK = Network.CUSTOM;
export const FOUNDERS_COLLECTION_ID = "0x3253dbde20e9bf80ff01615c941f2c985bac164fafd96d5bcdcb0742fe320185";
export const COMMUNITY_COLLECTION_ID = "0x3253dbde20e9bf80ff01615c941f2c985bac164fafd96d5bcdcb0742fe320185";
export const SUPPORTED_WALLETS = ["Nightly", "Razor Wallet"];
