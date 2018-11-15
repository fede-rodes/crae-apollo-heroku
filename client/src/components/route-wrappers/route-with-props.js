import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Pass props down to child component.
 */
const RouteWithProps = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const childProps = { ...rest, ...props };
      return <Component {...childProps} />;
    }}
  />
);

RouteWithProps.propTypes = {
  component: PropTypes.func.isRequired,
};

export default RouteWithProps;
