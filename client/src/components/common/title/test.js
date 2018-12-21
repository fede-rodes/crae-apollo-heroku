import React from 'react';
import { shallow } from 'enzyme';
import Title from '.';

describe('Title', () => {
  it('h1 renders child text', () => {
    const wrapper = shallow(<Title>Some text</Title>);
    expect(wrapper.find('h1').text()).toEqual('Some text');
  });
});
