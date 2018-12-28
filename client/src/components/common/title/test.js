import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Title from '.';

describe('Title', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Title>Some text</Title>, div);
  });

  it('h1 renders child text', () => {
    const wrapper = shallow(<Title>Some text</Title>);
    expect(wrapper.find('h1').text()).toEqual('Some text');
  });
});
