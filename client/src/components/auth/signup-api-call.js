import React from 'react';
import PropTypes from 'prop-types';

const { NODE_ENV } = process.env;
const isNotProduction = NODE_ENV !== 'production';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SignupApiCall extends React.PureComponent {
  handleSuccess = async ({ email }) => {
    console.log('SIGNUP API CALL', email);
    const { onSignupSuccess, onSignupError } = this.props;

    const data = {
      method: 'post',
      mode: isNotProduction ? 'cors' : 'same-origin', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    };

    try {
      // TODO: create user record. Set emailVerified to false
      const res = await fetch('/api/signup', data);
      console.log('\nres2', res);
      if (res.status !== 200) {
        const resText = await res.text();
        console.log('resText', resText);
        onSignupError({ message: resText });
        return;
      }
      // const json = await res.body.json();

      // console.log('\njson', json);
      /* console.log('\nres.headers', res.headers);
      console.log('\nres.body', res.body);
      console.log('res.headers.entries()', res.headers.entries());
      let token = '';
      for (let pair of res.headers.entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
        if (pair[0] === 'x-auth-token') {
          token = pair[1];
        }
      }
      console.log('\nTOKEN', token); */
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
      onFormSuccess: this.handleSuccess,
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
};

SignupApiCall.defaultProps = {
  onSignupError: () => {},
  onSignupSuccess: () => {},
};

export default SignupApiCall;
