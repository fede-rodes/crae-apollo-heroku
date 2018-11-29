import gql from 'graphql-tag';

const sendPasscodeMutation = gql`
  mutation sendPasscode($email: String!) {
    sendPasscode(email: $email) {
      _id
    }
  }
`;

export default sendPasscodeMutation;
