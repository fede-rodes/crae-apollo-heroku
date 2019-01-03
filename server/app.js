const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//------------------------------------------------------------------------------
// MAKE SURE ENV VARS ARE SET
//------------------------------------------------------------------------------
require('./src/startup/env-vars');

//------------------------------------------------------------------------------
// CONFIG VALIDATION LIBS
//------------------------------------------------------------------------------
require('./src/startup/validation');

//------------------------------------------------------------------------------
// CONFIG LOGGER & CATCH UNCAUGHT EXCEPTIONS
//------------------------------------------------------------------------------
require('./src/startup/logger');

//------------------------------------------------------------------------------
// INIT EXPRESS SERVER
//------------------------------------------------------------------------------
// Initialize Express server. Port is set by Heroku when the app is deployed or
// when running locally using the 'heroku local' command.
const { PORT } = process.env;
console.log('\nprocess.env.PORT', PORT);

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
  // Enable the app to receive requests from the React app and Storybook when running locally.
  app.use('*', cors({ origin: ['http://localhost:3000', 'http://localhost:9009'] }));
  app.use(morgan('tiny'));
}

//------------------------------------------------------------------------------
// MONGO CONNECTION
//------------------------------------------------------------------------------
require('./src/startup/db');

//------------------------------------------------------------------------------
// SERVER STATIC FILE
//------------------------------------------------------------------------------
// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

//------------------------------------------------------------------------------
// APOLLO SERVER
//------------------------------------------------------------------------------
require('./src/startup/apollo-server')(app);

//------------------------------------------------------------------------------
// ERROR HANDLING MIDDLEWARE
//------------------------------------------------------------------------------
app.use(require('./src/middlewares/error'));

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
