import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from '../graphql/config';
import HomePage from '../pages/home';

const App = () => (
  <ApolloProvider client={client}>
    <HomePage />
  </ApolloProvider>
);

export default App;
