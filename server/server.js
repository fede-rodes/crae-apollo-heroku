import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import schema from './src/schema';

// Log env vars
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.PORT', process.env.PORT);

const server = express();

// Port is set by heroku when the app is deployed or when running locally using
// the 'heroku local' command.
server.set('port', (process.env.PORT || 3001));

const isNotProduction = process.env.NODE_ENV !== 'production';

// Enable the server to receive requests from the create-react-app when running
// locally.
if (isNotProduction) {
  server.use('*', cors({ origin: 'http://localhost:3000' }));
}

// Serve create-react-app as a static asset when possible.
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

server.listen(server.get('port'), () => {
  console.log(`Listening on ${server.get('port')}`);
});
