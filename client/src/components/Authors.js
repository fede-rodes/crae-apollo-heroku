import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import authorFragment from '../graphql/author/fragment/author';
import authorsQuery from '../graphql/author/query/authors';

const Authors = ({ authorsData }) => {
  const { loading, error, authors } = authorsData;

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      {authors.map(author => (
        <div key={author._id}>
          {author.firstName}, {author.lastName}
        </div>
      ))}
    </div>
  );
};

Authors.propTypes = {
  authorsData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    authors: PropTypes.arrayOf(propType(authorFragment)),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

const withData = graphql(authorsQuery, { name: 'authorsData' });

export default withData(Authors);
