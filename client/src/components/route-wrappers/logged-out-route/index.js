import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { withUser } from '../../../global-data-provider';
import userFragment from '../../../graphql/user/fragment/user';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wraped route
 * is not authenticated. If not, the LoggedOutRoute component redirectsthe user
 * to the given route.
 */
const LoggedOutRoute = ({
  curUser,
  component: Component,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={(ownProps) => {
      const childProps = { ...rest, ...ownProps };

      // If user IS logged in, redirect
      if (curUser) {
        return <Redirect to={redirectTo} />;
      }

      // Otherwise, render requested component
      return <Component {...childProps} />;
    }}
  />
);

LoggedOutRoute.propTypes = {
  curUser: propType(userFragment),
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

LoggedOutRoute.defaultProps = {
  curUser: null,
};

export default withUser(LoggedOutRoute);
