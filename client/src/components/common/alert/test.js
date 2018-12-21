import React from 'react';
import { shallow } from 'enzyme';
import Alert from '.';

describe('Alert', () => {
  it('renders null when no content is provided', () => {
    const wrapper = shallow(<Alert type="success" />);
    expect(wrapper.html()).toBeNull();
  });

  it('renders content when content is provided', () => {
    const wrapper = shallow(
      <Alert
        type="success"
        content="some msg"
      />,
    );
    expect(wrapper.text()).toBe('some msg');
  });
});
