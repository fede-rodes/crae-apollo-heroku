import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Button = styled.button`
  /* reset button style */
  background: none !important;
  color: inherit;
  border: none; 
  padding: 0 !important;
  font: inherit;
  color: ${({ disabled, theme }) => (disabled === false && theme.color.link)
  || 'inherit'};
  border-bottom: ${({ disabled, theme }) => (disabled === false && `1px solid ${theme.color.link}`)
  || 'none'};
  cursor: ${({ disabled }) => (disabled === false && 'pointer')
  || 'not-allowed'};
`;

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button']).isRequired,
};

Button.defaultProps = {
  disabled: false,
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ButtonLink = ({ children, disabled, ...rest }) => (
  <Button
    type="button"
    disabled={disabled}
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
  disabled: PropTypes.bool,
};

ButtonLink.defaultProps = {
  disabled: false,
};

export default ButtonLink;
