const Joi = require('joi');
const webPush = require('./config');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 155;
//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const validateArgs = (args) => {
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
//------------------------------------------------------------------------------
// METHOD:
//------------------------------------------------------------------------------
const send = async (args) => {
  console.log('\n\npushAPI.send args', args);
  /* const { error } = validateArgs(args);
  if (error) {
    console.log('\n\nerror', error);
    return { error: error.details[0].message };
  } */

  const {
    subscription,
    title,
    body,
    icon,
  } = args;

  console.log(
    '\n******Send Push Notification******',
    '\nsubscription', subscription,
    '\ntitle', title,
    '\nbody', body,
    '\nicon', icon,
  );

  const payload = JSON.stringify({ title, body, icon });

  const options = {
    TTL: 60, // time to live in seconds
  };

  try {
    await webPush.sendNotification(subscription, payload, options);
    console.log('\nPUSH NOTIFICATION DELIVERED SUCCESSFULLY!');
    return { error: null };
  } catch (exc) {
    console.log(`\nError when trying to deliver PUSH NOTIFICATION for ${subscription.endpoint}`, exc);
    return { error: exc };
  }
};

module.exports = send;
