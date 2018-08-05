const { User } = require('../../../../models');

const user = async () => {
  // Simulate current user fetching
  try {
    return await User.findOne({}).exec();
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = user;
