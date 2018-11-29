import gql from 'graphql-tag';

const loginMutation = gql`
  mutation login($email: String!, $passcode: Int!) {
    login(email: $email, passcode: $passcode) {
      _id
      token
    }
  }
`;

export default loginMutation;
