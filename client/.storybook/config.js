import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { configure, addDecorator } from '@storybook/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMockClient from '../src/graphql/apollo-mock-client';
// import mockClient from '../src/graphql/apollo-mock-client';
import scTheme from '../src/theme/sc';
import muiTheme from '../src/theme/mui';

const req = require.context('../src', true, /stories\.(js)$/);

function loadStories() {
  req.keys().forEach(req);
}

async function configStorybook() {
  const mockClient = await createMockClient();

  addDecorator((story) => (
    <ThemeProvider theme={scTheme}>
      <ApolloProvider client={mockClient}>
        <MuiThemeProvider theme={muiTheme}>
          {story()}
        </MuiThemeProvider>
      </ApolloProvider>
    </ThemeProvider>
  ));

  configure(loadStories, module);
}

configStorybook();


// import React from 'react';
// import { ThemeProvider } from 'styled-components';
// import { configure, addDecorator } from '@storybook/react';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import scTheme from '../src/theme/sc';
// import muiTheme from '../src/theme/mui';

// const req = require.context('../src', true, /stories\.(js)$/);

// function loadStories() {
//   req.keys().forEach(req);
// }

// addDecorator((story) => (
//   <ThemeProvider theme={scTheme}>
//     <MuiThemeProvider theme={muiTheme}>
//       {story()}
//     </MuiThemeProvider>
//   </ThemeProvider>
// ));

// configure(loadStories, module);
