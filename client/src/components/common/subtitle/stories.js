import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Subtitle from './index';

storiesOf('Subtitle', module)
  .add('Subtitle', () => (
    <Subtitle
      text="I&apos;m the Subtitle&nbsp;"
      linkTo="somewhere"
      linkLabel="Click me!"
      onLinkClick={action('clicked')}
    />
  ));
