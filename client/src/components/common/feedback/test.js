import React from 'react';
import ReactDOM from 'react-dom';
// import { shallow } from 'enzyme';
import Feedback from '.';

describe('Feedback', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Feedback />, div);
  });
});
