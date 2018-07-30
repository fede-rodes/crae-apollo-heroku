import React from 'react';
import styled from 'styled-components';
import Authors from '../../components/authors';
import AuthorForm from '../../components/author-form';
import AuthorAndPosts from '../../components/author-and-posts';

// Styled-components example usage
const Title = styled.h3`
  color: tomato;
`;

class HomePage extends React.PureComponent {
  state = { author: null }

  handleSubmit = ({ author }) => {
    this.setState({ author });
  }

  render() {
    const { author } = this.state;

    return (
      <div>
        <Title>Enter author&apos;s first name and/or last name to get his/her posts:</Title>
        <Authors />
        {/* Basscss example usage */}
        <div className="mb1" />
        <AuthorForm onSubmit={this.handleSubmit} />
        <AuthorAndPosts author={author} />
      </div>
    );
  }
}

export default HomePage;
