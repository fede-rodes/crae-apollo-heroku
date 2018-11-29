import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import sendPasscodeMutation from '../../graphql/user/mutation/send-passcode';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SendPasscode extends React.PureComponent {
  handleSend = async ({ email }) => {
    const { onSendError, onSendSuccess, sendPasscode } = this.props;

    try {
      await sendPasscode({ variables: { email } });
      onSendSuccess();
    } catch (exc) {
      onSendError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      sendPasscode: this.handleSend,
    };

    return children(api);
  }
}

SendPasscode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onSendError: PropTypes.func,
  onSendSuccess: PropTypes.func,
  sendPasscode: PropTypes.func.isRequired,
};

SendPasscode.defaultProps = {
  onSendError: () => {},
  onSendSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(sendPasscodeMutation, { name: 'sendPasscode' });

export default withMutation(SendPasscode);
