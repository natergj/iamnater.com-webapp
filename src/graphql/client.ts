import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
declare var GRAPHQL_URI: string;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GRAPHQL_URI,
  })
});

export default client;