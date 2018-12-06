const webPush = require('./config');
// const { validatePush } = require('../../models/subscription');

//------------------------------------------------------------------------------
// METHOD:
//------------------------------------------------------------------------------
const send = async ({
  subscription,
  title,
  body,
  icon,
}) => {
  // console.log('\n\npushAPI.send args', args);
  /* const { error } = validatePush({ subscription, title, body, icon });
  if (error) {
    console.log('\n\nerror', error);
    return { error: error.details[0].message };
  } */

  console.log(
    '\n******Send Push Notification******',
    '\nsubscription', subscription,
    '\ntitle', title,
    '\nbody', body,
    '\nicon', icon,
  );

  const payload = JSON.stringify({ title, body, icon });

  const options = {
    TTL: 60, // time to live in seconds
  };

  try {
    await webPush.sendNotification(subscription, payload, options);
    console.log('\nPUSH NOTIFICATION DELIVERED SUCCESSFULLY!');
  } catch (exc) {
    console.log(`\nError when trying to deliver PUSH NOTIFICATION for ${subscription.endpoint}`, exc);
    throw new Error(exc);
  }
};

module.exports = send;
