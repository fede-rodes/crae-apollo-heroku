const { Subscription } = require('../../../../models');

//------------------------------------------------------------------------------
const deleteSubscription = async (root, args, ctx) => {
  const { endpoint } = args;
  const { usr } = ctx;

  // User logged in state validation was moved to Subscription model
  const sub = await Subscription.deleteByEndpoint({ user: usr, endpoint });

  // Return the deleted subscription
  return sub;
};
//------------------------------------------------------------------------------

module.exports = deleteSubscription;
