import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          aptos: ["@aptos-labs/ts-sdk"],
          react: ["react", "react-dom", "react-router-dom"],
          chakra: ["@chakra-ui/react"],
          reactQuery: ["@tanstack/react-query"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
  },
});
