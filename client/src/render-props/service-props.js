import React from 'react';
import PropTypes from 'prop-types';

//------------------------------------------------------------------------------
// PROPS AND METHODS PROVIDER:
//------------------------------------------------------------------------------
class ServiceProps extends React.PureComponent {
  state = {
    service: '', // auth service type: 'password' or 'facebook'
  }

  setService = (service) => {
    this.setState(() => ({ service }));
  }

  clearService = () => {
    this.setState(() => ({ service: '' }));
  }

  render() {
    const { children } = this.props;
    const { service } = this.state;

    // Public API
    const api = {
      service,
      setService: this.setService,
      clearService: this.clearService,
    };

    return children(api);
  }
}

ServiceProps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default ServiceProps;

//------------------------------------------------------------------------------
// PROP TYPES:
//------------------------------------------------------------------------------
export const servicePropTypes = {
  service: PropTypes.string.isRequired,
  setService: PropTypes.func.isRequired,
  clearService: PropTypes.func.isRequired,
};
