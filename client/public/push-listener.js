/* eslint-disable */
// Push event listener aux function:
function showNotification (event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  console.log('\n\nevent.data', event.data);
  var data = event && event.data && event.data.json() || null;

  var title = data && data.title || 'Push notification demo';
  var options = {
    body: data && data.body || 'Push message no payload',
    icon: data && data.icon || null,
    // tag: 'demo',
    // icon: '/img/apple-touch-icon.png',
    // badge: '/img/apple-touch-icon.png',
    // Custom actions buttons
    /* actions: [
      { action: 'yes', title: 'I ♥ this app!' },
      { action: 'no', title: 'I don\'t like this app' },
    ], */
  };

  event.waitUntil(
    self.registration.showNotification(title, options),
  );
};

// When to Show Notifications:
// If the user is already using your application there is no need to display a
// notification. You can manage this logic on the server, but it is easier to
// do it in the push handler inside your service worker:
// the 'clients' global in the service worker lists all of the active push
// clients on this machine. If there are no clients active, the user must be
// in another app. We should show a notification in this case. If there are
// active clients it means that the user has your site open in one or more
// windows. The best practice is to relay the message to each of those windows.
// Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
// Source: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log('[Service Worker] Push had this data:', event && event.data);

  // Comment out the following line in case you only want to display
  // notifications when the app isn't open
  showNotification(event);

  clients.matchAll()
    .then((client) => {
      if (client.length === 0) {
        // Un-comment the following line in case you only want to display
        // notifications when the app isn't open
        // showNotification(event);
      } else {
        // Send a message to the page to update the UI
        console.log('Application is already open!');
      }
    });
});

// The code below looks for the first window with 'visibilityState' set to
// 'visible'. If one is found it navigates that client to the correct URL and
// focuses the window. If a window that suits our needs is not found, it
// opens a new window.
// Source: https://developers.google.com/web/fundamentals/codelabs/push-notifications/
// Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');

  var appUrl = new URL('/', location).href;

  // Listen to custom action buttons in push notification
  /* if (event.action === 'yes') {
    console.log('I ♥ this app!');
  } else if (event.action === 'no') {
    console.log('I don\'t like this app');
  } */

  event.waitUntil(
    clients.matchAll()
      .then((clientsList) => {
        var client = clientsList.find(function(c) {
          return c.visibilityState === 'visible';
        });

        if (client !== undefined) {
          client.navigate(appUrl);
          client.focus();
        } else {
          // There are no visible windows. Open one.
          clients.openWindow(appUrl);
        }
      })
    ,
  );

  // Close all notifications (thisincludes any other notifications from the
  // same origin)
  // Source: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
  self.registration.getNotifications()
    .then(function (notifications) {
      notifications.forEach(function (notification) { notification.close(); });
    });
});