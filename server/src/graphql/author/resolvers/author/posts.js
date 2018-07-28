const { Post } = require('../../../../models');

const posts = async (author) => {
  try {
    return await Post.find({ authorId: author._id });
  } catch (exc) {
    console.log(exc);
    return [];
  }
};

module.exports = posts;
