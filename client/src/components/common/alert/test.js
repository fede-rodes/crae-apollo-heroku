import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Alert from '.';

describe('Alert', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Alert type="success" />, div);
  });

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
