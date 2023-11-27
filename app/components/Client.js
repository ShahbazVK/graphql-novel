"use client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export const Client = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
