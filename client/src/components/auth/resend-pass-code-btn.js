import React from 'react';
import PropTypes from 'prop-types';
import ButtonLink from '../common/button-link';
import SendPassCode from './send-pass-code';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Button extends React.PureComponent {
  handleClick = async () => {
    const { onBeforeHook, onClick } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
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
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClick: () => {},
};
//------------------------------------------------------------------------------
// COMPONENT
//------------------------------------------------------------------------------

const ResendPassCodeBtn = ({
  email,
  label,
  disabled,
  onBeforeHook,
  onSendError,
  onSendSuccess,
}) => (
  <SendPassCode
    onSendError={onSendError}
    onSendSuccess={onSendSuccess}
  >
    {({ sendPassCode }) => (
      <Button
        label={label}
        disabled={disabled}
        onBeforeHook={onBeforeHook}
        onClick={() => { sendPassCode({ email }); }}
      />
    )}
  </SendPassCode>
);

ResendPassCodeBtn.propTypes = {
  email: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onSendError: PropTypes.func,
  onSendSuccess: PropTypes.func,
};

ResendPassCodeBtn.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onSendError: () => {},
  onSendSuccess: () => {},
};

export default ResendPassCodeBtn;

/*
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import sendPassCodeMutation from '../../graphql/pass-code/mutation/send-pass-code';
import ButtonLink from '../common/button-link';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ResendPassCode extends React.PureComponent {
  handleClick = async (evt) => {
    evt.preventDefault();

    const {
      email,
      onBeforeHook,
      onServerErrorHook,
      onSuccessHook,
      sendPassCode,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    try {
      await sendPassCode({ variables: { email } });
      onSuccessHook();
    } catch (exc) {
      console.log(exc);
      onServerErrorHook(exc);
    }
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

ResendPassCode.propTypes = {
  email: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  sendPassCode: PropTypes.func.isRequired,
};

ResendPassCode.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

// Apollo integration
const withMutation = graphql(sendPassCodeMutation, { name: 'sendPassCode' });

export default withMutation(ResendPassCode);

*/
