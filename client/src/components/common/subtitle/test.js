import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Subtitle from '.';

describe('Subtitle', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Subtitle text="Some text" />, div);
  });

  it('renders text and link', () => {
    const wrapper = shallow(
      <Subtitle
        text="Some text"
        link={<a href="/">Click me</a>}
      />,
    );
    expect(wrapper.find('p').find('span').text()).toEqual('Some text');
    expect(wrapper.find('a').text()).toEqual('Click me');
  });
});
