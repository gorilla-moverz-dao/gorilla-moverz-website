import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import theme from "./theme";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AptosWalletAdapterProvider autoConnect={true}>
        <QueryClientProvider client={queryClient}>
          <ColorModeScript initialColorMode={theme.config.initalColorMode} />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AptosWalletAdapterProvider>
    </ChakraProvider>
  </React.StrictMode>
);
