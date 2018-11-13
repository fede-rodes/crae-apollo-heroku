import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import sendPassCodeMutation from '../../graphql/user/mutation/send-pass-code';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class SendPassCode extends React.PureComponent {
  handleSend = async ({ email }) => {
    const { onSendError, onSendSuccess, sendPassCode } = this.props;

    try {
      await sendPassCode({ variables: { email } });
      onSendSuccess();
    } catch (exc) {
      onSendError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      sendPassCode: this.handleSend,
    };

    return children(api);
  }
}

SendPassCode.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onSendError: PropTypes.func,
  onSendSuccess: PropTypes.func,
  sendPassCode: PropTypes.func.isRequired,
};

SendPassCode.defaultProps = {
  onSendError: () => {},
  onSendSuccess: () => {},
};

// Apollo integration
const withMutation = graphql(sendPassCodeMutation, { name: 'sendPassCode' });

export default withMutation(SendPassCode);
