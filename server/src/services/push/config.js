const webPush = require('web-push');

/**
 * @see {@link https://developers.google.com/web/fundamentals/push-notifications/sending-messages-with-web-push-libraries}
 * @see {@link https://www.npmjs.com/package/web-push}
 */

const {
  GCM_PRIVATE_KEY,
  VAPID_SUBJECT,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
} = process.env;

// Set web-push keys
webPush.setGCMAPIKey(GCM_PRIVATE_KEY);
webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

module.exports = webPush;
