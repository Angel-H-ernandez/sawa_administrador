"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { PropsWithChildren } from "react";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/graphql",
  credentials: "include", // Si necesitas enviar cookies
  headers: {
    "Content-Type": "application/json",
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
  credentials: "include", // Añadido aquí también
});

export function Providers({ children }: PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
