import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '../../graphql/user/fragment/user';
import AuthPage from '../../pages/auth-page';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component renders the provided
 * the loginOverlay component on top of the current route.
 */
const LoggedInRoute = ({ curUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(ownProps) => {
      const childProps = { curUser, ...rest, ...ownProps };

      // If user is NOT logged in, resolve
      if (!curUser) {
        return <AuthPage {...childProps} />;
      }

      // Otherwise, render the requested component
      return <Component {...childProps} />;
    }}
  />
);

LoggedInRoute.propTypes = {
  curUser: propType(userFragment),
  component: PropTypes.func.isRequired,
};

LoggedInRoute.defaultProps = {
  curUser: null,
};

export default LoggedInRoute;
