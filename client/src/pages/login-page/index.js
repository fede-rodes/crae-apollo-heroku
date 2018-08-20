import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { FormProps } from '../../render-props';
// import SEO from '../../components/seo';
import {
  PassCodeAuthView,
  EmailAuthView,
  ResendPassCode,
} from '../../components/auth';
import AuthPageLayout from '../../layouts/auth-page';
import Feedback from '../../components/common/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// After PassCodeAuthView returns successful, the user logged-in-state will change
// from 'logged out' to 'logged in' automatically. This will trigger the
// LoggedOutRoute component's logic (said component wraps the LoginPage component)
// which will result in redirecting the user to home page automatically.
class LoginPage extends React.PureComponent {
  state = {
    view: 'emailView',
    email: '',
  }

  render() {
    const { client } = this.props;
    const { view, email } = this.state;

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
            title={view === 'emailView' ? 'Login' : 'Enter Pass Code'}
            subtitle={view === 'passCodeView' ? 'Haven\'t received the pass code?' : ''}
            link={view === 'passCodeView'
              ? (
                <ResendPassCode
                  email={email}
                  label="Resend it"
                  disabled={disabled}
                  onBeforeHook={handleBefore}
                  onServerErrorHook={handleServerError}
                  onSuccessHook={() => {
                    // Extend formProps.handleSuccess' default functionality
                    handleSuccess(() => {
                      // Show success message after action is completed
                      setSuccessMessage('A new email has been sent to your inbox!');
                    });
                  }}
                />
              )
              : null
            }
          >
            {view === 'emailView' && (
              <EmailAuthView
                btnLabel="Send Pass Code"
                disabled={disabled}
                onBeforeHook={handleBefore}
                onClientErrorHook={handleClientError}
                onServerErrorHook={handleServerError}
                onSuccessHook={(obj) => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    if (obj && obj.email) {
                      // Show success message after action is completed
                      setSuccessMessage('A new email has been sent to your inbox!');
                      // Switch to passCodeView view and store current user's email
                      this.setState({ view: 'passCodeView', email: obj.email });
                    }
                  });
                }}
              />
            )}
            {view === 'passCodeView' && (
              <PassCodeAuthView
                email={email}
                btnLabel="Enter"
                onBeforeHook={handleBefore}
                onClientErrorHook={handleClientError}
                onServerErrorHook={handleServerError}
                onSuccessHook={(obj) => {
                  // Extend formProps.handleSuccess' default functionality
                  handleSuccess(() => {
                    if (obj && obj.token) {
                      localStorage.setItem('x-auth-token', obj.token);
                      client.resetStore();
                    }
                  });
                }}
              />
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
};

export default withApollo(LoginPage);
