const { Author } = require('../../../../models');

const author = post => (
  Author.findOne({ _id: post.authorId })
);

module.exports = author;
