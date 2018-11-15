import gql from 'graphql-tag';

const signupMutation = gql`
  mutation signup($email: String!) {
    signup(email: $email) {
      _id
      createdAt
      email
    }
  }
`;

export default signupMutation;
