const { User } = require('../../../../models');

const user = async (root, args, ctx) => {
  const { usr } = ctx;

  if (!usr || !usr._id) {
    return null;
  }

  // Query current logged in user
  // TODO: hide implementation details. Define getUser() and in case of error return null;
  try {
    return await User.findOne({ _id: usr._id }).exec();
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = user;
