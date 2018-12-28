import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';
import EmailForm from '.';

describe('EmailForm', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EmailForm />, div);
  });

  it('renders Submit if not button label is provided', () => {
    const wrapper = shallow(<EmailForm />);
    console.log(wrapper.debug());
    expect(wrapper.find({ type: 'submit' }).children().text()).toBe('Submit');
  });

  it('renders custom label button', () => {
    const wrapper = shallow(<EmailForm btnLabel="Some label" />);
    console.log(wrapper.debug());
    expect(wrapper.find({ type: 'submit' }).children().text()).toBe('Some label');
  });
});
