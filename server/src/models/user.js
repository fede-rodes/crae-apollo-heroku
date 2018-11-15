const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const moment = require('moment');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { JWT_PRIVATE_KEY } = process.env;

const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const PASS_CODE_LENGTH = 6;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getExpDate = () => (
  // Five minutes from now
  moment().add(5, 'minutes').toISOString()
  // moment().add(5, 'seconds').toISOString()
);
//------------------------------------------------------------------------------
// MONGOOSE:
//------------------------------------------------------------------------------
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
  emailVerified: {
    type: Boolean,
    default: false,
  },
  passCode: {
    type: Number,
    minlength: PASS_CODE_LENGTH,
    maxlength: PASS_CODE_LENGTH,
  },
  expirationDate: { // pass code expiration date
    type: Date,
  },
});

schema.methods.validPassCode = function ({ passCode }) {
  return (
    passCode
    && this.passCode
    && parseInt(passCode, 10) === parseInt(this.passCode, 10)
  );
};

schema.methods.passCodeExpired = function () {
  if (!this.expirationDate) {
    return true; // expired
  }

  const now = moment();
  console.log('NOW', now.clone().toISOString());
  const expDate = moment(this.expirationDate);
  console.log('EXP_DATE', expDate.clone().toISOString());
  console.log('DIFF', expDate.diff(now));
  return expDate.diff(now) < 0;
};

schema.methods.genPassCode = async function (digits) {
  // TODO: Math.random() does not provide cryptographically secure random numbers.
  // Do not use them for anything related to security. Use the Web Crypto API
  // instead, and more precisely the window.crypto.getRandomValues() method.
  const passCode = Math.floor(Math.random() * (10 ** digits));
  this.passCode = passCode;
  this.expirationDate = getExpDate();
  await this.save();
  return passCode;
};

schema.methods.setEmailToVerified = async function () {
  this.emailVerified = true;
  await this.save();
};

schema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
};

const User = mongoose.model('User', schema);

//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const emailVal = Joi.string().email().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const passCodeVal = Joi.number().integer().min(0).max(Math.pow(10, PASS_CODE_LENGTH + 1)).required(); // eslint-disable-line

const validNewUser = (user) => {
  const joiSchema = {
    email: emailVal,
  };

  return Joi.validate(user, joiSchema); // { error, value }
};

const validLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    passCode: passCodeVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
};

module.exports = {
  User,
  validNewUser,
  validLogin,
};
