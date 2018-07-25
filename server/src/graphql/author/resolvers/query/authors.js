const { Author } = require('../../../../models');

const authors = async () => {
  try {
    return await Author.find({});
  } catch (exc) {
    console.log(exc);
    return [];
  }
};

module.exports = authors;
