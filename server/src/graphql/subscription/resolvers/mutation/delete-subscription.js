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

  try {
    await Subscription.deleteOne({ userId: usr._id, endpoint });
    return { status: 200 };
  } catch (exc) {
    console.error(exc);
    return { status: 500 };
  }
};
//------------------------------------------------------------------------------

module.exports = deleteSubscription;
