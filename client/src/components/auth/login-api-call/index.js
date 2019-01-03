import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import loginMutation from '../../../graphql/user/mutation/login';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LoginApiCall extends React.PureComponent {
  handleSuccess = async ({ passcode }) => {
    const {
      email,
      onLoginError,
      onLoginSuccess,
      login,
    } = this.props;

    console.log('EMAIL', email);
    console.log('PASSCODE', passcode);
    console.log('LOGIN', login);

    try {
      const res = await login({ variables: { email, passcode: parseInt(passcode, 10) } });
      onLoginSuccess({ token: res.data.login.token });
      console.log('SUCCESS!!!!!');
    } catch (exc) {
      console.log('ERROR!!!!!');
      console.log(exc);
      onLoginError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      loginUser: this.handleSuccess,
    };

    return children(api);
  }
}

LoginApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  email: PropTypes.string.isRequired,
  onLoginError: PropTypes.func,
  onLoginSuccess: PropTypes.func,
  login: PropTypes.func.isRequired,
};

LoginApiCall.defaultProps = {
  onLoginError: () => {},
  onLoginSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(loginMutation, { name: 'login' });

export default withMutation(LoginApiCall);
