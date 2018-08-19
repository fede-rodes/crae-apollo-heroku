import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//------------------------------------------------------------------------------
// STYLES:
//------------------------------------------------------------------------------
const Div = styled.div`
  background-color: ${({ type, theme }) => (type === 'error' && theme.color.dangerLight)
  || (type === 'success' && theme.color.successLight)
  || 'white'};
  border: 1px solid ${({ type, theme }) => (type === 'error' && theme.color.danger)
  || (type === 'success' && theme.color.success)
  || 'black'};
  font-size: ${({ theme }) => theme.fontSize.small};
  padding: 10px 15px;
`;

Div.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const Alert = ({ type, content, ...rest }) => (
  content && content.trim().length > 0
    ? <Div type={type} {...rest}>{content}</Div>
    : null
);

Alert.propTypes = {
  type: PropTypes.oneOf(['error', 'success']).isRequired,
  content: PropTypes.string,
};

Alert.defaultProps = {
  content: '',
};
//------------------------------------------------------------------------------

export default Alert;
