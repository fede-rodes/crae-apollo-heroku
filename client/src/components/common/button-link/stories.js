import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonLink from './index';

storiesOf('ButtonLink', module)
  .add('ButtonLink default', () => (
    <ButtonLink>
      I&apos;m the content
    </ButtonLink>
  ))
  .add('ButtonLink disabled', () => (
    <ButtonLink disabled>
      I&apos;m the content
    </ButtonLink>
  ))
  .add('ButtonLink no underline', () => (
    <ButtonLink underline={false}>
      I&apos;m the content
    </ButtonLink>
  ))
  .add('ButtonLink no underline disabled', () => (
    <ButtonLink underline={false} disabled>
      I&apos;m the content
    </ButtonLink>
  ));
