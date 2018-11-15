import React from 'react';
import PropTypes from 'prop-types';

const { NODE_ENV } = process.env;
const isNotProduction = NODE_ENV !== 'production';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class LoginApiCall extends React.PureComponent {
  handleSuccess = async ({ passCode }) => {
    const { email, onLoginSuccess, onLoginError } = this.props;

    const data = {
      method: 'post',
      mode: isNotProduction ? 'cors' : 'same-origin', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'include', // include, same-origin, *omit
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, passCode }),
    };

    try {
      const res = await fetch('/api/login', data);
      console.log('\nres', res);
      if (res.status !== 200) {
        const resText = await res.text();
        console.log('resText', resText);
        onLoginError({ message: resText });
        return;
      }
      // const json = await res.body.json();

      // console.log('\njson', json);
      console.log('\nres.headers', res.headers);
      console.log('\nres.body', res.body);
      console.log('res.headers.entries()', res.headers.entries());
      let token = '';
      for (let pair of res.headers.entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
        if (pair[0] === 'x-auth-token') {
          token = pair[1];
        }
      }
      console.log('\nTOKEN', token);
      onLoginSuccess({ token });
    } catch (exc) {
      console.log(exc);
      onLoginError(exc);
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

LoginApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  email: PropTypes.string.isRequired,
  onLoginError: PropTypes.func,
  onLoginSuccess: PropTypes.func,
};

LoginApiCall.defaultProps = {
  onLoginError: () => {},
  onLoginSuccess: () => {},
};

export default LoginApiCall;
