import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import FormProps from '../../../RenderProps/form-props';
import LoginEmailApiCall from '../../../Components/Auth/LoginEmailApiCall';
import LoginEmailForm from '../../../Components/Auth/LoginEmailForm';
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
const LoginScreen = ({ navigation, onSuccessHook }) => (
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
          <LoginEmailApiCall
            onError={handleServerError}
            onSuccess={(params) => {
              handleSuccess(() => {
                onSuccessHook(params);
              });
            }}
          >
            {({ loginUser }) => (
              <LoginEmailForm
                email={get(navigation, 'state.params.email', '')}
                disabled={disabled}
                errors={errors}
                onBeforeHook={handleBefore}
                onClientCancelHook={handleClientCancel}
                onClientErrorHook={handleClientError}
                // Call api to authenticate user
                onSuccessHook={loginUser}
              />
            )}
          </LoginEmailApiCall>
        )}
      </FormProps>
    </Top>
    <Bottom>
      <LinkNavigate
        navigation={navigation}
        to="SignupEmailScreen"
        text={I18n.t('loginScreen.signupLink')}
        underline
      />
    </Bottom>
  </Container>
);

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        email: PropTypes.string,
      }),
    }),
  }).isRequired,
  onSuccessHook: PropTypes.func,
};

LoginScreen.defaultProps = {
  onSuccessHook: () => {},
};

export default LoginScreen;
