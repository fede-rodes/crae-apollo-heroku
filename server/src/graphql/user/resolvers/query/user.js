const { User } = require('../../../../models');

const user = (root, args, ctx) => {
  const { usr } = ctx;

  if (!usr || !usr._id) {
    return null;
  }

  // Query current logged in user
  return User.findById({ _id: usr._id });
};

module.exports = user;
