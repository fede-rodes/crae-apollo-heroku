const Base = require('./base');
const User = require('./user');
const Subscription = require('./subscription');
const Author = require('./author');
const Post = require('./post');

// Add all your schemas here!
const allSchemas = {
  Base,
  User,
  Subscription,
  Author,
  Post,
};

module.exports = allSchemas;
