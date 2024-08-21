import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS } from "../../constants";
import movementClient from "../../services/movement-client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { dateToSeconds } from "../../helpers/date-functions";
import BoxBlurred from "../BoxBlurred";

export const CreateCollectionSchema = z.object({
  collectionName: z.string().min(1, { message: "Field is required" }),
  collectionDescription: z.string().min(1, { message: "Field is required" }),
  projectUri: z.string().min(1, { message: "Field is required" }),
  maxSupply: z.number().min(1, { message: "Field is required" }),
  allowlistManager: z.string().min(1, { message: "Field is required" }),
});

export type CreateCollection = z.infer<typeof CreateCollectionSchema>;

function FarmCreateCollection() {
  const { account, signAndSubmitTransaction } = useWallet();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors, isValid },
  } = useForm<CreateCollection>({
    resolver: zodResolver(CreateCollectionSchema),
  });

  const createCollection = async (collection: CreateCollection) => {
    try {
      if (!account) throw new Error("Please connect your wallet");
      if (account.address !== "0x" + MODULE_ADDRESS) throw new Error("Wrong account");

      const mintFeePerNFT = 0;
      const mintLimitPerAccount = 1;
      const preMintAmount = 0;
      const royaltyPercentage = 0;

      const response = await signAndSubmitTransaction({
        data: {
          function: `${MODULE_ADDRESS}::launchpad::create_collection`,
          typeArguments: [],
          functionArguments: [
            collection.collectionDescription,
            collection.collectionName,
            collection.projectUri,
            collection.maxSupply,
            royaltyPercentage,
            preMintAmount, // amount of NFT to pre-mint for myself
            [MODULE_ADDRESS], // addresses in the allow list
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

      const committedTransactionResponse = await movementClient.waitForTransaction({
        transactionHash: response.hash,
      });
      if (committedTransactionResponse.success) {
        alert("Collection created successfully");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <BoxBlurred>
        <Box padding={4}>
          <form onSubmit={handleSubmit(createCollection)}>
            <FormControl isInvalid={!!errors.collectionName} marginBottom={4}>
              <FormLabel>Collection Name</FormLabel>
              <Input
                {...register("collectionName")}
                id="collectionName"
                placeholder="Collection name"
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
              {errors.collectionName && <FormErrorMessage>{errors.collectionName.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.collectionDescription} marginBottom={4}>
              <FormLabel>Collection description</FormLabel>
              <Textarea
                {...register("collectionDescription")}
                id="collectionDescription"
                placeholder="Description of the NFT Collection"
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
              {errors.collectionDescription && (
                <FormErrorMessage>{errors.collectionDescription.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.projectUri} marginBottom={4}>
              <FormLabel>Project uri</FormLabel>
              <Input
                {...register("projectUri", { value: "https://gorilla-moverz.xyz/nfts/farmer/collection.json" })}
                id="projectUri"
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
              {errors.projectUri && <FormErrorMessage>{errors.projectUri.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.maxSupply} marginBottom={4}>
              <FormLabel>Max supply</FormLabel>
              <Input
                {...register("maxSupply", { valueAsNumber: true })}
                id="maxSupply"
                value={"4000"}
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
              {errors.maxSupply && <FormErrorMessage>{errors.maxSupply.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={!!errors.allowlistManager} marginBottom={4}>
              <FormLabel>Allowlist manager</FormLabel>
              <Input
                {...register("allowlistManager")}
                id="allowlistManager"
                value={"0x" + MODULE_ADDRESS}
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
              {errors.allowlistManager && <FormErrorMessage>{errors.allowlistManager.message}</FormErrorMessage>}
            </FormControl>

            <Button colorScheme="green" marginBottom={2} type="submit" disabled={!isValid}>
              Create Collection
            </Button>
          </form>
        </Box>
      </BoxBlurred>
    </>
  );
}

export default FarmCreateCollection;
