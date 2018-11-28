const { User } = require('../../../../models');

const user = async (root, args, context) => {
  const { usr } = context;

  if (!usr || !usr._id) {
    return null;
  }

  // Query current logged in user
  try {
    return await User.findOne({ _id: usr._id }).exec();
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = user;
