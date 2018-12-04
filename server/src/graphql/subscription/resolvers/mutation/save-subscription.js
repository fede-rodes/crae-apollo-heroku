const { Subscription } = require('../../../../models');

//------------------------------------------------------------------------------
/**
* @summary Save subscription into user's record.
*/
const saveSubscription = async (root, args, ctx) => {
  const { subscription } = args;
  const { endpoint, keys } = subscription;
  const { usr } = ctx;

  // User logged in state validation was moved to Subscription model
  const newSub = await Subscription.createSubscription({ user: usr, endpoint, keys });
  return newSub;
};
//------------------------------------------------------------------------------

module.exports = saveSubscription;
