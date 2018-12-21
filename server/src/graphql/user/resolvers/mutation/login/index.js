const { User, validateLogin } = require('../../../../../models');

//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const login = async (root, args) => {
  const { email, passcode } = args;

  const { error } = validateLogin({ email, passcode });
  if (error) {
    console.log('INVALID LOGIN CREDENTIALS', error);
    throw new Error(error.details[0].message); // Bad request - 400
  }

  // Make sure user exists
  const user = await User.findByEmail({ email });
  if (!user) {
    console.log('USER DOES NOT EXIST');
    throw new Error('Invalid email or passcode'); // Bad request - 400
  }

  // Make sure the passcode is valid
  const isValidPasscode = await user.validatePasscode({ passcode });
  if (!isValidPasscode) {
    console.log('INVALID PASSCODE');
    throw new Error('Invalid email or passcode'); // Bad request - 400
  }

  // Check passcode's expiration date
  if (user.passcodeExpired()) {
    console.log('PASSCODE EXPIRED');
    throw new Error('Passcode has expired'); // Bad request - 400
  }

  // Set email to verifield
  await user.setEmailToVerified();

  const token = user.genAuthToken();

  // Successful request
  return { _id: user._id, token };
};

module.exports = login;
