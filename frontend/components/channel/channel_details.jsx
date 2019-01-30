import React from 'react';
import { requestChannelUsers } from '../../actions/channel_actions';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';

class ChannelDetails extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // let channelId = this.props.match.params.channelId;
    // this.props.requestUsers(channelId);
  }

  render() {

    return (
      <div className="channel-info-background">
        <div className="channel-info-child" onClick={e => e.stopPropagation()}>
          <div>CHANNEL DETAILS</div>
          <p onClick={() => this.props.closeModal()}>X</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ session, entities: { users, channels } }, ownProps) => {
  // let channelId = ownProps.match.params.channelId;
  // let channel = channels[channelId];
  return ({
    
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    requestUsers: (id) => dispatch(requestChannelUsers(id)),
    closeModal: () => dispatch(closeModal()),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetails);