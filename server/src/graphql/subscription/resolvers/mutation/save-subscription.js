const { Subscription } = require('../../../../models');

//------------------------------------------------------------------------------
const saveSubscription = async (root, args, ctx) => {
  const { subscription } = args;
  const { endpoint, keys } = subscription;
  const { usr } = ctx;

  // User logged in state validation was moved to Subscription model
  const newSub = await Subscription.createSubscription({ user: usr, endpoint, keys });

  // Return the recently created subscription
  return newSub;
};
//------------------------------------------------------------------------------

module.exports = saveSubscription;
