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
  const { title = 'Hey!', body = 'This is a push notification' } = args; // TODO: add (default) icon
  const { usr } = context;
  console.log('\nSend push notification');

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  // Gather all subscriptions from all subscribed users
  const subs = await Subscription.find({}).select({ endpoint: 1, keys: 1 }).exec();
  console.log('\nsubs', subs);

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
      await Subscription.deleteOne({ userId: usr._id, endpoint: sub.endpoint }).exec();
    }
  });

  return subs;
};
//------------------------------------------------------------------------------

module.exports = sendPushNotification;
