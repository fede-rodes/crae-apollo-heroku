const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const schema = require('./src/graphql/exec-schema');
const initDB = require('./src/init-db');

//------------------------------------------------------------------------------
// LOGS
//------------------------------------------------------------------------------
// Log env vars
const { NODE_ENV, PORT, MONGO_URL } = process.env;
const isNotProduction = NODE_ENV !== 'production';

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Enable the app to receive requests from the React app when running locally.
if (isNotProduction) {
  app.use('*', cors({ origin: 'http://localhost:3000' }));
}

//------------------------------------------------------------------------------
// MONGO CONNECTION
//------------------------------------------------------------------------------
mongoose.connect(MONGO_URL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
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
// ROUTES
//------------------------------------------------------------------------------
const server = new ApolloServer({
  schema,
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});
server.applyMiddleware({ app, path: '/graphql' });

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
