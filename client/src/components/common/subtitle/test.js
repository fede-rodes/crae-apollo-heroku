import React from 'react';
import { shallow } from 'enzyme';
import Subtitle from '.';

describe('Subtitle', () => {
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
