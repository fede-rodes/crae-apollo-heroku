const resolvers = {
  Mutation: {
    login: () => ({ _id: '123', token: 'xyz123' }),
  },
};

export default resolvers;
