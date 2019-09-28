import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import privateUserQuery from '../../../GraphQL/Users/Queries/privateUser';
import { CITIES } from '../../../constants';
import EditProfileForm from '.';

storiesOf('Profile.EditProfileForm', module)
  .add('EditProfileForm', () => (
    <Query query={privateUserQuery}>
      {({ loading, error, data }) => {
        if (loading || error) return null;

        return (
          <EditProfileForm
            user={data.privateUser}
            location={CITIES[0]}
          />
        );
      }}
    </Query>
  ));
