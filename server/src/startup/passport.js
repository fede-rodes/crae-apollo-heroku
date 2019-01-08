const passport = require('passport');
const { Strategy } = require('passport-facebook');
const { User } = require('../models');

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env;

/**
 * @see {@link https://medium.com/hyphe/token-based-authentication-in-node-6e8731bfd7f2}
 */

module.exports = (app) => {
  // Configure the Facebook strategy for use by Passport.
  const conf = {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: `http://localhost:${app.get('port')}/auth/facebook/callback`,
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email'],
  };

  async function authCb(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record. In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    console.log('PROFILE', profile);
    try {
      const user = await User.findOrCreate({ profile });
      return cb(null, user);
    } catch (exc) {
      console.log('EXCEPTION WHEN CREATING USER', exc);
      return cb(exc, false);
    }
    // return cb(null, profile);
  }
  // OAuth 2.0-based strategies require a `verify` function which receives the
  // credential (`accessToken`) for accessing the Facebook API on the user's
  // behalf, along with the user's profile.  The function must invoke `cb`
  // with a user object, which will be set at `req.user` in route handlers after
  // authentication.
  app.use(passport.initialize());
  passport.use(new Strategy(conf, authCb));

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
  //   (req, res) => {
  //     // Successful authentication, redirect home.
  //     res.redirect('/');
  //   });

  const serialize = (req, res, next) => {
    console.log('SERIALIZE USER');
    req.user = {
      _id: req.user._id,
    };
    next();
  };

  const genToken = async (req, res, next) => {
    console.log('GEN AUTH TOKEN');
    const user = await User.findById({ _id: req.user._id });
    req.token = user.genAuthToken();
    next();
  };

  const respond = (req, res) => {
    console.log('RESPOND');
    // res.json({
    //   user: req.user,
    //   token: req.token,
    // });
    // TODO: replace port with app.get('port') in production OR remove domain and port
    res.status(200).redirect(`http://localhost:${app.get('port')}/auth/facebook/success/${req.token}`);
    // res.redirect('/');
  };

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/auth/facebook/fail' }),
    serialize,
    genToken,
    respond,
  );
};
