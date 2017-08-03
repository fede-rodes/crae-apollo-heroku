import React, { Component } from 'react';

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo';

import './App.css';
import Authors from './components/Authors';
import AuthorAndPosts from './components/AuthorAndPosts';

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

class App extends Component {
  // See ES6 Classes section at: https://facebook.github.io/react/docs/reusable-components.html
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h3>CRAE-Apollo-Heroku</h3>
          <Authors />
          <h3>{'Enter author\'s name to get his/her posts:'}</h3>
          <form>
            <input
              name="firstName"
              type="text"
              placeholder="first name"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="last name"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </form>
          <AuthorAndPosts
            firstName={this.state.firstName}
            lastName={this.state.lastName}
          />
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
  }
}

export default App;
