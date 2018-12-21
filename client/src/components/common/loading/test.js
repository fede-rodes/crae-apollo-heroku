import React from 'react';
import ReactDOM from 'react-dom';
// import { shallow } from 'enzyme';
import Loading from '.';

describe('Loading', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loading />, div);
  });
});
