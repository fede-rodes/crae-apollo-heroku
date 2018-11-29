const { Subscription } = require('../../../../models');
// import utils from '../../utils';

//------------------------------------------------------------------------------
/**
* @summary Save subscription into user's record.
*/
const saveSubscription = async (root, args, context) => {
  const { subscription } = args;
  const { endpoint, keys } = subscription;
  const { usr } = context;

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  try {
    const sub = new Subscription({ userId: usr._id, endpoint, keys });
    await sub.save();
    console.log('sub', sub);
    return sub;
  } catch (exc) {
    console.error(exc);
    throw new Error(exc);
  }
};
//------------------------------------------------------------------------------

module.exports = saveSubscription;
