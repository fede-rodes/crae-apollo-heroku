const signup = require('./signup');
const login = require('./login');
const sendPassCode = require('./send-pass-code');

const Mutation = {
  signup,
  login,
  sendPassCode,
};

module.exports = Mutation;
