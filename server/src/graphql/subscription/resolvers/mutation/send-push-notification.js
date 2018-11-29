const pick = require('lodash/pick');
const { Subscription } = require('../../../../models');
const pushAPI = require('../../../../services/push');
const asyncForEach = require('../../../../utils/async-for-each');
// import utils from '../../utils';

//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
/**
* @summary Send push notification to all subscribed users.
*/
const sendPushNotification = async (root, args, context) => {
  // const { title, body, icon } = args;
  const { usr } = context;
  console.log('\nSend push notification');

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  // Gather all subscriptions from all subscribed users
  const subs = await Subscription.find({}).select({ endpoint: 1, keys: 1 }).exec();
  console.log('\nsubs', subs);

  // Send the messages
  asyncForEach(subs, async (subscription) => {
    try {
      await pushAPI.send({
        subscription: pick(subscription, ['endpoint', 'keys']),
        title: 'Hey',
        body: 'This is a push notification!',
        // icon,
      });
    } catch (exc) {
      console.log(exc);
      // This is probably an old subscription, remove it
      await Subscription.deleteOne({ userId: usr._id, endpoint: subscription.endpoint }).exec();
    }
  });

  return subs;
};
//------------------------------------------------------------------------------

module.exports = sendPushNotification;


/*
const pick = require('lodash/pick');
const { Subscription } = require('../../../../models');
const pushAPI = require('../../../../services/push');
const asyncForEach = require('../../../../utils/async-for-each');
// import utils from '../../utils';

//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
/**
* @summary Send push notification to all subscribed users.
/
const sendPushNotification = async (root, args, context) => {
  // const { title, body, icon } = args;
  const { usr } = context;
  console.log('\nSend push notification');

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  // Gather all subscriptions from all subscribed users
  let subscriptions = [];
  try {
    subscriptions = await Subscription.find({}).select({ endpoint: 1, keys: 1 }).exec();
  } catch (exc) {
    return { status: 500 }; // TODO: throw
  }
  console.log('\nsubscriptions', subscriptions);

  // Send the messages
  asyncForEach(subscriptions, async (subscription) => {
    let response;
    try {
      response = await pushAPI.send({
        subscription: pick(subscription, ['endpoint', 'keys']),
        title: 'Welcome',
        body: 'Thank you for enabling push notifications',
        // icon,
      });
    } catch (exc) {
      console.log(exc); // TODO: throw
    }

    // TODO: move this code to the catch block
    if (response && response.error) {
      // This is probably an old subscription, remove it
      await Subscription.deleteOne({ userId: usr._id, endpoint: subscription.endpoint });
    }
  });

  return { status: 200 };
};
//------------------------------------------------------------------------------

module.exports = sendPushNotification;

*/