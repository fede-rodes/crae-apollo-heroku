const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const path = require('path');
const cors = require('cors');
const schema = require('./src/graphql/exec-schema');
const initDB = require('./src/init-db');

//------------------------------------------------------------------------------
// LOGS
//------------------------------------------------------------------------------
// Log env vars
const { NODE_ENV, PORT, MONGO_URL } = process.env;

console.log(
  'process.env.NODE_ENV', NODE_ENV,
  'process.env.PORT', PORT,
  'process.env.MONGO_URL', MONGO_URL,
);
//------------------------------------------------------------------------------
// INIT EXPRESS SERVER
//------------------------------------------------------------------------------
// Initialize Express server. Port is set by Heroku when the app is deployed or
// when running locally using the 'heroku local' command.
const server = express();
server.set('port', (process.env.PORT || 3001));

//------------------------------------------------------------------------------
// MIDDLEWARES
//------------------------------------------------------------------------------
// Apply middleware to parse incoming body requests into JSON format.
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//------------------------------------------------------------------------------
// MONGO CONNECTION
//------------------------------------------------------------------------------
mongoose.connect(MONGO_URL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, `Database connected to ${MONGO_URL}`));

// Populate DB
initDB();

//------------------------------------------------------------------------------
// ENABLE CORS ON DEV MODE
//------------------------------------------------------------------------------
// Enable the server to receive requests from the React app when running locally.
const isNotProduction = NODE_ENV !== 'production';
if (isNotProduction) {
  server.use('*', cors({ origin: 'http://localhost:3000' }));
}

//------------------------------------------------------------------------------
// SERVER STATIC FILE
//------------------------------------------------------------------------------
// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
server.use(staticFiles);

//------------------------------------------------------------------------------
// GRAPHQL ENDPOINT
//------------------------------------------------------------------------------
server.use(
  '/graphql',
  // bodyParser.json(), // middleware: parses incoming requests into JSON format.
  graphqlExpress({ schema }),
);

//------------------------------------------------------------------------------
// GRAPHIQL ENDPOINT
//------------------------------------------------------------------------------
server.use(
  '/graphiql',
  graphiqlExpress({ endpointURL: '/graphql' }),
);

//------------------------------------------------------------------------------
// CATCH ALL
//------------------------------------------------------------------------------
// The "catchall" handler: for any request that doesn't match one above, send
// back React's index.html file.
server.use('*', staticFiles);

//------------------------------------------------------------------------------
// LISTEN
//------------------------------------------------------------------------------
server.listen(server.get('port'), () => {
  console.log(`Listening on ${server.get('port')}`);
});
