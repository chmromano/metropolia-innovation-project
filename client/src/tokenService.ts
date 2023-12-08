import * as SecureStore from "expo-secure-store";
import { print } from "graphql";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import constants from "./config/constants";
import { ADD_USER } from "./graphql/mutations";
import { toUserToken } from "./types/typeUtils";

const checkResponseOk = (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const retrieveTokenForUser = async () => {
  const storedToken = await SecureStore.getItemAsync(
    constants.SECURE_STORE_JWT_KEY_NAME
  );

  const token = storedToken || (await fetchTokenForUser(uuidv4())).value;

  if (storedToken === null) {
    await SecureStore.setItemAsync(constants.SECURE_STORE_JWT_KEY_NAME, token);
  }

  return token;
};

const fetchTokenForUser = async (userId: string) => {
  const graphqlQuery = {
    query: print(ADD_USER), // Convert the ADD_USER mutation from GraphQL AST to a plain string to be used in the fetch() function
    variables: { userId },
  };

  const response = await fetch(constants.IP_ADDRESS_PORT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  });

  checkResponseOk(response);
  const data = (await response.json()) as unknown;

  const token = toUserToken(data);
  return token;
};
