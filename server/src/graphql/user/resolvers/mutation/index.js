const login = require('./login');
const sendPassCode = require('./send-pass-code');

const Mutation = {
  login,
  sendPassCode,
};

module.exports = Mutation;
