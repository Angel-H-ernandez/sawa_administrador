import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/graphql", // Reemplaza con tu endpoint GraphQL
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
