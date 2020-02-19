import { ApolloLink, ApolloClient, HttpLink, InMemoryCache, concat } from "@apollo/client";
declare var GRAPHQL_URI: string;

const httpLink = new HttpLink({
  uri: GRAPHQL_URI,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const idToken = window.sessionStorage.getItem("id_token");
  if (idToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${idToken}` || null,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
