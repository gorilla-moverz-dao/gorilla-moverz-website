import { getSigner } from "./aptos-helper";
import { bananaClient, bananaFarmClient, launchpadClient } from "../src/services/movement-client";
import { convertToAmount, dateToSeconds, runCommand } from "./helper";
import { Account, UserTransactionResponse } from "@aptos-labs/ts-sdk";

const moveDir = "move/banana/";
const aptosYml = moveDir + ".aptos/config.yaml";
const mint_amount = 100_000_000;
const deposit_amount = 10_000_000;
const publish = false;

const admin = getSigner(aptosYml);

async function main() {
  // Run the command
  if (publish) {
    console.log("Test move code:");
    await runCommand("aptos move test", moveDir);

    console.log("Deploy move code:");
    await runCommand("aptos move publish --assume-yes", moveDir);
  }

  await mintFACoin("banana", admin, admin, mint_amount);

  await deposit(admin, deposit_amount);

  const collectionId = await createCollection(admin, {
    collectionName: "Farmer | Gorilla Moverz",
    collectionDescription:
      "Farmer plays a key role in the Gorilla Moverz ecosystem. They are responsible for planting and harvesting the bananas that are used to feed the Gorillas.",
    slug: "farmer",
    maxSupply: 4000,
    allowlistManager: admin.accountAddress.toString(),
  });

  await setCollectionAddress(admin, collectionId);

  const partnerCollectionId = await createCollection(admin, {
    collectionName: "Gorillaz Partner 1",
    collectionDescription: "Gorillaz Partner 1 Description",
    slug: "partner1",
    maxSupply: 2000,
    allowlistManager: admin.accountAddress.toString(),
  });
  console.log("Partner Collection Id: ", partnerCollectionId);
}

main().catch((error) => console.error(error));

async function mintFACoin(coin: string, signer: Account, receiver: Account, amount: number): Promise<string> {
  const response = await bananaClient.entry.mint({
    typeArguments: [],
    functionArguments: [receiver.accountAddress.toString(), convertToAmount(amount)],
    account: signer,
  });

  console.log(`Minting ${coin} coin successful. - tx: `, response.hash);
  return response.hash;
}

interface CollectionConfig {
  collectionName: string;
  collectionDescription: string;
  slug: string;
  maxSupply: number;
  allowlistManager: `0x${string}`;
}

async function createCollection(signer: Account, collection: CollectionConfig): Promise<`0x${string}`> {
  const mintFeePerNFT = 0;
  const mintLimitPerAccount = 1;
  const preMintAmount = 0;
  const royaltyPercentage = 0;

  const response = (await launchpadClient.entry.create_collection({
    typeArguments: [],
    functionArguments: [
      collection.collectionDescription,
      collection.collectionName,
      `https://gorilla-moverz.xyz/nfts/${collection.slug}/collection.json`,
      collection.maxSupply,
      royaltyPercentage,
      preMintAmount,
      [signer.accountAddress.toString()], // addresses in the allow list
      dateToSeconds(new Date()), // allow list start time (in seconds)
      dateToSeconds(new Date(2026, 1, 1)), // allow list end time (in seconds)
      mintLimitPerAccount, // mint limit per address in the allow list
      undefined, // mint fee per NFT for the allow list
      collection.allowlistManager,
      undefined, // public mint start time (in seconds)
      undefined, // public mint end time (in seconds)
      mintLimitPerAccount, // mint limit per address in the public mint
      mintFeePerNFT,
    ],
    account: signer,
  })) as UserTransactionResponse;

  const collectionCreated = response.events.find((e) => e.type.split("::")[2] === "CreateCollectionEvent");
  const collectionId = collectionCreated?.data.collection_obj.inner;
  console.log(`Collection created successful. - tx: `, collectionId);
  return collectionId;
}

async function deposit(signer: Account, amount: number): Promise<string> {
  const response = await bananaFarmClient.entry.deposit({
    typeArguments: [],
    functionArguments: [convertToAmount(amount)],
    account: signer,
  });
  console.log(`Deposited ${amount} bananas to banana farm - tx: `, response.hash);
  return response.hash;
}

async function setCollectionAddress(signer: Account, collectionId: `0x${string}`): Promise<string> {
  const response = await bananaFarmClient.entry.set_collection_address({
    typeArguments: [],
    functionArguments: [collectionId],
    account: signer,
  });
  console.log(`Set collection address to ${collectionId} - tx: `, response.hash);
  return response.hash;
}
