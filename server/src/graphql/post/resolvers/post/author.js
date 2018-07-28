const { Author } = require('../../../../models');

const author = async (post) => {
  try {
    return await Author.findOne({ _id: post.authorId });
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = author;
