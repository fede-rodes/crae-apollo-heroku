import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { MuiThemeProvider } from '@material-ui/core/styles';
import client from '../graphql/config';
import theme from '../mui-theme';
import GlobalDataProvider from '../global-data-provider';

// Given that we are implementing App Shell Architecture and, therefore,
// injecting (via reactDOM.render) the Header, Menu and Main components into
// different HTML elements, we need a way to share the router 'history' among
// all three mentioned components.
// As a default, for every invocation of 'BrowserRouter', there will be new
// 'history' instance created. Then, changes in the 'history' object in one
// component won't be available in the other components. To prevent this, we are
// relying on 'Router' component instead of 'BrowserRouter' and defining our
// custom 'history' object by means of 'createBrowserHistory' function. Said
// 'history' object is then passed to every invocation of 'Router' and therefore
// the same 'history' object will be shared among all three mentioned components.
const history = createBrowserHistory();

const App = ({ component }) => (
  <Router history={history}>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <GlobalDataProvider>
          {globalDataProps => (
            React.createElement(component, { ...globalDataProps })
          )}
        </GlobalDataProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  </Router>
);

App.propTypes = {
  component: PropTypes.func.isRequired,
};

export default App;
