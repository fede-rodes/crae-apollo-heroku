const { Subscription } = require('../../../../models');

//------------------------------------------------------------------------------
/**
* @summary Remove subscription from user's record.
*/
const deleteSubscription = async (root, args, ctx) => {
  const { endpoint } = args;
  const { usr } = ctx;

  // User logged in state validation was moved to Subscription model
  const sub = await Subscription.findByEndpoint({ user: usr, endpoint });
  if (!sub) {
    return null;
  }

  // Copy subcription before delete
  const subCopy = Object.assign({}, sub);
  await sub.delete();

  return subCopy;
};
//------------------------------------------------------------------------------

module.exports = deleteSubscription;


/*
const { Subscription } = require('../../../../models');
// import utils from '../../utils';

// TODO: use try-catch or find a lib that implements this
//------------------------------------------------------------------------------
/**
* @summary Remove subscription from user's record.
/
const deleteSubscription = async (root, args, ctx) => {
  const { endpoint } = args;
  const { usr } = ctx;

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  // TODO: hide implementation details
  const sub = await Subscription.findOne({ userId: usr._id, endpoint }).exec();
  if (!sub) {
    return null;
  }

  // TODO: hide implementation details
  await Subscription.deleteOne({ _id: sub._id });
  return sub;
};
//------------------------------------------------------------------------------

module.exports = deleteSubscription;

*/