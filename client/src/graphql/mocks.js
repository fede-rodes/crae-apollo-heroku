const resolvers = {
  // TODO: check Query resolver. Is it even being added via mock?
  Query: {
    user: () => {
      console.log('MOCK USER QUERY BEING CALLED');
      return ({
        _id: '123',
        createdAt: new Date(),
        email: 'example@email.com',
      });
    },
  },
  Mutation: {
    login: (parent, { email, passcode }) => {
      if (email && email === 'email@example.com' && passcode && passcode === 123456) {
        return { _id: '123', token: 'xyz123' };
      }
      throw new Error();
    },
  },
};

export default resolvers;
