/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
const PASS_CODE_LENGTH = 6; // plain text passcode length
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getExpDate = () => (
  // Five minutes from now
  moment().add(5, 'minutes').toISOString()
  // moment().add(5, 'seconds').toISOString()
);
//------------------------------------------------------------------------------
// MONGOOSE SCHEMA:
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
  passcode: {
    type: String,
    maxlength: 1024, // hashed passcode
  },
  expirationDate: { // pass code expiration date
    type: Date,
  },
  // TODO: see jti or jwt balcklist to prevent stolen tokens to pass validation
  // See: https://medium.com/react-native-training/building-chatty-part-7-authentication-in-graphql-cd37770e5ab3
});
//------------------------------------------------------------------------------
// INSTANCE METHODS:
//------------------------------------------------------------------------------
schema.methods.validatePasscode = function ({ passcode }) {
  return (
    passcode
    && this.passcode
    && bcrypt.compare(passcode.toString(), this.passcode)
  );
};
//------------------------------------------------------------------------------
schema.methods.passcodeExpired = function () {
  if (!this.expirationDate) {
    return true; // expired
  }

  const now = moment();
  // console.log('NOW', now.clone().toISOString());
  const expDate = moment(this.expirationDate);
  // console.log('EXP_DATE', expDate.clone().toISOString());
  // console.log('DIFF', expDate.diff(now));
  return expDate.diff(now) < 0;
};
//------------------------------------------------------------------------------
schema.methods.genPasscode = async function (digits) {
  // TODO: Math.random() does not provide cryptographically secure random numbers.
  // Do not use them for anything related to security. Use the Web Crypto API
  // instead, and more precisely the window.crypto.getRandomValues() method.
  const passcode = Math.floor(Math.random() * (10 ** digits));

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(passcode.toString(), salt);

  this.passcode = hash;
  this.expirationDate = getExpDate();
  await this.save();

  return passcode; // plain text passcode
};
//------------------------------------------------------------------------------
schema.methods.setEmailToVerified = async function () {
  this.emailVerified = true;
  await this.save();
};
//------------------------------------------------------------------------------
schema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
};
//------------------------------------------------------------------------------
// STATIC METHODS:
//------------------------------------------------------------------------------
schema.statics.findById = function ({ _id }) {
  return this.findOne({ _id });
};
//------------------------------------------------------------------------------
schema.statics.findByEmail = function ({ email }) {
  return this.findOne({ email });
};
//------------------------------------------------------------------------------
schema.statics.createUser = async function ({ email }) {
  const newUser = new this({ email });
  await newUser.save();
  return newUser;
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const User = mongoose.model('User', schema);

//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const emailVal = Joi.string().email().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const passcodeVal = Joi.number().integer().min(0).max(Math.pow(10, PASS_CODE_LENGTH + 1)).required(); // eslint-disable-line

const validateSignup = (user) => {
  const joiSchema = {
    email: emailVal,
  };

  return Joi.validate(user, joiSchema); // { error, value }
};

const validateLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    passcode: passcodeVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
};

module.exports = {
  User,
  validateSignup,
  validateLogin,
};
