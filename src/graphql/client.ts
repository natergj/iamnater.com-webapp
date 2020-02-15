import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://127.0.0.1:3000/graphql',
    // uri: 'https://km93x1ydn5.execute-api.us-east-2.amazonaws.com/Prod/graphql',
  })
});

export default client;