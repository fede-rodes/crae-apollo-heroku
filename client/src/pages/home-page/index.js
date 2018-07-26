import React from 'react';
import Authors from '../../components/authors';
import AuthorForm from '../../components/author-form';
import AuthorAndPosts from '../../components/author-and-posts';

class HomePage extends React.PureComponent {
  state = { author: null }

  handleSubmit = ({ author }) => {
    this.setState({ author });
  }

  render() {
    const { author } = this.state;

    return (
      <div>
        <h3>Enter author&apos;s name to get his/her posts:</h3>
        <Authors />
        <AuthorForm onSubmit={this.handleSubmit} />
        <AuthorAndPosts author={author} />
      </div>
    );
  }
}

export default HomePage;
