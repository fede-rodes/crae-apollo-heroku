const express = require('express');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');
const schema = require('./src/graphql/exec-schema');
const login = require('./src/routes/login');
const initDB = require('./src/init-db');

// Extend Joi validator by adding objectId type
Joi.objectId = require('joi-objectid')(Joi);

//------------------------------------------------------------------------------
// LOGS
//------------------------------------------------------------------------------
// Log env vars
const {
  NODE_ENV,
  PORT,
  MONGO_URL,
  JWT_PRIVATE_KEY,
} = process.env;

const isNotProduction = NODE_ENV !== 'production';

console.log(
  '\nprocess.env.NODE_ENV', NODE_ENV,
  '\nprocess.env.PORT', PORT,
  '\nprocess.env.MONGO_URL', MONGO_URL,
);

if (!JWT_PRIVATE_KEY || JWT_PRIVATE_KEY.length === 0) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY env var missing');
  process.exit(1);
}

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
// Enable the app to receive requests from the React app when running locally.
if (isNotProduction) {
  app.use('*', cors({ origin: 'http://localhost:3000' }));
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
const getUser = async (req) => {
  const token = req && req.headers && req.headers.authorization;
  // console.log('req.headers', req && req.headers);
  // console.log('req.headers', req && req.headers && req.headers.authorization);

  if (!token) {
    return null;
  }

  try {
    const json = await jwt.verify(token, JWT_PRIVATE_KEY);
    return pick(json, '_id');
  } catch (exc) {
    console.error('Not authorized');
    return null;
  }
};

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req),
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
app.use('/api/login', login);


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
