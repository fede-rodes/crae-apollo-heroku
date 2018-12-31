import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import LoginApiCall from '.';

describe('LoginApiCall', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <LoginApiCall>
        {({ loginUser }) => (
          <div />
        )}
      </LoginApiCall>,
    );
  });
});
