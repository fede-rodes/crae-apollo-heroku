import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import userFragment from './graphql/user/fragment/user';
import userQuery from './graphql/user/query/user';

const Context = React.createContext();

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Injects global data (current user, global settings, whatever) into
 * app's context.
 */
const GlobalDataProvider = ({ userData, children }) => {
  const { error, loading, user } = userData;

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Context.Provider
      value={{ curUser: user }}
    >
      {children}
    </Context.Provider>
  );
};

GlobalDataProvider.propTypes = {
  userData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    user: propType(userFragment),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

// Apollo integration
const withData = graphql(userQuery, { name: 'userData' });

export default withData(GlobalDataProvider);

export const withUser = Component => props => (
  <Context.Consumer>
    {userProps => <Component {...props} {...userProps} />}
  </Context.Consumer>
);
