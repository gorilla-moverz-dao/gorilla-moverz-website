import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql",
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
