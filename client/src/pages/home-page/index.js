import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import userFragment from '../../graphql/user/fragment/user';
import Title from '../../components/common/title';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Json = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HomePage = ({ curUser }) => (
  <div>
    <Title>Home Page</Title>
    <div className="mb1" />
    <h3>Current User</h3>
    <Json>
      {JSON.stringify(curUser, null, 2)}
    </Json>
  </div>
);

HomePage.propTypes = {
  curUser: propType(userFragment),
};

HomePage.defaultProps = {
  curUser: null,
};

export default HomePage;
