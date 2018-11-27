const { User, validLogin } = require('../../../../models');

// TODO: name change from validLogin to validLoginCredentials
// TODO: log to winston
//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const login = async (root, args) => {
  const { email, passCode } = args;

  const { error } = validLogin({ email, passCode });
  if (error) {
    console.log('INVALID LOGIN CREDENTIALS', error);
    throw new Error(400, error.details[0].message); // Bad request
  }

  // Make sure user exists and pass code is valid
  const user = await User.findOne({ email });
  if (!user || !user.validPassCode({ passCode })) {
    console.log('INVALID PASSCODE');
    throw new Error(400, 'Invalid email or passcode'); // Bad request
  }

  // Check pas code expiration date
  if (user.passCodeExpired()) {
    console.log('PASSCODE EXPIRED');
    throw new Error(400, 'Pass code has expired'); // Bad request
  }

  // Set email to verifield
  await user.setEmailToVerified();

  const token = user.genAuthToken();

  console.log('LOGIN RESPONSE', { _id: user._id, token });
  // Successful request
  return { _id: user._id, token };
};

module.exports = login;
