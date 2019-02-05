import { requestChannel } from '../../actions/channel_actions';
import { requestChannelMessages, createMessage } from '../../actions/message_actions';
import { connect } from 'react-redux';
import Channel from './channel';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  let channelId = ownProps.match.params.channelId;
  let channel = state.entities.channels[channelId] || { memberIds: [], messageIds: [] };
  let allMessages = [];
  channel.messageIds.forEach(id => {
    if (state.entities.messages[id]) {
      allMessages.push(state.entities.messages[id]);
    }
  })

  let allMembers = [];
  channel.memberIds.forEach(id => {
    if (state.entities.users[id]) {
      allMembers.push(state.entities.users[id]);
    }
  })

  return {
    currentUser: state.entities.users[state.session.id],
    channel: channel,
    messages: allMessages,
    members: allMembers, 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestChannel: (id) => dispatch(requestChannel(id)),
    requestMessages: (id) => dispatch(requestChannelMessages(id)),
    createMessage: (message) => dispatch(createMessage(message)),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);