import {
  InputTransactionData,
  WalletContextState,
} from "@aptos-labs/wallet-adapter-react";
import movementClient from "../services/movement-client";
import { MODULE_ADDRESS } from "../constants";
import { UserTransactionResponse } from "@aptos-labs/ts-sdk";

export class ContractClient {
  accountAddress?: string;
  signAndSubmitTransaction: WalletContextState["signAndSubmitTransaction"] =
    {} as WalletContextState["signAndSubmitTransaction"];

  private bananaFarm = `${MODULE_ADDRESS}::banana_farm` as const;

  async getTokenBalance(address: string, assetType: string) {
    const data = await movementClient.getCurrentFungibleAssetBalances({
      options: {
        where: {
          owner_address: { _eq: address },
          asset_type: { _eq: assetType },
        },
      },
    });
    return data;
  }

  async getAccountCoinsData() {
    if (!this.accountAddress) return [];

    const tokens = await movementClient.getAccountCoinsData({
      accountAddress: this.accountAddress,
    });
    return tokens;
  }

  async mint(type: string, amount: number) {
    const transaction: InputTransactionData = {
      data: {
        function: `${MODULE_ADDRESS}::${type}::mint`,
        functionArguments: [
          this.accountAddress,
          (amount * Math.pow(10, 9)).toString(),
        ],
      },
    };

    const response = await this.signAndSubmitTransaction(transaction);
    const r = await movementClient.waitForTransaction({
      transactionHash: response.hash,
    });

    return r;
  }

  async withdraw(nft: string) {
    const transaction: InputTransactionData = {
      data: {
        function: `${this.bananaFarm}::withdraw`,
        functionArguments: [nft],
      },
    };

    const response = await this.signAndSubmitTransaction(transaction);
    const r = await movementClient.waitForTransaction({
      transactionHash: response.hash,
    }) as UserTransactionResponse;

    const amount =
      r.events?.find((i) => i.type === "0x1::fungible_asset::Deposit")?.data
        .amount / Math.pow(10, 9);

    return amount;
  }

  async getTreasuryTimeout() {
    const response = await movementClient.view<[string]>({
      payload: {
        function: `${this.bananaFarm}::get_treasury_timeout`,
        functionArguments: [],
      },
    });

    return parseInt(response[0]);
  }

  async getCollectionAddress() {
    const response = await movementClient.view<[string]>({
      payload: {
        function: `${this.bananaFarm}::collection_address`,
        functionArguments: [],
      },
    });

    return response[0];
  }

  async getLastFarmed() {
    const response = await movementClient.view<[string]>({
      payload: {
        function: `${this.bananaFarm}::last_farmed`,
        functionArguments: [this.accountAddress],
      },
    });
    return response[0];
  }
}
