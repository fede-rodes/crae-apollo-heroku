import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from './index';

storiesOf('Title', module)
  .add('Title', () => (
    <Title>
      I&apos;m the Title
    </Title>
  ));
