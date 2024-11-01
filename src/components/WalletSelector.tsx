import {
  isRedirectable,
  useWallet,
  Wallet,
  WalletReadyState,
  WalletName,
  AptosStandardSupportedWallet,
  truncateAddress,
} from "@aptos-labs/wallet-adapter-react";
import { Badge, Box, Button, Image, Text } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@/components/ui/menu";
import { Tooltip } from "@/components/ui/tooltip";

export function WalletSelector() {
  const { connect, disconnect, account, wallets, connected, network, wallet } = useWallet();

  const onWalletSelected = (wallet: WalletName) => {
    connect(wallet);
  };

  const getLabel = () => {
    return (
      <>
        {network && <p>Network: {network?.url}</p>}
        {wallet && <p>Wallet: {wallet.name}</p>}
      </>
    );
  };

  const buttonText = account?.ansName ? account?.ansName : truncateAddress(account?.address);

  if (connected) {
    return (
      <Tooltip showArrow content={getLabel()} aria-label="Wallet information">
        <Button className="wallet-button" onClick={() => disconnect()}>
          {buttonText} <IoIosLogOut />
        </Button>
      </Tooltip>
    );
  }

  return (
    <>
      <MenuRoot>
        <MenuTrigger as={Button}>
          Connect Wallet <FaChevronDown />
        </MenuTrigger>
        <MenuContent>
          {wallets?.map((wallet: Wallet | AptosStandardSupportedWallet) => {
            return walletView(wallet, onWalletSelected);
          })}
        </MenuContent>
      </MenuRoot>
    </>
  );
}

const walletView = (wallet: Wallet | AptosStandardSupportedWallet, onWalletSelected: (wallet: WalletName) => void) => {
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable;

  // The user is on a mobile device
  if (!isWalletReady && isRedirectable()) {
    const mobileSupport = (wallet as Wallet).deeplinkProvider;
    // If the user has a deep linked app, show the wallet
    if (mobileSupport) {
      return (
        <MenuItem key={wallet.name} value={wallet.name} onClick={() => onWalletSelected(wallet.name)}>
          <div className="wallet-menu-wrapper">
            <div className="wallet-name-wrapper">
              <img src={wallet.icon} width={25} style={{ marginRight: 10 }} />
              <Text className="wallet-selector-text">{wallet.name}</Text>
            </div>
            <Button>
              <Text>Connect</Text>
            </Button>
          </div>
        </MenuItem>
      );
    }
    // Otherwise don't show anything
    return null;
  } else {
    // The user is on a desktop device
    return (
      <MenuItem
        key={wallet.name}
        value={wallet.name}
        onClick={
          wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable
            ? () => onWalletSelected(wallet.name)
            : () => window.open(wallet.url)
        }
      >
        <Image src={wallet.icon} width={25} marginRight={2} />
        <Box flex={1} paddingRight={4}>
          {wallet.name}
        </Box>
        {wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable ? (
          <Badge>Connect</Badge>
        ) : (
          <Badge>Install</Badge>
        )}
      </MenuItem>
    );
  }
};
