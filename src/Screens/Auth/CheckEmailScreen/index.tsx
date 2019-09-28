import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage, Image, View } from 'react-native';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import client from '../../../GraphQL/ApolloClient';
import FormProps from '../../../RenderProps/form-props';
import Images from '../../../Themes/Images';
import Spacer from '../../../Components/Common/Spacer';
import Text from '../../../Components/Common/Text';
import PasscodeFormApiCall from '../../../Components/Auth/PasscodeFormApiCall';
import PasscodeForm from '../../../Components/Auth/PasscodeForm';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
export const CHECK_EMAIL_ACTIONS = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP',
};
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.concrete};
`;
//------------------------------------------------------------------------------
const Center = styled.View`
  align-items: center;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CheckEmailScreen = ({ navigation }) => {
  const { action, email } = navigation.state.params;

  return (
    <Container>
      <View>
        <Center>
          <Image
            style={{ height: 121, width: 121 }}
            resizeMode="contain"
            source={Images.checkEmail}
          />
        </Center>
        <Spacer size="XL" />
        <Text size="L" center>
          {I18n.t(`checkEmailScreen.${action.toLowerCase()}.title`)}
        </Text>
        <Spacer size="XL" />
        <Text size="M" center style={{ maxWidth: 300 }}>
          {I18n.t(`checkEmailScreen.${action.toLowerCase()}.subtitle`, { email })}
        </Text>
        <FormProps>
          {({
            disabled,
            errors,
            handleBefore,
            handleClientCancel,
            handleClientError,
            handleServerError,
            handleSuccess,
          }) => (
            <PasscodeFormApiCall
              email={email}
              onError={handleServerError}
              onSuccess={({ token }) => {
                // Extend formProps.handleSuccess' default functionality
                handleSuccess(async () => {
                  // Store token into browser and resetStore to update client data
                  await AsyncStorage.setItem('x-auth-token', token);
                  client.resetStore();
                });
              }}
            >
              {({ validatePasscode }) => (
                <PasscodeForm
                  placeholder={I18n.t('checkEmailScreen.placeholder')}
                  btnLabel={I18n.t('checkEmailScreen.btnLabel')}
                  errors={errors}
                  disabled={disabled}
                  onBeforeHook={handleBefore}
                  handleClientCancelHook={handleClientCancel}
                  onClientErrorHook={handleClientError}
                  onSuccessHook={validatePasscode}
                />
              )}
            </PasscodeFormApiCall>
          )}
        </FormProps>
      </View>
    </Container>
  );
};

CheckEmailScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        action: PropTypes.oneOf(Object.values(CHECK_EMAIL_ACTIONS)).isRequired,
        email: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default CheckEmailScreen;