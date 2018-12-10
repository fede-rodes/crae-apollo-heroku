import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import Button from '@material-ui/core/Button';
import ButtonLink from '../common/button-link';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LogoutBtn = ({
  client,
  btnType,
  disabled,
  underline,
  onLogoutHook,
}) => {
  // Logout user and clear store afterwards
  const handleLogout = (evt) => {
    if (evt) { evt.preventDefault(); }
    // Remove auth token from localStorage
    localStorage.removeItem('x-auth-token');
    // Clear apollo store
    client.resetStore();
    // Pass event up to parent component
    onLogoutHook();
  };

  const ButtonComp = btnType === 'link' ? ButtonLink : Button;

  return (
    <ButtonComp
      disabled={disabled}
      underline={underline}
      onClick={handleLogout}
    >
      Log out
    </ButtonComp>
  );
};

LogoutBtn.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  btnType: PropTypes.oneOf(['button', 'link']),
  disabled: PropTypes.bool,
  underline: PropTypes.oneOf(['underline', 'none']),
  onLogoutHook: PropTypes.func,
};

LogoutBtn.defaultProps = {
  btnType: 'button',
  disabled: false,
  underline: 'underline',
  onLogoutHook: () => {},
};

export default withApollo(LogoutBtn);
