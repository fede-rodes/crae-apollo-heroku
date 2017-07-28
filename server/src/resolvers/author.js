import { Post } from '../models';

// We need to tell graphql how to resolve the 'posts' field inside the Author
// query. We could also define resolver functions for the rest of the Author
// fields, but if we don't do that graphql will default to the field values,
// which is exactly what we want.
const Author = {
  posts(author) {
    return Post.find({ authorId: author._id }); // author.getPosts();
  },
};

export default Author;
