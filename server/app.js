require('./src/check-env-vars');
require('express-async-errors');
require('./src/services/winston/config'); // logger
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const Joi = require('joi');
const jwt = require('express-jwt');
const { logger } = require('./src/services/winston/config');
const schema = require('./src/graphql/exec-schema');
const initDB = require('./src/init-db');
const errorHandling = require('./src/middlewares/error');
const { User } = require('./src/models');

// Extend Joi validator by adding objectId type
Joi.objectId = require('joi-objectid')(Joi);

//------------------------------------------------------------------------------
// UNCAUGHT EXCEPTIONS
//------------------------------------------------------------------------------
const handleException = async (exc) => {
  await logger.error(exc.message || 'No msg field', console.log);
  // Something bad happened, kill the process and then restart fresh
  // TODO: use other winston transports
  process.exit(1);
};

process.on('uncaughtException', handleException);
process.on('unhandledRejection', handleException);


// const p = Promise.reject(new Error('Ive been rejected :('));
// p.then(() => { console.log('done'); });

//------------------------------------------------------------------------------
// ENV VARS
//------------------------------------------------------------------------------
// Log env vars
const {
  NODE_ENV,
  PORT,
  MONGO_URL,
  JWT_PRIVATE_KEY,
} = process.env;

console.log(
  '\nprocess.env.NODE_ENV', NODE_ENV,
  '\nprocess.env.PORT', PORT,
  '\nprocess.env.MONGO_URL', MONGO_URL,
);

//------------------------------------------------------------------------------
// INIT EXPRESS SERVER
//------------------------------------------------------------------------------
// Initialize Express server. Port is set by Heroku when the app is deployed or
// when running locally using the 'heroku local' command.
const app = express();
app.set('port', (PORT || 3001));

//------------------------------------------------------------------------------
// MIDDLEWARES
//------------------------------------------------------------------------------
// Apply middleware to parse incoming body requests into JSON format.
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (app.get('env') === 'development') {
  // Enable the app to receive requests from the React app when running locally.
  app.use('*', cors({ origin: 'http://localhost:3000' }));
  app.use(morgan('tiny'));
}

//------------------------------------------------------------------------------
// MONGO CONNECTION
//------------------------------------------------------------------------------
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, `Database connected to ${MONGO_URL}`));

// Clean and populate DB
initDB();

//------------------------------------------------------------------------------
// SERVER STATIC FILE
//------------------------------------------------------------------------------
// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

//------------------------------------------------------------------------------
// APOLLO SERVER
//------------------------------------------------------------------------------
// See: https://blog.pusher.com/handling-authentication-in-graphql/
// Decode jwt and get user data (_id, version). Then reset req.user to decoded data.
const authMiddleware = jwt({
  secret: JWT_PRIVATE_KEY,
  credentialsRequired: false, // allow non-authenticated requests to pass through the middleware
});

const queryUser = async (req, res, next) => {
  if (req.user) {
    try {
      req.user = await User.findOne({ _id: req.user._id, version: req.user.version }).exec();
    } catch (exc) {
      // Invalid/expired token
      req.user = null;
    }
  }
  next();
};

app.use(authMiddleware);
app.use(queryUser);

const { ObjectId } = mongoose.Types;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    usr: req.user, // user data is decoded on the authMiddleware
    // usr: await getUser(req),
    // usr: { _id: '5b7be6b5f799de5c5ce126a4' },
  }),
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});

server.applyMiddleware({ app, path: '/graphql' });

//------------------------------------------------------------------------------
// ROUTES
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// ERROR HANDLING MIDDLEWARE
//------------------------------------------------------------------------------
app.use(errorHandling);

//------------------------------------------------------------------------------
// CATCH ALL
//------------------------------------------------------------------------------
// The "catchall" handler: for any request that doesn't match one above, send
// back React's index.html file.
app.use('*', staticFiles);

//------------------------------------------------------------------------------
// LISTEN
//------------------------------------------------------------------------------
app.listen(app.get('port'), () => {
  console.log(`Apollo server listening on http://localhost:${app.get('port')}/graphql`);
});
