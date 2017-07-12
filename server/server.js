import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cors from 'cors';
import schema from './src/schema';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('*', cors({ origin: 'http://localhost:3000' }));

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

server.set('port', (process.env.PORT || 3001))
server.listen(server.get('port'), () => {
  console.log(`Listening on ${server.get('port')}`)
})
