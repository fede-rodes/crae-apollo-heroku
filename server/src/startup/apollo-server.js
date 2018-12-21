const { ApolloServer } = require('apollo-server-express');
const jwt = require('express-jwt');
const schema = require('../graphql/exec-schema');

const { JWT_PRIVATE_KEY } = process.env;

module.exports = (app) => {
  // See: https://blog.pusher.com/handling-authentication-in-graphql/
  // Decode jwt and get user data (_id). Then reset req.user to decoded data.
  const authMiddleware = jwt({
    secret: JWT_PRIVATE_KEY,
    credentialsRequired: false, // allow non-authenticated requests to pass through the middleware
  });

  app.use(authMiddleware);

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      usr: req.user, // user data is decoded on the authMiddleware
    }),
    // TODO" log errors to winston
    playground: {
      settings: {
        'editor.theme': 'light',
      },
    },
  });

  server.applyMiddleware({ app, path: '/graphql' });
};
