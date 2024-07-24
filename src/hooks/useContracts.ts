import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { ContractClient } from "../services/contract-client";
import { useEffect } from "react";

const contractClient = new ContractClient();

const useContractClient = () => {
  const { account, signAndSubmitTransaction } = useWallet();

  useEffect(() => {
    contractClient.accountAddress = account?.address;
    contractClient.signAndSubmitTransaction = signAndSubmitTransaction;
  }, [account, signAndSubmitTransaction]);

  return contractClient;
};

export default useContractClient;
