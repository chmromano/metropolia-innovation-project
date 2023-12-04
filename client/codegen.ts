import { CodegenConfig } from "@graphql-codegen/cli";

import constants from "./src/config/constants";

const config: CodegenConfig = {
  schema: constants.IP_ADDRESS_PORT,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/graphql/codegen/": {
      preset: "client",
      plugins: [],
      config: {
        withHooks: true,
      },
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
