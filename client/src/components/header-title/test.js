import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import HeaderTitle from '.';

const renderTitle = path => mount(
  <MemoryRouter initialEntries={[path]}>
    <HeaderTitle />
  </MemoryRouter>,
);

describe('HeaderTitle', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const wrapper = renderTitle('/');
    ReactDOM.render(wrapper, div);
  });

  it('renders Not Found if when visiting unknown path', () => {
    const wrapper = renderTitle('/random');
    expect(wrapper.text()).toBe('Not Found');
  });

  it('renders Home if when visiting / path', () => {
    const wrapper = renderTitle('/');
    expect(wrapper.text()).toBe('Home');
  });
});
