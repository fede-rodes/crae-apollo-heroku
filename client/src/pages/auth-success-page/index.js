import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose, withApollo } from 'react-apollo';
// import SEO from '../../components/smart/seo';
import Loading from '../../components/common/loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class AuthSuccessPage extends React.Component {
  componentWillMount() {
    const { match, history, client } = this.props;

    // Get token from url params
    console.log('match.params', match.params);
    const token = (match && match.params && match.params.token.replace('#_=_', '')) || '';

    // Store token into browser and resetStore to update client data
    localStorage.setItem('x-auth-token', token);
    client.resetStore();
    history.push('/');
    // AuxFunctions.delayedAlert('Account verified successfully. Thanks!', 700);
  }

  render() {
    return [
      // <SEO
      //   key="seo"
      //   schema="AboutPage"
      //   title="Verify Email Page"
      //   description="A starting point for Meteor applications."
      //   contentType="product"
      // />,
      <Loading key="view" />,
    ];
  }
}

AuthSuccessPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

const enhance = compose(
  withRouter, // provides access to match.params and history.push()
  withApollo, // provides access to client
);

export default enhance(AuthSuccessPage);
