const pick = require('lodash/pick');
const { User, validNewUser } = require('../../../../models');

// TODO: name change from validNewUser to validSignup
// TODO: log to winston
//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const signup = async (root, args) => {
  const { email } = args;
  console.log('SIGNUP', args);

  const { error } = validNewUser({ email });
  if (error) {
    console.log('INVALID SIGNUP', error);
    throw new Error(400, error.details[0].message); // Bad request
  }

  // Make sure user doesn't exist already
  const user = await User.findOne({ email });
  if (user) {
    console.log('USER ALREADY REGISTERED', user);
    throw new Error(400, 'Email registered already'); // Bad request
  }

  try {
    const newUser = new User({ email });
    await newUser.save();
    console.log('RESPONSE', pick(newUser, ['_id', 'createdAt', 'email']));
    return pick(newUser, ['_id', 'createdAt', 'email']); // Success request
  } catch (exc) {
    console.log('ERROR REGISTERING NEW USER', exc);
    throw new Error(500, exc); // Server error
  }
};

module.exports = signup;
