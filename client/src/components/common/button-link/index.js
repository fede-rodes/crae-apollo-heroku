import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Button = styled.button`
  /* reset button style */
  background: none !important;
  border: none;
  padding: 0 !important;
  font: 'inherit';
  text-decoration: ${({ disabled, underline }) => (
    (!disabled || disabled === false) ? underline : 'none'
  )};
  color: ${({ disabled, theme }) => (
    (!disabled || disabled === false) ? theme.color.link : 'inherit'
  )};
  cursor: ${({ disabled }) => (
    (!disabled || disabled === false) ? 'pointer' : 'not-allowed'
  )};
`;

Button.propTypes = {
  type: PropTypes.oneOf(['button']).isRequired,
  underline: PropTypes.oneOf(['underline', 'none']).isRequired,
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ButtonLink = ({ children, underline, ...rest }) => (
  <Button
    type="button"
    underline={underline}
    {...rest}
  >
    {children}
  </Button>
);

ButtonLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
  underline: PropTypes.oneOf(['underline', 'none']),
  // Plus all of the native button props
};

ButtonLink.defaultProps = {
  underline: 'underline',
};

export default ButtonLink;
