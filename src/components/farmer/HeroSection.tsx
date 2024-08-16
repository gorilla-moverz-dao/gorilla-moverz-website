import { FC, FormEvent, useState } from "react";
import { InputTransactionData, truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useMintData } from "../../hooks/useMintData";
import { Box, Button, Divider, Flex, Heading, IconButton, Image, Progress, Text } from "@chakra-ui/react";
import movementClient from "../../services/movement-client";
import { MODULE_ADDRESS, NETWORK } from "../../constants";
import { formatDate } from "../../helpers/date-functions";
import { clampNumber } from "../../helpers/clampNumber";
import { FaCopy, FaLink } from "react-icons/fa6";
import { useOwnedNFTs } from "../../hooks/useOwnedNFTs";
import { WalletSelector } from "../WalletSelector";

interface Props {
  collectionId: string;
  slug: string;
}

function HeroSection({ collectionId, slug }: Props) {
  const { data, refetch: refetchMint } = useMintData(collectionId);
  const { account, signAndSubmitTransaction } = useWallet();
  const { refetch: refetchOwned } = useOwnedNFTs(collectionId);

  const { collection, totalMinted = 0, maxSupply = 1 } = data ?? {};

  if (!collection) return <p>Loading...</p>;

  const mintNft = async (e: FormEvent) => {
    e.preventDefault();
    if (!account || !data?.isMintActive) return;

    const transaction: InputTransactionData = {
      data: {
        function: `${MODULE_ADDRESS}::launchpad::mint_nft`,
        functionArguments: [collection?.collection_id, 1],
      },
    };
    const response = await signAndSubmitTransaction(transaction);
    await movementClient.waitForTransaction({ transactionHash: response.hash });
    refetchOwned();
    refetchMint();
  };

  return (
    <Flex direction={{ base: "column", md: "row" }} gap={4}>
      <Box flex={1}>
        <Image
          src={
            collection?.cdn_asset_uris?.cdn_image_uri ??
            collection?.cdn_asset_uris?.cdn_animation_uri ??
            "/nfts/" + slug + "/collection.png"
          }
          rounded={4}
        />
      </Box>
      <Box flex={1}>
        <Heading>{collection?.collection_name}</Heading>
        <Text>{collection?.description}</Text>

        <Flex>
          <Box paddingRight={4}>
            <form onSubmit={mintNft}>
              {account?.address && (
                <>
                  {data?.isAllowlisted && (
                    <Button type="submit" disabled={!data?.isMintActive || !data.isAllowlisted}>
                      Mint
                    </Button>
                  )}
                  {!data?.isAllowlisted && (
                    <Button
                      type="button"
                      onClick={() =>
                        window.open("https://discord.com/channels/1248584514494529657/1273354461905027103", "blank")
                      }
                    >
                      Get on the allowlist
                    </Button>
                  )}
                </>
              )}

              {!account?.address && <WalletSelector />}
            </form>
          </Box>

          <Box flex={1}>
            {clampNumber(totalMinted)} / {clampNumber(maxSupply, undefined, 10000)} Minted
            <Progress value={(totalMinted / maxSupply) * 100} className="h-2" />
          </Box>
        </Flex>

        <Divider paddingTop={4} paddingBottom={4} />

        <Flex justifyContent="space-between" alignItems="center" paddingBottom={2} paddingTop={2}>
          <Box>Collection Address</Box>

          <div className="flex gap-x-2">
            <AddressButton address={collection?.collection_id ?? ""} />
          </div>
        </Flex>

        <Flex justifyContent="space-between">
          View on Explorer{" "}
          <a
            target="_blank"
            href={`https://explorer.aptoslabs.com/account/${collection?.collection_id}?network=${NETWORK}`}
          >
            <IconButton icon={<FaLink />} aria-label="Copy address" className="dark:invert" />
          </a>
        </Flex>

        <div>
          {data?.startDate && new Date() < data.startDate && (
            <div className="flex gap-x-2 justify-between flex-wrap">
              <p className="body-sm-semibold">Minting starts</p>
              <p className="body-sm">{formatDate(data.startDate)}</p>
            </div>
          )}

          {data?.endDate && new Date() < data.endDate && !data.isMintInfinite && (
            <div className="flex gap-x-2 justify-between flex-wrap">
              <p className="body-sm-semibold">Minting ends</p>
              <p className="body-sm">{formatDate(data.endDate)}</p>
            </div>
          )}

          {data?.endDate && new Date() > data.endDate && <p className="body-sm-semibold">Minting has ended</p>}
        </div>
      </Box>
    </Flex>
  );
}

const AddressButton: FC<{ address: string }> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (copied) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <>
      {copied ? "Copied!" : <>{truncateAddress(address)}</>}
      &nbsp;
      <IconButton icon={<FaCopy />} aria-label="Copy address" onClick={onCopy}></IconButton>
    </>
  );
};
export default HeroSection;
