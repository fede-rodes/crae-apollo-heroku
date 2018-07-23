const { Author } = require('../../../../models');

const authors = () => (
  Author.find({})
);

module.exports = authors;
