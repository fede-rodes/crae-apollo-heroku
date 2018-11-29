const pick = require('lodash/pick');
const { User, validNewUser } = require('../../../../models');

// TODO: name change from validNewUser to validateSignup
// TODO: log to winston
//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const signup = async (root, args) => {
  const { email } = args;

  const { error } = validNewUser({ email });
  if (error) {
    console.log('INVALID SIGNUP', error);
    throw new Error(error.details[0].message); // Bad request - 400
  }

  // Make sure user doesn't exist already
  const user = await User.findOne({ email });
  if (user) {
    console.log('USER ALREADY REGISTERED', user);
    throw new Error('Email registered already'); // Bad request - 400
  }

  try {
    const newUser = new User({ email });
    await newUser.save();
    return pick(newUser, ['_id', 'createdAt', 'email']); // Success request
  } catch (exc) {
    console.log('ERROR REGISTERING NEW USER', exc);
    throw new Error(exc); // Server error
  }
};

module.exports = signup;
