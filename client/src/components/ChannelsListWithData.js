import React from 'react';
import { gql, graphql } from 'react-apollo';

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="channelsList">
      {channels.map(ch => <div key={ch.id} className="channel">{ch.name}</div>)}
    </div>
  );
};

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

export default graphql(channelsListQuery)(ChannelsList);
