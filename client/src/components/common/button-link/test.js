import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import scTheme from '../../../theme/sc';
import ButtonLink from '.';

describe('ButtonLink', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={scTheme}>
        <ButtonLink>
          Im a button
        </ButtonLink>
      </ThemeProvider>,
      div,
    );
  });

  it('renders child text', () => {
    const wrapper = shallow(
      <ButtonLink>
        Im a button
      </ButtonLink>,
    );
    expect(wrapper.text()).toEqual('Im a button');
  });

  it('accepts underline prop', () => {
    const wrapper = shallow(
      <ButtonLink underline="underline">
        Im a button
      </ButtonLink>,
    );

    expect(wrapper.props().underline).toBe('underline');
  });

  it('accepts onClick prop', () => {
    const handleClick = jest.fn();

    const wrapper = shallow(
      <ButtonLink onClick={handleClick}>
        Im a button
      </ButtonLink>,
    );

    wrapper.simulate('click');
    expect(wrapper.props().onClick).toHaveBeenCalled();
  });
});
