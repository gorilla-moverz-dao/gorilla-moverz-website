import { MODULE_ADDRESS } from "../../constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import { dateToSeconds } from "../../helpers/date-functions";
import BoxBlurred from "../BoxBlurred";
import useMovement from "../../hooks/useMovement";
import { Field } from "@/components/ui/field";

const CreateCollectionSchema = z.object({
  collectionName: z.string().min(1, { message: "Field is required" }),
  collectionDescription: z.string().min(1, { message: "Field is required" }),
  projectUri: z.string().min(1, { message: "Field is required" }),
  maxSupply: z.number().min(1, { message: "Field is required" }),
  allowlistManager: z.string().min(1, { message: "Field is required" }),
});

type CreateCollection = z.infer<typeof CreateCollectionSchema>;

function FarmCreateCollection() {
  const { address, signAndAwaitTransaction, createEntryPayload, launchpadABI } = useMovement();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateCollection>({
    resolver: zodResolver(CreateCollectionSchema),
  });

  const createCollection = async (collection: CreateCollection) => {
    try {
      if (!address) throw new Error("Please connect your wallet");
      if (address !== "0x" + MODULE_ADDRESS) throw new Error("Wrong account");

      const mintFeePerNFT = 0;
      const mintLimitPerAccount = 1;
      const preMintAmount = 0;
      const royaltyPercentage = 0;

      const response = await signAndAwaitTransaction(
        createEntryPayload(launchpadABI, {
          function: `create_collection`,
          typeArguments: [],
          functionArguments: [
            collection.collectionDescription,
            collection.collectionName,
            collection.projectUri,
            collection.maxSupply,
            royaltyPercentage,
            preMintAmount, // amount of NFT to pre-mint for myself
            [`0x${MODULE_ADDRESS}`], // addresses in the allow list
            dateToSeconds(new Date()), // allow list start time (in seconds)
            dateToSeconds(new Date(2026, 1, 1)), // allow list end time (in seconds)
            mintLimitPerAccount, // mint limit per address in the allow list
            undefined, // mint fee per NFT for the allow list
            collection.allowlistManager as `0x${string}`,
            undefined, // public mint start time (in seconds)
            undefined, // public mint end time (in seconds)
            mintLimitPerAccount, // mint limit per address in the public mint
            mintFeePerNFT,
          ],
        }),
      );
      if (response.success) {
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
            <Field
              label="Collection Name"
              invalid={!!errors.collectionName}
              marginBottom={4}
              errorText={errors.collectionName?.message}
            >
              <Input
                {...register("collectionName")}
                id="collectionName"
                placeholder="Collection name"
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
            </Field>

            <Field
              label="Collection description"
              invalid={!!errors.collectionDescription}
              marginBottom={4}
              errorText={errors.collectionDescription?.message}
            >
              <Textarea
                {...register("collectionDescription")}
                id="collectionDescription"
                placeholder="Description of the NFT Collection"
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
            </Field>

            <Field
              label="Project uri"
              invalid={!!errors.projectUri}
              marginBottom={4}
              errorText={errors.projectUri?.message}
            >
              <Input
                {...register("projectUri", { value: "https://gorilla-moverz.xyz/nfts/farmer/collection.json" })}
                id="projectUri"
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
            </Field>

            <Field
              label="Max supply"
              invalid={!!errors.maxSupply}
              marginBottom={4}
              errorText={errors.maxSupply?.message}
            >
              <Input
                {...register("maxSupply", { valueAsNumber: true })}
                id="maxSupply"
                value={"4000"}
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
            </Field>

            <Field
              label="Allowlist manager"
              invalid={!!errors.allowlistManager}
              marginBottom={4}
              errorText={errors.allowlistManager?.message}
            >
              <Input
                {...register("allowlistManager")}
                id="allowlistManager"
                value={"0x" + MODULE_ADDRESS}
                _placeholder={{ opacity: 1, color: "gray.300" }}
              />
            </Field>

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
