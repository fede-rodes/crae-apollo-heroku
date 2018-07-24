import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const AuthorAndPosts = (props) => {
  console.log(props);
  const { loading, error, author } = props.data;
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if (!author) {
    return null;
  }

  return (
    <div>
      <p>{author.firstName}</p>
      <p>{author.lastName}</p>
      {author.posts.map(post => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
};

const authorAndPostsQuery = gql`
  query AuthorAndPostsQuery($firstName: String, $lastName: String) {
    author(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      posts {
        id
        title
        text
      }
    }
  }
`;

export default graphql(authorAndPostsQuery, {
  options: props => ({
    variables: {
      firstName: props.firstName,
      lastName: props.lastName,
    },
  }),
})(AuthorAndPosts);
