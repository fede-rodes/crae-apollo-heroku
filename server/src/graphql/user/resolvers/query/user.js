const { User } = require('../../../../models');

const user = async (root, args, context) => {
  const { user: usr } = context;

  if (!usr || !usr._id) {
    return null;
  }

  // Query current logged in user
  try {
    const curUser = await User.findOne({ _id: usr._id }).exec();
    return curUser;
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = user;
