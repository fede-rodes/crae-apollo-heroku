const { Subscription } = require('../../../../models');

const subscriptions = async (root, args, context) => {
  const { userId } = args;
  const { usr } = context;

  // TODO: use middleware
  if (!usr || !usr._id) {
    return null;
  }

  // Query subscriptions associated to current user
  try {
    // TODO: do we need exec()?
    const subs = await Subscription.find({ userId }).exec();
    console.log('subs', subs);
    return subs;
  } catch (exc) {
    console.log(exc);
    return [];
  }
};

module.exports = subscriptions;

