import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import constants from "./src/config/constants";
import Main from "./src/Main";
import { retrieveTokenForUser } from "./src/tokenService";

const initializeApolloClient = async () => {
  // TODO: implement this properly
  const token = await retrieveTokenForUser();

  const authLink = setContext((_, { headers }) => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: constants.IP_ADDRESS_PORT,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return client;
};

const App = () => {
  const [apolloClient, setApolloClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const apolloClient = await initializeApolloClient();
        setApolloClient(apolloClient);
      } catch (error) {
        console.error("Error initializing Apollo Client", error);
      }
    };

    void initClient();
  }, []);

  return apolloClient ? (
    <NavigationContainer>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NavigationContainer>
  ) : null;
};

export default App;
