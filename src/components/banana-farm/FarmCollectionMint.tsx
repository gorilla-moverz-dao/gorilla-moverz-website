import { FC, FormEvent, useState } from "react";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useMintData } from "../../hooks/useMintData";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NETWORK } from "../../constants";
import { formatDate } from "../../helpers/date-functions";
import { clampNumber } from "../../helpers/clampNumber";
import { FaCopy, FaLink } from "react-icons/fa6";
import { useFarmOwnedNFTs } from "./useFarmOwnedNFTs";
import { WalletSelector } from "../WalletSelector";
import useFarmCollection from "./useFarmCollection";
import BoxBlurred from "../BoxBlurred";
import FarmAlert from "./FarmAlert";
import useLaunchpad from "../../hooks/useLaunchpad";

interface Props {
  collectionId: `0x${string}`;
}

function FarmCollectionMint({ collectionId }: Props) {
  const { data, refetch: refetchMint } = useMintData(collectionId);
  const { address, mintNFT } = useLaunchpad();
  const { refetch: refetchOwned } = useFarmOwnedNFTs();
  const col = useFarmCollection(collectionId);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const discordText =
    /*col?.discord_help ??*/
    `Use the banana farm bot to add your address to allowlist using this command:\n\n**/bananafarm-allowlist address: [address]**\n\nThen you can mint.\n\nIf you have any issues, ask in discord.`.replace(
      "[address]",
      address ?? "[your address]",
    );

  const { collection, totalMinted = 0, maxSupply = 1 } = data ?? {};

  if (!collection) return <p>Loading...</p>;
  if (!col) return <p>Loading...</p>;

  const mintNft = async (e: FormEvent) => {
    e.preventDefault();
    if (!address || !data?.isMintActive) return;

    await mintNFT(collection?.collection_id as `0x${string}`);
    refetchOwned();
    refetchMint();
  };

  return (
    <>
      {isOpen && (
        <FarmAlert
          title="Join discord and get on the allowlist"
          text={discordText}
          url={col.discord_link ?? ""}
          onClose={onClose}
        ></FarmAlert>
      )}

      <Flex direction={{ base: "column", md: "row" }} gap={4}>
        <Box flex={2}>
          <Image
            src={"/nfts/" + col.slug + "/collection.png"}
            rounded={4}
            style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)" }}
          />
        </Box>
        <Box flex={3}>
          <BoxBlurred padding={4}>
            <Heading>{collection?.collection_name}</Heading>
            <Text>{collection?.description}</Text>

            <Flex>
              <Box paddingRight={4}>
                <form onSubmit={mintNft}>
                  {address && (
                    <>
                      {data?.isAllowlisted && (
                        <Button type="submit" disabled={!data?.isMintActive || !data.isAllowlisted}>
                          Mint
                        </Button>
                      )}
                      {!data?.isAllowlisted && (
                        <Button type="button" onClick={() => onOpen()}>
                          Get on the allowlist
                        </Button>
                      )}
                    </>
                  )}

                  {!address && <WalletSelector />}
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
          </BoxBlurred>
        </Box>
      </Flex>
    </>
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
export default FarmCollectionMint;
