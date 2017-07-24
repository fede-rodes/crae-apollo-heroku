import React from 'react';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

// REACT_APP_GRAPHQL_URI is defined in .env file. When the app is deployed to
// heroku, the REACT_APP_GRAPHQL_URI env variable needs to be reset to point to
// https://YOUR-APP-NAME.herokuapp.com/graphql (this will have precedence over
// the default value provided in the .env file). See the .env file on how to do
// this.
const isNotProduction = process.env.NODE_ENV !== 'production';
const uri = isNotProduction ? 'http://localhost:3001/graphql' : process.env.REACT_APP_GRAPHQL_URI;

// Log
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('GRAPHQL_URI', uri);

const networkInterface = createNetworkInterface({ uri });
const client = new ApolloClient({ networkInterface });

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h3>CRAE-Apollo-Heroku</h3>
      <ChannelsListWithData />
      <a
        href="https://github.com/fede-rodes/crae-apollo-heroku"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/fede-rodes/crae-apollo-heroku
      </a>
    </div>
  </ApolloProvider>
);

export default App;
