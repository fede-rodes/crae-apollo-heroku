import React from 'react';
import SignupPage from '../signup-page';
import LoginPage from '../login-page';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// After PasscodeAuthView returns successful, the user logged-in-state will change
// from 'logged out' to 'logged in' automatically. This will trigger the
// LoggedOutRoute component's logic (said component wraps the AuthPage component)
// which will result in redirecting the user to home page automatically.
class AuthPage extends React.PureComponent {
  state = {
    page: 'login', // 'signup',
  }

  handlePageChange = (page) => {
    this.setState({ page });
  }

  render() {
    const { page } = this.state;

    return page === 'login'
      ? <LoginPage onPageChange={this.handlePageChange} />
      : <SignupPage onPageChange={this.handlePageChange} />;
  }
}

export default AuthPage;
