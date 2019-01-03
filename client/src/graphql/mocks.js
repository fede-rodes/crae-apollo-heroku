const resolvers = {
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
