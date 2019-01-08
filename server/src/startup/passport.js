const passport = require('passport');
const { Strategy } = require('passport-facebook');
const jwt = require('express-jwt');

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;

module.exports = (app) => {
  // Configure the Facebook strategy for use by Passport.
  const conf = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `http://localhost:${app.get('port')}/auth/facebook/callback`,
    enableProof: true,
    // profileFields: ['id', 'displayName', 'photos', 'email']
  };

  function authCb(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record. In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    console.log('PROFILE', profile);
    return cb(null, profile);
  }
  // OAuth 2.0-based strategies require a `verify` function which receives the
  // credential (`accessToken`) for accessing the Facebook API on the user's
  // behalf, along with the user's profile.  The function must invoke `cb`
  // with a user object, which will be set at `req.user` in route handlers after
  // authentication.
  app.use(passport.initialize());
  passport.use(new Strategy(conf, authCb));

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
};
