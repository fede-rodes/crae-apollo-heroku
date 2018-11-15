import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class MessageProps extends React.PureComponent {
  state = {
    errorMsg: '',
    successMsg: '',
  }

  setErrorMessage = (msg) => {
    this.setState(() => ({ errorMsg: msg }));
  }

  setSuccessMessage = (msg) => {
    this.setState(() => ({ successMsg: msg }));
  }

  clearMessages = () => {
    this.setState(() => ({ errorMsg: '', successMsg: '' }));
  }

  render() {
    const { children } = this.props;
    const { errorMsg, successMsg } = this.state;

    // Public API
    const api = {
      errorMsg,
      successMsg,
      setErrorMessage: this.setErrorMessage,
      setSuccessMessage: this.setSuccessMessage,
      clearMessages: this.clearMessages,
    };

    return children(api);
  }
}

MessageProps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default MessageProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const messagePropTypes = {
  errorMsg: PropTypes.string.isRequired,
  successMsg: PropTypes.string.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  clearMessages: PropTypes.func.isRequired,
};
