const pick = require('lodash/pick');
const { User, validateSignup } = require('../../../../models');

//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const signup = async (root, args) => {
  const { email } = args;

  const { error } = validateSignup({ email });
  if (error) {
    console.log('INVALID SIGNUP CREDENTIALS', error);
    throw new Error(error.details[0].message); // Bad request - 400
  }

  // Make sure user doesn't exist already
  const user = await User.findByEmail({ email });
  if (user) {
    console.log('USER ALREADY REGISTERED', user);
    throw new Error('Email already in use'); // Bad request - 400
  }

  const newUser = await User.createUser({ email });
  return pick(newUser, ['_id', 'createdAt', 'email']); // Success request
};

module.exports = signup;
