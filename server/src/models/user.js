const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_PRIVATE_KEY } = process.env;

if (!JWT_PRIVATE_KEY || JWT_PRIVATE_KEY.length === 0) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY env var missing');
  process.exit(1);
}

// Constants
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const PASS_CODE_LENGTH = 6;

// Mongoose schema and model
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
});

schema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
};

const User = mongoose.model('User', schema);

// Joi schema validator
const emailVal = Joi.string().email().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const passCodeVal = Joi.string().length(PASS_CODE_LENGTH).required(); // eslint-disable-line

const validateNewUser = (user) => {
  const joiSchema = {
    email: emailVal,
  };

  return Joi.validate(user, joiSchema); // { error, value }
};

const validateLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    passCode: passCodeVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
};

module.exports = {
  User,
  validateNewUser,
  validateLogin,
};
