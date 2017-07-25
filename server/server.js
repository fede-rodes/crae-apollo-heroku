import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import schema from './src/schema';

// Log env vars
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.PORT', process.env.PORT);

// Initialize Express server. Port is set by Heroku when the app is deployed or
// when running locally using the 'heroku local' command.
const server = express();
server.set('port', (process.env.PORT || 3001));

// Enable the server to receive requests from the React app when running locally.
const isNotProduction = process.env.NODE_ENV !== 'production';
if (isNotProduction) {
  server.use('*', cors({ origin: 'http://localhost:3000' }));
}

// Serve static files from the React app
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
server.use(staticFiles);

// Respond with "server is running" when a GET request is made to the index page.
server.get('/', (req, res) => {
  res.send('server is running');
});

server.use(
  '/graphql',
  bodyParser.json(), // middleware: parses incoming requests into JSON format.
  graphqlExpress({ schema })
);

server.use(
  '/graphiql',
  graphiqlExpress({ endpointURL: '/graphql' })
);

// The "catchall" handler: for any request that doesn't match one above, send
// back React's index.html file.
server.use('*', staticFiles);

server.listen(server.get('port'), () => {
  console.log(`Listening on ${server.get('port')}`);
});
