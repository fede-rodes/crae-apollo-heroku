const { User, validateNewUser, validateLogin } = require('./user');
const { PassCode, genPassCode } = require('./pass-code');
const Author = require('./author');
const Post = require('./post');

module.exports = {
  User,
  validateNewUser,
  validateLogin,
  PassCode,
  genPassCode,
  Author,
  Post,
};
