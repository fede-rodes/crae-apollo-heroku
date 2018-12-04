const pick = require('lodash/pick');
const { Subscription } = require('../../../../models');
const pushAPI = require('../../../../services/push');
const asyncForEach = require('../../../../utils/async-for-each');

//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
/**
* @summary Send push notification to all subscribed users.
*/
const sendPushNotification = async (root, args, ctx) => {
  const { title = 'Hey!', body = 'This is a push notification' } = args; // TODO: add (default) icon
  const { usr } = ctx;
  console.log('\nSend push notification');

  // Gather all subscriptions from all subscribed users
  // User logged in state validation was moved to Subscription model
  const subs = await Subscription.findAll({ user: usr });

  // Send the messages
  asyncForEach(subs, async (sub) => {
    try {
      await pushAPI.send({
        subscription: pick(sub, ['endpoint', 'keys']),
        title,
        body,
        // icon,
      });
    } catch (exc) {
      console.log(exc);
      // This is probably an old subscription, remove it
      // await Subscription.deleteOne({ userId: usr._id, endpoint: sub.endpoint }).exec();
      await sub.delete();
    }
  });

  return subs;
};
//------------------------------------------------------------------------------

module.exports = sendPushNotification;
