const { User, validateNewUser, validateLogin } = require('./user');
const { PassCode, genPassCode } = require('./pass-code');

module.exports = {
  User,
  validateNewUser,
  validateLogin,
  PassCode,
  genPassCode,
};
