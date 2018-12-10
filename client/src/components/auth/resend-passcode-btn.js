import React from 'react';
import PropTypes from 'prop-types';
import ButtonLink from '../common/button-link';
import SendPasscode from './send-passcode';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Button extends React.PureComponent {
  handleClick = async () => {
    const { onBeforeHook, onClientCancelHook, onClick } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Pass event up to parent component
    onClick();
  }

  render() {
    const { label, disabled } = this.props;

    return (
      <ButtonLink
        disabled={disabled}
        onClick={this.handleClick}
      >
        {label}
      </ButtonLink>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClick: () => {},
};
//------------------------------------------------------------------------------
// COMPONENT
//------------------------------------------------------------------------------

const ResendPasscodeBtn = ({
  email,
  label,
  disabled,
  onBeforeHook,
  onClientCancelHook,
  onSendError,
  onSendSuccess,
}) => (
  <SendPasscode
    onSendError={onSendError}
    onSendSuccess={onSendSuccess}
  >
    {({ sendPasscode }) => (
      <Button
        label={label}
        disabled={disabled}
        onBeforeHook={onBeforeHook}
        onClientCancelHook={onClientCancelHook}
        onClick={() => { sendPasscode({ email }); }}
      />
    )}
  </SendPasscode>
);

ResendPasscodeBtn.propTypes = {
  email: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onSendError: PropTypes.func,
  onSendSuccess: PropTypes.func,
};

ResendPasscodeBtn.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onSendError: () => {},
  onSendSuccess: () => {},
};

export default ResendPasscodeBtn;
