import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import { MemoryRouter, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
// import wait from 'waait';
import mockClient from '../../../graphql/apollo-mock-client';
import LoggedInRoute from '.';

const renderRoute = (path, context) => mount(
  <MemoryRouter initialEntries={[path]}>
    <Switch>
      <LoggedInRoute
        path="/"
        component={() => (<div><h1>Home</h1></div>)}
        authComponent={() => (<div><h1>Log in</h1></div>)}
      />
    </Switch>
  </MemoryRouter>,
  context,
);

describe('LoggedInRoute', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = renderRoute('/', {});
    ReactDOM.render(wrapper, div);
    wrapper.unmount();
  });

  // it('renders Log in text if user is NOT authenticated when visiting /', () => {
  //   const context = { curUser: null };
  //   const wrapper = renderRoute('/', { context });
  //   // console.log(wrapper.debug());
  //   expect(wrapper.find('h1').text()).toBe('Log in');
  //   // wrapper.setContext({
  //   //   curUser: {
  //   //     _id: '123',
  //   //     createdAt: new Date(),
  //   //     email: 'example@email.com',
  //   //   },
  //   // });
  //   // expect(wrapper.find('h1').text()).toBe('Log In');
  //   // wrapper.unmount();
  // });

  // it('renders Home text if user IS authenticated when visiting /', () => {
  //   const context = {
  //     client: {
  //       query: {
  //         user: {
  //           data: {
  //             _id: '123',
  //             createdAt: new Date(),
  //             email: 'example@email.com',
  //           }
  //         },
  //       }
  //     },
  //   };
  //   const wrapper = renderRoute('/', { options: { context } });
  //   console.log(wrapper.debug());
  //   // console.log(wrapper.find({ prop: 'path' }).debug());
  //   // console.log(wrapper.find('Component').debug());
  //   expect(wrapper.find({ prop: 'path' }).dive().find('h1').text()).toBe('Log in');
  //   // expect(wrapper.find('h1').text()).toBe('Log In');
  //   // wrapper.unmount();
  // });
});
