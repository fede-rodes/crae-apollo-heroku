import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import scTheme from '../src/theme/sc';
import muiTheme from '../src/theme/mui';

const req = require.context('../src', true, /stories\.(js)$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator((story) => (
  <ThemeProvider theme={scTheme}>
    <MuiThemeProvider theme={muiTheme}>
      {story()}
    </MuiThemeProvider>
  </ThemeProvider>
));

configure(loadStories, module);