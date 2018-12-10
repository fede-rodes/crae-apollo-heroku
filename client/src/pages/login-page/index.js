import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { FormProps } from '../../render-props';
// import { FormProps } from 'react-state-helpers-via-render-props';
// import SEO from '../../components/smart/seo';
import EmailForm from '../../components/auth/email-form';
import PasscodeForm from '../../components/auth/passcode-form';
import SendPasscode from '../../components/auth/send-passcode';
import LoginApiCall from '../../components/auth/login-api-call';
import ResendPasscodeBtn from '../../components/auth/resend-passcode-btn';
import AuthPageLayout from '../../layouts/auth-page';
import Feedback from '../../components/common/feedback';
import ButtonLink from '../../components/common/button-link';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// After PasscodeAuthView returns successful, the user logged-in-state will change
// from 'logged out' to 'logged in' automatically. This will trigger the
// LoggedOutRoute component's logic (said component wraps the LoginPage component)
// which will result in redirecting the user to home page automatically.
class LoginPage extends React.PureComponent {
  state = {
    view: 'emailView',
    email: '',
  }

  render() {
    const { client, onPageChange } = this.props;
    const { view, email } = this.state;

    const signupLink = (
      <ButtonLink onClick={() => { onPageChange('signup'); }}>
        Sign Up
      </ButtonLink>
    );

    return (
      <FormProps>
        {({
          disabled,
          errorMsg,
          successMsg,
          setSuccessMessage,
          handleBefore,
          handleClientCancel,
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <AuthPageLayout
            title={view === 'emailView' ? 'Log In' : 'Enter Pass Code'}
            subtitle={view === 'emailView' ? 'Don\'t have an account?' : 'Haven\'t received the pass code?'}
            link={view === 'emailView'
              ? signupLink
              : (
                <ResendPasscodeBtn
                  email={email}
                  label="Resend it"
                  disabled={disabled}
                  onBeforeHook={handleBefore}
                  onClientCancelHook={handleClientCancel}
                  onSendError={handleServerError}
                  onSendSuccess={() => {
                    // Extend formProps.handleSuccess' default functionality
                    handleSuccess(() => {
                      // Show success message after action is completed
                      setSuccessMessage('A new email has been sent to your inbox!');
                    });
                  }}
                />
              )
            }
          >
            {view === 'emailView' && (
              <SendPasscode
                onSendError={handleServerError}
                onSendSuccess={() => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    // Show success message after action is completed
                    setSuccessMessage('A new email has been sent to your inbox!');
                    // Switch to passcodeView view
                    this.setState({ view: 'passcodeView' });
                  });
                }}
              >
                {({ sendPasscode }) => (
                  <EmailForm
                    btnLabel="Send Pass Code"
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onClientCancelHook={handleClientCancel}
                    onClientErrorHook={handleClientError}
                    onSuccessHook={(inputFields) => {
                      // Store current user's email and fire signup api call
                      this.setState(
                        { email: inputFields.email },
                        () => { sendPasscode({ email: inputFields.email }); },
                      );
                    }}
                  />
                )}
              </SendPasscode>
            )}
            {view === 'passcodeView' && (
              <LoginApiCall
                email={email}
                onLoginError={handleServerError}
                onLoginSuccess={({ token }) => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    // Store token into browser and resetStore to update client data
                    localStorage.setItem('x-auth-token', token);
                    client.resetStore();
                  });
                }}
              >
                {({ loginUser }) => (
                  <PasscodeForm
                    btnLabel="Enter"
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onClientCancelHook={handleClientCancel}
                    onClientErrorHook={handleClientError}
                    // Fire signup api call
                    onSuccessHook={loginUser}
                  />
                )}
              </LoginApiCall>
            )}
            <div className="mb2" />
            <Feedback
              loading={disabled}
              errorMsg={errorMsg}
              successMsg={successMsg}
            />
          </AuthPageLayout>
        )}
      </FormProps>
    );
  }
}

LoginPage.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  onPageChange: PropTypes.func,
};

LoginPage.defaultProps = {
  onPageChange: () => {},
};

export default withApollo(LoginPage);
