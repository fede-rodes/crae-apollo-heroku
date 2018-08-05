import React from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import userFragment from '../../graphql/user/fragment/user';
import Authors from '../../components/authors';
import AuthorForm from '../../components/author-form';
import AuthorAndPosts from '../../components/author-and-posts';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// Styled-components example usage
const Title = styled.h3`
  color: tomato;
`;
//------------------------------------------------------------------------------
const Json = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  state = { author: null }

  handleSubmit = ({ author }) => {
    this.setState({ author });
  }

  render() {
    const { curUser } = this.props;
    const { author } = this.state;

    return (
      <div>
        <Title>Enter author&apos;s first name and/or last name to get his/her posts:</Title>
        <Authors />
        {/* Basscss example usage */}
        <div className="mb1" />
        <AuthorForm onSubmit={this.handleSubmit} />
        <AuthorAndPosts author={author} />
        <h3>Current User</h3>
        <Json>
          {JSON.stringify(curUser, null, 2)}
        </Json>
      </div>
    );
  }
}

HomePage.propTypes = {
  curUser: propType(userFragment),
};

HomePage.defaultProps = {
  curUser: null,
};

export default HomePage;
