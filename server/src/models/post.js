const mongoose = require('mongoose');

const schema = mongoose.Schema({
  authorId: String,
  title: String,
  text: String,
});

const Post = mongoose.model('Post', schema);

module.exports = Post;
