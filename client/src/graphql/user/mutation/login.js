import gql from 'graphql-tag';

const loginMutation = gql`
  mutation login($email: String!, $passCode: Int!) {
    login(email: $email, passCode: $passCode) {
      _id
      token
    }
  }
`;

export default loginMutation;
