const saveSubscription = require('./save-subscription');
const deleteSubscription = require('./delete-subscription');
const sendPushNotification = require('./send-push-notification');

const Mutation = {
  saveSubscription,
  deleteSubscription,
  sendPushNotification,
};

module.exports = Mutation;
