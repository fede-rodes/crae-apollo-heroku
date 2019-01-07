import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { withUser } from '../../../global-data-provider';
import userFragment from '../../../graphql/user/fragment/user';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component renders the provided
 * the authComponent on top of the current route.
 */
const LoggedInRoute = ({
  curUser,
  component: Component,
  authComponent: AuthComponent,
  ...rest
}) => (
  <Route
    {...rest}
    render={(ownProps) => {
      const childProps = { curUser, ...rest, ...ownProps };

      // If user is NOT logged in, resolve
      if (!curUser) {
        return <AuthComponent {...childProps} />;
      }

      // Otherwise, render the requested component
      return <Component {...childProps} />;
    }}
  />
);

LoggedInRoute.propTypes = {
  curUser: propType(userFragment),
  component: PropTypes.func.isRequired,
  authComponent: PropTypes.func.isRequired,
};

LoggedInRoute.defaultProps = {
  curUser: null,
};

export default withUser(LoggedInRoute);
