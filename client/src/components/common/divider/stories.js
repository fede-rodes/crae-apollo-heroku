import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import Divider from './index';

storiesOf('Divider', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
  .add('Divider', () => <Divider />);
