import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          aptos: ["@aptos-labs/ts-sdk", "@aptos-labs/wallet-adapter-react"],
          react: ["react", "react-dom", "react-router-dom"],
          chakra: ["@chakra-ui/react"],
          reactQuery: ["@tanstack/react-query"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
});
