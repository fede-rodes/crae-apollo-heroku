const { Post } = require('../../../../models');

const posts = author => (
  Post.find({ authorId: author._id })
);

module.exports = posts;
