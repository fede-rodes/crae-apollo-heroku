import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './index';

const component = () => <div>Hi!</div>;

describe('App component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App component={component} />, div);
  });

  it('renders', () => {
    const wrapper = shallow(<App component={component} />);
    expect(wrapper.exists()).toBe(true);
  });
});
