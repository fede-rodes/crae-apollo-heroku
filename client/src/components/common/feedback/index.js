import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../loading';
import Alert from '../alert';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Feedback = ({
  className,
  loading,
  errorMsg,
  successMsg,
}) => (
  <div className={className || ''}>
    {loading && <Loading className="center" />}
    <Alert type="error" content={errorMsg} />
    <Alert type="success" content={successMsg} />
  </div>
);

Feedback.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.string,
};

Feedback.defaultProps = {
  className: '',
  loading: false,
  errorMsg: '',
  successMsg: '',
};

export default Feedback;
