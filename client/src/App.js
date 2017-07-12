import React, { Component } from 'react';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

console.log('process.env.REACT_APP_NODE_ENV', process.env.REACT_APP_NODE_ENV);
console.log('process.env.REACT_APP_PORT', process.env.REACT_APP_PORT);
const isNotProduction = process.env.REACT_APP_NODE_ENV !== 'production';

const uri = isNotProduction ? 'http://localhost:3001/graphql' : 'https://crae-app.herokuapp.com/graphql';
const networkInterface = createNetworkInterface({ uri });

// TODO: need config to pass domain name as an argument for deployed app

const client = new ApolloClient({ networkInterface });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="navbar">React + GraphQL Tutorial</div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

/*
import React, { Component } from 'react';
import './App.css';
import ChannelsListWithData from './components/ChannelsListWithData';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

const isNotProduction = process.env.REACT_APP_NODE_ENV !== 'production';
const serverPort = isNotProduction ? 3001 : (process.env.REACT_APP_PORT || 5000);
console.log('process.env.REACT_APP_PORT', process.env.REACT_APP_PORT);
console.log('serverPort', serverPort);
console.log('process.env.REACT_APP_NODE_ENV', process.env.REACT_APP_NODE_ENV);

const networkInterface = createNetworkInterface({
  uri: `http://localhost:${serverPort}/graphql`,
});

const client = new ApolloClient({
  networkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="navbar">React + GraphQL Tutorial</div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
*/


/* import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });


const client = new ApolloClient({
  networkInterface: mockNetworkInterface,
});

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>
    { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
  </ul>;
};

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App; */

/* import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {cities: []}

  async componentDidMount() {
    const response = await fetch('/cities')
    const cities   = await response.json()

    this.setState({cities: cities})
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.cities.map( city => {
            return <li key={city.name}> <b>{city.name}</b>: {city.population}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default App; */
