import React from 'react';
import ReactDOM from 'react-dom';
// import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import scTheme from '../../../theme/sc';
import Divider from '.';

describe('Divider', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ThemeProvider theme={scTheme}>
        <Divider />
      </ThemeProvider>,
      div,
    );
  });
});
