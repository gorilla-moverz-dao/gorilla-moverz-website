import { WalletContextState } from "@aptos-labs/wallet-adapter-react";
import { aptosClient, bananaFarmABI, bananaFarmClient, createEntryPayload } from "../services/movement-client";
import { UserTransactionResponse } from "@aptos-labs/ts-sdk";

export class ContractClient {
  accountAddress?: `0x${string}`;
  signAndSubmitTransaction: WalletContextState["signAndSubmitTransaction"] =
    {} as WalletContextState["signAndSubmitTransaction"];

  async getTokenBalance(address: string, assetType: string) {
    const data = await aptosClient.getCurrentFungibleAssetBalances({
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

    const tokens = await aptosClient.getAccountCoinsData({
      accountAddress: this.accountAddress,
    });
    return tokens;
  }

  async farm(nft: `0x${string}`, partnerNfts: `0x${string}`[]) {
    const response = await this.signAndSubmitTransaction({
      data: createEntryPayload(bananaFarmABI, {
        function: "farm",
        functionArguments: [nft, partnerNfts],
        typeArguments: [],
      }),
    });
    const r = (await aptosClient.waitForTransaction({
      transactionHash: response.hash,
    })) as UserTransactionResponse;

    const amount = r.events?.find((i) => i.type === "0x1::fungible_asset::Deposit")?.data.amount / Math.pow(10, 9);

    return amount;
  }

  async getTreasuryTimeout() {
    const response = await bananaFarmClient.view.get_treasury_timeout({
      typeArguments: [],
      functionArguments: [],
    });

    return parseInt(response[0]);
  }

  async getCollectionAddress() {
    const response = await bananaFarmClient.view.collection_address({
      typeArguments: [],
      functionArguments: [],
    });

    return response[0];
  }

  async getLastFarmed() {
    const response = await bananaFarmClient.view.last_farmed({
      typeArguments: [],
      functionArguments: [this.accountAddress!],
    });
    return response[0];
  }
}
