const signup = require('./signup');
const login = require('./login');
const sendPasscode = require('./send-passcode');

const Mutation = {
  signup,
  login,
  sendPasscode,
};

module.exports = Mutation;
