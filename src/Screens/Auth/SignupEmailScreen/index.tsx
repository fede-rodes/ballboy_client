import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import FormProps from '../../../RenderProps/form-props';
import SignupEmailApiCall from '../../../Components/Auth/SignupEmailApiCall';
import SignupEmailForm from '../../../Components/Auth/SignupEmailForm';
import LinkNavigate from '../../../Components/Common/LinkNavigate';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce/use DefaultLayout instead
const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;
//------------------------------------------------------------------------------
const Top = styled.View`
  padding-top: 32px;
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  padding-top: 16px;
  padding-bottom: 16px;
  align-items: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SignupEmailScreen = ({ navigation, onSuccessHook }) => (
  <Container>
    <Top>
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
          <SignupEmailApiCall
            onError={handleServerError}
            onSuccess={(params) => {
              handleSuccess(() => {
                onSuccessHook(params);
              });
            }}
          >
            {({ signupUser }) => (
              <SignupEmailForm
                disabled={disabled}
                errors={errors}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                onSuccessHook={signupUser}
              />
            )}
          </SignupEmailApiCall>
        )}
      </FormProps>
    </Top>
    <Bottom>
      <LinkNavigate
        navigation={navigation}
        to="LoginScreen"
        text={I18n.t('signupEmailScreen.loginLink')}
        underline
      />
    </Bottom>
  </Container>
);

SignupEmailScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

SignupEmailScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default SignupEmailScreen;
