const mongoose = require('mongoose');
const Joi = require('joi');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 155;
//------------------------------------------------------------------------------
// MONGOOSE:
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

const Subscription = mongoose.model('Subscription', schema);

//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const validPush = (args) => {
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
  validPush,
};
