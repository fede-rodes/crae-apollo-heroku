import gql from 'graphql-tag';

const sendPushNotificationMutation = gql`
  mutation {
    sendPushNotification {
      status
    }
  }
`;

export default sendPushNotificationMutation;
