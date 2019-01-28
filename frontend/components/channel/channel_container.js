import { requestChannel } from '../../actions/channel_actions';
import { requestChannelMessages, createMessage } from '../../actions/message_actions';
import { connect } from 'react-redux';
import Channel from './channel';

const mapStateToProps = ({ session, entities: { users, channels, messages } }, ownProps) => {
  let channelId = ownProps.match.params.channelId;
  let channel = channels[channelId] || {};
  let allMessages = Object.values(messages);
  return {
    currentUser: users[session.id],
    channel: channel,
    messages: allMessages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestChannel: (id) => dispatch(requestChannel(id)),
    requestMessages: (id) => dispatch(requestChannelMessages(id)),
    createMessage: (message) => dispatch(createMessage(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);