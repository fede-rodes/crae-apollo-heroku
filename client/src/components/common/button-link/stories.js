import React from 'react';
import { storiesOf } from '@storybook/react';
import { host } from 'storybook-host';
import ButtonLink from './index';

storiesOf('ButtonLink', module)
  .addDecorator(host({
    align: 'center middle',
    width: '60%',
  }))
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
