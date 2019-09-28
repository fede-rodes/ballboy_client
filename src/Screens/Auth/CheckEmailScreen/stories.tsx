import { storiesOf } from '@storybook/react-native';
import React from 'react';
import CheckEmailScreen, { CHECK_EMAIL_ACTIONS } from '.';

const navigation = action => ({
  state: {
    params: {
      action,
      email: 'email@example.com',
    },
  },
});

storiesOf('Screen.Auth', module)
  .add('CheckEmailScreen LOGIN', () => (
    <CheckEmailScreen navigation={navigation(CHECK_EMAIL_ACTIONS.LOGIN)} />
  ))
  .add('CheckEmailScreen SIGNUP', () => (
    <CheckEmailScreen navigation={navigation(CHECK_EMAIL_ACTIONS.SIGNUP)} />
  ));
