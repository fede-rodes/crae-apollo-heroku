const { User, validLogin } = require('../../../../models');

// TODO: name change from validLogin to validLoginCredentials
// TODO: log to winston
//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const login = async (root, args) => {
  const { email, passcode } = args;

  const { error } = validLogin({ email, passcode });
  if (error) {
    console.log('INVALID LOGIN CREDENTIALS', error);
    throw new Error(error.details[0].message); // Bad request - 400
  }

  // Make sure user exists and pass code is valid
  const user = await User.findOne({ email });
  if (!user || !user.validatePasscode({ passcode })) {
    console.log('INVALID PASSCODE');
    throw new Error('Invalid email or passcode'); // Bad request - 400
  }

  // Check pas code expiration date
  if (user.passcodeExpired()) {
    console.log('PASSCODE EXPIRED');
    throw new Error('Pass code has expired'); // Bad request - 400
  }

  // Set email to verifield
  await user.setEmailToVerified();

  const token = user.genAuthToken();

  // Successful request
  return { _id: user._id, token };
};

module.exports = login;
