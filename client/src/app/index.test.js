import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('App component', () => {
  it('<App /> should render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });
});
