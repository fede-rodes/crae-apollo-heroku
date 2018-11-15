import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import signupMutation from '../../graphql/user/mutation/signup';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SignupApiCall extends React.PureComponent {
  handleSuccess = async ({ email }) => {
    const { onSignupError, onSignupSuccess, signup } = this.props;

    try {
      await signup({ variables: { email } });
      onSignupSuccess({ email });
    } catch (exc) {
      console.log(exc);
      onSignupError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      signupUser: this.handleSuccess,
    };

    return children(api);
  }
}

SignupApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onSignupError: PropTypes.func,
  onSignupSuccess: PropTypes.func,
  signup: PropTypes.func.isRequired,
};

SignupApiCall.defaultProps = {
  onSignupError: () => {},
  onSignupSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(signupMutation, { name: 'signup' });

export default withMutation(SignupApiCall);
