import { getSigner, submitAndWaitForTransaction } from "./aptos-helper";
import { convertToAmount, dateToSeconds, runCommand } from "./helper";
import {
  Account,
  AnyNumber,
  Aptos,
  AptosConfig,
  Network,
  UserTransactionResponse,
} from "@aptos-labs/ts-sdk";

const moveDir = "move/banana/";
const aptosYml = moveDir + ".aptos/config.yaml";
const mint_amount = convertToAmount(100_000_000);
const publish = false;

const config = new AptosConfig({
  network: Network.TESTNET,
});
const aptos = new Aptos(config);
const admin = getSigner(aptosYml);

async function main() {
  // Run the command
  if (publish) {
    console.log("Test move code:");
    await runCommand("aptos move test", moveDir);

    console.log("Deploy move code:");
    await runCommand("aptos move publish --assume-yes", moveDir);
  }

  await mintFACoin(
    "banana",
    admin,
    admin,
    mint_amount,
  );

  await createCollection(admin);
}

main().catch((error) => console.error(error));

async function mintFACoin(
  coin: string,
  signer: Account,
  receiver: Account,
  amount: AnyNumber,
): Promise<string> {
  const transaction = await aptos.transaction.build.simple({
    sender: signer.accountAddress,
    data: {
      function: `${signer.accountAddress}::${coin}::mint`,
      functionArguments: [receiver.accountAddress, amount],
    },
  });

  const response = await submitAndWaitForTransaction(
    aptos,
    signer,
    transaction,
  );
  console.log(`Minting ${coin} coin successful. - `, response.hash);
  return response.hash;
}

async function createCollection(
  signer: Account,
): Promise<string> {
  const mintFeePerNFT = 0;
  const mintLimitPerAccount = 1;
  const preMintAmount = 0;
  const royaltyPercentage = 0;

  const collection = {
    collectionName: "Farmer | Gorilla Moverz",
    collectionDescription:
      "Farmer plays a key role in the Gorilla Moverz ecosystem. They are responsible for planting and harvesting the bananas that are used to feed the Gorillas.",
    projectUri: "https://gorilla-moverz.xyz/nfts/farmer/collection.json",
    maxSupply: 4000,
    allowlistManager: signer.accountAddress.toString(),
  };

  const transaction = await aptos.transaction.build.simple({
    sender: signer.accountAddress,
    data: {
      function: `${signer.accountAddress}::launchpad::create_collection`,
      functionArguments: [
        collection.collectionDescription,
        collection.collectionName,
        collection.projectUri,
        collection.maxSupply,
        royaltyPercentage,
        preMintAmount, // amount of NFT to pre-mint for myself
        [signer.accountAddress], // addresses in the allow list
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
    },
  });

  const response = (await submitAndWaitForTransaction(
    aptos,
    signer,
    transaction,
  )) as UserTransactionResponse;
  console.log(`Collection created successful. - `, response.hash);
  console.log(response.events);
  const collectionCreated = response.events.find((e) =>
    e.type.split("::")[2] === "CreateCollectionEvent"
  );
  console.log(collectionCreated);
  const collectionId = collectionCreated?.data.collection_obj.inner;
  return collectionId;
}
