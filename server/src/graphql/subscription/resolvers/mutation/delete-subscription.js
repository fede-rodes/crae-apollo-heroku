const { Subscription } = require('../../../../models');
// import utils from '../../utils';

// TODO: use try-catch or find a lib that implements this
//------------------------------------------------------------------------------
/**
* @summary Remove subscription from user's record.
*/
const deleteSubscription = async (root, args, context) => {
  const { endpoint } = args;
  const { usr } = context;

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  const sub = await Subscription.findOne({ userId: usr._id, endpoint }).exec();
  if (!sub) {
    return null;
  }

  try {
    await Subscription.deleteOne({ _id: sub._id });
    return sub;
  } catch (exc) {
    console.error(exc);
    throw new Error(exc);
  }
};
//------------------------------------------------------------------------------

module.exports = deleteSubscription;
