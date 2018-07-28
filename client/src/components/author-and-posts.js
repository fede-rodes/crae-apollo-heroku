import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import authorFragment from '../graphql/author/fragment/author';
import authorQuery from '../graphql/author/query/author';

const AuthorAndPosts = ({ authorData }) => {
  const { loading, error, author } = authorData;

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
        <div key={post._id}>
          <p>{post.title}</p>
          <p>{post.text}</p>
        </div>
      ))}
    </div>
  );
};

AuthorAndPosts.propTypes = {
  // eslint-disable-next-line
  author: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  authorData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    author: propType(authorFragment),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

AuthorAndPosts.defaultProps = {
  author: null,
};

const withData = graphql(authorQuery, {
  name: 'authorData',
  options: ({ author }) => ({
    variables: {
      firstName: (author && author.firstName) || '',
      lastName: (author && author.lastName) || '',
    },
  }),
});

export default withData(AuthorAndPosts);
