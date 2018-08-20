import gql from 'graphql-tag';

const sendPassCodeMutation = gql`
  mutation sendPassCode($email: String!) {
    sendPassCode(email: $email) {
      status
    }
  }
`;

export default sendPassCodeMutation;
