import React from "react";
import { connect } from "react-redux";
import { updateChannel } from '../../actions/channel_actions';
import { closeModal } from '../../actions/modal_actions';
import Toggle from 'react-toggle';
import { withRouter } from 'react-router-dom';

class ChannelEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.channel.title,
      description: this.props.channel.description,
      is_private: this.props.channel.private,
      id: this.props.channel.id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    if (e.target.disabled) {
      return;
    }
    this.props.closeModal();
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.props.updateChannel(channel);
  }

  changeStatus() {
    this.setState({
      is_private: !(this.state.is_private)
    })
  }

  render() {
    let statusMessage = <span>Public - Anyone in your workspace can view and join this channel.</span>
    let status = "Public";
    if (this.state.is_private) {
      statusMessage = <span>Private - This channel can only be joined or viewed by invite</span>;
      status = "Private";
    }

    return (
      <div className="modal-background">
        <div onClick={() => this.props.closeModal()} className="cancel-modal">
          <p></p>
          <p>esc</p>
        </div>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          <div className="new-channel-container">  
              <div className="new-channel-form">
                <div className="form-title">Edit channel</div><br/>
                <div className="form-description">Channels are where your members communicate. They’re best when organized around a topic — #leads, for example.</div><br/>
                <form onSubmit={this.handleSubmit}>

                  <button type="button" className={`private-button-${this.state.is_private}`} onClick={() => this.changeStatus()}>{status}</button>
                  {statusMessage}

                  <label>Name <br/>
                    <input 
                      type="text" 
                      placeholder="# e.g. leads"
                      value={this.state.title}
                      onChange={this.update('title')}
                    />
                  </label>
                  <p>Names must be lowercase, without spaces or periods, and shorter than 22 characters.</p>

                  <label>Purpose <p className="dim">(optional)</p>
                    <input 
                      type="text"
                      value={this.state.description}
                      onChange={this.update('description')}
                    />
                  </label>
                    <p> What's this channel about?</p><br/>

                  <div className="form-buttons">
                    <input 
                      type="button" 
                      value="Cancel"
                      onClick={() => this.props.closeModal()}
                    />
                    <input 
                      type="submit"
                      disabled={!this.state.title}
                      value="Update Channel"
                      className={`${!this.state.title}`}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
  }
}


const mapStateToProps = ({ session, entities: { users, channels } }, ownProps) => {
  const channelId = ownProps.match.params.channelId;
  const channel = channels[channelId];
  return ({
    currentUser: users[session.id],
    channel: channel,
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    updateChannel: channel => dispatch(updateChannel(channel)),
    closeModal: () => dispatch(closeModal())
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelEditModal));