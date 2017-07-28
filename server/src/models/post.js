import mongoose from 'mongoose';

const schema = mongoose.Schema({
  authorId: String,
  title: String,
  text: String,
});

const Post = mongoose.model('Post', schema);

export default Post;
