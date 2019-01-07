import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider } from '@material-ui/core/styles';
import wait from 'waait';
import mockClient from '../graphql/apollo-mock-client';
import scTheme from '../theme/sc';
import muiTheme from '../theme/mui';
import Routes from '.';

const renderRoutes = (path, context = {}) => mount(
  <ThemeProvider theme={scTheme}>
    <MemoryRouter initialEntries={[path]}>
      <ApolloProvider client={mockClient}>
        <MuiThemeProvider theme={muiTheme}>
          <Routes />
        </MuiThemeProvider>
      </ApolloProvider>
    </MemoryRouter>
  </ThemeProvider>,
  context,
);

describe('Routes', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = renderRoutes('/');
    ReactDOM.render(wrapper, div);
    wrapper.unmount();
  });

  // it('renders Login page if user is NOT authenticated when visiting /', () => {
  //   const context = { curUser: null };
  //   const wrapper = renderRoutes('/', { context });
  //   // console.log(wrapper.debug());
  //   expect(wrapper.find('h1').text()).toBe('Log In');
  //   wrapper.setContext({
  //     curUser: {
  //       _id: '123',
  //       createdAt: new Date(),
  //       email: 'example@email.com',
  //     },
  //   });
  //   expect(wrapper.find('h1').text()).toBe('Log In');
  //   wrapper.unmount();
  // });

  // it('renders Home page if user IS authenticated when visiting /', async () => {
  //   /* const context = {
  //     user: {
  //       loading: false,
  //       error: false,
  //       user: {
  //         _id: '123',
  //         createdAt: new Date(),
  //         email: 'example@email.com',
  //       },
  //     },
  //   };
  //   const wrapper = renderRoutes('/', {
  //     context,
  //     childContextTypes: { user: PropTypes.object },
  //   }); */
  //   const context = {
  //     curUser: {
  //       _id: '123',
  //       createdAt: new Date().toISOString(),
  //       email: 'example@email.com',
  //     },
  //   };
  //   const wrapper = renderRoutes('/', {
  //     context,
  //     childContextTypes: { curUser: PropTypes.object },
  //   });
  //   await wait(0);
  //   // console.log(wrapper.debug());
  //   expect(wrapper.find('h1').text()).toBe('Log In');
  //   wrapper.unmount();
  // });
});
