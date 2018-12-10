import React from 'react';
import PropTypes from 'prop-types';
import DisabledProps, { disabledPropTypes } from './disabled-props';
import MessageProps, { messagePropTypes } from './message-props';
import HookProps, { hookPropTypes } from './hook-props';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
const FormProps = ({ children }) => (
  <DisabledProps>
    {disabledProps => (
      <MessageProps>
        {messageProps => (
          <HookProps
            disabledProps={disabledProps}
            messageProps={messageProps}
          >
            {(hookProps) => {
              // Public API
              const api = {
                disabled: disabledProps.disabled,
                errorMsg: messageProps.errorMsg,
                successMsg: messageProps.successMsg,
                setSuccessMessage: messageProps.setSuccessMessage,
                clearMessages: messageProps.clearMessages,
                handleBefore: hookProps.handleBefore,
                handleClientCancel: hookProps.handleClientCancel,
                handleClientError: hookProps.handleClientError,
                handleServerError: hookProps.handleServerError,
                handleSuccess: hookProps.handleSuccess,
              };

              return children(api);
            }}
          </HookProps>
        )}
      </MessageProps>
    )}
  </DisabledProps>
);

FormProps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default FormProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const formPropTypes = {
  disabled: disabledPropTypes.disabled,
  errorMsg: messagePropTypes.errorMsg,
  successMsg: messagePropTypes.successMsg,
  setSuccessMessage: messagePropTypes.setSuccessMessage,
  clearMessages: messagePropTypes.clearMessages,
  ...hookPropTypes,
};
