import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { FormProps } from '../../render-props';
// import { FormProps } from 'react-state-helpers-via-render-props';
// import SEO from '../../components/smart/seo';
import EmailForm from '../../components/auth/email-form';
import PassCodeForm from '../../components/auth/pass-code-form';
import SignupApiCall from '../../components/auth/signup-api-call';
import SendPassCode from '../../components/auth/send-pass-code';
import LoginApiCall from '../../components/auth/login-api-call';
import ResendPassCodeBtn from '../../components/auth/resend-pass-code-btn';
import AuthPageLayout from '../../layouts/auth-page';
import Feedback from '../../components/common/feedback';
import ButtonLink from '../../components/common/button-link';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// After PassCodeAuthView returns successful, the user logged-in-state will change
// from 'logged out' to 'logged in' automatically. This will trigger the
// LoggedOutRoute component's logic (said component wraps the SignupPage component)
// which will result in redirecting the user to home page automatically.
class SignupPage extends React.PureComponent {
  state = {
    view: 'emailView',
    email: '',
  }

  render() {
    const { client, onPageChange } = this.props;
    const { view, email } = this.state;

    const loginLink = (
      <ButtonLink onClick={() => { onPageChange('login'); }}>
        Log In
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
          handleClientError,
          handleServerError,
          handleSuccess,
        }) => (
          <AuthPageLayout
            title={view === 'emailView' ? 'Sign Up' : 'Enter Pass Code'}
            subtitle={view === 'emailView' ? 'Already have an account?' : 'Haven\'t received the pass code?'}
            link={view === 'emailView'
              ? loginLink
              : (
                <ResendPassCodeBtn
                  email={email}
                  label="Resend it"
                  disabled={disabled}
                  onBeforeHook={handleBefore}
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
              <SendPassCode
                onSendError={handleServerError}
                onSendSuccess={() => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    // Show success message after action is completed
                    setSuccessMessage('A new email has been sent to your inbox!');
                    // Switch to passCodeView view
                    this.setState({ view: 'passCodeView' });
                    // TODO: need to send passCode
                  });
                }}
              >
                {({ sendPassCode }) => (
                  <SignupApiCall
                    onSignupError={handleServerError}
                    onSignupSuccess={(newUser) => {
                      sendPassCode({ email: newUser.email });
                    }}
                  >
                    {({ onFormSuccess }) => (
                      <EmailForm
                        btnLabel="Send Pass Code"
                        disabled={disabled}
                        onBeforeHook={handleBefore}
                        onClientErrorHook={handleClientError}
                        onSuccessHook={(formInput) => {
                          // Store current user's email and fire signup api call
                          this.setState(
                            { email: formInput.email },
                            () => { onFormSuccess({ email: formInput.email }); },
                          );
                        }}
                      />
                    )}
                  </SignupApiCall>
                )}
              </SendPassCode>
            )}
            {view === 'passCodeView' && (
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
                {({ onFormSuccess }) => (
                  <PassCodeForm
                    btnLabel="Enter"
                    disabled={disabled}
                    onBeforeHook={handleBefore}
                    onClientErrorHook={handleClientError}
                    onSuccessHook={(formInput) => {
                      // Fire signup api call
                      onFormSuccess({ passCode: formInput.passCode });
                    }}
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

SignupPage.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  onPageChange: PropTypes.func,
};

SignupPage.defaultProps = {
  onPageChange: () => {},
};

export default withApollo(SignupPage);
