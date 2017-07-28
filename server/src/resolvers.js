import _ from 'lodash';
import { Author, Post } from './models';

const resolvers = {
  Query: {
    authors: () => (Author.find({})),
    author: (root, args) => {
      // In case firstName or lastName is '', just remove field from the query
      // in order to avoid empty results.
      const query = {};
      _.each(['firstName', 'lastName'], (fieldName) => {
        if (args[fieldName] && args[fieldName].trim().length > 0) {
          _.extend(query, { [fieldName]: args[fieldName].trim() });
        }
      });

      if (_.isEmpty(query)) {
        return null;
      }
      return Author.findOne(query);
    },
  },
  // We need to tell graphql how to resolve the 'posts' field inside the Author
  // query. We could also define resolver functions for the rest of the Author
  // fields, but if we don't do that graphql will default to the field values,
  // which is exactly what we want.
  Author: {
    posts(author) {
      return Post.find({ authorId: author._id }); // author.getPosts();
    },
  },
  // See comment above.
  Post: {
    author(post) {
      return Author.findOne({ _id: post.authorId }); // post.getAuthor();
    },
  },
};

export default resolvers;
