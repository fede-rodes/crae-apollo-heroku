const { Subscription } = require('../../../../models');

//------------------------------------------------------------------------------
// QUERY:
//------------------------------------------------------------------------------
/**
* @summary Query subscriptions associated to current user
*/
// TODO: are we using this query?
const subscriptions = async (root, args, context) => {
  const { userId } = args;
  const { usr } = context;

  // TODO: use middleware
  if (!usr || !usr._id) {
    return [];
  }

  try {
    // TODO: do we need exec()?
    const subs = await Subscription.find({ userId }).exec();
    console.log('subs', subs);
    return subs;
  } catch (exc) {
    console.log(exc);
    throw new Error(exc);
  }
};
//------------------------------------------------------------------------------

module.exports = subscriptions;
