const typeDefs = `
  type Keys {
    auth: String!
    p256dh: String!
  }

  type Subscription {
    _id: ID!
    createdAt: Date!
    userId: ID!
    endpoint: String!
    keys: Keys!
  }

  input KeysInput {
    auth: String!
    p256dh: String!
  }

  input SubscriptionInput {
    endpoint: String!
    keys: KeysInput!
  }

  type Query {
    subscriptions(userId: ID!): [Subscription]
  }

  type Mutation {
    saveSubscription(subscription: SubscriptionInput!): Response
    deleteSubscription(endpoint: String!): Response
    sendPushNotification: Response
  }
`;

module.exports = typeDefs;
