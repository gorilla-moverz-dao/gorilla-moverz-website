import { InputTransactionData, useWallet } from "@aptos-labs/wallet-adapter-react";
import {
  aptosClient,
  bananaFarmABI,
  bananaFarmClient,
  launchpadABI,
  launchpadClient,
} from "../services/movement-client";
import { AptosApiType, UserTransactionResponse } from "@aptos-labs/ts-sdk";
import { createEntryPayload } from "@thalalabs/surf";
import { request } from "graphql-request";

const useMovement = () => {
  const { account, signAndSubmitTransaction } = useWallet();

  const signAndAwaitTransaction = async (data: InputTransactionData["data"]) => {
    const response = await signAndSubmitTransaction({ data });
    const transaction = await aptosClient.waitForTransaction({ transactionHash: response.hash });
    return transaction as UserTransactionResponse;
  };

  const getAccountCoinsData = async () => {
    if (!account?.address) return [];

    const tokens = await aptosClient.getAccountCoinsData({
      accountAddress: account.address,
    });
    return tokens;
  };

  return {
    address: account ? (account.address as `0x${string}`) : undefined,
    signAndAwaitTransaction,
    getAccountCoinsData,
    createEntryPayload,
    bananaFarmClient,
    bananaFarmABI,
    launchpadClient,
    launchpadABI,
    aptosClient,
    graphqlRequest: request,
    indexerUrl: aptosClient.config.getRequestUrl(AptosApiType.INDEXER),
  };
};

export default useMovement;
