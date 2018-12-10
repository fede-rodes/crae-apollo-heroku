import React from 'react';
import { storiesOf } from '@storybook/react';
import Feedback from './index';

storiesOf('Feedback', module)
  .add('Error', () => (
    <Feedback
      loading={false}
      errorMsg="I'm an error msg"
      successMsg=""
    />
  ))
  .add('Success', () => (
    <Feedback
      loading={false}
      errorMsg=""
      successMsg="I'm a success msg"
    />
  ))
  .add('Loading', () => (
    <Feedback
      loading
      errorMsg=""
      successMsg=""
    />
  ));
