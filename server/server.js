import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import schema from './src/schema';

const server = express();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.PORT', process.env.PORT);
const isNotProduction = process.env.NODE_ENV !== 'production';
const clientPort = isNotProduction ? 3000 : (process.env.PORT || 5000);
const serverPort = isNotProduction ? 3001 : (process.env.PORT || 5000);
console.log('clientPort', clientPort);
console.log('serverPort', serverPort);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

if (isNotProduction) {
  server.use('*', cors({ origin: `http://localhost:${clientPort}` }));
}


const router = express.Router()

const staticFiles = express.static(path.join(__dirname, '../../client/build'))

server.use(staticFiles)

router.get('/cities', (req, res) => {
  const cities = [
    {name: 'New York City', population: 8175133},
    {name: 'Los Angeles',   population: 3792621},
    {name: 'Chicago',       population: 2695598}
  ]
  res.json(cities)
});

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.use(router)

server.use('/*', staticFiles)

server.set('port', serverPort)
server.listen(server.get('port'), () => {
  console.log(`Listening on ${server.get('port')}`)
})
