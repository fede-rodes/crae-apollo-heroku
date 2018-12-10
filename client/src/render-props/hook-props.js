import React from 'react';
import PropTypes from 'prop-types';
import { disabledPropTypes } from './disabled-props';
import { messagePropTypes } from './message-props';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class HookProps extends React.PureComponent {
  handleBefore = (cb) => {
    const { disabledProps, messageProps } = this.props;
    disabledProps.disableBtn();
    messageProps.clearMessages();
    // Allow other components to extend handleBefore default functionality
    if (cb && typeof cb === 'function') { cb(); }
  }

  handleClientCancel = () => {
    const { disabledProps } = this.props;
    disabledProps.enableBtn();
  }

  handleClientError = (err) => { // eslint-disable-line no-unused-vars
    const { disabledProps } = this.props;
    // console.log(err);
    disabledProps.enableBtn();
  }

  handleServerError = (err) => {
    const { disabledProps, messageProps } = this.props;
    // console.log(err);
    const errorMsg = (
      err.reason
      || (err.message && err.message.replace('GraphQL error: ', ''))
      || 'Unexpected error'
    );
    messageProps.setErrorMessage(errorMsg);
    disabledProps.enableBtn();
  }

  handleSuccess = (cb) => {
    const { disabledProps, messageProps } = this.props;
    disabledProps.enableBtn();
    messageProps.clearMessages();
    // Allow other components to extend handleBefore default functionality
    if (cb && typeof cb === 'function') { cb(); }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      handleBefore: this.handleBefore,
      handleClientCancel: this.handleClientCancel,
      handleClientError: this.handleClientError,
      handleServerError: this.handleServerError,
      handleSuccess: this.handleSuccess,
    };

    return children(api);
  }
}

HookProps.propTypes = {
  disabledProps: PropTypes.shape(disabledPropTypes).isRequired,
  messageProps: PropTypes.shape(messagePropTypes).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default HookProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const hookPropTypes = {
  handleBefore: PropTypes.func.isRequired,
  handleClientCancel: PropTypes.func.isRequired,
  handleClientError: PropTypes.func.isRequired,
  handleServerError: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
