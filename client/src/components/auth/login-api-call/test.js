import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import mockClient from '../../../graphql/apollo-mock-client';
import LoginApiCall from '.';

// TODO: before all to mount/shallow component

describe('LoginApiCall', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

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
    jest.spyOn(mockClient, 'mutate');
    const handleLoginSuccess = jest.fn();
    const handleLoginError = jest.fn();

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

    wrapper.find('button').simulate('click');
    await wait(0);
    // await new Promise(resolve => setTimeout(resolve));
    // wrapper.update();

    console.log(mockClient.mutate);

    expect(mockClient.mutate).toBeCalled();
    expect(mockClient.mutate.mock.calls[0][0].variables).toMatchObject({
      email: 'email@example.com',
      passcode: parseInt('123456', 10),
    });

    expect(handleLoginSuccess).toBeCalled();
    expect(handleLoginSuccess).toBeCalledWith(
      expect.objectContaining({ token: 'xyz123' }),
    );
  });

  it('calls onLoginSuccess when passing valid email and passcode', () => {

  });

  it('calls onLoginError when passing invalid email and/or passcode', () => {

  });
});
