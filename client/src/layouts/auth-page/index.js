import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Title from '../../components/common/title';
import Subtitle from '../../components/common/subtitle';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const MaxWidth = styled.div`
  max-width: 400px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const AuthPageLayout = ({
  children,
  title,
  subtitle,
  link,
}) => (
  <MaxWidth className="mx-auto">
    {title && <Title>{title}</Title>}
    {subtitle && <Subtitle text={subtitle} link={link} />}
    {children}
  </MaxWidth>
);

AuthPageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  link: PropTypes.object, // eslint-disable-line
};

AuthPageLayout.defaultProps = {
  title: '',
  subtitle: '',
  link: null,
};

export default AuthPageLayout;
