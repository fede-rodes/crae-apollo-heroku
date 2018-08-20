const mongoose = require('mongoose');
const { isEmail } = require('validator');

// Constants
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const PASS_CODE_LENGTH = 6;

// Mongoose schema and model
const schema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: MIN_STRING_LENGTH,
    maxlength: MAX_STRING_LENGTH,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [isEmail, 'Please fill a valid email address'],
  },
  passCode: {
    type: Number,
    minlength: PASS_CODE_LENGTH,
    maxlength: PASS_CODE_LENGTH,
    required: [true, 'Pass code is required'],
  },
  // TODO: add expiration date
});

const PassCode = mongoose.model('PassCode', schema);

// TODO: Math.random() does not provide cryptographically secure random numbers.
// Do not use them for anything related to security. Use the Web Crypto API
// instead, and more precisely the window.crypto.getRandomValues() method.
const genPassCode = digits => (
  Math.floor(Math.random() * (10 ** digits))
);

module.exports = {
  PassCode,
  genPassCode,
};
