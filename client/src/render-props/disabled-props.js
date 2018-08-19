import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class DisabledProps extends React.PureComponent {
  state = {
    disabled: false,
  }

  disableBtn = () => {
    this.setState(() => ({ disabled: true }));
  }

  enableBtn = () => {
    this.setState(() => ({ disabled: false }));
  }

  render() {
    const { children } = this.props;
    const { disabled } = this.state;

    // Public API
    const api = {
      disabled,
      disableBtn: this.disableBtn,
      enableBtn: this.enableBtn,
    };

    return children(api);
  }
}

DisabledProps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default DisabledProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const disabledPropTypes = {
  disabled: PropTypes.bool.isRequired,
  disableBtn: PropTypes.func.isRequired,
  enableBtn: PropTypes.func.isRequired,
};
