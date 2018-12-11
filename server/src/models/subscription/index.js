/* eslint-disable func-names */
const mongoose = require('mongoose');
const Joi = require('joi');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 155;
//------------------------------------------------------------------------------
// MONGOOSE SCHEMA:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    index: true,
  },
  endpoint: {
    type: String,
  },
  keys: {
    auth: {
      type: String,
    },
    p256dh: {
      type: String,
    },
  },
});
//------------------------------------------------------------------------------
// INSTANCE METHODS:
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// STATIC METHODS:
//------------------------------------------------------------------------------
schema.statics.findByEndpoint = async function ({ user, endpoint }) {
  if (!user || !user._id) {
    return null;
  }
  return this.findOne({ userId: user._id, endpoint });
};
//------------------------------------------------------------------------------
schema.statics.createSubscription = async function ({ user, endpoint, keys }) {
  if (!user || !user._id) {
    return null;
  }
  const newSub = new this({ userId: user._id, endpoint, keys });
  await newSub.save();
  return newSub;
};
//------------------------------------------------------------------------------
schema.statics.findAll = async function ({ user }) {
  if (!user || !user._id) {
    return [];
  }
  return this.find({}).select({ endpoint: 1, keys: 1 });
};
//------------------------------------------------------------------------------
schema.statics.deleteByEndpoint = async function ({ user, endpoint }) {
  if (!user || !user._id) {
    return null;
  }

  // Make sure the user has permission
  const sub = await this.findOne({ userId: user._id, endpoint });
  if (!sub) {
    return null;
  }

  await this.deleteOne({ _id: sub._id });

  // Return the deleted subscription
  return sub;
};
//------------------------------------------------------------------------------
// MONGOOSE MODEL:
//------------------------------------------------------------------------------
const Subscription = mongoose.model('Subscription', schema);

//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const validatePush = (args) => {
  const joiKeys = Joi.object().keys({
    auth: Joi.string().required(),
    p256dh: Joi.string().required(),
  });

  const joiSubscription = Joi.object().keys({
    endpoint: Joi.string().required(),
    keys: joiKeys,
  });

  const joiSchema = {
    // subscriptions: Joi.array().items(joiSubscription),
    subscription: joiSubscription,
    title: Joi.string().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(),
    body: Joi.string().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(),
    icon: Joi.string().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH),
  };

  return Joi.validate(args, joiSchema); // { error, value }
};

module.exports = {
  Subscription,
  validatePush,
};
