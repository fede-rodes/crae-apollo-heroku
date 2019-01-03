import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import createMockClient from '../../../graphql/apollo-mock-client';
import loginMutation from '../../../graphql/user/mutation/login';
import LoginApiCall from '.';

// TODO: before all to mount/shallow component

// jest.mock('../../../graphql/user/mutation/login');

describe('LoginApiCall', () => {
  it('renders without crashing', async () => {
    const div = document.createElement('div');
    const mockClient = await createMockClient();

    ReactDOM.render(
      <ApolloProvider client={mockClient}>
        <LoginApiCall email="email@example.com">
          {({ loginUser }) => <div />}
        </LoginApiCall>
      </ApolloProvider>,
      div,
    );
  });

  it('calls login mutation passing email and passcode', async () => {
    const handleLoginSuccess = jest.fn();
    const handleLoginError = jest.fn();

    const mockClient = await createMockClient();

    const wrapper = mount(
      <ApolloProvider client={mockClient} addTypename={false}>
        <LoginApiCall
          email="email@example.com"
          onLoginError={handleLoginError}
          onLoginSuccess={handleLoginSuccess}
        >
          {({ loginUser }) => (
            <button
              type="button"
              onClick={() => { loginUser({ passcode: '123456' }); }}
            >
              Click
            </button>
          )}
        </LoginApiCall>
      </ApolloProvider>,
    );

    console.log(wrapper.debug());

    wrapper.find('button').simulate('click');
    await wait(0);
    // await new Promise(resolve => setTimeout(resolve));
    // wrapper.update();

    expect(handleLoginSuccess).toBeCalled();
  });


  // it('calls login mutation passing email and passcode', async (done) => {
  //   const mocks = [
  //     {
  //       request: {
  //         query: loginMutation,
  //         variables: {
  //           email: 'email@example.com',
  //           passcode: '123456',
  //         },
  //       },
  //       result: {
  //         data: {
  //           login: { _id: '123', token: 'xyz123' },
  //         },
  //       },
  //     },
  //   ];
  //   const handleLoginSuccess = jest.fn();
  //   const handleLoginError = jest.fn();

  //   const wrapper = mount(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <LoginApiCall
  //         email="email@example.com"
  //         onLoginError={handleLoginError}
  //         onLoginSuccess={handleLoginSuccess}
  //       >
  //         {({ loginUser }) => (
  //           <button
  //             type="button"
  //             onClick={() => { loginUser({ passcode: '123456' }); }}
  //           >
  //             Click
  //           </button>
  //         )}
  //       </LoginApiCall>
  //     </MockedProvider>,
  //   );

  //   console.log(wrapper.debug());

  //   wrapper.find('button').simulate('click');
  //   await wait(0);
  //   // await new Promise(resolve => setTimeout(resolve));
  //   // wrapper.update();

  //   expect(handleLoginSuccess).toBeCalled();
  //   done();
  // });

  // it('calls login mutation passing email and passcode', () => {
  //   const res = { data: { login: { token: '123' } } };
  //   const loginMutation = require('../../../graphql/user/mutation/login');
  //   loginMutation.mockImplementation(() => res);

  //   const wrapper = mount(
  //     <ApolloProvider client={mockClient}>
  //       <LoginApiCall email="email@example.com">
  //         {({ loginUser }) => (
  //           <button
  //             type="button"
  //             onClick={() => { loginUser({ password: '123456' }); }}
  //           >
  //             Click
  //           </button>
  //         )}
  //       </LoginApiCall>
  //     </ApolloProvider>,
  //   );

  //   wrapper.find('button').simulate('click');

  //   expect(loginMutation).toBeCalled();
  // });

  // it('calls login mutation passing email and passcode', () => {
  //   const res = { data: { login: { token: '123' } } };
  //   const loginMutation = require('../../../graphql/user/mutation/login');
  //   loginMutation.mockResolvedValue(res);

  //   const wrapper = mount(
  //     <ApolloProvider client={mockClient}>
  //       <LoginApiCall email="email@example.com">
  //         {({ loginUser }) => (
  //           <button
  //             type="button"
  //             onClick={() => { loginUser({ password: '123456' }); }}
  //           >
  //             Click
  //           </button>
  //         )}
  //       </LoginApiCall>
  //     </ApolloProvider>,
  //   );

  //   wrapper.find('button').simulate('click');

  //   expect(loginMutation).toBeCalled();
  // });

  it('calls onLoginSuccess when passing valid email and passcode', () => {

  });

  it('calls onLoginError when passing invalid email and/or passcode', () => {

  });
});
