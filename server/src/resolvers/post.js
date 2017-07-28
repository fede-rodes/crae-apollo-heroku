import { Author } from '../models';

// We need to tell graphql how to resolve the 'author' field inside the Post
// query. We could also define resolver functions for the rest of the Post
// fields, but if we don't do that graphql will default to the field values,
// which is exactly what we want.
const Post = {
  author(post) {
    return Author.findOne({ _id: post.authorId }); // post.getAuthor();
  },
};

export default Post;
